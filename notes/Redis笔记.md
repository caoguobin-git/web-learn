# Redis 笔记

[TOC]

## 一、Redis简介

> Redis是完全开源免费的，遵守BSD协议，是一个高性能的key-value库。

### 1.1 Redis特点

> 和其他key-value缓存产品相比，Redis有以下特点：
>
> * Redis支持数据的持久化，可以将内存中的数据保存到硬盘中，重启的时候可以从硬盘中加载。
> * Redis不仅仅支持简单的key-value类型的数据，同时还提供list、set、zset、hash等数据结构的存储。
> * Redis支持数据的备份，即master-slave的集群模式。

### 1.2 Redis优势

> * 性能极高：Redis读取速度可以达到110000次/s，写入速度可以达到81000次/s。
> * 丰富的数据类型：Redis支持二进制的Strings、Lists、Sets、Ordered Sets、Hashes数据类型。
> * 原子化：Redis所有操作都是原子的，要么成功执行，要么失败完全不执行。单个操作时原子性的。多个操作也支持事务，通过使用MULTI和EXEC指令包裹起来实现。
> * 丰富的特性：Redis还支持publish/subscribe、通知、key过期等特性。

### 1.3 Redis与其他key-value存储有什么同

> * Redis有着更为复杂的数据结构并且提供对他们的原子性操作，这是一个不同于其他数据库的进化路路径。Redis的数据类型都是基于基本数据结构的同时对程序员透明，无需进行额外的抽象。
> * Redis运行在内存中但是可以持久化到磁盘，所以对于不同的数据集进行告诉读写时需要权衡内存，因为数据量不能大于硬件内存。在内存数据库方面的另一个优点是，相比在磁盘上相同的复杂的数据结构，在内存中操作起来非常简单，这样Redis可以做很多内部复杂性很强的事情。同时，在磁盘格式方面他们是紧凑的以追加的方式产生的，因为他们并不需要进行随机访问。

## 二、Redis安装

### 2.1 下载

> 官网地址：https://redis.io/download 可以下载最新稳定版本

### 2.2 安装

#### 2.2.1 安装编译环境GCC

~~~shell
yum indatall gcc
~~~

#### 2.2.2 解压压缩包

~~~shell
tar -zxvf redis-4.0.6.tar.gz
~~~

#### 2.2.3 执行编译

> 进入redis解压后的目录，执行以下指令

~~~shell
make
...
make install
~~~

## 三、Redis启动和关闭

### 3.1 启动Redis

~~~shell
redis-server            (默认配置文件启动)
redis-server redis.conf (指定配置文件启动)
~~~

### 3.2 关闭Redis

~~~shell
kill -9 PID
redis-cli shutdown 该命令只能关闭默认端口号6379的redis
redis-cli -p 7000 shutdown 指定端口号关闭
~~~

### 3.3 Redis客户端进入

~~~shell
redis-cli -p 7000 指定端口号进入
redis-cli -a <password> -c -p 7000  进入带密码的redis集群
~~~

## 四、Redis 配置

> Redis配置文件位于Redis安装目录下，文件名称为redis.conf

### 4.1 查看Redis配置

> 可以通过CONFIG命令查看或设置配置项。
>
> 语法：

~~~shell
CONFIG GET < CONFIG_SETTING_NAME >
~~~

> 示例：

~~~shell
127.0.0.1:7000> CONFIG GET loglevel
1) "loglevel"  #配置项名称
2) "notice"	   #配置项值
~~~

> 使用*\**号获取所有配置项：

~~~shell
127.0.0.1:7000> CONFIG GET *
  1) "dbfilename"
  2) "dump.rdb"
  3) "requirepass"
  4) "[password]"
  5) "masterauth"
  6) "[password]"
  7) "cluster-announce-ip"
  8) ""
  9) "unixsocket"
 10) ""
 11) "logfile"
 12) ""
 13) "pidfile"
 14) "/var/run/redis_7000.pid"
 15) "slave-announce-ip"
 16) ""
 17) "replica-announce-ip"
 18) ""
 19) "maxmemory"
 20) "0"
 21) "proto-max-bulk-len"
 22) "536870912"
 23) "client-query-buffer-limit"
 24) "1073741824"
 25) "maxmemory-samples"
 26) "5"
 27) "lfu-log-factor"
 28) "10"
 29) "lfu-decay-time"
 30) "1"
 31) "timeout"
 32) "0"
 33) "active-defrag-threshold-lower"
 34) "10"
 35) "active-defrag-threshold-upper"
 36) "100"
 37) "active-defrag-ignore-bytes"
 38) "104857600"
 39) "active-defrag-cycle-min"
 40) "5"
 41) "active-defrag-cycle-max"
 42) "75"
 43) "active-defrag-max-scan-fields"
 44) "1000"
 45) "auto-aof-rewrite-percentage"
 46) "100"
 47) "auto-aof-rewrite-min-size"
 48) "67108864"
 49) "hash-max-ziplist-entries"
 50) "512"
 51) "hash-max-ziplist-value"
 52) "64"
 53) "stream-node-max-bytes"
 54) "4096"
 55) "stream-node-max-entries"
 56) "100"
 57) "list-max-ziplist-size"
 58) "-2"
 59) "list-compress-depth"
 60) "0"
 61) "set-max-intset-entries"
 62) "512"
 63) "zset-max-ziplist-entries"
 64) "128"
 65) "zset-max-ziplist-value"
 66) "64"
 67) "hll-sparse-max-bytes"
 68) "3000"
 69) "lua-time-limit"
 70) "5000"
 71) "slowlog-log-slower-than"
 72) "10000"
 73) "latency-monitor-threshold"
 74) "0"
 75) "slowlog-max-len"
 76) "128"
 77) "port"
 78) "7000"
 79) "cluster-announce-port"
 80) "0"
 81) "cluster-announce-bus-port"
 82) "0"
 83) "tcp-backlog"
 84) "511"
 85) "databases"
 86) "16"
 87) "repl-ping-slave-period"
 88) "10"
 89) "repl-ping-replica-period"
 90) "10"
 91) "repl-timeout"
 92) "60"
 93) "repl-backlog-size"
 94) "1048576"
 95) "repl-backlog-ttl"
 96) "3600"
 97) "maxclients"
 98) "10000"
 99) "watchdog-period"
