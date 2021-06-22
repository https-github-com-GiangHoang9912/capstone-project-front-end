import GoogleLogin from 'react-google-login'
import { useContext, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import lottie from 'lottie-web'
import location from '../location.json'
import * as CONSTANT from '../const'
import { AccountContext } from '../contexts/account-context'

Login.propTypes = {
  className: PropTypes.string,
}

interface IProps {
  className: ''
}

const LOGIN_WITH_USERNAME_API = `${CONSTANT.BASE_URL}/auth/login`
const LOGIN_WITH_GOOGLE_API = `${CONSTANT.BASE_URL}/google-auth/login`

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  loginGoogle: {
    '& button': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    width: '100%',
    top: '20%',
    margin: 'auto',
  },
  btnLogin: {
    marginBottom: '15px',
    width: '100%',
    height: '50px',
  },
  loginFormTitle: {
    fontSize: '24px',
    color: '#333333',
    width: '100%',
    lineHeight: '1.2',
    textAlign: 'center',
    fontWeight: 'bold',
    display: 'block',
    paddingBottom: '35px',
    letterSpacing: '2px',
  },
  container: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    backgroundImage: `url('https://vcdn-vnexpress.vnecdn.net/2020/03/22/b-JPG-4063-1584888577.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minWidth: '430px',
  },
  wrapLogin: {
    width: '960px',
    background: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '70px 130px 80px 95px',
  },
  inputInfo: {
    width: '100%',
    marginBottom: '10px',
  },
  imgShow: {
    '& img': {
      maxWidth: '100%',
    },
    width: '50%',
  },
  loginAreaForm: {
    width: '50%',
  },
  textForgot: {
    fontFamily: 'Poppins-Regular',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#666666',
    textDecoration: 'none',
  },
  textProcess: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDiv: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, #0e252c, #0a2530, #092433, #0b2336, #102239)',
    display: 'none',
    'z-index': 2,
  },
  'input:focus': {
    animation: 'pulse-animation 1.5s infinite'
  },
  '@media (max-width: 992px)': {
    loginAreaForm: {
      width: '50%'
    }
  },
  '@media (max-width: 890px)': {
    imgShow: {
      display: 'none'
    },
    loginAreaForm: {
      width: '100%'
    }
  }
}))

function Login(props: IProps) {
  const { className } = props
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()
  const history = useHistory()
  const { setInformation } = useContext(AccountContext)
  const container = useRef<HTMLDivElement>(null)

  const stopLoading = () => {
    if (container.current) container.current.style.display = 'none'
  }

  const HandleLogin = (e: any) => {
    e.preventDefault()
    if (container.current) {
      container.current.style.display = 'block'
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: location,
      })
      setTimeout(async () => {
        const response = await axios
          .post(LOGIN_WITH_USERNAME_API, {
            username: userName,
            password,
          })
          .catch((err) => {
            console.log(err)
            stopLoading()
          })
        if (response && response.data) {
          setInformation(response.data.account)
          console.log(response.data)
          stopLoading()
          history.push('/Home')
        }
      }, 2000)
    }
  }

  const responseGoogle = (googleRes?: any) => {
    if (container.current && googleRes.profileObj) {
      container.current.style.display = 'block'
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: location,
      })
      setTimeout(async () => {
        const response = await axios
          .post(LOGIN_WITH_GOOGLE_API, googleRes.profileObj)
          .catch((err) => {
            console.log(err)
            stopLoading()
          })
        if (response && response.data) {
          setInformation(response.data.account)
          console.log(response.data)
          stopLoading()
          history.push('/Home')
        }
      }, 2000)
    }
  }

  return (
    <div className={className}>
      <div className={classes.loadingDiv} ref={container} />
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.wrapLogin}>
            <div className={classes.imgShow}>
              <img src="desk.png" alt="IMG" />
            </div>
            <form className={classes.loginAreaForm} onSubmit={HandleLogin}>
              <span className={classes.loginFormTitle}>DDSGQ</span>
              <div className={classes.inputInfo}>
                <TextField
                  required
                  id="username-input"
                  label="Username or Email"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className={classes.inputInfo}>
                <TextField
                  required
                  id="password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="contain-btn">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.btnLogin}
                  type="submit"
                >
                  Login
                </Button>
              </div>
              <div className={classes.loginGoogle}>
                <GoogleLogin
                  clientId={CONSTANT.GOOGLE_CLIENT_ID}
                  buttonText="FPT.EDU.VN"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </div>
              <div className={classes.textProcess}>
                <a className={classes.textForgot} href="#">
                  Change /
                </a>
                <a className={classes.textForgot} href="#">
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

const StyledLogin = styled(Login)``
export default StyledLogin
