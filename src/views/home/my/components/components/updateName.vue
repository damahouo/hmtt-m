<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="标题" left-text="返回" right-text="完成" left-arrow @click-left="$emit('close')" @click-right="success" />
    <!-- 导航栏 -->

    <!-- 输入框 -->
    <div class="van-cells">
      <van-field v-model.trim="message" rows="2" autosize type="textarea" maxlength="10" placeholder="请输入昵称" show-word-limit />
    </div>
    <!-- 输入框 -->
  </div>
</template>

<script>
import { changeuserpofile } from '@/api/getuser'
export default {
  name: 'updateName',
  data() {
    return {
      message: ''
    }
  },
  created() { }, // 生命周期
  methods: {
    async success() {
      // console.log(this.message)
      if (!this.message) {
        return this.$toast('不能为空')
      }
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        await changeuserpofile({
          name: this.message
        })
        this.$emit('changename', this.message)
        this.$toast.success('更新昵称成功啦！')
      } catch { this.$toast('请求失败请重试') }
      this.$emit('close')
      this.message = ''
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {}, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  provide: function() { return {} }, // 给所有的后代子组件传递一个参数,后代使用inject:['数据名']接收。依赖注入
  model: {} // 修改数据双向绑定,只能绑定一个数据,子组件props接收,input事件传修改数据
}

</script>
<style lang='less' scoped>
.van-cells {
  padding: 20px;
}
</style>
