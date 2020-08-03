# SpringMVC笔记

[TOC]

## 一、SpringMVC

### 1.1 引言

> **Java开源框架，Spring Framework是一个独立模块。**
>
> **MVC框架，在项目中开辟MVC层次架构**
>
> **对控制器中的功能进行包装、简化、扩展，践行工厂模式，功能框架在工厂之上**



### 1.2 MVC架构

> **MVC概念** ：
>
> | **Model** | **View** | **Controller** |
> | :-------: | :------: | :------------: |
> | **模型**  | **视图** |   **控制器**   |
>
> <span style="color:#F36D00;font-weight:bolder">模型：即业务模型，负责完成业务中的数据通信处理，对应项目中的Service和Dao</span>
>
> <span style="color:#F36D00;font-weight:bolder">视图：渲染数据，生成页面。对应项目中的JSP</span>
>
> <span style="color:#F36D00;font-weight:bolder">控制器：直接对接请求，控制MVC流程，调度模型，选择视图。对应项目中的Servlet</span>

> * **MVC是现下软件开发中的最流行的代码结构形态**
> * **人们根据负责的不同逻辑，将项目中的代码分成 M V C 三个层次**
> * **层次内部职责单一，层次之间耦合度低**
> * **符合低耦合、高内聚的设计理念。也实际有利于项目的长期维护。**

## 二、开发流程



### 2.1 导入依赖

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-webmvc</artifactId>
	<version>5.2.7.RELEASE</version>
</dependency>
~~~



### 2.2 配置核心（前端）控制器

> **作为一个MVC框架，首先要解决的问题是：如何能够接收到请求！**
>
> <span style="color:#F36D00;font-weight:bolder">MVC框架大都会设计一款前端控制器，选型在 Servlet 和 Filter 两者之一，在框架最前沿率先工作，接收所有请求。</span>
>
> **此控制器在接收到请求后，还会负责SpringMVC的核心的调度管理，所以既是前端又是核心。**

~~~xml
<!-- 示例代码 -->
<!--SpringMVC前端控制器（核心控制器）
	1.前端，接收所有请求。
	2.启动SpringMVC工厂 mvc.xml
	3.springMVC流程调度
-->
<servlet>
	<servlet-name>mvc</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 局部参数：声明配置文件位置 -->
	<init-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>classpath:mvc.xml</param-value>
	</init-param>
	<!--Servlet 启动时刻 可选 饿汉式加载-->
	<load-on-startup>1</load-on-startup>
</servlet>
<!-- 配置servlet映射路径-->
<servlet-mapping>
	<servlet-name>mvc</servlet-name>
	<url-pattern>/</url-pattern>
</servlet-mapping>
~~~



### 2.3 后端控制器

> **等价于之前的Servlet**

~~~java
/** 示例代码 **/
/**
 * @Controller 声明这是一个控制器
 * @RequestMapping 声明访问路径，等价于 url-pattern
 */
@Controller
@RequestMapping(value = "/hello")
public class HelloController {

    @RequestMapping(value = "/test1")
    public String hello1(){
        System.out.println("hello world 1");
        //跳转index页面
        return "index";
    }

    @RequestMapping(value = "/test2")
    public String hello2(){
        System.out.println("hello c9");
        //跳转：/views/users.jsp
        return "views/users";
    }
}
~~~



### 2.4 配置文件

> **默认名称：**  <span style="color:#F36D00;font-weight:bolder">核心控制器名-servlet.xml</span>     	**默认位置：**<span style="color:#F36D00;font-weight:bolder">WEB-INF</span>
>
> **随意名称：**<span style="color:#F36D00;font-weight:bolder">mvc.xml</span>         **随意位置：**<span style="color:#F36D00;font-weight:bolder">resources</span>         **但需要配置在核心控制器中**

~~~xml
<!-- 代码示例 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!-- 告知springmvc  哪些包中 存在被注解的类、方法 -->
    <context:component-scan
            base-package="com.rainbase"></context:component-scan>
    <!-- 注册 MVC注解开发驱动 -->
    <mvc:annotation-driven></mvc:annotation-driven>
    <!-- 视图解析器
        作用： 1.捕获后端控制器的返回值="index"
               2.解析：在返回值的前后  拼接 ==》"/index.jsp"   
     -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!-- 配置前缀（查找路径） -->
        <property name="prefix" value="/"></property>
        <!-- 配置后缀 -->
        <property name="suffix" value=".jsp"></property>
    </bean>
</beans>
~~~



### 2.5 访问

> 访问：http://localhost:8080/hello/test1 控制台打印“Hello World 1” 跳转到index.jsp页面
> 访问：http://localhost:8080/hello/test2 控制台打印“Hello World 2” 跳转到index2.jsp页面

## 三、接收请求参数

> 通过控制器方法的形参，接收请求参数。



### 3.1 基本类型参数

> 请求参数和方法的形参 同名即可。

> springMVC默认可以识别的日期字符串格式为：yyyy/MM/dd HH:mm:ss
>
> 通过@DateTimeFormat可以修改默认日期格式

~~~java
/** 示例代码 **/
@RequestMapping("/param")
@Controller
public class ParamController {

    /**
     * http://xxx/param/test1?id=1&name=123123&gender=true&birth=2020/12/12
     */
    @RequestMapping(value = "/test1")
    public String test1(int id, String name, boolean gender, Date birth){
        System.out.println("test1");
        System.out.println("id:"+id);
        System.out.println("name:"+name);
        System.out.println("gender:"+gender);
        System.out.println("birth:"+birth);
        return "index";
    }
}
~~~



### 3.2 实体收参（建议）

> **请求参数和实体的属性 同名即可。**

~~~java
/** 示例代码 **/
/**
* http://xxx/param/test1?id=1&name=123123&gender=true&birth=2020/12/12
*/
@RequestMapping(value = "/test1")
public String test1(int id, String name, boolean gender, Date birth){
	System.out.println("test1");
	System.out.println("id:"+id);
	System.out.println("name:"+name);
	System.out.println("gender:"+gender);
	System.out.println("birth:"+birth);
	return "index";
}
~~~



### 3.3 数组收参数

> **请求路径中多次写相应的参数即可**

~~~java
/** 示例代码 **/
//访问 http://localhost:8080/param/test3?hobby=football&hobby=basketball
@RequestMapping("/test3")
public String test3(String[] hobby){
    System.out.println(Arrays.toString(hobby));
    return "index";
}
~~~



### 3.4 集合收参数（了解）

> **请求中根据下标传递参数值**

~~~java
/** 示例代码 **/
public class UserList {
    private List<User> users;
    //Getters and setters
}

/**
 * post http://localhost:8080/param/test4?users[0].id=1&users[0].name=gavin&users[1].id=2&users[1].name=jack
 */
@RequestMapping("/test4")
public String test4(UserList users){
	List<User> users1 = users.getUsers();
	users1.forEach(System.out::println);
	return "index";
}
~~~



