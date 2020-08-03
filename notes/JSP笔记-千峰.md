# JSP笔记

[TOC]

## 一、引言

### 1.1 现有问题

> 在之前学习Servlet时，服务端通过Servlet响应客户端页面，有什么不足之处？
>
> * 开发方式麻烦：继承父类、覆写方法、配置web.xml或注解
> * 代码修改麻烦：重新编译、部署、重启服务
> * 显示方式麻烦：获取流、使用println("");逐行打印
> * 协同开发麻烦：UI负责美化页面，程序员负责编写代码。UI不懂Java，程序员又不能将所有前端页面的内容通过流输出

## 二、JSP（Java Server Page）

### 2.1 概念

> 简化的Servlet设计，在HTML标签中嵌套Java代码，用以高效开发Web应用的动态网页

### 2.2 作用

> 替换显示页面部分的Servlet（使用*。jsp文件替换XXXJSP.java）

## 三、JSP开发【 <span style="color:orange;">重点</span> 】

### 3.1 创建JSP

#### 3.1.1 新建文件

> 在web目录下新建*.jsp文件（与 **WEB-INF**平级）

#### 3.1.2 JSP编写Java代码

~~~jsp
<!-- 代码示例 -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>This is my first page</title>
  </head>
  <body>
  		<%= new java.util.Date() %>
  </body>
</html>

~~~

#### 3.1.3 访问JSP

> 在浏览器输入 http://ip:port/项目路径/资源名称

### 3.2 JSP与Servlet

> * 关系
>   * JSP文件在容器中会转换成Servlet执行
>   * JSP是对Servlet的一种高级封装。本质还是Servlet
> *	区别
> 	* 与Servlet相比：JSP可以很方便的编写或者修改HTML网页而不用去面对大量的println语句

![image-20200702162414647](pic\JSP笔记\image-20200702162414647.png)

### 3.3 JSP实现原理

> Tomcat会将xxx.jsp转换成Java代码，进而编译成 *.class*文件，最终将运行结果通过 *response*响应给客户端

![image-20200702162649685](pic\JSP笔记\image-20200702162649685.png)

#### 3.3.1 JSP.java源文件存放目录

> 使用IDEA开发工具，Tomcat编译后的JSP（Xxx_jsp.class和Xxx_jsp.java）的存放地点：
>
> c:\用户\用户名\.IntelliJIdea2019.1\system\tomcat\项目名称\work\Catalina\localhost\应用上下文\org\apache\jsp

## 四、JSP与HTML集成开发

### 4.1 脚本

> 脚本可以编写Java语句、变量、方法或表达式。

#### 4.1.1 普通脚本

> 语法：<% Java代码%>

~~~jsp
<!-- 代码示例 --><
body>
    Hello World!<br/>
    <%
    	//jsp中使用小脚本嵌入Java代码！
    	//打印内容在客户端页面
    	out.println("HI");
    	//打印内容在控制台
    	System.out.println("HI");
    %>
</body>
~~~

* <font color="#42b983" size=3>**经验：普通脚本可以使用所有Java语法**
 </font>
* <font color="#42b983" size=3>**注意：脚本与脚本之间不可嵌套，脚本与HTML标签不可嵌套**</font>

#### 4.1.2 声明脚本

> 语法：<%! 定义变量、函数 %>

~~~jsp
<!-- 代码示例 -->
<%! int i=0; %>
<%! int a,b,c; %>
<%! Object object = new Object(); %>
<%!
    //定义方法
    public void m1(){
    	System.out.println("你好");
	}
%>
~~~

* <font color="#42b983" size=3>**注意：声明脚本声明的变脸过时全局变量。**</font>
* <font color="#42b983" size=3>**声明脚本的内容必须在普通脚本<%%>中调用**</font>
* <font color="#42b983" size=3>**如果声明脚本中的函数具有返回值，使用输出脚本<%= %>调用**</font>

#### 4.1.3 输出脚本

> 语法：<%= Java表达式 %>

~~~jsp
<!-- 代码示例 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<html>
    <head>
        <meta charset="utf-8">
        <title>jsp基本使用</title>
    </head>
    <body>
        <p>
            今天的日期是：<%= new java.util.Date() %>
        </p>
    </body>
</html>
~~~

* <font color="#42b983" size=3>**经验：输出脚本可以输出带有返回值的函数**</font>
* <font color="#42b983" size=3>**经验：输出脚本中不能加 ';'**</font>

