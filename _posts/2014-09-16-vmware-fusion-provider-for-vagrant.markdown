---
layout: post
title: "VMWare Fusion provider for Vagrant"
date: 2014-09-16 11:12
comments: true
#categories: vagrant
---

[![Image](/images/vmwarefusion.png "VMWare Fusion provider")](https://www.vagrantup.com/vmware)

[Hashicorp](https://www.hashicorp.com/) (the company behind [Vagrant](https://www.vagrantup.com/)) released a [VMWare Fusion provider](https://www.vagrantup.com/vmware) which claims better performance and stability. This seems reasonable since the [VMWare](http://www.vmware.com/) Hypervisor has been around for a long time and is used in data centers globally.

[It's not free](https://www.vagrantup.com/vmware#buy-now) but if it performs as promised, $79 will be worth it.

For now, everything seems to work (NFS, port forwarding, running CoreOS and Trusty64, resizing virtual harddisk size), but I'll post a review later.


OS X Mavericks installation notes
---------------------------------

 * Added the following to the Vagrantfile

```
config.vm.box = "helderco/trusty64"
config.vm.provider :vmware_fusion do |v|
	v.vmx["memsize"] = "2048" # 2GB memory
end
```

 * If you get a message `==> default: Waiting for HGFS kernel module to load...`, log in using `$ vagrant ssh` and execute the following command, then halt/up again:

 ```
 $ echo "answer AUTO_KMODS_ENABLED yes" | sudo tee -a /etc/vmware-tools/locations
 ```

 * I used the Vagrant box `helderco/trusty64` ([details](https://vagrantcloud.com/helderco/boxes/trusty64)) to get Trusty64 running with this provider.

 * Uninstalling VirtualBox and rebooting helped get past the error following this message:

```
==> default: Verifying vmnet devices are healthy...
The VMware "vmnet" devices are failing to start. The most common
reason for this is collisions with existing network services. For
example, if a hostonly network space collides with another hostonly
network (such as with VirtualBox), it will fail to start. Likewise,
if forwarded ports collide with other listening ports, it will
fail to start.

Vagrant does its best to fix these issues, but in some cases it
cannot determine the root cause of these failures.

Please verify you have no other colliding network services running.
As a last resort, restarting your computer often fixes this issue.
```
