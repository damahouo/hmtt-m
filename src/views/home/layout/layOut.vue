<template>
  <div class="layout-container">
    <!-- 头部导航栏 -->
    <van-nav-bar class="navbar" fixed placeholder>
      <van-button round type="info" slot="title" color="#5babfb" icon="search" class="searchbtn" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- 头部导航栏 -->

    <!--多标签区域  -->

    <van-tabs class="tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 根据循环渲染文章组件 -->
        <!-- 注意 需要把每次循环的item传给子组件 让子组件知道自己接收的哪个id和列表 -->
        <ArticleList :channels=item></ArticleList>
      </van-tab>

      <div class="placeholder" slot="nav-right"> &nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div slot="nav-right" class="nav-right" @click="showPopup()">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!--多标签区域  -->
    <!-- 弹出层 -->
    <van-popup v-model="show" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }">
      <ChannelEidit :my_channels="channels" :actives="active" @updataactive="updataactives"></ChannelEidit>
      <!-- 父组件在此处接收子组件传递过来的下标索引,并且定义更新active事件 -->
    </van-popup>
  </div>
</template>

<script>
import { loaduserlist } from '@/api/getuser.js'
import ArticleList from '@/views/home/layout/ArticleList/ArticleList.vue'
import ChannelEidit from '@/views/home/layout/ArticleList/ChannelEidit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'layOut',
  components: {
    ArticleList,
    ChannelEidit
  },
  props: {},
  data() {
    return {

      active: 0,
      channels: [],
      show: false

    }
  },
  computed: {
    ...mapState(['userToken'])
  },
  watch: {},
  created() {
    // 生命周期函数中添加获取频道列表的方法
    this.loadUserList()
  },
  mounted() {

  },
  methods: {
    async loadUserList() {
      // 判断本地是否有token值来判断是否已经登录
      if (this.userToken) {
        // 登录了,获取用户频道列表
        const { data: { data: { channels } } } = await loaduserlist()
        this.channels = channels
      } else {
        // 未登录，判断本地存储是否有数据
        if (getItem('userChannels')) {
          // 有数据，拿来用
          this.channels = getItem('userChannels')
        } else {
          // 没有数据，请求服务器返回的默认频道列表
          const { data: { data: { channels } } } = await loaduserlist()
          this.channels = channels
        }
      }
    },
    showPopup() {
      this.show = true
    },
    updataactives(index, isclose = true) {
      // 父组件用index接收子组件传递过来的下标,并更新到组件的active参数内

      this.active = index
      // 然后控制弹出层关闭
      if (isclose) {
        this.show = false
      }
    }
  }
}

</script>

<style lang="less" scoped>
.layout-container {
  padding-top: 82px;
}
/deep/.navbar {
  .van-nav-bar {
    background-color: #3296fa;
  }
  // background-color: #3296fa;
  max-width: unset;
  .searchbtn {
    border: none;
    color: #fff;
    width: 450px;
    height: 64px;
    font-size: 28px;
    .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }
}
/deep/.tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    right: 0;
    left: 0;
  }
  // position: fixed;
  height: 82px;
  .van-tab {
    min-width: 200px;
    color: #777;
    border-right: 1px solid #edeff3;
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    margin-bottom: 8px;
    background-color: #3296fa;
  }
  .nav-right {
    position: fixed;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 66px;
    height: 82px;
    right: 0;
    background-color: #fff;
    opacity: 0.92;
    i.toutiao {
      font-size: 33px;
      margin: 0 auto;
    }
    &:before {
      content: '';
      width: 2px;
      height: 82px;
      background: url(@/assets/gradient-gray-line.png);
      background-size: contain;
    }
    // .placeholder {
    //   flex-shrink: 0;
    //   width: 66px;
    //   height: 82px;
    //   color: red;
    // }
  }
}
</style>
