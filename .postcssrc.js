// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  'plugins': {
    postcss: [
      require('postcss-import')(),
      require('postcss-url')(),
      require('postcss-cssnext')(),
      /*require('postcss-pxtorem')({
        rootValue: 18,
        // px单位大写将忽略转化rem
        propList: ['!*'],
        selectorBlackList: [] // 忽略的选择器
      })*/
    ]
  }
}
