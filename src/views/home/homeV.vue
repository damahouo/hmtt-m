<template>

  <div class="home-contanner">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar class="home-tabbar" route placeholder>

      <van-tabbar v-model="active" placeholder>
        <van-tabbar-item class="toutiao toutiao-shouye" to="/layOut">
          <span>首页</span>
        </van-tabbar-item>

        <van-tabbar-item class="toutiao toutiao-wenda" to="qa">
          <span>问答</span>
        </van-tabbar-item>

        <van-tabbar-item class="toutiao toutiao-shipin" to="video">
          <span>视频</span>
        </van-tabbar-item>

        <van-tabbar-item class="toutiao toutiao-wode" to="my">
          <span>{{userToken? '我的' :'未登录'}}</span>
        </van-tabbar-item>

      </van-tabbar>

    </van-tabbar>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'homeV',
  data() {
    return {
      active: 3
    }
  },
  computed: {
    ...mapState(['userToken'])
  }
}
</script>

<style lang="less" scoped>
.home-contanner {
  padding-bottom: 100px;
  .home-tabbar {
    .toutiao {
      font-size: 40px;
      padding-top: 5px;
      span {
        font-size: 15px;
      }
    }
  }
}
</style>
