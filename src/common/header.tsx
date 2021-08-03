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
}
type HeaderProps = {} & Styled

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const LOGOUT_URL = `${CONSTANT.BASE_URL}/logout`

const Header: FC<HeaderProps> = (props) => {
  const { className, isOpen, setIsOpen } = props
  const username = localStorage.getItem('username')
  const avatar = localStorage.getItem('avatar')
  const classes = useStyles()

  const handleLogout = async () => {
    const response = await axios.get(LOGOUT_URL)
    console.log(response)
    localStorage.clear()
  }

  return (
    <AppBar color="inherit" className={className}>
      <Toolbar>
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
                  <img id="avatar" src={avatar || 'avatar2.png'} alt="avt" />
                </div>
                <div className="txt">{username}</div>
                <span className="tooltiptext">Edit Profile</span>
              </NavLink>
              <NavLink onClick={handleLogout} to="/login" className="right-menu log-out">
                <div className="avt">
                  <img
                    id="icon"
                    src="https://image.flaticon.com/icons/png/512/1828/1828427.png"
                    alt="logout-img"
                  />
                </div>
                <div className="txt">Logout</div>
              </NavLink>
            </div>
          ) : (
            <NavLink onClick={handleLogout} to="/login" className="right-menu log-out">
              <div className="avt">
                <img
                  id="icon"
                  src="https://image.flaticon.com/icons/png/512/1828/1828395.png"
                  alt="logout-img"
                />
              </div>
              <div className="txt">Login</div>
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

  .cmsIcon {
    transform: scale(0.9);
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
    border-radius: 100%;
  }

  #icon {
    width: 120%;
  }
`

export default StyledHeader
