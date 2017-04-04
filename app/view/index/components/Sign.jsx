import React, { PropTypes, Component } from 'react';

class Sign extends Component {
  static propTypes() {
    return {
      fetchCode: PropTypes.func.isRequired,
      fetchSign: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      city: '余姚',
      cityArray: [
        { name: '余姚', key: 'key_0' },
        { name: '慈溪', key: 'key_1' },
        { name: '仙居', key: 'key_2' },
        { name: '新疆', key: 'key_3' }]
    };
    this.handleGetCode = this.handleGetCode.bind(this);
    this.handleGoSign = this.handleGoSign.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
  }

  handleChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  handleGetCode(e) {
    this.props.fetchCode(e);
  }

  handleGoSign() {
    const data = {
      city: this.state.city,
      code: this.code.value,
      name: this.name.value,
      phone: this.phone.value
    };

    this.props.fetchSign(data);
  }

  render() {
    return (
      <div>
        <from>
          <input
            type="text"
            placeholder="姓名"
            ref={(e) => {
              this.name = e;
            }}
          />
          <input
            type="text"
            placeholder="手机号"
            ref={(e) => {
              this.phone = e;
            }}
          />
          <input
            type="text"
            placeholder="验证码"
            ref={(e) => {
              this.code = e;
            }}
          />
          <input type="button" value="发送验证码" onClick={this.handleGetCode} />
          <div>
            {this.state.cityArray.map(val =>
              <label htmlFor={val.key} key={val.key}>
                <input
                  type="radio"
                  name="city"
                  id={val.key}
                  value={val.name}
                  onClick={this.handleChangeCity}
                /> {val.name}
              </label>
            )}
          </div>
          <input type="button" value="加入我们" onClick={this.handleGoSign} />
        </from>
      </div>
    );
  }
}

export default Sign;

