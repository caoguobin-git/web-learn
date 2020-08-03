# Eureka笔记

### 一、Eureka Server（服务注册中心）搭建流程

1. pom.xml文件配置

   ~~~ yaml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
   </dependency>
   ~~~

2. application.yml文件配置

   ~~~yml
   server:
     port: 8080
   eureka:
     instance:
     	hostname: localhost
     client:
     	register-with-eureka: false
     	fetch-registry: false
     	service-url: 
     	  defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
   ~~~

   

3. 启动类上加上<font style='color:red;font-weight:bolder'>@EnableEurekaServer</font>注解

4. <a style='color:red;font-weight:bolder' href='http://www.baidu.com'>Hello World</a>

5. 

### 二、Eureka Client（服务提供者）搭建流程

### 其他

#### 注意事项：Spring Cloud Gateway整合Eureka时依赖中不可以引入eureka-server，否则会报错，应当引入eureka-client



