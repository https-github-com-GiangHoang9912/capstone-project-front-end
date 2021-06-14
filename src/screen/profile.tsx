import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faPhone, faAddressBook, faCalendar } from '@fortawesome/free-solid-svg-icons'

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
  const [image, setImage] = useState<IImage>({
    url: 'https://static.wikia.nocookie.net/plantsvszombies/images/8/87/Giant_Sunflower1.png',
  })

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
        <h2 className="title-task">Your Profile</h2>
        <div className="contain">
          <div className="form-contain">
            <h3>Information</h3>
            <div className="form-info">
              <span>‍<FontAwesomeIcon icon={faUser} /> Username</span>
              <input type="text" id="username" className="input-bar" disabled={editStatus} />
            </div>
            <div className="form-info">
              <span><FontAwesomeIcon icon={faCalendar} /> Date of birth</span>
              <input type="text" id="dob" className="input-bar" disabled={editStatus} />
            </div>
            <div className="form-info">
              <span><FontAwesomeIcon icon={faAddressBook} /> Address</span>
              <input type="text" id="address" className="input-bar" disabled={editStatus} />
            </div>
            <div className="form-info">
              <span><FontAwesomeIcon icon={faPhone} /> Phone number</span>
              <input type="text" id="phone" className="input-bar" disabled={editStatus} />
            </div>
            <div className="form-info">
              <span><FontAwesomeIcon icon={faEnvelope} /> Email</span>
              <input type="text" id="email" className="input-bar " disabled={editStatus} />
            </div>
            <button className="btn-edit" onClick={handleEdit}>
              {editStatus ? 'Edit profile' : 'Save'}
            </button>
            <h3>Change Password</h3>
            <button className="btn btn-change">Go to change password</button>
            <h3>View Activity History</h3>
            <button className="btn btn-his">View Activity History</button>
          </div>
          <div className="img-avt">
            <img src={image.url} alt="" />
            <input type="file" name="file" id="file" className="input-file" onChange={handleFileChange} disabled={editStatus} />
          </div>
        </div>
      </div>
    </div>
  )
}

const styleProfile = styled(Profile)`
  width: 100%;
  height: auto;
  background-color: #f7f8fc;

  .info-container {
    width: 90%;
    margin: auto;
    text-align: center;
    border-radius: 20px;
  }

  .contain {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .form-contain {
    width: 100%;
    padding: 20px;
    border-radius: 20px 0px 0 20px;
    text-align: center;
  }
  .form-contain h3 {
    margin: 2rem;
    color: #545d7a;
    font-size: 20px;
  }
  .img-avt {
    margin: 30px;
  }
  img {
    width: 250px;
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

   
    span{
      color: #10182F;
      font-weight: 500;
    }
    .btn{
      width: 250px;
      height: 40px;
      font-weight: bold;
      color: #fff;
      border: none;
    }
    .btn-change{
      background-color: #306BF3;
    }
    .btn-his{
      background-color: #da880f;
    }
    .btn-his:hover{
      background-color: #eb8f06;
    }
    .btn-change:hover{
      background-color: #0e47cc;
    }
    .btn-edit{
      width: 100px;
      height: 40px;
      background-color: #10182F;
      color: #fff;
      border: 1px solid #DAE1F5;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }
    .btn-edit:hover {
      background-color: #000;
    }
    .form-contain {
      border-radius: 0px;
    }
  
`
export default styleProfile
