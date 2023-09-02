import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props

      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, error, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      console.log(jwtToken)
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <img
          src="https://res.cloudinary.com/dygfievoq/image/upload/v1692780660/login_page_sruntw.jpg"
          alt="website login"
          className="login-image"
        />
        <div className="login-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dygfievoq/image/upload/v1692782021/bookHubLogo_i1wws4.png"
              alt="login website logo"
              className="logo"
            />
            <div className="input-container">
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
            </div>
            <div className="input-container">
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
              {error && <p className="error-msg">{errorMsg}</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
