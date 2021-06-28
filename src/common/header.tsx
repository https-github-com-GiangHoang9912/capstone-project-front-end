import { FC,  useContext} from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
// MUI
import { Typography, IconButton, AppBar, Toolbar, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';

import { AccountContext } from '../contexts/account-context'

interface Styled {
  className?: string
}
type HeaderProps = {} & Styled
type MyParams = {
  id: string
}

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
  }),
);

const Header: FC<HeaderProps> = (props) => {
  const { className } = props
  const { accountContextData } = useContext(AccountContext);

  const classes = useStyles();
  return (
    <AppBar 
      color='inherit'
      className={className}
    >
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <div className={classes.title}>
          <img src="https://cmshn.fpt.edu.vn/pluginfile.php/1/core_admin/logocompact/0x70/1597744132/2020-FPTU-Eng.png" alt=""/>
        </div>
        <div className="account-box">
          <NavLink to="/profile" className="right-menu user">
            <div className="avt">
              <img
                src="https://static.wikia.nocookie.net/plantsvszombies/images/8/87/Giant_Sunflower1.png"
                alt="avt"
              />
            </div>
            <div className="txt">Hello, {accountContextData.username}</div>
            <span className="tooltiptext">Edit Profile</span>
          </NavLink>
          <NavLink to="/login" className="right-menu log-out">
            <div className="avt">
              <img
                src="https://i.pinimg.com/originals/24/2d/c2/242dc2fd066c6c8e36eff57b81275619.png"
                alt="logout-img"
              />
            </div>
            <div className="txt">Logout</div>
          </NavLink>
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

  .right-menu {
    border-radius: 20px;
  }
  .right-menu:hover {
    background-color: whitesmoke;
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
    width: 40px;
  }

  .avt img {
    width: 100%;
    border-radius: 100%;
  }
`

export default StyledHeader
