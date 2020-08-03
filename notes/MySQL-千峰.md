# MySQL笔记

[TOC]

## 一、引言

### 1.1 现有的数据存储方式有那些？

> * Java程序存储数据（变量、对象、数组、集合），数据保存在内存中，属于瞬时状态存储。
> * 文件（File）存储数据，保存在硬盘上，属于持久状态存储。

### 1.2 以上存储方式存在哪些缺点？

> * 没有数据类型的区分。
> * 存储数据量级较小。
> * 没有访问安全机制。
> * 没有备份、恢复机制。

## 二、数据库

### 2.1 概念

> ​	  数据库是“按照数据结构来组织、<strong style="color:#2C9D79">存储和管理数据的仓库。</strong>是一个长期存储在计算机内的、有组织的、共享的、统一管理的数据集合。”

### 2.2 数据库的分类

> * 网状结构数据库：美国通用电气公司IDS（Integrated Data Store），以节点形式存储和访问。
> * 层次结构数据库：IBM公司的IMS（Information Management System）定向有序的树状结构实现存储和访问。
> * 关系结构数据库：Oracle、DB2、MySQL、SQL Server，以表格（Table）存储，多表间建立关联关系，通过分类、合并、连接、选取等运算实现访问。
> * 非关系型数据库：ElasticSearch、MongoDB、Redis，多数使用哈希表，表中以键值（key-value）的方式实现特定的键和一个指针指向的特定数据。

## 三、数据库管理系统

### 3.1 概念

> ​	  <strong style="color:#2C9D79">数据库管理系统</strong>（Database Management System，DBMS）：指一种操作和管理数据库的大型软件，用于建立、使用和维护数据库，对数据库进行统一管理和控制，以保证数据库的安全性和完整性。用户通过数据库管理系统访问数据库中的数据。

### 3.2 常见数据库管理系统

> * Oracle：被认为是业界目前比较成功的关系型数据库管理系统。Oracle数据库可以运行在UNIX、Windows等主流操作系统平台，完全支持所有的工业标准，并获得最高级别的ISO标准安全性认证。
> * DB2：IBM公司的产品，BD2数据库系统采用多线程多线索体系结构，其功能足以满足大中公司的需要，并可灵活地服务于中小型电子商务解决方案。
> * SQL Server：Microsoft公司推出的关系型数据库管理系统。句有使用方便可伸缩性好与相关软件集成程度高等优点。
> * SQLLite：应用在手机端的数据库。
> * MySQL：最流行的关系型数据库管理系统之一。

## 四、MySQL

### 4.1 简介

> ​	  MySQL是一个<strong style="color:#2C9D79">关系型数据库管理系统</strong>，由瑞典MySQL AB公司开发，属于Oracle旗下产品。MySQL是最流行的关系型数据库管理系统之一，在WEB应用方面，MySQL是最好的RDBMS（Relational Database Management System）应用软件之一。

### 4.2 访问与下载

> * 官网地址：https://www.mysql.com
> * 下载地址：http://dev.mydql.com/downloads/mysql/

|   版本选择    |
| :-----------: |
| 5.7.*版本为主 |

### 4.3 安装

### 4.4 卸载

> * 控制台卸载。
> * 找到mysql的安装目录进行删除。
> * programdata 删除 mysql

* <strong style="color:#2C9D79">注意：如果卸载后，仍有未删除的MySQL服务，可采用手动删除</strong>
* <strong style="color:#2C9D79">以管理员什打开命令行工具，输入 sc delete MySQL</strong>

### 4.5 配置环境变量

> * Windows
>   * 创建MYSQL_HOME: c:\Program Files\MySQL\MySQL Server 5.7
>   * 追加PATH：%MYSQL_HOME%\bin;
> * MacOS/Linux
>   * 终端中输入cd ~ 进入目录，并检查 .bash_profile是否存在，有则追加，无则创建
>   * 创建文件touch .bash_profile
>   * 打开文件 open .bash_profile
>   * 输入 export PATH = ${PATH}:/usr/local/mysql/bin 保存并退出终端

### 4.6 MySQL目录结构

> 核心文件介绍

| 文件夹名称 | 内容 |
| :--------: | :--: |
|            |      |

https://www.bilibili.com/video/BV1gC4y1p7z2?p=464

### 4.7 MySQL配置文件

## 五、SQL

### 5.1 概念

### 5.2 MySQL应用

### 5.3 基本命令

## 六、客户端工具

### 6.1 Navicate

### 6.2 SQLyog

## 七、数据查询【重点】

### 7.1 数据库表的基本结构

### 7.2 基本查询

#### 7.2.1 查询部分列



#### 7.4.2 逻辑判断（AND、OR、NOT）

~~~mysql
#查询新资是11000并且提成是0.30的员工信息（编号、姓名、薪资）
SELECT employee_id, first_name, salary
FROM t_employee
WHERE salary = 11000 AND  commission_pct = 0.30;
~~~

#### 7.4.3 不等值判断（>、<、>=、<=、!=、<>）

~~~mysql
#查询员工的薪资在6000-10000之间的员工信息（编号，名字，薪资）
SELECT id, fname, salary
FROM emps
WHERE salary >= 6000 AND salary <=10000;
~~~

#### 7.4.4 区间判断

~~~mysql
#查询员工的薪资在6000-10000之间的员工信息（编号，名字，薪资）
SELECT id, fname, salary
FROM emps
WHERE salary BETWEEN 6000 AND 10000;#闭区间，包含取键边界的两个值
~~~

<font style="color:green;font-weight:bolder">注意：6000和10000的位置不能互换，否则查询不到数据</font>

## 八、







<strong style="color:#2C9D79">Demo</strong>