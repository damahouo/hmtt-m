<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon name="cross" size="18" @click="$router.back()" />
      </template>

    </van-nav-bar>

    <!-- 登陆表单 -->
    <van-form @submit="onSubmit" ref="loginInfo">
      <van-field name="mobile" placeholder="请输入手机号" v-model.trim=user.mobile :rules="fromRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field name="code" placeholder="请输入验证码" v-model.trim=user.code :rules="fromRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*60" v-if="issendingSms" format=" ss 秒后可重新获取" @finish="issendingSms=false" />
          <van-button class="send-sms-btn" v-else native-type="button" size="small" type="default" round @click="ongetSms">获取验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getuser, getsms } from '@/api/getuser.js'

export default {
  name: 'loginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      fromRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入六位数验证码' }
        ]
      },
      issendingSms: false
    }
  },
  methods: {
    async onSubmit() {
      // 获取表单数据
      const user = this.user
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true,
        duration: 0
      })
      // 表单验证

      // 提交表单请求登录
      try {
        const { data } = await getuser(user)
        console.log(data)
        this.$toast.success('登陆成功')
        // 根据请求响应结果处理后续操作
        // 将token值存入本地数据和store仓库中
        this.$store.commit('setuserToken', data.data)
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    },
    async ongetSms() {
      // 单独验证表单手机号
      try {
        await this.$refs.loginInfo.validate('mobile')
      } catch (err) {
        return this.$toast.fail('请输入正确的手机号')
      }
      // 验证通过显示60秒倒计时
      this.issendingSms = true

      // 发送请求
      try {
        const { data } = await getsms(this.user.mobile)
        // 登陆成功后获取返回的data内的token
        console.log(data)
        this.$toast.success('发送成功')
      } catch (err) {
        this.issendingSms = false
        if (err.response.status === 429) { this.$toast.fail(err.response.data.message) } else this.$toast.fail('系统繁忙，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .page-nav-bar {
    background-color: #3296fa;
  }
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 160px;
    height: 46px;
    line-height: 46px;

    font-size: 10px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .van-icon-cross {
    color: #fff;
  }
}
</style>
