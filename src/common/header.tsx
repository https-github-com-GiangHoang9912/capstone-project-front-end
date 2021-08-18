import { Dispatch, FC, SetStateAction } from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
// MUI
import { IconButton, AppBar, Toolbar } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import * as CONSTANT from '../const'

interface Styled {
  className?: string
  isOpen?: Boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  isForgotPassword: boolean
  setIsLogin?: Dispatch<SetStateAction<boolean>>
  setIsForgotPassword?: Dispatch<SetStateAction<boolean>>
}
type HeaderProps = {} & Styled

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: '#303f9f'
    },
    title: {
      flexGrow: 1,
    },
  })
)

const LOGOUT_URL = `${CONSTANT.BASE_URL}/logout`

const Header: FC<HeaderProps> = (props) => {
  const { className, isOpen, setIsOpen, isForgotPassword, setIsLogin, setIsForgotPassword } = props
  const username = localStorage.getItem('username')
  const avatar = localStorage.getItem('avatar')
  const classes = useStyles()

  const handleLogout = async () => {
    const response = await axios.get(LOGOUT_URL)
    setIsLogin?.(true)
    setIsForgotPassword?.(false)
    console.log(response)
    localStorage.clear()
  }

  return (
    <AppBar color="inherit" className={className}>
      <Toolbar>
        {
          !isForgotPassword ?
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setIsOpen?.(!isOpen)
              }}
            >
              <MenuIcon />
            </IconButton>
            : ''
        }

        <div className={classes.title}>
          <NavLink to="/home">
            <img
              className="cmsIcon"
              src="https://cmshn.fpt.edu.vn/pluginfile.php/1/core_admin/logocompact/0x70/1597744132/2020-FPTU-Eng.png"
              alt=""
            />
          </NavLink>
        </div>
        <div className="account-box">
          {username ? (
            <div className="account-box">
              <NavLink to="/profile" className="right-menu user">
                <div className="avt">
                  <img id="avatar" src={avatar || 'images/avatar2.png'} alt="avt" />
                </div>
<<<<<<< Updated upstream
                
                <span className="tooltiptext">Edit Profile</span>
=======
                <div className="txt">{username}</div>
                <span className="tooltiptext">View Profile</span>
>>>>>>> Stashed changes
              </NavLink>
              <NavLink onClick={handleLogout} to="/login" className="right-menu log-out">
                <div className="avt">
                  <img
                    id="icon"
                    src="https://image.flaticon.com/icons/png/512/1828/1828490.png"
                    alt="logout-img"
                  />
                </div>
               
              </NavLink>
            </div>
          ) : (
            <NavLink onClick={handleLogout} to="/login" className="right-menu log-out">
              <div className="avt">
                <img
                  id="icon"
                  src="https://image.flaticon.com/icons/png/128/1828/1828490.png"
                  alt="logout-img"
                />
              </div>
              
            </NavLink>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
const StyledHeader = styled(Header)`
  z-index: 999;
  .account-box {
    display: flex;
    flex-direction: row;
  }

  .account-box a {
    text-decoration: none;
  }

  

  .right-menu {
    padding: 5px;
  }
  .right-menu:hover {
    background-color: whitesmoke;
  }
  .txt {
    text-align: center;
  }
  .user {
    margin-right: 15px;
    min-width: 90px;
  }

  .user .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .user:hover .tooltiptext {
    visibility: visible;
  }

  .avt {
    margin: auto;
    width: 2rem;
  }

  #avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #e2e7fa;
    border-radius: 100%;
  }

  #icon {
    width: 120%;
  }
`

export default StyledHeader
