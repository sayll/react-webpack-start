import React from 'react'
import { hot } from 'react-hot-loader'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <h1 styleName="green">Hello, world!</h1>
    )
  }
}

export default hot(module)(App)