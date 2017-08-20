import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import createStore from './app/store'
import App from './app'

const store = createStore()

// 创建app
function Render(Component) {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

Render(App)

// views 热替换
if (process.env === 'development' && module.hot) {
  module.hot.accept('./app', () => {
    Render(App)
  })
}
