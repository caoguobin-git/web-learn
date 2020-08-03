# Spring 笔记

[TOC]

## 一、引言

### 1.1 原生WEB开发中存在哪些问题

> * 传统web开发存在硬编码所造成的过度程序耦合（例如：Service中作为属性Dao对象）。
> * 部分Java EE API较为复杂，使用效率低（例如：JDBC开发步骤）。
> * 侵入性强，移植性差（例如：Dao实现的更换，从Connection到SqlSession）。

## 二、Spring框架

### 2.1 概念

> * Spirng是一个项目管理框架，同时也是一套Java EE 解决方案。
> * Spirng是众多优秀设计模式的组合（工厂、单例、代理、适配器、包装器、观察者、模板、策略）。
> * Spring并未替代现有框架产品，而是将众多框架进行有机整合，简化企业级开发，俗称“胶水框架”。

### 2.2 访问与下载

> 官方网站：https://spring.io
>
> 下载地址：http://repo.spring.io/release/org/springframework/spring/

## 三、Spring框架组成

> Spring架构由诸多模块组成，可分类为：
>
> * 核心技术：<strong style="color:#47B391">依赖注入</strong>、事件、资源、i18n、验证、数据绑定、类型转换、SpEL、<span style="color:#47B391;font-weight:bolder">AOP</span>。
> * 测试：模拟对象、TestContext框架、Spring MVC测试、WebTestClient。
> * 数据访问：<span style="color:#47B391;font-weight:bolder">事务</span>、DAO支持、JDBC、ORM、封装XML。
> * Spring MVC 和 Spring WebFlux Web框架
> * 集成：远程处理、JMS、JCA、JMX、电子邮件、任务、调度、缓存。
> * 语言：Kotlin、Groovy、动态语言。

![image-20200706164234538](pic\Spring-千峰\image-20200706164234538.png)

| GroupId             | ArtifactId                                                   | 说明                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spirng-beans</span> | <span style="color:#47B391;font-weight:bolder">Beans支持，包含Groovy</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-aop</span> | <span style="color:#47B391;font-weight:bolder">基于代理的AOP支持</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spirng-aspects</span> | <span style="color:#47B391;font-weight:bolder">基于AspectJ的切面</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-context</span> | <span style="color:#47B391;font-weight:bolder">应用上下文运行时，包括调度和远程抽象</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-context-support</span> | <span style="color:#47B391;font-weight:bolder">支持将常见的第三方类库集成到Spring应用上下文</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spirng-core</span> | <span style="color:#47B391;font-weight:bolder">其他模块所依赖的核心模块</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-expression</span> | <span style="color:#47B391;font-weight:bolder">Spring表达式语言，SpEL</span> |
| org.springframework | spring-instrument                                            | JVM引导的仪表（监测器）代理                                  |
| org.springframework | spring-instrument-tomcat                                     | Tomcat的仪表（监测器）代理                                   |
| org.springframework | spring-jdbc                                                  | 支持包括数据源设置和JDBC访问支持                             |
| org.springframework | spring-jms                                                   | 支持包括发送/接收JMS消息的助手类                             |
| org.springframework | spring-messaging                                             | 对消息架构和协议的支持                                       |
| org.springframework | spirng-orm                                                   | 对象/关系映射，包括对JPS和Hibernate的支持                    |
| org.springframework | spirng-oxm                                                   | 对象/XML映射（Object/XML Mapping，OXM）                      |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-test</span> | <span style="color:#47B391;font-weight:bolder">单元测试和集成测试支持组件</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-tx</span> | <span style="color:#47B391;font-weight:bolder">事务基础组件，包括对DAO的支持及JCA的集成</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-web</span> | <span style="color:#47B391;font-weight:bolder">web支持包，包括客户端及web远程调用</span> |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-webmvc</span> | <span style="color:#47B391;font-weight:bolder">REST web服务及web应用的MVC实现</span> |
| org.springframework | spring-webmvc-portlet                                        | 用于Portlet环境的MVC实现                                     |
| org.springframework | spring-websocket                                             | WebSocket和SockJS实现，包括对STOMP的支持                     |
| org.springframework | <span style="color:#47B391;font-weight:bolder">spring-jcl</span> | <span style="color:#47B391;font-weight:bolder">Jakarta Commons Logging 日志系统</span> |

## 四、自定义工厂

### 4.1 配置文件

~~~properties
# 示例代码
userDao=com.rainbase.dao.UserDaoImpl;
userService=com.rainbase.service.UserServiceImpl;
~~~

### 4.2 工厂类

~~~java
/** 示例代码 **/
/**
 * 工厂
 * 1.加载配置文件
 * 2.生产配置中记录的对应对象
 */
public class MyFactory {
    private Properties properties=new Properties();

    public MyFactory() {
    }

