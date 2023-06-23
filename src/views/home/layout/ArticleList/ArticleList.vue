<template>
  <div class="articlcontainer">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :finished-text="finishedtext" loading-text="请稍等哦欧尼酱">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
        <ArticleItem v-for="(item,index) in list" :key="index" :article="item">
        </ArticleItem>
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
    <div class="box">

    </div>
  </div>
</template>

<script>
import { getarticle } from '@/api/article.js'
import ArticleItem from '@/components/articlr-item/AritecleItem.vue'
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // 设置请求下一页的时间戳默认为空
      timestamp: '',
      error: false, // 控制加载失败的提示
      refreshing: false, // 控制下拉刷新的状态的
      finishedtext: '加载完成'
    }
  },
  created() { },
  methods: {
    // 定义获取文章方法
    // async onload() {
    //
    // }
    async onLoad() {
      try {
        const { data: { data } } = await getarticle({
          // 此为传参 传递获取文章的id 和当前的时间戳
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now() // 每次请求先判断有没有下一页的时间戳 如果有就会请求下一个的时间戳，没有就会请求Date.now获取第一页的数据
        })

        // 本次数据 合并到数组中
        // x修改list之后记得修改样式里的list 因为上方拿不到list内的数据就会报错
        if (data.results) { // 每次请求后判断是否有返回数据  若没有返回数据就代表数据库内的数据为空了
          this.list.push(...data.results) // 请求回来的数据推送到list数组中 请求回来的下一页时间戳存到data数据中
          this.timestamp = data.pre_timestamp
          // console.log(data.results, data.pre_timestamp)
          // 加载完之后需要更改loading的状态
          this.loading = false
        } else {
          // 若没有数据了 就修改finished状态为true
          this.finished = true
        }
        // 其实每次请求都是在请求第一页的数据，需要修改请求时的时间戳来获取下一页的数据
        // 判断数据库的数据是否加载完毕
      } catch (err) {
        // console.log('出错啦' + err)
        this.error = true
        // 请求失败之后把是否正在请求改为false
        this.loading = false
      }
    },
    async onRefresh() {
      // 获取数据
      try {
        const {
          data: {
            data: { results }
          }
        } = await getarticle({
          // 此为传参 传递获取文章的id 和当前的时间戳
          channel_id: this.channels.id,
          timestamp: Date.now() // 每次请求先判断有没有下一页的时间戳 如果有就会请求下一个的时间戳，没有就会请求Date.now获取第一页的数据
        })
        // 获取的数据推送到数组的开头
        this.list.unshift(...results)
        this.refreshing = false // 每次刷新完 将刷新状态改为否
      } catch (err) {
        this.$toast('刷新失败请重试')
        this.refreshing = false
      }
    }

  },
  components: { ArticleItem },
  computed: {},
  props: {
    // 接收这个参数 数值存着自己是哪个组件
    channels: {
      type: Object,
      require: true
    }
  },
  watch: {}
}

</script>
<style lang='less' scoped>
.articlcontainer {
  height: 80vh;
  overflow-y: auto;
  .box {
    // 给列表区域设置一个底部盒子占位
    width: 100%;
    height: 100px;
  }
}
</style>
