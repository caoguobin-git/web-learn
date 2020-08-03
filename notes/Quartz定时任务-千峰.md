# Quartz笔记

[TOC]

## 一、引言

### 1.1 简介

> **Quartz: http://www.quartz-scheduler.org**
>
> **是一个<strong style="color:#47B391">定时任务调度框架。</strong>比如遇到这样的问题：**
>
> * **想在30分钟后，查看订单支付状态，未支付则取消订单。**
> * **想在每月29号，信用卡自动还款。**
> * ...
> * **想定时在某个时间，去做某件事（任务）。**

> **Quartz是要做定时任务的调度，设置好触发时间规则，以及相应的任务（Job）即可。**

## 二、Quartz使用

### 2.1 导入依赖

~~~xml
<!-- 示例代码 -->
<dependencies>
    <!-- Quartz任务调度 -->
    <dependency>
        <groupId>org.quartz-scheduler</groupId>
        <artifactId>quartz</artifactId>
        <version>2.2.3</version>
    </dependency>
</dependencies>
~~~

### 2.2 定义Job

~~~java
/** 示例代码 **/
/**
 * 工作类的具体实现，即需要定时执行的“某件事”
 */
public class HelloJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        //获取Job详情
        JobDetail jobDetail = context.getJobDetail();
        //获取Job名称
        JobKey key = jobDetail.getKey();
        //获取任务名
        String name = key.getName();
        //获取任务组
        String group = key.getGroup();
        System.out.println("name: "+name+"  group:"+group);
        System.out.println("hello world   "+ LocalTime.now().toString());
    }
}
 
~~~

### 2.3 API测试

