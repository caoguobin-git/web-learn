# Servlet 笔记

[TOC]

## 一、引言

### 1.1 C/S架构和B/S架构

> C/S和B/S是软件发展过程中出现的两种软件架构方式。

### 1.2 C/S架构（Client/Server 客户端/服务器）

> * 特点：必须在客户端安装特定软件。
> * 优点：图形效果显示较好（如：3D游戏）。
> * 缺点：服务器的软件和功能进行升级，客户端也必须升级、不利于维护。
> * 常见的C/S程序：QQ、微信等。

![image-20200721121544181](pic\Servlet笔记\image-20200721121544181.png)

### 1.3 B/S架构（Browser/Server 浏览器/服务器）

> * 特点：无需安装客户端，任何浏览器都可以直接访问。
> * 优点：涉及到功能的升级，只需要升级服务器端。
> * 缺点：图形显示效果不如C/S架构。
> * 需要通过HTTP协议访问。

![image-20200721121734656](pic\Servlet笔记\image-20200721121734656.png)

## 二、服务器

### 2.1 概念

#### 2.1.1 什么是Web

> Web(World Wide Web)称为万维网，简单理解就是网站，它用来表示Internet主机上供外界访问的资源。
>
> Internet上供外界访问的资源分为两大类：
>
> * 静态资源：指Web页面中供人们浏览的数据始终是不变的。（HTML、CSS）
> * 动态资源：指Web页面中供人们浏览的数据是由程序产生的，不同时间点，甚至不同设备访问Web页面看到的内容各不相同。（JSP、Servlet）
> * 在Java中，动态Web资源开发技术我们统称为Java Web。

#### 2.1.1 什么是Web服务器

> Web服务器是运行及发布Web应用的容器，只有将开发的Web项目放置到该容器中，才能使网络上的所有用户通过浏览器进行访问。

### 2.2 常见服务器

> * 开源：OpenSource（1.开放源代码 2.免费）
>   * Tomcat（主流Web服务器之一，适合初学者）
>   * Jetty（淘宝，运行效率比Tomcat高）
>   * Resin（新浪，所有开源服务器软件中，运行效率最高的）
>   * 三者的用法从代码角度完全相同，只有在开启、关闭服务器软件时对应的命令稍有区别。掌握一个即掌握所有。
> * 收费：
>   * WebLogin（Oracle）
>   * WebSphere（IBM）
>   * 提供相应的服务与支持，软件大，耗资源。



### 2.3 Tomcat服务器

> Tomcat是Apache软件基金会（Apache Software Foundation）的Jakarta项目中的一个核心项目，免费开源、并支持Servlet和JSP规范。目前Tomcat最新版本为10.0.
>
> Tomcat技术先进、性能稳定，深受Java爱好者喜爱并得到了部分软件开发商的认可，成为目前比较流行的Web应用服务器。

### 2.4 Tomcat安装

#### 2.4.1 下载

> 官网地址：http://tomcat.apache.org/

#### 2.4.2 解压安装

> 将Tomcat解压到一个没有特殊符号的目录中（一般纯英文即可）
>
> 注意：
>
> * 不建议将服务器软件放在磁盘层级很多的文件夹中。
> * 不建议放在中文目录下。

#### 2.4.3 Tomcat目录结构

| 文件夹  |                             说明                             |                             备注                             |
| :-----: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   bin   |               该目录下存放的是二进制可执行文件               |        startup.bat启动Tomcat；shutdown.bat停止Tomcat         |
|  conf   | 这是一个非常重要的目录，这个目录下有两个最为重要的文件：server.xml和web.xml | server.xml：配置整个服务器信息。例如修改端口号，编码格式等。<br/>web.xml ：项目部署描述符文件，这个文件中注册了很多MIME类型，即文档类型。 |
|   lib   |      Tomcat的类库，里面存放Tomcat运行所需要的jar文件。       |                                                              |
|  logs   | 存放日志文件，记录了Tomcat启动、运行和关闭的信息，如果启动Tomcat时有错误、异常，也会记录在日志文件中。 |                                                              |
|  temp   |    Tomcat的临时文件，这个目录下的东西在停止Tomcat后删除。    |                                                              |
| webapps | 存放Web项目的目录，其中每个文件夹都是一个项目；其中ROOT是一个特殊的项目，在地址栏中没有给出项目目录时，对应的就是 |                                                              |
|  work   |      运行时生成的文件，最终运行的文件都在这个文件夹中。      | 当客户端访问一个JSP文件时，Tomcat会通过JSP生成java文件，然后再编译java文件生成class文件，生成的java文件和class文件都会存放到这个目录下。 |

### 2.5 Tomcat 启动和停止

#### 2.5.1 启动Tomcat

> 进入tomcat安装目录bin目录下，双击startup.bat启动程序。
>
> 或者在命令行窗口中执行命令。

#### 2.5.2 停止Tomcat

> 进入tomcat安装目录bin目录下，双击shutdown.bat关闭Tomcat。
>
> 或者在命令行窗口中执行命令。

#### 2.5.3 修改端口号

> Tomcat默认端口号为8080，可以通过conf/server.xml文件修改。

~~~xml
<!-- 修改默认端口号 -->
<Connector port="8080" protocal="HTTP/1.1" connectionTimeout="20000" redirectPort="8443"/>
~~~

* <strong style="color:#2fa589">注意：修改端口号需要重新启动Tomcat才能生效。</strong>

### 2.6 项目部署及访问静态资源

> Tomcat时Web服务器，我们的项目应用部署在webapps下面，然后通过特定的*URL*进行访问。

#### 2.6.1 创建项目

> * 在webapps中建立文件夹（项目应用），比如：myweb
>   * 创建WE-INF文件夹，用于存放项目的核心内容
>     * 创建classes文件夹，用于存放.class文件
>     * 创建lib，用于存放jar文件
>     * 创建web.xml，项目配置文件（到ROOT项目下的WEB-INF复制即可）
>   * 把网页hello.html复制到myweb文件夹中，与WEB-INF在同级目录

#### 2.6.2 URL访问资源

> 浏览器中输入URL：http://localhost:8080/myweb/hello.html 即可访问。

* <strong style="color:#2fa589">经验：URL主要由4部分组成：协议、主机、端口号、资源路径</strong>

#### 2.6.3 Tomcat响应流程图

![image-20200721125018397](pic\Servlet笔记\image-20200721125018397.png)

### 2.7 常见错误

#### 2.7.1 Tomcat闪退

