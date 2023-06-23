import request from '@/utils/request'
// import store from '@/store/index.js'

export const getuser = function(data) {
  return request.post('/v1_0/authorizations', data) //   /v1_0/authorizations
}

export const getsms = function(mobeil) {
  return request.get(`/v1_0/sms/codes/${mobeil}`) //   /v1_0/authorizations
}

export const getuserinfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.userToken.token}`
    // }

  })
}

// 获取用户频道列表
export const loaduserlist = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'get'
  })
}

// 封装关注用户
export const addfollow = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 封装取消关注
export const deletfollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 获取用户个人资料
export const getuserporfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 获取用户个人资料
export const changeuserpofile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 获取用户个人资料
export const changeuserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
