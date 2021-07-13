import  React, { useState, FC } from 'react'
import PropTypes from 'prop-types'

import Icon from '@material-ui/core/Icon';
import BlockIcon from '@material-ui/icons/Block';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import styled from 'styled-components'
import { useTable } from 'react-table'


ManageStaffs.propTypes = {
  className: PropTypes.string,
}

ManageStaffs.defaultProps = {
  className: '',
}

type BooleanProp = {
  cell : {
    value?: Boolean
  }
}

function ManageStaffs(props: any) {
  const { className } = props

  const renderBlockIcon: FC<BooleanProp> = ({ cell: { value } }) =>
    <IconButton className='icon-button'>
      {
        value ? <LockOpenIcon fontSize='medium' color='primary'/>
              : <BlockIcon fontSize='medium' color='secondary' />
      }
    </IconButton>
  const renderStatus: FC<any> = ({ row: { original: { block } } }) =>
      <div>
        {
          block ? <Chip label='Blocked' color='secondary' className='status-chip'/>
          : <Chip label='Active' color='primary' className='status-chip' />
        }
      </div>

  const renderNameBox: FC<any> = ({ row: { original: { isMale } }, cell: { value } }) =>
    <div className="name-box">
      <Button className='name'>{value}</Button>
      <div className="gender">{isMale ? 'Male': 'Female'}</div>
    </div>

  const data = React.useMemo(
    () => [
      {
        id: 101,
        name: 'Nguyen Anh Tien',
        isMale: true,
        mail: 'tienna@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: true
      },
      {
        id: 201,
        name: 'Pham Nhat Anh',
        isMale: false,
        mail: 'anhpn@fe.edu.vn',
        phone: '0965625152',
        department: 'SB',
        block: false
      },
      {
        id: 102,
        name: 'Tran Van Toan',
        isMale: true,
        mail: 'toantv@fe.edu.vn',
        phone: '0965625152',
        department: 'MC',
        block: false
      },
      {
        id: 201,
        name: 'Pham Nhat Anh',
        isMale: false,
        mail: 'anhpn@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: false,
      },
      {
        id: 301,
        name: 'Nguyen Anh Tu',
        isMale: true,
        mail: 'tuna@fe.edu.vn',
        phone: '0965625152',
        department: 'SB',
        block: true
      },
      {
        id: 302,
        name: 'Pham Nhat Huyen',
        isMale: false,
        mail: 'anhpn@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: false
      },
      {
        id: 303,
        name: 'Tran Van Toan',
        isMale: true,
        mail: 'toantv@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: false
      },
      {
        id: 304,
        name: 'Pham Minh Lan',
        isMale: false,
        mail: 'anhpn@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: false,
      },
  
    ],
    []
  )
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Full Name",
        accessor: "name",
        Cell: renderNameBox,
      },
      {
        Header: "Email",
        accessor: "mail",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Status",
        Cell: renderStatus,
      },
      {
        Header: "Action",
        accessor: "block",
        Cell: renderBlockIcon,
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data })
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
 
  return (
    <table {...getTableProps()} className={className}>
      <thead>
        {
        headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
            headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))
            }
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
        rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {
              row.cells.map(cell => 
                <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const StyledAdmin = styled(ManageStaffs)`
  border-collapse: collapse !important;
  margin: auto;
  margin-top: 2rem;
  
  thead {
    background: #d5dfea;
    color: #25292d;
    position: sticky;
    top: 74px; 
    position: -webkit-sticky;
    z-index: 100;
    border-radius: 10px;
  }

  th, td {
    border-bottom: 1px solid lightgray;
    padding: 1rem 1.5rem;
    text-align: left;
  }

  tbody tr:hover {
    background-color: #eaf1f8;
  }

  .icon-button {
    background-color: #e4e4e4;
  }

  .name {
    padding: 0;
    color: #3f96f3;

  }
  .name:hover {
  }

  .gender {
    font-size: 13px;
    color: gray;
  }
`
export default StyledAdmin