> 闪退问题是由于JAVA_HOME配置不正确导致的，检查JAVA_HOME配置是否正确。

#### 2.7.2 访问显示404

> 访问资源不存在：
>
> * 检查资源是否存在
> * 检查路径是否正确

## 三、Servlet【<strong style="color:#F36D00">重点</strong>】

### 3.1 Servlet简介

#### 3.1.1 Servlet概念

> * Servlet：Java Server Applet的简称，是服务器端的程序（代码、功能实现），可交互式的处理客户端发送的请求，并完成响应操作。
> * 动态网页技术。
> * JavaWeb程序开发的基础，JavaEE规范（一套接口）的一个组成部分。

#### 3.1.2 Servlet作用

> * 接收客户端请求，完成操作。
> * 动态生成网页（页面数据可变）。
> * 将包含操作结果的动态网页响应给客户端。

### 3.2 Servlet开发步骤

#### 3.2.1 搭建开发环境

> 将Servlet相关jar包（tomcat/lib/servlet-api.jar）配置到classpath中。

#### 3.2.2 编写Servlet

> * 实现javax.servlet.Servlet
> * 重写 5个主要方法
> * 在核心的service()方法中编写输出语句，打印访问结果。

~~~java
/** 示例代码 **/
public class TestServlet implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        
    }
    @Override
    public ServletConfig getServletConfig() {
        return null;
    }
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("My First Servlet");
    }
    @Override
    public String getServletInfo() {
        return null;
    }
    @Override
    public void destroy() {
    }
}
~~~

#### 3.2.3 部署Servlet

> 编译MyServlet后，将生成的*.class*文件放在WEB-INF/classes文件夹中。

#### 3.2.4 配置Servlet

> 两种方式：
>
> 1. 编写WEB-INF下项目配置文件web.xml
> 2. 使用@WebServlet注解实现

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!-- 1.添加Servlet节点 -->
    <servlet>
        <servlet-name>myServlet</servlet-name>
        <servlet-class>com.rainbase.servlet.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!-- 2.添加Servlet-mapping节点 -->
    <servlet-mapping>
        <servlet-name>myServlet</servlet-name>
        <url-pattern>/myServlet</url-pattern>
    </servlet-mapping>
</web-app>
~~~

~~~java
/** 示例代码 **/
@WebServlet(value = "/users")
public class UserController extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Hello World");
    }
}
~~~



<strong style="color:#2fa589">注意：url-pattern配置的内容就是浏览器地址栏输入的URL中项目名称后资源的内容。</strong>

## 四、IDEA创建Web项目

### 4.1 IDEA创建Web项目

> 步骤：
>
> 1. 创建项目窗口，选择Java EE7，并勾选Web Application。
> 2. 输入项目名称和项目保存地址，点击完成。

### 4.2 IDEA开发Servlet

> 使用开发工具编写Servlet，仍要手工导入servlet-api.jar文件，并与项目关联。

#### 4.2.1 编写Servlet

> 创建Servlet，实现Servlet接口，重写其中的5个方法。

#### 4.2.2 配置web.xml

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!-- 1.添加Servlet节点 -->
    <servlet>
        <servlet-name>myServlet</servlet-name>
        <servlet-class>com.rainbase.servlet.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!-- 2.添加Servlet-mapping节点 -->
    <servlet-mapping>
        <servlet-name>myServlet</servlet-name>
        <url-pattern>/myServlet</url-pattern>
    </servlet-mapping>
</web-app>
~~~

#### 4.2.3 部署Web项目

> * 在Tomcat的webapps目录下，新建WebProject项目文件夹
>   * 创建WEB-INF文件夹，存放核心文件
>   * 在WEB-INF下，创建classes文件夹，将编译后的MyServlet.class文件复制到此。

<strong style="color:#2fa589">问题：每当我们编写了新的Servlet或者重新编译，都需要手工将新的*.class*文件部署到Tomat中，较为麻烦。如何实现自动部署？</strong>

### 4.3 IDEA部署Web项目

> 前面我们是在Tomcat中的webapps目录虚拟键应用程序目录myweb，然后将静态资源和Servlet复制到相关目录下。使用IDEA不需要采用这种方法，可以通过IDEA集成Tomcat服务器，实现自动部署。

#### 4.3.1 IDEA集成Tomat

> 步骤：
>
> 1. 点击File选项，选择Settings
> 2. 选择Build、Execution、Deployment
> 3. 选择Application Servers
> 4. 添加Tomcat依赖到项目中

#### 4.3.2 项目部署Tomcat

> 步骤：
>
> 1. Add Confiturations
> 2. 添加Tomcat Server - Local
> 3. 点击Deployment
> 4. 添加Artifact

### 4.4 其他操作

#### 4.4.1 关联第三方jar包

> 步骤：
>
> 1. 在WEB-INF下新建目录lib
> 2. 将第三方jar文件放置到此目录中
> 3. 右键添加依赖即可

|      选项       |           描述           |
| :-------------: | :----------------------: |
| Global Library  |    所有工程都可以使用    |
| Project Library | 当前项目中的所有模块可用 |
| Module Library  |       当前模块可用       |



#### 4.4.2 如何导出war包

> 项目完成后，有时候需要打成war包方便部署。war包可以直接放如Tomcat的webapps目录下，启动Tomcat后会自动解压，即可访问。

> **步骤：**
>
> 1. 点击项目结构
> 2. 选择Artifacts
> 3. 点击添加（+）
> 4. 选择Web Application: Archive选项
> 5. 选择从哪个项目发布、
> 6. 选择Build
> 7. 选择Build Artifacts
> 8. 发布到tomcat服务器

## 五、HTTP协议

### 5.1 什么是HTTP

> 超文本传输协议（HTTP, HyperText Transfer Protocol）是互联网上应用最为广泛的一种网络协议，是一个基于请求与响应模式、无状态的、应用层的下一，运行于TCP协议基础之上。

### 5.2 HTTP协议特点

> * 支持客户端（浏览器）/服务器模式
> * 简单快速：客户端只向服务器发送请求方法和路径，服务器即可响应数据，因而通信速度很快。请求方法常用的由GET、POST等。
> * 灵活：HTTP允许传输任意类型的数据，传输的数据类型由Content-Type标识。
> * 无连接：无连接指的是每次TCP连接只处理一个或多个请求，服务器处理完客户的请求后，即断开连接。采用这种方式可以节省传输时间。
>   * HTTP 1.0版本是一个请求响应之后，直接就断开了，称为短连接。
>   * HTTP 1.1 版本不是响应后直接断开，而是等几秒钟，着几秒钟之内如果有新的请求，那么还是通过之前的连接通道来收发消息，如果过了几分钟用户没有发送新的请求，就会断开连接。称为长连接。
> * 无状态：HTTP协议是无状态协议。
>   * 无状态是指协议对于事务处理没有记忆能力。

