### 1. 实现一个线上 Web 服务 | 初始化 server
分了三个子系统
1. 线上服务系统（主要给我们真正的用户去提供线上服务的）
2. 发布系统（程序员去发布线上服务系统的发布系统）
3. 发布工具

Orcal 的 VirtualBox 虚拟机。Linux ubuntu 64
修改镜像地址
http://mirrors.aliyun.com/ubuntu

// 命令行工具指令
// 安装 node、npm
sudo apt install nodejs
sudo apt install npm

// 如果要安装更新的 node，可以安装 n，这个是 node 写的 包版本管理
sudo npm install -g n

### 实现一个线上 Web 服务 | 利用 Express，编写服务器
Express框架
如果复杂的服务器还需要考虑，监控，错误恢复，线上重启等

### 2. 实现一个线上 Web 服务 | 利用 Express，编写服务器（一）
### 3. 实现一个线上 Web 服务 | 利用 Express，编写服务器（二）
1. openSSH
2. apt install openSSH
3. service ssh start
4. 默认会在22端口上运行
5. 在虚拟机中设置端口转发，从宿主机转发到虚拟机
6. 利用 scp 命令
   1. 先创建目录
   2. scp -P 8022 ./* xxxx@172.0.0.1/home/xxxx/server
   xxx 是主机名
   3. npm start
   4. 做端口映射，从虚拟机映射到宿主机
