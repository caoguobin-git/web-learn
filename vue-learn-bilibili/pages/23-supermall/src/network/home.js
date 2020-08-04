import {request} from "./request";

export function getHomeMultiData(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