### 3.5 路径参数

> **在路径中定义占位符，利用@PathVariable匹配**

~~~java
/** 示例代码 **/
//{id}定义名为id的路径；【/hello/{id}】的匹配能力和【/hello/*】等价。
//http://localhost:8989/.../hello/10 {10}匹配到10
//http://localhost:8989/.../hello/200 {200}匹配到200
@RequestMapping("/hello/{id}")
public String test5(@PathVariable("id") Integer id){
    System.out.println("id:"+id);
    return "index";
}
~~~



### 3.6 中文乱码

> **首先，页面中字符集统一**

~~~
JSP : <%@page pageEncoding="utf-8" %>
HTML : <meta charset="UTF-8">
~~~

> **其次，tomcat中字符集设置，对get请求中，中文参数乱码有效**

~~~ 
Tomcat配置：URIEncoding=utf-8
~~~

> **最后，设置此filter，对post请求中，中文参数乱码有效**

~~~xml
<!-- 此过滤器会进行：request.setCharacterEncoding("utf-8"); -->
<!-- xml文件配置方式 -->
<filter>
	<filter-name>encoding</filter-name>
	<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
	<init-param>
		<param-name>encoding</param-name>
		<param-value>utf-8</param-value>
	</init-param>
</filter>
<filter-mapping>
	<filter-name>encoding</filter-name>
	<url-pattern>/*</url-pattern>
</filter-mapping>
~~~

~~~java
/** 示例代码 注解配置方式 **/
@WebFilter(filterName = "MyEncodingFilter",value = "/*",initParams = {
        @WebInitParam(name = "encoding",value = "utf-8")
})
public class EncodingFilter extends CharacterEncodingFilter {
}
~~~

## 四、跳转

> **跳转关键字： **<span style="color:#F36D00;font-weight:bolder">forward</span>        <span style="color:#F36D00;font-weight:bolder">redirect</span>

### 4.1 转发

> 请求转发：一次请求，一次响应，地址栏路径不改变

~~~java
/** 示例代码 **/
/** 添加 forward和redirect时：视图解析器不再拼接路径 **/
@Controller
@RequestMapping("/forward")
public class ForwardController {

    @RequestMapping("/test1")
    public String testForward1(){
        System.out.println("test forward 1");
        //请求转发到/views/users.jsp
        return "views/users";//和下一行等价
//        return "forward:/views/users.jsp";
    }

    @RequestMapping(value = "/test2")
    public String testForward2(){
        System.out.println("test forward 2");
        //转发到 /forward/test1
        //相对路径（转发到本类中的test1）
        //return "forward:test1;
        //绝对路径
        return "forward:/forward/test1";
    }
}
~~~



### 4.2 重定向

> 请求重定向： 两次请求，两次响应，地址栏路径改变

~~~java
/** 示例代码 **/
@Controller
@RequestMapping("/redirect")
public class RedirectController {

    @RequestMapping("/test1")
    public String testRedirect1(){
        System.out.println("test redirect 1");
        return "redirect:/views/users.jsp";
    }

    @RequestMapping("/test2")
    public String testRedirect2(){
        System.out.println("test redirect 2");
        //相对路径写法
        //return "redirect:test1";
        //绝对路径写法
        return "redirect:/redirect/test1";
    }
}
~~~



### 4.3 跳转细节

> 1. **在增删改操作之后，为了防止请求重复提交，建议使用重定向跳转。**
> 2. **在查询之后，可以做转发跳转。**



## 五、传值

> Controller 得到数据后，跳转到 View，并向 View 传递数据。进而View中可以渲染数据，让用户看到含有数据的页面。
>
> **转发跳转：Request作用域**
>
> **重定向跳转：Session作用域**



### 5.1 Request和Session

~~~java
/** 示例代码 **/
//形参中 即可获得request 和 session 对象
@RequestMapping("/test1")
public String testData(HttpSession session,HttpServletRequest request,Integer id){
    session.setAttribute("user",new User("username","password",12));
    request.setAttribute("age",18);
    request.setAttribute("users",Arrays.asList(new User(),new User()));
    return "forward:/WEB-INF/test2.jsp";
}
~~~

### 5.2 JSP中取值

> **建议：重点复习 EL JSTL**

~~~jsp
<!-- 示例代码 -->
${sessionScope.user.birth}<br/>
${requestScope.age}
~~~



### 5.3 Model

> **Model:**

~~~java
/** 示例代码 **/
//Model中的数据，会在View渲染之前，将数据复制一份到Request中
@RequestMapping("/test")
public String testData(Model model){
    model.addAttribute("name","张三");
    return "index";
}

//jsp中通过EL表达式取值即可
${requestScope.name}
~~~

### 5.4 ModelAndView

> **ModelAndView: **

~~~java
/** 示例代码 **/
//ModelAndView 可以集中管理 跳转和数据
@RequestMapping("/test")
//返回值类型为 ModelAndView 对象
public ModelAndView testData(){
    //1.新建ModelAndView对象
    ModelAndView mv = new ModelAndView();
    //2.设置视图名，即如何跳转（转发还是重定向）
    mv.setViewName("forward:/data.jsp");
    mv.addAttribute("age",18);
    return mv;
}

//JSP中用EL表达式 取值即可
${requestScope.age}
~~~



### 5.5 @SessionAttributes注解

> <span style="color:#F36D00;font-weight:bolder">@SessionAttributes({"gender","name"})</span> model中的*name*和*gender*属性会存入*session*中
>
> <span style="color:#F36D00;font-weight:bolder">SessionStatus</span> 调用该对象的*setComplete()*方法移除session

~~~java
/** 示例代码 **/
@Controller
@RequestMapping("/data")
//Model中的name和gender属性会存入session中
@SessionAttributes(names = {"gender","age"})
public class DataController {

    @RequestMapping("/test2")
    public String test2(Model model){
        //gender会存入session
        model.addAttribute("gender",true);
        //age不会存入session
        model.addAttribute("age",12);
        return "data2";
    }

    @RequestMapping("/test3")
    public String test3(SessionStatus status){
        //移除通过SessionAttributes存入的session
        status.setComplete();
        return "data2";
    }
}
~~~



## 六、静态资源

> **静态资源：html、js文件、css文件、图片文件**

> **静态文件没有url-pattern，所以默认是访问不到的，之所以可以访问，是因：tomcat中有一个全局的Servlet：**<span style="color:#F36D00;font-weight:bolder">org.apache.catalina.servlets.DefaultServlet</span>，**它的url-pattern是"/"，是全局默认的Servlet.**
>
> **所以每个项目中不能匹配的静态资源的请求，有这个Servlet来处理即可。**

> **但是，在SpringMVC中DispatcherServlet也采用了“/”作为url-pattern，则项目中不会再使用全局的Servlet，则静态资源不能完成访问。解决方案如下：**

