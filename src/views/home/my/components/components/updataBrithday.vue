<template>
  <div>
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="success" @cancel="$emit('close')" />
  </div>
</template>

<script>
import { changeuserpofile } from '@/api/getuser'
import dayjs from 'dayjs'
export default {
  name: 'updataBrithday',
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  created() { }, // 生命周期
  methods: {
    async success() {
      const currentDates = dayjs(this.currentDate).format('YYYY-MM-DD')

      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        await changeuserpofile({
          birthday: currentDates
        })
        this.$emit('input', currentDates)
        this.$toast.success('更新生日成功啦！')
      } catch { this.$toast('请求失败请重试') }
      this.$emit('close')
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {
    value: {
      type: String,
      require: true
    }
  }, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  provide: function() { return {} }, // 给所有的后代子组件传递一个参数,后代使用inject:['数据名']接收。依赖注入
  model: {} // 修改数据双向绑定,只能绑定一个数据,子组件props接收,input事件传修改数据
}

</script>
<style lang='less' scoped>
</style>
