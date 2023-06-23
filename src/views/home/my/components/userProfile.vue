<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar title="个人信息" class="userprofilenav">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" color="#fff" />
    </van-nav-bar>
    <!--
import { useRoute } from 'vue-router/types/composables';
 顶部导航栏 -->

    <!-- 个人信息单元格 -->

    <input type="file" ref="file" hidden @change="fileChange">

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value=user.name @click="isupdataNameshow=true" />
    <van-cell title="性别" is-link :value="user.gender === 1 ? '男' : '女' " @click="isupdatagendershow=true" />
    <van-cell title="生日" is-link :value=user.birthday @click="isupdatabrithshow=true" />
    <!-- 个人信息单元格 -->

    <!-- 编辑昵称弹出层 -->
    <van-popup v-if="isupdataNameshow" v-model="isupdataNameshow" position="bottom" :style="{ height: '50%' }">
      <updateName @close="isupdataNameshow=false" @changename="user.name=$event"></updateName>
    </van-popup>
    <!-- 编辑昵称弹出层 -->

    <!-- 编辑性别弹出层 -->
    <van-popup v-if="isupdatagendershow" v-model="isupdatagendershow" position="bottom">
      <changeGender @close="isupdatagendershow=false" @changegender="user.gender = $event"></changeGender>
    </van-popup>
    <!-- 编辑性别弹出层 -->

    <!-- 编辑生日弹出层 -->
    <van-popup v-if="isupdatabrithshow" v-model="isupdatabrithshow" position="bottom">
      <updataBrithday v-model="user.birthday" @close="isupdatabrithshow=false" />
    </van-popup>
    <!-- 编辑生日弹出层 -->

    <!-- 编辑头像弹出层 -->
    <van-popup v-if="isupdataPhotoshow" v-model="isupdataPhotoshow" position="bottom" :style="{ height: '100%' }">
      <updataPhoto :img="img" @close="isupdataPhotoshow=false" @updata-photo="user.photo=$event"></updataPhoto>
    </van-popup>
    <!-- 编辑头像弹出层 -->
  </div>
</template>

<script>
import { getuserporfile } from '@/api/getuser'
import updateName from '@/views/home/my/components/components/updateName.vue'
import changeGender from '@/views/home/my/components/components/updateGender.vue'
import updataBrithday from '@/views/home/my/components/components/updataBrithday.vue'
import updataPhoto from '@/views/home/my/components/components/updataPhoto.vue'
export default {
  name: 'userProfile',
  data() {
    return {
      user: {},
      isupdataNameshow: false,
      isupdatabrithshow: false,
      isupdatagendershow: false,
      isupdataPhotoshow: false,
      img: null
    }
  },
  created() {
    this.getuserporfiles()
  }, // 生命周期
  methods: {
    async getuserporfiles() {
      try {
        const { data } = await getuserporfile()
        console.log(data)
        this.user = data.data
      } catch {
        this.$toast('获取失败请重试')
      }
    },
    fileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      console.log(file)
      // 基于文章对象获取blob 数据
      const data = window.URL.createObjectURL(file)
      console.log(data)
      // 把data赋值给img传递给子组件 ，子组件就可以用img标签src=img 展示图片
      this.img = data
      // 重点 file-input 如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把他的value清空
      this.$refs.file.value = ''
      // 展示弹层
      this.isupdataPhotoshow = true
    }
  }, // 方法
  components: {
    updateName,
    changeGender,
    updataBrithday,
    updataPhoto
  }, // 注册组件
  computed: {}, // 计算函数
  props: {}, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  provide: function() { return {} }, // 给所有的后代子组件传递一个参数,后代使用inject:['数据名']接收。依赖注入
  model: {} // 修改数据双向绑定,只能绑定一个数据,子组件props接收,input事件传修改数据
}

</script>
<style lang='less' scoped>
/deep/.userprofilenav {
  background-color: #3296fa;
  border-bottom: none;
  .van-ellipsis {
    color: #fff;
  }
}
.avatar {
  width: 60px;
  height: 60px;
}
.van-cell--clickable {
  align-items: center;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