### 6.1 解决方案 一

> **DispatcherSerlet采用其他的url-pattern**
>
> **此时，所有访问handler的路径都要以 *.action*结尾 ！！！**

~~~xml
<!-- 示例代码 -->
<!--SpringMVC前端控制器-->
<servlet>
	<servlet-name>mvc</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<init-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>classpath:mvc.xml</param-value>
	</init-param>
	<!--Servlet 启动时刻 可选 饿汉式加载-->
	<load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
	<servlet-name>mvc</servlet-name>
	<url-pattern>*.action</url-pattern>
</servlet-mapping>
~~~

### 6.2 解决方案 二【推荐】

> **DispatcherServlet中的url-pattern依然采用"/"，但是需要追加配置**
>
> 配置mvc.xml文件：
>
> 1. 在其中点加一个< mvc:default-servlet-handler />
> 2. 其匹配路径为 "/**"
> 3. **这个handler的优先级最低**
> 4. 匹配到这个handler的请求会被转发到tomcat中名为default，匹配路径为"/"的Servlet中
> 5. 静态资源请求完整

~~~xml
<!-- 示例代码 -->
<!--
    额外的增加一个handler，且其requestMapping:"/**" 可以匹配所有请求，但是优先级最低，所以如果其他所有的handler都匹配不上，请求会转向"/**",恰好，这个handler就是处理静态资源的处理方式：将请求转回到tomcat中名为default的Servlet
-->
<mvc:default-servlet-handler />
~~~

### 6.3 解决方案 三

~~~xml
<!-- 示例代码 -->
<!--
	1. mapping是访问路径，location是静态资源存放的路径
	2. 将/html/** 中 /**匹配到的内容，拼接到 /hhh/后面
		例：http://..../html/a.html 访问/hhh/a.html
			http://..../html/page/b.html 访问/hhh/page/b.html
-->
<mvc:resources mapping="/html/**" location="/hhh/"/>
<mvc:resources mapping="/css/**" location="/css/"/>
~~~



## 七、Json处理

> **SpringMVC默认的Json解决方案选择的是Jackson，所以只需要导入jackson的jar，即可使用。**

### 7.1 导入依赖

~~~ xml
<!-- 示例代码 -->
<!--导入Jackson-->
<dependency>
	<groupId>com.fasterxml.jackson.core</groupId>
	<artifactId>jackson-databind</artifactId>
	<version>2.11.0</version>
</dependency>
<!--导入FastJson-->
<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>fastjson</artifactId>
	<version>1.2.52.sec06</version>
</dependency>
~~~

### 7.2 使用@ResponseBody

> **在导入对应的Jackson jar文件后，可以利用@ResponseBody实现返回对象JSON化之后的字符串**

#### 7.2.1 @ResponseBody使用示例

~~~java
/** 示例代码 **/
@Controller
@RequestMapping("/json")
public class JsonController {

    @RequestMapping("test2")
    //将handler的返回值，转换成json（jackson）,并将json响应给客户端
    @ResponseBody
    public List<User> test2(){
        System.out.println("test2");
        List<User> list=new LinkedList<User>();
        list.add(new User(1,"张三"));
        list.add(new User(2,"李四"));
        list.add(new User(3,"王五"));
        list.add(new User(4,"赵六"));
        return list;
    }
    
    @RequestMapping("/test3")
    //直接返回字符串"Hello World"
    @ResponseBody
    public String test3(){
        System.out.println("test 3");
        return "Hello World";
    }
    
	@RequestMapping(value="/test4",produces="text/html;charset=utf-8")
    //必须配置produces,否则会返回乱码
    @ResponseBody
    public String test4(){
        System.out.println("test 3");
        return "你好，世界";
    }
}
~~~

#### 7.2.2 @ResponseBody返回中文乱码的解决方案

> **原因：在处理对象的时候默认已配置了编码转化，处理字符串时未处理，所以会出现乱码问题。**
>
> **解决办法：在*@RequestMapping*中添加 *produces="text/html;charset=UTF-8"* 即可 **

### 7.3 使用@RestController

> **在类上使用@RestController，则表明此类中所有的handler（方法）都返回@ResponseBody**

<span style="color:#47B391;font-weight:bolder">注意：直接返回中文乱码问题仍需处理，使用produces="text/html;charset=UTF-8"</span>

### 7.4 使用@RequestBody

> **@RequestBody，接收JSON参数**
>
> **作用：请求体中的JSON数据转换为Java对象**

#### 7.4.1 定义Handler

~~~java
/** 示例代码 **/
class User{
    private Integer id;
    private String name;
    private Boolean gender;
    //Setters and Getters
}
~~~

~~~java
/** 示例代码 **/
@RequestMapping("/user")
//@RequestBody将请求体中的JSON数据转换为Java对象
public String addUser(@RequestBody User user){
    System.out.println("cap2");
    System.out.println("Post user:" + user);
    return "index";
}
~~~



#### 7.4.2 Ajax发送json

> **原生XHR发送方法：**

~~~javascript
<!-- 示例代码 -->
var xhr=new XMLHttpRequest();
xhr.open("post","${pageContext.request.contextPath}/users?"+new Date().getTime());
//设置请求头
xhr.setRequestHeader("content-type","application/json");
//传递JSON串
xhr.send('{"id":1,"name":"shine","gender":"true"}');
~~~



> **JQuery发送方法：**

~~~javascript
//示例代码
<script>
    function send_json() {
        //ajax json
        var user = {
            id: 1,
            name: 'caoguobin'
        };
        var userJson=JSON.stringify(user)
        $.ajax({
            url: '${pageContext.request.contextPath}/json/test5',
            data: userJson,
            //请求方法必须为post!!!
            type:'post',
            //重要，必须有声明!!!
            contentType:'application/json',
            dataType: 'json',
            success: function (res) {
                console.log(res)
            }
        })
    }
</script>
~~~



### 7.5 Jackson常用注解

#### 7.5.1 日期格式化

> @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")

~~~java
/** 示例代码 **/
public class User{
    private Integer id;
    private String name;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss"，timezone = "GMT+8")
    private Date birth;
    ...
    //Getters and Setters
}
~~~



#### 7.5.2 属性名修改

> @JsonProperty("new_name")

~~~java
/** 示例代码 **/
public class User{
    //不再使用原属性名，而是"new_id"
    @JsonProperty("new_id")
    private Integer id;
    private String name;
    private Date birth;
    ...
    //Getters and Setters
}

//输出的JSON：{"new_id":xx,"name":"xx"}
~~~

#### 7.5.3 属性忽略

> @JsonIgnore

~~~java
/** 示例代码 **/
public class User{
    //不再使用原属性名，而是"new_id"
    @JsonProperty("new_id")
    private Integer id;
    @JsonIgnore
    private String name;
    private Date birth;
    ...
    //Getters and Setters
}

