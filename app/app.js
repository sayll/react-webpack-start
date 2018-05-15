import React from 'react'
import { render } from 'react-dom'
import App from './pages'

function Render(App) {
  render(
    <App />,
    document.getElementById('app')
  )
}

Render(App)

// 热更新
module.hot && module.hot.accept('./pages', () => {
  // 正常使用
  Render(App)
  // 代码分割
  // Render(require('./pages'))
})