    public MyFactory(String filePath) {
        InputStream resourceAsStream = MyFactory.class.getResourceAsStream(filePath);
        //读取配置文件
        try {
            properties.load(resourceAsStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Object getBean(String beanName) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        //1.通过name，获取对应类路径
        String classPath= properties.getProperty(beanName);
        if (classPath!=null){
            Class clazz=null;
            //反射：加载类对象
            clazz=Class.forName(classPath);
            //返回对象
            return clazz;
        }
        return null;
    }
}
~~~

## 五、构建Maven项目

### 5.1 新建项目

### 5.2 选择Maven目录

### 5.3 GAV坐标

## 六、Spring环境搭建

### 6.1 pom.xml中引入Spring常用依赖

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project
        xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.rainbase</groupId>
    <artifactId>spring01</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!-- Spring 常用依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.7.RELEASE</version>
        </dependency>
    </dependencies>
</project>
~~~

### 6.2 创建Spring配置文件

> 命名无限制，约定俗成命名由：spring-context.xml、applicationContext.xml、beans.xml

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
~~~

## 七、Spring工厂编码

> 定义目标Bean类型

~~~java
/** 示例代码 **/
public class MyClass{
    public void show(){
        System.out.println("Hello world");
    }
}
~~~

> spirng-context.xml中的***< beans>***标签内部配置***< bean>***标签

~~~xml
<!-- 示例代码 （id："唯一标识" class=”需要被创建的目标对象的全限定类名“）-->
<bean id="userDao" class="com.rainbase.daoImpl.UserDaoImpl"></bean>
~~~

> 测试代码：需引入**Junit** 进行单元测试

~~~java
<!-- 示例代码 -->
import com.rainbase.dao.UserDao;
import com.rainbase.service.UserService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringFactoryTest {
    @Test
    public void testSpringFactory(){
        //启动工厂
        ApplicationContext context = new ClassPathXmlApplicationContext("/spring-context.xml");
        //获取对象
        UserDao userDao = (UserDao) context.getBean("userDao");
        UserService userService= (UserService) context.getBean("userService");
        userDao.deleteUser(12);
        userService.deleteUser(123123);
    }
}

~~~

## 八、依赖与配置文件详解

> Spring 框架包含多个模块，每个模块各司其职，可解和需求引入相关依赖Jar包实现功能。

### 8.1 Spring依赖关系

|                Spring常用功能的Jar包依赖关系                 |
| :----------------------------------------------------------: |
| ![image-20200706175448656](pic\Spring-千峰\image-20200706175448656.png) |

<span style="color:#47B391;font-weight:bolder">注意：如果Jar包彼此存在依赖，只需引入最外层Jar即可由Maven自动将相关依赖Jar引入到项目中。</span>

### 8.2 schema

> 配置文件中的顶级标签中包含了语义化标签的相关信息
>
> * xmlns：语义化标签所在的命名空间。
> * xmlns:xsi：XMLSchema-instance标签遵循Schema标签标准。
> * xsi:schemaLocation：xsd文件位置，用以描述标签语义、属性、取值范围等。
> * xsd：xml schema definition

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- 要工厂生产的对象（交给spring管理的对象）-->
    <bean id="userDao"
            class="com.rainbase.daoImpl.UserDaoImpl"></bean>
    <bean id="userService"
            class="com.rainbase.serviceImpl.UserServiceImpl"></bean>
</beans>
~~~



## 九、IoC（Inversion of Control）控制反转【<strong style="color:#F36D00">重点</strong>】

> **<span style="color:#F36D00;font-weight:bolder">Inverse Of Control</span>：控制反转**
>
> **反转了依赖关系的满足方式，由之前的自己创建依赖对象，变为由工厂推送。（变主动为被动，即反转）。**
>
> **解决了具有依赖关系的组件之间的<span style="color:#F36D00;font-weight:bolder">强耦合</span>，使得项目形态更加稳健。**

### 9.1 项目中强耦合问题

~~~java
public class UserDaoImpl implements UserDao{...}
~~~

~~~java
public class UserServiceImpl implements UserService{
    //强耦合了UserDaoImpl！！！，使得UserServiceImpl变得不稳健！！
    private UserDao userDao=new UserDaoImpl();
    
    @Override
    public User queryUser(){
        return userDao.queryUser();
    }
    ...
}
~~~

### 9.2 解决方案

~~~java
<!-- 示例代码 -->
//不引用任何一个具体的组件（实现类），在需要其他组件的位置预留存取值入口（set/get）
    
public class UserServiceImpl implements UserService {
    //！！！不再耦合任何DAO实现！！！，消除不稳健因素！！
    private UserDao userDao;
    @Override
    public void deleteUser(Integer id) {
        System.out.println("delete user in Service");
        userDao.deleteUser(123);
    }
    //为userDAO定义set/get，允许userDAO属性接收spring赋值
    public UserDao getUserDao() {
        return userDao;
    }
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}

~~~

~~~ xml
<!-- 示例代码 -->
<!--- 配置文件中配置 -->
<bean id="userService"
	class="com.rainbase.serviceImpl.UserServiceImpl">
	<!--为userDao属性赋值，值为id为userDao的Bean-->
	<property name="userDao" ref="userDao1"></property>
</bean>
~~~



## 十、DI（Dependency Injection）依赖注入【<span style="color:#F36D00;font-weight:bolder">重点</span>】

### 10.1 概念

> 在Spring创建对象的同时，为其属性赋值，称之为依赖注入。

### 10.2 Set注入

> 创建对象时，Spring工厂会通过Set方法为对象的属性赋值。

#### 10.2.1 定义目标Bean类型

> Java类代码

~~~java
<!-- 示例代码 -->
public class User {
    private Integer id;
    private String password;
    private String sex;
        
    // Getters And Setters
}
~~~

#### 10.2.2 基本类型+字符串类型+日期类型

> XML文件配置方法

~~~xml
<!-- 示例代码 -->
<!--Set方法调用-->                                               
<bean name="user" class="com.rainbase.common.entity.User">   
    <!-- 基本数据类型 -->
    <property name="id" value="12"/>                         
    <property name="password" value="123abc"/>               
    <property name="sex" value="male"/>                      
    <property name="age" value="12" />
    <!-- !!!日期形式 注意格式!!! -->
    <property name="bornDate" value="1990/12/12/ 12:12:12"/> 
</bean>
~~~

####  10.2.3 容器类型

> XML文件示例：

~~~xml
<!-- 示例代码 -->
<!--Set方法调用-->                                               
<bean name="user" class="com.rainbase.common.entity.User">   
	<!--数组-->                                                    
    <property name="hobbys">                                 
        <array>                                              
            <value>football</value>                          
            <value>basketball</value>                        
        </array>                                             
    </property>                                              
    <!--集合-->  
    <!-- list -->
    <property name="names">                                  
        <list>                                               
            <value>Tom</value>                               
            <value>Jack</value>                              
        </list>                                              
    </property>
    <!-- Set -->
    <property name="phones">                                 
        <set>                                                
            <value>18888888888</value>                       
            <value>18888888886</value>                       
        </set>                                               
    </property>
    <!-- Map -->
    <property name="countries">                              
        <map>                                                
            <entry key="zh" value="中国"></entry>              
            <entry key="us" value="美国"></entry>              
        </map>                                               
    </property>
    <!-- Properties -->
    <property name="files">                                  
        <props>                                              
            <prop key="url">jdbc:mysql:xxx</prop>            
            <prop key="baidu">www.baidu.com</prop>           
        </props>                                             
    </property>
    <!-- 注入类 -->
    <property name="address" ref="address"/>
</bean>

<bean name="address" class="com.rainbase.common.entity.Address">
	<constructor-arg name="city" value="北京"></constructor-arg>
	<constructor-arg name="id" value="12"></constructor-arg>
</bean>
~~~

#### 10.2.4 自建类型注入

> XML文件配置示例：

~~~xml
<!-- 示例代码 -->
<!-- 次要Bean，被作为属性 -->
<bean name="addr" class="com.rainbase.common.entity.Address">
	<constructor-arg name="city" value="北京"></constructor-arg>
	<constructor-arg name="id" value="12"></constructor-arg>
</bean>
<!-- 主要Bean，操作的主体 -->
<bean name="user" class="com.rainbase.common.entity.User"> 
    <!-- address属性引用addr对象 -->
    <property name="address" ref="addr"/>
</bean>
~~~

~~~xml
<!-- 示例代码 -->
<!-- 次要Bean，被作为属性 -->
<bean name="userDao" class="com.rainbase.dao.UserDaoImpl">
</bean>
<!-- 主要Bean，操作的主体 -->
<bean name="userService" class="com.rainbase.serviceImpl.UserServiceImpl"> 
    <!-- userDao属性引用userDao对象 -->
    <property name="userDao" ref="userDao"/>
</bean>
~~~



### 10.3 Constructor注入【了解】

> 构造注入不是很灵活，必须由对应的构造方法才可以。
>
> XML文件配置示例：

~~~xml
<!-- 示例代码 -->
<!-- 除了标签名不同，其他和set方法注入基本相同 -->
<bean name="address" class="com.rainbase.common.entity.Address">
    <constructor-arg name="city" value="北京"></constructor-arg>
    <constructor-arg name="id" value="12"></constructor-arg>
</bean>
~~~

### 10.4 自动注入【了解】

> <strong>不用再配置中指定哪个属性赋值及赋什么值。</strong>
>
> <strong>由Spring自动根据某个“原则”，在工厂中查找一个Bean，为属性注入属性值。</strong>

~~~java
public class UserServiceImpl implements UserService{
    private UserDAO userDAO;
    //Getters And Setters
    ...
}
~~~

~~~xml
<bean id="userDao" class="com.rainbase.daoImpl.UserDaoImpl"></bean>
<!-- 为UserServiceImpl中的属性基于 类型 自动注入值 --> 
<bean id="userService" class="com.rainbase.serviceImpl.UserServiceImpl" autowire="byType"></bean>
~~~

~~~xml
<!-- 为UserServiceImpl中的属性基于 名称 自动注入值 --> 
<bean id="userDao" class="com.rainbase.daoImpl.UserDaoImpl"></bean>
<bean id="userService" class="com.rainbase.serviceImpl.UserServiceImpl" autowire="byName"></bean>
~~~

## 十一、Bean细节

### 11.1 控制简单对象的单例、多例模式

> 配置 < bean scope="singleton | prototype">< /bean>

~~~xml
<!--
	singletom(默认)：每次调用工厂，得到的都是同一个对象。
	prototype：每次调用工厂，都会创建新的对象
-->
<bean id="mc" class="com.rainbase.MyClass" scope="singleton"></bean>
~~~

* <span style="color:#47B391;font-weight:bolder">注意：需要根据场景决定对象的单例、多例模式。</span>
* <span style="color:#47B391;font-weight:bolder">可以共用：Service、DAO、SqlSessionFacttry（或者是所有的工厂）</span>
* <span style="color:#47B391;font-weight:bolder">不可共用：Connection、SqlSession、ShoppingCart等。</span>

~~~java
/** 测试代码示例 **/
    /**
     * 测试单例
     */
    @Test
    public void testSingleton(){
        ApplicationContext context = new ClassPathXmlApplicationContext("/spring-context.xml");
        User user = (User) context.getBean("user");
        User user1 = (User) context.getBean("user");
        User user2 = (User) context.getBean("user");
        System.out.println(user==user1);
        System.out.println(user==user2);

    }

    /**
     * 测试多例
     */
    @Test
    public void testPrototype(){
        ApplicationContext context = new ClassPathXmlApplicationContext("/spring-context.xml");
        User user = (User) context.getBean("user");
        User user1 = (User) context.getBean("user");
        User user2 = (User) context.getBean("user");
        System.out.println(user==user1);
        System.out.println(user==user2);

    }
~~~

### 11.2 FactoryBean创建复杂对象【了解】

> 作用：让Spring可以创建复杂对象、或者无法直接通过反射创建的对象。

|            FactoryBean解决复杂对象创建             |
| :------------------------------------------------: |
| 创建对应工厂类--->通过工厂创建对象类--->返回对象类 |

#### 11.2.1 实现FactoryBean接口

~~~java
<!-- 示例代码 -->
public class MyConnectionFactoryBean implements FactoryBean<Connection> {
    /**
      * 具体生成对象的方法
      */
    @Override
    public Connection getObject() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://39.106.33.181:3306/hr", "root", "password");
        return conn;
    }

    /**
      * 配置工厂返回对象类型
      */
    @Override
    public Class<?> getObjectType() {
        return Connection.class;
    }

    /**
      * 不是单例
      */
    @Override
    public boolean isSingleton() {
        return false;
    }
}
~~~

#### 11.2.2 配置spring-context.xml

~~~xml
<!-- 
	复杂对象的创建 
	利用FactoryBean 当从工厂索要一个bean时
	如果是FactoryBean
	实际返回的是工厂Bean的getObject的返回值-->
<bean id="conn" class="com.rainbase.factorybean.MyConnectionFactoryBean"></bean>
~~~



#### 11.2.3 特例

## 十二、Spring工厂特性

### 12.1 饿汉式创建优势

> 工厂创建之后，会将Spring配置文件中的所有对象都创建完成（饿汉式）。
>
> 提高程序运行效果。避免多次IO，减少对象创建时间。（概念接近连接池，一次性创建好，使用时直接获取）。

### 12.2 生命周期方法

> * 自定义初始化方法：添加 “init-method” 属性，Spring则会在创建对象之后，调用此方法。
> * 自定义销毁方法：添加 “destroy-method” 属性，Spring则会在销毁对象之前，调用此方法。
> * 销毁：工厂的close()方法被调用之后，Spring会毁掉所有已创建的单例对象。
> * 分类：Singleton对对象由Spring容器销毁、Prototype对象由JVM销毁。

### 12.3 生命周期注解

> 初始化注解、销毁注解。

~~~java
/** 示例代码 **/
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

//初始化方法
@PostConstruct
public void init(){
    System.out.println("init method executed");
}

//销毁方法
@PreDestroy
public void destroy(){
    System.out.pringln("destroy method executed")
}
~~~



### 12.4 生命周期阶段

> <strong>单例Bean：singleton</strong>
>
> 随工厂启动 <span style="color:#F36D00;font-weight:bolder">创建</span>  -->  <span style="color:#F36D00;font-weight:bolder">构造方法</span>  -->  <span style="color:#F36D00;font-weight:bolder">set方法（注入值）</span>  -->  <span style="color:#F36D00;font-weight:bolder">init(初始化)</span>  -->  构建完成  -->  **随工厂关闭** <span style="color:#F36D00;font-weight:bolder">销毁</span>

> <strong>多例Bean：prototype</strong>
>
> 被使用时 <span style="color:#F36D00;font-weight:bolder">创建</span>  -->  <span style="color:#F36D00;font-weight:bolder">构造方法</span>  -->  <span style="color:#F36D00;font-weight:bolder">set方法（注入值）</span>  -->  <span style="color:#F36D00;font-weight:bolder">init(初始化)</span>  -->  构建完成  -->  **JVM垃圾回收** <span style="color:#F36D00;font-weight:bolder">销毁</span>

## 十三、代理设计模式

### 13.1 概念

> 将核心功能与辅助功能（事务、日志、性能监控代码）分离，达到核心业务功能更纯粹、辅助业务功能可复用。

|                           功能分离                           |
| :----------------------------------------------------------: |
| ![image-20200707115845479](pic\Spring-千峰\image-20200707115845479.png) |



### 13.2 静态代理-设计模式

> 通过代理类的对象，为原始类的对象（目标类的对象）添加辅助功能，更容易更换代理实现类、利于维护。

<span style="color:#47B391;font-weight:bolder">注意：代理类和目标类必须实现同样的功能，即实现同一个接口</span>

|                           静态代理                           |
| :----------------------------------------------------------: |
| ![image-20200707120537147](pic\Spring-千峰\image-20200707120537147.png) |

> 示例代码

~~~java
</** 示例代码 代理类 **/>
//静态代理类
public class FangDongProxy implements FangDongService{

