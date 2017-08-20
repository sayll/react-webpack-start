import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.pcss'

export default class Switch extends Component {
  static defaultProps = {
    size: 40,
    className: '',
    checked: false,
    checkedChildren: null,
    disabled: false,
    unCheckedChildren: null,
    onClick: () => null,
    onChange: () => null
  }
  static propTypes = {
    size: PropTypes.number,
    className: PropTypes.string,
    checked: PropTypes.bool,
    checkedChildren: PropTypes.any,
    disabled: PropTypes.bool,
    unCheckedChildren: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = { checked: this.props.checked }
  }

  setChecked(checked) {
    if (this.props.disabled) {
      return
    }
    this.setState({
      checked
    })
    this.props.onChange(checked)
  }

  toggle = () => {
    const { onClick } = this.props
    const checked = !this.state.checked
    this.setChecked(checked)
    onClick(checked)
  }

  render() {
    const { size, className, checkedChildren, unCheckedChildren } = this.props
    const { checked } = this.state
    const switchClassName = classNames(className, 'C_switch', {
      switch_checked: checked
    })
    const style = {
      width: `${size * 2}px`,
      height: `${size}px`,
      fontSize: `${size * 0.6}px`,
      borderRadius: `${size}px`
    }
    const iconStyle = {
      width: `${size - 4}px`,
      height: `${size - 4}px`
    }
    return (<span
      className={switchClassName}
      onClick={this.toggle}
      style={style}
    >
      <span>
        {checked ? checkedChildren : unCheckedChildren}
        <i style={iconStyle} />
      </span>
    </span>)
  }
}
