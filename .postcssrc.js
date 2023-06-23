module.exports = {
  plugins: {
    // vue-cli内部已经配置了适配浏览器的功能，此这里又配置了一次，所以会冲突 注释掉就行了
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 这个插件的作用就是把px转换成rem *表示所有
    'postcss-pxtorem': {
      // 这个表示lib-flexble 的REM 适配方案，把一行分为10份，每份就是十分之一
      // 所以rootValue 应该设置为设计稿的宽度的十分之一
      // 我们的设计稿为750 所以这里应该设置为75
      // 但是vant建议设置为37.5，因为vant是基于375学的
      // 所以必须设置为37.5 ，所以我们设计稿的尺寸都必须/2
      // 更好的方法：
      // vant的样式 按照37.5转换 自己的样式 按照75转换
      // 通过查阅文档，我们发现rootValue 支持两种类型
      // 数字：固定的数值
      // 函数：动态处理返回值

      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown' // 配置排除不要转换的样式资源
    }
  }
}
