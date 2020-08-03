# MyBatis笔记

[TOC]

## 一、引言

### 1.1 什么是框架

> <strong style="color:#42AF7F">软件的半成品，解决了软件过程当中的普适性问题</strong>，从而简化了开发步骤，提高了开发的效率。

### 1.2 什么是ORM框架

> * ORM(Object Relation Mapping)对象关系映射，将程序中的<strong style="color:#42AA7F">一个对象与表中的一行数据一一对应。</strong>
> * ORM框架提供了持久化类与表的映射关系，在运行时参照映射文件的信息，<strong style="color:#42AA7F">把对象持久化到数据库中。</strong>

### 1.3 使用JDBC完成ORM操作的缺点

> * 存在大量的冗余代码。
> * 手工创建Connection、Statement等。
> * 手工将结果集封装成实体对象。
> * 查询效率低，没有对数据访问进行过优化（Not Cache）。

## 二、MyBatis框架

### 2.1 概念

> * MyBatis本是Apache软件基金会的一个开源项目iBatis，2010年这个项目由apache software foundation 迁移到了Google Code，并且改名为MyBatis。2013年迁移到Github。
> * MyBatis是一个<strong style="color:#42AA7F">优秀的基于Java的持久层框架</strong>，支持自定义SQL，存储过程和高级映射。
> * Mybatis<strong style="color:#42AA7F">对原有的JDBC操作进行了封装</strong>，几乎消除了所有JDBC代码，使开发者只需关注SQL本身。
> * MyBatis可以使用间的的XML或者Annotation来执行SQL，并<strong style="color:#42AA7F">自动完成ORM操作</strong>，将执行结果返回。

### 2.2 访问与下载

> 官网地址：http://www.mybatis.org/mybatis-3/
>
> 下载地址：https://github.com/mybatis/mybatis-3/releases/tag/mybatis-3.5.1

## 三、构建Maven项目

### 3.1 新建项目

| 使用IDEA打开已创建的文件夹目录 |
| :----------------------------: |
|                                |



### 3.2 选择Maven目录

### 3.3 GAV坐标

### 四、MyBatis环境搭建【<strong style="color:#42AA7F">重点</strong>】

### 4.1 pom.xml中引入MyBatis核心依赖

~~~xml
<!-- 示例代码 -->
<dependencies>
    <!-- 核心依赖 MyBatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.1</version>
    </dependency>
    <!-- JDBC依赖 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.20</version>
    </dependency>
</dependencies>
~~~



### 4.2 创建MyBatis配置文件

~~~xml
<!-- 示例代码 -->

<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- MyBatis 配置 -->
<configuration>
    <!-- 导入外部配置文件 -->
    <properties resource="jdbc.properties"></properties>
    <!-- 开启驼峰映射规则 -->
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <!-- JDBC环境配置、选中默认环境 -->
    <environments default="MySqlDB">
        <!-- MySql数据库环境配置 -->
        <environment id="MySqlDB">
            <!-- 事务控制类型 -->
            <transactionManager type="JDBC"></transactionManager>
            <!-- 连接池 -->
            <dataSource type="org.apache.ibatis.datasource.pooled.PooledDataSourceFactory">
                <property name="driver" value="xxx"/>
                <property name="url" value="xxx"/>
                <property name="username" value="xxx"/>
                <property name="password" value="xxx"/>
            </dataSource>
        </environment>
    </environments>
    <!-- Mapper文件注册 -->
    <mappers>
        <package name="classpath:mappers/*.xml"/>
    <!--<mapper resource="xxxMapper.xml"/>-->
    </mappers>
</configuration>
~~~



## 五、MyBatis开发步骤【<strong style="color:#42AA7F">重点</strong>】

### 5.1 定义实体类

~~~java
/** 示例代码 **/
public class UserEntity {
    private Integer id;
    private String username;
    private String password;
    private Boolean gender;
    private Date registTime;
    
    //Getter And Setter
}
~~~

### 5.2 定义DAO接口

~~~java
/** 示例代码 **/
public interface UserMapper {
    UserEntity queryUserById(Integer id);
}
~~~

### 5.3 编写mapper.xml

> 在resources目录中船舰Mapper.xml文件

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace = 所需实现的接口全限定名 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <!-- id=所需重写的接口抽象方法，resultType = 查询后所需返回的对象类型-->
    <select id="queryUserById" resultType="com.rainbase.common.entity.UserEntity">
        <!-- #{ 参数占位符 } -->
        select * from user where id=#{id}
    </select>
</mapper>
~~~

### 5.4 注册Mapper

> 将Mapper.xml注册到mybatis-config.xml中

~~~xml
<!-- 示例代码 -->
<mappers>
	<!-- 注册Mapper文件 放在resource目录下 -->
    <mapper resources = "UserMapper.xml"/>
    <!-- 未放到resource目录下需要配置maven包含关系 -->
    <mapper resources = "com.rainbase.mapper"
</mappers>
~~~



### 5.5 测试

~~~java
/** 示例代码 **/
public class TestMybatis {
    public static void main(String[] args) throws IOException {
        //MyBatis API
        //1.加载配置文件
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
        //2.构建对象，SqlSessionFactory
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        //3.通过SqlSessionFactory创建SqlSession
        SqlSession sqlSession=factory.openSession();
        //4.通过SqlSession 获得 DAO 实现类的对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        UserEntity userEntity = userMapper.queryUserById(1);
        UserEntity userEntity1 = userMapper.queryUserById(2);
		//5.测试查询方法
        System.out.println(userEntity);
        System.out.println(userEntity1);
    }
}
~~~

## 六、细节补充

### 6.1 解决mapper.xml存放在resources以外路径中的读取问题

> 在pom.xml文件末尾追加< build>标签，以便可以将xml文件复制到classes中，并在程序运行时正确读取。

