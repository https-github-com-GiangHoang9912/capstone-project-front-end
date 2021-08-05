import React, { useContext, useState, useEffect } from 'react'
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
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'

import * as moment from 'moment'
import Dialog from '../common/dialog'
import { AccountContext } from '../contexts/account-context'
import * as CONSTANT from '../const'
import { refreshToken } from '../services/services'
import { storage } from '../firebase'

Profile.propTypes = {
  className: PropTypes.string,
}
Profile.defaultProps = {
  className: '',
}

axios.defaults.withCredentials = true
const GET_INFORMATION_URL = `${CONSTANT.BASE_URL}/user/get-information`
const UPDATE_PROFILE_URL = `${CONSTANT.BASE_URL}/user/update-information`

function Profile(props: any) {
  const { className } = props
  const [editStatus, setEditStatus] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState(false)
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [image, setImage] = useState<string>('avatar2.png')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [dob, setDob] = useState<string>('a')
  const [address, setAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isInputValid, setIsInputValid] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [inputError, setInputError] = useState<string>('')
  const [isDisable, setIsDisable] = useState(false)
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<any>('')
  const userId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id

  function handleEdit() {
    setEditStatus(!editStatus)
  }
  function handleEditProfile() {
    setIsOpen(true)
    setEditStatus(!editStatus)
  }
  const handleDialogClose = () => {
    setIsOpen(false)
  }
  const handleAccept = async () => {
    setIsOpen(false)
    setIsDisable(true)
    if (isInputValid) {
      setProgress(100)
      try {
        console.log(file)
        if (file) {
          const uploadTask = storage.ref(`images/${file.name}`).put(file)
          uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
              console.log(error)
            },
            async () => {
              await storage
                .ref('images')
                .child(file.name)
                .getDownloadURL()
                .then(async (url) => {
                  await axios.put(UPDATE_PROFILE_URL, {
                    id: userId,
                    firstName,
                    lastName,
                    address,
                    phone,
                    dob,
                    avatar: url,
                  })
                  localStorage.setItem('avatar', url)
                  setIsDisable(false)
                })
              refreshToken(userId)
              window.location.reload()
            }
          )
        } else {
          await axios.put(UPDATE_PROFILE_URL, {
            id: userId,
            firstName,
            lastName,
            address,
            phone,
            dob,
          })
          setIsDisable(false)
          window.location.reload()
          refreshToken(userId)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  function handleFileChange(e: any) {
    setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    try {
      const username = localStorage.getItem('username')
      axios
        .post(GET_INFORMATION_URL, {
          username,
        })
        .then((response) => {
          const dobFormat = moment.default(response.data.dateOfBirth).format('DD/MM/YYYY')
          setFirstName(response.data.firstName ? response.data.firstName : '')
          setLastName(response.data.lastName ? response.data.lastName : '')
          setEmail(response.data.email ? response.data.email : '')
          setAddress(response.data.address ? response.data.address : '')
          setPhone(response.data.phone ? response.data.phone : '')
          setDob(response.data.dateOfBirth ? dobFormat : '')
          setImage(response.data.avatar ? response.data.avatar : 'avatar2.png')
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const validateInput = (inputText: any, regex: any, error: string, errorType: string) => {
    const regexp = regex
    const checkingResult = regexp.exec(inputText)
    if (checkingResult !== null) {
      setIsInputValid(true)
      setErrorMessage('')
      setInputError('')
    } else {
      setIsInputValid(false)
      setErrorMessage(error)
      setInputError(errorType)
    }
  }

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="info-container">
        <div className="contain">
          <div className="form-contain">
            <h2 id="information">Information</h2>
            <div className="form-info">
              <span>
                ‍<FontAwesomeIcon icon={faUser} /> First Name
              </span>
              <input
                type="text"
                id="first-name"
                className="input-bar"
                onBlur={(e) =>
                  validateInput(e.target.value, /^(?!\s*$).+/, 'Name cannot be blank', 'fname')
                }
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={editStatus}
              />
              {inputError === 'fname' ? <p className="errorMessage">{errorMessage}</p> : ''}
            </div>
            <div className="form-info">
              <span>
                ‍<FontAwesomeIcon icon={faUser} /> Last Name
              </span>
              <input
                type="text"
                id="last-name"
                className="input-bar"
                onBlur={(e) =>
                  validateInput(e.target.value, /^(?!\s*$).+/, 'Name cannot be blank', 'lname')
                }
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={editStatus}
              />
              {inputError === 'lname' ? <p className="errorMessage">{errorMessage}</p> : ''}
            </div>
            <div className="form-info">
              <span>
                <FontAwesomeIcon icon={faCalendar} /> Date of birth
              </span>
              <input
                type="text"
                id="dob"
                className="input-bar"
                onBlur={(e) =>
                  validateInput(
                    e.target.value,
                    /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g,
                    'Date must be in format DD/MM/YYYY',
                    'dob'
                  )
                }
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={editStatus}
              />
              {inputError === 'dob' ? <p className="errorMessage">{errorMessage}</p> : ''}
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
                onBlur={(e) =>
                  validateInput(
                    e.target.value,
                    /^\d{10,11}$/,
                    'Phone must be 10-11 digits',
                    'Phone'
                  )
                }
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={editStatus}
              />
              {inputError === 'Phone' ? <p className="errorMessage">{errorMessage}</p> : ''}
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
                disabled={true}
              />
              {inputError === 'Email' ? <p className="errorMessage">{errorMessage}</p> : ''}
            </div>

            {editStatus ? (
              <button className="btn-edit" onClick={handleEdit}>
                Edit Profile
              </button>
            ) : (
              <button className="btn-edit" onClick={handleEditProfile} disabled={isDisable}>
                Save{' '}
              </button>
            )}
            <Dialog
              title="Update profile"
              message="Save all profile infomation changes"
              buttonAccept="Yes"
              buttonCancel="No"
              isOpen={isOpen}
              handleAccept={handleAccept}
              handleClose={handleDialogClose}
            />
            <div className="footer-info">
              <div>
                <h3>Change Password</h3>
                <NavLink to="/change-password">
                  <button className="btn btn-change">Go to change password</button>
                </NavLink>
              </div>
              <div>
                <h3>View Activity History</h3>
                <NavLink to="/history">
                  <button className="btn btn-his">View Activity History</button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="img-avt">
            <img src={image} alt="" />
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
  padding-bottom: 20px;
  .info-container {
    margin: 2rem;
    text-align: center;
    border-radius: 5px;
    padding-top: 5em;
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
    border-right: 1px dotted #dae1f5;
  }
  .form-contain h3 {
    margin: 2rem;
    color: #545d7a;
    font-size: 20px;
  }
  #information {
    margin: 0 0 2em 0;
  }
  .img-avt {
    padding: 20px;
    margin: 10px 5px;
    border-left: 1px dotted #dae1f5;
  }
  .errorMessage {
    font-size: 0.8rem;
    color: red;
    font-weight: 500px;
    margin: 0 0 0.7rem 0.5rem;
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
  .input-bar:focus {
    border-bottom: 1px solid #306bf3;
  }

  span {
    color: #10182f;
    font-weight: 500;
    font-size: 0.9rem;
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
  .footer-info {
    display: flex;
  }
  .footer-info div {
    width: 50%;
  }
  @media screen and (max-width: 1200px) {
    .contain {
      display: flex;
      flex-direction: column-reverse;
      border: none;
    }
    .form-contain,
    .img-avt {
      border: none;
    }

    .img-avt {
      display: flex;
      flex-direction: column;
      align-self: flex-end;
    }
  }
`
export default styleProfile
