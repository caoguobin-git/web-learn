# Spring Cloud Oauth2自定义token位置和自定义消息返回格式

[TOC]

## 一、自定义token在请求中的位置

> **默认情况下：token是放在请求头中的，查看源码可以发现，token的抽取是通过接口TokenExtractor的实现类BearerTokenExtractor从请求头中抽取的，如果想自定token存储位置，只需要自定义一个token抽取类实现这个接口即可，代码参考BearerTokenExtractor。实现流程如下：**

### 1.1 自定义Token抽取类

~~~java
/** 示例代码 **/
public class CustomTokenExtractor implements TokenExtractor {
    @Override
    public Authentication extract(HttpServletRequest request) {
        //具体实现参见BearerTokenExtractor
        return null;
    }
}
~~~



### 1.2 配置ResourceServer使用此抽取类

> **在ResourceServerConfig配置类中配置resources.tokenExtractor(customTokenExtractor);即可**

## 二、自定义Token返回格式（认证服务器）

### 2.1 自定义Token返回格式

> 对于需要自定义Token返回格式的情况，可以重写获取token的方法，即自定义controller接口实现token获取功能。
>
> * 实际上还是调用TokenEndpoint中的方法，获取到数据之后进行重新封装。
>

~~~java
/**
 * 重写token获取方法，实现token消息自定义
 */
@RequestMapping(value = "/oauth")
@RestController
public class OauthController {

    @Autowired
    private TokenEndpoint tokenEndpoint;

    @GetMapping(value = "/token")
    public JsonResult getAccessToken(Principal principal, @RequestParam Map<String,String> params) throws HttpRequestMethodNotSupportedException {
        return postAccessToken(principal, params);
    }

    @PostMapping(value = "/token")
    public JsonResult postAccessToken(Principal principal, @RequestParam Map<String,String> params) throws HttpRequestMethodNotSupportedException {
        return custom(tokenEndpoint.postAccessToken(principal, params).getBody());
    }

    private JsonResult custom(OAuth2AccessToken token) {
        //将token中的增强消息封装到map中！！！
        Map<String,Object> resultMap=new LinkedHashMap<>(token.getAdditionalInformation());
        //将token信息封装到map中
        resultMap.put("accessToken", token.getValue());
        resultMap.put("tokenType", token.getTokenType());
        resultMap.put("expiresIn",token.getExpiresIn());
        resultMap.put("refreshToken",token.getRefreshToken().getValue());
        resultMap.put("scope",token.getScope());
        //返回自定义结果
        return JsonResult.OK(resultMap);
    }

    @RequestMapping(value = "/error")
    public String errorPage(){
        return "error page";
    }
}
~~~

> 效果如下：

~~~json
{
    "code": "10000",
    "message": "ok",
    "data": {
        "hello": "world",
        "zidingyi": "hahahha",
        "消息": "这是一个自定义消息",
        "authorities": [
            {
                "authority": "ADMIN"
            },
            {
                "authority": "ALL_USER"
            },
            {
                "authority": "USER"
            }
        ],
        "accessToken": "a4480acc-ce8f-4b6e-8aee-b64cda335fa9",
        "tokenType": "bearer",
        "expiresIn": 10799,
        "refreshToken": "070f6390-b20e-409a-9d65-b64d9aefa9f0",
        "scope": [
            "server",
            "select"
        ]
    }
}
~~~



### 2.2 使用TokenEnhancer增加消息返回字段

> 默认返回的token数据内容可能不满足要求，我们可以通过实现TokenEnhancer接口自定义一个Token增强器返回配置到认证服务器中，自定义增加的消息字段(如用户权限、名称等)。
>

### 2.2.1 自定义TokenEnhancer

~~~java
@Component
public class CustomTokenEnhancer implements TokenEnhancer {
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        //强制转换
        DefaultOAuth2AccessToken token= (DefaultOAuth2AccessToken) accessToken;
        //通过authentication可以获取到用户信息
        Collection<? extends GrantedAuthority> authorities = authentication.getUserAuthentication().getAuthorities();
        
        //设置自定义返回字段
        Map<String,Object> map=new LinkedHashMap<>();
        map.put("hello", "world");
        map.put("zidingyi", "hahahha");
        map.put("消息", "这是一个自定义消息");
        map.put("authorities",authorities);
        //将自定义返回字段添加到token的AdditionalInformation中
        token.setAdditionalInformation(map);
        返回token
        return token;
    }
}
~~~

### 2.2.2 配置认证服务器使用自定义TokenEnhancer

~~~java
@Autowired
private CustomTokenEnhancer customTokenEnhancer;

