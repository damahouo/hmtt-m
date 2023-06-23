<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(item,index) in Suggestions" :key="index">
      <div slot="title" v-html="heightlight(item)" @click="onsearch(item)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'searchSugeest',
  data() {
    return {
      // 获取到的搜索建议存入数组中
      Suggestions: []
    }
  },
  created() { }, // 生命周期
  methods: {
    async loadSearchSuggest(q) {
      try {
        const { data: { data: { options } } } = await getSearchSuggestions(q)
        this.Suggestions = options
      } catch (err) {
        this.$toast('请求失败请稍后重试')
      }
    },
    // 定义一个高亮函数，传入整个字符串
    heightlight(str) {
      // 定义高亮的部分，为一个html标签，加上相关的类名
      const heightlightStr = `<span class="active">${this.searchText}</span>`
      // 正则匹配的规则，因为需要传入数据，所以要new RegExp(需要匹配的数据，相关规则)
      const reg = new RegExp(this.searchText, 'gi') // g代表全局i代表不区分字母大小写
      // 利用字符串的替换方法，将需要高亮的部分替换为html标签，利用v-html解析：<div slot="title" v-html="heightlight(item)"></div>
      return str.replace(reg, heightlightStr)
    },
    onsearch(item) {
      // 添加点击事件，触发父组件的搜索事件,将点击的数据传递给父组件
      this.$emit('onsearch', item)
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
  watch: {
    searchText: {
      // handler(value) {
      //   this.loadSearchSuggest(value)
      // },
      handler: debounce(function(value) {
        this.loadSearchSuggest(value)
      }, 1000),
      immediate: true // 表示数字有变化就触发，false表示数据第一次改变不会触发函数
    }
  }
}

</script>
<style lang='less' scoped>
.search-suggestion {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>
