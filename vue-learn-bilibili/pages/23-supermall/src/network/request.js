import Axios from "axios";

export function request(config) {

  //1.创建Axios实例
  let instance = Axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  });

  //2.配置拦截器
  instance.interceptors.request.use(config=>{
    return config;
  },err=>{
    return err;
  })

  instance.interceptors.response.use(res=>{
    return res.data;
  },err=>{
    return err;
  })

  //3.发送请求并返回
  return instance(config);
}
