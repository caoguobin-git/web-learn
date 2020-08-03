# Spring-Boot-Data-Redis 笔记

## 一、简介

> 

## 二、使用Jedis

### 2.1 导入依赖

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <!-- 排除默认使用的lettuce -->
    <exclusions>
        <exclusion>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- 配置使用Jedis -->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
~~~

### 2.2 配置文件

~~~yaml
spring:
  redis:
    timeout: 10000 #客户端超时时间单位是毫秒 默认是2000
    cluster:
      nodes: 118.190.156.52:7000,118.190.156.52:7001,118.190.156.52:7002,118.190.156.52:7003,118.190.156.52:7004,118.190.156.52:7005,118.190.156.52:7006,118.190.156.52:7007,118.190.156.52:7008
      max-redirects: 10
    password: password
#    使用Jedis连接池
   jedis:
     pool:
        # 连接池中的最大空闲连接，默认值也是8。
       max-idle: 500
        # 连接池中的最小空闲连接，默认值也是0。
       min-idle: 50
        # 如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)
       max-active: 1000
        # 等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException
       max-wait: 2000
~~~



## 三、 使用Letture【默认】

### 3.1 导入依赖

~~~xml
<!-- 导入依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- 此依赖必须添加 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
~~~

### 3.2 配置文件

~~~yaml
spring:
  redis:
    timeout: 10000 #客户端超时时间单位是毫秒 默认是2000
    cluster:
      nodes: 118.190.156.52:7000,118.190.156.52:7001,118.190.156.52:7002,118.190.156.52:7003,118.190.156.52:7004,118.190.156.52:7005,118.190.156.52:7006,118.190.156.52:7007,118.190.156.52:7008
      max-redirects: 10
    password: password
#    使用lettuce连接池
    lettuce:
      pool:
        max-active: 1000
        max-idle: 50
        max-wait: 1000
        min-idle: 10
        time-between-eviction-runs: 100000
~~~

## 四、使用案例

> RedisUtil工具类：

~~~java
@Component
public class RedisStringUtil {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /**
     * set redis: string类型
     *
     * @param key   key
     * @param value value
     */
    public void setString(String key, String value) {
        setString(key, value, -1);
    }

    /**
     * 设置带过期时间的String数据
     *
     * @param key    key
     * @param value  value
     * @param expire 过期时间，默认为秒
     */
    public void setString(String key, String value, long expire) {
        setString(key, value, expire, TimeUnit.SECONDS);
    }

    /**
     *  设置带过期时间的String
     * @param key key
     * @param value value
     * @param expire 过期时间
     * @param timeUnit 时间单位
     */
    public void setString(String key, String value, long expire, TimeUnit timeUnit) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value, expire, timeUnit);
    }

    /**
     * get redis: string类型
     *
     * @param key key
     * @return
     */
    public String getString(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    /**
     * set redis: hash类型
     *
     * @param key      key
     * @param filedKey filedkey
     * @param value    value
     */
    public void setHash(String key, String filedKey, String value) {
        HashOperations<String, Object, Object> hashOperations = stringRedisTemplate.opsForHash();
        hashOperations.put(key, filedKey, value);
        ValueOperations<String, String> stringStringValueOperations = stringRedisTemplate.opsForValue();
    }

    /**
     * get redis: hash类型
     *
     * @param key      key
     * @param filedkey filedkey
     * @return
     */
    public String getHash(String key, String filedkey) {
        return (String) stringRedisTemplate.opsForHash().get(key, filedkey);
    }

    /**
     * set redis:list类型
     *
     * @param key   key
     * @param value value
     * @return
     */
    public long setList(String key, String value) {
        ListOperations<String, String> listOperations = stringRedisTemplate.opsForList();
        return listOperations.leftPush(key, value);
    }

    /**
     * get redis:list类型
     *
     * @param key   key
     * @param start start
     * @param end   end
     * @return
     */
    public List<String> getList(String key, long start, long end) {
        return stringRedisTemplate.opsForList().range(key, start, end);
    }

    /**
     * 发布消息到队列
     *
     * @param channel 消息channel
     * @param msg     要发送的消息
     * @return 发送结果
     */
    public boolean publish(String channel, String msg) {
        try {
            stringRedisTemplate.convertAndSend(channel, msg);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
~~~

> 发布者发布消息：

~~~java
/**
 * redis发布消息
 */
@PostMapping(value = "/message")
public String sendMessage(String message) {
    boolean redispublishtest = redisUtil.publish("redispublishtest", message);
    return redispublishtest ? "消息:" + message + "发送成功" : "消息：" + message + "发送失败";
}
~~~

> 消息订阅者实现消息订阅：

~~~java
@Configuration
public class RedisListenersConfig {

    /**
     * 可以传递多个 MessageListenerAdapter
     * @param lettuceConnectionFactory  配置使用LettuceConnectionFactory
     * @param redisQueueListenerAdapter 需要添加的适配器，可以添加多个
     * @return
     */
    @Bean
    public RedisMessageListenerContainer container(RedisConnectionFactory lettuceConnectionFactory, MessageListenerAdapter redisQueueListenerAdapter) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(lettuceConnectionFactory);
        //添加消息监听器，实现消息监听
        container.addMessageListener(redisQueueListenerAdapter, new PatternTopic("redispublishtest"));
        //可以实现添加多个适配器
        //container.addMessageListener(marketquelistener, new PatternTopic("marketdata"));
        return container;
    }
    /**
     * 绑定消息监听者和接收监听的方法,必须要注入这个监听器，不然会报错
     */
    @Bean
    public MessageListenerAdapter redisQueueListenerAdapter(RedisQueueListener redisQueueListener){
        return new MessageListenerAdapter(redisQueueListener,"receiveMessage");
    }

    @Bean
    RedisQueueListener redisQueueListener(){
        return new RedisQueueListener();
    }
}
~~~

~~~java
/** 接口实现类，实现接收消息之后处理的方法 **/
public class RedisQueueListener implements RedisQueueListenerInterface {
    @Override
    public void receiveMessage(String message) {
        System.out.println(message);
    }
}
~~~

~~~java
/** 消息订阅接口 定义处理方法 **/
public interface RedisQueueListenerInterface {
    void receiveMessage(String message);
}
~~~

> 调用案例：

~~~java
@RestController
@RequestMapping("/redis")
public class RedisController {

    @Autowired
    private RedisStringUtil redisUtil;

    /**
     * 存储数据
     */
    @PostMapping(value = "/test/{key}")
    public JsonResult test(@PathVariable("key") String key, String value) {
        redisUtil.setString(key, value);
        return JsonResult.OK();
    }

    /**
     * 获取数据
     *
     * @param key
     * @return
     */
    @GetMapping(value = "/test/{key}")
    public JsonResult test(@PathVariable("key") String key) {
        Object o = redisUtil.getString(key);
        return JsonResult.OK(o);
    }

    /**
     * redis发布消息
     */
    @PostMapping(value = "/message")
    public String sendMessage(String message) {
        boolean redispublishtest = redisUtil.publish("redispublishtest", message);
        return redispublishtest ? "消息:" + message + "发送成功" : "消息：" + message + "发送失败";
    }

    /**
     * 模拟发送手机验证码
     */
    @PostMapping(value = "/vcode")
    public String sendVerifyCode(String mobile){
        redisUtil.setString("vcode"+mobile, "123456",10);
        return "验证码发送成功";
    }

    /**
     * 模拟接收手机验证码
     */
    @GetMapping(value = "/vcode")
    public String getVerifyCode(String mobile){
        String hash = redisUtil.getString("vcode"+mobile);
        return hash;
    }
}
~~~

