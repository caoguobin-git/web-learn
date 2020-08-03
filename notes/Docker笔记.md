## Docker使用笔记

### 1. Docker 是什么

### 2. Docker安装

### 3. Docker镜像

​	3.1 查看docker镜像： docker images

​	3.2 拉取docker镜像：docker pull tomcat:9-jre8

### 4. Docker容器

​	4.1 创建并启动容器：

​		docker run -p 8080:8080 tomcat

​		docker run -p 9090:8080 --name tomcat-test -itd --rm tomcat:9-jre8

​	4.2 查看所有容器：docker ps -a -p

​	4.3 停止容器：docker stop [容器id]

​	4.4 启动容器： docker start [容器id]

​	4.5 删除容器： docker rm [容器id]

​	4.6 进入容器： docker exec -it [容器id] /bin/bash

### 5. 利用Dockerfile制作镜像

~~~
docker build -t <镜像名称>[:镜像tag] .
~~~

​	5.1 **FROM**

​	5.2 **RUN**

​	5.3 **清理无用文件**

### 6. 数据卷





```bash
$ sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```

