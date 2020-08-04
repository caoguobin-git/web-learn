import {request} from "./request";

export function getHomeMultiData(type,page){
  return request({
    url:'/home/multidata',
  })
}
export function getHomeGoods(params){
  return request({
    url:'/home/data',params
  })
}