~~~java
/** 示例代码 **/
public class HelloQuartz {
    public static void main(String[] args) throws SchedulerException {
        try {
            //quartz API
            //1.构建调度器对象Scheduler
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
            //2.设置触发器Trigger：
            SimpleTrigger trigger = TriggerBuilder.newTrigger()
                    //定义name/group
                    .withIdentity("trigger1", "group1")
                    //一旦加入scheduler，立即生效，即开始计时
                    .startNow()
                    .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                                    //每隔1秒执行一次
                                    .withIntervalInSeconds(1)
                                    //设置最多执行次数
                                    .withRepeatCount(5)
                                    //设置一直执行
                                    //.repeatForever()
                    )
                    //设置结束时间
                    .endAt(new GregorianCalendar(2020, 7, 11, 22, 22, 22).getTime())
                    .build();
            //3.设置JobDetail
            //定义Job类未HelloJob类，这是真正的执行逻辑所在
            JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
                    //定义name/group
                    .withIdentity("job1", "group1").build();
            //4.将JobDetail和触发器增加到调度器中
            scheduler.scheduleJob(jobDetail, trigger);
            //5.调度器开始工作
            scheduler.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
~~~

### 2.4 配置

> **quartz配置文件配置**

~~~properties
#名为：quartz.properties,放置在classpath下，如果没有此配置则按默认配置启动
#指定调度器名称，非实现类
org.quartz.scheduler.instanceName = DefaultQuartzScheduler
#指定线程池实现类
org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
#线程池线程数量
org.quartz.threadPool.threadCount = 10
#优先级，默认5
org.quartz.threadPool.threadPriority = 5
#非持久化job
org.quartz.jobStore.class = org.quartz.simp.RAMJobStore
~~~

### 2.5 核心类说明

> * **Scheduler:调度器。所有的任务都由它控制，是Quartz的大脑，素有任务都由它来管理**
>
> * **Job：任务，想定时执行的任务（定义核心业务逻辑）**
> *  **JobDetail：基于Job，进一步包装。其中关联一个Job，并为Job指定更详细的属性，比如标识等**
> * **Trigger：触发器。可以指定给某个任务，指定任务的触发机制**
>

## 三、Trigger

### 3.1 SimpleTrigger

> **以一定的时间间隔（单位是毫秒）执行的任务。**
>
> * 指定起始和截止时间（时间段）
> * 指定时间间隔、执行次数

> **代码示例**

~~~java
/** 示例代码 **/
SimpleTrigger build = TriggerBuilder.newTrigger()
        .withIdentity("trigge2", "group2")
        .startNow()
        .withSchedule(
                 SimpleScheduleBuilder.simpleSchedule()
                        //每秒执行一次
                        .withIntervalInSeconds(1)
                        //不限制执行次数
                        //.repeatForever()
    					//设置执行三次
    					.withRepeatCount(3)
        )
        .endAt(new GregorianCalendar(2020, 10, 10, 12, 12, 12).getTime())
        .build();
~~~

### 3.2 CronTrigger【重点】

> **适用于更复杂的任务，它支持类型于Linux Cron的语法（并且更强大）**
>
> * **指定Cron表达式即可**
> * 在线生成地址：**https://www.bejson.com/othertools/cron**

> **示例代码：**

~~~java
/** 每天10：00-12：00，每隔两分钟执行一次 **/
CronTrigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("n1", "g1")
                    .withSchedule(CronScheduleBuilder.cronSchedule("0 0/2 10-12 * * ?"))
                    .build();
~~~



#### 3.2.1 Cron表达式组成

> **表达式组成："秒 分 时 日 月 星期几 [年]"，其中"年"是可选的，一般不指定。**
>
> * **如："10 20 18 3 5 ?" 代表"5月3日18点20分10秒，星期几不确定"**

| 位置 |    时间域    |                       允许值                        |    特殊值     |
| :--: | :----------: | :-------------------------------------------------: | :-----------: |
|  1   |      秒      |                        0-59                         |    , - * /    |
|  2   |      分      |                        0-59                         |    , - * /    |
|  3   |      时      |                        0-23                         |    , - * /    |
|  4   |      日      |                        1-31                         | , - * ? / L W |
|  5   |     月2      |                        1-13                         |    , - * /    |
|  6   |     星期     | 1-7（1为周日）<br>MON、TUE、WEN、THR、FRI、SAT、SUN | , - * ? / L # |
|  7   | 年份【可选】 |                                                     |    , - * -    |

#### 3.2.2 表达式符号

> **表达式中可使用的特殊符号的含义如下：**

|   符号    | 语义                                                         |
| :-------: | ------------------------------------------------------------ |
|  *(星号)  | <strong style="color:blue">表示匹配该域的任意值。</strong>假如在Minutes域使用*，即表示每分钟都会触发事件。 |
|  ?(问号)  | <strong style="color:blue">只能用在DayofMonth和DayofWeek两个域。它也匹配域的任意值，但实际不会。</strong>因为DayofMonth和DayofWeek会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法：13 13 15 20 * ？，其中最后一位只能用？，而不能使用 \*，如果使用\*，如果使用\*表示不管星期几都会触发，实际上并不是这样。 |
| -（横线） | <strong style="color:blue">表示范围。</strong>例如在Minutes域使用5-20，表示从5分到20分每分钟执行一次。 |
| /（斜线） | <strong style="color:blue">表示起始事件开始触发，然后每隔固定时间触发一次。</strong>例如在Minutes域使用5/20，则意味着5分钟触发一次，而25，45等分别触发一次。 |
| ，(逗号)  | <strong style="color:blue">表示列出枚举值。</strong>例如：在Minutes域使用5，20，则意味着在5分和20分各触发一次。 |
|     L     | <strong style="color:blue">表示最后，只能出现在DayofWeek和DayofMonth域。</strong>如果在DayofWeek域使用5L,意味着在最后的一个星期四触发。 |
|     W     | <strong style="color:blue">表示有效工作日(周一到周五),只能出现在DayofMonth域，系统将在离指定日期的最近的有效工作日触发事件。</strong>例如：在 DayofMonth使用5W，如果5日是星期六，则将在最近的工作日：星期五，即4日触发。如果5日是星期天，则在6日(周一)触发；如果5日在星期一到星期五中的一天，则就在5日触发。另外一点，W的最近寻找不会跨过月份 。 |
|    LW     | <strong style="color:blue">这两个字符可以连用，表示在某个月最后一个工作日，即最后一个星期五。</strong> |
|  #(井号)  | <strong style="color:blue">用于确定每个月第几个星期几，只能出现在DayofWeek域。</strong>例如4#2，表示某月的第二个星期三。 |

#### 3.2.3 表达式示例

> *      (1）**0/20 \* \* \* \* ?**  表示每20秒 调整任务
>*    （2）**0 0 2 1 \* ?**  表示在每月的1日的凌晨2点调整任务
> *    （3）**0 15 10 ? \* MON-FRI**  表示周一到周五每天上午10:15执行作业
>*    （4）**0 15 10 ? 6L 2002-2006**  表示2002-2006年的每个月的最后一个星期五上午10:15执行作
> *    （5）**0 0 10,14,16 \* \* ?**  每天上午10点，下午2点，4点 
>*    （6）**0 0/30 9-17 \* \* ?**  朝九晚五工作时间内每半小时 
> *    （7）**0 0 12 ? \* WED**   表示每个星期三中午12点 
>*    （8）**0 0 12 \* \* ?**  每天中午12点触发 
> *    （9）**0 15 10 ? \* \***   每天上午10:15触发 
>*    （10）**0 15 10 \* \* ?**   每天上午10:15触发 
> *    （11）**0 15 10 \* \* ? \***   每天上午10:15触发 
>*    （12）**0 15 10 \* \* ? 2005**   2005年的每天上午10:15触发 
> *    （13）**0 \* 14 \* \* ?**   在每天下午2点到下午2:59期间的每1分钟触发 
>*    （14）**0 0/5 14 \* \* ?**   在每天下午2点到下午2:55期间的每5分钟触发 
> *    （15）**0 0/5 14,18 \* \* ?**   在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发 
>*    （16）**0 0-5 14 \* \* ?**   在每天下午2点到下午2:05期间的每1分钟触发 
> *    （17）**0 10,44 14 ? 3 WED**   每年三月的星期三的下午2:10和2:44触发 
>*    （18）**0 15 10 ? \* MON-FRI**   周一至周五的上午10:15触发 
> *    （19）**0 15 10 15 \* ?**   每月15日上午10:15触发 
>*    （20）**0 15 10 L \* ?**   每月最后一日的上午10:15触发 
> *    （21）**0 15 10 ? \* 6L**   每月的最后一个星期五上午10:15触发 
>*    （22）**0 15 10 ? \* 6L 2002-2005**  2002年至2005年的每月的最后一个星期五上午10:15触发 
> *　　（23）**0 15 10 ? \* 6#3**  每月的第三个星期五上午10:15触发

> **注意事项：**
>
> **有些子表达式能包含一些范围或列表**
>
> 　　例如：子表达式（天（星期））可以为 “MON-FRI”，“MON，WED，FRI”，“MON-WED,SAT”
>
> “*”字符代表所有可能的值
>
> 　　因此，“*”在子表达式（月）里表示每个月的含义，“*”在子表达式（天（星期））表示星期的每一天。
>
> 　　“/”字符用来指定数值的增量 
> 　　例如：在子表达式（分钟）里的“0/15”表示从第0分钟开始，每15分钟 
> 在子表达式（分钟）里的“3/20”表示从第3分钟开始，每20分钟（它和“3，23，43”）的含义一样
>
> 　　“？”字符仅被用于天（月）和天（星期）两个子表达式，表示不指定值 
> 　　当2个子表达式其中之一被指定了值以后，为了避免冲突，需要将另一个子表达式的值设为“？”
>
> 　　“L” 字符仅被用于天（月）和天（星期）两个子表达式，它是单词“last”的缩写 
> 　　但是它在两个子表达式里的含义是不同的。 
> 　　在天（月）子表达式中，“L”表示一个月的最后一天 
> 　　在天（星期）自表达式中，“L”表示一个星期的最后一天，也就是SAT
>
> 　　如果在“L”前有具体的内容，它就具有其他的含义了
>
> 　　例如：“6L”表示这个月的倒数第６天，“FRIL”表示这个月的最一个星期五 
> 　　注意：在使用“L”参数时，不要指定列表或范围，因为这会导致问题

## 四、Spring整合Quartz【重点】

### 4.1 导入依赖

~~~xml
<!-- 示例代码 -->
<properties>
	<maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <springframework.version>5.2.6.RELEASE</springframework.version>
    <quartz.version>2.2.3</quartz.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-support</artifactId>
        <version>${springframework.version}</version>
    </dependency>
    
    <dependency>
        <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>${springframework.version}</version>
        </dependency>
    
    <!-- Quartz任务调度 -->
    <dependency>
        <groupId>org.quartz-scheduler</groupId>
        <artifactId>quartz</artifactId>
        <version>${quartz.version}</version>
    </dependency>
</dependencies>
~~~

### 4.2 定义Job类

> **定义一个Job类**

~~~java
/** 示例代码 **/
public class MyJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        System.out.println("job 执行了。。。");
        System.out.println(new Date());
    }
}
~~~

### 4.3 配置文件

> **调度器：**<strong style="color:#F36D00">SchedulerFactoryBean</strong>
>
> **触发器：**<strong style="color:#F36D00">CronTriggerFactoryBean</strong>
>
> **JobDetail：**<strong style="color:#F36D00">JobDetailFactoryBean</strong>

> **示例代码**

~~~xml
<!-- 示例代码 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--
        Spring整合Quartz进行配置遵循下面的步骤：
        1.定义工作任务的Job
        2.定义触发器Trigger，并将触发器与工作任务绑定
        3.定义调度器，并将Trigger注册到Scheduler
    -->
    <!-- 1.定义任务的bean，这里使用JobDetailFactoryBean，也可以使用MethodInvokingJobDetailFactoryBean，配置类似-->
    <bean name="lxJob" class="org.springframework.scheduling.quartz.JobDetailFactoryBean">
        <!-- 指定job的名称 -->
        <property name="name" value="job1"/>
        <!-- 指定job分组 -->
        <property name="group" value="job_group1"/>
        <!-- 指定具体的job类 -->
        <property name="jobClass" value="com.rainbase.quartz.MyJob"/>
    </bean>

