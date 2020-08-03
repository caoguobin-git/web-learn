# Spring Cloud 技术栈总览

1. **服务治理：** 这是Spring Cloud的核心。目前Spring Cloud主要通过整合Netflix的相关产品来实现这方面的功能（Spring Cloud Netflix），包括用于服务注册和发现的Eureka，调用断路器Hystrix，调用端负载均衡Ribbon，REST客户端Feigh，智能服务路由Zuul，用于监控数据手机和展示的Spectator、Servo、Atlas，用于配置读取的Archaius和提供Controller层Reactive封装的RxJava。
2. **配置中心：** 基于Spring Cloud Netflix和Spring Cloud Bus，Spring又提供了Spring Cloud Config，实现配置击重管理、动态刷新的配置中心概念。配置通过Git或简单文件来存储，支持加/解密。
3. **消息组件：** Spring Cloud Stream对分布式消息的各种需求进行了抽象，包括发布订阅、分组消费、消息分片等功能，实现了微服务之间的异步通信。Spring Cloud Stream 也集成了第三方的RabbitMQ和Apache Kafka作为消息队列的实现。而Spring Cloud Bus基于Spring Cloud Stream，主要提供了服务间的事件通信（比如刷新配置）。
4. **分布式链路追踪：** Spring Cloud Sleuth提供了全自动、可配置的数据埋点，以收集微服务调用链路上的性能数据，并发送给Zipkin进行存储、统计和展示。
5. **安全控制：** Spring Cloud Security基于OAuth2整个开放网络的安全标准，提供了微服务环境下的单点登录、资源授权、令牌管理等功能。
6. **数据处理：** Spring Cloud Task、Spring Cloud Batch。