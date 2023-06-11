<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-wenda"></i>
      <van-button plain type="primary">朴素按钮</van-button>
      <van-button plain type="info">朴素按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
</style>
