---
title: "Getting the Rana QGIS plugin to run on macOS ARM64"
date: 2026-08-16T10:00:00+02:00
draft: false
---

The Rana QGIS plugin didn't run on macOS. Not "had a few rough edges", It didn't install at all on Apple Silicon. Getting it working turned out to be a two-stage engineering problem: first rebuild a Fortran-backed Python package from source, then rework the dependency loader to handle a platform it had never been designed for.

## Why it broke

The Rana plugin uses `nens_dependency_loader` to install its Python dependencies at runtime. The dependency loader ships a set of pre-built wheels and installs them via pip. Every wheel in that set was built for Linux or Windows x86_64. On macOS ARM64, several of those wheels either don't exist upstream or exist only in an x86_64 build that QGIS bundles but that fails to load on arm64 hardware.

The two most problematic packages were `scipy` and `h5py`. QGIS 4 on macOS ships with `scipy`, but it's the x86_64 build. It gets through the import but crashes at runtime on arm64. `h5py` isn't bundled at all. And `threedigrid_builder`, which wraps Fortran simulation code via f2py, had no macOS wheel anywhere: not on PyPI, not in the existing external-dependencies directory. It would have to be built from source.

## Building threedigrid_builder from scratch

`threedigrid_builder` uses scikit-build-core with CMake and f2py to compile Fortran into a Python extension. The build chain is straightforward in principle but had a few obstacles in practice.

**Missing tools.** The machine had Python 3.9, 3.10, 3.11, 3.13, and 3.14 via Homebrew, but not 3.12. Which is what QGIS 4 embeds. And `ninja`, required by scikit-build-core, wasn't installed either.

```bash
brew install python@3.12 ninja
```

**A clean build environment.** A Python 3.12 venv with the build dependencies:

```bash
python3.12 -m venv .venv312
.venv312/bin/pip install scikit-build-core setuptools wheel "numpy>=2,<3"
```

**The compiler conflict.** The first build attempt failed. CMake auto-detected LLVM's `flang` (version 22) as the Fortran compiler. The `CMakeLists.txt` uses GFortran-specific flags: `-s`, `-ffree-line-length-none`, `--param max-unroll-times=4`, that flang doesn't recognise. The fix was to set `FC` explicitly before invoking pip:

```bash
FC=/opt/homebrew/bin/gfortran MACOSX_DEPLOYMENT_TARGET=11.0 \
  .venv312/bin/pip wheel . --no-deps -w dist/
```

**The version string problem.** The working tree was on `1.25.4.dev0`, so the first successful build produced a wheel with the wrong version, not something you can install against a pinned dependency. The clean approach was a git worktree pointing at the `1.25.3` release tag, so the build ran from clean tagged source without touching the working tree:

```bash
git worktree add /tmp/threedigrid-builder-1.25.3 1.25.3
cd /tmp/threedigrid-builder-1.25.3
FC=/opt/homebrew/bin/gfortran MACOSX_DEPLOYMENT_TARGET=11.0 \
  pip wheel . --no-deps -w /path/to/dist/
git worktree remove /tmp/threedigrid-builder-1.25.3
```

The result: `threedigrid_builder-1.25.3-cp312-cp312-macosx_11_0_arm64.whl`.

The same process produced arm64 wheels for the other packages that either didn't exist or needed to be pulled from PyPI directly:

- `pydantic_core-2.33.2-cp312-cp312-macosx_11_0_arm64.whl`
- `cftime-1.6.5-cp312-cp312-macosx_11_0_arm64.whl`
- `shapely-2.1.2-cp312-cp312-macosx_11_0_arm64.whl`
- `greenlet-3.5.5-cp312-cp312-macosx_11_0_universal2.whl`
- `scipy-1.13.0-cp312-cp312-macosx_12_0_arm64.whl`
- `h5py-3.16.0-cp312-cp312-macosx_11_0_arm64.whl`

All of these go into `external-dependencies/`. The dependency loader already used `pip install --find-links external-dependencies --no-index`, so pip picks the correct platform wheel automatically, no other changes needed there.

## Reworking nens_dependency_loader

With the wheels in place, the dependency loader itself needed four changes to work on macOS.

**Platform-specific dependencies.** A new `MACOS_PLATFORM_DEPENDENCIES` list handles the two packages that need special attention on Darwin. `scipy` is installed into `deps/` (which is prepended to `sys.path`) so it shadows the broken x86_64 build that QGIS ships. `h5py` simply isn't present in QGIS at all, so it needs to be installed. These only run when `platform.system() == "Darwin"`.

**Python interpreter discovery.** On Linux and Windows, `sys.executable` points to the Python binary. On macOS, it points to the QGIS app bundle, `QGIS.app/Contents/MacOS/QGIS`, which is not a Python interpreter. The dependency loader runs pip in a subprocess, so it needs to find the actual `python3` binary. The updated `_get_python_interpreter()` tries a sequence of candidates relative to `sys.exec_prefix`:

```bash
<dir>/bin/python3          # older QGIS layout
<sys.exec_prefix>/bin/python3  # standard venv layout
<dir>/python3.12           # QGIS 4 layout
<dir>/python3
```

**PYTHONHOME for subprocess pip calls.** Even with the right interpreter binary, subprocess pip installs failed with standard library import errors. The bundled Python on macOS has a baked-in prefix pointing to a CI build path that doesn't exist on a user's machine. Setting `PYTHONHOME` explicitly before spawning the subprocess fixes it:

```python
env["PYTHONHOME"] = sys.exec_prefix
```

## Result

After these changes, `nens_dependency_loader` installs cleanly on macOS ARM64. The Rana plugin loads, the Fortran-backed simulation code runs, and the full QGIS workflow. Schematisation editing, simulation submission, result visualisation works on Apple Silicon the same way it does on Linux.

The main lesson is that "no macOS wheel on PyPI" doesn't mean "can't run on macOS". It means someone has to do the build. The build itself, once the toolchain confusion was sorted out, was not especially hard. The tricky part was tracking down every assumption in the dependency loader that had been written for a platform where `sys.executable` is always Python.
