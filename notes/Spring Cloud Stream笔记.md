# Spring Cloud Stream 笔记

[TOC]

## 一、概述

## 二、基于Kafka的构建

> <strong style="color:#42b983">传递对象时，生产者和消费者需要有对应的实体类进行序列化和反序列化，可以考虑将公共参数提取到一个common.jar中，减少代码重复和错误！！！</strong>
>
> **在实际应用中，生产者和消费者可以存在一个模块中，即同时具有两个角色，实现异步的操作或者其他功能。**

> **operation类示例代码：**

~~~java
/** 示例代码 **/
public class UserOperation {
    //此处操作应该通过Enum类型进行枚举，防止出错
    private String operation= "save";
    private UserEntity userEntity;
    //Getters And Setters
}
~~~

> **UserEntity示例代码：**

~~~java
/** 示例代码 **/
public class UserEntity {
    private String username;
    private String password;
    //Getters And Setters
}
~~~



### 2.1 生产者实现流程

#### 2.1.1 添加依赖

> pom.xml种添加对应依赖

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-stream-kafka</artifactId>
</dependency>
~~~



#### 2.1.2 配置文件

> application.yml文件

~~~yaml
#示例代码
server:
  port: 16543
spring:
  application:
    name: stream-provider
  cloud:
    stream:
      bindings:
        orderOut:
          destination: order-demo
          content-type: text/plain
        videoOut:
          destination: video-demo
          content-type: text/plain
        userOut:
          destination: user-demo
          content-type: application/json
      kafka:
        binder:
          brokers: 111.190.156.52:10888
          zk-nodes: 111.190.156.52:2181
~~~



#### 2.2.3 定义消息处理（粘合）接口

> **此接口用于和配置文件中定义的输入和输出操作相绑定**
>
> * **生产者使用@Out("<队列名称>")获取MessageChannel进行输出操作**
> * **消费者使用@Input("<队列名称>")获取SubscribableChannel进行输入操作**

~~~java
/** 示例代码 **/
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface MyMessageSender {
    String ORDER_SENDER_NAME = "orderOut";
    String VIDEO_SENDER_NAME = "videoOut";
    String USER_SENDER_NAME = "userOut";

    @Output(ORDER_SENDER_NAME)
    MessageChannel orderOut();

    @Output(ORDER_SENDER_NAME)
    MessageChannel videoOUt();

    @Output(USER_SENDER_NAME)
    MessageChannel userOut();
}

~~~



#### 2.2.4 定义业务处理类

> **采用自动装配进行接口代理类的调用：**

~~~java
/** 示例代码 **/
import com.rainbase.common.operation.UserOperation;
import com.rainbase.messagetopic.MyMessageSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.integration.support.MessageBuilder;

/**
 *
 */
@EnableBinding(MyMessageSender.class)
public class SendService {
    @Autowired
    private MyMessageSender sender;

    public void sendOrderMessage(String msg){
        sender.orderOut().send(MessageBuilder.withPayload(msg).build());
    }

    public void sendVideoMessage(String msg){
        sender.videoOUt().send(MessageBuilder.withPayload(msg).build());
    }

    public void sendUserMessage(UserOperation userOperation){
        sender.userOut().send(MessageBuilder.withPayload(userOperation).build());
    }
}
~~~



#### 2.2.5 业务逻辑实现

> **使用自动装配对消息发送接口进行调用即可**

~~~java
/** 示例代码 **/
@RestController
@RequestMapping(value = "/produce")
public class ProducerController {

    @Autowired
    private SendService sendService;

    @RequestMapping("/send/{msg}")
    public void send(@PathVariable("msg") String msg) {
        sendService.sendOrderMessage("order创建了： " + msg);
        sendService.sendVideoMessage("video创建了：" + msg);
        UserEntity userEntity=new UserEntity("usertest",msg);
        UserOperation operation=new UserOperation("save", userEntity);
        sendService.sendUserMessage(operation);
    }
}
~~~



### 2.2 消费者实现流程

#### 2.2.1 添加依赖

> **pom.xml中添加对应依赖**

~~~xml
<!-- 示例代码 -->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-stream-kafka</artifactId>
</dependency>
~~~



#### 2.2.2 配置文件

> **application.yml配置**

~~~yaml
#示例代码
server:
  port: 16544
spring:
  application:
    name: stream-consumer
  cloud:
    stream:
      bindings:
        orderInput:
          destination: order-demo
          content-type: text/plain
        videoInput:
          destination: video-demo
          content-type: text/plain
        userInput:
          destination: user-demo
          content-type: application/json
      kafka:
        binder:
          brokers: 111.190.156.52:10888
          zk-nodes: 111.190.156.52:2181
~~~



#### 2.2.3 定义消息处理（粘合）接口

> **此接口用于和配置文件中定义的输入和输出操作相绑定**
>
> * **生产者使用@Out("<队列名称>")获取MessageChannel进行输出操作**
> * **消费者使用@Input("<队列名称>")获取SubscribableChannel进行输入操作**

~~~java
/** 示例代码 **/
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface MessageReceiveInput {
    String VIDEO_INPUT_TOPIC="videoInput";
    String ORDER_INPUT_TOPIC="orderInput";
    String USER_INPUT_TOPIC="userInput";

    @Input(VIDEO_INPUT_TOPIC)
    SubscribableChannel getVideoChannel();

    @Input(ORDER_INPUT_TOPIC)
    SubscribableChannel getOrderChannel();

    @Input(USER_INPUT_TOPIC)
    SubscribableChannel getUserChannel();
}

~~~



#### 2.2.4 定义业务处理类

> **使用@StreamListener进行监听对应的队列消费消息**
>
> * **String、Integer类型的数据直接使用即可**
> * **实体类可以使用相应的类进行接收，框架进行了自动序列化和反序列化的操作**
> * **根据消息处理方法进行相应的处理，可以考虑采用策略模式进行**

~~~java
/** 示例代码 **/
import com.rainbase.common.operation.UserOperation;
import com.rainbase.messagetopic.MessageReceiveInput;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;

@EnableBinding(MessageReceiveInput.class)
public class MessageInputService {

    @StreamListener(MessageReceiveInput.ORDER_INPUT_TOPIC)
    public void getOrderMsg(Object msg){
        System.out.println(msg);
    }

    @StreamListener(MessageReceiveInput.VIDEO_INPUT_TOPIC)
    public void getVideoMsg(Object msg){
        System.out.println(msg);
    }

    @StreamListener(MessageReceiveInput.USER_INPUT_TOPIC)
    public void getUserMsg(UserOperation userOperation){
        //根据operation类别进行对应的处理即可
        System.out.println(userOperation);
    }
}
~~~



#### 2.2.5 业务逻辑实现

> **在2.2.4 中定义的业务处理类在接收具体的消息后，可以根据对应类型或参数，进行具体的业务处理**



### 2.3 Group分组消息

> TODO

### 2.4 消息分片

> TODO 





## 三、基于RabbitMQ的构建

> **基于RabbitMQ构建只需在配置文件中修改对应代码即可？**

