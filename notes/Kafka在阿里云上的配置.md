# Kafka在阿里云上的配置

> **Server.properties种配置**
>
> listeners=PLAINTEXT:// 内网的ip地址:端口
>
> advertised.listeners=PLAINTEXT://外网的ip的地址:端口
>
> advertised.host.name= 内网的ip地址
>
> zookeeper.connect=外网的IP地址和2181端口