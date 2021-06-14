import { useState } from 'react'

import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'
import axios from 'axios'
import * as CONSTANT from '../const'

Login.propTypes = {
  className: PropTypes.string,
}

Login.defaultProps = {
  className: '',
}

function Login(props: any) {
  const { className } = props
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()
    console.log(userName)
    const accessToken = await axios.post(`${CONSTANT.BASE_URL}/auth/login`, {
      username: userName,
      password,
    })
    console.log(accessToken.data)
  }

  return (
    <div className={className} onSubmit={handleLogin}>
      <div className="limiter">
        <div className="container">
          <div className="wrap-login">
            <div className="img-show">
              <img src="desk.png" alt="IMG" />
            </div>
            <form className="login-area-form">
              <span className="login-form-title">Member Login</span>
              <div className="email">
                <input
                  type="text"
                  name="input-email"
                  id="input-email"
                  placeholder="Enter email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <span className="icon-email">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div className="password">
                <input
                  type="password"
                  name="input-pass"
                  id="input-pass"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="icon-pass">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <div className="contain-btn">
                <button className="btn-login">Login</button>
              </div>
              <div className="text-process">
                <a className="txt2" href="#">
                  Change /
                </a>
                <a className="txt2" href="#">
                  Forgot Password
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledLogin = styled(Login)`
  body,
  html {
    height: 100%;
    font-family: Poppins-Regular, sans-serif;
  }
  .limiter {
    width: 100%;
    margin: 0 auto;
  }
  .container {
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: #9053c7;
    background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
    background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
    background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
    background: linear-gradient(-135deg, #c850c0, #4158d0);
  }
  .wrap-login {
    width: 960px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 120px 130px 102px 95px;
  }
  /*  css for image*/
  .img-show {
    width: 316px;
  }
  .img-show img {
    max-width: 100%;
  }
  /* ------------ */
  .login-area-form {
    width: 290px;
  }
  .login-form-title {
    font-family: Poppins-Bold;
    font-size: 24px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    font-weight: bold;
    width: 100%;
    display: block;
    padding-bottom: 54px;
  }
  /* Input css */
  input {
    outline: none;
    border: none;
  }
  input:focus {
    animation: pulse-animation 1.5s infinite;
  }
  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 0 0px rgba(32, 182, 45, 0.527);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    }
  }
  .input-email {
    width: 300px;
    height: 70px;
  }
  .email,
  .password {
    position: relative;
    width: 100%;
    z-index: auto;
    margin-bottom: 10px;
  }

  #input-email,
  #input-pass {
    font-family: Poppins-Medium;
    font-size: 15px;
    line-height: 1.5;
    color: #666666;
    display: block;
    width: 100%;
    background: #e6e6e6;
    height: 50px;
    border-radius: 25px;
    padding: 0 30px 0 68px;
    cursor: pointer;
  }

  #input-email:focus {
    outline: none;
  }

  .icon-email,
  .icon-pass {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    padding-left: 35px;
  }

  /* button login */

  .contain-btn {
    position: relative;
    width: 100%;
    z-index: auto;
    margin-bottom: 10px;
    margin-top: 25px;
  }
  .btn-login {
    font-family: Poppins-Medium;
    font-size: 23px;
    font-weight: bold;
    line-height: 1.5;
    position: absolute;
    color: #fff;
    display: block;
    width: 100%;
    background: #57b846e6;
    height: 50px;
    border-radius: 25px;
    padding: 0 30px 0 68px;
    cursor: pointer;
    align-items: center;
    padding-left: 42px;
  }
  .btn-login {
    outline: none;
    border: none;
  }
  .btn-login:hover {
    background-color: #273c75;
  }

  /* text css */

  .text-process {
    margin-top: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .txt2 {
    font-family: Poppins-Regular;
    font-size: 16px;
    line-height: 1.5;
    color: #666666;
    text-decoration: none;
  }

  /* Responsive */
  @media (max-width: 992px) {
    .wrap-login {
      padding: 177px 90px 33px 85px;
    }

    .img-show {
      width: 35%;
    }

    .login-area-form {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    .wrap-login {
      padding: 100px 80px 33px 80px;
    }

    .img-show {
      display: none;
    }

    .login-area-form {
      width: 100%;
    }
  }

  @media (max-width: 576px) {
    .wrap-login {
      padding: 100px 15px 33px 15px;
    }
  }
`
export default StyledLogin
