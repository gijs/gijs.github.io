---
layout: post
title: "Adding Vagrant to my Dev Stack"
date: 2011-10-24 12:59
comments: true
#categories: devops development
---
My development environment has changed/evolved on many levels in the past 6 years. from Windows to OS X via Linux, from no version control to Git via Subversion, and from Notepad++ to [Textmate](http://macromates.com/ "Textmate") via Vim. (don't get me started). I want to talk about the (combination of) Operating Systems I use to develop web apps.

I used OS X briefly when it came out, and the potential of running software like Final Cut, Photoshop and Illustrator alongside UNIX tools like Apache and Python was quite promising. So when Tiger was released I didn't wait and bought a Macbook. I was also lucky enough to get to work with OS X and Textmate at [Eight Media](http://www.eight.nl "Eight Media"), doing Django and front-end development. This kick-started my professional use of OS X.

After a while, some downsides emerged: OS X is quite unlike Linux. OS X is certainly more polished in its interface compared to KDE and Gnome, thanks to years of consistent UX history and adherence to the [Apple HIG](http://developer.apple.com/library/mac/#documentation/UserExperience/Conceptual/AppleHIGuidelines/XHIGIntro/XHIGIntro.html "Apple HIG"). Also, it's really plug and play, and the system really goes to sleep when the lid is closed. These are important details to me.

But there are significant and infamous shortcomings: there's no proper package management system. Forget Macports, try [Homebrew](http://mxcl.github.com/homebrew/ "Homebrew") if you must, but for your UNIXy development stack, it falls short. It's no match for something like Aptitude.

I've come to the conclusion that the development stack should mirror the deployment stack as much as possible. That would be Ubuntu Linux, so I've tried running a full Ubuntu install in [Parallels Desktop](http://www.parallels.com/eu/products/desktop/ "Parallels Desktop") and [VMWare Fusion](http://www.vmware.com/products/fusion/overview.html "VMWare Fusion"), both of which are fantastic products that even provide 3D acceleration and a seamless experience (especially with Parallels' coherence mode).

But since I don't really need another window manager (as I said, OS X + [Quicksilver](http://qsapp.com/ "Quicksilver") does this just fine), a so-called 'headless' virtual machine would do the trick, too. [VirtualBox](http://www.virtualbox.org/ "VirtualBox") supports this mode of operation. Some bright spirit went even further to integrate a headless VM into OS X, and created a Ruby tool called [Vagrant](http://www.vagrantup.com/ "Vagrant").

What's Vagrant you ask? I couldn't say it more concise than they do on their website:

*'By providing automated creation and provisioning of virtual machines using Oracle's VirtualBox, Vagrant provides the tools to create and configure lightweight, reproducible, and portable virtual environments'*

In practice, I use Vagrant as such:

* I keep a directory in my OS X home directory (~) called VM/. This is where I run several VMs for different purposes. One for Django stuff, one for experimenting with GIS, one for trying out weird Linux tricks that could potentially destroy the system.
* I start with a base box (Ubuntu Lucid, a distro I use on the server, too) and tune it with 'recipes' using [Chef](http://wiki.opscode.com/display/chef/Chef+Solo "Chef Solo") (or [Puppet](http://www.puppetlabs.com/puppet/introduction/ "Puppet")). I then 'repackage' this VM for private re-use. (it gets stored in ~/.vagrant/boxes/, next to the baseline boxes).
* Recipes define what kind of software gets installed and configured by default, such as apache2-worker-mpm, nginx, postgresql with certain roles, et cetera.
* The configuration of each VM is stored in a Vagrantfile. This includes the shared folder location, port-forwarding, IP address, number of CPU's and memory size. I run the VMs in the 33.33.33.x range. Someone told me this was a good idea, can't remember who that was.
* In ~/VM/ubuntu_django/, I can run vagrant ssh, and a fully automated local SSH login occurs.
* The shared folder, specified in Vagrantfile, gets exported via NFS. This means I get access to /vagrant/projects/ on the VM side, which is the same as the directory ~/VM/ubuntu_django/projects/ in OS X. This is great, and allows me to use Textmate or any other editor or IDE while running the software in true Linux.
* The PostgreSQL recipe even automatically modifies the pg_hba.conf file to allow connections from outside, so I can use the GUI tool [PGAdminIII](http://www.pgadmin.org/ "PGAdmin") from OS X to administer the postgres instance on Ubuntu.
* Using commands like vagrant up, vagrant halt, vagrant suspend and vagrant resume, I can manage the various VMs from the commandline.

Conclusion: OS X with VirtualBox managed by Vagrant gives me the best of both worlds in terms of operating systems. I still use Parallels for testing on Windows and the occasional peek at Gnome's desktop though.