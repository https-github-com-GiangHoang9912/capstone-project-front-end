import React from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button, makeStyles } from '@material-ui/core'

import styled from 'styled-components'

ForgotPassword.propTypes = {
  className: PropTypes.string,
}

ForgotPassword.defaultProps = {
  className: '',
}
const useStyles = makeStyles({
  styleBtn: {
    width: 250,
    height: 50,
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    marginTop: 15
  }
})

function ForgotPassword(props: any) {
  const { className } = props;
  const classes = useStyles();
  return (
    <div className={className}>
      <div className="container">
        <div className="form-forgot">
          <form action="#">
            <h1 className="title">Forgot Password</h1>
            <img src="avatar2.png" className="avatar" alt="" />
            <h3 className="mess-guide">Enter your account and email:</h3>
            <div className="input-content">
              <div className="input-name">
                <input
                  className="text-name"
                  type="text"
                  id="uname"
                  placeholder="Enter username"
                  required
                />
                <span className="icon">
                  <FontAwesomeIcon icon={faUserCircle} />
                </span>
              </div>
              <div className="input-email">
                <input
                  className="text-name"
                  type="email"
                  id="uname"
                  placeholder="Enter email"
                  required
                />
                <span className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div className="button-reset">
                <Button variant="contained"
                  color="primary"
                  className={classes.styleBtn}
                >
                  Clear Text
                </Button>
                <Button variant="contained"
                  color="primary"
                  className={classes.styleBtn}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const StyledForgotPassword = styled(ForgotPassword)`
  .container::-webkit-scrollbar {
    display: none;
  }
  .container {
    overflow: hidden;
    font-family: Arial;
    background: #f5f6fa;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    height: 100vh;
    width: 100%;
    justify-content: center;
    -ms-overflow-style: none;
  }

  //** css for form login  */
  .form-forgot {
    justify-content: center;
    width: 500px;
    height: 530px;
    margin: 0 auto;
    margin-top: 10%;
    border: 1px solid #fff;
    padding: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  //** css for title */
  .form-forgot h1 {
    text-align: center;
    display: block;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  //** css for input  */
  .form-forgot input {
    font-family: sans-serif;
    font-size: 18px;
    line-height: 1.5;
    color: #666666;
    display: block;
    width: 250px;
    background: #ecf0f1;
    height: 50px;
    cursor: pointer;
    border: none;
    padding: 0 30px 0 50px;
  }

  .form-forgot input:hover {
    cursor: pointer;
  }

  .input-name,
  .input-email {
    position: relative;
    z-index: auto;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    padding-left: 15px;
    font-size: 20px;
  }
  //* css for button */
  .form-forgot button,
  input:focus {
    outline: none;
  }
  .button-reset {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
  .avatar {
    height: 80px;
    width: 80px;
    margin-bottom: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .mess-guide {
    margin-bottom: 20px;
  }

  .input-content {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    align-items: center;
  }
`
export default StyledForgotPassword