100) "0"
101) "slave-priority"
102) "100"
103) "replica-priority"
104) "100"
105) "slave-announce-port"
106) "0"
107) "replica-announce-port"
108) "0"
109) "min-slaves-to-write"
110) "0"
111) "min-replicas-to-write"
112) "0"
113) "min-slaves-max-lag"
114) "10"
115) "min-replicas-max-lag"
116) "10"
117) "hz"
118) "10"
119) "cluster-node-timeout"
120) "15000"
121) "cluster-migration-barrier"
122) "1"
123) "cluster-slave-validity-factor"
124) "10"
125) "cluster-replica-validity-factor"
126) "10"
127) "repl-diskless-sync-delay"
128) "5"
129) "tcp-keepalive"
130) "300"
131) "cluster-require-full-coverage"
132) "yes"
133) "cluster-slave-no-failover"
134) "no"
135) "cluster-replica-no-failover"
136) "no"
137) "no-appendfsync-on-rewrite"
138) "no"
139) "slave-serve-stale-data"
140) "yes"
141) "replica-serve-stale-data"
142) "yes"
143) "slave-read-only"
144) "yes"
145) "replica-read-only"
146) "yes"
147) "slave-ignore-maxmemory"
148) "yes"
149) "replica-ignore-maxmemory"
150) "yes"
151) "stop-writes-on-bgsave-error"
152) "yes"
153) "daemonize"
154) "yes"
155) "rdbcompression"
156) "yes"
157) "rdbchecksum"
158) "yes"
159) "activerehashing"
160) "yes"
161) "activedefrag"
162) "no"
163) "protected-mode"
164) "no"
165) "repl-disable-tcp-nodelay"
166) "no"
167) "repl-diskless-sync"
168) "no"
169) "aof-rewrite-incremental-fsync"
170) "yes"
171) "rdb-save-incremental-fsync"
172) "yes"
173) "aof-load-truncated"
174) "yes"
175) "aof-use-rdb-preamble"
176) "yes"
177) "lazyfree-lazy-eviction"
178) "no"
179) "lazyfree-lazy-expire"
180) "no"
181) "lazyfree-lazy-server-del"
182) "no"
183) "slave-lazy-flush"
184) "no"
185) "replica-lazy-flush"
186) "no"
187) "dynamic-hz"
188) "yes"
189) "maxmemory-policy"
190) "allkeys-lru"
191) "loglevel"
192) "notice"
193) "supervised"
194) "no"
195) "appendfsync"
196) "everysec"
197) "syslog-facility"
198) "local0"
199) "appendonly"
200) "no"
201) "dir"
202) "/usr/local/src/redis/redis-7000-7008/redis_cluster/7000"
203) "save"
204) "900 1 300 10 60 10000"
205) "client-output-buffer-limit"
206) "normal 0 0 0 slave 268435456 67108864 60 pubsub 33554432 8388608 60"
207) "unixsocketperm"
208) "0"
209) "slaveof"
210) ""
211) "notify-keyspace-events"
212) ""
213) "bind"
214) "0.0.0.0"
127.0.0.1:7000> 
~~~

### 4.2 编辑Redis配置

> 可以通过修改redis.conf文件或使用***CONFIG SET < confg_name >***命令来修改配置。
>
> 语法：

~~~shell
CONFIG SET < CONFIG_NAME > < CONFIG_NEW_VALUE >
~~~

> 实例：

~~~shell
127.0.0.1:7000> CONFIG SET loglevel notice
OK
127.0.0.1:7000> CONFIG GET loglevel
1) "loglevel"
2) "notice"
127.0.0.1:7000> 
~~~

### 4.3 Redis参数说明

