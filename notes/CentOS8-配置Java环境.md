# CentOS8 配置Java环境

>  **Step1**. download JDK

> **Step2**. unzip the tar.gz file
> input command "tar -zvxf jdk-9.0.4_linux-x64_bin.tar.gz"in terminal

> **Step3**. make a directory named java under /usr/local
> input command "mkdir /usr/local/java"in terminal

> **Step4**. copy the extracted directory to /usr/local/java
> input command"cp -r jdk-9.0.4 /usr/local/java"in terminal

> **Step5**. add something to the file named profile
> 		input command"vim /etc/profile"in terminal
> 		add the content underneath at the end of file:
>
> ~~~yaml
> #Java
> export JAVA_HOME=/usr/local/java/jdk-9.0.4
> export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
> export PATH=$PATH:$JAVA_HOME/bin
> ~~~

**Step6**. make changes effective
input command"source /etc/profile" in order to make changes effecitve.