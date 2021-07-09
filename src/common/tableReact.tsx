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
  const { className } = props
  const columns: any = useMemo(() => props.columns, props.columns)
  const data: any = useMemo(() => props.data, props.data)
  const isPagination: boolean = useMemo(() => props.isPagination, props.isPagination)
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
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination)
   const arr = [];
   for(let i = 1; i <=pageCount;i++){
     arr.push(i);
   }
  return (
    <div className={className}>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} key={i}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            const { key, ...restRowProps } = row.getRowProps()
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { ...restCellProps } = cell.getCellProps()
                  return <td {...restCellProps}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {!isPagination ? (
        ' '
      ) : (
        <div className="pagination">
          
          <button className="btnChange" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
           {arr.map((item,index)=>(
             <button className={pageIndex === index ? " pageNumber pageActive": "pageNumber "} onClick={() => gotoPage(item-1)}>{item}</button>
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
         
          <select
            value={pageSize}
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
      )}
    </div>
  )
}

const StyleTable = styled(TableReact)`
  table {
    width: 100%;
    border: none;
    border-collapse: collapse;
    margin: 2rem 0rem;
  }

  th {
    text-align: left;
    color: #fff;
    font-size: 16px;
    background-color: #303f9f;
    padding: 0.6rem 0.3rem;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
  td {
    padding: 1rem 0.2rem;
    font-size: 16px;
  }
  .pagination{
    margin: 1rem;
    text-align: center;
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
export default StyleTable