### 5.3 HTTP协议通信流程

> * 客户端与服务器建立连接（三次握手）。
> * 客户端向服务器发送请求。
> * 服务器接收请求后，根据请求返回相应的文件作为响应。
> * 客户端与服务器关闭连接。（四次挥手）

![image-20200721141612662](pic\Servlet笔记\image-20200721141612662.png)

### 5.4请求报文和响应报文

#### 5.4.1 HTTP请求报文

> 当浏览器向Web服务器发出请求时，它向服务器传递了一个数据块，也就是请求信息（请求报文），HTTP请求信息由4部分组成：
>
> 1. 请求行：请求方法/地址 URI协议/版本
> 2. 请求头：（Request Header）
> 3. 空行
> 4. 请求正文

> 下面是一个HTTP请求的例子：

![image-20200721141952077](pic\Servlet笔记\image-20200721141952077.png)

#### 5.4.2 HTTP响应报文

> HTTP响应报文与HTTP请求报文类似，HTTP响应也由4个部分组成：
>
> 1. 状态行
> 2. 响应头（Response Header）
> 3. 空行
> 4. 响应正文

> 下面是一个HTTP响应的例子：

![image-20200721142542703](pic\Servlet笔记\image-20200721142542703.png)

### 5.6 常见状态码

| 状态码 |       状态描述        |                             说明                             |
| :----: | :-------------------: | :----------------------------------------------------------: |
|  200   |          OK           |                        客户端请求成功                        |
|  302   |         Found         |                          临时重定向                          |
|  403   |       Forbidden       | 服务器收到请求，但是拒绝提供服务。服务器通常会在响应正文中给出不提供服务的原因。 |
|  404   |       Not Found       |          请求的资源不存在，例如：输入了错误的URL。           |
|  500   | Internal Server Error |     服务器发生不可预期的错误，导致无法完成客户端的请求。     |

## 六、Servlet详解【<strong style="color:#F36D00">重点</strong>】

### 6.1 Servlet核心接口和类

> 在Servlet体系结构中，除了实现Servlet接口，还可以通过继承GenericServlet或HttpServlet类，完成Servlet的编写。

#### 6.1.1 Servlet接口

> 在Servlet API中最重要的是Servlet接口，所有Servlet都会直接或间接的与该接口发生联系，或是实现该接口，或继承实现了该接口的类。
>
> 该接口具体内容如下：

~~~java
/** Servlet接口 **/
package javax.servlet;
import java.io.IOException;
public interface Servlet {

    public void init(ServletConfig config) throws ServletException;

    public ServletConfig getServletConfig();

    public void service(ServletRequest req, ServletResponse res)
	throws ServletException, IOException;

    public String getServletInfo();

    public void destroy();
}

~~~

#### 6.1.2 GenericServlet抽象类

> GenericServlet实现了Servlet接口， 使编写Servlet变得更容易。它提供生命周期方法*init()*和*destroy()*的简单实现，要编写一般的Servlet，只需重写抽象方法*service()*即可。

#### 6.1.3 HttpServlet类

> HttpServlet在继承GenericServlet的基础上进一步进行了扩展。
>
> 提供将要被子类化以创建适用于Web站点的HTTP Servlet的抽象类。HttpServlet的子类必须重写一个方法，该方法通常是以下这些方法之一：
>
> * doGet(): 如果servlet支持HTTP GET请求
> * doPost(): 用于处理HTTP POST请求
> * doPut(): 用于处理HTTP PUT请求
> * doDelete(): 用于处理HTTP DELETE请求

### 6.2 Servlet两种创建方式

#### 6.2.1 实现Servlet接口

~~~java
/** Servlet第一种创建方式：实现Servlet接口 **/
public class MyServlet implements Servlet {
    @Override
    public void init(ServletConfig config) throws ServletException {}
	@Override
    public ServletConfig getServletConfig() {
        return null;
    }
	@Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("Hello World");
    }
	@Override
    public String getServletInfo() {
        return null;
    }
	@Override
    public void destroy() {

    }
}
~~~

<strong style="color:#2fa589">该方式比较麻烦，需要实现接口中所有方法。</strong>

#### 6.2.2 继承HttpServlet【<strong style="color:#F36D00">推荐</strong>】

~~~java
/** 示例代码，此种方式也是开发中推荐的 **/
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Hello World");
    }
}
~~~



#### 6.2.3 常见错误

> * HTTP Status 404：资源找不到。
>   * 第一种情况：地址书写错误。
>   * 第二种情况：地址没有问题，未将文件打包到war中，清空重新打包。
> * Servlet地址配置重复：both mappered to the url-pattern [/hello] which is not permitted。
> * Servlet地址配置错误：比如没有写 / ，Invalid < url-pattern > [helloservlet] in servlet mapping

### 6.3 Servlet两种配置方式

#### 6.3.1 使用web.xml（Servlet 2.5 之前使用）

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!-- 1.添加Servlet节点 -->
    <servlet>
        <servlet-name>myServlet</servlet-name>
        <servlet-class>com.rainbase.servlet.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!-- 2.添加Servlet-mapping节点 -->
    <servlet-mapping>
        <servlet-name>myServlet</servlet-name>
        <url-pattern>/myServlet</url-pattern>
    </servlet-mapping>
</web-app>
~~~

|  匹配规则  |  具体名称   |                      描述                      |
| :--------: | :---------: | :--------------------------------------------: |
|  精确匹配  | /具体的名称 |  只有URL路径是具体的名称的时候才会触发Servlet  |
|  后缀匹配  |    *.xxx    |       只要是以xxx结尾的就匹配触发Servlet       |
| 通配符匹配 |     /*      |       匹配所有请求，包含服务器的所有资源       |
| 通配符匹配 |      /      | 匹配所有请求，包含服务器的所有资源，不包括.jsp |

> **load-on-start-up:**
>
> 1. 元素标记容器是否应该在web应用程序启动的时候就加载这个servlet。
> 2. 它的值必须是一个整数，表示servlet被加载的先后顺序。
> 3. 如果该元素的值为负数或者没有设置，则容器会当Servlet被请求时再加载。
> 4. 如果值为正整数或者0时，表示容器再应用启动时就加载并初始化这个servlet，值越小，servlet的优先级越高，就越先被加载。值相同时，容器就会自己选择顺序来加载。

#### 6.3.2 使用@WebServlet注解（Servlet 3.0之后使用）【<strong style="color:#F36D00">推荐</strong>】

~~~java
/** 示例代码 **/
@WebServlet(value = "/helloServlet",loadOnStartup = 1)
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Hello World");
    }
}
~~~



