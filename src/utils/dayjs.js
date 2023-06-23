import dayjs from 'dayjs'
import Vue from 'vue'

// 加载中文语言包 es6 语法
import 'dayjs/locale/zh-cn'

// 配置需要加载的插件 得到某时间距离当前时间XXX前 在RelativeTime插件模块中
import relativeTime from 'dayjs/plugin/relativeTime'

// 全局使用
dayjs.locale('zh-cn')
// var relativeTime = require('dayjs/plugin/relativeTime') 我们需要修改为es6语法
dayjs.extend(relativeTime)

// 暴露一个方法 改方法得到一个时间str 返回该时间距离当前时间多久
export const dayformat = (datStr) => {
  return dayjs().to(dayjs(datStr))
}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
