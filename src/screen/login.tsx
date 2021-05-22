import React from 'react';


import PropTypes from 'prop-types';
import {
  Link
} from "react-router-dom";
import styled from 'styled-components';


const Login = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className='container'>
        <div className="form-login">
          <form action='#'>
            <h1>Login</h1>
            <input type='text' id='uname' placeholder='🤵 Enter username' required></input>
            <input type="password" id="pass" placeholder="🔒 Enter password" required></input>
            <button id="submit">Submit</button>
            <a id='register' href="#">Click here! If you forgot password</a>
          </form>
        </div>
      </div>
    </div>
  );
}


const StyledLogin = styled(Login)`
*{
    margin: 0;
    padding: 0;
}

#register {
 display: block;
}

.container {
    font-family: Arial;
    background: #2ecc71;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    height: 100vh;
    padding-top: 5%;
}

.form-login {
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

export default StyledLogin;