@Override
public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
    endpoints.tokenStore(new InMemoryTokenStore())
             .authenticationManager(authenticationManager)
             .reuseRefreshTokens(false);
    //配置使用自定义TokenEnhancer
    endpoints.tokenEnhancer(customTokenEnhancer);
}
~~~

### 2.3 效果

~~~json
{
    "access_token":"bea9d965-f2ab-4e84-a40f-9f309f3dd188",
    "token_type":"bearer",
    "refresh_token":"26aed74f-a8cd-493c-98bb-7cceb5119558",
    "expires_in":3599,
    "scope":"server select",
    "hello":"world",
    "zidingyi":"hahahha",
    "消息":"这是一个自定义消息",
    "authorities":[
        {
            "authority":"ADMIN"
        },
        {
            "authority":"ALL_USER"
        },
        {
            "authority":"USER"
        }
    ]
}
~~~





## 三、自定义验证失败返回信息（认证服务器）

### 3.1 默认处理器

> 默认情况是使用WebResponseExceptionTranslator接口的实现类DefaultWebResponseExceptionTranslator对抛出的异常进行处理；所以可以通过WebResponseExceptionTranslator接口来入手，实现接口的方法对异常进行处理。

### 3.2 定义继承OAuth2Exception的异常类

~~~java
/** 示例代码 **/
/**
 * @Description: 异常处理类
 */
@JsonSerialize(using = UserOAuth2ExceptionSerializer.class)
public class UserOAuth2Exception extends OAuth2Exception {
    private Integer status = 400;

    public UserOAuth2Exception(String message, Throwable t) {
        super("用户名或密码错误", t);
        status = ((OAuth2Exception)t).getHttpErrorCode();
    }

    public UserOAuth2Exception(String message) {
        super(message);
    }
    @Override
    public int getHttpErrorCode() {
        return status;
    }
}
~~~



### 3.3 定义序列化实现类

~~~java
/** 示例代码 **/
/**
 * @Description: 序列化异常类
 */
public class UserOAuth2ExceptionSerializer extends StdSerializer<UserOAuth2Exception> {
    protected UserOAuth2ExceptionSerializer() {
        super(UserOAuth2Exception.class);
    }
    @Override
    public void serialize(UserOAuth2Exception e, JsonGenerator generator, SerializerProvider serializerProvider) throws IOException {
        generator.writeStartObject();
        generator.writeObjectField("status", e.getHttpErrorCode());
        String message = e.getMessage();
        if (message != null) {
            message = HtmlUtils.htmlEscape(message);
        }
        //自定义序列化方式
        generator.writeStringField("message", message);
        if (e.getAdditionalInformation()!=null) {
            for (Map.Entry<String, String> entry : e.getAdditionalInformation().entrySet()) {
                String key = entry.getKey();
                String add = entry.getValue();
                generator.writeStringField(key, add);
            }
        }
        generator.writeEndObject();
    }
}
~~~



### 3.4 自定义实现异常转换类

~~~java
/** 示例代码 **/
/**
 * @Description: 资源服务器异常自定义捕获
 */

@Component
public class UserOAuth2WebResponseExceptionTranslator implements WebResponseExceptionTranslator {
    private ThrowableAnalyzer throwableAnalyzer = new DefaultThrowableAnalyzer();

