<template>
  <div class="articleitem">
    <!-- 每条文章 -->
    <van-cell-group>
      <van-cell @click="getarticleId" :to="'/articledetails/'+article.art_id">
        <div slot="title" class="title  van-multi-ellipsis--l2"> {{ article.title }}</div>
        <div class="label" slot="label">
          <!-- 如果有三张图就渲染到这里 -->
          <div v-if="article.cover.type===3" class="threeimgs">

            <div class="threeimg" v-for="(img,index) in  article.cover.images" :key="index">
              <van-image :src=img fit="cover" class="coverimg" />
            </div>

          </div>

          <div class="labelspan">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ dateformat(article.pubdate) }}</span>

          </div>
        </div>
        <!-- 如果有一张图就渲染这里的样式 -->
        <van-image :src=article.cover.images[0] v-if="article.cover.type===1" class="oneimg" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>

import { dayformat } from '@/utils/dayjs.js'
export default {
  name: 'ArticleItem',
  data() {
    return {}
  },
  components: {
  }, // 注册组件
  created() { }, // 生命周期
  methods: {
    dateformat(val) {
      return dayformat(val)
    },
    getarticleId() {
      // console.log(this.article.art_id)
    }
  }, // 方法
  computed: {}, // 计算函数
  props: {
    article: {
      type: Object,
      require: true
    }
  }, // 数据是对象形式，需要设置type 和 request是否必须
  watch: {}
}

</script>
<style lang='less' scoped>
.articleitem {
  .title {
    color: #3a3a3a;
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .van-image__error {
    display: none;
  }
  .labelspan {
    margin: 20px 0 0;
    font-size: 22px;
    color: #b4b4b4;
    span {
      &:nth-child(2) {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
  /deep/.threeimgs {
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
    .van-image {
      flex: 1;
      height: 90%;
      width: 220px;
      // .van-image__img {
      //   width: 100%;
      // }
    }
    // .threeimg {
    //   flex: 1;
    // }
    .van-image__error {
      display: none;
    }
  }
}
</style>