    private FangDongService fangDongService=new FangDongServiceImpl();
    public void zufang() {
        //辅助功能、额外功能
        System.out.println("发布租房信息");
        System.out.println("带租客看房");

        //核心功能 原始业务类
        fangDongService.zufang();
    }
}
~~~

~~~java
/** 示例代码 目标类 **/
public class FangDongServiceImpl implements FangDongService{
    public void zufang() {

//        //辅助功能、额外功能
//        System.out.println("发布租房信息");
//        System.out.println("带租客看房");

        //核心功能
        System.out.println("签合同");
        System.out.println("收房租");
    }
}
~~~

~~~java
/** 示例代码 接口 **/
public interface FangDongService {
    void zufang();
}
~~~



### 13.3 动态代理-设计模式

> 动态创建代理类对象，为原始类的对象添加辅助功能。

#### 13.3.1 JDK动态代理（基于接口）

~~~java
<!-- 示例代码 -->
public class DynamicProxyTest {
    //JDK动态代理
    @Test
    public void testJDK(){
        //创建 目标
        final FangDongService fangDongService=new FangDongServiceImpl();
      	//创建回调函数handler
        InvocationHandler ih=new InvocationHandler() {
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("发布租房信息");
                System.out.println("带租客看房");
                //核心功能
                fangDongService.zufang();
                return null;
            }
        };
        //动态生成代理类
        FangDongService proxy = (FangDongService) Proxy.newProxyInstance(DynamicProxyTest.class.getClassLoader(),
                fangDongService.getClass().getInterfaces(),
                ih);
        proxy.zufang();
    }
}
~~~

