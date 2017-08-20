// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = ctx => ({
  parser: false,
  map: ctx.env === 'development' ? 'inline' : false,
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-cssnext': {},
    /*doiuse: {
      browsers: ['last 2 versions', '> 1%']
    },*/
    /*'postcss-pxtorem': {
      rootValue: 18,
      // px单位大写将忽略转化rem
      propList: ['!*'],
      selectorBlackList: [] // 忽略的选择器
    },*/
    cssnano: ctx.env === 'production' ? {} : false
  }
})