//输出的JSON：{"new_id":xx}
~~~



#### 7.5.4 null和empty属性排除

> **Jackson默认会输出null值的属性，如果不需要，可以排除。**
>
> @JsonInclude(JsonInclude.Include.NON_NULL)：**null值属性输出**
>
> @JsonInclude(JsonInclude.Include.NON_EMPTY)：**empty属性不输出（空串，长度为0的集合，null值）**

~~~java
/** 示例代码 **/
public class User{
    //不再使用原属性名，而是"new_id"
    @JsonProperty("new_id")
    private Integer id;
    @JsonIgnore
    private String name;
    private Date birth;
    //@JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String[] hobby;
    ...
    //Getters and Setters
}

//输出的JSON中如果hobby为null，则不会输出到结果中
~~~



#### 7.5.5 自定义序列化

> @JsonSerialize(using = MySerializer.class):**使用MySerializer输出某属性**

~~~java
/** 示例代码 **/
public class User {
    private Integer id;
    private String name;
    //输出此属性时，使用MySerializer输出
    @JsonSerialize(using = MySerializer.class)
    private double salary;
}
//输出JSON时：{“id":xx,"name":"xxx","salary":1000.13}
~~~

~~~java
/** 示例代码 **/
public class MySerializer extends JsonSerializer<Double> {
    @Override
    public void serialize(Double aDouble, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        //将Double salary的值四舍五入
        String s = BigDecimal.valueOf(aDouble).setScale(2, BigDecimal.ROUND_HALF_UP).toString();
        //输出 四舍五入后的值
        jsonGenerator.writeNumber(s);
    }
}
~~~



### 7.6 FastJson

> 如果不想使用Jackson，则也可以安装其他的JSON处理方案：FastJson

#### 7.6.1 安装FastJson

> **1.导入依赖：**

~~~xml
<!-- 示例代码 -->
<!--导入FastJson-->
<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>fastjson</artifactId>
	<version>1.2.54</version>
</dependency>
~~~

> **2.配置使用FastJson在spring-context.xml中**

~~~xml
<!-- 示例代码 -->
<!--启用mvc注解-->
<mvc:annotation-driven>
	<!-- 安装FastJson转换器 -->
	<mvc:message-converters>
		<bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter">
		<!-- 声明转换类型：json -->
			<property name="supportedMediaTypes">
				<list>
					<value>application/json</value>
				</list>
			</property>
		</bean>
	</mvc:message-converters>
</mvc:annotation-driven>
~~~



#### 7.6.2 使用FastJson

> **@ResponseBody  @RequestBody  @RestController  使用方法不变**

#### 7.6.3 常用注解

> * **日期格式化：@JSONField(format="yyyy/MM/dd")**
> * **属性名修改：@JSONField(name="birth")**
> * **属性忽略：@JSONField(serialize=false)**
> * **包含Null值：@JSONField(serialzeFeatures= SerializerFeature.WriteMapNullValue)  默认会忽略所有null值，有此注解会输出Null <br/>@JSONField(serialzeFeatures= SerializerFeature.WriteNullStringAsEmpty ) 值为Null的String输出为""**
> * **自定义序列化：@JSONField(serializeUsing = MySerializer2.class)**

~~~java
/** 示例代码 **/
public class User2 {
    //配置不参与序列化
    @JSONField(serialize = false)
    private Integer id;
    //修改名称 写null为空
    @JSONField(name = "NAME",serialzeFeatures= SerializerFeature.WriteNullStringAsEmpty)
    private String name;
    //如果值为空 输出null
    @JSONField(serialzeFeatures = SerializerFeature.WriteMapNullValue)
    private String city;
    @JSONField(format = "yyyy/MM/dd")
    private Date birth;
    @JSONField(serializeUsing = MySerializer2.class)
    private double salary;
}
~~~

~~~java
/** 示例代码 **/
public class MySerializer2 implements ObjectSerializer {
    public void write(JSONSerializer jsonSerializer, Object o, Object o1, Type type, int i) throws IOException {
        //salary属性值
        Double value= (Double) o;
        //在属性值后面拼接"元";
        String text=value+"元";
        jsonSerializer.write(text);
    }
}
~~~

> <span style="color:#F36D00;font-weight:bolder">new User( 1, null, null, new Date(), 100.5):</span>输出JSON：<br/><span style="color:#F36D00;font-weight:bolder">{NAME:"", city:null, birth:"2020/12/12", salary:"100.5元"}</span>

## 八、异常解析器

### 8.1 现有方案，分散处理

> **Controller中的每个Handler自己处理异常。**
>
> **此种处理方案，异常处理罗即，分散在各个handler中，不利于集中管理**

~~~java
/** 示例代码 **/
public String xxx(){
    try{
        ...
    }catch(Exception e){
        e.printStackTrace();
        return "redirect:/xx/error2";
    }
}
~~~



### 8.2 异常解析器，统一处理（三种方式）

> **Controller中的每个Handler不再自己处理异常，而是直接throws所有异常。**
>
> **定义一个"异常解析器"集中捕获所有异常。**
>
> **Spring 统一异常处理有三种方式：**
>
> 1. **使用ExceptionHandler注解**
> 2. **实现HandlerExceptionResolver接口**
> 3. **使用ControllerAdvice注解**
>
> ***此种方案，在集中管理异常方面，更有优势！！！***

#### 8.2.1 第一种方式：使用*@ExceptionHandler*注解

> **缺点：进行异常处理的方法必须与出错的方法在同一个Conotroller里面**
>
> **解决方案：采用第三种方案，使用@ControllerAdvice注解，配合此注解实现全局异常捕获**

~~~java
/** 示例代码 **/
@Controller
public class UserController{
    @ExceptionHandler(MyException.class)
    @ResponseBody
    public String exceptionHandler(MyException e){
        System.out.println(e.getMessage());
        e.printStackTrace();
        //返回对应错误页面，或使用@ResponseBody注解直接返回字符串
        return "出错了";
    }
    
    @RequestMapping("/test")
    public void test(){
        throw new MyException("出错了");
    }
}
~~~

> **全局解决方案：见第三种方式**



#### 8.2.1 第二种方式：实现*HandlerExceptionResolver*接口

> **实现流程：**
>
> 1. **自定义全局异常解析器**
> 2. **将自定义异常解析器配置到环境中**

~~~java
/** 自定义全局异常处理器示例代码 **/
/**
 * 异常解析器
 * 任何一个Handler抛出异常时，都会执行
 */
public class MyExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) {
        ModelAndView mv=new ModelAndView();
        if (e instanceof MyException1){
            //error1.jsp
            mv.setViewName("redirect:/error1.jsp");

        }else if (e instanceof MyException2){
            //error2.jsp
            mv.setViewName("redirect:/error2.jsp");


        }else if (e instanceof MyException3){
            mv.setViewName("redirect:/error3.jsp");
        }
        return mv;
    }
}
~~~