### 4.2 JSP注释

>JSP注释主要有两个作用：
>
>1. 为代码作注释
>2. 将某段代码注释掉

#### 4.2.1 语法规则

| 语法             | 描述                                                 |
| ---------------- | ---------------------------------------------------- |
| <%--  注释  --%> | JSP注释，注释内容不会被发送到浏览器甚至不会被编译    |
| <!--  注释  -->  | HTML注释，通过浏览器查看网页源代码时可以看见注释内容 |

 #### 4.2.2 注释

~~~jsp
<!-- 代码示例 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<html>
    <head>
        <meta charset="utf-8">
        <title>jsp基础教程</title>
    </head>
    <body>
        <%-- JSP注释在网页中不会被显示 --%>
    	<!--  HTML注释在网页源代码中会显示 -->
        <p>
            今天的日期是：<%= new java.util.Date() %>
        </p>
    </body>
</html>
~~~

### 4.3 JSP指令

> JSP指令用来设置与整个JSP页面相关的属性

| 指令               | 描述                                                    |
| ------------------ | ------------------------------------------------------- |
| <%@ page ...%>     | 定义页面的依赖属性，比如脚本语言、error页面、缓存需求等 |
| <%@ include ... %> | 包含其他文件                                            |
| <%@ taglib ... %>  | 引入标签库的定义，可以是自定义标签                      |

#### 4.3.1 Page指令

> * 语法： <%@ page attribute1="value1" attribute2="value2" %>
> * Page指令为容器提供当前页面的是哟个说明。一个JSP页面可以包含多个page指令

|       属性       | 描述                                                         |
| :--------------: | :----------------------------------------------------------- |
| **contentType**  | 指定当前JSP页面的MIME类型和字符编码格式。                    |
|  **errorPage**   | 指定当JSP页面发生异常时需要转向的错误处理页面。              |
| **isErrorPage**  | 指定当前页面是否可以作为另一个JSP页面的错误处理页面。        |
|    **improt**    | 导入要使用的Java类                                           |
|   **language**   | 定义JSP页面所使用的脚本语言，默认是Java。                    |
|   **session**    | 指定JSP页面是否使用session。默认为true立即创建，false为使用时创建。 |
| **pageEncoding** | 指定JSP页面的解码格式。                                      |

#### 4.3.2 include指令

> * 语法：<%@ include file="被包含的JSP文件路径" %>
> * 通过*include*指令来包含其他文件。
> * 被包含的文件可以是JSP文件、HTML文件或文本文件。包含的文件就好像是该JSP文件的一部分，会被同时执行编译(静态包含)。

~~~jsp
<!-- 代码示例 -->
<%@ include file="header.jsp" %>
...
...
<%@ include file="footer.jsp" %>
~~~

* <p style="color:#42b983;font-size:15px;font-weight:bolder;">注意：可能会有重名的冲突问题，不建议使用</p>

#### 4.3.3 taglib指令

>* 语法：<%@ taglib uri="外部标签库路径" prefix="前缀" %>
>* 引入JSP标签的标准标签库

~~~jsp
<!-- 代码示例 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
~~~

### 4.4 动作标签

> * 语法：<jsp:action_name attribute1="value1" />
> * 动作标签指的是JSP页面在运行期间的命令

#### 4.4.1 include

> * 语法：<jsp:include page="相对URLd地址" />
> * <jsp:include >动作元素会将外部文件输出结果包含在JSP中（动态包含）。

| 属性 | 描述                        |
| ---- | --------------------------- |
| page | 包含在页面中的相对URL地址。 |

~~~jsp
<!-- 代码示例 -->
<jsp:include page="index.jsp" />
~~~

* <p style="color:#42b983;font-size:15px;font-weight:bolder;">注意：前面已经介绍国include指令，它是将外部文件的输出代码复制到了当前JSP文件中。而这里的jsp:include动作不同，是将外部文件的输出结果引入到了当前JSP文件中。</p>

#### 4.4.2 useBean

> * 语法：<jsp:useBean id="name" class="package.className" />
> * jsp:useBean动作用来加载一个将在JSP页面中使用的JavaBean

~~~jsp
<!-- 代码示例 -->
<jsp:useBean id="user" class="com.rainbase.common.entity.UserEntity" />
~~~

* <p style="color:#42b983;font-size:15px;font-weight:bolder;">在类载入后，我们可以通过 jsp:setProperty 和 jsp:getProperty 动作来修改和获取bean的属性 </p>
#### 4.4.3 setProperty

