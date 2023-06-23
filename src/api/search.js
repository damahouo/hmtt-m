// 获取搜索相关数据
import request from '@/utils/request.js'

// 封装获取请求文章方法
export const getSearchSuggestions = (q) => {
  return request({
    method: 'get',
    url: '/v1_0/suggestion',
    // 请求需要携带的数据
    params: {
      q
    }
  })
}
// 获取搜索结果请求
export const getSearchResu = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/search',
    // 请求需要携带的数据
    params
  })
}
