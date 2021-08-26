import { Dispatch, FC, SetStateAction, useState } from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { IconButton, AppBar, Toolbar } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
    username: {
      width: 'auto'
    },
    icon: {
      marginRight: 10
    }
  })
)

const LOGOUT_URL = `${CONSTANT.BASE_URL}/logout`

const Header: FC<HeaderProps> = (props) => {
  const { className, isOpen, setIsOpen, isForgotPassword, setIsLogin, setIsForgotPassword } = props
  const username = localStorage.getItem('username')
  const avatar = localStorage.getItem('avatar')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const usernameSplit:any= username?.split('@');
  const newUsername = username ? usernameSplit[0]: '';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
              src="images/DDSGQ.png"
              alt=""
            />
          </NavLink>
        </div>
        <div className="account-box">
          {username ? (
            <div className="account-box">
              <div className="user">
              <div className="avt"> 
                  <img id="avatar" src={avatar || 'images/avatar2.png'} alt="avt" />
                  <Button className={classes.username} onClick={handleClick}>
                      {newUsername}
                    </Button>
                </div>
               
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <NavLink to="/profile"><MenuItem onClick={handleClose}>
                    <AccountCircleIcon className={classes.icon}/>Profile</MenuItem></NavLink>
                    <NavLink to="/history"><MenuItem onClick={handleClose}>
                    <HistoryIcon className={classes.icon}/>View History</MenuItem></NavLink>
                  <NavLink onClick={handleLogout} to="/login">
                    <MenuItem onClick={handleClose}><ExitToAppIcon className={classes.icon}/>Logout
                    </MenuItem></NavLink>
                </Menu>
              </div>
        
            
            </div>
          ) : (
            <NavLink onClick={handleLogout} to="/login" className="right-menu log-out">
              <div>
                <img
                  id="icon"
                  src="https://image.flaticon.com/icons/png/128/1828/1828490.png"
                  alt="logout-img"
                />
                
              </div>
              <p className="login-p">Login</p>
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
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  #avatar {
    width: 30px;
    height: 30px;
    border: 1px solid #e2e7fa;
    border-radius: 100%;
  }
  .login-p{
    font-size: 0.9rem;
  }
  #icon {
    width: 30px;
    height:30px;
  }
`

export default StyledHeader