> 可以在jsp:useBean元素之后使用jsp:setProperty进行属性的赋值

|   属性   | 描述                                             |
| :------: | ------------------------------------------------ |
|   name   | name属性是必须的。它表示要设置属性的是那个Bean。 |
| property | property属性是必须的。它表示要设置哪个属性。     |
|  value   | value属性是可选的。该属性用来指定Bean属性的值。  |

~~~jsp
<!-- 示例代码 -->
<jsp:useBean id="userTest" class="com.rainbase.entity.User" />
<jsp:setProperty name="userTest" property="username" value="gavin" />
<jsp:setProperty name="userTest" property="password" value="123456" />
~~~

#### 4.4.4 getProperty

> jsp:getProperty动作提取指定Bean属性的值，转换成字符串，然后输出。

~~~jsp
<!-- 语法示例 -->
<jsp:useBean id="userTest" class="com.rainbase.entity.User" />
<jsp:setProperty name="userTest" property="username" value="gavin"/>
<jsp:getProperty name="userTest" property="username" />
~~~

#### 4.4.5 forward

> * 语法：<jsp:forward page="相对 URL 地址" />
> * jsp:forward动作把请求转发到另外的页面

| 属性 | 描述                        |
| :--: | --------------------------- |
| page | page属性包含的是一个相对URL |

~~~jsp
<!-- 代码示例 -->
<jsp:forward page="index.jsp" />
~~~

#### 4.4.6 param

> * 语法：<jsp:param name="" value="" />
> * 在转发动作内部使用，做参数传递

~~~JSP
<!-- 代码示例 -->
<jsp:forward page="index.jsp">
    <!-- http请求参数传递 -->
    <jsp:param name="sex" value="female" />
</jsp:forward>

<!-- 目标页面参数获取(取得值为 female) -->
<%= request.getParameter("sex") %>
~~~

### 4.5 内置对象

#### 4.5.1 九大内置对象

> 由JSP自动创建的对象，可以直接使用

|     对象名      | 类型                                   | 说明                        |
| :-------------: | -------------------------------------- | --------------------------- |
|   **request**   | javax.servlet.http.HttpServletRequest  |                             |
|  **response**   | javax.servlet.http.HttpServletResponse |                             |
|   **session**   | javax.servlet.http.HttpSession         | 由session="true"开关        |
| **application** | javax.servlet.ServletContext           |                             |
|   **config**    | javax.servlet.ServletConfig            |                             |
|  **exception**  | java.lang.Throwable                    | 由isErrorPage="false"开关   |
|     **out**     | javax.servlet.jsp.JspWriter            | javax.servlet.jsp.JspWriter |
| **pageContext** | javax.servlet.jsp.PageContext          |                             |
|    **page**     | java.lang.Object当前对象this           | 当前 jsp servlet实例        |

#### 4.5.2 四大域对象

> JSP有四大作用域对象，存储数据和获取数据的方式相同，不同的是取值的范围有差别
>
> * **pageContext**: *javax.servlet.jsp.PageContext*)  当前JSP页面范围
> * **request**: *javax.servlet.http.HttpServletRequest*一次请求有效
> * **session**: *javax.servlet.http.HttpSession* 一次会话有效（浏览器关闭则失效）
> * **application**: *javax.servlet.ServletContext* 整个Web应用有效（服务器关闭失效）

#### 4.5.3 pageContext对象

> * pageContext对象是javax.servlet.jsp.PageContext类的实例，拥有作用域，用来代表整个JSP页面。
> * 当前页面的作用域对象，一旦跳转则失效。
> * 通过*setAttribute("name",value);*存储值。
> * 通过*getAttribute("name");*获取值。
> * 用户获取其他 *8*个内置对象或者操作其他对象的作用域。

~~~jsp
<!-- 代码示例 -->
<%
	//当前页面作用域有效
	pageContext.setAttribute("name",value)
%>
~~~



#### 4.5.4 pageContext获取其他内置对象

~~~jsp
<%
	//获取request内置对象
    pageContext.getRequest();
    //获取response内置对象
    pageContext.getResponse();
    //获取config内置对象
    pageContext.getServletConfig();
    //获取exception内置对象
    pageContext.getException();
    //获取page内置对象
    pageContext.getPage();
    //获取out内置对象
    pageContext.getOut();
    //获取application内置对象
    pageContext.getServletContext();
    //获取session内置对象
    pageContext.getSession();
