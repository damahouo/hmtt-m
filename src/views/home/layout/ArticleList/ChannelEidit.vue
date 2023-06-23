<template>
  <div class="ChannelEidit">
    <!-- 顶部栏 -->
    <van-cell :border="false" class="topNavbar">
      <div slot="title" class="titletex">我的频道</div>
      <van-button class="bianjiBtn" plain type="danger" round size="mini" @click="showXs
      ">{{showX? '完成':'编辑'}}</van-button>
    </van-cell>
    <!-- 宫格区域 -->
    <van-grid :gutter="10">
      <van-grid-item class="gridItem topicon" v-for="(value,index) in my_channelss" :key="index">
        <div slot="text" class="text" :class="{actives:index===actives}" @click="updataactive(index,value)">{{ value.name }}
          <div slot="icon">
            <!-- 判断 是否为显示状态并且固定频道的id不包含此id -->
            <van-icon name="close" v-show=showX&&!fiexChannels.includes(value.id) />
          </div>
        </div>

      </van-grid-item>
    </van-grid>
    <!-- 频道推荐区域 -->
    <van-cell :border="false" class="topNavbar">
      <div slot="title" class="titletex">频道推荐</div>
      <!-- <van-button plain type="danger" round size="mini">编辑</van-button> -->
    </van-cell>
    <!-- 宫格区域 -->
    <van-grid :gutter="10">
      <van-grid-item class="gridItem bottom" v-for="value in recommendChannels" :key="value.id" icon="plus" :text="value.name" @click="additem(value)" />
    </van-grid>
  </div>
</template>

<script>
import { getallchannels, PatchChannels, deletuserChannels } from '@/api/getallchannels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEidit',
  data() {
    return {
      showX: false,
      allchannels: [],
      fiexChannels: [0], // 固定频道不允许删除
      my_channelss: this.my_channels
    }
  },
  created() {
    this.loadallchannels()
  }, // 生命周期
  methods: {
    showXs() {
      this.showX = !this.showX
    },
    async loadallchannels() {
      try {
        const { data: { data: channels } } = await getallchannels()
        this.allchannels = channels.channels
        // 获取所有频道,需要再减去我已经有的频道,剩余的频道才是展示推荐的频道
        console.log(channels)
      } catch (err) {
        this.$toast('所有频道加载失败,请重试' + err)
      }
    },
    async additem(value) {
      this.my_channelss.push(value)
      if (this.userToken) {
        // 已登录,状态,将用户数据更新到线上
        try {
          console.log(value.id, this.my_channelss.length)
          await PatchChannels({
            id: value.id, // 频道id
            seq: this.my_channelss.length // 一个序号
          })
        } catch (err) {
          this.$toast('请求失败,请稍后重试')
        }
      } else {
        // 未登录状态,进行数据存储于本地
        console.log('未登录')
        setItem('userChannels', this.my_channelss)
      }
    },
    async updataactive(index, value) {
      // 定义点击事件.先判断是否是编辑状态,编辑状态就删除,不是编辑状态就跳转
      if (this.showX) {
        // 判断要删除的index是否始于禁止删除数组内属于的话就返回
        if (this.fiexChannels.includes(value.id)) { return }

        // 编辑状态,执行删除操作
        this.my_channelss.splice(index, 1)
        if (index <= this.actives) {
          // 判断如果要删除的下标小于active,那么active应该减一
          this.$emit('updataactive', (this.actives - 1), false)
        }
        // 执行删除操作,判断是否属于登陆状态
        if (this.userToken) {
          // 已登录状态下,发送删除请求
          try {
            await deletuserChannels(value.id)
            this.$toast('删除成功')
          } catch (err) {
            this.$toast('请求失败,请稍后重试')
          }
        } else {
          // 未登录状态,删除后的列表存储到本地
          setItem('userChannels', this.my_channelss)
        }
      } else {
        // 非编辑状态,执行跳转操作
        // 首先定义点击事件,触发自定义事件,向父亲组件传递当前点击的下标
        this.$emit('updataactive', index)
      }
    }
  }, // 方法
  components: {}, // 注册组件
  computed: {
    recommendChannels() {
      return this.allchannels.filter((v) => this.my_channelss.every((val) => val.id !== v.id))
    },
    // 获取本地是否有存储token值来判断是否已经登陆
    ...mapState(['userToken'])
  }, // 计算函数
  props: {
    my_channels: {
      typr: Array,
      require: true
    },
    actives: {
      type: Number,
      require: true
    }
  }, // 数据是对象形式，需要设置type 和 request是否必须
  watch: {}
}

</script>
<style lang='less' scoped>
.ChannelEidit {
  padding-top: 85px;
  .topNavbar {
    .titletex {
      color: #333;
      font-size: 32px;
    }
    .bianjiBtn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
  }
  /deep/.gridItem {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      color: #222;
      font-size: 28px;
      white-space: nowrap;
    }

    .van-grid-item__content--center {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
    .van-icon-close {
      color: #cacaca;
      position: absolute;
      font-size: 30px;
      top: -14px;
      right: -12px;
    }
    .actives {
      color: red;
    }
  }
}
</style>