|             配置项名称              |                默认值                 | 说明                                                         |
| :---------------------------------: | :-----------------------------------: | ------------------------------------------------------------ |
|              daemonize              |                  no                   | Redis默认不是以守护进程的方式有哪些，可以通过该配置型修改，使用yes启用守护进程(windows不支持守护线程的配置为no) |
|               pidfile               |          /var/run/redis.pid           | 当Redis以守护线程方式运行时，Redis默认会把pid写入/var/run/redis.pid文件，可以通过pidfile指定 |
|                port                 |                 6379                  | 指定 Redis 监听端口，默认端口为 6379                         |
|                bind                 |               127.0.0.1               | 绑定的主机地址                                               |
|               timeout               |                  300                  | 当客户端闲置多少秒后关闭连接，如果指定为0，则表示关闭该功能。 |
|              loglevel               |                notice                 | 指定日志输出级别，Redis总共支持四种级别：debug、verbose、notice、warning。 |
|               logfile               |                stdout                 | 日志记录方式，默认为标准输出，如果配置Redis为守护进程方式运行，而这里又配置日志记录方式为标准输出，则日志会发送到/dev/null |
|              databases              |                   0                   | 设置数据库的数量，默认数据库为0，可以使用SELECT 命令在连接上指定数据库id |
|    save < seconds > < changes >     | save 900 1 save 300 10  save 60 10000 | 指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合。分别表示 900 秒（15 分钟）内有 1 个更改，300 秒（5 分钟）内有 10 个更改以及 60 秒内有 10000 个更改。 |
|           rdbcompression            |                  yes                  | 指定存储至本地数据库时是否压缩数据，默认为 yes，Redis 采用 LZF 压缩，如果为了节省 CPU 时间，可以关闭该选项，但会导致数据库文件变的巨大 |
|             dbfilename              |               dump.rdb                | 指定本地数据库文件名，默认值为 dump.rdb                      |
|                 dir                 |                  ./                   | 指定本地数据库存放目录                                       |
| slaveof < masterip > < masterport > |                  ""                   | 设置当本机为 slave 服务时，设置 master 服务的 IP 地址及端口，在 Redis 启动时，它会自动从 master 进行数据同步 |
|   masterauth < master-password >    |                  ""                   | 当 master 服务设置了密码保护时，slav 服务连接 master 的密码  |
|             requirepass             |                  ""                   | 设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 时需要通过 AUTH(或者-a) < password > 命令提供密码，默认关闭 |
|             maxclients              |                   0                   | 设置同一时间最大客户端连接数，默认无限制，Redis 可以同时打开的客户端连接数为 Redis 进程可以打开的最大文件描述符数，如果设置 maxclients 0，表示不作限制。当客户端连接数到达限制时，Redis 会关闭新的连接并向客户端返回 max number of clients reached 错误信息 |
|         maxmemory < bytes >         |                   0                   | 指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会先尝试清除已到期或即将到期的 Key，当此方法处理 后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Redis 新的 vm 机制，会把 Key 存放内存，Value 会存放在 swap 区 |
|             appendonly              |                  no                   | 指定是否在每次更新操作后进行日志记录，Redis 在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为 redis 本身同步数据文件是按上面 save 条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为 no |
|           appendfilename            |            appendonly.aof             | 指定更新日志文件名，默认为 appendonly.aof                    |
|             appendfsync             |               everysec                | 指定更新日志条件，共有 3 个可选值：no:表示等操作系统进行数据缓存同步到磁盘（快）；always：表示每次更新操作后手动调用fsync()将数据写到磁盘（慢、安全）；everysec：表示每秒同步一次（折中，默认值） |
|             vm-enabled              |                  no                   | 指定是否启用虚拟内存机制，默认值为 no，简单的介绍一下，VM 机制将数据分页存放，由 Redis 将访问量较少的页即冷数据 swap 到磁盘上，访问多的页面由磁盘自动换出到内存中（在后面的文章我会仔细分析 Redis 的 VM 机制） |
|            vm-swap-file             |            /tmp/redis.swap            | 虚拟内存文件路径，默认值为 /tmp/redis.swap，不可多个 Redis 实例共享 |
|            vm-max-memory            |                   0                   | 将所有大于 vm-max-memory 的数据存入虚拟内存，无论 vm-max-memory 设置多小，所有索引数据都是内存存储的(Redis 的索引数据 就是 keys)，也就是说，当 vm-max-memory 设置为 0 的时候，其实是所有 value 都存在于磁盘。默认值为 0 |
|            vm-page-size             |                  32                   | Redis swap 文件分成了很多的 page，一个对象可以保存在多个 page 上面，但一个 page 上不能被多个对象共享，vm-page-size 是要根据存储的 数据大小来设定的，作者建议如果存储很多小对象，page 大小最好设置为 32 或者 64bytes；如果存储很大大对象，则可以使用更大的 page，如果不确定，就使用默认值 |
|              vm-pages               |               134217728               | 设置 swap 文件中的 page 数量，由于页表（一种表示页面空闲或使用的 bitmap）是在放在内存中的，，在磁盘上每 8 个 pages 将消耗 1byte 的内存。 |
|           vm-max-threads            |                   4                   | 设置访问swap文件的线程数,最好不要超过机器的核数,如果设置为0,那么所有对swap文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为4 |
|            glueoutputbuf            |                  yes                  | 设置在向客户端应答时，是否把较小的包合并为一个包发送，默认为开启 |
|       hash-max-zipmap-entries       |                  64                   | 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法 |
|        hash-max-zipmap-value        |                  512                  | 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法 |
|           activerehashing           |                  yes                  | 指定是否激活重置哈希，默认为开启（后面在介绍 Redis 的哈希算法时具体介绍） |
|               include               |          /path/to/local.conf          | 指定包含其它的配置文件，可以在同一主机上多个Redis实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件 |
|           protected-mode            |                  yes                  | 保护模式，默认为yes，只能本机访问，远程访问需改为yes         |



## 五、Redis数据类型及操作指令

> 官方指令文档： https://redis.io/commands

> 各类型特点及应用场景如下：

|          类型          | 简介                                                   | 特性                                                         | 场景                                                         |
| :--------------------: | ------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
|    String（字符串）    | 二进制安全                                             | 可以包含任何数据,比如jpg图片或者序列化的对象,一个键最大能存储512M | \---                                                         |
|      Hash（字典）      | 键值对集合，即编程语言中的Map类型                      | 适合存储对象,并且可以像数据库中update一个属性一样只修改某一项属性值(Memcached中需要取出整个字符串反序列化成对象修改完再序列化存回去) | 存储、读取、修改用户属性                                     |
|      List（列表）      | 链表（双向链表）                                       | 增删快,提供了操作某一段元素的API                             | 1,最新消息排行等功能(比如朋友圈的时间线) 2,消息队列          |
|      Set（集合）       | 哈希表实现，元素不重复                                 | 1、添加、删除,查找的复杂度都是O(1) <br>2、为集合提供了求交集、并集、差集等操作 | 1、共同好友 <br>2、利用唯一性,统计访问网站的所有独立ip <br>3、好友推荐时,根据tag求交集,大于某个阈值就可以推荐 |
| Sorted Set（有序集合） | 将Set中的元素增加一个权重参数score,元素按score有序排列 | 数据插入集合时,已经进行天然排序                              | 1、排行榜<br>2、带权重的消息队列                             |



### 5.1 String类型

> string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。
>
> string 类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。
>
> string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB。