#### 6.3.3 @WebServlet注解常用属性

| 属性名                 | 属性值          | 描述                                                         |
| ---------------------- | --------------- | ------------------------------------------------------------ |
| name                   | String          | Servlet名字（可选）                                          |
| value/urlPatterns      | String[]        | 配置匹配路径，可以配置多个。                                 |
| loadOnStartup          | int             | 配置Servlet的创建时机，如果是0或者正数，启动程序时创建，如果是负数，则访问时创建。数字越小优先级越高。 |
| initParams             | WebInitParam [] | 配置Servlet初始化参数：initParams = {@WebInitParam(name = "hello",value = "world")} |
| 其他参见该注解具体属性 |                 |                                                              |



## 七、Servlet使用【<strong style="color:#F36D00">重点</strong>】

### 7.1 Request对象

> 在Servlet中用来处理客户端请求需要用*doGet()*或*doPost()*方法的request对象。

![image-20200721151126219](pic\Servlet笔记\image-20200721151126219.png)

#### 7.1.1 get和post的区别

> <strong style="color:#F36D00">GET请求：</strong>
>
> * get提交的数据会放在URL之后，以*?*分隔URL和传输数据，参数之间以*&*拼接。
> * get方式明文传递，数据量小，不安全。
> * 效率高，浏览器默认请求方式为GET请求。
> * 对应的Servlet方法是*doGet()*
>
> <strong style="color:#F36D00">POST请求：</strong>
>
> * post方法是把提交的数据放到HTTP包的Body中
> * 密文传递数据，数据量大，安全
> * 效率相对没有GET高
> * 对应的Servlet方法为*doPost()*

#### 7.1.2 request主要方法

> Request对象的两个核心接口是*ServletRequest*和*HttpServletRequest*，*HttpServletRequest*继承*ServletRequest*。

|                  方法名                   |             说明             |
| :---------------------------------------: | :--------------------------: |
|     String getParameter(String name)      | 根据表单组件名称获取提交数据 |
| void setCharacterEncoding(String charset) |      指定每个请求的编码      |

#### 7.1.3 Request应用

> HTML页面：

~~~html
<form action="/HelloServlet" method="post">
    <input type="text" name="name">
    <input type="text" name="age" >
    <input type="submit" value="提交">
</form>
~~~

> Servlet实现

~~~java
/** 示例代码 **/
@WebServlet(value = "/HelloServlet",loadOnStartup = 1)
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取表单提交的姓名
        String name = req.getParameter("name");
        //获取表单提交的年龄
        String age = req.getParameter("age");
        //业务逻辑
        System.out.println(req.getRemoteAddr()+"发来消息：name:"+name+" age: "+age);
    }
}
~~~



#### 7.1.4 GET请求收参乱码问题

> 产生乱码是因为服务器和客户端沟通的编码不一致造成的，因此解决的办法：
>
> * 在客户端和服务器之间设置一个统一的编码，之后就按照此编码进行数据的传输和接收。

#### 7.1.5 GET中文乱码

> 在Tomcat 7及以下版本，客户端以UTF-8的比年吗传输数据到服务器端，而服务器端的request对象使用的是ISO8859-1编码进行接收数据，服务器和客户端沟通的编码不一致因此才会产生中文乱码。
>
> 解决方案：在接收到数据后，西安获取request对象以ISO8859-1字符编码接收到的原始数据的字节数组，然后通过字节数组以指定的编码构建字符串，解决乱码问题。
>
> **Tomcat 8 以后的版本中不会出现乱码饿了，因为服务器对URL的编码格式可以自动进行转换。**

~~~java
/** 示例代码 **/
@WebServlet(value = "/HelloServlet",loadOnStartup = 1)
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取表单提交的姓名
        String name = req.getParameter("name");
        //处理乱码问题，tomcat 8以后无需处理，否则产生乱码
        name = new String( name.getBytes("ISO8859-1"),"UTF-8");
        //获取表单提交的年龄
        String age = req.getParameter("age");
        //业务逻辑
        System.out.println(req.getRemoteAddr()+"发来消息：name:"+name+" age: "+age);
    }
}
~~~



#### 7.1.6 POST中文乱码

> 由于客户端是以UTF-8字符编码将表单数据传输到服务器的，因此服务器也需要设置以UTF-8字符编码进行接收。
>
> 解决方案：使用从*ServletRequest*接口继承而来的*setCharacterEncoding()*方法进行统一的编码设置。

~~~java
/** 示例代码 **/
@WebServlet(value = "/HelloServlet",loadOnStartup = 1)
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理POST请求乱码问题，对get方法无效
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        //获取表单提交的姓名
        String name = req.getParameter("name");
        //获取表单提交的年龄
        String age = req.getParameter("age");
        //业务逻辑
        System.out.println(req.getRemoteAddr()+"发来消息：name:"+name+" age: "+age);
    }
}
~~~



### 7.2 Response对象

> Response对象用于响应客户请求并向客户端输出信息。

![image-20200721154508719](pic\Servlet笔记\image-20200721154508719.png)

#### 7.2.1 response主要方法

|               方法名称               |                             作用                             |
| :----------------------------------: | :----------------------------------------------------------: |
|     setHeader(String name,value)     |                          设置响应头                          |
|     setContentType(String type)      |  设置响应文件类型、响应的编码格式（告知浏览器使用utf8解码）  |
| setCharacterEncoding(String charset) | 设置服务端响应内容编码格式（告知Servlet使用UTF-8转码，不使用iso8859-1） |
|             getWriter()              |                        获取字符输出流                        |

> 案例：使用Response对象向浏览器输出HTML内容，实现用户登录后，输出Login Success

~~~java
/** 示例代码 **/
//获取字符输出流
@WebServlet(value = "/hello",loadOnStartup = 1)
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置编码格式，放置输出中文乱码
        resp.setContentType("text/plain;charset=UTF-8");
        //获取输出流
        PrintWriter writer = resp.getWriter();
        //返回响应页面
        writer.println("Hello World你好啊");
    }
}
~~~

* <strong style="color:#2fa589">如果输出内容包含中文，则出现乱码，因为服务器默认使用ISO8859-1对响应内容进行编码。</strong>