    <!-- 2.定义触发器的bean，定义一个Cron的Trigger，一个触发器只能和一个任务进行绑定 -->
    <bean id="cronTrigger" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
        <!-- 指定Trigger的名称 -->
        <property name="name" value="trigger1"/>
        <!-- 指定Trigger的group -->
        <property name="group" value="trigger_group1"/>
        <!-- 指定Trigger的绑定的JobDetail -->
        <property name="jobDetail" ref="lxJob"/>
        <!-- 指定Cron的表达式，当前是每隔5s执行一次 -->
        <property name="cronExpression" value="0/5 * * * * ?"/>
    </bean>

    <!-- 3.定义调度器，并将Trigger注册到调度器中 -->
    <bean id="scheduler" class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="triggers">
            <list>
                <ref bean="cronTrigger"/>
            </list>
        </property>
        <!-- 添加quartz配置，如下两种方式均可 -->
<!--        <property name="configLocation" value="classpath:quartz.properties"></property>-->
        <property name="quartzProperties">
            <value>
                #指定调度器名称，非实现类
                org.quartz.scheduler.instanceName = DefaultQuartzScheduler
                #指定线程池实现类
                org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
                #线程池线程数量
                org.quartz.threadPool.threadCount = 10
                #优先级，默认5
                org.quartz.threadPool.threadPriority = 5
                #非持久化job
                org.quartz.jobStore.class = org.quartz.simpl.RAMJobStore
            </value>
        </property>
    </bean>
</beans>
~~~

### 4.4 操作

#### 4.4.1 启动任务

> 工厂启动，调度器启动，任务调度开始

~~~java
/** 示例代码 **/
public class QuartzTest {
    public static void main(String[] args) {
        //工厂启动，任务启动，工厂关闭，任务停止
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring-context.xml");
    }
}
~~~

#### 4.4.2 任务操作

##### 4.4.2.1 删除任务

> **任务的删除操作，根据任务名和group名删除。**

~~~java
/** 示例代码 **/
public class QuartzTest {
    public static void main(String[] args) throws SchedulerException, InterruptedException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring-context.xml");
        StdScheduler scheduler = (StdScheduler) context.getBean("scheduler");
        System.out.println(scheduler.getClass());
        Thread.sleep(5000);
        scheduler.deleteJob(JobKey.jobKey("job1","job_group1"));
        System.out.println("任务被删除了");
    }
}
~~~

