<!-- 将关注按钮封装成一个组件，父组件需要传递两个参数，一个是是否关注的布尔值，一个是关注作者的id  -->
<!-- 此组件的父组件需要接收一个自定义事件 传递过去的参数为是否关注的布尔值  -->
<template>
  <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-if="!article_is_followed" @click="onfollow" :loading="followloading">关注</van-button>
  <van-button class="follow-btn" round size="small" v-else @click="onfollow" :loading="followloading">已关注</van-button>
</template>

<script>
import { deletfollow, addfollow } from '@/api/getuser.js'
export default {
  name: 'followUser',
  data() {
    return {
      followloading: false
    }
  },
  created() { }, // 生命周期
  methods: {
    async onfollow() {
      this.followloading = true // 请求之后立马展示loading 状态
      try {
        if (this.article_is_followed) {
          // 已关注，请求取消关注
          const { data } = await deletfollow(this.articleId)
          console.log(data)
        } else {
          // 未关注 ，请求关注
          const { data } = await addfollow(this.articleId)
          console.log(data)
        }
        // 此处会向父组件发送一个自定义事件，父组件接收 处理后的关注状态并更新给自己的数据
        this.$emit('changefollow', !this.article_is_followed)
      } catch (err) {
        let message = '请求失败请重试'
        if (err.response && err.response.status === 400) {
          message = '您无法关注自己！'
        }
        this.$toast(message)
      }
      this.followloading = false // 请求结束之后立马关闭loading 状态
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数

  props: {
    // 需要从父组件接收的两个值 1 是否关注的布尔值 2 关注的作者id
    article_is_followed: {
      type: Boolean,
      require: true
    },
    articleId: {
      type: [String, Number, Object],
      require: true
    }
  }, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {} // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
}

</script>
<style lang='less' scoped>
</style>