#### 7.2.2 解决输出中文乱码

##### 7.2.2.1 第一种解决方案

> * 设置服务器端响应的编码格式
> * 设置客户端响应内容的头内容的文件类型及编码格式

~~~java
/** 示例代码 **/
//设置服务器端编码格式为UTF-8
response.setCharacterEncoding("UTF-8");
//设置浏览器端解析时使用的编码格式
response.setHeader("Content-type","text/html;charset=UTF-8");
~~~



##### 7.2.2.2 第二种解决方案【<strong style="color:#2fa589">推荐</strong>】

> 同时设置服务端的编码格式和客户端响应的文件类型及响应时的编码格式。

~~~java
/** 示例代码 **/
response.setContentType("text/html;charset=UTF-8");
~~~



## 八、重定向和转发

### 8.1 现有问题

> 在之前的案例中，调用业务逻辑和先hi结果页面都在同一个Servlet里，就会产生设计问题：
>
> * 不符合单一职能原则、各司其职的思想
> * 不利于后期维护
>
> 应该将业务逻辑和显示结果分离开。

![image-20200721160735502](pic\Servlet笔记\image-20200721160735502.png)

#### 8.1.1 业务、显示分离

![image-20200721161007245](pic\Servlet笔记\image-20200721161007245.png)

* <strong style="color:#2fa589">问题：业务逻辑和显示结果分离后，如何跳转到显示结果的Servlet？</strong>
* <strong style="color:#2fa589">业务逻辑得到的数据结果如何传递给显示结果的Servlet？</strong>

### 8.2 转发

> 转发的作用在服务器端，将请求发送给服务器上的其他资源，以共同完成一次请求的处理。

#### 8.2.1 页面跳转

> 在调用业务逻辑的Servlet中，编写以下代码：
>
> ***request.getRequestDiapatcher("/目标URL-pattern").forward(request,response);***

* <strong style="color:#2fa589">使用forward跳转时，是在服务器内部跳转，地址栏不发生变化，属于同一次请求。</strong>

![image-20200721161448811](pic\Servlet笔记\image-20200721161448811.png)

#### 8.2.2 数据传递

> forward表示一次请求，是在服务器内部跳转，可以共享同一次request作用域中的数据
>
> * request作用域：拥有存储数据的空间，作用范围是一次请求有效（一次请求可以经过多次转发）
>   * 可以将数据存入到request后，在一次请求过程中的任意位置进行获取
>   * 可以传递任何数据（基本数据类型、对象、数组、集合等）
> * 存数据：***request.setAttribute(key,value)***
>   * 以键值对形式存储在request作用域中。key为*String*类型，value为*Object*类型。
> * 取数据：***request.getAttribute(key)***
>   * 通过String类型的key访问*Object*类型的value

#### 8.2.3 转发特点

> * 转发是服务器行为
> * 转发是浏览器只做了一次访问请求
> * 转发浏览器地址不变
> * 转发两次跳转之间传输的信息不会丢失，所以可以通过request进行数据的传递。
> * 转发只能将请求转发给同一个Web应用中的组件

### 8.3 重定向

> 重定向作用在客户端，将请求发送给服务器后，服务器响应个客户端一个新的请求地址，客户端重新发送新请求。

#### 8.3.1 页面跳转

> 在调用业务逻辑的Servlet中，编写以下代码
>
> * response.sendRedirect("目标URI");

* <strong style="color:#2fa589">URI：统一资源标识符（Uniform Resource Identifier），用来在服务器中定位一个资源，资源在web项目的路径下（/project/source）</strong>

![image-20200721162750922](pic\Servlet笔记\image-20200721162750922.png)

#### 8.3.2 数据传递

> sendRedirect()跳转时，地址栏改变，代表客户端重新发送的请求，属于两次请求。
>
> * response没有作用域，两次request请求中的数据无法共享。
> * 传递数据：客户端通过URI的拼接进行数据传递（"project/test?username=tom"）。
> * 获取数据：***request.getAttribute("username");***

#### 8.3.3 重定向特点

> * 重定向时客户端行为。
> * 重定向时浏览器做了至少两次的访问请求。
> * 重定向浏览器地址栏改变。
> * 重定向两次跳转之间传输的信息会丢失（request作用域内）
> * 重定向可以指向任何资源，包括当前应用程序中的其他资源、同一个站点上的其他应用程序中的资源、其他站点的资源。

### 8.4 转发、重定向总结

> 当两个Servlet需要传递数据时，选择forward转发，不建议使用sendRedirect进行传递。

## 九、Servlet生命周期

### 9.1 生命周期四个阶段

#### 9.1.1 实例化

> 当用户第一次访问Servlet时，由容器调用Servlet的构造器创建具体的Servlet对象，也可以在容器启动之后立刻创建实例。使用如下代码可以设置Servlet是否在服务器启动时九创建。
>
> < load-on-startup >1< /load-on-startup >
>
> * **注意：只执行一次**

#### 9.1.2 初始化

> 在初始化阶段，init()方法会被调用。这个方法在***javax.servlet.Servlet***接口中定义。其中，方法以一个ServletConfig类型的对象作为参数。
>
> * 注意：init方法只被执行一次

#### 9.1.3 服务

> 当客户端有一个请求时，容器就会将请求ServletRequest与响应ServletResponse对象传递给Servlet，以参数的形式传递给service()方法。
>
> * 此方法会执行多次。

#### 9.1.4 销毁

> 当Servlet容器停止或重新启动时，都会引起销毁Servlet对象并调用destroy()方法。
>
> * destroy()方法只会执行一次。

![image-20200721164752565](pic\Servlet笔记\image-20200721164752565.png)

> Servlet代码如下：

~~~java
/** 示例代码 **/
/**
 * 演示Servlet生命周期
 * 1、实例化
 * 2、init:初始化
 * 3、service：服务
 * 4、destroy：销毁
 */
@WebServlet(name = "LifeServlet",value = "/life")
public class LifeServlet extends HttpServlet {
    public LifeServlet() {
        super();
        System.out.println("1.完成了实例化");
    }

    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("2.完成了初始化");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("3.服务中");
    }

    @Override
    public void destroy() {
        System.out.println("4.销毁");
        super.destroy();
    }
}
~~~



## 十、Servlet特性

### 10.1 线程安全问题

> Servlet在访问之后，会执行实例化操作，创建一个Servlet对象。而我们Tomcat容器可以同时多个线程并发访问同一个Servlet，如果在方法中对成员变量做修改操作，就会有线程安全问题。