##### 4.4.2.2 任务暂停/恢复

> **任务的暂停/恢复操作**

~~~java
/** 示例代码 **/
public class QuartzTest {
    public static void main(String[] args) throws SchedulerException, InterruptedException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring-context.xml");
        StdScheduler scheduler = (StdScheduler) context.getBean("scheduler");
        System.out.println(scheduler.getClass());
        Thread.sleep(5000);
        //暂停Job
        scheduler.pauseJob(JobKey.jobKey("job1","job_group1"));
        Thread.sleep(3000);
        //恢复Job
        scheduler.resumeJob(JobKey.jobKey("job1","job_group1"));
        //恢复所有
        //scheduler.resumeAll();
    }
}
~~~



##### 4.4.2.3 批量操作

> **实现任务的批量操作**

~~~java
/** 示例代码**/
public class QuartzTest {
    public static void main(String[] args) throws SchedulerException, InterruptedException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring-context.xml");
        StdScheduler scheduler = (StdScheduler) context.getBean("scheduler");
        System.out.println(scheduler.getClass());
        Thread.sleep(5000);
        GroupMatcher<JobKey> group1 = GroupMatcher.groupEquals("job_group1");
        //根据group名称暂停
        scheduler.pauseJobs(group1);
        Thread.sleep(3000);
        //根据group名称恢复
        scheduler.resumeJobs(group1);
    }
}
~~~

##### 4.4.2.4 任务添加

> **向当前调度器中添加一个任务**

~~~java
/** 示例代码 **/
？？？
~~~

