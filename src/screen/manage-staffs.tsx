import React, { useState, FC } from 'react'
import PropTypes from 'prop-types'

import Icon from '@material-ui/core/Icon'
import BlockIcon from '@material-ui/icons/Block'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'

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

function ManageStaffs(props: any) {
  const { className } = props

  const renderBlockIcon: FC<BooleanProp> = ({ cell: { value } }) => (
    <IconButton className="icon-button">
      {value ? (
        <LockOpenIcon fontSize="medium" color="primary" />
      ) : (
        <BlockIcon fontSize="medium" color="secondary" />
      )}
    </IconButton>
  )
  const renderStatus: FC<any> = ({
    row: {
      original: { block },
    },
  }) => (
    <div>
      {block ? (
        <Chip label="Blocked" color="secondary" className="status-chip" />
      ) : (
        <Chip label="Active" color="primary" className="status-chip" />
      )}
    </div>
  )

  const renderNameBox: FC<any> = ({
    row: {
      original: { isMale },
    },
    cell: { value },
  }) => (
    <div className="name-box">
      <div className="avt" />
      <div className="name-gender">
        <Button className="name">{value}</Button>
        <div className="gender">{isMale ? 'Male' : 'Female'}</div>
      </div>
    </div>
  )

  const data = React.useMemo(
    () => [
      {
        id: 101,
        name: 'Nguyen Anh Tien',
        isMale: true,
        mail: 'tienna@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: true,
      },
      {
        id: 201,
        name: 'Pham Nhat Anh',
        isMale: false,
        mail: 'anhpn@fe.edu.vn',
        phone: '0965625152',
        department: 'SB',
        block: false,
      },
      {
        id: 102,
        name: 'Tran Van Toan',
        isMale: true,
        mail: 'toantv@fe.edu.vn',
        phone: '0965625152',
        department: 'MC',
        block: false,
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
        block: true,
      },
      {
        id: 302,
        name: 'Pham Nhat Huyen',
        isMale: false,
        mail: 'anhpn@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: false,
      },
      {
        id: 303,
        name: 'Tran Van Toan',
        isMale: true,
        mail: 'toantv@fe.edu.vn',
        phone: '0965625152',
        department: 'SE',
        block: false,
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
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Teacher',
        accessor: 'name',
        Cell: renderNameBox,
      },
      {
        Header: 'Email',
        accessor: 'mail',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Status',
        Cell: renderStatus,
      },
      {
        Header: 'Action',
        accessor: 'block',
        Cell: renderBlockIcon,
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

  return (
    <div className={className}>
      <div className="search-box">
         <input type="text" className="search-bar" placeholder="Search account"/>
      </div>
      <table {...getTableProps()} >
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
      <div className="pagin">
        <div className="btn-group">
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
        </div>
        <div className="pagin-number">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
       
        <select
          className="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5,10,30, 50].map((pageSizes) => (
            <option key={pageSizes} value={pageSizes}>
              Show {pageSizes}
            </option>
          ))}
        </select>
        </div>
      </div>
    </div>
  )
}

const StyledAdmin = styled(ManageStaffs)`
  table{
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
    background-color: #eaf1f8;
  }

  .icon-button {
    background-color: #e4e4e4;
  }

  .name-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .avt {
    background-color: orange;
    background-image: url('../images/ava2.png');
    min-width: 50px;
    min-height: 50px;
    max-width: 50px;
    max-height: 50px;
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
  .search-box{
    margin: 2rem;
    text-align: right;
  }

  .search-bar{
    width: 20rem;
    height: 2rem;
    border-radius: 5px;
    border: none;
    outline:none;
    padding: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  }

  .pagin{
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items:center;
    text-align: center;
  }
  .pagin-number{
    margin: 1rem;
  }
 
  .pageSize{
    border: none;
    outline: none;
    font-size: 0.9rem;
    margin-left: 1rem;
    border-bottom: 2px solid #303f9f;
    background:none;
  }
  .btnChange{
    color: #303f9f;
    width: 50px;
    height: 30px;
    font-weight: bold;
    background-color: #fff;
    font-size: 18px;
    border: none;
    margin: 1rem;
  }
  .pageNumber{
    width: 30px;
    height: 30px;
    margin: 0 0.2rem;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    background-color:#cbe0dd;
  }
  .pageActive{
   background-color: #303f9f;
   color: #fff;
  }
  .pageNumber:hover {
    background-color: #becbeb;
  }
`
export default StyledAdmin
