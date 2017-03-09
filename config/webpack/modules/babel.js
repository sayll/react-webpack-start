let babel = {
  cacheDirectory: true,
  'presets': [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    'latest',
    // Stage 2 is "draft", 4 is finished, 0 is strawMan.
    'stage-2',
    'react'
  ],
  'plugins': [],
  'env': {
    'development': {
      'plugins': [
        'transform-runtime',
        "react-hot-loader/babel"
      ],
    },

    'production': {
      'plugins': [
        'transform-runtime',
      ],
    }
  }
};

if (!!process.env.NODE_TEST) { // 启用测试模式
  babel.plugins.push('istanbul');
}
module.exports = babel;