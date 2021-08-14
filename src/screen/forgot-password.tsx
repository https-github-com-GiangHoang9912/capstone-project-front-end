import { useState, useEffect, useContext } from 'react'

import PropTypes from 'prop-types'
import LockIcon from '@material-ui/icons/Lock'
import { Button, makeStyles } from '@material-ui/core'
import axios from 'axios'
import styled from 'styled-components'
import * as CONSTANT from '../const'

axios.defaults.withCredentials = true

ForgotPassword.propTypes = {
  className: PropTypes.string,
}

ForgotPassword.defaultProps = {
  className: '',
}
const useStyles = makeStyles({
  container: {
    overflow: 'hidden',
    fontFamily: 'Arial',
    background: '#f5f6fa',
    height: '100vh',
    width: '100%',
    justifyFontent: 'center',
  },
  styleBtn: {
    width: '100%',
    height: 30,
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    marginTop: 15,
    fontSize: '0.8rem',
    fontWeight: 700,
    lineHeight: '1.5',
    padding: ' 20px 55px',
    '@media(max-width: 45.875rem)': {
      fontSize: '0.65rem',
      padding: ' 20px 66px',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  iconLock: {
    fontSize: '7rem',
  },
  formForgot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: ' 0 auto',
    marginTop: '10%',
    border: '1px solid #fff',
    padding: '20px 30px 50px 30px',
    backgroundColor: '#fff',
    width: '35%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    '@media(max-width: 61.875rem)': {
      marginTop: '17%',
      width: '70%',
    },
  },
  txtEmail: {
    fontFamily: ' sans-serif',
    fontSize: ' 18px',
    lineHeight: 1.5,
    padding: '20px 30px',
    color: ' #666666',
    display: 'block',
    width: '100%',
    background: '#ecf0f1',
    height: '50px',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:focus': {
      border: '1px solid #4ad428',
      outline: 'none',
    },
  },
  inputName: {
    position: 'relative',
  },
  inputContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px',
    alignItems: 'center',
  },
  messGuide: {
    marginBottom: '1rem',
  },
  titleForgot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const FORGOT_PASSWORD = `${CONSTANT.BASE_URL}/forgot-password`

function ForgotPassword(props: any) {
  const { className, handleNotification, setIsForgotPassword, setIsMenuOpen } = props
  const classes = useStyles()
  const [email, setEmail] = useState('')

  useEffect(() => {
    setIsForgotPassword?.(true)
    setIsMenuOpen?.(false)
    return () => {
      setIsForgotPassword?.(false)
      setIsMenuOpen?.(true)
    }
  }, [])

  const handleForgotPassword = async () => {
    try {
      const forgotResponse = await axios.post(FORGOT_PASSWORD, {
        email,
      })
      if (forgotResponse && forgotResponse.status === 200) {
        handleNotification('success', `${CONSTANT.MESSAGE().SEND_MAIL_SUCCESS}`)
      } else {
        handleNotification('danger', `${CONSTANT.MESSAGE('Change Password').FAIL}`)
      }
    } catch (error) {
      // handleNotification('danger', `${CONSTANT.MESSAGE('Change Password').FAIL}`)
    }
  }

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.formForgot}>
          <div className={classes.titleForgot}>
            <LockIcon className={classes.iconLock} />
            <h3 className={classes.messGuide}>Trouble Logging In?</h3>
            <span
              className="infor-reset"
              style={{
                width: '65%',
                color: '#A1A1A1',
              }}
            >
              Enter email, phone, or username and we'll send you a link to get back into your
              account
            </span>
          </div>
          <div className={classes.inputContent}>
            <div className={classes.inputName}>
              <input
                className={classes.txtEmail}
                type="text"
                id="uname"
                placeholder="Email, Phone, or Username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontSize: '13px',
                }}
              />
            </div>
            <div className="button-reset">
              <Button
                variant="contained"
                color="primary"
                className={classes.styleBtn}
                onClick={handleForgotPassword}
              >
                Send Login Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledForgotPassword = styled(ForgotPassword)`
  .container::-webkit-scrollbar {
    display: none;
  }
`
export default StyledForgotPassword
