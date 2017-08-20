import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import './index.css'

class Index extends React.PureComponent {
  state = {
    inputValue: '',
    todoList: ['1', '2', '3', '4']
  }

  componentDidMount() {
  }

  handleChange = e => {
    const { dataset, type } = e.target
    const { key } = dataset
    switch (type) {
      case 'checkbox':
        this.setState({
          [key]: e.target.checked
        })
        break
      default:
        this.setState({
          [key]: e.target.value
        })
    }
  }

  handleClick = () => {
    this.setState(state => {
      const newData = state.todoList.slice(1)
      return {
        todoList: newData
      }
    })
  }

  render() {
    const Items = this.state.todoList.map(item => (
      <p key={item}>
        {item}
      </p>
    ))
    return (
      <div>
        <h2 styleName="test">word</h2>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {Items}
        </CSSTransitionGroup>

        <input type="text" data-key="inputValue" onChange={this.handleChange} />
        <input type="button" onClick={this.handleClick} value={'删除'} />
      </div>
    )
  }
}

export default Index
