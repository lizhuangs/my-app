# 1、安装nodejs。

目前长期支持的稳定版本是6.x，开发版本是8.x  

推荐使用稳定版本6.x，以免报错不好处理  

如果嫌弃官网太慢，可以在http://nodejs.cn/download/下载，这里面还有阿里云的镜像。  

最新稳定版本下载地址：
https://nodejs.org/dist/v6.11.3/node-v6.11.3-win-x64.zip  

配置环境变量：`NODE_HOME=node安装目录`，`path=%NODE_HOME%`;  

查看版本：  

`node -v`  

`npm -v`

# 2、配置npm

配置npm的镜像为淘宝地址。国外太慢。  

`npm config set registry https://registry.npm.taobao.org`  

验证一下：  

`npm config get registry` 

# 3、安装@angular/cli

CLI（command-line interface，命令行界面），是angular的命令行工具，它的最大好处是简化开发。  

比如你新建一个用户模块，使用它可以帮你马上建立好js,css,template模块。它还有很多其它用户比如启动http服务器等
安装：  

`npm install -g @angular/cli`  

# 4、创建angular项目

创建项目：  

https://angular.cn/guide/quickstart  

`cd 工作目录`  

`ng new 项目名称`  

`cd 项目名称`  

如果项目之前已经存在  

`npm install`  

`ng serve --open`即可在浏览器中打开项目
