// 获取文章数据模块
import request from '@/utils/request.js'

// 封装获取请求文章方法
export const getarticle = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    // 请求需要携带的数据
    params
  })
}
// 获取文章详情
export const getarticleById = (articleId) => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
    // 请求需要携带的数据

  })
}

// 收藏文章
export const addcollced = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    // 请求需要携带的数据
    data: {
      target
    }

  })
}

// 取消收藏
export const deletcollced = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
    // 请求需要携带的数据

  })
}

// 点赞文章
export const addlike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    // 请求需要携带的数据
    data: {
      target
    }

  })
}

// 取消点赞文章
export const deletlike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
    // 请求需要携带的数据

  })
}

// 文章评论点赞
export const addCommentlike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    // 请求需要携带的数据
    data: {
      target
    }

  })
}
// 取消文章评论点赞
export const deletCommentlike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`

  })
}

// 对文章发布评论
export const addarticlecomment = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    // 请求需要携带的数据
    data

  })
}
