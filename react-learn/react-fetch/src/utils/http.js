/**
 * 网络请求封装工具类
 * get post
 *
 */
import qs from "querystring";


/**
 * 封装get请求
 * @param url
 * @returns {Promise<Response>}
 */
export function httpGet(url) {
    const result = fetch(url);
    return result;
}


/**
 * 封装post请求
 * @param url
 * @param params
 */
export function httpPost(url,params) {
    const result = fetch(url,{
        method:'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json,text/plain,*/*'
        },
        body:qs.stringify(params)
    })

    return result;
}