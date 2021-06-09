/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faEye } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';


ChangePassword.propTypes = {
  className: PropTypes.string,
}

ChangePassword.defaultProps = {
  className: ''
}


function ChangePassword(props: any) {
  const { className } = props;
  const [valuesPassword, setValuesPassword] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValuesPassword({
      ...valuesPassword,
      showPassword: !valuesPassword.showPassword
    })
  }
  return (
    <div className={className}>
      <div className="limiter">
        <div className="container">
          <div className="wrap-login">
            <div className="rules-account">
              <div className="title">
                <h2>Change Password</h2>
              </div>
              <div className="detail-rules">
                <h5>Password must contains: </h5>
                <p><FontAwesomeIcon className="checked" icon={faCheck} />At least 6 characters.</p>
                <p><FontAwesomeIcon className="checked" icon={faCheck} />At least 1 upper case letter (A-Z).</p>
                <p><FontAwesomeIcon className="checked" icon={faCheck} />At least 1 lower case letter (a-z).</p>
                <p><FontAwesomeIcon className="checked" icon={faCheck} />At least 1 number (0-9).</p>
              </div>
            </div>
            <form className="login-area-form">
              <div className="password">
                <input type={valuesPassword.showPassword ? "text" : "password"}
                  name="input-pass"
                  id="input-pass"
                  placeholder="Enter old password" required />
                <span className="icon-pass">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <span className="icon-eye">
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={handleClickShowPassword}
                  />
                </span>
              </div>
              <div className="password">
                <input type={valuesPassword.showPassword ? "text" : "password"}
                  name="input-pass"
                  id="input-pass"
                  placeholder="Enter new password" required />
                <span className="icon-pass">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <span className="icon-eye">
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={handleClickShowPassword}
                  />
                </span>
              </div>
              <div className="password">
                <input type={valuesPassword.showPassword ? "text" : "password"}
                  name="input-pass"
                  id="input-pass"
                  placeholder="Re_Enter new password" required />
                <span className="icon-pass">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <span className="icon-eye">
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={handleClickShowPassword}
                  />
                </span>
              </div>
              <div className="contain-btn">
                <button className="btn-login">
                  Login
                </button>
              </div>
              <div className="text-process">
                <a className="cancel" href="#">
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledForgotPassword = styled(ChangePassword)`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: sans-serif;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f5f6fa;
}
.wrap-login {
  width: 960px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 75px 130px 102px 95px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3); */
}

/*  css for detail rules*/
.rules-account {
  width: 316px;
}
.rules-account {
  max-width: 100%;
}
.title h2 {
  font-family: Arial, Helvetica, sans-serif;
}
.detail-rules {
  padding-top: 20px;
}
.detail-rules h5 {
  margin-bottom: 5px;
  font-size: 17px;
}
.detail-rules p {
  font-size: 15px;
  padding: 10px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.detail-rules .checked {
  color: #2980b9;
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

.password {
  position: relative;
  width: 100%;
  z-index: auto;
  margin-bottom: 10px;
}

#input-pass {
  font-family: sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;
  display: block;
  width: 100%;
  background: #ecf0f1;
  height: 50px;padding: 0 30px 0 68px;
  
  cursor: pointer;
}

.icon-pass {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  padding-left: 25px;
}
.icon-eye {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 15px;
  height: 100%;
  padding-right: 20px;
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
  font-family: Helvetica;
  font-size: 23px;
  font-weight: bold;
  line-height: 1.5;
  position: absolute;
  color: #fff;
  display: block;
  width: 100%;
  background: #1e90ff;
  height: 50px;
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

.cancel {
  font-family: Poppins-Regular;
  font-size: 22px;
  line-height: 1.5;
  color: #666666;
  text-decoration: none;
}
.cancel:hover {
  cursor: pointer;
  color:  tomato;
}

/* Responsive */
@media (max-width: 992px) {
  .wrap-login {
    padding: 177px 90px 33px 85px;
  }

  .rules-account {
    width: 35%;
  }

  .login-area-form {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .wrap-login {
    padding: 100px 80px 33px 80px;
    display: flex;
    flex-direction: column;
    text-align: center;

  }
  .login-area-form {
    width: 100%;
  }
  .detail-rules h5, p{
    display: none;
  }
  .title{
    /* width: 100%; */
  }
   
  h2{
    display:inline-block;
    font-size: 20px;
    width: 200px;
    margin-left: 80px;
  }
}

@media (max-width: 576px) {
  .wrap-login {
    padding: 100px 15px 33px 15px;
  }
  .wrap-login {
    padding: 100px 80px 33px 80px;
    display: flex;
    flex-direction: column;
  }
  .login-area-form {
    width: 100%;
  }
  .detail-rules h5, p{
    display: none;
  }
   .title{
    text-align: center;
    /* width: 100%; */
  }
   
  h2{
    display:inline-block;
    font-size: 20px;
    width: 200px;
    margin-left: 80px;
  }
}

`
export default StyledForgotPassword;