|   命令   | 说明                                                         | 示例                                                         |
| :------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|   SET    | 添加key-value                                                | SET username usertest                                        |
|   GET    | 根据key获取数据                                              | GET username                                                 |
| GETRANGE | 获取key中字符串的子串                                        | GETRANGE  a  0 3<br>取值结果为[0,3]                          |
|  GETSET  | 将给定key的值设置为value，并返回key的旧值（old value）。     | GETSET a hello                                               |
|  GETBIT  | 对于key所存储的字符串值，获取指定偏移量上的位（bit）         | GETBIT a 3（返回0/1）                                        |
|  SETBIT  | 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。   | SETBIT key offset value                                      |
|  SETEX   | 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)。 | SETEX key seconds value                                      |
|  SETNX   | 只有在 key 不存在时设置 key 的值。                           | SETNX key value                                              |
| SETRANGE | 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始。 | SETRANGE key offset value                                    |
|  MSETNX  | 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。 | MSETNX key value [key value ...]                             |
|  PSETEX  | 这个命令和 SETEX 命令相似，但它以毫秒为单位设置 key 的生存时间，而不是像 SETEX 命令那样，以秒为单位。 | PSETEX key milliseconds value                                |
|  STRLEN  | 根据key获取value的长度                                       | STRLEN name                                                  |
|  EXISTS  | 判断key是否存在                                              | EXISTS username<br>(1：存在；0：不存在)                      |
|   DEL    | 删除redis中的key                                             | DEL key                                                      |
|   KEYS   | 用于查询符合条件的key                                        | KEYS * (查看所有key)； <br>KEYS n?me(使用占位符获取数据)；<br> KEYS nam*(获取nam开头的数据) |
|   MSET   | 设置多个key-value                                            | MSET key1 value1 key2 value2 key3 value3                     |
|   MGET   | 获取多个key的值                                              | MGET key1 key2                                               |
|  APPEND  | 对某个key的值进行追加                                        | APPEND key value                                             |
|   TYPE   | 检查某个key的类型                                            | TYPE key                                                     |
|  SELECT  | 切换redis数据库                                              | SELECT 0-15 （Redis中共有16个数据库）                        |
| FLUSHDB  | 清空单个数据库                                               | FLUSHDB                                                      |
| FLUSHALL | 清空全部数据库                                               | FLUSHALL                                                     |
|   INCR   | 自动加1                                                      | INCR key                                                     |
|   DECR   | 自动减1                                                      | DECR key                                                     |
|  INCRBY  | 指定数值增加                                                 | INCRBY 10                                                    |
|  DECRBY  | 指定数值减少                                                 | DECRBY 10                                                    |
|  EXPIRE  | 指定key的过期时间 单位为秒                                   | EXPIRE KEY 10<br>(设置key10秒后过期)                         |
| PEXPIRE  | 指定key的过期时间 单位为毫秒                                 | PEXPIRE key 2000<br>(设置key 2000毫秒后过期)                 |
|   TTL    | 查看key的剩余有效时间                                        | TTL key                                                      |
| PERSIST  | 撤销key的过期时间                                            | PERSIST key                                                  |

### 5.2 Hash类型

> Redis hash 是一个键值(key=>value)对集合。
>
> Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

|     命令     | 说明                                                     | 示例                                           |
| :----------: | -------------------------------------------------------- | ---------------------------------------------- |
|     HDEL     | 删除一个或多个哈希表字段                                 | HDEL key field1 [field2]                       |
|   HEXISTS    | 查看哈希表 key 中，指定的字段是否存在。                  | HEXISTS key field                              |
|     HGET     | 获取存储在哈希表中指定字段的值。                         | HGET key field                                 |
|   HGETALL    | 获取在哈希表中指定 key 的所有字段和值                    | HGETALL key                                    |
|   HINCRBY    | 为哈希表 key 中的指定字段的整数值加上增量 increment 。   | HINCRBY key field increment                    |
| HINCRBYFLOAT | 为哈希表 key 中的指定字段的浮点数值加上增量 increment 。 | HINCRBYFLOAT key field increment               |
|    HKEYS     | 获取所有哈希表中的字段                                   | HKEYS key                                      |
|     HLEN     | 获取哈希表中字段的数量                                   | HLEN key                                       |
|    HMGET     | 获取所有给定字段的值                                     | HMGET key field1 [field2]                      |
|    HMSET     | 同时将多个 field-value (域-值)对设置到哈希表 key 中。    | HMSET key field1 value1 [field2 value2 ]       |
|     HSET     | 将哈希表 key 中的字段 field 的值设为 value 。            | HSET key field value                           |
|   HSTRLEN    | 获取hash表中指定key的指定字段的长度                      | HSTRLEN key field                              |
|    HSETNX    | 只有在字段 field 不存在时，设置哈希表字段的值。          | HSETNX key field value                         |
|    HVALS     | 获取哈希表中所有值。                                     | HVALS key                                      |
|    HSCAN     | 迭代哈希表中的键值对。                                   | HSCAN key cursor [MATCH pattern] [COUNT count] |

### 5.3 List（列表）

> Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