#### 13.3.2 CGlib动态代理实现（基于继承）

~~~java
</** 示例代码 **/>
public class DynamicProxyTest {
    //CGLIB动态代理
    @Test
    public void testCGLIB(){
        //代理目标
        final FangDongService fangDongService=new FangDongServiceImpl();

        //1.创建字节码增强对象
        Enhancer enhancer=new Enhancer();
        //2.设置父类（等价于实现原始类接口）
        enhancer.setSuperclass(FangDongServiceImpl.class);
        //3.设置回调函数（额外功能代码）
        enhancer.setCallback(new org.springframework.cglib.proxy.InvocationHandler() {
            public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
                //辅助功能
                System.out.println("发布租房信息1");
                System.out.println("带租客看房1");
                //额外功能
                fangDongService.zufang();
                return null;
            }
        });
        //4.动态生成代理类
        FangDongServiceImpl proxy= (FangDongServiceImpl) enhancer.create();
        //5.调用生成的动态代理类
        proxy.zufang();
    }
}
~~~

## 十四、面向切面编程【<span style="color:#F36D00;font-weight:bolder">重点</span>】

### 14.1 概念

> AOP(Aspect Oriented Programming),即面向切面编程，利用一种称为“横切”的技术，剖开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为“Aspect”，即切面。所谓“切面”，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。

### 14.2 AOP开发术语

> * **连接点（Joinpoint）:** 连接点是程序类中客观存在的方法，可被Spring拦截并切入内容。
> * **切入点（Pointcut）:** 被Spring切入连接点。
> * **通知、增强（Advice）** 可以为切入点额外增加功能，分为：前置通知、后置通知、异常通知、环绕通知等。
> * **目标对象（Target）** 代理的目标对象。
> * **引介（Introduction）：** 一种特殊的增强，可在运行期为类动态添加Field和Method。
> * **织入（Weaving）：** 把通知应用到具体的类，进而创建新的代理类的过程。
> * **代理（Proxy）：** 被AOP织入通知后，产生的结果类。
> * **切面（aspect）:** 由切点(**PointCut**)和通知(**Advice**)组成，将横切逻辑织入切面所指定的连接点中。

### 14.3 作用

> Spring的AOP编程即是通过动态代理类为原始类的方法添加辅助功能。

### 14.4 环境搭建

> 引入AOP相关依赖。

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.2.6.RELEASE</version>
</dependency>
~~~

> spring-context.xml文件中引入AOP命名空间。

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       
	    xmlns:aop="http://www.springframework.org/schema/aop"
       
        xsi:schemaLocation="http://www.springframework.org/schema/beans
                            http://www.springframework.org/schema/beans/spring-beans.xsd
                            
                            http://www.springframework.org/schema/aop
                            http://www.springframework.org/schema/aop/spring-aop.xsd">
</beans>
~~~

### 14.5 开发流程

> 1、定义原始类

~~~java
/** 示例代码 **/
public interface UserService {
    List<User> queryUsers();
    Integer updateUser();
    Integer saveUser();
    Integer deleteUser();
}
~~~

~~~java
/** 示例代码 **/
public class UserServiceImpl implements UserService {
    @Override
    public List<User> queryUsers() {
        System.out.println("事务控制");
        System.out.println("日志打印");
        System.out.println("query user");
        return new ArrayList<User>();
    }

    @Override
    public Integer updateUser() {
        System.out.println("update user");
        return 1;
    }

    @Override
    public Integer saveUser() {
        System.out.println("save user");
        return 1;
    }

    @Override
    public Integer deleteUser() {
        System.out.println("delete user");
        return 1;
    }
}
~~~

> 2、定义通知类（添加额外功能）

