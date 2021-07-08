import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components'
import Table from '../common/tableReact'


Staff.propTypes = {
  className: PropTypes.string,
  staff: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
  })
}

Staff.defaultProps = {
  className: '',
  staff: {}
}


ManageStaffs.propTypes = {
  className: PropTypes.string,
}

ManageStaffs.defaultProps = {
  className: '',
}

function Staff(props: any) {
  const { className } = props
  const { staff } = props
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
          <span className="text-email">{ staff.mail }</span>
          <span className="text-name">{ staff.name }</span>
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

function ManageStaffs(props: any) {
  const staffs = [
    {
      id: 101,
      name: 'Nguyen Anh Tien',
      mail: 'tienna@fe.edu.vn',
      block: true
    },
    {
      id: 102,
      name: 'Tran Van Toan',
      mail: 'toantv@fe.edu.vn',
      block: false
    },
    {
      id: 201,
      name: 'Pham Nhat Anh',
      mail: 'anhpn@fe.edu.vn',
      block: false
    }
    ,
    {
      id: 102,
      name: 'Tran Van Toan',
      mail: 'toantv@fe.edu.vn'
    },
    {
      id: 201,
      name: 'Pham Nhat Anh',
      mail: 'anhpn@fe.edu.vn'
    }
    ,
    {
      id: 102,
      name: 'Tran Van Toan',
      mail: 'toantv@fe.edu.vn'
    },
    {
      id: 201,
      name: 'Pham Nhat Anh',
      mail: 'anhpn@fe.edu.vn'
    }
  ]
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "mail",
    },
    {
      Header: "View Profile",
       Cell: ( cell:any ) => (
        <span><Icon color="primary" >visibility</Icon></span>
      )
    },
    {
      Header: "Block/Unblock",
      acccesor: "block",
       Cell: ( cell:any ) => (
        <span><Icon color="secondary" >lock_circle</Icon></span>
      )
    }
  ]
  let StaffsComponents:any = []

  try {
    StaffsComponents = staffs.map((staff) =>
      <Staff key={staff.id.toString()} staff={staff} />
    )
  } catch (error) {
    console.log(`err: ${error}`);
  }

  const { className } = props
  const [checked, setChecked] = useState(true)

  return (
    <div className={className}>
      <div className="limiter">
        <div className="container">
          <div className="main">
            <div className="search">
              <input
                type="text"
                className="value-search"
                placeholder="Search to add available staff..."
              />
              <span className="icon-search">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <div className="text-box">
                <p className="btn btn-white btn-animate">Cancel</p>
              </div>
            </div>
            <div className="manage">
              <Table className="table-wrapper" columns ={columns} data={staffs} isPagination = {true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledAdmin = styled(ManageStaffs)`
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

  input {
    outline: none;
    border: none;
  }
    
  div .checkbox {
    width: 20%;
  }

  div .text-all {
    width: 20%;
  }

  div .profile {
    width: 28%;
    height: 60px;
    display: flex;
    padding: 5px;
  }

  div .iconTrash {
    width: 20%;
  }

  .limiter {
    width: 100%;
    margin: 0 auto;
  }
  .container {
    width: 100%;
    height: auto;
    overflow: auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }
  .main {
    background: #fff;
    border-radius: 5px;
    overflow: auto;
    align-items: center;
    padding: 10px;
    margin: 1rem;
    width: 100%;
    padding: 10px 30px;
    width: 70%;
    min-width: 690px;
  }

  .manage {
    height: 30rem;
    .table-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }

  table {
    overflow: auto;
    table-layout: auto;
  }

  th {
    text-align: left !important;
  }

  /** css for area contain search */
  .search {
    position: relative;
    display: flex;
    margin: auto;
    align-items: center;
    background: #cecdcd;
    padding: 10px;
    width: 500px;
  }
  
  .value-search {
    width: 350px;
    font-family: sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #666666;
    display: block;
    background: #fff;
    height: 50px;
    border-radius: 10px;
    padding: 0 30px 0 30px;
    cursor: auto;
    padding: 0 30px 0 65px;
  }
  /** icon search */
  .icon-search {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    padding-left: 35px;
  }
  .fa-search:hover {
    color: rgb(20, 235, 20);
    cursor: pointer;
  }

  .btn-white {
    margin-left: 10px;
  }
  
  //** css button */
  .text-box {
    margin-left: 25px;
    width: 90px;
    height: 45px;
    background: rgb(81, 207, 230);
    align-items: center;
    display: flex;
    border-radius: 5px;
    padding-left: 10px;
  }
  .text-box p {
    color: #fff;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
  }

  .text-box p:hover {
    color: red;
    cursor: pointer;
  }

  //** kẻ ngang **/
  .display {
    width: 45%;
    align-items: center;
    margin-top: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  //* content select */
  .select-all {
    display: flex;
    margin-top: 70px;
    align-items: baseline;
  }
  .content-detail {
    display: flex;
    margin-top: 30px;
    align-items: center;
  }

  .checkbox {
    width: 20px;
    height: 20px;
  }

  .text-select,
  .text-profile {
    font-size: 20px;
  }

  /* css for Staff */
  .child-container {
    display: flex;
    margin-top: 30px;
    align-items: center;
  }

  img {
    width: 60px;
    height: 60px;
  }


  .text-select,
  .text-profile {
    font-size: 20px;
  }

  //** setsize div */
  div .checkbox-child {
    width: 50px;
  }

  div .avatar-user {
    width: 10%;
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
    margin-left: 10px;
  }

  .profile-user .text-email {
    font-size: 13px;
  }
  .profile-user .text-name {
    font-size: 20px;
  }
`
export default StyledAdmin
