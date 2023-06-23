<template>
  <!-- <div> -->
  <van-button :icon="value===1?'good-job':'good-job-o'" :class="{liked:value===1}" :loading="loading" @click="onlike" />
  <!-- </div> -->

</template>

<script>
import { deletlike, addlike } from '@/api/article.js'
export default {
  name: 'likeArticle',
  data() {
    return {
      loading: false
    }
  },
  created() { }, // 生命周期
  methods: {
    async onlike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === -1) {
          // 未点赞，执行点赞
          await addlike(this.articleId)
          status = 1
        } else {
          // 已点赞，执行取消点赞
          await deletlike(this.articleId)
        }
        // 更新数据到父组件 更新视图
        this.$emit('input', status)
        this.$toast.success(status === -1 ? '已取消点赞' : '点赞成功！')
      } catch {
        this.$toast('请求失败请重试！')
      }
      this.loading = false
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {
    value: {
      type: Number,
      require: true
      // default: false
    },
    articleId: {
      type: String,
      require: true
    }
  }, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  model: {} // 修改数据双向绑定,只能绑定一个数据
}

</script>
<style lang='less' scoped>
.van-icon-good-job {
  &::before {
    color: #e5645f !important;
  }
}
.van-button--default {
  border: 0.02667rem solid #fff;
}
</style>
