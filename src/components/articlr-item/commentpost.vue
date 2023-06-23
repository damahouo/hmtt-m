<!-- 点击评论后的弹出层 -->
<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="onpost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addarticlecomment } from '@/api/article.js'
// import { debounce } from 'lodash'
export default {
  // inject: ['refresh', 'articleId'],
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
  },
  inject: {
    articleId: {
      type: String,
      default: null
    },
    refresh: {
      type: String,
      default: 'refresh'
    }
  },
  methods: {
    async onpost() {
      // 发布文章评论
      try {
        const { data } = await addarticlecomment({
          art_id: this.articleId ? this.articleId : null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
          content: this.message, // 评论内容
          target: this.target// 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        })
        // 关闭弹出层
        this.$emit('postsuccess', data.data)
        // 将发布内容显示到列表顶部
        this.refreshPageHandler()
        // 清空文本框
        this.message = ''
        // this.$router.go(0)
        this.$toast.success('发布成功')
      } catch {
        this.$toast('发布失败请重试！')
      }
    },
    refreshPageHandler() {
      console.log('点击刷新页面')
      this.refresh()
    }

  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
