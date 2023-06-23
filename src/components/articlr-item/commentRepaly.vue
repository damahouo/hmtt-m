<template>
  <div>
    <van-nav-bar :title="CommentItem.reply_count?CommentItem.reply_count+'条回复':'暂无回复'">
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>
    <div class="fixed">
      <CommentItem :commenitem="CommentItem" />
      <van-cell title="全部回复" />
      <commenList :artid="CommentItem.com_id" :type="'c'" :list="commenlist" />
    </div>
    <!-- 发布回复评论的评论 -->
    <div class="replaybtn">
      <van-button class="txtbtn" type="default" size="small" round @click="show=true">写评论</van-button>
    </div>
    <!-- 发布回复评论的评论 -->
    <!-- 回复评论的弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '18%' }">
      <CommentPost :target="CommentItem.com_id" @postsuccess="postsuccess" />
    </van-popup>
    <!-- 回复评论的弹出层 -->
  </div>
</template>

<script>
import CommentItem from '@/views/home/layout/ArticleList/commentItem.vue'
import commenList from '@/components/articlr-item/commenList.vue'
import CommentPost from '@/components/articlr-item/commentpost.vue'
export default {
  inject: ['refresh', 'articleId'],
  name: 'commentRepaly',
  data() {
    return {
      show: false,
      commenlist: []
    }
  },
  created() { }, // 生命周期
  methods: {
    postsuccess(data) {
      // 更新回复数量
      // eslint-disable-next-line vue/no-mutating-props
      this.CommentItem.reply_count++
      // 关闭弹层
      this.show = false
      // 将最新的回复内容展示到列表顶部
      console.log(data)
      this.commenlist.unshift(data.new_obj)
      // 在子组件的列表，子组件里修改，定义成props里的列表，再由父组件传值，这时父组件也可以拿到子组件修改后的列表
    }
  }, // 方法
  components: {
    CommentItem,
    commenList,
    CommentPost
  }, // 注册组件
  computed: {}, // 计算函数
  props: {
    CommentItem: {
      type: Object,
      require: true
    }
  }, // 数据是对象形式,需要设置type 和 request是否必须
  watch: {}, // 监视数据变化 例 arr:{handler} 当arr发生变化时触发handler(固定写法)方法
  model: {} // 修改数据双向绑定,只能绑定一个数据
}

</script>
<style lang='less' scoped>
.fixed {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: scroll;
}
.replaybtn {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  padding: 10px 0;
  .txtbtn {
    width: 80%;
  }
}
</style>