### 10.2 如何保证线程安全

> * synchronized关键字
>   * 将存在线程安全问题的代码放到同步代码块中。
> * 实现SingleThreadModel接口
>   * Servlet实现SingleThreadModel接口后，每个线程都会创建Servlet示例，遮掩给每个客户端请求就不存在资源共享问题，但是servlet响应客户端请求的效率太低，因此已经淘汰。
> * <strong style="color:#F36D00">提示：尽可能使用局部变量，避免使用成员变量。</strong>

> 案例演示：

~~~java
/** 示例代码 **/
@WebServlet(value = "/ss")
public class SafeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //假设1.接收参数
        //2.调用业务逻辑，得到登录结果
        //OR 登录失败
        //多线程并发下使用同步锁效率不高
        //解决方法：1.使用同步锁 2.实现SingleThreadModel接口（已过时，资源浪费）3.尽量使用局部变量
        resp.setContentType("text/html;charset=UTF-8");
        String message = "登录成功";
        PrintWriter writer = resp.getWriter();
        writer.println(message);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
~~~



### 十一、状态管理

### 11.1 现有问题

> * HTTP协议是无状态的，不能保存每次提交的信息。
> * 如果用户发起一个新的请求，服务器无法知道它是否与上次的请求有联系。
> * 对于那些需要多次提交数据才能完成的Web操作，比如登录来说，就成问题了。

### 11.2 概念

> 将浏览器与Web服务器之间多次交互当作一个整体来处理，并且将多次交互所涉及的数据（即状态）保存下来。

#### 11.3 状态管理分类

> * 客户端状态管理技术：将状态保存在客户端。代表性的是Cookie技术。
> * 服务器状态管理技术：将状态保存在服务器端。代表性的是session技术（服务器传递sessionID时需要使用Cookie的方式）和application。

## 十二、Cookie的使用

### 12.1 什么是Cookie

> * Cookie是在浏览器访问Web服务器的某个资源时，由Web服务器在HTTP响应消息头中附带传送给浏览器的一小段数据。
> * 一旦Web浏览器保存了某个Cookie，那么它在以后每次访问该Web服务器时，都应在HTTP请求头中将这个Cookie回传给Web服务器。
> * 一个Cookie主要由标识该信息的名称（name）和值（value）组成。

|                          Cookie原理                          |
| :----------------------------------------------------------: |
| ![image-20200721170737840](pic\Servlet笔记\image-20200721170737840.png) |



### 12.2 创建Cookie

~~~java
/** 示例代码 **/
@WebServlet(value = "/cookie")
public class CookieServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //1.创建Cookie对象
        Cookie cookie=new Cookie("username", "gavin");
        //1.1 设置Cookie的访问路径
        cookie.setPath("/web/get");
        //1.2设置cookie的生命周期
        //>0有效期单位s，=0浏览器关闭，<0内存存储
        cookie.setMaxAge(60*60);
        //2.将Cookie响应给客户端
        resp.addCookie(cookie);

        Cookie cookie1=new Cookie("password", "123456");
        cookie1.setMaxAge(60*60);
        cookie.setPath("/web");
        resp.addCookie(cookie1);
    }
}
~~~

<strong style="color:#F36D00">注意：有效路径：当前访问资源的上一级目录，不带主机名</strong>

### 12.3 获取Cookie

~~~java
/** 示例代码 **/
@WebServlet(value = "/get")
public class GetCookieServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                //检索出自己的Cookie
                System.out.println(URLDecoder.decode(cookie.getName(), "UTF-8") + "  " + URLDecoder.decode(cookie.getValue(),"UTF-8"));
            }
        }
    }
}
~~~



### 12.4 修改Cookie

> 只需要保证Cookie的名称和路径一致即可修改。

~~~java
/** 示例代码 **/
//创建Cookie
Cookie ck = new Cookie("code",code);
//设置Cookie的路径
ck.setPath("/webs");
//设置Cookie有效期：>0 有效期；=0 失效；<0 内存存储
ck.setMaxAge(-1);
reponse.addCookie(ck);
~~~

* <strong style="color:#2fa589">注意：如果改变Cookie的name和有效路径会新建Cookie，而改变Cookie的值，有效期会覆盖原有Cookie。</strong>

### 12.5 Cookie编码与解码

> Cookie中是不需要出现中文的，只能包含ASCII字符，所以Cookie需要对Unicode字符进行编码，否则会出现乱码。
>
> * 编码可以使用*java.net.URLEncoder*类的encode(String str,String encoding)方法
> * 解码可以使用*java.net.URLDecoder*类的decode(String str,String encoding)方法

#### 12.5.1 创建含中文Cookie

~~~java
/** 示例代码 **/
//使用中文的Cookie，name和value都使用UTF-8编码。
Cookie cookie = new Cookie(
    URLEncoder.encode("姓名","UTF-8"),
    URLEncoder.encode("张三","UTF-8"));
response.addCookie(cookie);
~~~

#### 12.5.2 读取带中文Cookie

~~~java
/** 示例代码 **/
@WebServlet(value = "/get")
public class GetCookieServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(URLDecoder.decode(cookie.getName(), "UTF-8") + "  " + URLDecoder.decode(cookie.getValue(),"UTF-8"));
            }
        }
    }
}
~~~



### 12.6 Cookie路径问题

> 1. 服务器端每次访问的cookie是每次请求头中发送给服务器端的
> 2. 客户端每次请求只发送当前路径下和“直系”关系的父路径的cookie（父路径的页面是不能访问子路径和兄弟路径的cookie的）
> 3. setcookie如果不设置路径，默认为当前页面的路径，父亲路径的页面是无法访问的
> 4. "/"这个根路径可以在任何路径下访问，求简单可以把cookie都放在这里。



### 12.7 Cookie优点和缺点

#### 12.7.1 Cookie的优点

> 1. 可以配置到期规则。
> 2. 简单性：Cookie是一种基于文本的轻量结构，包含简单的键值对。
> 3. 数据持久性：Cookie默认是在过期之前是可以一致存在客户端浏览器上的。

#### 12.7.2 Cookie的缺点

> 1. 大小收到限制：大多数浏览器对Cookie的大小有4K、8K字节的限制。
> 2. 用户配置为禁用：有些用户禁用了浏览器或客户端设备接收Cookie的能力，因此限制了这一功能。
> 3. 潜在的安全风险：Cookie可能会被篡改。会对安全性造成潜在风险或者导致依赖于Cookie的应用程序失败。

