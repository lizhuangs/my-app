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

	创建项目：  https://angular.cn/guide/quickstart  
	`cd 工作目录`  
	`ng new 项目名称`  
	`cd 项目名称`  
	如果项目之前已经存在  
	`npm install`  
	`ng serve --open`即可在浏览器中打开项目


### 简单说明：
	package.json是webpack的配置文件，类似于maven和pom.xml 
	入口文件main.ts,一般加载主模块AppModule 
	结构说明具体看这里:https://angular.cn/guide/setup-systemjs-anatomy

#### ng serve 启动项目

### 模块module
	https://angular.cn/guide/ngmodule
	Angular 模块是一个由@NgModule装饰器提供元数据的类，元数据包括：
	声明哪些组件、指令、管道属于该模块。
	公开某些类，以便其它的组件模板可以使用它们。
	导入其它模块，从其它模块中获得本模块所需的组件、指令和管道。
	在应用程序级提供服务，以便应用中的任何组件都能使用它。

### 组件component
	重点
	生命周期:https://angular.cn/guide/lifecycle-hooks 

	组件交互:https://angular.cn/guide/component-interaction

### 路由router
https://angular.cn/tutorial/toh-pt5
https://angular.cn/guide/router 

重点：https://angular.cn/guide/router#canactivate-要求认证


### 服务service
https://angular.cn/tutorial/toh-pt4#注入-heroservice

### 指令directive
	在 Angular 中有三种类型的指令：
	组件 — 拥有模板的指令，一个组件对应一个selector
	结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令，ngIf,ngFor
	属性型指令 — 改变元素、组件或其它指令的外观和行为的		令。一般是自定义的，我们使用的第三方UI基本都有这个


### 表单
模板驱动表单https://angular.cn/guide/forms，一般就是在html界面加上相应的属性就直接验证了 

响应式表单https://angular.cn/guide/reactive-forms，在ts中动态验证

### 其它:
管道pipe
动画Animations

### 学习网站:
https://angular.cn/
angular中文官网，入门学习从这里看起


https://valor-software.com/ngx-bootstrap/
angular4+bootstrap，目前用得最多的UI 

https://valor-software.com/ng2-table/
table 

https://github.com/xieziyu/ngx-echarts
angular+echarts


http://es6.ruanyifeng.com/
ECMAScript 6 入门,主要看一下箭头函数

https://www.tslang.cn/docs/handbook/basic-types.html
typescript官网


http://reactivex.io/rxjs/manual/overview.html
rxjs官网

https://doc.webpack-china.org/configuration/
webpack官网


http://blog.csdn.net/hj7jay/article/details/51907504
springmvc token验证示例
