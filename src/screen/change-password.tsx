import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { faCheck, faLock, faEye } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import * as CONSTANT from '../const'
import { refreshToken } from '../services/services'
import { AccountContext } from '../contexts/account-context'

ChangePassword.propTypes = {
  className: PropTypes.string,
}

ChangePassword.defaultProps = {
  className: '',
}

const CHANGE_PASSWORD = `${CONSTANT.BASE_URL}/user/change-password`
function ChangePassword(props: any) {
  const { className, handleNotification } = props
  const history = useHistory()
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const userId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id
  const [oldPassword, setOldPassword] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [newPassword, setNewPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')
  const [validatePassword, setValidatePassword] = useState<boolean>(false)
  const [iconList, setIconList] = useState([
    {
      id: 1,
      showPassword: false,
    },
    {
      id: 2,
      showPassword: false,
    },
    {
      id: 3,
      showPassword: false,
    },
  ])

  const idUser = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id

  const handleValidatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/
    return regex.test(password)
  }

  const changePassword = async (e: any) => {
    e.preventDefault()
    try {
      if (handleValidatePassword(newPassword)) {
        setValidatePassword(true)
        setProgress(progress + 10)
        const changeDataResponse = await axios.put(
          CHANGE_PASSWORD,
          {
            userId,
            oldPassword,
            newPassword,
          },
          {
            withCredentials: true,
          }
        )
        console.log('changeDataResponse', changeDataResponse)
        if (changeDataResponse.data.status == 200 && validatePassword) {
          handleNotification('success', `${CONSTANT.MESSAGE().CHANGE_PASSWORD_SUCCESS}`)
          history.push('/login')
        } else {
          setValidatePassword(false)
        }
        refreshToken(userId)
      } 
    }catch(error){
      console.log(error)
    }
  }
  const onCheckBtnClick = useCallback((id) => {
      setIconList((prevState) =>
        prevState.map((icon) =>
          icon.id === id
            ? { ...icon, showPassword: !icon.showPassword }
            : { ...icon, showPassword: icon.showPassword }
        )
      )
    }, [])

    const handleOnchange = (e: any) => {
      setNewPassword(e.target.value)
      if (handleValidatePassword(e.target.value)) {
        setValidatePassword(true)
      } else {
        setValidatePassword(false)
      }
    }

    return (
      <div className={className}>
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div className="limiter">
          <div className="container">
            <div className="wrap-login">
              <div className="rules-account">
                <div className="title">
                  <h2 className="title-h2">Change Password</h2>
                </div>
                <div className="detail-rules">
                  <h5>Password must contains: </h5>
                  <p>
                    <FontAwesomeIcon className="checked" icon={faCheck} />
                    At least 6 characters.
                  </p>
                  <p>
                    <FontAwesomeIcon className="checked" icon={faCheck} />
                    At least 1 upper case letter (A-Z).
                  </p>
                  <p>
                    <FontAwesomeIcon className="checked" icon={faCheck} />
                    At least 1 lower case letter (a-z).
                  </p>
                  <p>
                    <FontAwesomeIcon className="checked" icon={faCheck} />
                    At least 1 number (0-9).
                  </p>
                </div>
              </div>
              <form className="login-area-form">
                <div className="password">
                  <input
                    type={iconList[0].showPassword ? 'text' : 'password'}
                    key={iconList[0].id}
                    className="input-pass"
                    placeholder="Enter old password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <span className="icon-pass">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <span className="icon-eye">
                    <FontAwesomeIcon icon={faEye} onClick={() => onCheckBtnClick(iconList[0].id)} />
                  </span>
                </div>
                <div className="password">
                  <input
                    type={iconList[1].showPassword ? 'text' : 'password'}
                    key={iconList[1].id}
                    className="input-pass"
                    placeholder="Enter new password"
                    onChange={handleOnchange}
                    required
                  />
                  <span className="icon-pass">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <span className="icon-eye">
                    <FontAwesomeIcon icon={faEye} onClick={() => onCheckBtnClick(iconList[1].id)} />
                  </span>
                </div>
                <div className="password">
                  <input
                    type={iconList[2].showPassword ? 'text' : 'password'}
                    key={iconList[2].id}
                    className="input-pass"
                    placeholder="Re_Enter new password"
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                  <span className="icon-pass">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <span className="icon-eye">
                    <FontAwesomeIcon icon={faEye} onClick={() => onCheckBtnClick(iconList[2].id)} />
                  </span>
                </div>
                <div>
                  {newPassword !== rePassword ? (
                    <span className="errorPass">Re-Enter Password does not match Password</span>
                  ) : (
                    ' '
                  )}
                  {validatePassword == false && newPassword.length > 0 ? (
                    <span className="errorPass">
                      New password is out of the norm, look to the right to see the rule.{' '}
                    </span>
                  ) : (
                    ' '
                  )}
                </div>
                <div className="contain-btn">
                  <button className="btn-login" onClick={changePassword}>
                    Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const StyledForgotPassword = styled(ChangePassword)`
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
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  .detail-rules .checked {
    color: #2980b9;
  }
  //* Input css */
  .input-pass {
    outline: none;
    border: none;
  }
  .input-pass:focus {
    animation: pulse-animation 1.5s infinite;
  }
  .errorPass {
    display: block;
    margin: 0.2rem 1rem;
    color: red;
    font-size: 0.8rem;
  }
  //** animation for input */
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
  .input-pass {
    font-family: sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #666666;
    display: block;
    width: 100%;
    background: #ecf0f1;
    height: 50px;
    padding: 0 30px 0 68px;

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
    color: tomato;
  }

  /* Responsive */
  @media (max-width: 62rem) {
    .wrap-login {
      padding: 40px 90px 60px 85px;
    }

    .rules-account {
      width: 35%;
    }

    .login-area-form {
      width: 50%;
    }
  }

  @media (max-width: 48rem) {
    .wrap-login {
      padding: 40px 80px 81px 80px;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .login-area-form {
      width: 100%;
    }
    .detail-rules h5,
    p {
      display: none;
    }
    .title-h2 {
      display: inline-block;
      font-size: 1.25rem;
      width: 12.5rem;
      margin-left: 9.375rem;
    }
  }

  @media (max-width: 36rem) {
    .wrap-login {
      padding: 40px 80px 81px 80px;
      display: flex;
      flex-direction: column;
      width: 65%;
    }
    .login-area-form {
      width: 100%;
    }
    .detail-rules h5,
    p {
      display: none;
    }
    .title {
      text-align: center;
    }

    .title-h2 {
      display: inline-block;
      font-size: 1.25rem;
      width: 12.5rem;
      margin-left: 1.375rem;
    }

    .input-pass {
      padding: 0 30px 0 46px;
    }

    .icon-eye {
      padding-right: 8px;
    }
    .container {
      overflow: hidden;
    }
  }
`
  export default StyledForgotPassword
