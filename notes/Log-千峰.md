# LOG笔记

## 一、引言

### 1.1 日志介绍

> **用于记录系统中发生的各种事件。记录的位置常见的有：控制台、磁盘文件等**

### 1.2 日志级别

> **日志级别从低到高：**
>
> <strong style="color:#F36D00">TRACE、DEBUG、INFO、WARN、ERROR、FATAL</strong>
>
> * TRACE：不常用
> * DEBUG：开发、调试过程中常用
> * INFO：常规的日志级别，用于部署运行之后长期观测
> * WARN：提醒开发人员有隐患
> * ERROR：项目出错了
> * FATAL：错误非常严重，项目无法运行

### 1.3 日志作用

> * **通过日志观察、分析项目的运行情况（项目维护）**
> * **通过日志分析用户的使用情况（大数据分析）**
> * ...

##  二、第一种方案（Log4j）

### 2.1 Log4j+Commons-Logging

#### 2.1.1 导入依赖

> **在项目中添加*Log4j*和*Commons-Logging*依赖 **

~~~xml
<!-- 示例代码 -->
<!-- log4j依赖 -->
<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.17</version>
</dependency>
<!-- commons-logging依赖-->
<dependency>
	<groupId>commons-logging</groupId>
	<artifactId>commons-logging</artifactId>
	<version>1.2</version>
</dependency>
~~~



#### 2.1.2 基本使用

> **基本API示例：**

~~~java
/** 示例代码 **/
public class LogTest {
    //日志对象
    private Log log= LogFactory.getLog(LogTest.class);

    @Test
    public void testTrace(){
        log.trace("Hello trace~~~");
        log.debug("Hello debug~~~");
        log.info("Hello info~~~");
        log.warn("Hello warn~~~");
        log.error("hello error~~~");
        log.fatal("hello fatal~~~");
    }
}
~~~



#### 2.1.3 配置信息

> **定义配置文件： <strong style="color:#42b983">log4j.xml</strong>**

| 占位符 | 描述                                                         |
| :--------: | :----------------------------------------------------------- |
|   %p   | 输出优先级，即TRACE、DEBUG、INFO、WARN、ERROR、FATAL         |
|   %r   | 输出自应用启动到输出该log信息耗费的毫秒数                    |
|   %c   | 输出所在类的全名                                             |
|   %t   | 输出产生该日志事件的线程名                                   |
|   %n   | 输出一个回车换行符                                           |
|   %d   | 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyyy-MM-dd HH:mm:ss,SSS}，输出类似：2020-02-12 12:21:12,432 |
|   %l   | 输出日志事件的发生位置，包括类名、发生的线程，以及在代码中的行数。例：Testlo4.main(TestLog4.java:10) |
| %m | 日志消息、内容 |

~~~xml
<!-- log4j.xml配置示例 -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration PUBLIC "-//LOGGER"
        "http://org/apache/log4j/xml/log4j.dtd">
<log4j:configuration>

    <!--  ConsoleAppender 输出到控制台 -->
    <appender name="myConsole"  class="org.apache.log4j.ConsoleAppender">
        <!-- 输出格式 -->
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-d{yyyy-MM-dd HH:mm:ss,SSS} [%c]-[%p] %m%n"/>
        </layout>
    </appender>
 
    <!-- RollingFileAppender  输出到文件 -->
    <appender name="myFile1" class="org.apache.log4j.RollingFileAppender">
        <!-- 文件位置 -->
        <param name="File" value="d:/log/hello.log"/>
        <!-- 是否直接追加 -->
        <param name="Append" value="true"/>
        <!-- 文件最大字节数 -->
        <param name="MaxFileSize" value="1kb"/>
        <!-- 新文件数量 -->
        <param name="MaxBackupIndex" value="2"/>
        <!-- 输出格式 -->
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%p (%c:%l)- %m%n"/>
        </layout>
    </appender>

    <!--  DailyRollingFileAppender 每天，输出到文件 -->
    <appender name="myFile2" class="org.apache.log4j.DailyRollingFileAppender">
        <!-- 文件位置 -->
        <param name="File" value="d:/log/hello2.log"/>
        <!-- 是否直接追加 -->
        <param name="Append" value="true"/>
        <!-- 输出格式 -->
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-d{yyyy-MM-dd HH:mm:ss,SSS} [%c]-[%p] %m%n"/>
        </layout>
    </appender>
    <!-- 根Logger的设置 -->
    <!-- 只有在此引用的追加器才会生效 -->
    <root>
        <!-- 优先级设置，all < trace < debug < info < warn < error < fatal < off -->
        <priority value="debug"/>
        <appender-ref ref="myConsole"/>
        <appender-ref ref="myFile1"/>
        <appender-ref ref="myFile2"/>
    </root>