%>
~~~

#### 4.5.5 pageContext操作其他内置对象的作用域

> pageContext对象可以操作其他作用域存储和获取。

~~~jsp
<%
    String value="aaa";
    //操作其他作用域存储
    //当前页面有效
    pageContext.setAttribute("name", value);
    //request作用域
    pageContext.setAttribute("name", value,PageContext.REQUEST_SCOPE);
    //session作用域
    pageContext.setAttribute("name", value,PageContext.SESSION_SCOPE);
    //application作用域
    pageContext.setAttribute("name", value,PageContext.APPLICATION_SCOPE);
    
    //操作其他作用域取值
    //当前页面作用域
    pageContext.getAttribute("name");
    //request作用域
    pageContext.getAttribute("name",PageContext.REQUEST_SCOPE);
    //session作用域
    pageContext.getAttribute("name",PageContext.SESSION_SCOPE);
    //application作用域
    pageContext.getAttribute("name",PageContext.APPLICATION_SCOPE);
    //从pageContext、request、session、application依次查找
    pageContext.findAttribute("name");
%>
~~~

## 五、EL表达式(Expression Language)

### 5.1 概念

> JSP表达式语言（EL）使得访问存储在JavaBean中的数据变得非常简单。JSP EL既可以用来创建算术表达式也可以用来创建逻辑表达式。在JSP EL表达式内可以使用整数型、浮点数、字符串、常量true、false，还有null。

### 5.2 作用

> 用于替换作用域对象.getAttribute("name");

### 5.3 EL的应用（获取基本类型、字符串）

> * *${scope.name}* 获取具体某个作用域中的数据
> * *$(name)* 获取作用域中的数据，逐级查找（pageContext、request、session、application）

#### 5.3.1 EL应用案例

~~~jsp
<!-- 代码示例 -->
<%
    //存储在request作用域
    request.setAttribute("name", "tom");
    request.setAttribute("age", 18);
%>
<!--获取request作用域中name对应的值，找到就返回，找不到返回""-->
${requestScope.name}
<!--从最小作用域逐级（pageContext,request,session,application）查找name对应的值，找到就返回，找不到返回""-->
*${name}*
~~~

~~~jsp
<!-- 代码示例 -->
<%
    request.setAttribute("key1", "requestvalue");
    session.setAttribute("key2", "sessionvalue");
    application.setAttribute("key3","applicationvalue");
%>

<%--通过作用域对象获取数据--%>
<h1>request: <%= request.getAttribute("key1")%></h1>
<h1>session: <%= session.getAttribute("key2")%></h1>
<h1>application: <%= application.getAttribute("key3")%></h1>

<%--通过EL表达式获取数据--%>
<h1>request: ${requestScope.key1}</h1>
<h1>session: ${sessionScope.key2}</h1>
<h1>application: ${applicationScope.key3}</h1>
<h1>${key1}</h1>
<h1>${key2}</h1>
<h1>${key3}</h1>
~~~

#### 5.3.2 EL和JSP脚本的区别

> <!-- JSP脚本没有找到则返回 null -->
>
> <%= request.getAttribute("name") %>
>
> <!-- EL表达式没有找到则返回 "" -->
>
> ${requestScope.name}

~~~jsp
<!-- 代码示例 -->
<h1>key8: <%= request.getAttribute("key8")%></h1>
<h2>key8： ${key8}</h2>
~~~

### 5.4 EL的应用（获取引用类型）

> 使用EL获取作用域中的对象调用属性时，只能访问对象的get方法，必须遵守命名规范定义

~~~jsp
<!-- 代码示例 -->
<%
	Emp e = new Emp();
	e.setName("user");
	e.setAge(19);
	request.setAttribute("e",e);
%>
<!-- 实际是调用getName()方法获取属性 -->
${requestScope.e.name}
~~~

### 5.5 EL的应用（获取数组、集合的元素）

> EL可以获取Array、list、map中的元素，Set由于没有下标，后续可遍历
>
> **<font color="red">提示：EL本身是不支持循环的，需要配合JSTL使用</font>**