~~~java
/** 示例代码 **/
//前置通知
public class MyAdvice implements MethodBeforeAdvice {
    @Override
    public void before(Method method, Object[] objects, Object o) throws Throwable {
        System.out.println("Before advice executed ....");
    }
}
~~~

> 3、定义bean标签

~~~xml
<!-- 示例代码 -->
<!-- 原始对象 -->
<bean id="us" class="com.rainbase.serviceImpl.UserServiceImpl"></bean>

<!-- 辅助对象 -->
<bean id="myBefore" class="com.rainbase.aop.basic.MyAdvice"></bean>

~~~

> 4、定义切入点（PointCut）

~~~xml
<!-- 代码示例 -->
<!-- 定义切入点 -->
<aop:config>
	<!--切入点【修饰符 返回值 包、类 方法名 参数列表】-->
    <aop:pointcut id="pc_shine" expression="execution(* queryUser())" />
</aop:config>
~~~

> 5、组装切入点

~~~xml
<!-- 示例代码 -->
<!--定义切入点-->
<aop:config>
    <!--组装切入点-->
    <aop:advisor advice-ref="myBefore" pointcut-ref="pc_shine"/>
</aop:config>
~~~

~~~xml
<!--完整示例-->
<aop:config>
    <aop:pointcut id="pc_shine" expression="execution(* queryUser())" />
    <aop:pointcut id="pc_shine2" expression="execution(* deleteUser())" />
    
    <aop:advisor advice-ref="myBefore" pointcut-ref="pc_shine"/>
    <aop:advisor advice-ref="myBefore" pointcut-ref="pc_shine2"/>
</aop:config>
~~~

> 6、调用

~~~java
</** 示例代码 **/>
@Test
public void testSpringAOP(){
    ApplicationContext context = new ClassPathXmlApplicationContext("/spring-context.xml");
    //通过目标的beanID，获得其代理对象
    UserService proxy= (UserService) context.getBean("userService");
    System.out.println(proxy.getClass());
    proxy.queryUsers();
}
~~~

### 14.6 AOP小结

### 14.7 通知类【可选】

> 定义通知类，达到通知效果
>
> 1. **前置通知**：MethodBeforeAdvice
> 2. **后置通知**：AfterAdvice
> 3. **后置通知**：AfterReturningAdvice (**有异常不执行，方法会因异常而结束，无返回值**)
> 4. **异常通知**：ThrowsAdvice (**只在目标方法抛出异常的时候执行**)
> 5. **环绕通知**：MethodInterceptor

### 14.8 通配切入点

> 根据表达式通配切入点。

~~~xml
<!-- 匹配参数 -->
<aop:pointcut id="myPointCut" expression="execution(* *(com.rainbase.common.entity.User))" />
<!-- 匹配方法名（无参） -->
<aop:pointcut id="myPointCut" expression="execution(* save())" />
<!-- 匹配方法名（任意参数） -->
<aop:pointcut id="myPointCut" expression="execution(* save(..))" />
<!-- 匹配返回值类型 -->
<aop:pointcut id="myPointCut" expression="execution(com.rainbase.common.entity.User *(..))" />
<!-- 匹配类名（包含类中所有方法） -->
<aop:pointcut id="myPointCut" expression="execution(* com.rainbase.serviceImpl.UserServiceImpl.*(..))" />
<!-- 匹配包名（包含包下所有类中所有方法） -->
<aop:pointcut id="myPointCut" expression="execution(* com.rainbase.*.*(..))" />
<!-- 匹配包名以及子包名（com下所有子包中所有类中所有方法） -->
<aop:pointcut id="myPointCut" expression="execution(* com..*.*(..))" />
~~~

### 14.9 JDK和CGLIB的选择

> **Spring底层，包含了JDK代理和CGLIB代理两种代理生成机制。**
>
> **基本规则是：目标业务类如果实现接口则使用JDK代理，没有接口则使用CGLIB代理。**

~~~java
/** 源码代码 **/
public class DefaultAopProxyFactory implements AopProxyFactory, Serializable {

    //此方法中明确定义了 JDK代理和CGLIB代理的选取规则
    //目标业务类如果有接口则使用JDK代理，如果没有则是哟个CGLib代理
	@Override
	public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {
		if (config.isOptimize() || config.isProxyTargetClass() || hasNoUserSuppliedProxyInterfaces(config)) {
			Class<?> targetClass = config.getTargetClass();
			if (targetClass == null) {
				throw new AopConfigException("TargetSource cannot determine target class: " +
						"Either an interface or a target is required for proxy creation.");
			}
			if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
				return new JdkDynamicAopProxy(config);
			}
			return new ObjenesisCglibAopProxy(config);
		}
		else {
			return new JdkDynamicAopProxy(config);
		}
	}
~~~

### 14.10 后处理器

> Spring中定义了很多后处理器，
>
> 每个bean在创建完成之前，都会有一个后处理过程，即再加工，对bean做出相关改变和调整。
>
> Spring-AOP中，就有一个专门的后处理器，负责通过原始业务组件（Service），再加工得到一个代理组件。

|                         常用后处理器                         |
| :----------------------------------------------------------: |
| ![image-20200707150439411](pic\Spring-千峰\image-20200707150439411.png) |

#### 14.10.1 后处理器定义

~~~java
/** 示例代码 **/
/**
 * 后处理器
 * 作用：再bean的创建之后，进行再加工
 * 构造-->set-->postProcessBeforeInitialization-->init-->postProcessAfterInitialization-->destroy
 */
