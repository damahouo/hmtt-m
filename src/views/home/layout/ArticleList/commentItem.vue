
/* <!-- ========================================== --> */
<template>
  <van-cell class="comment-item">
    <van-image slot="icon" class="avatar" round fit="cover" :src="commenitem.aut_photo" />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commenitem.aut_name }}</div>
      <van-button class="like-btn" :class="{liked:commenitem.is_liking}" :icon="commenitem.is_liking?'good-job':'good-job-o'" :loading="commendload" @click="onLicked">{{ commenitem.like_count||"赞" }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ commenitem.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ commenitem.pubdate | relativeTime }}</span>
        <van-button class="reply-btn" round @click="replayshow(commenitem)">回复{{ commenitem.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deletCommentlike, addCommentlike } from '@/api/article.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commenitem: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      commendload: false
    }
  },
  methods: {
    async onLicked() {
      try {
        this.commendload = true
        // 判断点赞状态
        if (this.commenitem.is_liking) {
          // 已赞，取消点赞
          await deletCommentlike(this.commenitem.com_id)
          // this.$emit('updatecomlikes', this.commenitem.like_count--)
          // eslint-disable-next-line vue/no-mutating-props
          this.commenitem.like_count--
        } else {
          // 未赞，添加点赞
          await addCommentlike(this.commenitem.com_id)
          // eslint-disable-next-line vue/no-mutating-props
          this.commenitem.like_count++
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.commenitem.is_liking = !this.commenitem.is_liking
        this.commendload = false
      } catch {
        this.$toast('请求失败请重试！')
      }
    },
    replayshow(commenitem) {
      // 这个是点击回复评论后触发回复评论弹层的事件
      this.$emit('replayshow', commenitem)
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
