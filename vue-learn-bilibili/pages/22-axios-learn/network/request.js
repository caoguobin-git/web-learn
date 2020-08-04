import Axios from "axios";

export function request(config) {

  //1.创建Axios实例
  let instance = Axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  });

  //2.配置拦截器
  //config为请求参数
  //err为错误信息
  instance.interceptors.request.use(config=>{
    console.log('来到了request拦截success中');
    document.title='加载中。。。。。';
    //如果不返回config，则请求会发送失败
    return config;
  },err=>{
    console.log('来到了request拦截failure中');
    return err;
  })

  instance.interceptors.response.use(res=>{
    console.log('来到了response拦截success中');
    document.title='成功'
    //需要返回data，否则无法获取响应信息
    return res.data;
  },err=>{
    console.log('来到了response拦截failure中');
    //alert(err.toString())
    return err;
  })

  //3.发送网络请求
  return  instance(config);




  //return new Promise((resolve, reject) => {
  //
  //  //1.创建Axios实例
  //  let instance = Axios.create({
  //    baseURL: 'http://152.136.185.210:8000/api/z8',
  //    timeout: 5000
  //  });
  //  //发送网络请求
  //  instance(config)
  //    .then(res => {
  //      resolve(res);
  //    })
  //    .catch(err => {
  //      reject(err);
  //    })
  //})
}

//  //1.创建Axios实例
//  let instance = Axios.create({
//    baseURL:'http://152.136.185.210:8000/api/z8',
//    timeout:5000
//  });
//  //发送网络请求
//  instance(config.baseConfig)
//    .then(res=>{
//      config.success(res);
//    })
//    .catch(err => {
//      config.failure(err);
//    })
//}


//export function request(config,success,failure){
//  //1.创建Axios实例
//  let instance = Axios.create({
//    baseURL:'http://152.136.185.210:8000/api/z8',
//    timeout:5000
//  });
//  //发送网络请求
//  instance(config)
//    .then(res=>{
//      success(res);
//    })
//    .catch(err => {
//      failure(err);
//    })
//}