## 十三、Session对象【<strong style="color:#F36D00">重点</strong>】

### 13.1 Session概述

> * Session用于记录用户的状态。Session指的是在一段时间内，单个客户端于Web服务器的一连串相关的交互过程。
> * 在一个Session中，客户可能会多次请求访问同一个资源，也有可能请求访问各种不同的服务器资源。

### 13.2 Session原理

> * 服务器会为每一次会话分配一个Session对象
> * 同一个浏览器发起的多次请求，同属于一次会话(Session)
> * 首次使用到Session时，服务器会自动创建Session，并创建Cookie存储sessionID发送回客户端

* <strong style="color:#2fa589">注意：session是由服务端创建的。</strong>

### 13.3 Session使用

> * Session作用域，拥有存储数据的空间，作用范围一次会话有效。
>   * 一次会话是使用同一浏览器发送的多次请求。一旦浏览器关闭，则结束会话。
>   * 可以将数据存入Session中，在一次会话的任意位置进行获取。
>   * 可传递任何数据（基本数据类型、对象、集合、数组等）。

#### 13.3.1 获取Session

~~~java
/** 示例代码 **/
HttpSession session = request.getSession();
//session的唯一标识
System.out.println("id: "+session.getId());
~~~



#### 13.3.2 保存数据到Session

> setAttribute(属性名，Object)保存数据到Session中。

~~~java
/** 示例代码 **/
//以键值对形式存储在session作用域中。
session.setAttribute("key",value);
~~~

#### 13.3.3 从Session获取数据

> getAttribute(属性名);获取sessoin中数据。

~~~java
/** 示例代码 **/
//通过String类型的key访问Object类型的value
session.getAttribute("key");
~~~

#### 13.3.4 Session移除数据

> removeAttribute(属性名); 从Session中删除数据。

~~~java
/** 示例代码 **/
//通过key删除session中保存的对应数据。
session.removeAttribute("key");
~~~

#### 13.3.5 Session超时设置

> 可以手动指定Session的超时时间，超过这个时间Session自动失效

~~~java
/** 示例代码 **/
@WebServlet(name = "LifeSessionServlet", value = "/life")
public class LifeSessionServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        //设置session有效期为10秒
        //session.setMaxInactiveInterval(10);
        String id = session.getId();
        System.out.println(id);
        //设置session立即失效
        //session.invalidate();
        //url重写 在原来的地址上追加sessionID
        String s = response.encodeRedirectURL("/web/gets");
        System.out.println(s);
        response.sendRedirect(s);
    }
}
~~~

#### 13.3.6 Session失效

> Session失效的三种情况：
>
> * 浏览器关闭
> * Session超过有效期
> * 手动销毁Session

~~~java
/** 示例代码 **/
//设置Session有效期，过期则Session失效
session.setMaxInactiveInterval(60*60);
//手动销毁
session.invalidate();
~~~

### 13.4 浏览器禁用Cookie的解决方案

#### 13.4.1 浏览器禁用Cookie的后果

> 服务器在默认情况下，会使用Cookie的方式将sessionID发送给浏览器，如果用户禁止Cookie，则sessionID不会被浏览器保存，此时，服务器可以使用如URL重写这样的方式来发送sessionID.

#### 13.4.2 URL重写

> 浏览器在访问服务器上的某个地址时，不再使用原来的那个地址，而是使用经过改写的地址（即在原来的地址后面加上了sessionID）。

#### 13.4.3 实现URL重写

> response.encodeRedirectURL(String url); 生成重写的URL。

~~~java
/** 示例代码 **/
@WebServlet(name = "LifeSessionServlet", value = "/life")
public class LifeSessionServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //必须先获取session后续设置才会生效
        HttpSession session = request.getSession();
        //url重写 在原来的地址上追加sessionID
        String s = response.encodeRedirectURL("/web/gets");
        System.out.println(s);
        response.sendRedirect(s);
    }
}
~~~

* <strong style="color:#F36D00">注意：必须先获取Session，URL重写才会生效！！！</strong>

### 13.5 Session与Request的区别

> * request是一次请求有效，请求改变，则request改变。
> * session是一次会话有效，浏览器改变，则session改变（浏览器关闭、session过期、服务端手动失效session）

### 13.6 Session的生命周期

> * 开始：第一次使用到Session的请求产生，则创建Session
> * 结束：见13.3.5
>   * 浏览器关闭，则失效
>   * Session超时，则失效
>   * 手动销毁，则失效

### 13.7 Session的典型案例

#### 13.7.1 Session实现权限验证

![image-20200721203958304](pic\Servlet笔记\image-20200721203958304.png)

~~~java
/** 示例代码 **/
@WebServlet(value = "/loginMgr")
public class LoginMgrController extends HttpServlet {
    private ManagerService managerService = new ManagerServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.处理乱码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        //2.接收参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String inputVcode = req.getParameter("inputVcode");

        HttpSession session = req.getSession();

        String vcode = (String) session.getAttribute("codes");
        //验证验证码
        if (!inputVcode.isEmpty()&&inputVcode.equalsIgnoreCase(vcode)){
            //3.调用业务方法
            Manager login = managerService.login(username, password);
            if (login != null) {
                //登录成功
                //保存信息
                session.setAttribute("managerInfo", login);

                //跳转
                resp.sendRedirect("/web/showallcontroller");
            } else {
                resp.sendRedirect("/web/loginMgr.html");
            }
            //4.处理结果，流程跳转
        }else {
            resp.sendRedirect("/web/loginMgr.html");
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
~~~



#### 13.7.2 Session实现保存验证码

> * 导入ValidateCode.jar
> * 创建生成验证码的Servlet

~~~java
/** 示例代码 **/
@WebServlet(value = "/createCode")
public class CreateCodeController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.创建验证码图片
        ValidateCode code=new ValidateCode(200,30,4,20);
        HttpSession session = req.getSession();
        session.setAttribute("codes", code.getCode());
        //2.验证码图片响应给前端
        code.write(resp.getOutputStream());
    }
}
~~~



## 十四、ServletContext对象【<strong style="color:#F36D00">重点</strong>】

### 14.1 ServletContext概述

> * 全局对象，也拥有作用域，对应一个Tomcat中的Web应用。
> * 当Web服务器启动时，会为每一个Web应用程序创建一个共享的存储区域（ServletContext）。
> * ServletContext在Web服务器启动时创建，服务器关闭时销毁。

### 14.2 获取ServletContext对象

