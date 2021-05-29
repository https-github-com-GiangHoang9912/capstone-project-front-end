import React, { FC } from 'react';

import {
  NavLink,
  useParams
} from "react-router-dom";
import styled from 'styled-components';

interface Styled {
  className?: string
}
type HeaderProps = {} & Styled
type MyParams = {
  id: string;
}

const Header: FC<HeaderProps> = (props) => {
  const { className } = props
  const { id } = useParams<MyParams>();
  console.log(id);

  return (
    <header className={className}>
      <div className="menu">
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active-li">🏡 HomePage</NavLink>
          </li>
          <li>
            <NavLink to="/check-duplicate" activeClassName="active-li"> 🍣 Check Duplicate</NavLink>
          </li>
          <li>
            <NavLink to="/self-generate" activeClassName="active-li"> 🎰 Self-generate Question</NavLink>
          </li>
        </ul>
      </div>
      <div className="account-box">
        <NavLink to="/profile" className="right-menu user">
          <div className="avt">
            <img src="https://static.wikia.nocookie.net/plantsvszombies/images/8/87/Giant_Sunflower1.png" alt="avt" />
          </div>
          <div className="txt">Hello, Mr.BanTQ</div>
          <span className="tooltiptext">Edit Profile</span>
        </NavLink>
        <NavLink to="/login" className="right-menu log-out">
          <div className="avt">
            <img src="https://i.pinimg.com/originals/24/2d/c2/242dc2fd066c6c8e36eff57b81275619.png" alt="logout-img" />
          </div>
          <div className="txt">Logout</div>
        </NavLink>
      </div>
    </header>
  )
}
const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  background-color: white;
  padding: 5px 50px;

  .menu ul {
    background-color: whitesmoke;
    color: #3f3333;
    list-style-type: none;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5px 10px 2px 20px;
    border-radius: 20px;
  }

  ul li {
   margin-right: 10px;
   border-bottom: 5px solid gray;
   border-radius: 5px;
   font-size: 20px;
  }

  .active-li {
    border-bottom: 5px solid #7171f1;
    border-radius: 5px;
  }

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
    width:100%;
    border-radius: 100%;
  }

`

export default StyledHeader
