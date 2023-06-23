import request from '@/utils/request.js'
// 获取文章评论相关api

// 获取文章评论
export const getArticleComments = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    // 请求需要携带的数据
    params
  })
}
