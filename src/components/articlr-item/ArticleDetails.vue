
<!-- -======================================================== -->
<template>
  <div class="ArticleDetails">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="onClickLeft"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情  -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ time}}</div>
          <followUser :article_is_followed="article.is_followed" :articleId="article.aut_id" @changefollow="article.is_followed=$event"></followUser>
          <!-- <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-if="!article.is_followed" @click="onfollow" :loading="followloading">关注</van-button>
          <van-button class="follow-btn" round size="small" v-else @click="onfollow" :loading="followloading">已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="articleContent"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <commenList :artid="article.art_id" @totalCount="numcomments=$event.total_count" v-if="isRresh" @replayshow="replayshow" />
        <!-- 文章评论 -->
        <!-- 底部区域 弹出层 -->
        <van-popup v-model="ispopupshow" position="bottom" :style="{ height: '23%' }">
          <CommentPost :target=article.art_id @postsuccess="ispopupshow=fales" />
        </van-popup>
        <!-- 底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errstatus">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadarticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" @click="ispopupshow=true">写评论</van-button>
      <van-icon name="comment-o" :badge="this.numcomments" color="#777" />
      <!-- 收藏组件 -->
      <CollectArticle v-model="article.is_collected" :articleId="article.art_id"></CollectArticle>
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <likeArticle v-model="article.attitude" :articleId="article.art_id" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 回复评论的弹出层 -->
    <van-popup v-model="ispostShow" position="bottom" :style="{ height: '100%' }">
      <CommentRepaly :CommentItem="CommentItem" @close="ispostShow=fales" v-if="ispostShow" />
    </van-popup>
    <!-- 回复评论的弹出层 -->
    <!-- 弹出层是懒渲染 ， -->
  </div>
</template>

<script>
import CollectArticle from '@/components/articlr-item/CollectArticle.vue'
import likeArticle from '@/components/articlr-item/likeArticle.vue'
import { ImagePreview } from 'vant'
import { getarticleById } from '@/api/article.js'
import { dayformat } from '@/utils/dayjs.js'
import followUser from '@/components/followUser.vue'
import commenList from '@/components/articlr-item/commenList.vue'
import CommentPost from '@/components/articlr-item/commentpost.vue'
import CommentRepaly from '@/components/articlr-item/commentRepaly.vue'
// import { deletfollow, addfollow } from '@/api/getuser.js'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 0
// })
// [ImagePreview.Component.name]: ImagePreview.Component
export default {
  name: 'ArticleDetails',
  // provide: function() {
  //   return {
  //     articleId: this.articleId
  //   }
  // },
  components: {
    followUser,
    CollectArticle,
    likeArticle,
    commenList,
    CommentPost,
    CommentRepaly
  },
  props: {
    articleid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      article: [],
      loading: true,
      errstatus: 0,
      numcomments: 0,
      followloading: false, // 展示关注按钮加载状态
      ispopupshow: false,
      isRresh: true,
      ispostShow: false,
      CommentItem: {}, // 从仔仔组件接受的点击回复的评论对象
      fales: false
    }
  },
  provide() {
    return {
      refresh: this.refresh,
      articleId: this.articleid
    }
  },
  computed: {
    time() {
      return dayformat(this.article.pubdate)
    }
  },
  watch: {},
  created() {
    this.loadarticle()
  },
  mounted() {

  },
  methods: {

    async loadarticle() {
      this.loading = true
      try {
        const { data: { data } } = await getarticleById(this.articleid)
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdfasdfasfasd')
        // }
        this.article = data
        this.loading = false
        // 初始化图片点击预览
        // 数据驱动视图不是立即的 所以加个定时器表示异步
        setTimeout(() => {
          // console.log(this.$refs.articleContent)
          // 单独定义一个方法处理图片预览
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errstatus = 404
          this.loading = false
        }
        this.$toast('数据请求失败，请重试')
        this.loading = false
      }
    },
    onClickLeft() {
      this.$router.back()
    },
    previewImage() {
      // 拿到所有的img节点
      const articleContent = this.$refs.articleContent
      // console.log(articleContent)
      // 拿到所有img节点
      const imgs = articleContent.querySelectorAll('img')
      // 拿到图片链接地址放在地址数组里 用于预览
      const images = []
      // 循环遍历每个图片dom节点
      imgs.forEach((img, index) => {
        // 将每个dom节点里的图片地址存入的图片地址数组中
        images.push(img.src)
        // 给每个dom节点注册点击事件
        img.onclick = () => {
          // 点击就触发图片预览功能函数  此函数来自vant组件
          ImagePreview({
            images, // es6写法 将图片地址数组传进去

            startPosition: index // 表示图片预览起始位置，传入每个图片的下标索引
          })
        }
      })
    },
    // async onfollow() {
    //   this.followloading = true // 请求之后立马展示loading 状态
    //   try {
    //     if (this.article.is_followed) {
    //       // 已关注，请求取消关注
    //       const { data } = await deletfollow(this.article.aut_id)
    //       console.log(data)
    //     } else {
    //       // 未关注 ，请求关注
    //       const { data } = await addfollow(this.article.aut_id)
    //       console.log(data)
    //     }
    //     this.article.is_followed = !this.article.is_followed
    //   } catch (err) {
    //     let message = '请求失败请重试'
    //     if (err.response && err.response.status === 400) {
    //       message = '您无法关注自己！'
    //     }
    //     this.$toast(message)
    //   }
    //   this.followloading = false // 请求结束之后立马关闭loading 状态
    // }
    refresh() {
      this.isRresh = false
      this.$nextTick(() => {
        this.isRresh = true
      })
    },
    // 这个是从仔仔组件接受到的，点击评论的回复后触发的事件
    replayshow(CommentItem) {
      this.CommentItem = CommentItem
      this.ispostShow = true
    }

  }

}
</script>

<style scoped lang="less">
@import url(./github-markdown.css);
.ArticleDetails {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