~~~jsp
<!-- 代码示例 -->
<%
	int[] array = new int[]{1,2,3,4,5};
	request.setAttribute("array",array);

	List<Emp> emps = new ArrayList<>();
	emps.add(new Emp(1,"gavin",2000,19));
	emps.add(new Emp(2,"marry",3000,29));
	emps.add(new Emp(3,"jack",4000,39));
	reqeust.setAttribute("emps",emps);

	Map<String,String> maps = new HashMap<>();
	map.put("CN","中国");
	map.put("FR","法国");
	map.put("US","美国");
	request.setAttribute("maps",maps);
%>

<p>${requestScope.array[3]}</p>

<p>${requestScope.users[0]}</p>
<p>${requestScope.users[0]["username"]}</p>
<p>${requestScope.users.get(1)["username"]}</p>
<p>${requestScope.users[0].password}</p>

<p>${requestScope.maps.CN}</p>
<p>${requestScope.maps["US"]}</p>
<p>${requestScope.maps.get("JP")}</p>
~~~

### 5.6 EL的运算符

| 操作符     | 描述                             |
| ---------- | -------------------------------- |
| .          | 访问一个Bean属性或者一个映射条目 |
| []         | 访问一个数组或者链表的元素       |
| +          | 加                               |
| -          | 减 或 负                         |
| *          | 乘                               |
| / *or* div | 除                               |
| % *or* mod | 取模                             |
| == *or* eq | 测试是否相等                     |
| != *or* ne | 测试是否不等                     |
| < *or*lt   | 测试是否小于                     |
| > *or*gt   | 测试是否大于                     |
| <=*or*le   | 测试是否小于等于                 |
| >=*or*ge   | 测试是否大于等于                 |
| && *or*and | 测试逻辑与                       |
| \|\|*or*or | 测试逻辑或                       |
| !*or*not   | 测试取反                         |
| empty      | 测试是否空值                     |

~~~jsp
<!-- 代码示例 -->
<%
    request.setAttribute("nums", 1234);
%>
<h3>算数运算符</h3>
<p>nums:${nums}</p>
<p>加法：${nums+5}</p>
<p>减法：${nums-23}</p>
<p>乘法：${nums*3}</p>
<p>除法：${nums/12}</p>
<p>除法：${nums div 12}</p>
<p>取模：${nums % 12}</p>
<p>取模：${nums mod 12}</p>
<h3>关系运算符</h3>
<p>相等：${nums==1234}</p>
<p>相等：${nums eq 123}</p>
<p>不等：${nums != 123}</p>
<p>不等：${nums ne 123}</p>
<p>小于：${nums < 123}</p>
<p>小于：${nums lt 123}</p>
<p>大于：${nums > 123}</p>
<p>大于：${nums gt 123}</p>
<p>小于等于：${nums <= 123}</p>
<p>小于等于：${nums le 123}</p>
<p>大于等于：${nums >= 123}</p>
<p>大于等于：${nums ge 123}</p>
<h3>逻辑运算符</h3>
<p>逻辑与：${true && false}</p>
<p>逻辑与：${false and false}</p>
<p>逻辑或：${true || false}</p>
<p>逻辑或：${true or false}</p>
<p>逻辑非：${!true}</p>
<p>逻辑非：${not true}</p>
<p>三目运算符：${true?12:123123}</p>

<p>空值：${empty null}</p>
<p>空值：${empty ""}</p>
<p>空值：${empty "123"}</p>
~~~

#### 5.6.2 empty关键字

~~~jsp
<!-- 代码示例 -->
<%
    String s1="";
    pageContext.setAttribute("s1",s1);
    String s2=null;
    pageContext.setAttribute("s2", s2);
    String s3="12222";
    pageContext.setAttribute("s3", s3);
    List list1=new ArrayList();
    pageContext.setAttribute("list1",list1);
%>
<!--  empty关键字只要内容为空即为true -->
<p>${empty s1}</p>
<p>${empty s2}</p>
<p>${empty s3}</p>
<p>${empty list1}</p>
~~~

### 5.7 EL的隐式对象（内置对象）

> EL表达式定义了*11*个隐式对象（内置对象）

|     隐含对象     | 描述                          |
| :--------------: | ----------------------------- |
|    pageScope     | page作用域                    |
|   requestScope   | request作用域                 |
|   sessionScope   | session作用域                 |
| applicationScope | application作用域             |
|      param       | Request对象的参数，字符串     |
|   paramValues    | Request对象的参数，字符串集合 |
|      header      | HTTP信息头，字符串            |
|   headerValues   | HTTP信息头，字符串集合        |
|     iniParam     | 上下文初始化参数              |
|      cookie      | Cookie值                      |
|   pageContext    | 当前页面的pageContext对象     |

