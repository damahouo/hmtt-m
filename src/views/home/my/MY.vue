<template>
  <div class="my-container">
    <!-- 未登录显示内容 -->
    <div class="header not-login" v-if="!userToken">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobiel" src="@/assets/mobile.png" alt="">
        <span>登录 / 注册</span>
      </div>
    </div>

    <!-- 登录之后显示的 -->
    <div class="header userinfo" v-else>
      <div class="top">
        <div class="left">
          <van-image class="vantimg" round fit="cover" :src=userdata.photo />
          <span>{{ userdata.name }}</span>
        </div>
        <div class="right">
          <van-button round type="info" size="mini" color="#FFF" to="/user/profile">
            <span class="text">编辑资料</span>
          </van-button>
        </div>
      </div>
      <div class="bottom">
        <ul>
          <li class="li">
            <p class="ps">{{ userdata.art_count }}</p>
            <p>头条</p>
          </li>
          <li class="li">
            <p class="ps">{{ userdata.like_count }}</p>
            <p>关注</p>
          </li>
          <li class="li">
            <p class="ps">{{ userdata.fans_count }}</p>
            <p>粉丝</p>
          </li>
          <li class="li">
            <p class="ps">{{ userdata.follow_count }}</p>
            <p>获赞</p>
          </li>
        </ul>
      </div>
      <van-grid clickable :column-num="2" class="griditem">
        <van-grid-item icon="star-o" text="收藏" to="" class="shoucang">

        </van-grid-item>
        <van-grid-item icon="underway-o" text="历史" url="" class="lishi" />
      </van-grid>
      <!-- 消息通知 小智同学 -->
      <div class="xzandxx">
        <van-cell title="消息通知" is-link url="" />
        <van-cell title="小智同学" is-link to="" />
      </div>

      <van-cell title="退出登录" to="" class="lgout" clickable @click="lgout" />

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getuserinfo } from '@/api/getuser.js'
export default {
  name: 'MY',
  data() {
    return {
      userdata: ''
    }
  },
  computed: {
    ...mapState(['userToken'])

  },
  methods: {
    lgout() {
      this.$dialog.confirm({
        title: '',
        message: '确认退出吗？'
      })
        .then(() => {
          // 此处执行确认退出操作
          // on confirm
          // 调用vuex的方法将仓库和本地存储的值token 设置为null
          this.$store.commit('setuserToken', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 设置登录之后获取用户信息的方法
    async login() {
      try {
        const { data: { data } } = await getuserinfo()
        // 先将获取到的信息存储到data中，再使用
        this.userdata = data
        // console.log(this.userdata)
      } catch (err) {
        // 当获取信息失败时提示以下文字
        this.$toast('加载失败请稍后重试')
      }
    }
  },
  created() {
    // 每次请求数据先判断用户是否登录了，即本地有没有token值
    // 通过计算属性，动态判断
    if (this.userToken) { this.login() }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    background: url(@/assets/banner.png);
    background-size: cover;
    height: 361px;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobiel {
        width: 132px;
      }
      span {
        margin-top: 30px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .userinfo {
    .top {
      display: flex;
      align-items: center;
      height: 231px;
      // background-color: pink;
      box-sizing: border-box;
      padding: 76px 32px 23px;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;

        .vantimg {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        span {
          color: #fff;
          font-size: 30px;
        }
      }
      .right {
        /deep/.text {
          color: #000;
        }
      }
    }
    .bottom {
      height: 130px;
      // background-color: #ccc;
      /deep/ul {
        display: flex;
        justify-content: space-around;
        .li {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #fff;
          .ps {
            font-size: 36px;
            margin: 32px 0 0;
          }
          p {
            font-size: 23px;
            margin: 0;
          }
        }
      }
    }
    .griditem {
      height: 141px;
    }
    .shoucang {
      color: red;
    }
    .lishi {
      color: orange;
    }
    .xzandxx {
      margin-top: 40px;
      margin-bottom: 10px;
    }
    .lgout {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
