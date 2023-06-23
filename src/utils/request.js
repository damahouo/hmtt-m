// 请求模块
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/' // 'https://toutiao.itheima.net/' // 'https://toutiao.itheima.net'
})

// 给（request）axios 也就是向外暴漏的对象 添加请求拦截器
request.interceptors.request.use(
  // config 形参 是本次请求的配置对象
  config => {
    // 从仓库获取token值
    const { userToken } = store.state
    // 判断用户仓库内有没有token值
    if (userToken && userToken.token) {
      // 有的话就配置请求头为token值
      config.headers.Authorization = `Bearer ${userToken.token}`
      // console.log(config)
    }
    //  注意 这里务必要返回config 配置对象，否则请求就停留在这里发不出了
    return config
  },
  error => {
    // 如果请求出错了（此时还没有发出去） 会进入这里
    return Promise.reject(error)
  }
)

// 相应拦截器

export default request
