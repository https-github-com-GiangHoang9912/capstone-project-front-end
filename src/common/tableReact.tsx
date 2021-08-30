import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'
import PropTypes from 'prop-types'

TableReact.propTypes = {
  className: PropTypes.string,
}
TableReact.defaultProps = {
  className: '',
}
function TableReact(props: any) {
  const { className, columns, data, isPagination } = props
  useTable({
    columns,
    data,
  })

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
    rows,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination)
  const arr = []
  for (let i = 1; i <= pageCount; i++) {
    arr.push(i)
  }
  let dataRow = []
  isPagination ? (dataRow = page) : (dataRow = rows)
  return (
    <div className={className}>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              <th>No. </th>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} key={i}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {dataRow.map((row, index) => {
            prepareRow(row)
            const { key, ...restRowProps } = row.getRowProps()
            return (
              <tr key={key} {...restRowProps}>
                <td>{index + 1 + pageIndex * pageSize}</td>
                {row.cells.map((cell) => {
                  const { ...restCellProps } = cell.getCellProps()
                  return <td {...restCellProps}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination">
        {!isPagination || data.length <= pageSize ? (
          <div className="pagin-page" />
        ) : (
          <div>
            <button
              className="btnChange"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
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
        {isPagination ? (
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
        ) : (
          ' '
        )}
      </div>
    </div>
  )
}

const StyleTable = styled(TableReact)`
  thead {
    position: sticky;
    top: 0;
    position: -webkit-sticky;
    z-index: 100;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0rem 0rem;
  }

  th {
    text-align: left;
    color: #fff;
    font-size: 1rem;
    background-color: #303f9f;
    padding: 0.8rem 0.7rem;
  }

  tr:nth-child(even) {
    background-color: #ebf6fa;
  }
  td {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
    padding: 0.3rem 0.5rem;
  }
  td:last-child {
    display: block;
  }
  .pagination {
    margin: 1rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pagin-page {
    width: 100%;
  }
  .pageSize {
    border: none;
    outline: none;
    font-size: 0.9rem;
    margin-left: 1rem;
    border-bottom: 2px solid #303f9f;
    background: none;
  }
  .select-page {
    margin: 1.3rem;
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
`
export default StyleTable
