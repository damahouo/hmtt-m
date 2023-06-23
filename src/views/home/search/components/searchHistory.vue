<!-- eslint-disable vue/valid-v-show -->
<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <div class="searchHsitory">
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <div v-if="isDeletShow">
          <span @click=gethistorStr(0)>全部删除 &nbsp;&nbsp;&nbsp; </span>
          <span @click="isDeletShow=false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="isDeletShow=true" />
      </template>
    </van-cell>

    <van-cell :title="item" v-for="(item,index) in searchHistorys" :key="index" @click="search(item)">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->

      <template #right-icon>
        <van-icon name="close" @click=gethistorStr(item) v-show="isDeletShow" />
      </template>
    </van-cell>

  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  data() {
    return {
      // 定义一个状态，来控制展示删除相关按钮
      isDeletShow: false
    }
  },
  created() { }, // 生命周期
  methods: {
    gethistorStr(val) {
      this.$emit('deletHistorStr', val)
    },
    search(item) {
      this.$emit('search', item)
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {
    searchHistorys: {
      type: Array,
      require: true
    }
  }, // 数据是对象形式，需要设置type 和 request是否必须
  watch: {}
}

</script>
<style lang='less' scoped>
.searchHsitory {
  .van-icon-close {
    position: relative;
    height: 88px;
    width: 120px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    &::before {
      // position: absolute;
      top: 30px;
      left: 34px;
      z-index: 3;
      margin-right: 44px;
      margin-top: 28px;
      margin-left: 48px;
    }
  }
}
</style>
