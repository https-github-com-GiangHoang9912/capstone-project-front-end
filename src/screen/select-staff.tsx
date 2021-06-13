/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '@material-ui/core'

import styled from 'styled-components'

SelectStaff.propTypes = {
  className: PropTypes.string,
}

SelectStaff.defaultProps = {
  className: '',
}

function SelectStaff(props: any) {
  const { className } = props
  const [checked, setChecked] = useState(true)
  return (
    <div className={className}>
      <div className="child-container">
        <div className="checkbox-child">
          <Checkbox
            defaultChecked={checked}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
        <div className="avatar-user">
          <img src="avatar2.png" />
        </div>
        <div className="profile-user">
          <span className="text-email">FPTgmail@fe.edu.vn</span>
          <span className="text-name">Tran Quy Ban</span>
        </div>
        <div className="iconTrash">
          <span className="icon">
            <FontAwesomeIcon className="faTrash" icon={faTrash} />
          </span>
        </div>
      </div>
    </div>
  )
}
const StyledSelect = styled(SelectStaff)`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    font-family: sans-serif;
  }

  .child-container {
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: space-around;
  }
  img {
    width: 60px;
    height: 60px;
    /* margin-bottom: -10px; */
  }

  .faTrash {
    width: 18px;
    height: 18px;
  }

  .text-select,
  .text-profile {
    font-size: 20px;
  }

  //** setsize div */
  div .checkbox-child {
    width: 20%;
  }

  div .avatar-user {
    width: 20%;
  }

  div .profile-user {
    width: 28%;
    height: 60px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  div .iconTrash {
    width: 20%;
  }

  .profile-user .text-email {
    font-size: 13px;
  }
  .profile-user .text-name {
    font-size: 20px;
  }
`

export default StyledSelect
