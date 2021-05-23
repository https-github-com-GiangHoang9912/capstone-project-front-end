import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = ({ className = '' }) => (
  <header className={className}>
    <div className="menu">
      <ul>
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
        <div className="avt" />
        <div className="txt">Hello Mr.BanTQ</div>
      </div>
      <div className="log-out">
        <div className="icon-out" />
        <div className="txt">Logout</div>
      </div>
    </div>
  </header>
)

const StyledHeader = styled(Header)`
  display: flex;
  color: red;

  .log-out {
    color: blue;
  }
`

export default StyledHeader
