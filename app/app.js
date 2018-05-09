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
  // if you are using harmony modules ({modules:true})
  Render(require('./pages'))
})