~~~xml
<!-- 示例代码 -->
<build>
	<resources>
    	<resource>
        	<directory>src/main/java</directory>
            <includes>
                <!-- 默认（新添加自定义则失效） -->
            	<include>*.xml</include>
                <!-- 新添加 */代表一级目录 **/ 代表多级目录 -->
                <include>**/*.xml</include>
            </includes>
            <filterint>true</filterint>
        </resource>
    </resources>
</build>
~~~



### 6.2 properties配置文件

> 对于mybatis-config.xml的核心配置中，如果需要频繁改动的数据内容，可以提取到properties中

~~~properties
#示例代码
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=url
jdbc.username=username
jdbc.password=password
~~~

> 在mybatis-config.xml中引入配置文件

~~~xml
<!-- 示例代码 -->
<!-- 导入外部配置文件 -->
<properties resource="jdbc.properties"></properties>
<!-- 使用占位符引用改参数 -->
<property name="driver" value="${jdbc.driver}"/>
~~~

### 6.3 类型别名

> 第一种：实体类直接映射，在mapper.xml中使用该别名进行引用

~~~xml
<!-- 示例代码 -->
<!-- 实体类别名 -->
<typeAliases>
    <typeAlias type="com.rainbase.common.entity.UserEntity" alias="user_mybatis"></typeAlias>
</typeAliases>
~~~

> 第二种：配置包路径，在mapper.xml中直接用类名作为别名

~~~xml
<!-- 示例代码 -->
<typeAliases>
<!-- 定义实体类所在的包，每个实体类都会自动有一个别名，为类名 -->
    <package name="com.rainbase.common.entity"/>
</typeAliases>
~~~

### 6.4 创建log4j配置文件

> pom.xml添加log4j依赖。

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.17</version>
</dependency>
~~~

> 创建并配置log4j.properties

~~~properties
#示例代码
#Global logging configuration
log4j.rootLogger=DEBUG,stdout
#MyBatis logging configuration...
log4j.logger.org.mybatis.example.BlogMapper=TRACE
#Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] -%m%n
~~~

|   级别    | 描述                                                         |
| :-------: | ------------------------------------------------------------ |
| ALL LEVEL | 打开所有日志记录开关；是最低等级的，用于打开所有日志记录     |
|   TRACE   | 很低的日志级别，一般不会使用                                 |
|   DEBUG   | 指出细粒度信息事件对调试应用程序是非常有帮助的，主要用于开发过程中打印一些运行信息 |
|   INFO    | 消息在粗粒度级别上突出强调应用程序的运行过程。打印一些你感兴趣的或者重要的信息，这个可以用于生产环境中输出程序运行的一些重要信息，但是不能滥用，避免打印过多的日志。 |
|   WARN    | 表明会出现潜在错误的情形，有些信息不是错误信息，但是也要给程序员的一些提示。 |
|   ERROR   | 指出虽然发生错误事件，但仍然不影响系统的继续运行。打印错误和异常信息，如果不想输出太多的日志，可以使用这个级别。 |
|  FANTAL   | 指出每个严重的错误事件将会导致应用程序的退出。这个级别比较高了。重大错误，这种级别你可以直接停止程序了。 |
|    OFF    | 最高等级的，用于关闭所有日志记录。                           |



## 七、MyBatis的CRUD操作【<strong style="color:#42AA7F">重点</strong>】

### 7.1 查询

> 标签：< select id="" resultType="">< /select>

#### 7.1.1 序号参数绑定

~~~java
/** 示例代码 **/
public interface UserDao{
    //使用原生参数绑定
    public User selectUserByIdAndPwd(Integer id, String pwd);
}
~~~

~~~xml
<!-- 示例代码 -->
<select id="selectUserByIdAndPwd" resultType="User">
	SELECT * FROM users
    WHERE ID = #{arg0} AND password = #{arg1}
</select>

<select id = "selectUserByIdAndPwd" resultType="User">
	SELECT * FROM users
    WHERE ID = #{param1} AND password = #{param2}
</select>
~~~



#### 7.1.2 注解参数绑定【推荐】

~~~java
/** 示例代码 **/
public interface UserDao{
    //使用原生参数绑定
    public User selectUserByIdAndPwd(@Param("id")Integer id,@Param("password") String pwd);
}
~~~

~~~xml
<!-- 示例代码 -->
<select id="selectUserByIdAndPwd" resultType="User">
	SELECT * FROM users
    WHERE ID = #{id} AND password = #{password}
</select>
~~~



#### 7.1.3 Map参数绑定

> **第一种方案：**

~~~java
/** Mapper接口示例代码 **/
public interface UserMapper {
    //使用@Param注解
    UserEntity selectUserByIdAndPwd(@Param("map") Map map);
}
~~~
~~~xml
<!-- Mapper.xml示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <select id="selectUserByIdAndPwd" resultType="UserEntity">
        SELECT * FROM user
        WHERE ID = #{map.id} AND password = #{map.password}
    </select>
</mapper>
~~~

> **第二种方案：**

~~~java
/** Mapper接口示例代码 **/
public interface UserMapper {
    //此处不加@Param注解
    UserEntity selectUserByIdAndPwd(Map map);
}
~~~
~~~xml

<!-- Mapper.xml示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <select id="selectUserByIdAndPwd" resultType="UserEntity">
        SELECT * FROM user
        WHERE ID = #{id} AND password = #{password}
    </select>
</mapper>
~~~



#### 7.1.4 对象参数绑定

> **第一种方案：**

~~~java
/** DAO接口示例代码 **/
public interface UserMapper {
    UserEntity selectUserByUsernameAndPassword(UserEntity userEntity);
}
~~~

~~~xml
<!-- mapper.xml 示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <select id="selectUserByUsernameAndPassword" resultType="UserEntity" parameterType="UserEntity">
        SELECT * FROM user
        WHERE username = #{username} AND password = #{password}
    </select>
</mapper>
~~~

> **第二种方案：**

~~~java
/** DAO接口示例代码 **/
public interface UserMapper {
    UserEntity selectUserByUsernameAndPassword(@Param("user")UserEntity userEntity);
}
~~~

~~~xml
<!-- Mapper.xml 示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <select id="selectUserByUsernameAndPassword" resultType="UserEntity" parameterType="UserEntity">
        SELECT * FROM user
        WHERE username = #{user.username} AND password = #{user.password}
    </select>
</mapper>
~~~

#### 7.1.5 模糊查询

~~~java
/** DAO接口示例代码 **/
public interface UserMapper {
    List<UserEntity> selectNameLike(@Param("name") String username);
}
~~~

