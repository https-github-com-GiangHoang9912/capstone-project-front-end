import React, { useState, FC, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import axios from 'axios'
import * as moment from 'moment'
import { useTable, usePagination } from 'react-table'
import BlockIcon from '@material-ui/icons/Block'
import TextField from '@material-ui/core/TextField'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation'
import IconButton from '@material-ui/core/IconButton'
import LoadingBar from 'react-top-loading-bar'
import styled from 'styled-components'
import Dialog from '../common/dialog'
import * as CONSTANT from '../const'
import ava2 from '../images/avt_profile.png'

ManageStaffs.propTypes = {
  className: PropTypes.string,
}

ManageStaffs.defaultProps = {
  className: '',
}

type BooleanProp = {
  cell: {
    value?: Boolean
  }
}

interface User {
  id: number
  username: string
  role: number
  active: boolean
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

const GET_USERS_URL = `${CONSTANT.BASE_URL}/user/users`
const GET_USERS_SEARCH_URL = `${CONSTANT.BASE_URL}/user`
const UPDATE_ACTIVE_URL = `${CONSTANT.BASE_URL}/user/update-active`
const UPDATE_ROLE_URL = `${CONSTANT.BASE_URL}/user/update-role`
const GET_INFORMATION_URL = `${CONSTANT.BASE_URL}/user/get-information`

function ManageStaffs(props: any) {
  const { className, handleNotification } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [progress, setProgress] = useState(0)
  const typingTimeoutRef = useRef<any>(null)
  const [disableRole, setDisableRole] = useState(true)
  const [roleValue, setRoleValue] = useState(0)
  const [roleId, setRoleId] = useState(0)
  const [isOpenRole, setIsOpenRole] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [user, setUser] = useState<User[]>([])
  const [userDetail, setUserDetail] = useState<any>({
    firstName: 'ba',
    lastName: 'ba',
    email: 'ba',
    phone: 'ba',
    dateOfBirth: 'ba',
    address: 'ba',
  })
  const renderActionBtns: FC<any> = ({
    cell: { value },
    row: {
      original: { id },
    },
  }) => (
    <div className="action-btns">
      <IconButton className="icon-button">
        {value ? (
          <LockOpenIcon fontSize="medium" color="primary" onClick={() => handleActive(value, id)} />
        ) : (
          <BlockIcon fontSize="medium" color="secondary" onClick={() => handleActive(value, id)} />
        )}
      </IconButton>
      <IconButton className="icon-button">
        <TransferWithinAStationIcon onClick={() => handleChangeRole(id)} />
      </IconButton>
    </div>
  )

  const renderRoleSelect: FC<any> = ({
    row: {
      original: { role },
    },
  }) => <div>{role === 3 ? <p>User</p> : <p>Staff</p>}</div>

  const renderStatus: FC<any> = ({
    row: {
      original: { active },
    },
  }) => (
    <div>
      {active ? (
        <Chip label="Blocked" color="secondary" className="status-chip" />
      ) : (
        <Chip label="Active" color="primary" className="status-chip" />
      )}
    </div>
  )

  const renderNameBox: FC<any> = ({
    row: {
      original: { role },
    },
    cell: { value },
  }) => (
    <div className="name-box">
      <div
        className="avt"
        style={{
          backgroundImage:
            'url(' + 'https://image.flaticon.com/icons/png/128/3237/3237472.png' + ')',
        }}
      />
      <div className="name-gender">
        <Button className="name" onClick={() => handleDialogOpen(value)}>
          {value}
        </Button>
        <div className="gender">{role === 2 ? 'Staff' : 'User'}</div>
      </div>
    </div>
  )

  const detailDialog = (
    <div className={className}>
      <img
        className="user-avt"
        src={userDetail.avatar ? userDetail.avatar : ava2}
        style={{ width: 150 }}
      />
      <table id="table-info" style={{ width: 500 }}>
        <tr>
          <td>Full Name</td>
          <td className="info-user">{`${userDetail.lastName} ${userDetail.firstName}`}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td className="info-user">{userDetail.email ? userDetail.email : ''}</td>
        </tr>
        <tr>
          <td>DOB</td>
          <td className="info-user">
            {moment.default(userDetail.dateOfBirth).format('DD/MM/YYYY')}
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td className="info-user">{userDetail.address ? userDetail.address : ''}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td className="info-user">{userDetail.phone ? userDetail.phone : ''}</td>
        </tr>
      </table>
    </div>
  )
  const handleRoleValue = (e: any) => {
    setRoleValue(e.target.value)
  }

  const RoleDialog = (
    <div>
      <select value={roleValue} onChange={handleRoleValue}>
        <option value="3">User</option>
        <option value="2">Staff</option>
      </select>
    </div>
  )

  const handleActive = async (value: any, id: any) => {
    setIsDisable(true)
    setProgress(progress + 20)
    const active = !value
    const response1 = await axios.put(UPDATE_ACTIVE_URL, { id, active })
    if (response1) {
      setProgress(100)
      setIsDisable(false)
      handleNotification('success', `${CONSTANT.MESSAGE().UPDATE_SUCCESS}`)
    } else {
      handleNotification('danger', `${CONSTANT.MESSAGE("Change User's Status").FAIL}`)
    }
    axios.get(`${GET_USERS_URL}`).then((response) => {
      setUser(response.data)
    })
  }

  const handleChangeRole = (id: any) => {
    setIsOpenRole(true)
    setRoleId(id)
  }

  useEffect(() => {
    axios.get(`${GET_USERS_URL}`).then((response) => {
      setUser(response.data)
    })
  }, [])

  const handleDialogOpen = (username: any) => {
    setIsOpen(true)
    axios.post(GET_INFORMATION_URL, { username }).then((response) => {
      setUserDetail(response.data)
    })
  }
  function handleDialogClose() {
    setIsOpen(false)
    setIsOpenRole(false)
  }

  const handleDialogChangeRole = async () => {
    setIsDisable(true)
    setProgress(progress + 20)
    const response1 = await axios.put(UPDATE_ROLE_URL, { roleId, roleValue })
    if (response1) {
      setProgress(100)
      setIsDisable(false)
      setIsOpenRole(false)
      handleNotification('success', `${CONSTANT.MESSAGE().UPDATE_SUCCESS}`)
    } else {
      setProgress(100)
      setIsDisable(false)
      setIsOpenRole(false)
      handleNotification('danger', `${CONSTANT.MESSAGE('Create Exam').FAIL}`)
    }
    axios.get(`${GET_USERS_URL}`).then((response) => {
      setUser(response.data)
    })
  }

  const data = user
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Account',
        accessor: 'username',
        Cell: renderNameBox,
      },
      {
        Header: 'Full Name',
        accessor: (d: any) =>
          `${d.contactInfo ? d.contactInfo.lastName : ''} ${
            d.contactInfo ? d.contactInfo.firstName : ''
          }`,
      },
      {
        Header: 'Role',

        Cell: renderRoleSelect,
      },
      {
        Header: 'Status',
        Cell: renderStatus,
      },

      {
        Header: 'Action',
        accessor: 'active',
        Cell: renderActionBtns,
      },
    ],
    []
  )

  useTable({ columns, data }, usePagination)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination)
  const arr = []
  for (let i = 1; i <= pageCount; i++) {
    arr.push(i)
  }

  const handleSearchValue = useCallback((e: any) => {
    setSearchValue(e.target.value)
    if(!searchValue){
      axios.get(`${GET_USERS_URL}`).then((response) => {
        setUser(response.data)
      })
    }
  },[])

  const searchAccount = ()=>{
    
    axios.get(`${GET_USERS_SEARCH_URL}/${searchValue}`).then((response) => {
      setUser(response.data)
    })
  }

  return (
    <div className={className}>
      <div className="container">
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div className="search-box">
          <TextField
            id="outlined-search"
            label="Search user"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={handleSearchValue}
          />
          <button
            className="btn-search"
            onClick={searchAccount}
          >
            {' '}
            Search{' '}
          </button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      
        <div className="pagination">
        {data.length <= pageSize? (
         <div className="pagin-page" />
         ) : (
          <div>
          <button className="btnChange" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          {arr.map((item, index) => (
            <button
              className={pageIndex === index ? ' pageNumber pageActive' : 'pageNumber '}
              onClick={() => gotoPage(item - 1)}
            >
              {item}
            </button>
          ))}
          <button className="btnChange" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          </div>
       )}
      <div>
          <select
            value={pageSize}
            className="select-page"
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 15, 50].map((pageSizes) => (
              <option key={pageSizes} value={pageSizes}>
                Show {pageSizes}
              </option>
            ))}
          </select>
          </div>
        </div>

      <Dialog
        title="Profile"
        buttonCancel="Close"
        content={detailDialog}
        isOpen={isOpen}
        handleClose={handleDialogClose}
      />
      <Dialog
        title="Profile"
        buttonCancel="Close"
        buttonAccept="Change"
        message="Change this account role"
        content={RoleDialog}
        isOpen={isOpenRole}
        handleAccept={handleDialogChangeRole}
        handleClose={handleDialogClose}
      />
    </div>
    </div>
  )
}