public class MyBeanPostProcessor implements BeanPostProcessor {
    /**
     * 在bean的init方法执行之前执行
     * @param bean 原始的bean对象
     * @param beanName 原始的bean名称
     * @param return 处理后的bean
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("后处理1");
        System.out.println("后处理1："+bean+"  beanName:"+beanName);
        return bean;
    }
	/**
     * 在bean的init方法执行之后执行
     * @param bean 原始的bean对象
     * @param beanName 原始的bean名称
     * @param return 处理后的bean
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("后处理2");
        System.out.println("后处理2："+bean+"  beanName:"+beanName);
        return bean;
    }
}
~~~

#### 14.10.2 配置后处理器

~~~xml
<!-- 示例代码 -->
<!-- 配置后处理器，将对工厂中所有的bean声明周期进行干预 -->
<bean class="com.rainbase.processor.MyBeanPostProcessor"></bean>
~~~

#### 14.10.2 Bean生命周期

> <span style="color:#F36D00;font-weight:bolder">构造</span> 》<span style="color:#F36D00;font-weight:bolder">注入属性</span>  <span style="color:#F36D00;font-weight:bolder">满足依赖</span> 》 <span style="color:#F36D00;font-weight:bolder">后处理器前置过程</span> 》 <span style="color:#F36D00;font-weight:bolder">初始化</span> 》 <span style="color:#F36D00;font-weight:bolder">后处理器后置过程</span> 》<span style="color:#F36D00;font-weight:bolder">返回</span>  》 <span style="color:#F36D00;font-weight:bolder">销毁</span>

#### 14.10.4 动态代理源码【了解】

~~~java
//AbstractAutoProxyCreator 是 AspectJAwareAdvisorAutoProxyCreator父类
//该后处理器类中的wrapIfNecessary方法即动态代理生成过程
AbstractAutoProxyCreator#postProcessAfterInitialization(Object bean,String beanName){
    if(!this.earlyProxyReferences.contains(cacheKey)){
        //开始动态代理
        return wrapIfNecessary(bean, beanName, cacheKey);
    }
}
~~~



## 十五、Spring + MyBatis 【<span style="color:#F36D00;font-weight:bolder">重点</span>】

### 15.1 配置数据源

> **概念：将数据源配置到项目中。**



#### 15.1.1 引入jdbc.properties配置文件

~~~properties
#示例代码
#jdbc.properties
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/hr?useUnicode=true&charset=utf8
jdbc.username=root
jdbc.password=password
~~~



#### 15.1.2 整合Spring配置文件和properties配置文件

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd
">
    <!-- 引入配置文件 -->
    <context:property-placeholder
            location="classpath:jdbc.properties"></context:property-placeholder>

    <!-- 与PooledDataSource集成（二选一） -->
    <bean id="dataSource" class="org.apache.ibatis.datasource.pooled.PooledDataSource">
        <property
                name="driver" value="#{jdbc.driverClass}"/>
        <property
                name="url" value="${jdbc.url}"/>
        <property
                name="username" value="${jdbc.username}"/>
        <property
                name="password" value="${jdbc.password}"/>
    </bean>
    <!-- 与PooledDataSource集成（二选一！！！） -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="clone">
        <property
                name="driverClassName" value="${jdbc.driverClass}"/>
        <property
                name="url" value="${jdbc.url}"/>
        <property
                name="username" value="${jdbc.username}"/>
        <property
                name="password" value="${jdbc.password}"/>
    </bean>
</beans>
~~~



#### 15.1.3 Druid连接池可选参数

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd
">
	<!-- 引入配置文件（多个配置文件用","隔开） -->
    <context:property-placeholder
            location="classpath:jdbc.properties,classpath:druid.properties"/>

    <!-- 与PooledDataSource集成（二选一） -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="clone">
        <!-- 基本配置 -->
        <property name="driverClassName" value="${jdbc.driverClass}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <!-- 配置初始化大小、最大连接数量、最小空闲数量 -->
        <property name="initialSize" value="${druid.initialSize}"/>
        <property name="maxActive" value="${druid.maxActive}"/>
        <property name="minIdle" value="${druid.minIdle}"/>

        <!-- 配置获取连接等待超时的时间 -->
        <property name="maxWait" value="${druid.maxWait}"/>
        <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
        <property name="timeBetweenEvictionRunsMillis" value="${druid.timeBetweenEvictionRunsMillis}"/>
        <!-- 配置一个连接在池中的最小生存时间，单位是毫秒 -->
        <property name="minEvictableIdleTimeMillis" value="${druid.minEvictableIdleTimeMillis}"/>
    </bean>
</beans>
~~~



#### 15.1.4 Druid监控中心

~~~xml
<!-- 第一种配置方式 -->
<!-- web.xml -->
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>DruidStatView</servlet-name>
    <url-pattern>/druid/*</url-pattern>
</servlet-mapping>
~~~

~~~java
/** 第二种配置方式 **/
@WebServlet(urlPatterns="/druid/*",
        initParams={
            	// IP白名单(没有配置或者为空，则允许所有访问)
                @WebInitParam(name="allow",value=""),
	            // IP黑名单 (存在共同时，deny优先于allow)
                @WebInitParam(name="deny",value=""),
	            // 用户名
                @WebInitParam(name="loginUsername",value="duochuang"),
	            // 密码
                @WebInitParam(name="loginPassword",value="DuochuangDruid"),
	            // 禁用HTML页面上的“Reset All”功能
                @WebInitParam(name="resetEnable",value="true")
        }
)
public class DruidStatViewServlet  extends StatViewServlet {
    private static final long serialVersionUID = 1L;
}
~~~



#### 15.1.5 测试Druid监控中心

### 15.2 整合MyBatis

> 将SqlSessionFactory、DAO、Service配置到项目中

#### 15.2.1 导入依赖

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-jdbc</artifactId>
	<version>5.2.6.RELEASE</version>
</dependency>
<dependency>
	<groupId>org.mybatis</groupId>
	<artifactId>mybatis-spring</artifactId>
	<version>1.3.1</version>
</dependency>
~~~

#### 15.2.2 配置SqlSessionFactory

~~~xml
<!-- 示例代码 -->
<!-- 工厂bean：生成SqlSessionFactory -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	<!-- 注入连接池 -->
	<property name="dataSource" ref="dataSource"/>
	<!-- 注入dao-mapper文件信息，如果映射文件和dao接口 同包且同名，则此配置可省略-->
	<property name="mapperLocations">
		<list>
			<value>classpath:mappers/*.xml</value>
		</list>
	</property>
    <!-- 为dao-mapper文件中的实体 定义缺省包路径
  如：<select id="queryAll" resultType="User"></select> 中User类可以不定义包
 	-->
	<property name="typeAliasesPackage" value="com.rainbase.entity"/>
</bean>
~~~

#### 15.2.3 配置MapperScannerConfigurer

> 管理DAO实现类的创建，并创建DAO对象，存入工厂管理
>
> 1. 扫描所有DAO接口，去构建DAO实现。
> 2. 将DAO实现存入工厂管理。
> 3. DAO实现对象在工厂中的id是：“首字母小写的-接口的类名”，例如：UserDAO-->userDAO，OrderDAO-->orderDAO

~~~xml
<!-- 示例代码 -->
    <!--mapperScannerConfigurer-->
<bean id="mapperScannerConfigurer" 											class="org.mybatis.spring.mapper.MapperScannerConfigurer">
	<!--dao接口所在的包，如果有多个包，可以用逗号或分号分隔
		<property name="basePackage" value="com.rainbase.dao,com.rainbase.dao1"/>
	-->
	<property name="basePackage" value="com.rainbase.dao"/>
	<!-- 如果工厂中只有一个SqlSessionFactory的Bean，此配置可以省略 -->
	<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
</bean>
~~~

#### 15.2.4 配置Service

~~~xml
<!-- 示例代码 -->
<bean id="userService" class="com.rainbase.serviceImpl.UserServiceImpl">
    <!-- ！！！注意ref中的值是对应DAO接口的首字母小写的接口名 ！！！ -->
    <property name="userDAO" ref="userDAO"></property>
</bean>
~~~

## 十六、事务【<span style="color:#F36D00;font-weight:bolder">重点</span>】

### 16.1 配置DataSourceTransactionManager

> **事务管理器，其中持有DataSource，可以控制事务功能（commint，rollback等）**

~~~xml
<!-- 1.引入一个事务管理器，其中依赖DataSource，借以获得连接，进而控制事务逻辑 -->
<bean id="tx" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	<property name="datasource" ref="dataSource"></property>
</bean>
~~~

<span style="color:#47B391;font-weight:bolder">注意：DataSourceTransactionManager和SqlSessionFactoryBean要注入同一个DataSource的Bean，否则事务控制失败！！！</span>

### 16.2 配置事务通知

> **基于事务管理器，进一步定制，生成一个额外功能：Advice**
>
> **此Advice可以切入任何需要事务的方法，通过事务管理器为方法控制事务。**

~~~ xml
<!-- 示例代码 -->
<!-- 头部引入  
http://www.springframework.org/schema/tx
http://www.springframework.org/schema/tx/spring-tx.xsdxmlns:tx="http://www.springframework.org/schema/tx
-->
<tx:advice id="txManager" transaction-manager="tx">
    <!-- 定义事务属性 -->
	<tx:attributes>
<!--<tx:method name="insertUser" rollback-for（回滚）="Exception" isolation（隔离级别）="DEFAULT" propagation（传播属性）="REQUIRED" read-only（只读）="false"/>-->
            <!--以User结尾的方法，切入此方法时，采用对应事务实行-->
    <tx:method name="*User" rollback-for="Exception" />
            <!--以query开头的方法，切入此方法时，采用对应事务实行-->
    <tx:method name="query*" propagation="SUPPORTS"/>
    </tx:attributes>
</tx:advice>
~~~



### 16.3 事务属性

#### 16.3.1 隔离级别

> <span style="color:#F36D00;font-weight:bolder">isolation</span> 隔离级别

|     关键字      |                  描述                  |   备注   |
| :-------------: | :------------------------------------: | :------: |
|     default     |  （默认值）（采用数据库的默认的设置）  | （建议） |
|  read-uncommit  |                读未提交                |          |
|  read-commited  | 读已提交（Oracle数据库默认的隔离级别） |          |
| repeatable-read | 可重复读（MySQL数据库默认的隔离级别）  |          |
|   serialized    |                序列化读                |          |

> 隔离级别由低到高为：<span style="color:#F36D00;font-weight:bolder">read-uncommit < read-commited < repeatable-read < serialized-read</span>
>
> * 安全性：级别越高，多事务并发时，越案去。因为共享的数据越来越少，事务间彼此干扰减少。
> * 并发性：级别越高，多事务并发时，并发越差。因为共享的数据越来越少，事务间阻塞情况增多。

> 事务并发时的安全问题：
>
> 1. 脏读：一个事务读取到另一个事务还未提交的数据。
>
>    大于等于 read-commited 可防止
>
> 2. 不可重复读：一个事务内多次读取一行数据的相同内容，其结果不一致。
>
>    大于等于 repeatable-read可防止
>
> 3. 幻影读：一个事务内多次读取一张表中的相同内容，其结果不一致。
>
>    serialized-read 可防止

#### 16.3.2 传播行为

> <span style="color:#F36D00;font-weight:bolder">propagation</span> **传播行为**
>
> 当涉及到事务嵌套（Service调用Service）中，可能会存在问题。
>
> 1. **SUPPORTS：**不存在外部事务，则不开启新事务；存在外部事务，则合并到外部事务中。（适合查询）
> 2. **REQUIRED：**不存在外部事务，则开启新事务；存在外部事务，则合并到外部事务中。（默认值）（适合增删改）

#### 16.3.3 读写性

> <span style="color:#F36D00;font-weight:bolder">读写性</span> 读写性
>
> 1. **true：**只读，可提高查询效率。（适合查询）
> 2. **false：**可读可写。（默认值）（适合增删改）

#### 16.3.4 事务超时

> <span style="color:#F36D00;font-weight:bolder">timeout</span> 事务超时时间（单位为秒）
>
> 1. **100：**自定义等待时间100（秒）。
> 2. **-1：**由数据库指定等待时间（默认值）。（**建议**）

#### 16.3.5 事务回滚

> <span style="color:#F36D00;font-weight:bolder">rollback-for</span>  回滚属性
>
> 1. 如果事务抛出 RuntimeException，则自动回滚。
> 2. 如果事务抛出 CheckException（非运行时异常 Exception），不会自动回滚，而是默认提交事务。
> 3. 处理方案：将CheckException转换成RuntimeException上抛，或 设置 rollback-for="Exception"。

### 16.4 编织

> 将事务管理的Advice切入需要事务的业务方法中。

~~~xml
<!--将事务管理的Advice编织到需要事务的方法中-->
<!-- 声明式事务控制 -->
<aop:config>
	<aop:pointcut id="pc" expression="execution(* com.rainbase.serviceImpl.UserServiceImpl.*(..))" />
	<aop:advisor advice-ref="txManager" pointcut-ref="pc"/>
</aop:config>
~~~



## 十七、注解开发

### 17.1 声明bean

> 用于替换自建类型组件的< bean>< /bean>标签；可以更快速的声明bean。
>
> * <span style="color:#F36D00;font-weight:bolder">@Service</span> **业务类专用**
> * <span style="color:#F36D00;font-weight:bolder">@Repository</span> **dao实现类专用**
> * <span style="color:#F36D00;font-weight:bolder">@Controller</span> **web层专用**
> * <span style="color:#F36D00;font-weight:bolder">@Component</span> **通用**
> * <span style="color:#F36D00;font-weight:bolder">@Scope</span> **用户控制bean的创建模式**

~~~java
//@Service说明 此类是一个业务类，需要将此类纳入工厂，等价替换掉<bean class="xxx.UserServiceImpl"/>
//@Service默认beadId == 首字母小写的类名 ”userServiceImpl“
//@Service("userService") 自定义beadnID为”userService“
@Service //用于声明bean，且id为”userServiceImpl“
@Scope(”singleton“) //声明创建模式，默认为单例模式；@Scope("prototype")为多例模式。
public class UserServiceImpl implements UserService{
    ...
}
~~~

### 17.2 注入（DI）

> **用于完成bean中属性的值的注入**
>* <span style="color:#F36D00;font-weight:bolder">@Autowired</span> **基于类型自动注入**
>* <span style="color:#F36D00;font-weight:bolder">@Resource</span> **基于名称自动注入**
>* <span style="color:#F36D00;font-weight:bolder">@Qualifier("userDAO")</span> **限定要自动注入的bean的id，一般和@Autowierd联用**
>* <span style="color:#F36D00;font-weight:bolder">@Value</span> **注入简单数据类型（jdk8种+String  可以使用占位符）**
> 

~~~java
/** @Autowired 示例代码 **/
@Service
public class UserServiceImpl implements UserServcie{
    //注入类型为UserDAO的bean
    @Autowired
    //如果有多个类型为UserDAO的bean，可以用此注解从其中选一个，或者**使用@Primary**
    @Qualifier("userDAO")
    private UserDAO userDAO;
}
~~~

~~~java
/** @Resource 示例代码 **/
@Service
public class UserServiceImpl implements UserServcie{
    //注入名称为UserDAO3的bean
    @Resource("userDAO3")
    private UserDAO userDAO;
}
~~~

~~~java
/** @Value 示例代码 **/
@Service
public class UserServiceImpl implements UserServcie{
    //注入数字
    @Value("100")
    private Integer id;
    //注入字符串
    @Value("shine")
    private String name;
    //注入配置文件中的属性
    @Value("${jdbc.driverClass}")
    private String className;
}
~~~



### 17.3 事务控制

> 用于控制事务切如。

> <span style="color:#F36D00;font-weight:bolder">@Transactional</span>
>
> **工厂配置中的 通知 < tx:advice...和 织入< aop:config....可以省略。**

~~~java
/** 示例代码 **/
//为类中每个方法都切入事务（有自己的事务控制的方法除外）
@Transactional(isolation = Isolation.READ_COMMITTED,propagation = Propagation.REQUIRED,readOnly = false,rollbackFor = Exception.class,timeout = -1)
public class UserServiceImpl implements UserService {

