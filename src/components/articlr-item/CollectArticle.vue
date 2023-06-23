<!-- 收藏组件 -->
<template>
  <!-- <div> -->
  <!-- <van-icon loading color="#777" :name=  /> -->
  <van-button :icon="value?'star':'star-o'" :class="{collected:value}" :loading="loading" @click="oncolled" />
  <!-- </div> -->
</template>

<script>
import { deletcollced, addcollced } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async oncolled() {
      this.loading = true
      try {
        let message = '收藏成功'
        // 已收藏，取消收藏
        if (this.value) {
          await deletcollced(this.articleId)
          message = '已取消收藏'
        } else {
          // 未收藏，请求收藏
          await addcollced(this.articleId)
          message = '收藏成功'
        }
        this.$toast.success(message)
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('请求失败请重试！')
      }
      this.loading = false
    }
  }, // 方法
  created() { }, // 生命周期
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {
    value: {
      type: Boolean,
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
.van-icon-star {
  &::before {
    color: #ffa500 !important;
  }
}
.van-button--default {
  border: 0.02667rem solid #fff;
}
</style>