#### 5.7.1获得应用上下文

~~~jsp
<!-- 代码示例 -->
<!-- 1.利用JSP内置对象request对象获取 -->
<%= request.getContextPath() %>
<!-- 2.利用EL内置对象pageContext对象获取 -->
${pageContext.request.contextPath}
~~~

#### 5.7.2 获取Cookie对象

~~~jsp
<!-- 示例代码 -->
<!-- request对象的方式获取cookie -->
<%
    Cookie[] cookies = request.getCookies();
    String username="";
    String password="11";
    for (Cookie cookie : cookies) {
        if ("username".equals(cookie.getName())){
            username=cookie.getValue();
        }
        if ("password".equals(cookie.getName())){
            password=cookie.getValue();
        }
    }
%>
<p>username_from_request: <%=username%></p>
<p>password_from_request: <%=password%></p>
<!-- EL表达式的方法获得cookie -->
<p>username_from_EL: ${cookie.username}</p>
<p>username_from_EL: ${cookie.username.value}</p>
<p>username_from_EL：${cookie["password"].value}</p>
~~~

## 六、JSTL标准标签库

### 6.1 现有问题

> * EL主要是用于作用域获取数据，虽然可以做运算判断，但是得到的都是一个结果做展示。
> * EL不存在流程控制，例如判断。
> * EL对于集合只能进行单点访问，不能实现遍历操作。例如循环。

### 6.2 什么是JSTL？

> * JSTL:全称为Java Server Pages Standard Tag Library
> * JSP标准标签库（JSTL）是一个JSP标签集合。

### 6.3 JSTL的作用

> * 可对EL获取到的数据进行逻辑操作。
> * 与EL合作完成数据的展示。

### 6.4 JSTL的使用