    //此方法存在自己的事务控制，仅对此方法生效
    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public List<User> findAll() {
        List<User> list = userDao.queryUsers();
        return list;
    }

    //此方法没有自己的事务控制，采用类标注的事务控制
    @Override
    public Integer inserUser(User user) {
        Integer a = userDao.insertUser(user);
        return a;
    }
}
~~~

### 17.4 注解所需配置

> spring-context.xml中配置使用注解

~~~xml
<!-- 告知spring，哪些包中 有被注解的类、方法、属性 -->
<context:component-scan base-package="com.rainbase.service,com.rainbase.serviceImpl"></context:component-scan>
<!-- 告知spring，@Transactional在定制事务时，基于txManager=DataSourceTransationManager -->
<tx:annotation-driven transaction-manager="txManager"></tx:annotation-driven>
~~~



### 17.5 AOP开发

#### 17.5.1 注解使用（配置类方式）

~~~java
/** 示例代码 **/
//@Aspect 声明此类是一个切面类：会包含切入点（pointcut）和通知（advice）
//@Component 声明此类是一个组件，由spring工厂管理
@Aspect
@Component
public class MyAspect {
    //定义切入点
    @Pointcut("execution(* com.rainbase.serviceImpl.UserServiceImpl.*.(..))")
    public void pc(){}