</log4j:configuration>
~~~



## 三、第二种方案（Logback）

### 3.1 Logback+SLF4j

#### 3.1.1 导入依赖

> **项目中导入依赖：**

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>ch.qos.logback</groupId>
	<artifactId>logback-classic</artifactId>
	<version>1.2.3</version>
</dependency>
~~~

#### 3.1.2 基本使用

> **Logback+SLF4j 基本API**

~~~java
/** 示例代码 **/
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogbackTest {
    private Logger logger= LoggerFactory.getLogger(LogbackTest.class);
    @Test
    public void testLogback(){
        System.out.println(logger.getClass());
        logger.trace("hello trace");
        logger.debug("hello debug");
        logger.info("hello info");
        logger.warn("hello warn");
        logger.error("hello error");
        //注意：此logger没有fatal()方法
    }
}
~~~



#### 3.1.3 配置信息

> **定义<strong style="color:#42b983">logback.xml</strong>文件：**

| 占位符 | 描述 |
| :---: | ---- |
| %d{yyyy-MM-dd HH:mm:ss.SSS} | 日期 |
| %5p | 日志级别，5位字符长度显示，如果内容占不满5位则内容右对齐并在左侧补空格 |
| %-5p | 日志级别，5位字符长度显示，如果内容占不满5位则内容左对齐并在右侧补空格 |
| %logger | 日志所在包和类 |
| %M | 日志所在方法名 |
| %L | 日志所在代码行数 |
| %m | 日志正文 |
| %n | 换行 |

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8" ?>
<!-- scan:当此属性设置为true时，配置文件如果发生变化，将会被重新加载，默认值为true -->
<!-- scanPeriod：设置检测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位时毫秒。当scan为true时，此属性生效。默认的时间间隔为一分钟 -->
<!-- debug：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false -->
<configuration scan="true" scanPeriod="60 seconds" debug="true">

    <!-- 定义变量，可通过 ${log.path} 和 ${CONSOLE_LOG_PATTERN} 得到变量值 -->
    <property name="log.path" value="d:/log"/>
    <property name="CONSOLE_LOG_PATTERN"
              value="%d{yyyy-MM-dd HH:mm:ss.SSS} |-[%-5p] in %logger.%M[line-%L] -%m%n"/>

    <!-- 输出到控制台 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!-- Threshold=即最低日志级别，此appender输出大于等于对应级别的日志
            （当然还要满足root中定义的最低级别）
         -->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
        <encoder>
            <!-- 日志格式（引用变量） -->
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 追加到文件中 -->
    <appender name="file1" class="ch.qos.logback.core.FileAppender">
        <file>${log.path}/logback_log.log</file>
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 滚动追加到文件中 -->
    <appender name="file2" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/logback_log2.log</file>
        <!-- 日志文件输出格式 -->
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录
             文件超过最大尺寸后，会新建文件，然后新的日志文件中继续写入
             如果日期变更，也会新建文件，然后在新的日志文件中写入当天日志
        -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 新建文件后，原日志文件改名为如下 %i=文件序号，从0开始 -->
            <fileNamePattern>${log.path}/logback_log_%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!-- 每个日志文件的最大体量 -->
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>8kb</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!-- 日志文件保留参数，1=只保留昨天的归档日志文件，不设置则保留所有日志 -->
            <maxHistory>1</maxHistory>
        </rollingPolicy>
    </appender>

    <root level="trace">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="file1"/>
        <appender-ref ref="file2"/>
    </root>
</configuration>
~~~