> **配置方式：XML：**

~~~xml
<!-- 自定义全局异常处理器 -->
<bean class="com.rainbase.resolver.MyExceptionResolver"></bean>
~~~

#### 8.2.3 第三种方式：使用*@ControllerAdvice*和*@ExceptionHandler*

> **实现原理：**
>
> * ** *@ControllerAdvice*为注解为Controller增强，可以拦截所有*@ReqeustMapping*路径**
> * **利用此注解配合*@ExceptionHandler*注解，即可实现全局异常捕获处理**

~~~java
/** 示例代码 **/
@ControllerAdvice
public class MyExceptionResolver{
    @ExceptionHandler(RuntimeException.class)
    public void testMyException(HttpServletRequest request, HttpServletResponse response,Exception e) throws IOException {
        System.out.println(request.getRequestURL());
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.println("runtime 发生错误辣");
        e.printStackTrace();
    }

    @ExceptionHandler(SQLException.class)
    public void testSQLExceptionResolver(HttpServletRequest request, HttpServletResponse response,Exception e) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.println("SQL发生错误了");
    }
}
~~~



## 九、拦截器

> **作用：抽取handler中的冗余功能**
>
> **配置步骤：**
>
> 1. **自定义拦截器  需实现HandlerInterceptor接口**
> 2. **将自定义拦截器配置到spring环境中**

### 9.1 定义拦截器

> **执行顺序：preHandle  -->  postHandle  -->  afterCompletion**

~~~java
/** 示例代码 **/
/**
 * 自定义拦截器，实现Handler中重复代码的抽取，如登录信息等操作判断
 */
public class MyInterceptor1 implements HandlerInterceptor {
    /**
     * 主要逻辑：在handler之前执行：抽取handler中的冗余代码
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println(this.getClass().getName()+":  preHandle~~~~");
        //获取登录状态，进行判断和操作
        String state = (String) request.getSession().getAttribute("state");
        if (state!=null&&state.equalsIgnoreCase("ok")){
            //判断成功，放行资源,后续的拦截器或hanlder会继续执行
            return true;
        }
        //中断之前，对请求做出响应
        response.sendRedirect("/login.jsp");
        //中断请求，不再执行后续代码
        return false;
    }

    /**
     * 在handler之后执行：进一步的响应定制
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println(this.getClass().getName()+":  postHandle~~~~");
    }

    /**
     * 页面渲染完毕之后执行，进行资源回收
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println(this.getClass().getName()+":  afterCompletion~~~~");

    }
}
~~~

### 9.2 配置拦截路径

> **在spring-contex.xml中配置拦截器**

<span style="color:#47B391;font-weight:bolder">注意：< bean>标签须放置在最后，否则报错！！！</span>

~~~xml
<!-- 配置拦截器示例代码 -->
<!-- 自定义拦截器 -->
<mvc:interceptors>
	<mvc:interceptor>
        <!-- 配置拦截路径 -->
		<mvc:mapping path="/inter/test1" />
   		<mvc:mapping path="/inter/test2" />
        <!-- 拦截以test开头的路径 -->
        <mvc:mapping path="/inter/test*" />
		<!-- 拦截下一级路径 -->
        <mvc:mapping path="/inter/*" />
        <!-- 拦截任意多级路径 -->
        <mvc:mapping path="/inter/**" />
        <!-- 配置排除路径 -->
		<mvc:exclude-mapping path="/inter/login" />
        <!-- 配置拦截器实现类 -->
		<bean class="com.rainbase.interceptor.MyInterceptor1"></bean>
	</mvc:interceptor>
</mvc:interceptors>
~~~

## 十、文件上传

### 10.1 添加依赖

~~~xml
<!-- 示例代码 -->
<!-- 导入commons-io工具包 -->
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-io</artifactId>
	<version>2.4</version>
</dependency>
<!-- 导入文件上传工具包 -->
<dependency>
	<groupId>commons-fileupload</groupId>
	<artifactId>commons-fileupload</artifactId>
	<version>1.4</version>
    <!-- 防止版本冲突，排除servlet-api -->
	<exclusions>
		<exclusion>
			<groupId>javax.servlet</groupId>
			<artifactId>servlet-api</artifactId>
		</exclusion>
	</exclusions>
</dependency>
~~~

### 10.2 HTML表单

~~~jsp
<!-- 示例代码 -->
<form action="${pageContext.request.contextPath}/upload/test1" 
      enctype="multipart/form-data" method="post">
    file: <input type="file" name="source">
    <input type="submit" value="上传">
</form>
~~~



### 10.3 上传解析器

#### 10.3.1 XML配置方式

> **mvc.xml文件中配置文件上传解析器**

~~~xml
<!-- 示例代码 -->
<!-- 配置文件上传解析器  id为固定名称，如果自定义则需要在springmvc中配置 -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!-- 配置最大上传size，单位Byte。超出后会抛出MaxUploadSizeExceededException异常，可以用异常解析器捕获-->
    <property name="maxUploadSize" value="1048576"></property>
    <!-- 配置单个文件最大size -->
    <property name="maxUploadSizePerFile" value="1048576"></property>
</bean>
~~~

#### 10.3.2 注解配置方式

> <strong style="color:#47B391">注意：必须指定bean名称为"multipartResolver"，否则Spring找不到该对象</strong>

~~~java
/** 示例代码 **/
@Component
public class FIleUploadResolverConfig{
    @Bean(value = "multipartResolver")
    @Scope(value = "singleton")
    public CommonsMultipartResolver getCommonsMultipartResolver(){
        CommonsMultipartResolver resolver=new CommonsMultipartResolver();
        resolver.setMaxInMemorySize(1024*1024);
        System.out.println(resolver.hashCode());
        return resolver;
    }
}
~~~



### 10.4 Handler编写

> **Handler中处理文件接收和转存**

~~~java
/** 示例代码 **/
@Controller
@RequestMapping("/upload")
public class UploadController {

    @RequestMapping(value = "/test1")
    public String test1(MultipartFile source) throws IOException {
        System.out.println("test 1");
        //获取文件名称
        String filename = source.getOriginalFilename();
        //获取文件类型
        String contentType = source.getContentType();;
        //保存文件
        source.transferTo(new File("d:\\"+filename));

        return "index";
    }
}
~~~

### 10.5 多文件上传

> **HTML代码**

~~~jsp
<!-- 示例代码 -->
<form action="${pageContext.request.contextPath}/upload/test2" enctype="multipart/form-data" method="post">
    <!-- 多个文件输入看 -->
    file: <input type="file" name="sources">
    file: <input type="file" name="sources">
    <!-- 一个文件输入框 -->
    file: <input multiple type="file" name="sources">
    <input type="submit" value="上传">
</form>
~~~

> **Handler代码**

~~~java
/** 示例代码 **/
@RequestMapping(value = "/test2")
//利用数据接收参数
public String test2(MultipartFile[] sources) throws IOException {
	for (MultipartFile source : sources) {
		//获取文件名称
		String filename = source.getOriginalFilename();
		//获取文件类型
		String contentType = source.getContentType();
		//保存文件
		source.transferTo(new File("d:\\uploadtest\\"+filename));
	}	
	return "index";
}
~~~





## 十一、文件下载

### 11.1 超链接

~~~jsp
<!-- 示例代码 -->
<a href="${pageContext.request.contextPath}/download/test1?name=Koala.jpg">下载</a>
~~~

### 11.2 Handler编写

~~~java
/** 示例代码 **/
@Controller
@RequestMapping(value = "/download")
public class DownloadHandler {
    
