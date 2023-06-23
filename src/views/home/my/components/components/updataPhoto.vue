<template>
  <div class="updat-Photo">
    <img :src="img" class="img" ref="img">

    <div class="text">
      <div clas="quxiao" @click="$emit('close')">取消</div>
      <div clas="wancheng" @click="getPhoto">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { changeuserPhoto } from '@/api/getuser'

export default {
  name: 'updataPhoto',
  data() {
    return {
      cropper: null
    }
  },
  created() { }, // 生命周期
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 查看模式 0裁剪框可以扩展到画布外面 123会将裁剪框限制为画布大小 2或3的viewMode将另外将画布限制为容器 如果画布和容器的比例相同，则2-3 之间没有差别
      dragMode: 'move', // 拖动模式crop模式默认 会重新定义裁剪大小 move模式图片可以拖动 none裁剪器可以拖动，画布不能拖动
      aspectRatio: 1, // 截图器的比例 默认16/9 因为这里要展示正方形 所以1/1 简写为1
      autoCropArea: 1, // 自动截取比例为1 画布大小
      cropBoxMovable: false, // 截图器是否可以移动
      cropBoxResizable: false, // 截图器是否可以缩放
      background: false, // 元素格的背景有无
      movable: true // 配置画布是否可以移动
    })
  }, // 生命周期
  methods: {
    getPhoto() {
      try {
        this.$toast.loading({
          message: '保存中',
          forbidClick: true,
          duration: 0
        })
        // console.log(this.cropper.getData()) //基于服务端裁切的方法获取裁切数据

        // 纯客户端裁切的方法获取裁切数据

        this.cropper.getCroppedCanvas().toBlob(async blob => {
          // 如果接口要求 Content-Type 是 application/json
          // 则传递普通的javaScript对象
          // changeuserPhoto({
          //   photo: blob
          // })

          // 如果接口要求 Content-Type 是 multipart/form-data
          // 则你必须传FormData 对象
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await changeuserPhoto(formData)
          console.log(data)
          // 关闭弹出层
          this.$emit('close')
          // 更新父组件视图
          this.$emit('updata-photo', data.data.photo)
          this.$toast('更新头像成功！')
        })
      } catch {
        this.$toast('请求失败请稍后重试')
      }
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {}, // 计算函数
  props: {
    img: {
      type: [String, Object],
      require: true
    }
  }, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  provide: function() { return {} }, // 给所有的后代子组件传递一个参数,后代使用inject:['数据名']接收。依赖注入
  model: {} // 修改数据双向绑定,只能绑定一个数据,子组件props接收,input事件传修改数据
}

</script>
<style lang='less' scoped>
.updat-Photo {
  background-color: #000;
  height: 100%;
  .text {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: space-between;
    font-size: 30px;
    color: #fff;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.img {
  // display: block;       // 确保图片是块元素
  min-width: 100%;
}
</style>
