/**
 * 网络请求封装工具类
 * get post
 *
 */
import qs from "querystring";

export function httpGet(url) {
    const result = fetch(url);
    return result;
}

export function httpPost(url,params) {
    const result = fetch(url,{
        method:'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json,text/plain,*/*'
        },
        body:qs.stringify(params)
    })
}