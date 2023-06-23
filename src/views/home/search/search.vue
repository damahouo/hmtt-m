<!-- 点击搜索框之后展示的页面 -->
<template>
  <div class="search-Chontainner">
    <!-- action="/" 表示ios系统会出现搜索按键 -->
    <!-- 搜索栏目 -->
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#3296fa" @focus="isShowResualt=false" />
      <!-- 获得焦点时，将展示搜索结果隐藏 -->
    </form>
    <!-- 搜索栏目 -->
    <!-- 搜索结果 -->
    <!-- 判断有没有搜索结果，有结果，展示： -->
    <searchResualt v-if="isShowResualt" :searchText="searchText"></searchResualt>
    <!-- 搜索结果 -->

    <!-- 搜索建议 -->
    <!-- 没有搜索结果，但是输入框有文字 展示： -->
    <!-- 监听 onsearch事件，接收从子组件点击事件中传递过来的参数，触发本组件的onSearch事件-->
    <searchSugeest v-else-if="searchText" :searchText="searchText" @onsearch="onSearch"></searchSugeest>
    <!-- 搜索建议 -->

    <!-- 搜索历史 -->
    <!-- 输入框文字都没有，展示： -->
    <searchHistory v-else :searchHistorys="searchHistorys" @deletHistorStr="deletHistorStr" @search="onSearch"></searchHistory>
    <!-- 搜索历史 -->

    <!-- 总结：展示结果由浅到深分为三层，一默认展示搜索历史，二输入内容展示搜索建议，三确认搜索展示搜索结果。 所有由深到浅判断。 -->
    <!-- 三 定义一个布尔值，默认未搜索结果为false不展示，按下确认搜索之后改为true展示。 -->
    <!-- 二 搜索结果不展示，判断输入框是否有内容，没有内容不展示 -->
    <!-- 一 放到最后一级展示，二三不通过，即展示一 -->
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchSugeest from './components/searchSugeest.vue'
import searchResualt from './components/searchResualt.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchV',
  data() {
    return {
      searchText: '',
      isShowResualt: false,
      searchHistorys: getItem('searchHistory') || []
    }
  },
  created() { }, // 生命周期
  methods: {
    onSearch(val) {
      // 本组件search事件触发后，让搜索框的文字变为子组件传递过来的参数
      this.searchText = val
      // 展示搜索结果组件
      this.isShowResualt = true
      // 储存展示的搜索记录
      const index = this.searchHistorys.indexOf(val)
      if (index === -1) {
        // 判断原数组内有没有这个搜索词条 没有的话就新增该词条
        this.searchHistorys.unshift(val)
      } else {
        // 有的话就删除该词条，再新增该词条
        this.searchHistorys.splice(index, 1)
        this.searchHistorys.unshift(val)
      }
    },
    onCancel() {
      this.$router.back()
    },
    deletHistorStr(val) {
      if (!val) {
        this.searchHistorys = []
      }
      const index = this.searchHistorys.indexOf(val)
      this.searchHistorys.splice(index, 1)
    }
  }, // 方法
  components: {
    searchHistory,
    searchSugeest,
    searchResualt
  }, // 注册组件
  computed: {

  }, // 计算函数
  props: {}, // 数据是对象形式，需要设置type 和 request是否必须
  watch: {
    searchHistorys(value) {
      setItem('searchHistory', value)
    }
  }
}

</script>
<style lang='less' scoped>
.search-Chontainner {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }

  .van-search {
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>
