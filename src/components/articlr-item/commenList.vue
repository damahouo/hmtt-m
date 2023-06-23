<!-- 评论列表组件 -->
<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :immediate-check="false">
    <CommentItem v-for="(item,index) in list" :key="index" :commenitem="item" @replayshow="$emit('replayshow',$event)" />
  </van-list>
</template>

<script>
import { getArticleComments } from '@/api/comment.js'
import CommentItem from '@/views/home/layout/ArticleList/commentItem.vue'
export default {
  name: 'commenList',
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      error: false

    }
  },
  created() {
    this.onLoad()
  }, // 生命周期
  methods: {
    async onLoad() {
      try {
        // 1 请求数据
        const { data } = await getArticleComments({
          limit: 10, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          source: this.artid, // 源id，文章id或评论id
          type: this.type // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        })
        this.$emit('totalCount', data.data)
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdasdfasd')
        // }
        // 2 将获取到的数据添加到list列表中
        const results = data.data.results
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results)
        // 3 将loading 设置为false
        this.loading = false
        // 4 判断是否还有数据
        if (results.length) {
          //   有就更新下一页的数据页码
          this.offset = data.data.last_id
        } else {
          //   没有就设置finished结束
          this.finished = true
        }
        // 5 设置加载失败样式
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }, // 方法
  components: {
    CommentItem
  }, // 注册组件
  computed: {}, // 计算函数
  props: {
    artid: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  }, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  model: {} // 修改数据双向绑定,只能绑定一个数据
}

</script>
<style lang='less' scoped>
</style>
