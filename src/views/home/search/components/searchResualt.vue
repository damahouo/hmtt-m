<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResu } from '@/api/search.js'
export default {
  name: 'searchResualt',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
      per_page: 20
    }
  },
  created() { }, // 生命周期
  methods: {
    async onLoad() {
      try {
        // 请求数据
        const { data: { data: { results } } } = await getSearchResu({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })

        this.list.push(...results)
        // 请求结束修改请求状态，页码加一用于下次请求
        this.page++
        this.loading = false
        // 判断返回数据是否为空，为空代表已经没有数据了
        if (!results.length) {
          this.finished = true
        }
      } catch {
        this.loading = false
        this.error = true
      }
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {
    searchText: {
      type: String,
      require: true

    }
  }, // 数据是对象形式，需要设置type 和 request是否必须
  watch: {}
}

</script>
<style lang='less' scoped>
</style>