const StyledAdmin = styled(ManageStaffs)`

  table {
    border-collapse: collapse !important;
    margin: auto;
    margin-top: 2rem;
    table-layout: fixed;
    overflow: auto thead {
      background-color: #d5dfea;
      color: #25292d;
      position: sticky;
      top: 74px;
      position: -webkit-sticky;
      z-index: 100;
      border-radius: 10px;
    }
  }
  th,
  td {
    border-bottom: 1px solid lightgray;
    padding: 1rem 1.5rem;
    border-collapse: collapse !important;
    text-align: left !important;
  }

  tbody tr:hover {
  }

  .icon-button {
    background-color: #e4e4e4;
    margin-right: 10px;
  }

  .name-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .container {
    overflow: auto;
    margin: 6rem 1.5rem 1.5rem 1.5rem;
    background-color: #fbfbfb;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .avt {
    background-size: cover;
    min-width: 50px;
    min-height: 50px;
    max-width: 50px;
    max-height: 50px;
  }
   .btn-search {
     height: 40px;
     width: 80px;
     margin: 0 1rem;
     background-color: #303f9f;
     font-size: 0.9rem;
     color: #fff;
     border: none;
     outline: none;
     border-radius: 5px;
   }
   .btn-search:hover {
     filter: grayscale(50%)
   }
  .name {
    padding: 0;
    color: #3f96f3;
    min-width: 10rem;
    justify-content: left;
  }

  .gender {
    font-size: 13px;
    color: gray;
  }
  .search-box {
    text-align: right;
    padding: 1rem;
  }

  .pagination {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .pagin-page{
    width:100%;
  }
  .pagin-number {
    margin: 1rem;
  }
  .select-page{
    margin: 1.3rem;
  }
  .pageSize {
    border: none;
    outline: none;
    font-size: 0.9rem;
    margin-left: 1rem;
    border-bottom: 2px solid #303f9f;
    background: none;
  }
  .btnChange {
    color: #303f9f;
    width: 50px;
    height: 30px;
    font-weight: bold;
    background-color: #fff;
    font-size: 18px;
    border: none;
    margin: 1rem;
  }
  .pageNumber {
    width: 30px;
    height: 30px;
    margin: 0 0.2rem;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    background-color: #cbe0dd;
  }
  .pageActive {
    background-color: #303f9f;
    color: #fff;
  }
  .pageNumber:hover {
    background-color: #becbeb;
  }
  .detail-container h3 {
    color: red;
  }
  #table-info td {
    border: 1px solid lightgray;
    font-size: 0.9rem;
  }
`
export default StyledAdmin
