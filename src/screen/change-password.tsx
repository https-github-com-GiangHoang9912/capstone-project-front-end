import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import {
  Link
} from "react-router-dom";
import styled from 'styled-components';


ChangePassword.propTypes = {
  className: PropTypes.string,
}

ChangePassword.defaultProps = {
  className: ''
}


function ChangePassword(props: any) {
  const { className } = props;
  return (
    <div className={className}>
      <div className='container'>
        <div className="form-login">
          <form action='#'>
            <h1 className='title'>Change Password</h1>
            <img src="avatar2.png" className='avatar' alt="" />
            <h3 className="mess-guide">Enter your username and password:</h3>
            <div className="input-content">
              {/* <input type='text' id='uname' placeholder='🤵 Enter username' required /> */}
              <div className="css-text">
                <TextField
                  className="input-text"
                  id="outlined-input"
                  label="Username"
                  type="text"
                  autoComplete="current-password"
                  variant="outlined"
                />

              </div>
              <div className="css-text">
                <TextField
                  className="input-text"
                  id="outlined-password-input"
                  label="Old Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                />

              </div>
              <div className="css-text">
                <TextField
                  className="input-text"
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                />

              </div>
              <div className="css-text">
                <TextField
                  className="input-text"
                  id="outlined-password-input"
                  label="New Password Again"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                />

              </div>
              
              {/* <input type="password" id="pass" placeholder="New Password" required />
              <input type="password" id="pass" placeholder="Re-Enter Password" required /> */}
            </div>
            <div className="btn-submit">
                <button id="submit" className="reset">Submit</button>
              </div>
          </form>
        </div>
      </div>
    </div>


  );
}

const StyledForgotPassword = styled(ChangePassword)`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.input-text {
  height: 60px;
}
.css-text {
  width: 250px;
  padding-top: 10px;
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
    margin-top: 3%;
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
    margin-bottom: 5px;
    color: #2c3e50;
}
/* .form-login input, .reset {
    margin: 0 auto;
    margin-bottom: 8px;
    display: block;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #1ed760;
    padding: 0 10px;
    cursor: pointer;
} */
/* .form-login input:hover {
    border: 1px solid #f368e0;
    cursor: pointer;
} */
.form-login button,
input:focus {
    outline: none;
}
.form-login button {
    border: 1px solid #1ed760;
    background: #1ed760;
    height: 35px;
    width: 250px;
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
  margin-bottom: 10px;  
  display: block;
  margin-left: auto; 
  margin-right: auto;
}
.mess-guide {
  margin-bottom: 5px;
}

.reset {
  margin-top: 20px;
  margin-left: 52px;
}
#register {
 display: block;
}

.input-content {
  display: flex;
  flex-direction: column;
  margin-top:0px;
  align-items: center;
}

//* responsive for tablet */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .form-login {
    margin-top: 13%;
  }
}

//* Mobile @media only screen and (max-width: 46.1875em) */
@media only screen and (max-width: 46.1875em) {
  .form-login {
    margin-top: 50% !important;
  }
}
`
export default StyledForgotPassword;