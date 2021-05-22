import React from 'react';


import {
  Link
} from "react-router-dom";
import styled from 'styled-components';

function Header(props: any) {
  return (
    <StyledHeader>
      <div className="menu">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/check-duplicate">Check Duplicate</Link>
          </li>
          <li>
            <Link to="/self-generate">Self-generate Question</Link>
          </li>
        </ul>
      </div>
      <div className="account-box">
        <div className="user">
          <div className="avt"></div>
          <div className="txt">Hello Mr.BanTQ</div>
        </div>
        <div className="log-out">
          <div className="icon-out"></div>
          <div className="txt">Logout</div>
        </div>
      </div>

    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display:flex;
  background-color: red;
`

export default Header;
