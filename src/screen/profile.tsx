import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faUser,
  faPhone,
  faAddressBook,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'
import { AccountContext } from '../contexts/account-context'

Profile.propTypes = {
  className: PropTypes.string,
}
Profile.defaultProps = {
  className: '',
}
interface IImage {
  url: string
}

function Profile(props: any) {
  const { className } = props
  const [editStatus, setEditStatus] = useState<boolean>(true)
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [image, setImage] = useState<IImage>({
    url: account.profile.avatar ? account.profile.avatar : 'avatar2.png',
  })
  const [dob, setDob] = useState<any>(account.profile.dateofbirth)
  const [address, setAddress] = useState<any>(account.profile.address)
  const [phone, setPhone] = useState<any>(account.profile.phone)
  const [email, setEmail] = useState<any>(account.profile.email)
  function handleEdit() {
    setEditStatus(!editStatus)
    console.log(editStatus)
  }

  function handleFileChange(e: any) {
    setImage({ url: URL.createObjectURL(e.target.files[0]) })
  }

  return (
    <div className={className}>
      <div className="info-container">
        <div className="contain">
          <div className="form-contain">
            <h3 id="information">Information</h3>
            <div className="form-info">
              <span>
                ‍<FontAwesomeIcon icon={faUser} /> Username
              </span>
              <input
                type="text"
                id="username"
                className="input-bar"
                value={account.username}
                disabled={editStatus}
              />
            </div>
            <div className="form-info">
              <span>
                <FontAwesomeIcon icon={faCalendar} /> Date of birth
              </span>
              <input
                type="text"
                id="dob"
                className="input-bar"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={editStatus}
              />
            </div>
            <div className="form-info">
              <span>
                <FontAwesomeIcon icon={faAddressBook} /> Address
              </span>
              <input
                type="text"
                id="address"
                className="input-bar"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={editStatus}
              />
            </div>
            <div className="form-info">
              <span>
                <FontAwesomeIcon icon={faPhone} /> Phone number
              </span>
              <input
                type="text"
                id="phone"
                className="input-bar"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={editStatus}
              />
            </div>
            <div className="form-info">
              <span>
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </span>
              <input
                type="text"
                id="email"
                className="input-bar "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={editStatus}
              />
            </div>
            <button className="btn-edit" onClick={handleEdit}>
              {editStatus ? 'Edit profile' : 'Save'}
            </button>
            <h3>Change Password</h3>
            <NavLink to="/changePassword">
              <button className="btn btn-change">Go to change password</button>
            </NavLink>
            <h3>View Activity History</h3>
            <NavLink to="/history">
              <button className="btn btn-his">View Activity History</button>
            </NavLink>
          </div>
          <div className="img-avt">
            <img
              // eslint-disable-next-line max-len
              src={image.url}
              alt=""
            />
            <input
              type="file"
              name="file"
              id="file"
              className="input-file"
              onChange={handleFileChange}
              disabled={editStatus}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const styleProfile = styled(Profile)`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f8fb;
  padding-bottom: 20px;
  .info-container {
    margin: 2rem;
    text-align: center;
    border-radius: 5px;
  }

  .contain {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .form-contain {
    width: 100%;
    padding: 20px;
    border-radius: 20px 0px 0 20px;
    margin: 10px 0;
    text-align: center;
    border-right: 1px dotted #DAE1F5;
  }
  .form-contain h3 {
    margin: 2rem;
    color: #545d7a;
    font-size: 20px;
  }
  #information{
    margin: 0 0 2em 0;
  }
  .img-avt {
    padding: 20px;
    margin:10px 5px;
    border-left: 1px dotted #DAE1F5;
  }
  img {
    width: 200px;
  }
  .form-info {
    width: 80%;
    margin: auto;
    text-align: start;
  }
  .input-bar {
    width: 100%;
    height: 32px;
    outline: none;
    background: none;
    padding: 10px 10px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #dae1f5;
  }

  span {
    color: #10182f;
    font-weight: 500;
  }
  .btn {
    width: 250px;
    height: 40px;
    font-weight: bold;
    color: #fff;
    border: none;
  }
  .btn-change {
    background-color: #306bf3;
  }
  .btn-his {
    background-color: #da880f;
  }
  .btn-his:hover {
    background-color: #eb8f06;
  }
  .btn-change:hover {
    background-color: #0e47cc;
  }
  .btn-edit {
    width: 100px;
    height: 40px;
    background-color: #303f9f;
    color: #fff;
    border: 1px solid #dae1f5;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20px;
  }
  .btn-edit:hover {
    background-color: #0e47cc;
  }
  .form-contain {
    border-radius: 0px;
  }
  @media screen and (max-width: 782px){
    .contain{
      display: flex; 
      flex-direction: column-reverse;
      border: none;
    }
    .form-contain, .img-avt{
      border: none;
    }
  }
`
export default styleProfile