> * GenericServlet提供了getServletContext()方法。*this.getServletContext()*【<strong style="color:#2fa589">推荐</strong>】
> * HttpServletRequest提供了getServletContext()方法。【<strong style="color:#2fa589">推荐</strong>】
> * HttpSession提供了getServletContext()方法。

### 14.3 ServletContext的作用

#### 14.3.1 获取项目真实路径

> 获取当前项目在服务器发布的真实路径。

~~~java
/** 示例代码 **/
String realPath = servletContext.getRealPath("/");
~~~



#### 14.3.2 获取项目上下文路径

> 获取当前项目上下文路径（应用程序名称）

~~~java
/** 示例代码 **/
//上下文路径（应用程序名称）
String contextPath = servletContext.getContextPath();
String contextPath1 = request.getContextPath();
~~~



#### 14.3.3 全局容器

> ServletContext拥有作用域，可以存储数据到全局容器中
>
> * 存储数据：servletContext.setAttribute("key"value);
> * 获取数据：servletContext.getAttribute("key");
> * 删除数据：servletContext.removeAttribute("key");

### 14.4 ServletContext的特点

> * 唯一性：一个应用对应一个servlet上下文。
> * 生命周期，只要容器不关闭或者应用不卸载，servlet上下文就一直存在。

### 14.5 ServletContext应用场景

> servletContext统计当前项目访问次数。

~~~java
/** 示例代码 **/
@WebServlet(value = "/count")
public class CountServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = this.getServletContext();
        Integer count= (Integer) servletContext.getAttribute("total");
        if (count==null){
            count=1;
        }else {
            count++;
        }
        servletContext.setAttribute("total",count);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
~~~

### 14.6 作用域总结

> * HttpServletRequest： 一次请求，请求响应之前有效。
> * HttpSession：一次会话开始，浏览器不关闭或不超时之前有效。
> * ServletContext：服务器启动开始，服务器停止之前有效。

## 十五、过滤器Filter

### 15.1 现有问题

> 在以往的Servlet中，存在很多冗余代码，多个Servlet都要编写。

### 15.2 Filter概念

> 过滤器（Filter）是处于客户端与服务器目标资源之间的一道过滤技术。

![image-20200722094102735](pic\Servlet笔记\image-20200722094102735.png)

### 15.3 过滤器作用

> * 执行地位在Servlet之前，客户端发送请求时，会先经过Filter，再到达目标Servlet中；响应时，会根据执行流程再次反向执行Filter。
> * 可以解决多个Servlet共性代码的冗余问题（例如：乱码处理、登录验证等）

### 15.4 编写过滤器

> Servlet API中提过了一个Filter接口，开发人员编写一个Java类实现这个接口即可，这个Java类称之为Filter。

### 15.4.1 实现过程

> * 编写Java类实现Filter接口。
> * 在doFilter方法中编写拦截逻辑。
> * 设置拦截路径。

> 拦截器示例代码：

~~~java
/** 示例代码Filter **/
@WebFilter(urlPatterns = {"/t"})
public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }
    
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //1.执行拦截逻辑
        System.out.println("---MyFilter---");
        //2.放行请求
        filterChain.doFilter(servletRequest,servletResponse );
        System.out.println("---MyFilter  End---");
    }
    
    @Override
    public void destroy() {
    }
}
~~~

### 15.5 过滤器配置

#### 15.5.1 注解配置

> 在自定义的Filter类上使用注解@WebFilter(value="/目标资源")

#### 15.5.2 xml配置

~~~xml
<!-- 示例代码 -->
<filter>
	<filter-name>myFilter</filter-name>
<filter-class>com.qianfeng.filter.MyFilter</filter-class>
</filter>
<filter-mapping>
	<filter-name>myFilter</filter-name>
	<url-pattern>/myFilterTest</url-pattern>
</filter-mapping>
~~~

#### 15.5.3 关于拦截路径

> 过滤器的拦截路径通常有三种方式：
>
> 1. 精确拦截匹配：如/index.jsp、/myservlet等
> 2. 后缀拦截匹配：如\*.jsp、\*.html、\*.jpg等
> 3. 通配符拦截匹配：/*  标识拦截所有。注意：过滤器不能使用 / 匹配

### 15.6 过滤器链和优先级

#### 15.6.1 过滤器链

> 客户端对服务器请求之后，服务器调用Servlet之前会执行一组过滤器（多个过滤器），那么这组过滤器就称为一条过滤器链。
>
> 每个过滤器实现某个特定的功能，当第一个Filter的doFilter方法被调用时，Web服务器会创建一个代表Filter链的FIlterChain对象传递该方法。在doFilter方法中，开发人员如果调用了FilterChain对象的doFilter方法，则Web服务器会检查FilterChain对象中是否还有Filter，如果有，则调用下一个Filter，如果没有，则调用目标资源。

![image-20200722095741399](pic\Servlet笔记\image-20200722095741399.png)

#### 15.6.2 过滤器优先级

> 在一个Web应用中，可以开发编写多个Filter，这些Filter组合起来称为FIlter链。
>
> 优先级：
>
> * 如果全为注解的话，是按照类全名称的字符串顺序决定作用顺序。
> * 如果为web.xml，按照filter-mapping注册顺序，由上至下执行。
> * web.xml配置方式优先级高于注解方式。
> * 如果注解和web.xml同时配置，会创建多个过滤器对象，造成过滤多次。

### 15.7 过滤器典型应用

#### 15.7.1 过滤器解决乱码

~~~java
/** 示例代码 **/
//这种方式会对静态资源也进行编解码，会产生乱码，可以考虑根据请求类型排除静态资源
@WebFilter(value = "/*")
public class EncodingFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //统一处理请求和响应的乱码
        servletRequest.setCharacterEncoding("UTF-8");
        servletResponse.setContentType("text/html;charset=UTF-8");
        //放行目标资源
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
~~~

#### 15.7.2 过滤器实现权限验证

~~~java
/** 示例代码 **/
@WebFilter(filterName = "CheckFilter", value = "/showallcontroller")
public class CheckFilter implements Filter {
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        //权限验证：验证管理员是否登录
        HttpServletRequest request = (HttpServletRequest) req;
        HttpSession session = request.getSession();
        Manager managerInfo = (Manager) session.getAttribute("managerInfo");
        if (managerInfo != null) {
            chain.doFilter(req, resp);
        } else {
            HttpServletResponse response= (HttpServletResponse) resp;
            response.sendRedirect("/web/loginMgr.html");
        }
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }
}
~~~

## 十六、拦截器