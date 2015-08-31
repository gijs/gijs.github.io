---
layout: post
title: "VMWare Fusion Vagrant Provider: a 4 month review"
date: 2015-01-21 12:26
comments: true
#categories: vagrant docker osx development
---

Last year [I switched](/blog/2014/09/16/vmware-fusion-provider-for-vagrant/) from VirtualBox to VMWare Fusion for running Vagrant-managed VMs and containers.  Time for a personal and non-scientific review of the [VMWare Fusion provider](https://http://www.vagrantup.com/vmware).


### Speed

The first thing I noticed was a slightly faster bootup time:

 * Booting [CoreOS](https://github.com/coreos/coreos-vagrant) takes approx. 35 seconds (VirtualBox: ~50 seconds)

 * Booting [Trusty](https://vagrantcloud.com/helderco/boxes/trusty64) takes approx. 45 seconds. (VirtualBox: ~60 seconds)

 * Halting CoreOS takes approx. 3 seconds. (VirtualBox: ~7-8 seconds)

 * Halting Trusty Tahr takes approx. 6 seconds (VirtualBox: ~20 seconds)

Not really exciting but definitely noticeable in everyday use. This is on an early 2014 Macbook Pro Retina i7 2Ghz with 16GB and SSD running Yosemite.

### Reliability

I've been running this setup continuously since September '14 and never had a crash of either the Vagrant Fusion plugin or VMWare Fusion itself. VirtualBox sometimes choked after hibernation, but VMWare always responds as expected, including connectivity.

I've increased CoreOS's memory from 1GB to 2GB using  `v.vmx["memsize"] = "2048"` which improves container performance.

### Quirks

Port collisions sometimes happen for no good reason. It seems like they remain in effect after a hard shutdown of a VM or something. Can't reproduce at the moment and happened just a couple of times.

### Downsides

It doesn't matter to me that this setup costs money, but the fact that it's closed source raised some questions. For example, [the tcpdump command seems to crash](https://github.com/coreos/coreos-vagrant/issues/123) in a certain combination of versions of VMware, vagrant-fusion and Vagrant. Things like that are impossible to debug since 2/3 of the stack is closed source. This is clearly stated on the [homepage](https://www.vagrantup.com/vmware#learn-more) though.

### Conclusion

I'm happy with this setup because it's stable and fast. Things works as expected and it's great to be able to keep OS X clean and do fancy stuff in throwaway Linux containers with almost no performance degradation.
The difference between VirtualBox and VMWare isn't huge, so I won't say it's a no brainer. Still I'm not going back to VirtualBox because I like my current setup too much.