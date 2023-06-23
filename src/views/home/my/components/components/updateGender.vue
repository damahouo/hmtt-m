<template>
  <div>
    <van-picker title="请选择您的性别" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel" />
  </div>
</template>

<script>
import { changeuserpofile } from '@/api/getuser'
export default {
  name: 'changeGender',
  data() {
    return {
      columns: ['女', '男']
    }
  },
  created() { }, // 生命周期
  methods: {
    async onConfirm(value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)

      try {
        await changeuserpofile({
          gender: index
        })

        this.$emit('close')
        this.$toast.loading({
          message: '保存中',
          forbidClick: true,
          duration: 0
        })
        this.$toast.success('更新成功')
        console.log(index)
        this.$emit('changegender', index)
      } catch {
        this.$toast('请求失败，请重试')
      }
    },
    // onChange(picker, value, index) {
    //   this.$toast(`当前值：${value}, 当前索引：${index}`)
    // },
    onCancel() {
      this.$emit('close')
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
</style>
