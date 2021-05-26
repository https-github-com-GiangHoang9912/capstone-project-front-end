import React from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GoogleLogin from 'react-google-login'
import CONSTANT from '../const.json'

function Login({ className = '' }) {
  const responseGoogle = (response: any) => {
    if (response.error) return
    const PATTENT_TEACHER = new RegExp("fe.edu.vn");
    const PATTEN_STUDENT = new RegExp("fpt.edu.vn");
    if (PATTENT_TEACHER.test(response.profileObj.email)) {
      console.log("Teacher")
    } else if (PATTEN_STUDENT.test(response.profileObj.email)) {
      console.log("Student")
    } else {
      console.log("Out of FPT")
    }
    console.log(response.profileObj)
    console.log(response.tokenObj)
  }

  return (
    <div className={className}>
      <div className="container">
        <div className="form-login">
          <form action="#">
            <h1>Login</h1>
            <input type="text" id="uname" placeholder="🤵 Enter username" required />
            <input type="password" id="pass" placeholder="🔒 Enter password" required />
            <button id="submit">Submit</button>
            <GoogleLogin
              className="button-google-login"
              clientId={CONSTANT['GOOGLE-CLIENT-ID']}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            <a id="register" href="#">
              Click here! If you forgot password
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}

const StyledLogin = styled(Login)`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .button-google-login {
    height: 41px !important;
    margin-top: 10px;
    border-radius: 5px;
  }

  #register {
    display: block;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
  .container {
    overflow: hidden;
    font-family: Arial;
    background: #2ecc71;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    height: 100vh;
    width: 100%;
    justify-content: center;
    -ms-overflow-style: none;
  }

  .form-login {
    justify-content: center;
    width: 320px;
    height: auto;
    margin: 0 auto;
    margin-top: 15%;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    /* opacity: ; */
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    [class*='col-'] {
      width: 100%;
    }
  }
  .form-login h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
  }
  .form-login input {
    margin: 0 auto;
    margin-bottom: 10px;
    display: block;
    width: 200px;
    height: 28px;
    border-radius: 15px;
    border: 1px solid #1ed760;
    padding: 0 10px;
    cursor: pointer;
  }
  .form-login input:hover {
    border-radius: 15px;
    border: 1px solid #f368e0;
    cursor: pointer;
  }
  .form-login button,
  input:focus {
    outline: none;
  }
  .form-login button {
    border: 1px solid #1ed760;
    background: #1ed760;
    height: 28px;
    width: 220px;
    padding: 0 10px;
    border-radius: 15px;
    cursor: pointer;
  }
  .form-login button:hover {
    background-color: #4b6584;
    border: 1px solid #eb3b5a;
  }
  .form-login a {
    margin-top: 20px;
    font-size: 13px;
  }
  p {
    color: red;
    font-size: 13px;
  }
`

export default StyledLogin