    @RequestMapping(value = "/test1")
    public void test1(HttpServletRequest request, HttpServletResponse response, String fileName) throws IOException {
        System.out.println("fileName: "+fileName);
        //获取想要下载的文件的绝对路径
        String path = request.getServletContext().getRealPath("/upload");
        //生成文件的完整路径
        String filePath=path+"\\"+fileName;
        //设置响应头，告知浏览器，要以附件的形式保存内容， filename=浏览器显示的下载文件名
        response.setHeader("content-disposition","attachment;filename="+fileName);
        //读取目标文件，写出给客户端
        IOUtils.copy(new FileInputStream(filePath), response.getOutputStream());
        //上一步已经是响应了，所以此Handler直接返回void
    }
}
~~~

## 十二、Kaptcha 验证码

> **作用：屏障，防止暴力破解。**

### 12.1 导入依赖

> **pom.xml文件中导入依赖**

~~~xml
<!-- 示例代码 -->
<!-- kaptcha -->
<dependency>
	<groupId>com.github.penggle</groupId>
	<artifactId>kaptcha</artifactId>
	<version>2.3.2</version>
	<exclusions>
		<exclusion>
			<groupId>javax.servlet</groupId>
			<artifactId>servlet-api</artifactId>
		</exclusion>
	</exclusions>
</dependency>
~~~



### 12.2 配置验证码组件(两种方式)

> **第一种方式：在 *web.xml* 中声明验证码组件**

~~~xml
<!-- 示例代码 -->
    <!--声明kaptcha验证码组件-->
    <servlet>
        <servlet-name>cap</servlet-name>
        <servlet-class>com.google.code.kaptcha.servlet.KaptchaServlet</servlet-class>
        <init-param>
            <param-name>kaptcha.border</param-name>
            <param-value>no</param-value>
        </init-param>
        <init-param>
            <param-name>kaptcha.textproducer.char.length</param-name>
            <param-value>4</param-value>
        </init-param>
        <init-param>
            <param-name>kaptcha.textproducer.char.string</param-name>
            <param-value>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</param-value>
        </init-param>
        <init-param>
            <param-name>kaptcha.background.clear.to</param-name>
            <param-value>211,229,237</param-value>
        </init-param>
        <init-param>
            <!-- session.setAttribute("captcha","code") -->
            <param-name>kaptcha.session.key</param-name>
            <param-value>captcha</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>cap</servlet-name>
        <url-pattern>/captcha</url-pattern>
    </servlet-mapping>
~~~

> **第二种方式：使用注解配置**

~~~java
/** 示例代码 **/
@WebServlet(value = "/captcha",initParams = {
        @WebInitParam(name = "kaptcha.border",value = "no"),
        @WebInitParam(name = "kaptcha.textproducer.char.length",value = "4"),
        @WebInitParam(name = "kaptcha.textproducer.char.string",value = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
        @WebInitParam(name = "kaptcha.background.clear.to",value = "211,229,237"),
        @WebInitParam(name = "kaptcha.session.key",value = "kaptcha")
})
public class CodeServlet extends KaptchaServlet {
}
~~~

<span style="color:#47B391;font-weight:bolder">提示：详细配置信息见：http://www.ibloger.net/article/135.html</span>

### 12.3 前端调用

> **1.直接访问http://localhost:8080/kaptcha**

> **2.JSP或HTML中访问**

~~~jsp
<!-- 示例代码 -->
<img src="${pageContext.request.contextPath}/kaptcha" onclick="this.src='${pageContext.request.contextPath}/kaptcha?r='+Math.random()">
<form action="/code/checkCode" method="post">
    <input type="text" name="code"><br/>
    <input type="submit" value="验证">
</form>
~~~



## 十三、REST风格设计

### 13.1 开发风格

> **是一种开发风格，遵从此风格开发软件，符合REST风格，则称为RESTFUL。**

> **两个核心要求：**
>
> * **每个资源都有唯一的标识（URL）**
> * **不同的行为，使用对应的HTTP-METHOD**

> **RESTFUL风格URI示例**

| 访问标识                                 | 资源            |
| ---------------------------------------- | --------------- |
| http://localhost:8080/xxx/users          | 所有用户        |
| http://localhost:8080/xxx/users/1        | 用户1           |
| http://localhost:8080/xxx/users/1/orders | 用户1的所有订单 |

> **HTTP-METHOD和资源之间的关系**

|  请求方式  | 标识                                  | 意图                        |
| :--------: | ------------------------------------- | --------------------------- |
|  **GET**   | http://localhost/xxx/users            | 查询所有用户                |
|  **POST**  | http://localhost/xxx/users            | 在所有用户中添加一个        |
|  **PUT**   | http://localhost/xxx/users            | 在所有用户中修改一个        |
| **DELETE** | http://localhost/xxx/users/1          | 删除用户1                   |
|  **GET**   | http://localhost/xxx/users/1          | 查询用户1                   |
|  **GET**   | http://localhost/xxx/users/1/orders   | 查询用户1的所有订单         |
|  **POST**  | http://localhost/xxx/users/1/orders   | 在用户1的所有订单中增加一个 |
|  **PUT**   | http://localhost/xxx/users/1/orders   | 在用户1的所有订单中修改一个 |
| **DELETE** | http://localhost/xxx/users/1/orders/2 | 删除用户1的订单号为2的订单  |

### 13.2 优点

> * **看URL就可以知道所请求的资源是什么**
> * **看HTTP-METHOD就可以知道所需要执行的操作是什么**

### 13.3 使用

#### 13.3.1 定义Rest风格的Controller

> <span style="color:#F36D00;font-weight:bolder">@RequestMapping(value="/users", method = RequestMethod.Get)</span>
>
> **等价于**
>
> <span style="color:#F36D00;font-weight:bolder">@GetMapping("/users")</span>

~~~java
/** 代码示例 **/
/**
 * 查询：查询所有用户
 *       查询id=xx的某个用户
 *  删除：删除id=xx的某个用户
 *  增加：在所有用户中增加一个
 *  修改：在所有用户中修改某一个
 *
 *  资源： 所有用户 /users
 *         某个用户 /users/{id}
 */
@RestController
public class UserRestController {

    @GetMapping(value = "/users")
    public List<User> queryAllUsers(){
        System.out.println("getAllUsers");
        List<User> users = new LinkedList<User>();
        users.add(new User(1,"gavin"));
        users.add(new User(2,"Jack"));
        users.add(new User(3,"Marry"));
        return users;
    }

    @PostMapping(value = "/users")
    public String addUser(@RequestBody User user){
        System.out.println("add one user with post: "+user);
        return "{status:1}";
    }

    @PutMapping(value = "/users")
    public String updateUser(@RequestBody User user){
        System.out.println("update user with put: " + user);
        return "{status:1}";
    }

    @GetMapping(value = "/users/{id}")
    public User queryUser(@PathVariable("id") Integer id){
        System.out.println("query one user with get :"+id);
        return new User(id,"Gavin");
    }

    @DeleteMapping(value = "/users/{id}")
    public String deleteOne(@PathVariable("id") Integer id){
        System.out.println("delete one user with delete: "+id);
        return "{status:1}";
    }

}
~~~



#### 13.3.2 Ajax请求

> **在对应的AJAX请求中添加对应方法即可**

~~~jsp
<!-- 示例代码 -->
<body>
<input type="button" value="queryAll" onclick="queryAll()">
<input type="button" value="queryOne" onclick="queryOne()">
<input type="button" value="saveUser" onclick="saveUser()">
<input type="button" value="saveUser" onclick="updateUser()">
<script>
    function queryAll() {
        $.ajax({
            url: '/users',
            method: 'get',
            dataType: 'json',
            success: function (res) {
                console.log(res)
            }

        })
    }

    function queryOne() {
        $.ajax({
            url: '/users/100',
            method: 'get',
            dataType: 'json',
            success: function (res) {
                console.log(res)
            }

        })
    }

    function saveUser() {
        var user={name:'曹操',birth:'1999/12/12 12:12:12'}
        $.ajax({
            url: '/users',
            method: 'post',
            dataType: 'json',
            contentType:'application/json',
            data:JSON.stringify(user),
            success: function (res) {
                console.log(res)
            }
        })
    }

    function updateUser() {
        var user={name:'曹操',birth:'1999/12/12 12:12:12'}
        $.ajax({
            url: '/users',
            method: 'put',
            dataType: 'json',
            contentType:'application/json',
            data:JSON.stringify(user),
            success: function (res) {
                console.log(res)
            }
        })
    }
</script>
</body>
~~~



## 十四、跨域问题

###  14.1 域的概念

> <strong style="color:#F36D00">域： 协议 + IP + 端口</strong>
>
> 例：http://localhost:8080
>
>  		http://locahost:8800

### 14.2 Ajax跨域问题

> <strong>AJAX发送请求时，不允许跨域，以防用户信息泄漏。</strong>

> **当AJAX跨域请求时，响应会被浏览器拦截（同源策略）并报错。即浏览器默认不允许AJAX跨域得到响应内容。**

> **互相信任的域之间如果需要AJAX访问，（比如前后端分离项目中，前端项目和后端项目之间），则需要额外的设置才可以正常请求。**

### 14.3 解决方案

#### 14.3.1 第一种解决方案（@CrossOrigin注解）

> **允许其他域访问**
>
> **在被访问方的Controller类或方法上，添加 *@CrossOrigin(origins = {"http://localhost:63343"})* **

> **前端示例代码：**

~~~jsp
<!-- 示例代码 -->
<body>
<input type="button" value="getAllUsers" onclick="getAllUsers()">
<script>

    function getAllUsers() {
        $.ajax({
            url:'http://localhost:8080/users',
            method:'get',
            success:function (res) {
                console.log(res)
            }
        })
    }
</script>
</body>
~~~

> **服务器端示例代码：**

~~~java
/** 示例代码 **/
@RestController
@CrossOrigin(methods = {RequestMethod.POST,RequestMethod.GET},origins = {"http://localhost:63343"})
public class UserRestController {
    @GetMapping(value = "/users")
    public List<User> queryAllUsers(){
        System.out.println("getAllUsers");
        List<User> users = new LinkedList<User>();
        users.add(new User(1,"gavin"));
        users.add(new User(2,"Jack"));
        users.add(new User(3,"Marry"));
        return users;
    }
}
~~~




> **携带对方cookie，使得session可用**
>
> **在访问方，ajajx中添加属性：*withCredentials:true* **

~~~jsp
<!-- 代码示例 -->
function updateUser() {
	var user={name:'曹操',birth:'1999/12/12 12:12:12'}
	$.ajax({
		url: '/users',
		method: 'get',
		dataType: 'json',
		xhrFields:{
            //跨域携带cookie
            withCredentials: true
        },
		success: function (res) {
			console.log(res)
		}
		})
}
<!-- 或者 -->
var xhr = new XMLHttpRequest();
<!-- 跨域携带 cookie-->
xhr.withCredentials = true;

~~~



#### 14.3.2 第二种解决方案（JSONP格式）

> **客户端在发送AJAX请求时，指定dataType为"jsonP"，并指定回调方法，默认为JQuery自动生成**
>
> **服务器端在响应该请求时：**
>
> 1. 通过request.getParameter("callback")，获得回调方法名称
> 2. 设置响应头：response.setHeader("Access-Control-Allow-Origin", "*");
> 3. 使用回调方法和括号包裹响应结果即可：return callbackName+ "(" + result + ")";

> **客户端示例代码：**

~~~jsp
<!-- 示例代码 -->
$.ajax({
	url: url1,
	dataType: "jsonp",
	type: "get",
	jsonpCallback:'callbackTest',
	success: function (result) {
		// console.log(result);
		//返回结果处理
	}
})

~~~

> **服务器端示例代码：**

~~~java
/** 示例代码 **/
 public String getMarketData( HttpServletRequest request,HttpServletResponse response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
     	//请求结果封装成JOSN字符串
        String result = objectMapper.writeValueAsString(new JsonResult(marketDataSnapshotMap));
     	//设置请求头允许跨域
        response.setHeader("Access-Control-Allow-Origin", "*");
     	//获取回调方法名称
        String function =  request.getParameter("callback");
     	//封装返回结果
        return function+ "(" + result + ")";
    }

~~~



## 十五、SpringMVC执行流程

|             SpringMVC的执行流程图             |
| :-------------------------------------------: |
| ![](pic\SpringMVC-千峰\2020-07-09_171800.jpg) |



## 十六、SSM整合

### 16.1 整合思路

> **此时项目中有两个工厂：**
>
> * ***DispatcherServlet*启动的*springMVC*工厂 == 负责生产*Controller* 以及*SpringMVC*自己的系统组件**
> * ***ContextLoaderListener*启动的*Spring*工厂 == 负责生产*Service*和*Dao*等其他所有组件**
> * ***SpringMVC*的工厂会被设置为*Spring*工厂的子工厂，可以随意获取*Spring*工厂中的组件**
> * **整合过程，就是累加：代码 + 依赖 + 配置。然后将*Service*注入给*Controller*即可**

### 16.2 整合技巧

> **两个工厂不能有彼此侵入，即，生产的组件不能有重合。**
>
> **如果有多个配置文件，应当配置各自的扫描路径以及排除和包含关系**

~~~xml
<!-- MVC工厂只扫描Controller示例 -->
<context:component-scan base-package="com.rainbase" use-default-filters="false">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller" />
</context:component-scan>
<!-- Spring工厂不扫描Controller示例 -->
<context:component-scan base-package="com.rainbase" use-default-filters="true">
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller" />
</context:component-scan>
~~~



> **pom.xml示例文件：**

~~~xml
<!-- 示例文件 -->
<dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.20</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.7.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.2.7.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.10</version>
            <scope>compile</scope>
        </dependency>
        <!--spring-jdbc-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.1</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>5.2.7.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.2</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.11.0</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.4</version>
        </dependency>
    </dependencies>
~~~

> **spirng-context.xml示例文件：**

~~~xml
<!-- 示例文件 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xmlns:tx="http://www.springframework.org/schema/tx"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/mvc
           https://www.springframework.org/schema/mvc/spring-mvc.xsd
           http://www.springframework.org/schema/context
           https://www.springframework.org/schema/context/spring-context.xsd
            http://www.springframework.org/schema/tx
            http://www.springframework.org/schema/tx/spring-tx.xsd
            http://www.springframework.org/schema/aop
            https://www.springframework.org/schema/aop/spring-aop.xsd
">

    <!--配置包扫描路径-->
    <context:component-scan
            base-package="com.rainbase"></context:component-scan>
    <!--开启MVC注解-->
    <mvc:annotation-driven></mvc:annotation-driven>
    <!--配置视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/" />
        <property name="suffix" value=".jsp" />
    </bean>
    <!--
        额外的增加一个handler，且其requestMapping:"/**" 可以匹配所有请求，但是优先级最低，所以如果其他所有的handler都匹配不上，请求会转向"/**",恰好，这个handler就是处理静态资源的处理方式：将请求转回到tomcat中名为default的Servlet
    -->
    <mvc:default-servlet-handler></mvc:default-servlet-handler>

    <!-- 引入配置文件 -->
    <context:property-placeholder
            location="classpath:jdbc.properties,classpath:druid.properties" />

    <!--    &lt;!&ndash; 与PooledDataSource集成（二选一） &ndash;&gt;-->
    <!--    <bean id="dataSource" class="org.apache.ibatis.datasource.pooled.PooledDataSource">-->
    <!--        <property-->
    <!--                name="driver" value="#{jdbc.driverClass}"/>-->
    <!--        <property-->
    <!--                name="url" value="${jdbc.url}"/>-->
    <!--        <property-->
    <!--                name="username" value="${jdbc.username}"/>-->
    <!--        <property-->
    <!--                name="password" value="${jdbc.password}"/>-->
    <!--    </bean>-->
    <!-- 与PooledDataSource集成（二选一） -->
    <bean id="dataSource"
            class="com.alibaba.druid.pool.DruidDataSource"
            init-method="init"
            destroy-method="close">
        <!-- 基本配置 -->
        <property name="driverClassName" value="${jdbc.driverClass}" />
        <property name="url" value="${jdbc.url}" />
        <property name="username" value="${jdbc.username}" />
        <property name="password" value="${jdbc.password}" />
        <!-- 配置初始化大小、最大连接数量、最小空闲数量 -->
        <property name="initialSize" value="${druid.initialSize}" />
        <property name="maxActive" value="${druid.maxActive}" />
        <property name="minIdle" value="${druid.minIdle}" />

        <!-- 配置获取连接等待超时的时间 -->
        <property name="maxWait" value="${druid.maxWait}" />
        <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
        <property name="timeBetweenEvictionRunsMillis"
                value="${druid.timeBetweenEvictionRunsMillis}" />
        <!-- 配置一个连接在池中的最小生存时间，单位是毫秒 -->
        <property
                name="minEvictableIdleTimeMillis"
                value="${druid.minEvictableIdleTimeMillis}" />
    </bean>
    <!-- 工厂bean：生成SqlSessionFactory -->
    <bean id="sqlSessionFactory"
            class="org.mybatis.spring.SqlSessionFactoryBean">
        <!-- 注入连接池 -->
        <property name="dataSource" ref="dataSource" />
        <!-- 注入dao-mapper文件信息，如果映射文件和dao接口 同包且同名，则此配置可省略-->
        <property name="mapperLocations">
            <list>
                <value>classpath:mappers/*.xml</value>
            </list>
        </property>
        <!--为dao-mapper文件中的实体 定义缺省包路径
            如：<select id="queryUsers" resultType="User">中的User类可以不定义
        -->
        <property name="typeAliasesPackage"
                value="com.rainbase.common.entity" />
        
        <!-- 配置pageHelper分页插件 -->
        <property name="plugins">
            <array>
                <bean class="com.github.pagehelper.PageInterceptor">
                    <property name="properties">
                        <props>
                            <!-- 页号调整到合理的值 -->
                            <prop key="reasonable">true</prop>
                        </props>
                    </property>
                </bean>
            </array>
        </property>
    </bean>

    <!--mapperScannerConfigurer-->
    <bean id="mapperScannerConfigurer"
            class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--dao接口所在的包，如果有多个包，可以用逗号或分号分隔
           <property name="basePackage" value="com.rainbase.dao,com.rainbase.dao1"/>
        -->
        <property name="basePackage" value="com.rainbase.mapper" />
        <!-- 如果工厂中只有一个SqlSessionFactory的Bean，此配置可以省略 -->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
    </bean>

    <!-- 1.引入一个事务管理器，其中依赖DataSource，借以获得连接，进而控制事务逻辑 -->
    <bean id="tx"
            class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property
                name="dataSource"
                ref="dataSource" />
    </bean>

    <!-- 使用@Transactional必须配置使用哪个事务管理器 -->
    <tx:annotation-driven
            transaction-manager="tx"></tx:annotation-driven>
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
</beans>
~~~

> **jdbc.properties示例:**

~~~properties
#jdbc.properties
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://39.106.33.181:3306/mybatis_shine?useUnicode=true&characterEncoding=UTF-8
jdbc.username=root
jdbc.password=password
~~~

> **druid.properties示例：**

~~~properties
#示例代码
druid.initialSize=1
druid.maxActive=2
druid.minIdle=1
druid.maxWait=60000
druid.timeBetweenEvictionRunsMillis=60000
druid.minEvictableIdleTimeMillis=300000
~~~