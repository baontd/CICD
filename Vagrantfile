NUM_MACHINES = 1
BASE_IP = "192.168.56."
VM_RAM = 1024
VM_CPU = 2

Vagrant.configure("2") do |config|
  (1..NUM_MACHINES).each do |i|
    config.vm.define "vm#{i}" do |vm|
      vm.vm.box = "ubuntu/bionic64"
      vm.vm.hostname = "vm#{i}"
      vm.vm.network "private_network", ip: "#{BASE_IP}#{100 + i}"
      vm.vm.network "forwarded_port", guest: 3000, host: 3000
      vm.vm.provider "virtualbox" do |vb|
        vb.memory = VM_RAM
        vb.cpus = VM_CPU
      end
      vm.vm.provision "shell", path: "setup.sh", run: "parallel"
    end
  end
end