> * 导入两个jar文件：*standard.jar* 和 *jstl.jar* 文件拷贝到*/WEB-INF/lib/*下
> * 在JSP页面引入标签库 *<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c">

### 6.5 核心标签

#### 6.5.1 条件标签 IF 判断

> 语法：<c:if test="条件"> < /c:if>  

<strong style="color:red">提示：此 if 没有对应的 else</strong>

~~~jsp
<!-- 示例代码 -->
<!-- test属性中是条件，但是条件需要使用EL表达式来书写-->
<h3>条件标签：if</h3>
<c:if test="${10==10}">
    10==10是成立的
</c:if>
<c:if test="${8 < 2}">
    8<2是成立的
</c:if>
~~~

#### 6.5.2 多条件 CHOOSE判断

> 语法：
>
> ```jsp
> <c:choose>
>     <c:when test="条件一">结果一</c:when>
>     <c:when test="条件二">结果二</c:when>
>     <c:when test="条件三">结果三</c:when>
> </c:choose>
> ```

~~~jsp
<!-- 示例代码 -->
<h3>条件标签：choose(等价于java中多重if)</h3>
<%-- 测试成绩登记 >90 优秀 >80 良好 >70 中等 >60 及格 --%>
<c:set var="score" value="20"></c:set>
<c:choose>
    <c:when test="${score>90}">优秀</c:when>
    <c:when test="${score>80}">良好</c:when>
    <c:when test="${score>70}">中等</c:when>
    <c:when test="${score>60}">及格</c:when>
    <c:otherwise>不及格</c:otherwise>
</c:choose>
~~~

#### 6.5.3 迭代 FOREACH 标签

> 语法：
>
> ```jsp
> <!-- varStatus有四个状态：first:是否是第一行，last：是否是最后一行，count:当前行数，index:当前元素下标-->
> <c:forEach
>         var="遍历名"
>         items="目标集合"
>         begin="起始下标"
>         end="结束下标"
>         step="步长"
>         varStatus="遍历状态">
> </c:forEach>
> 
> <c:forEach 
>            var="num" 
>            begin="2" 
>            end="100" 
>            step="3">
>     <p>${num}</p>
> </c:forEach>
> ```

~~~jsp
<!-- 示例代码 -->
<%
    List<User> users = new LinkedList<>();
    users.add(new User("Gavin", "123456"));
    users.add(new User("Lily", "654321"));
    users.add(new User("Jack", "135246"));
    request.setAttribute("users", users);
%>
<c:forEach
        var="user"
        step="2"
        items="${users}">
    <h1>${user}</h1>
</c:forEach>

<c:forEach var="num" begin="2" end="100" step="3">
    <p>${num}</p>
</c:forEach>
~~~

#### 6.5.4 URL标签

> 在Cookie禁用的情况下，通过重写URL拼接JSSESSIONID来传递ID值。便于下一次访问时仍可查找到上一次的Session对象。

~~~jsp
<!-- 示例代码 -->
<!-- 传统方式重写URL -->
<%
    String newUlr = response.encodeRedirectURL(request.getContextPath() + "/jstl/jstl_foreach.jsp");
%>
<p>URL: <%= newUlr %></p>
<a href="<%=response.encodeRedirectURL(request.getContextPath()+"/jstl/jstl_foreach.jsp")%>">跳转foreach</a>

<!--  JSTL实现方式 -->
<c:url context="${pageContext.request.contextPath}" value="/jstl/jstl_foreach.jsp"></c:url>
<a href="<c:url context="${pageContext.request.contextPath}" value="/jstl/jstl_foreach.jsp"></c:url>">跳转二</a>

<!-- 在form表单的action中嵌套动态路径 -->
<form action="<c:url context=‘${pageContext.request.contextPath}' value='/xxxController' />">
</form>
~~~

* <strong style="color:#29b098">提示：所有涉及到页面跳转或者重定向跳转时候，都应该使用URL重写</strong>

## 七、MVC框架（Model-View-Controller）

### 7.1 MVC概念

> MVC又称为编程模式，时一种软件设计思想，将数据操作、页面展示、业务逻辑分为三个层级（模块），独立完成，相互调用。
>
> * 模型层（Model）
> * 控制器（Controller）
> * 视图（View）

### 7.2 MVC模式详解

> MVC并不是Java独有的，现在几乎所有的B/S架构狗采用了MVC模式。
>
> * 视图（View）：视图即是用户看到并与之交互的解面，比如HTML（静态资源），JSP（动态资源）等等。
> * 控制器（Controller）：控制器即是控制请求的处理逻辑，对请求进行处理，负责流程跳转（转发和重定向）。
> * 模型（Model）：对客观世界的一种代表和模拟（业务模拟、对象模拟）。

![image-20200703223410674](pic\JSP笔记\image-20200703223410674.png)

### 7.3 MVC模式的优点

> * 低耦合性：模块与模块之间的关联性不强，不与某一种具体实现产生密不可分的关联性。
> * 高维护性：基于低耦合性，可做到不同层级的功能模块灵活更换、插拔。
> * 高重用性：相同的数据库操作，可以服务于不同的业务逻辑。将数据作为独立模块，提高重用性。

### 7.4 MVC在框架中的应用

> MVC模式被广泛用于Java的各种框架中，比如Struts2、SpringMVC等都用到了这种思想。

### 7.5 三层架构与MVC

#### 7.5.1 三层架构

> View层（表示|界面层）、Service层（业务逻辑层）、DAO层（数据访问层）

![image-20200703224545213](pic\JSP笔记\image-20200703224545213.png)

#### 7.5.2 MVC与三层架构的区别

> * MVC强调的是视图和业务代码的分离。严格的说MVC其实关注的是Web层。View就是单独的页面，如JSP、HTML等，不负责业务处理，只负责数据的展示。二数据封装到Model里，有Controller层负责在View和Model之间传递。MVC强调业务和视图分离。
> * 三层架构是“数据访问层”、“业务逻辑层”、“表示层”，指的是代码之间的解耦，方便维护和复用。

## 九、分页

### 9.1 概念

> ​    分页是Web应用程序中非常重要的一个技术。数据库中的数据可能成千上万的，不可能把这么多的数据一次显示在浏览器上面。一般根据每行数据在页面上所占空间设置每页显示若干行，比如一般20行是一个比较理想的状态。

### 9.2 分页实现思路

> 对于海量的数据查询，需要多少就取多少，显然是最佳的方法，加入某个表中有200万条数据，第一页取前20条，第二页取21~40条数据。。。

~~~sql
select * from 表名 order by id limit 0,20;
select * from 表名 order by id limit 21,40;
select * from 表名 order by id limit 41,60;
~~~

### 9.3 分页代码实现

> 步骤：
>
> 1. 确定每页显示的数据数量
> 2. 确定分页显示所需要的总页数
> 3. 编写SQL语句，实现数据查询
> 4. 在JSP页面中进行分页显示设置