    /**
     * 前置通知
     * @param a 连接点
     */
    @Before("pc()") //引用切入点
    public void myBefore(JoinPoint a){
        System.out.println("target: "+a.getTarget());
        System.out.println("args: "+a.getArgs());
        System.out.println("method: "+a.getSignature().getName());
        System.out.println("before~~~~~~~~");
    }

    /**
     * 后置通知
     * Object ret 为return="ret" 的返回值
     */
    @AfterReturning(value = "pc()",returning = "ret")
    public void  myAfterReturning(JoinPoint a,Object ret){
        System.out.println("after    "+ret);
    }

    /**
     * 环绕通知
     * @param p
     * @return
     * @throws Throwable
     */
    @Around("pc()")
    public Object myInterceptor(ProceedingJoinPoint p) throws Throwable {
        System.out.println("interceptor  before------------");
        //执行核心功能
        Object proceed = p.proceed();
        System.out.println("interceptor  after------------");
        return proceed;
    }

    /**
     * 异常通知
     */
    @AfterThrowing(value = "pc()",throwing = "ex")
    public void myThrows(JoinPoint p,Exception ex){
        System.out.println("throws");
        System.out.println("====="+e.getMessage());
    }
}
~~~

#### 17.5.2 配置文件配置开启AOP注解

~~~xml
<!-- 配置spring工厂扫描路径 -->
<context:component-scan base-package="com.rainbase"></context:component-scan>
<!-- 添加如下配置，启用aop注解 -->
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
~~~

##  十八、集成JUnit

### 18.1 导入依赖

~~~xml
<!-- 示例代码 -->
<!-- 配置spring-test依赖 -->
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-test</artifactId>
	<version>5.2.7.RELEASE</version>
</dependency>
<!-- 配置JUnit依赖 -->
<dependency>
	<groupId>junit</groupId>
	<artifactId>junit</artifactId>
	<version>4.13</version>
	<scope>test</scope>
</dependency>
~~~



### 18.2 编码

> **优势：**
>
> * 可以免去工厂的创建过程。
> * 可以直接将要测试的组件注入到测试类。

~~~java
/** 示例代码 **/
/**
 * 测试类启动时会将spring工厂启动，当前测试类也会被工厂生产
 * @Runwith 配置使用SpringJUnit4ClassRunner运行
 * @ContextConfiguration 配置spring环境配置文件路径
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-context.xml")
public class SpringJUnitTest {

    @Autowired
    @Qualifier("userServiceImpl")
    private UserService userService;

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Test
    public void testUserServiceUpdateTX() throws SQLException {
        Integer integer = userService.updateUser(new User(16,"李四", "123123", "123123123"));
        Assert.assertEquals("更新用户失败",Integer.valueOf(1),integer);
        System.out.println(integer);
    }


    @Test
    public void testSpringJunit(){
        List<User> all = userService.findAll();
        Assert.assertNotNull(all);
        System.out.println(all);
    }

    @Test
    public void testSqlSessionFactory(){
        UserDao mapper = sqlSessionFactory.openSession().getMapper(UserDao.class);
        List<User> list = mapper.queryUsers();
        System.out.println(list);
        Assert.assertNotNull(list);
    }
}
~~~