import {request} from "./request";

export function getGoodsDetail(id){
  return request({
    url:'/detail?iid='+id,
  })
}