|                 命令                  | 说明                                                         | 示例                                                         |
| :-----------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                 BLPOP                 | 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。 | BLPOP key1 [key2 ] timeout                                   |
|                 BRPOP                 | 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。 | BRPOP key1 [key2 ] timeout                                   |
|              BRPOPLPUSH               | 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。 | BRPOPLPUSH source destination timeout                        |
|                LINDEX                 | 通过索引获取列表中的元素                                     | LINDEX key index                                             |
| LINSERT key BEFORE\|AFTER pivot value | 在列表的元素前或后插入元素                                   | LINSERT key BEFORE\|AFTER pivot value                        |
|                 LLEN                  | 获取列表长度                                                 | LLEN key                                                     |
|                 LPOP                  | 移除并获取列表的第一个元素                                   | LPOP key                                                     |
|                 LPUSH                 | 将一个或多个值插入到列表头部                                 | LPUSH key value1 [value2]                                    |
|                LPUSHX                 | 将一个值插入到已存在的列表头部                               | LPUSHX key value                                             |
|                LRANGE                 | 获取列表指定范围内的元素                                     | LRANGE key start stop                                        |
|                 LREM                  | 从存于 key 的列表里移除前 count 次出现的值为 value 的元素。 这个 count 参数通过下面几种方式影响这个操作：<br/>•	count > 0: 从头往尾移除值为 value 的元素。<br/>•	count < 0: 从尾往头移除值为 value 的元素。<br/>•	count = 0: 移除所有值为 value 的元素。 | LREM list -2 “hello” 会从存于 list 的列表里移除最后两个出现的 “hello”。<br/>需要注意的是，如果list里没有存在key就会被当作空list处理，所以当 key 不存在的时候，这个命令会返回 0。 |
|                 LSET                  | 通过索引 设置列表元素的值                                    | LSET key index value                                         |
|                 LTRIM                 | 对一个列表进行修剪（TRIM），让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。 | LTRIM key start stop                                         |
|                 RPOP                  | 移除列表的最后一个元素，返回值为移除的元素                   | RPOP key                                                     |
|               RPOPLPUSH               | 移除列表的最后一个元素，并将该元素添加到另一个列表并返回     | RPOPLPUSH source destination                                 |
|                 RPUSH                 | 在列表尾部添加一个或多个值                                   | RPUSH key value1 [value2]                                    |
|                RPUSHX                 | 为已存在的列表尾部添加值                                     | RPUSHX key value                                             |

### 5.4 Set（集合）

> Redis 的 Set 是 string 类型的无序集合。
>
> 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

|    命令     | 说明                                          | 示例                                           |
| :---------: | --------------------------------------------- | ---------------------------------------------- |
|    SADD     | 向集合中添加一个或多个成员。                  | SADD key member1 [member2]                     |
|  SCARD key  | 获取集合的成员数                              | SCARD key1 [key2]                              |
|    SDIFF    | 返回给定所有集合的差集                        | SDIFF key1 [key2]                              |
| SDIFFSTORE  | 返回给定所有集合的差集并存储到destination中   | SDIFFSTORE key1 [key2]                         |
|   SINTER    | 返回给定所有集合的并集                        | SINTER key1 [key2]                             |
| SINTERSTORE | 返回给定所有集合的并集并存储到destination中   | SINTERSTORE key1 [key2]                        |
|  SISMEMBER  | 判断member元素是否为集合key的成员             | SISMEMBER key member                           |
|  SMEMBERS   | 返回集合的所有成员                            | SMEMBERS key                                   |
|    SMOVE    | 将member元素从source集合移动到destination集合 | SMOVE source destination member                |
|    SPOP     | 移除并返回集合中的一个随机元素                | SPOP key                                       |
| SRANDMEMBER | 返回集合中一个或多个随机元素                  | SRANDMEMBER key [count]                        |
|    SREM     | 移除集合中一个或多个元素                      | SREM key member1 [member2]                     |
|   SUNION    | 返回给定所有集合的并集                        | SUNION key1 [key2]                             |
| SUNIONSTORE | 返回给定所有集合的并集并存储到destination中   | SUNIONSTORE destination key1 [key2]            |
|    SSCAN    | 迭代集合中的元素                              | SSCAN key cursor [MATCH pattern] [Count count] |

### 5.5 zSet(Sorted Set：有序集合)

> Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
>
> 不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
>
> zSet的成员是唯一的,但分数(score)却可以重复。

|       命令       | 说明                                                         | 示例                                           |
| :--------------: | ------------------------------------------------------------ | ---------------------------------------------- |
|       ZASS       | 向有序集合中添加一个或多个成员，或者更新已存在成员的分数     | ZADD key score1 member1 [score2 member2]       |
|      ZCARD       | 获取有序集合的元素数                                         | ZCARD key                                      |
|      ZCOUNT      | 计算有序集合中指定取键分数的元素数                           | ZCOUNT key min max                             |
|     ZINCRBY      | 有序集合中对指定成员的分数加上增量increment                  | ZINCRBY key increment member                   |
|   ZINTERSTORE    | 计算给定的一个或多个有序集合的交集并将结果存储到新的有序集合destination中 | ZINTERSTORE destination numkeys key1 [key2]    |
|    ZLEXCOUNT     | 计算有序集合总score在某范围内的元素数量                      | ZLEXCOUNT key min max                          |
|      ZRANGE      | 通过索引取键返回有序集合指定区域内的成员                     | ZRANGE key start stop [WITHSCORES]             |
|   ZRANGEBYLEX    | 通过字典区间返回有序集合的元素                               | ZRANGEBYLEX key min max [LIMIT offset count]   |
|  ZRANGEBYSCORE   | 通过分数返回有序集合指定区间内的元素                         | ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT] |
|      ZRANK       | 返回有序集合中指定成员的索引                                 | ZRANK key member                               |
|       ZREM       | 移除有序集合中的一个或多个成员                               | ZREM key member1 [member2]                     |
|  ZREMRANGEBYLEX  | 移除有序集合中给定的字典区间的所有成员                       | ZREMRANGEBYLEX key min max                     |
| ZREMRANGEBYRANK  | 移除有序集合中给定的排名区间的所有成员                       | ZREMRANGEBYRANK key start stop                 |
| ZREMRANGEBYSCORE | 移除有序集合中给定的分数区间的所有成员                       | ZREMRANGEBYSCORE key min max                   |
|    ZREVRANGE     | 返回有序集合中指定区间的成员，通过索引，分数从高到低         | ZREVRANGE key start stop [WITHSCOES]           |
| ZREVRANGEBYSCORE | 返回有序集合中指定分数区间的元素，分数从高到底排序           | ZREVRANGEBYSCORE key max min[WITHSCORES]       |
|     ZREVRANK     | 返回有序集合中指定成员的排名，有序集成员按分数值递减排序     | ZREVRANK key member                            |
|      ZSCORE      | 返回有序集合中成员的分数值                                   | ZSCORE key member                              |
|   ZUNIONSTORE    | 返回多个有序集合的并集并存储到destination中                  | ZUNIONSTORE destination numkeys key1 [key2]    |
|      ZSCAN       | 迭代有序集合中的元素（包括元素成员和元素分值）               | ZSCAN key cursor [MATCH pattern] [COUNT count] |

