import {request} from "./request";

export function getUserInfoTest(openid){
  return request({
    url:'http://yingyanchaxun.com/api/search_vehicle_index.php?s=/Home/User/login&openid=oKUyh5lgomvHscMZa0_U4L3R2etU',
    method:'get'
  })
}