    @Override
    public ResponseEntity<OAuth2Exception> translate(Exception e) throws Exception {
        Throwable[] causeChain = this.throwableAnalyzer.determineCauseChain(e);
        Exception ase = (OAuth2Exception)this.throwableAnalyzer.getFirstThrowableOfType(OAuth2Exception.class, causeChain);
        System.out.println(ase);
        System.out.println(ase.getClass());
        //异常链中有OAuth2Exception异常
        if (ase != null) {
            return this.handleOAuth2Exception((OAuth2Exception)ase);
        }
        //身份验证相关异常
        ase = (AuthenticationException)this.throwableAnalyzer.getFirstThrowableOfType(AuthenticationException.class, causeChain);
        if (ase != null) {
            return this.handleOAuth2Exception(new UserOAuth2WebResponseExceptionTranslator.UnauthorizedException(e.getMessage(), e));
        }
        //异常链中包含拒绝访问异常
        ase = (AccessDeniedException)this.throwableAnalyzer.getFirstThrowableOfType(AccessDeniedException.class, causeChain);
        if (ase instanceof AccessDeniedException) {
            return this.handleOAuth2Exception(new UserOAuth2WebResponseExceptionTranslator.ForbiddenException(ase.getMessage(), ase));
        }
        //异常链中包含Http方法请求异常
        ase = (HttpRequestMethodNotSupportedException)this.throwableAnalyzer.getFirstThrowableOfType(HttpRequestMethodNotSupportedException.class, causeChain);
        if(ase instanceof HttpRequestMethodNotSupportedException){
            return this.handleOAuth2Exception(new UserOAuth2WebResponseExceptionTranslator.MethodNotAllowed(ase.getMessage(), ase));
        }
        return this.handleOAuth2Exception(new UserOAuth2WebResponseExceptionTranslator.ServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), e));
    }

    private ResponseEntity<OAuth2Exception> handleOAuth2Exception(OAuth2Exception e) throws IOException {
        int status = e.getHttpErrorCode();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Cache-Control", "no-store");
        headers.set("Pragma", "no-cache");
        if (status == HttpStatus.UNAUTHORIZED.value() || e instanceof InsufficientScopeException) {
            headers.set("WWW-Authenticate", String.format("%s %s", "Bearer", e.getSummary()));
        }
        UserOAuth2Exception exception = new UserOAuth2Exception(e.getMessage(),e);
        ResponseEntity<OAuth2Exception> response = new ResponseEntity(exception, headers, HttpStatus.valueOf(status));
        return response;
    }


    private static class MethodNotAllowed extends OAuth2Exception {
        public MethodNotAllowed(String msg, Throwable t) {
            super(msg, t);
        }
        @Override
        public String getOAuth2ErrorCode() {
            return "method_not_allowed";
        }
        @Override
        public int getHttpErrorCode() {
            return 405;
        }
    }

    private static class UnauthorizedException extends OAuth2Exception {
        public UnauthorizedException(String msg, Throwable t) {
            super(msg, t);
        }
        @Override
        public String getOAuth2ErrorCode() {
            return "unauthorized";
        }
        @Override
        public int getHttpErrorCode() {
            return 401;
        }
    }

    private static class ServerErrorException extends OAuth2Exception {
        public ServerErrorException(String msg, Throwable t) {
            super(msg, t);
        }
        @Override
        public String getOAuth2ErrorCode() {
            return "server_error";
        }
        @Override
        public int getHttpErrorCode() {
            return 500;
        }
    }

    private static class ForbiddenException extends OAuth2Exception {
        public ForbiddenException(String msg, Throwable t) {
            super(msg, t);
        }
        @Override
        public String getOAuth2ErrorCode() {
            return "access_denied";
        }
        @Override
        public int getHttpErrorCode() {
            return 403;
        }
    }
}
~~~



### 3.5 将自定义异常处理类添加到认证服务器配置

~~~java
/** 示例代码 **/
@Override
public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
	endpoints.tokenStore(new InMemoryTokenStore())
        .authenticationManager(authenticationManager)
        .reuseRefreshTokens(false)
        //自定义验证失败返回信息
        .exceptionTranslator(webResponseExceptionTranslator)
        .allowedTokenEndpointRequestMethods(HttpMethod.GET, HttpMethod.POST);
}
~~~



## 四、自定义token验证失败返回信息（资源服务器）

> **自定义验证失败的流程是：用自定义的验证失败处理类替换默认的失败处理类即可**

### 4.1 自定义验证失败返回信息处理类

~~~java
/** 示例代码 **/
@Component
public class AuthExceptionEntryPoint implements AuthenticationEntryPoint
{

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws ServletException {
        Map<String, Object> map = new HashMap<String, Object>();
        Throwable cause = authException.getCause();

        response.setHeader("Content-Type", "application/json;charset=UTF-8");
        try {
            if(cause instanceof InvalidTokenException) {
                response.getWriter().write(JsonResult.ERROR(HttpStatus.UNAUTHORIZED.value(), "token验证失败，请重新登录").toString());
            }else if (cause instanceof UnauthorizedUserException){
                response.getWriter().write(JsonResult.ERROR(HttpStatus.UNAUTHORIZED.value(), "请登录后重试").toString());
            }else {
                response.getWriter().write(JsonResult.ERROR(HttpStatus.UNAUTHORIZED.value(), "请登录后重试").toString());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
~~~

### 4.2 配置ResourceServer使用此验证失败处理类

> **在ResourceServerConfig配置类中配置resources.authenticationEntryPoint(authExceptionEntryPoint);即可**

## 五、自定义授权失败返回信息（资源服务器）

> **自定义验证失败的流程是：用自定义的授权失败处理类替换默认的失败处理类即可**

### 5.1 自定义授权失败处理类

~~~java
/** 示例代码 **/
@Component("customAccessDeniedHandler")
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException)
            throws IOException, ServletException {
        response.setHeader("Content-Type", "application/json;charset=UTF-8");
        try {
            response.getWriter().write(JsonResult.ERROR(HttpStatus.FORBIDDEN.value(), "无权访问此模块").toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
~~~

### 5.2 配置ResourceServer使用此授权失败处理类即可

> **在ResourceServerConfig中配置resources.accessDeniedHandler(customAccessDeniedHandler);即可**

## 六、配置Client验证错误的返回代码