~~~xml
<!-- mapper.xml 示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <select id="selectNameLike" resultType="UserEntity">
        SELECT * FROM user
        WHERE username like concat('%',#{name},'%')
    </select>
</mapper>
~~~



### 7.2 删除

> 标签：< delete id="xxxx" parameterType="xxx"> < /delete>

~~~xml
<!-- mapper.xml示例代码 -->
<mapper>
    <delete id="deleteUserById" parameterType="int">
        <!-- 只有一个参数时，#{任意书写} -->
        delete from user where id=#{id}
    </delete>
</mapper>
~~~



### 7.3 修改

> 标签：< update id="xxx" parameterType="xxx">< /update>

~~~xml
<!-- mapper.xml 示例代码 -->
<mapper>
	<update id="updateUser" parameterType="UserEntity">
        update user
        set username=#{username},
            password=#{password},
            gender=#{gender},
            regist_time=#{registTime}
        where id = #{id}
    </update>
</mapper>
~~~



### 7.4 添加

> 标签：< insert id="xxx" parameterType="xxx"

~~~xml
<!-- 手动主键 -->
<mapper>
    <insert id="insertUser" parameterType="UserEntity">
        insert into user (id,username, password, gender, regist_time)
        values (#{id},#{username}, #{password}, #{gender}, #{registTime})
    </insert>
</mapper>
~~~

~~~xml
<!-- 自动主键 -->
<mapper>
    <insert id="insertUser" parameterType="UserEntity">
        <!-- 自动增长主键，以下两种方案均可 -->
        insert into user (id,username, password, gender, regist_time) values (#{id},#{username}, #{password}, #{gender}, #{registTime})
        
        insert into user (id,username, password, gender, regist_time) values (null,#{username}, #{password}, #{gender}, #{registTime})
    </insert>
</mapper>
~~~



### 7.5 主键回填

> **标签：< selectKey keyProperty="id" resultType="int/String" order="AFTER/BOFORE">< /selectKey>**

#### 7.5.1 通过last_insert_id()查询主键

~~~xml
<!-- 示例代码 -->
<mapper>
	<insert id="insertUser" parameterType="UserEntity">
        <!-- 插入之后进行主键回填 -->
        <selectKey keyProperty="id" resultType="int" order="AFTER">
            <!-- 适用于整数类型自增主键 -->
            select last_insert_id()
        </selectKey>
        insert into user (username, password, gender, regist_time)
        values (#{id},#{username}, #{password}, #{gender}, #{registTime})
    </insert>
</mapper>
~~~



#### 7.5.2 通过uuid()查询主键

~~~xml
<!-- 示例代码 -->
<mapper>
    <insert id="insertUser" parameterType="UserEntity">
        <!-- 插入之前进行主键回填 -->
        <selectKey keyProperty="id" resultType="String" order="BEFORE">
            <!-- 适用于字符类型主键 -->
            select replace(uuid(),'-','')
        </selectKey>
        insert into user (id,username, password, gender, regist_time)
        values (#{username}, #{password}, #{gender}, #{registTime})
    </insert>
</mapper>
~~~



## 八、MyBatis工具类【<strong style="color:#F36D00">重点</strong>】

### 8.1 封装工具类

~~~java
/** 示例代码 **/
/**
 * 1.加载配置文件
 * 2.创建SqlSessionFactory
 * 3.创建session
 * 4.事务管理
 * 5.Mapper管理
 */

public class MyBatisUtil {
    private static SqlSessionFactory sqlSessionFactory;
    private static final ThreadLocal<SqlSession> tl = new ThreadLocal<SqlSession>();

    static {
        //加载配置文件并构建SqlSessionFactory
        try {
            InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static SqlSession openSession() {
        //线程唯一，全局不唯一
        SqlSession sqlSession = tl.get();
        if (sqlSession == null) {
            sqlSession = sqlSessionFactory.openSession();
            tl.set(sqlSession);
        }
        return sqlSession;
    }

    public static void commit(){
        SqlSession sqlSession = openSession();
        sqlSession.commit();
        closeSession();;
    }

    public static void rollback(){
        SqlSession sqlSession = openSession();
        sqlSession.rollback();
        closeSession();
    }

    public static void closeSession(){
        SqlSession sqlSession = tl.get();
        sqlSession.close();
    }

    public static <T> T getMapper(Class<T> mapper){
        SqlSession sqlSession = openSession();
        T mapperProxy = sqlSession.getMapper(mapper);
        return mapperProxy;
    }
}
~~~



### 8.2 测试工具类

~~~java
/** 示例代码 **/
public class MyBatisUtilTest {
    public static void main(String[] args) {
        UserMapper userMapper = MyBatisUtil.getMapper(UserMapper.class);
        UserEntity userEntity=new UserEntity(null,"test001","111",true,new Date());
        Integer integer = userMapper.insertUser(userEntity);
        System.out.println(userEntity);
        MyBatisUtil.commit();
    }
}
~~~

## 九、ORM映射【<strong style="color:#F36D00">重点</strong>】

### 9.1 MyBatis自动ORM失效

> **MyBatis只能自动维护库表“列名”与“属性名”相同的一一对应关系，二者不同时，无法自动ORM。**

|                         自动ORM失效                          |
| :----------------------------------------------------------: |
| ![image-20200714134502487](pic\MyBatis-千峰\image-20200714134502487.png) |

### 9.2 方案一：使用别名

> **在SQL中使用*as*为查询字段添加列别名，以匹配属性名。 **

~~~xml
<!-- 示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <!--描述方法-->
    <select id="queryUserById" resultType="UserEntity">
        select id, username, password, gender, regist_time as registTime
        from user
        where id = #{id}
    </select>
</mapper>
~~~



### 9.3 方案二：结果映射（ResultMap-查询结果的封装规则）

> **利用ResultMap进行结果封装映射规则的定制，可以提供复杂的规则定制**

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.rainbase.mapper.UserMapper">

    <!-- type:使用哪个类进行封装 -->
    <resultMap id="user_resultMap" type="UserEntity">
        <!-- 定义更复杂的 映射规则 -->
        <id column="id" property="id" javaType="Integer"></id>
        <result column="username" property="username"></result>
        <result column="password" property="password"></result>
        <result column="gender" property="gender"></result>
        <result column="regist_time" property="registTime"></result>
    </resultMap>

    <!--    </select>-->
    <select id="queryUserById" resultMap="user_resultMap">
        select id, username, password, gender, regist_time as registTime
        from user
        where id = #{id}
    </select>
</mapper>
~~~

## 十、MyBatis处理关联关系-多表连接【<strong style="color:#F36D00">重点</strong>】

> 实体间的关系：关联关系（拥有has、属于belong）
>
> * OneToOne：一对一关系（Passenger---Password）
> * OneToMany：一对多关系（Employee---Department）
> * ManyToMany：多对多关系（Student---Subject）

|                      Table建立外键关系                       |
| :----------------------------------------------------------: |
| ![image-20200714140259965](pic\MyBatis-千峰\image-20200714140259965.png) |

|                      Entity添加关系属性                      |
| :----------------------------------------------------------: |
| ![image-20200720125918183](pic\MyBatis-千峰\image-20200720125918183.png) |



### 10.1 OneToOne

> **OneToOne:一对一映射，适用于对象间的一对一的映射关系**
>
> **利用association映射的三种方式：**

#### 10.1.1 第一种方式：association中使用select

~~~java
/** 示例代码 **/
public interface PassengerMapper {
    /**通过旅客id查询旅客信息及其护照信息, 关联查询，级联查询*/
   Passenger queryPassengerById(Integer id);
}
~~~

~~~xml
<!-- 示例代码 -->

<!-- 在CardDao.xml中实现该方法: -->
 <select id="queryCardById" parameterType="int" resultType="Card">
        SELECT *
        FROM tb_card
        WHERE card_id=#{cardId}
 </select>

<!-- UserDao.xml中引用这个方法 -->
<resultMap type="User" id="userMap">
    <result property="userName" column="user_name"/>
    <result property="age" column="age"/>
   <association property="card" column="card_id" select="com.zhu.ssm.dao.CardDao.queryCardById">	</association>
</resultMap>
~~~

> 在这里直接通过select引用CardDao的queryById方法。个人感觉这种方法比较麻烦，因为还要在CardDao里定义queryCardById方法并且实现再引用才有用，不过这种方法思路清晰，易于理解。

#### 10.1.2 第二种方式：嵌套resultMap实现

~~~xml
<!-- 示例代码 -->
<resultMap type="Card" id="cardMap">
      <id property="cardId" 
            column="card_id"/>
      <result property="cardNum" column="card_num"/>
      <result property="address" column="address"/>
</resultMap>

<resultMap type="User" id="userMap">
     <result property="userName" column="user_name"/>
     <result property="age" column="age"/>
     <association property="card" resultMap="cardMap">
     </association>
</resultMap>
~~~

> 第二种方法就是在UserDao.xml中先定义一个Card的resultMap，然后在User的resultMap的association标签中通过resultMap="cardMap"引用。这种方法相比于第一种方法较为简单。

#### 10.1.3 第三种方式：嵌套resultMap简化版

~~~xml
<!-- 示例代码 -->
<resultMap type="User" id="userMap">
   <result property="userName" column="user_name"/>
   <result property="age" column="age"/>
   <association property="card" column="card_id" javaType="Card">
      <id property="cardId" column="card_id"/>
      <result property="cardNum" column="card_num"/>
      <result property="address" column="address"/>
    </association>
</resultMap> 
~~~

> **这种方式可以实现对应的映射，但是代码复用性低，所以在实际开发中应该根据实际情况选择相应的实现方法。**

### 10.2 OneToMany

> **OneToMany:一对多映射，适用于对象间的一对多的映射关系**
>
> **利用collection映射的三种方式：**

<strong style="color:#F36D00">注意: 注意查看第一种方式和第二、第三种方式SQL语句的不同!!!</strong>

#### 10.2.1 第一种方式: 在collection中使用select

> **这种方式是通过结果集拼装实现的,在Department查询中调用Employee中的查询方法,并传递相关参数,将其返回结果直接拼装在此结果中。** 

~~~java
/** 示例代码 **/
public interface EmployeeMapper {
    /** 根据部门id查询员工 */
    List<Employee> queryEmployeesByDeptId(@Param("deptId") Integer deptId);
}
~~~



~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.rainbase.mapper.DepartmentMapper">

    <resultMap id="employeeMap" type="com.rainbase.common.entity.Employee">
        <id property="id" column="e_id"></id>
        <result property="name" column="e_name"></result>
        <result property="salary" column="salary"></result>
        <result property="deptId" column="dept_id"></result>
    </resultMap>

    <resultMap id="departmentWithEmployee" type="com.rainbase.common.entity.Department">
        <id property="id" column="id" javaType="int"></id>
        <result property="name" column="name"></result>
        <result property="location" column="location"></result>
        <collection property="employees" column="id" select="com.rainbase.mapper.EmployeeMapper.queryEmployeesByDeptId"></collection>
    </resultMap>

    <select id="queryDepartmentById" resultMap="departmentWithEmployee">
        select * from t_departments where id=#{id}
    </select>

</mapper>
~~~

> **在这里直接通过select引用EmployeeMapper的queryEmployeesByDeptId方法。个人感觉这种方法比较麻烦，因为还要在EmployeeMapper里定义EmployeeMapper方法并且实现再引用才有用，不过这种方法思路清晰，易于理解。**

#### 10.2.2 第二种方式: 嵌套resultMap方式

> **第二种方法就是在DepartmentMapper.xml中先定义一个employeeMap的resultMap，然后在Department的resultMap的collection标签中通过resultMap="employeeMap"引用。这种方法相比于第一种方法较为简单。**

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.rainbase.mapper.DepartmentMapper">
    <resultMap id="employeeMap" type="com.rainbase.common.entity.Employee">
        <id property="id" column="e_id"></id>
        <result property="name" column="e_name"></result>
        <result property="salary" column="salary"></result>
        <result property="deptId" column="dept_id"></result>
    </resultMap>

    <resultMap id="departmentWithEmployee" type="com.rainbase.common.entity.Department">
        <id property="id" column="id" javaType="int"></id>
        <result property="name" column="name"></result>
        <result property="location" column="location"></result>
        <collection property="employees" resultMap="employeeMap"></collection>
    </resultMap>

    <select id="queryDepartmentById" resultMap="departmentWithEmployee">
        select t.id id, t.name name, t.location, te.id e_id, te.name e_name, salary, dept_id
        from t_departments t
                 left join t_employees te on t.id = te.dept_id
        where t.id = #{id}
    </select>
</mapper>
~~~



#### 10.2.3 第三种方式: 嵌套resultMap简化版

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.rainbase.mapper.DepartmentMapper">
    <resultMap id="departmentWithEmployee" type="com.rainbase.common.entity.Department">
        <id property="id" column="id" javaType="int"></id>
        <result property="name" column="name"></result>
        <result property="location" column="location"></result>

        <!-- javaType定义property的类型，是哪种集合，ofType定义元素泛型 -->
        <collection property="employees" javaType="java.util.List" ofType="com.rainbase.common.entity.Employee">
            <id property="id" javaType="int" column="e_id"></id>
            <result property="name" column="e_name"></result>
            <result property="salary" column="salary"></result>
            <result property="deptId" column="dept_id"></result>
        </collection>
    </resultMap>

    <select id="queryDepartmentById" resultMap="departmentWithEmployee">
        select t.id id, t.name name, t.location, te.id e_id, te.name e_name, salary, dept_id
        from t_departments t
                 left join t_employees te on t.id = te.dept_id
        where t.id = #{id}
    </select>
</mapper>
~~~

> **这种方式可以实现对应的映射，但是代码复用性低，所以在实际开发中应该根据实际情况选择相应的实现方法。 **

### 10.3 ManyToMany

> **SQL参考ManyToManyExample.sql**

|                       建立第三张关系表                       |
| :----------------------------------------------------------: |
| ![image-20200720154604077](pic\MyBatis-千峰\image-20200720154604077.png) |

~~~sql
create table t_students(
    id int primary key auto_increment,
    name varchar(50),
    sex varchar(1)
)character set utf8mb4;

create table t_subjects(
    id int primary key auto_increment,
    name varchar(50),
    grade int
)character set utf8mb4;

create table t_stu_sub(
    student_id int,
    subject_id int,
    foreign key (student_id) references t_students(id),
    foreign key (subject_id) references t_subjects(id),
    primary key (student_id,subject_id)
)character set utf8mb4;

insert into t_students values (1,'shine','m');
insert into t_students values (2,'张三','f');
insert into t_subjects values (1001,'JavaSE',1);
insert into t_subjects values (1002,'JavaWeb',2);
insert into t_stu_sub values (1,1001);
insert into t_stu_sub values (1,1002);
insert into t_stu_sub values (2,1001);
insert into t_stu_sub values (2,1002);
~~~



~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.rainbase.mapper.SubjectMapper">
    <resultMap id="subject_with_students" type="com.rainbase.common.entity.Subject">
        <id property="id" column="id"></id>
        <result property="name" column="name"></result>
        <result property="grade" column="grade"></result>
        <collection property="students" javaType="ArrayList" ofType="com.rainbase.common.entity.Student">
            <id property="id" column="stu_id"></id>
            <result property="name" column="stu_name"></result>
            <result property="sex" column="sex"></result>
        </collection>
    </resultMap>

    <select id="querySubjectById" resultMap="subject_with_students">
        select t.id id,t.name name,grade,ts.id stu_id,ts.name stu_name,sex
        from t_subjects t
                 left join t_stu_sub tss on t.id = tss.subject_id
                 left join t_students ts on tss.student_id = ts.id
        where t.id =#{id}
    </select>
</mapper>
~~~

> **多对多关系和一对多关系并没有什么区别，添加一张中间表即可**

<strong style="color:#42AA7F">注意：指定“多方”关系时（集合），使用< collection ofType=""></strong>

### 10.4 关系总结

> **在“一”的一方，添加集合；在“多”的一方，添加对象。**
>
> **双方均可建立关系属性，建立关系属性后，对应的Mapper文件种需要使用< ResultMap>完成多表映射。**
>
> **持有对象关系属性，使用< association property="dept" javaType="Department">**
>
> **持有集合关系属性，使用< collection property="emps" ofType="employee">**

## 十一、动态SQL【<strong style="color:#F36D00">重点</strong>】

> **MyBatis的映射文件中支持在基础SQL语句上添加一些逻辑擦欧总，并动态拼接成完整的SQL之后再执行，以达到SQL复用、简化编程的效果。**

### 11.1 < sql >标签

> **抽取重复SQL语句片段。**
>
> **此标签用于将相同功能的SQL语句片段提取出来，在具体使用中根据ID使用< include refid="">< /include>进行插入。**

~~~xml
<!-- 示例代码 -->
<mapper namespace="com.rainbase.mapper.UserMapper">
    <!-- 定义SQL片段 -->
    <sql id="BOOK_FIELD">
        SELECT id, name, author, publish, sort
    </sql>
    
    <select id="selectBookByCondition" resultType="Book">
    <!-- 通过ID引用SQL片段 -->
        <include refid="BOOK_FIELD"/>
        FROM t_books
    </select>
</mapper>
~~~

### 11.2 < if >标签

> **此标签可以用于进行条件判断。**
>
> **例如：查询用户时可以根据用户名或者手机号查询，在接口中使用实体类传递参数，在mapper中判断哪个非空**

~~~xml
<!-- 示例代码 -->
<select id="queryUser" resultType="UserEntity">
    SELECT id, name, author, publish, sort
    FROM user
    WHERE
    <if test="id != null">
        id=#{id}
    </if>
    <if test="username != null">
        username=#{username}
    </if>
</select>

<!-- 这种写法在id为空的情况下会出错，所以可以采用<where>标签包裹的形式，自动忽略and | or -->
<select id="queryUser2" resultType="UserEntity">
    <include refid="user_field"/>
    FROM user
    WHERE
    <if test="id != null">
        id = #{id}
    </if>
    <if test="username != null">
        OR username = #{username}
    </if>
</select>
~~~



### 11.3 < where >标签

> **此标签用于多条件查询时的条件拼接。**
>
> * 补充*where*关键字
> * 识别*where*子句，如果直接拼接*or*或者*and*，会将其去除，防止SQL语句出错

~~~xml
<!-- 示例代码 -->
<select id="selectBookByCondition" resultType="com.rainbase.cn.common.entity.Book">
	SELECT id, name, author, publish, sort
    FROM t_books
    <!-- 不使用<where>标签的写法在id为空的情况下会出错，所以可以采用<where>标签包裹的形式，自动忽略and | or -->
    <where>
		<if test="id != null">
        	id = #{id}
        </if>
        <if test="username != null">
        	OR username = #{username}
        </if>
    </where>
</select>
~~~

### 11.4 < set >标签

> **此标签用于在插入/更新数据时，对为空的属性进行判断，防止修改原属性。**
>
> * 自动补充***set***关键字。
> * 识别***set***子句，去除多余逗号，实现***SQL***的正确拼接。

~~~xml
<!-- 示例代码 -->
<update id="updateBookByCondition" parameterType="Book">
	UPDATE t_books
    <set>
    	<if test="name != null">
        	name = #{name},
        </if>
        <if test="name != null">
        	author = #{author},
        </if>
        <if test="name != null">
        	publish = #{publish},
        </if>
        <if test="name != null">
        	sort = #{sort}
        </if>
    </set>
    where id = #{id}
</update>
~~~



### 11.5 < trim >标签

> **此标签用于替换< where >和< set >标签，**
>
> **属性：**
>
> * ***prefix：***用于添加语句前缀（where 或者 set）
> * ***prefixOverrides:*** 多余字符去除（可以赋值 and|or，实现多余and和or均去除的效果）
> * ***suffix：***用于添加语句后缀
> * ***suffixOverrides：***后缀去除（例如set语句中的最后一个逗号）

~~~xml
<!-- 示例代码 -->
<!-- 替换where，自动忽略无用前缀 -->
<select id="queryUser2" resultType="UserEntity">
    <include refid="user_field" />
    FROM user
    <trim prefix="where" prefixOverrides="or | and">
    	<if test="id != null">
        	id = #{id}
        </if>
        <if test="username != null">
        	OR username = #{username}
    	</if>
	</trim>
</select>

<!-- 替换set，自动忽略最后逗号 -->
<update id="updateUser" parameterType="UserEntity">
	UPDATE user
	<trim prefix="set" suffixOverrides=",">
		<if test="username != null">
			username = #{username},
		</if>
		<if test="password != null">
			password = #{password},
		</if>
		<if test="gender != null">
			gender = #{gender},
		</if>
		<if test="registTime != null">
			regist_time = #{registTime}
		</if>
	</trim>
	WHERE id = #{id}
</update>

<!-- 用于替换其他属性 -->
<insert id="insertUser" parameterType="UserEntity">
	<selectKey keyProperty="id" resultType="int" order="AFTER">
    	<!-- 适用于数字类型主键 -->
        SELECT last_insert_id()
    </selectKey>
	INSERT into user
	<trim prefix="(" suffix=")" suffixOverrides=",">
    	id,
	    <if test="username != null">username,</if>
    	<if test="password != null">password,</if>
        <if test="gender != null">gender,</if>
        <if test="regist_time != null">regist_time,</if>
    </trim>
    <trim prefix="values(" suffix=")" suffixOverrides=",">
    	id,
        <if test="username != null">#{username},</if>
        <if test="password != null">#{password},</if>
        <if test="gender != null">#{gender},</if>
        <if test="registTime != null">#{registTime}</if>
    </trim>
</insert>
~~~



### 11.6 < foreach >

> **此标签用于对批量操作提供支持：**
>
> * 对传递多个数据的操作进行支持
> * 自动添加分隔符、开始、结束符号

|    参数    |   描述   |                    取值                     |
| :--------: | :------: | :-----------------------------------------: |
| collection | 容器类型 |              list、array、map               |
|    open    |  起始符  |                      (                      |
|   close    |  结束符  |                      )                      |
| separator  |  分隔符  |                      ,                      |
|   index    |  下表号  |              从0开始，依次递增              |
|    item    |  当前项  | 任意名称（循环中通过#{任意名称}表达式访问） |

~~~xml
<!-- 示例代码 -->

<delete id="deleteManyUser" parameterType="java.util.List">
	DELETE from user where id in
	<foreach collection="list" open="(" close=")" separator="," item="id">
		#{id}
	</foreach>
</delete>

<insert id="insertManyUser" parameterType="java.util.List">
	INSERT INTO user values
	<foreach collection="list" open="" close="" separator="," item="user">
		(null,#{user.username},#{user.password},#{user.gender},#{user.registTime})
	</foreach>
</insert>
~~~



## 十二、缓存（Cache）【<strong style="color:#F36D00">重点</strong>】

> **内存中的一块存储空间，服务于某个应用程序，旨在将频繁读取的数据临时保存在内存中，便于二次快速访问。**

| 无缓存：用户在访问相同数据时，需要发起多次对数据库的直接访问，导致产生大量IO、读写硬盘的操作，效率低下。 |
| :----------------------------------------------------------: |
| ![image-20200720214441954](pic\MyBatis-千峰\image-20200720214441954.png) |

| 有缓存：首次访问时，查询数据库，将数据存储到缓存中；再次访问时，直接访问缓存，减少IO、硬盘读写次数，提高效率。 |
| :----------------------------------------------------------: |
| ![image-20200720214612624](pic\MyBatis-千峰\image-20200720214612624.png) |

### 12.1 一级缓存

> **SqlSession级别的缓存，同一个SqlSession的发起多次同构查询，会将数据保存在一级缓存中。**
>
> * 一级缓存在实际使用中，用处并不大。

* <strong style="color:#2fa589">注意：无需配置，默认开启一级缓存。</strong>

~~~java
/** 示例代码 **/
@Test
public void testFirstCache(){
    SqlSession sqlSession = MyBatisUtil.openSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    //同一个SqlSession 只会执行一次sql
    List<UserEntity> list = mapper.queryUsers();
    System.out.println("==================");
    List<UserEntity> list1 = mapper.queryUsers();
     //获取新的session 会执行新的sql查询
    SqlSession session = MyBatisUtil.getSession();
    UserMapper mapper1 = session.getMapper(UserMapper.class);
    List<UserEntity> list2 = mapper1.queryUsers();
}
~~~

### 12.2 二级缓存

> **SqlSessionFactory级别的缓存，同一个SqlSessionFactory构建的SqlSession发起的多次同构查询，会将数据保存在二级缓存。**

* <strong style="color:#2fa589">注意：在sqlSession.commit()或者sqlSession.close()之后生效。</strong>
* <strong style="color:#2fa589">原因在于：</strong>
  * <strong style="color:#2fa589">只有在sqlSession提交或关闭后，其所查询的数据才可认为式有效的，才应该存入二级缓存。</strong>

#### 12.2.1 开启全局缓存

> **< settings >是MyBatis中极为重要的调整配置，他们会改变MyBatis的默认行为，其他详细配置可以参考官方文档。**
>
> * <strong style="color:red">在sqlSession.commit()或者sqlSession.close()之后生效</strong>
>
> * <strong style="color:red">需要注意mybatis配置文件子标签的先后顺序，否则配置无效，报错，可以在configuration中查看定义顺序。</strong>
> * <strong style="color:red">二级缓存默认是开启的，但是不是所有的查询结果都会进入二级缓存，如果不在对应的Mapper文件中使用< cache />显式声明开启，则该Mapper不会开启二级缓存。</strong>

~~~xml
<!-- 示例代码 -->
<configuration>
	<properties .../>
    <!-- 注意书写位置 -->
    <settings>
        <!-- mybatis-config.xml中开启全局缓存（默认开启） -->
    	<setting name="cacheEnabled" value="true"></setting>
    </settings>
</configuration>
~~~

#### 12.2.2 指定Mapper缓存

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.rainbase.mapper.UserMapper">
    <!-- 声明本mapper开启二级缓存 -->
    <cache />
    <sql id="user_field">
        select id, username, password, gender, regist_time as registTime
    </sql>
    <select id="queryUserById" resultMap="user_resultMap">
        <include refid="user_field" />
        FROM user WHERE id = #{id}
    </select>
 	<!-- 其他sql语句... -->
</mapper>
~~~



~~~java
/** 示例代码 **/
public class UserDaoTest {
    UserMapper userMapper;

    @Before
    public void init(){
        userMapper=MyBatisUtil.getMapper(UserMapper.class);
    }
    
    /** 在开启二级缓存的情况下，只会执行一次sql查询操作 */
    @Test
    public void testFirstCache(){
        SqlSession sqlSession = MyBatisUtil.openSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
       
        List<UserEntity> list = mapper.queryUsers();
        System.out.println("==================");
        List<UserEntity> list1 = mapper.queryUsers();
        //二级缓存只有在commit或者close后才会生效
        sqlSession.close();

        SqlSession session = MyBatisUtil.getSession();
        UserMapper mapper1 = session.getMapper(UserMapper.class);
        List<UserEntity> list2 = mapper1.queryUsers();
    }
}
~~~

#### 12.2.3 缓存清空并重新缓存

> <strong style="color:red">缓存有效期：数据发生变化（增、删、改），必须删除缓存，MyBatis在这些情况下会自动执行清空操作。</strong>



## 十三、Druid连接池

### 13.1 概念

> **Druid式阿里巴巴开源平台上的一个项目，整体项目由数据库连接池、插件框架和SQL解析器组成。该项目主要是为了扩展JDBC的一些限制，可以让程序员实现一些特殊的需求，比如向密钥服务请求凭证、统计SQL信息、SQL性能收集、SQL注入检查、SQL翻译等，程序员可以通过定制来实现自己需要的功能。**

### 13.2 不同连接池的对比

> **测试执行申请归还连接 1000000(一百万)次总耗时性能对比。**

#### 13.2.1 测试环境

| 环境 |         版本          |
| :--: | :-------------------: |
|  OS  |      OS X 10.8.2      |
| CPU  | Intel i7 2GHz 4 Core  |
| JVM  | Java Version 1.7.0_05 |



#### 13.2.2 基准测试结果对比

|  JDBC-Conn Pool  | 1 Thread | 2 Thread | 5 Thread | 10 Thread | 20 Thread | 50 Thread |
| :--------------: | :------: | :------: | :------: | :-------: | :-------: | :-------: |
|      Druid       |   898    |   1191   |   1324   |   1362    |   1325    |   1459    |
|   tomcat-jdbc    |   1269   |   1378   |   2029   |   2103    |   1879    |   2025    |
|       DBCP       |   2324   |   5055   |   5446   |   5471    |   5524    |   5415    |
|      BoneCP      |   3738   |   3150   |   3194   |   5681    |   11018   |   23125   |
| jboss-datasource |   4377   |   2988   |   3680   |   3980    |   32708   |   37742   |
|       C3P0       |  10841   |  13637   |  10682   |   11055   |   14497   |   20351   |



#### 13.2.3 测试结论

* <strong style="color:#2fa589">Druid是性能最好的数据库连接池，tomcat-jdbc和druid性能相近。</strong>
* Proxool在激烈并发时会抛出异常，不适用。
* C3P0 和 Proxool都相当慢，影响sql执行效率
* BoneCP 性能并不优越，采用LinkedTransferQueue 并没有能够获得性能提升。
* 除了BoneCP，其他的在JDK7上跑的比JDK6上快。
* jboss-datasoruce虽然稳定，但性能很糟糕。

### 13.3 配置pom.xml

> 引入Druid依赖

~~~xml
<!-- druid依赖 -->
<dependency>
	<groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.16</version>
</dependency>
~~~



### 13.4 创建DruidDataSourceFactory

> **创建MyDruidDataSourceFactory继承PooledDataSourceFactory，并替换默认数据源。**

~~~java
/** 示例代码 **/
/**
 * 使用阿里Druid替换默认datasource
 */
public class MyDruidDataSourceFactory extends PooledDataSourceFactory {
    public MyDruidDataSourceFactory(){
        this.dataSource=new DruidDataSource();
    }
}
~~~



### 13.5 修改mybatis-config.xml

> **mybatis-config.xml中配置使用Druid连接池。**

~~~xml
<!-- 示例代码 -->
<!-- JDBC配置mybatis环境，选择默认值 -->
<environments default="rain_config">
    <!-- MySql配置 -->
    <environment id="rain_config">
        <!-- 配置事务管理器 -->
        <transactionManager type="JDBC"></transactionManager>
        <!-- 配置数据源 -->
        <dataSource type="com.rainbase.datasource.MyDruidDataSourceFactory">
            <property name="driverClass" value="${jdbc.driver}"/>
            <property name="jdbcUrl"     value="${jdbc.url}"/>
            <property name="username"    value="${jdbc.username}"/>
            <property name="password"    value="${jdbc.password}"/>
        </dataSource>
    </environment>
</environments>
~~~

* <strong style="color:#2fa589">注意：< property name="属性名" /> 属性名必须与com.alibaba.druid.pool.DruidAbstractDataSource中一致。 </strong>

## 十四、PageHelper分页插件

### 14.1 概念

> **PageHelper是适用于MyBatis框架的一个分页插件，使用方式极其便捷，支持任何复杂的单表、多表分页查询操作。**

### 14.2 访问与下载

> * 官方网站：https://pagehelper.github.io/
> * 下载地址：https://github.com/pagehelper/Mybatis-PageHelper

### 14.3 开发步骤

> **PageHelper中提供了多个分页操作的静态方法入口。**

#### 14.3.1 引入依赖

> **pom.xml文件中引入PageHelper依赖。**

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.10</version>
</dependency>
~~~



#### 14.3.2 配置mybatis-config.xml

> **在mybatis-config.xml中添加< plugins >。**

~~~xml
<!-- 示例代码 -->
<configuration>
    <!-- 其他配置 -->
	<typeAliases></typeAliases>
    <plugins>
        <!-- 添加pageHelper插件 -->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>
    <!-- 其他配置 -->
</configuration>
~~~



#### 14.3.3 PageHelper应用方式

> **使用PageHelper提供的静态方法设置分页查询条件。**

~~~java
/** 示例代码 **/
public class UserDaoTest {
    UserMapper userMapper;

    @Before
    public void init(){
        userMapper=MyBatisUtil.getMapper(UserMapper.class);
    }
    @Test
    public void testPageHelper(){
        //在查询前配置分页
        //PageHelper对其之后的第一个查询，进行分页功能的追加
        PageHelper.startPage(20, 5);
        List<UserEntity> userEntities = userMapper.queryUsers();
        System.out.println(userEntities);
    }
}
~~~

### 14.4 PageInfo对象

> **可以将查询结果封装到PageInfo对象中，以获得更详细的信息。**

|      方法名       | 返回值类型 |       描述        |
| :---------------: | :--------: | :---------------: |
|      pageNum      |    int     |      当前页       |
|     pageSize      |    int     |   每页数据数量    |
|       size        |    int     |   当前页数据数    |
|     startRow      |    int     |     起始行数      |
|      endRow       |    int     |     结束行数      |
|       pages       |    int     |      总页数       |
|      prePage      |    int     |    前一页页码     |
|     nextPage      |    int     |    后一页页码     |
|    isFirstPage    |  boolean   |     是否首页      |
|    isLastPage     |  boolean   |     是否尾页      |
|  hasPreviousPage  |  boolean   |   是否有前一页    |
|    hasNextPage    |  boolean   |   是否有后一页    |
|   navigatePages   |    int     |    导航页码数     |
| navigatepageNums  |   int[]    | 导航页集合(0,1,2) |
| navigateFirstPage |    int     |     首页页码      |
| navigateLastPage  |    int     |     尾页页码      |
|       total       |    long    |    数据总条数     |
|       list        |    List    |   数据List集合    |



#### 14.4.1 PageInfo应用方式

> **使用PageInfo保存分页查询结果。**

~~~java
/** 示例代码 **/
/** 示例代码 **/
public class UserDaoTest {
    UserMapper userMapper;

    @Before
    public void init(){
        userMapper=MyBatisUtil.getMapper(UserMapper.class);
    }
    @Test
    public void testPageHelper(){
        //在查询前配置分页
        //PageHelper对其之后的第一个查询，进行分页功能的追加
        PageHelper.startPage(20, 5);
        List<UserEntity> userEntities = userMapper.queryUsers();
        System.out.println(userEntities);
        //将查询结果封装到PageInfo对象中，信息更详细
        PageInfo<UserEntity> pageInfo=new PageInfo<>(userEntities);
        System.out.println(pageInfo);
    }
}
~~~



#### 14.4.2 注意事项

> * 只有在*PageHelper.startPage()*方法之后的<strong style="color:#2fa589">第一个查询会执行分页。</strong>
> * 分页插件<strong style="color:#2fa589">不支持带有“FOR UPDATE”</strong>的查询语句。
> * 分页插件<strong style="color:#2fa589">不支持“嵌套查询”</strong>，会导致结果集折叠。

#### 14.4.3 分页练习

> 使用Servlet + JSP + MyBatis + 分页插件，完成分页查询功能。

## 十五、补充【注解操作等】

### 15.1 MyBatis注解操作

> **通过在接口中直接添加MyBatis注解，完成CRUD。**

* <strong style="color:#2fa589">注意：接口注解定义完毕后，需要将接口全限定名注册到mybatis-config.xml的< mappers >中。</strong>
* <strong style="color:#2fa589">经验：注解模式属于硬编码到.java文件中，失去了使用配置文件修改的优势，可结合需求选用。</strong>

~~~xml
<!-- 示例代码 -->
<mappers>
    <!-- 接口全限定名 -->
	<mapper class="com.rainbase.mapper.UserMapper" />
</mappers>
~~~



#### 15.1.1 查询注解

> 简单查询：

~~~java
/** 示例代码 **/
public interface UserMapper{
    @Select("SELECT * from user where id=#{id}")
    UserEntity queryUserById(@Param("id")Integer id);
}
~~~

> 复杂查询：多表联合查询及结果集映射示例

~~~java
/** 示例代码 **/
@Repository
@Mapper
public interface UserMapper {
    /**
     * 根据用户id查询用户的基本信息
     * @param id 需要查询的用户id
     * @return 用户的基本信息
     */
    @Results(id = "userAll",value = {
            @Result(property = "id",column = "id",id = true),
            @Result(property = "username",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "mobile",column = "mobile"),
            @Result(property = "brief",column = "brief"),
            @Result(property = "gender",column = "gender"),
            @Result(property = "birthday",column = "birthday"),
            @Result(property = "location",column = "location",one = @One(select = "com.duochuang.mapper.LocationMapper.queryLocationById",fetchType = FetchType.EAGER)),
            @Result(property = "icon",column = "icon"),
            @Result(property = "background",column = "background"),
            @Result(property = "certification",column = "certification",one = @One(select = "com.duochuang.mapper.CertificationMapper.queryCertificationById",fetchType = FetchType.EAGER)),
            @Result(property = "registTime",column = "regist_time"),
            @Result(property = "lastChangeUsername",column = "last_change_username")
    })
    @Select(value = "select * from dc_user where id=#{id}")
    UserEntity queryUserById(@Param("id")String id);


    /**
     * 根据用户名查询用户基本信息
     * @param username 需要查询的用户名称
     * @return 用户基本信息
     */
    @ResultMap("userAll")
    @Select("select * from dc_user where username = #{username}")
    UserEntity findUserByUsername(@Param("username") String username);


    /**
     * 根据用户手机号码查询用户基本信息
     * @param mobile 需要查询的用户手机号码
     * @return 用户的基本信息
     */
    @ResultMap("userAll")
    @Select("select * from dc_user where mobile = #{mobile}")
    UserEntity findUserByMobile(@Param("mobile") String mobile);
}
~~~



#### 15.1.2 删除注解

~~~java
/** 示例代码 **/
public interface UserMapper{
    @Delete("DELETE from user where id=#{id}")
    Integer deleteUserById(@Param("id")Integer id);
}
~~~



#### 15.1.3 修改注解

~~~java
/** 示例代码 **/
public interface UserMapper{
    @Update("UPDATE user SET username=#{username} where id=#{id}")
    Integer updateUserById(UserEntity user);
}
~~~



#### 15.1.4 插入注解

~~~java
/** 示例代码 **/
public interface UserMapper{
    //主键回填
    @Options(useGeneratedKeys = true,keyProperty = "id")
    @Insert("INSERT INTO user (username, password) VALUES (#{usernmae}, #{password})")
    Integer updateUserById(UserEntity user);
}
~~~



### 15.2 *$*符号使用

> ${attribute}属于字符串拼接SQL，而非预编译占位符，会有注入攻击问题，不建议在常规SQL中使用，常用于解决动态升降序问题。

#### 15.2.1 *$*符号参数绑定

~~~java
/** 示例代码 **/
//${name} ${id}可获取user中的属性值
List<User> selectAllUsers1(User user);
//必须使用@Param，否则会作为属性解析
List<User> selectAllUsers1(@Param("rule") String rule);
~~~

~~~xml
<!-- 示例代码 -->
<!-- 拼接name和id，如果是字符类需要使用单引号包裹 -->
<select id="selectAllUser1" resultType="User">
    SELECT * FROM users
    WHERE name='${name}' OR id = ${id}
</select>
<!-- 拼接 asc | desc -->
<select id="selectAllUser1" resultType="User">
    SELECT * FROM users
    ORDER BY id ${rule}
</select>
~~~

~~~java
/** 示例代码 **/
//调用时传入user对象
List<User> users1 = userMapper.selectAllUser1(user);
//调用时传入asc|desc
List<User> users2 = userMapper.selectAllUser2("desc");
~~~

#### 15.2.2 *$*符号注入攻击

> 原因，使用${attribute}的时候，SQL语句不是预编译的，使用的是字符串拼接的形式，所以在传递参数的时候可能利用特殊值改变原SQL语句，导致结果不符合预期情况。
>
> 如传递参数："'xxx' OR '1'='1'"

#### 15.2.3 *$* 使用场景

> <strong style="color:red">注意：在需要对SQL语句片段进行动态修改的情况下，需要使用*${}*</strong>
>
> * #{}*占位符必须是与列相关的数据，不能动态改变原SQL语句
> * *${}*占位符可以是任意数据（列或者SQL片段），所以可以动态改变原SQL语句（如传递 ASC | DESC）



~~~xml
<!-- 拼接 asc | desc -->
<!-- 这种情况使用#{}会报错，#{}必须和列相关 -->
<select id="selectAllUser1" resultType="User">
    SELECT * FROM users
    ORDER BY id ${rule}
</select>
~~~

~~~java
/** 使用技巧 **/
//不允许用户直接传递sql拼接字段，而是传递依据，sql片段的拼接用户不可见，可以放置SQL注入攻击
@Test
public void test(){
	Boolean flag = true;
    if(flag){
        mapper.queryUsers("asc");
    }else{
        mapper.queryUsers("desc");
    }
}
~~~



### 15.3 MyBatis处理关联关系-嵌套查询

> 思路：查询部门信息时，级联查询所属员工信息。
>
> * DepartmentDao接口中定义selectDepartmentById()，并实现对应Mapper。
> * EmployeeDao接口中定义selectEmployeesByDeptId()，并实现Mapper。
> * 当selectDepartmentById被执行时，通过< collection >调用selectEmployeesByDeptId()方法，并传入条件参数。

#### 15.3.1 主表查询

> 接口代码：

~~~java
/** 示例代码 **/
public interface EmployeeMapper {
    /** 根据部门id查询员工 */
    List<Employee> queryEmployeesByDeptId(@Param("deptId") Integer deptId);
}
~~~

> Mapper文件代码：

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.rainbase.mapper.EmployeeMapper">

    <resultMap id="employeeMap" type="com.rainbase.common.entity.Employee">
        <id property="id" column="id"></id>
        <result property="name" column="name"></result>
        <result property="salary" column="salary"></result>
    </resultMap>

    <select id="queryEmployeesByDeptId" resultMap="employeeMap">
        select * from t_employees where dept_id=#{deptId}
    </select>
    
</mapper>
~~~



#### 15.3.2 级联调用

> 接口代码：

~~~java
/** 示例代码 **/
public interface DepartmentMapper {
    /** 根据部门id查询部门信息 */
    Department queryDepartmentById(@Param("id") Integer id);
}
~~~

> Mapper文件代码：

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE mapper PUBLIC
        "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.rainbase.mapper.DepartmentMapper">

    <resultMap id="departmentWithEmployee" type="com.rainbase.common.entity.Department">
        <id property="id" column="id" javaType="int"></id>
        <result property="name" column="name"></result>
        <result property="location" column="location"></result>
        <!-- 调用EmployeeMapper中的对应方法查询员工，填充到结果中 -->
        <collection property="employees" column="id" ofType="com.rainbase.common.entity.Employee" javaType="ArrayList" select="com.rainbase.mapper.EmployeeMapper.queryEmployeesByDeptId"></collection>
    </resultMap>

    <select id="queryDepartmentById" resultMap="departmentWithEmployee">
        select * from t_departments where id=#{id}
    </select>
    
</mapper>
~~~



#### 15.3.3 延迟加载

> <strong>mybatis-config.xml中配置延迟加载</strong>

~~~xml
<settings>
    <!-- 配置开启延迟加载（默认False） -->
	<setting name="lazyLoadingEnabled" value="true"></setting>
</settings>
~~~

* <strong style="color:#2fa589">注意：开启延迟加载后，如果不使用级联数据，则不会触发级联查询操作，有利于加快查询速度、节省内存资源。（没什么大用）</strong>