## 六、Redis HyperLogLog

> Redis 在 2.8.9 版本添加了 HyperLogLog 结构。
>
> Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。
>
> 在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。
>
> 但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

### 6.1 什么是基数

> 比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。

|  指令   | 描述                                   | 示例                                    |
| :-----: | -------------------------------------- | --------------------------------------- |
|  PFADD  | 添加指定元素到HyperLogLog中            | PFADD key element1 [element2]           |
| PFCOUNT | 返回给定的HyperLogLog的基数估算值      | PFCOUNT key [key]                       |
| PFMERGE | 将多个HyperLogLog合并为一个HyperLogLog | PFMERGE destkey sorucekey1 [sourcekey2] |

## 七、Redis发布订阅

> Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。
>
> Redis 客户端可以订阅任意数量的频道。
>
> 下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系：

![img](pic\Redis笔记\pubsub1.png)

> 当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：

![img](pic\Redis笔记\pubsub2.png)

> 指令：

|     指令     | 描述                               | 示例                                        |
| :----------: | ---------------------------------- | ------------------------------------------- |
|  PSUBSCRIBE  | 订阅一个或多个符合给定模式的频道。 | PSUBSCRIBE pattern [pattern ...]            |
|    PUBSUB    | 查看订阅与发布系统状态。           | PUBSUB subcommand [argument [argument ...]] |
|   PUBLISH    | 将信息发送到指定的频道。           | PUBLISH channel message                     |
| PUNSUBSCRIBE | 退订所有给定模式的频道。           | PUNSUBSCRIBE [pattern [pattern ...]]        |
|  SUBSCRIBE   | 订阅给定的一个或多个频道的信息。   | SUBSCRIBE channel [channel ...]             |
| UNSUBSCRIBE  | 指退订给定的频道。                 | UNSUBSCRIBE [channel [channel ...]]         |



> 示例：
>
> 1. 以下实例演示了发布订阅是如何工作的。在我们实例中我们创建了订阅频道名为 **redisChat**:
> 2. 现在，我们先重新开启个 redis 客户端，然后在同一个频道 redisChat 发布两次消息，订阅者就能接收到消息。

~~~shell
#订阅
redis 127.0.0.1:6379> SUBSCRIBE redisChat
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "redisChat"
3) (integer) 1


#发布
redis 127.0.0.1:6379> PUBLISH redisChat "Redis is a great caching technique"
(integer) 1
redis 127.0.0.1:6379> PUBLISH redisChat "Learn redis by runoob.com"
(integer) 1


# 订阅者的客户端会显示如下消息
1) "message"
2) "redisChat"
3) "Redis is a great caching technique"
1) "message"
2) "redisChat"
3) "Learn redis by runoob.com"
~~~

## 八、Redis事务

> Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：
>
> - 批量操作在发送 EXEC 命令前被放入队列缓存。
> - 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
> - 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。
>
> 一个事务从开始到执行会经历以下三个阶段：
>
> - 开始事务。
> - 命令入队。
> - 执行事务。

### 8.1  实例

以下是一个事务的例子， 它先以 **MULTI** 开始一个事务， 然后将多个命令入队到事务中， 最后由 **EXEC** 命令触发事务， 一并执行事务中的所有命令：

```
redis 127.0.0.1:6379> MULTI
OK

redis 127.0.0.1:6379> SET book-name "Mastering C++ in 21 days"
QUEUED

redis 127.0.0.1:6379> GET book-name
QUEUED

redis 127.0.0.1:6379> SADD tag "C++" "Programming" "Mastering Series"
QUEUED

redis 127.0.0.1:6379> SMEMBERS tag
QUEUED

redis 127.0.0.1:6379> EXEC
1) OK
2) "Mastering C++ in 21 days"
3) (integer) 3
4) 
1) "Mastering Series"
2) "C++"
3) "Programming"
```

单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。

事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

