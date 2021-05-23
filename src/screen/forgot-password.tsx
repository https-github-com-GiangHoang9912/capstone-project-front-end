import React from 'react';

import PropTypes from 'prop-types';
import {
  Link
} from "react-router-dom";
import avatar from '../images/avatar2.png';
import styled from 'styled-components';


const ForgotPassword = ({ className = "" }) => {
  return (


    <div className={className}>
      <div className='container'>
        <div className="form-login">
          <form action='#'>
            <h1 className='title'>Forgot Password</h1>
            <img src={avatar} className='avatar' alt="" />
            <h3 className="mess-guide">Enter your account and email:</h3>
            <div className="input-content">
              <input type='text' id='uname' placeholder='🤵 Enter username' required></input>
              <input type="password" id="pass" placeholder="📧 Enter email" required></input>
              <button id="submit" className="reset">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>


  );
}


const StyledForgotPassword = styled(ForgotPassword)`
*{
    margin: 0;
    padding: 0;
    /* box-sizing: border-box; */
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
    width: 420px;
    height: auto;
    margin: 0 auto;
    margin-top: 12.5%;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    /* opacity: ; */
    /* text-align: center; */
}

.form-login h1 {
    text-align: center;
    display: block;
    margin-bottom: 10px;
    color: #2c3e50;
}
.form-login input, .reset {
    margin: 0 auto;
    margin-bottom: 15px;
    display: block;
    width: 200px;
    height: 40px;
    border-radius: 5px;
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
    height: 35px;
    width: 220px;
    padding: 0 10px;
    border-radius: 18px;
    font-weight: bold;
    cursor: pointer;
    color:white;
}
.form-login button:hover {
    background-color: #4b6584;
    border: 1px solid #eb3b5a;
}
.form-login a {
    margin-top: 20px;
    font-size: 13px;
}
.avatar {
  height: 80px;
  width: 80px;
  margin-bottom: 20px;  
  /* justify-content: center; */
  display: block;
   margin-left: auto; 
   margin-right: auto;
}
.mess-guide {
  margin-bottom: 20px;
}

.reset {
  margin-top: 30px;

}
#register {
 display: block;
}

.input-content {
  display: flex;
  flex-direction: column;
  margin-top:40px
}

p {
    color: red;
    font-size: 13px;
}
`
export default StyledForgotPassword;