> **这是官网上的说明 From redis docs on [transactions](http://redis.io/topics/transactions):**
>
> It's important to note that even when a command fails, all the other commands in the queue are processed – Redis will not stop the processing of commands.

比如：

```
redis 127.0.0.1:7000> multi
OK
redis 127.0.0.1:7000> set a aaa
QUEUED
redis 127.0.0.1:7000> set b bbb
QUEUED
redis 127.0.0.1:7000> set c ccc
QUEUED
redis 127.0.0.1:7000> exec
1) OK
2) OK
3) OK
```

如果在 set b bbb 处失败，set a 已成功不会回滚，set c 还会继续执行。

------

### 8.2 Redis 事务命令

下表列出了 redis 事务的相关命令：

| 序号 | 命令及描述                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | [DISCARD](https://www.runoob.com/redis/transactions-discard.html) 取消事务，放弃执行事务块内的所有命令。 |
| 2    | [EXEC](https://www.runoob.com/redis/transactions-exec.html) 执行所有事务块内的命令。 |
| 3    | [MULTI](https://www.runoob.com/redis/transactions-multi.html) 标记一个事务块的开始。 |
| 4    | [UNWATCH](https://www.runoob.com/redis/transactions-unwatch.html) 取消 WATCH 命令对所有 key 的监视。 |
| 5    | [WATCH key [key ...\]](https://www.runoob.com/redis/transactions-watch.html) 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。 |

## 九、Redis脚本

### 9.1 Redis脚本语法

>  Redis 脚本使用 Lua 解释器来执行脚本。 Redis 2.6 版本通过内嵌支持 Lua 环境。执行脚本的常用命令为 **EVAL**。

> 脚本语法如下：

```
redis 127.0.0.1:6379> EVAL script numkeys key [key ...] arg [arg ...]
```

> 示例如下：

```
redis 127.0.0.1:6379> EVAL "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second

1) "key1"
2) "key2"
3) "first"
4) "second"
```

### 9.2 Redis脚本命令

| 序号 | 命令及描述                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | [EVAL script numkeys key [key ...\] arg [arg ...]](https://www.runoob.com/redis/scripting-eval.html) 执行 Lua 脚本。 |
| 2    | [EVALSHA sha1 numkeys key [key ...\] arg [arg ...]](https://www.runoob.com/redis/scripting-evalsha.html) 执行 Lua 脚本。 |
| 3    | [SCRIPT EXISTS script [script ...\]](https://www.runoob.com/redis/scripting-script-exists.html) 查看指定的脚本是否已经被保存在缓存当中。 |
| 4    | [SCRIPT FLUSH](https://www.runoob.com/redis/scripting-script-flush.html) 从脚本缓存中移除所有脚本。 |
| 5    | [SCRIPT KILL](https://www.runoob.com/redis/scripting-script-kill.html) 杀死当前正在运行的 Lua 脚本。 |
| 6    | [SCRIPT LOAD script](https://www.runoob.com/redis/scripting-script-load.html) 将脚本 script 添加到脚本缓存中，但并不立即执行这个脚本。 |

## 十、Redis服务器

> Redis服务器命令主要用户管理Redis服务。

> 使用INFO指令获取所有信息。
>
> **服务器所有指令如下：**

| 序号 | 命令及描述                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | [BGREWRITEAOF](https://www.runoob.com/redis/server-bgrewriteaof.html) 异步执行一个 AOF（AppendOnly File） 文件重写操作 |
| 2    | [BGSAVE](https://www.runoob.com/redis/server-bgsave.html) 在后台异步保存当前数据库的数据到磁盘 |
| 3    | [CLIENT KILL [ip:port\] [ID client-id]](https://www.runoob.com/redis/server-client-kill.html) 关闭客户端连接 |
| 4    | [CLIENT LIST](https://www.runoob.com/redis/server-client-list.html) 获取连接到服务器的客户端连接列表 |
| 5    | [CLIENT GETNAME](https://www.runoob.com/redis/server-client-getname.html) 获取连接的名称 |
| 6    | [CLIENT PAUSE timeout](https://www.runoob.com/redis/server-client-pause.html) 在指定时间内终止运行来自客户端的命令 |
| 7    | [CLIENT SETNAME connection-name](https://www.runoob.com/redis/server-client-setname.html) 设置当前连接的名称 |
| 8    | [CLUSTER SLOTS](https://www.runoob.com/redis/server-cluster-slots.html) 获取集群节点的映射数组 |
| 9    | [COMMAND](https://www.runoob.com/redis/server-command.html) 获取 Redis 命令详情数组 |
| 10   | [COMMAND COUNT](https://www.runoob.com/redis/server-command-count.html) 获取 Redis 命令总数 |
| 11   | [COMMAND GETKEYS](https://www.runoob.com/redis/server-command-getkeys.html) 获取给定命令的所有键 |
| 12   | [TIME](https://www.runoob.com/redis/server-time.html) 返回当前服务器时间 |
| 13   | [COMMAND INFO command-name [command-name ...\]](https://www.runoob.com/redis/server-command-info.html) 获取指定 Redis 命令描述的数组 |
| 14   | [CONFIG GET parameter](https://www.runoob.com/redis/server-config-get.html) 获取指定配置参数的值 |
| 15   | [CONFIG REWRITE](https://www.runoob.com/redis/server-config-rewrite.html) 对启动 Redis 服务器时所指定的 redis.conf 配置文件进行改写 |
| 16   | [CONFIG SET parameter value](https://www.runoob.com/redis/server-config-set.html) 修改 redis 配置参数，无需重启 |
| 17   | [CONFIG RESETSTAT](https://www.runoob.com/redis/server-config-resetstat.html) 重置 INFO 命令中的某些统计数据 |
| 18   | [DBSIZE](https://www.runoob.com/redis/server-dbsize.html) 返回当前数据库的 key 的数量 |
| 19   | [DEBUG OBJECT key](https://www.runoob.com/redis/server-debug-object.html) 获取 key 的调试信息 |
| 20   | [DEBUG SEGFAULT](https://www.runoob.com/redis/server-debug-segfault.html) 让 Redis 服务崩溃 |
| 21   | [FLUSHALL](https://www.runoob.com/redis/server-flushall.html) 删除所有数据库的所有key |
| 22   | [FLUSHDB](https://www.runoob.com/redis/server-flushdb.html) 删除当前数据库的所有key |
| 23   | [INFO [section\]](https://www.runoob.com/redis/server-info.html) 获取 Redis 服务器的各种信息和统计数值 |
| 24   | [LASTSAVE](https://www.runoob.com/redis/server-lastsave.html) 返回最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示 |
| 25   | [MONITOR](https://www.runoob.com/redis/server-monitor.html) 实时打印出 Redis 服务器接收到的命令，调试用 |
| 26   | [ROLE](https://www.runoob.com/redis/server-role.html) 返回主从实例所属的角色 |
| 27   | [SAVE](https://www.runoob.com/redis/server-save.html) 同步保存数据到硬盘 |
| 28   | [SHUTDOWN [NOSAVE\] [SAVE]](https://www.runoob.com/redis/server-shutdown.html) 异步保存数据到硬盘，并关闭服务器 |
| 29   | [SLAVEOF host port](https://www.runoob.com/redis/server-slaveof.html) 将当前服务器转变为指定服务器的从属服务器(slave server) |
| 30   | [SLOWLOG subcommand [argument\]](https://www.runoob.com/redis/server-showlog.html) 管理 redis 的慢日志 |
| 31   | [SYNC](https://www.runoob.com/redis/server-sync.html) 用于复制功能(replication)的内部命令 |

## 十一、Redis 数据备份与恢复

> Redis **SAVE** 命令用于创建当前数据库的备份。

###  11.1语法

> redis Save 命令基本语法如下：

```
redis 127.0.0.1:6379> SAVE 
```

> 实例

```
redis 127.0.0.1:6379> SAVE 
OK
```

该命令将在 redis 安装目录中创建dump.rdb文件。

------

###  11.2 恢复数据

> 如果需要恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可。获取 redis 目录可以使用 **CONFIG** 命令，如下所示：

```
redis 127.0.0.1:6379> CONFIG GET dir
1) "dir"
2) "/usr/local/redis/bin"
```

> 以上命令 **CONFIG GET dir** 输出的 redis 安装目录为 /usr/local/redis/bin。

### 11.3 Bgsave

> 创建 redis 备份文件也可以使用命令 **BGSAVE**，该命令在后台执行。

>  示例代码：

```
127.0.0.1:6379> BGSAVE

Background saving started
```

## 十二、Redis集群搭建【<strong style="color:red">重要</strong>】

### 12.1 Redis集群概念

> redis集群包含了分片的特点和哨兵的高可用的机制.同时内部不需要单独的配置哨兵,而所有的redis集群中的节点,都有选举权.得票数高的,当选主机.

### 12.2 Redis集群搭建

#### 12.2.1 修改Redis配置文件

> 1. 注释掉IP绑定
> 2. 修改保护模式
> 3. 修改端口号
> 4. 修改守护模式

~~~shell
# 示例代码

#注释掉ip绑定
#bind 127.0.0.1

#修改保护模式
protected-mode no

#修改端口号
port 7000

#守护模式
daemonize yes

#修改PID路径
pidfile /usr/local/src/redis-3.2.8/cluster/7000/redis_7000.pid

#修改持久化存储路径
dir /usr/local/src/redis-3.2.8/cluster/7000

#修改内存策略
maxmemory-policy allkeys-lru

#关闭AOF模式
appendonly no

#开启集群配置
cluster-configfile nodes-7000.conf

#设定超时时间
cluster-node-timeout 15000
~~~

#### 12.2.2 复制配置文件并修改

> 1. 将修改好的文件分别复制到各个节点文件夹中
>
> 2. 批量修改redis.conf中的端口号

~~~shell
#批量修改端口号
:%s/7000/7005/g
~~~

#### 12.2.3 批量启动Redis节点

~~~sh
#批量启动节点
#!/bin/bash
redis-server 7000/redis.conf &
redis-server 7001/redis.conf &
redis-server 7002/redis.conf &
redis-server 7003/redis.conf &
redis-server 7004/redis.conf &
redis-server 7005/redis.conf &
redis-server 7006/redis.conf &
redis-server 7007/redis.conf &
redis-server 7008/redis.conf 
~~~

#### 12.2.4 创建Redis集群

~~~shell
#创建Redis集群
#!/bin/bash
redis-cli --cluster create 118.118.118.118:7000 118.118.118.118:7001 118.118.118.118:7002 118.118.118.118:7003 118.118.118.118:7004 118.118.118.118:7005 118.118.118.118:7006 118.118.118.118:7007 118.118.118.118:7008 --cluster-replicas 2 [-a password]
~~~



#### 12.2.5 关闭Redis集群

> 两种情况：
>
> * 只关闭节点，不解除集群
> * 关闭节点，解除集群<strong style="color:red">【慎用】</strong>

~~~shell
#只关闭节点
!/bin/bash
redis-cli -p 7000 -a [password] shutdown &
redis-cli -p 7001 -a [password] shutdown &
redis-cli -p 7002 -a [password] shutdown &
redis-cli -p 7003 -a [password] shutdown &
redis-cli -p 7004 -a [password] shutdown &
redis-cli -p 7005 -a [password] shutdown &
redis-cli -p 7006 -a [password] shutdown &
redis-cli -p 7007 -a [password] shutdown &
redis-cli -p 7008 -a [password] shutdown;
~~~



~~~shell
#解散集群
!/bin/bash
redis-cli -p 7000 -a [password] shutdown &
redis-cli -p 7001 -a [password] shutdown &
redis-cli -p 7002 -a [password] shutdown &
redis-cli -p 7003 -a [password] shutdown &
redis-cli -p 7004 -a [password] shutdown &
redis-cli -p 7005 -a [password] shutdown &
redis-cli -p 7006 -a [password] shutdown &
redis-cli -p 7007 -a [password] shutdown &
redis-cli -p 7008 -a [password] shutdown;
rm -f 700*/dump*;
rm -f 700*/nodes*;
~~~



#### 12.2.6 查看集群状态

> 1. 进入Redis集群：redis-cli [-a password] -p 7000 -c
> 2. 查看集群状态：cluster info
> 3. 查看集群所有节点：cluster nodes

### 12.3 阿里云搭建redis集群某节点无法访问的解决办法

> 现象：
>
> * 阿里云服务器搭建redis集群会出现第二个主节点启动之后外网访问不到的问题。

> 原因：
>
> * 出现这个问题的表面原因是在第二个主节点启动的时候，外网访问时会访问到阿里云的内网ip，而不是公网ip。

> 解决方案：
>
> * 集群搭建完成后，查看每个节点对应的nodes文件，可以发现其中myself节点使用的是阿里云的内网ip，将每个内网ip修改为对应的外网ip。
> * 关闭各个节点，再重新启动各个节点即可。