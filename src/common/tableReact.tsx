import React, { useMemo } from 'react'
import { useTable } from 'react-table'
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
  const columns: any = useMemo(() => props.columns, [])
  const data: any = useMemo(() => props.data, [])
  useTable({
    columns,
    data,
  })
  console.log(columns)
  console.log(data)
  const tableInstance = useTable({ columns, data })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

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
          {rows.map((row) => {
            prepareRow(row)
            const { key, ...restRowProps } = row.getRowProps();
            return (  
              <tr key={key} {...restRowProps} >
                {row.cells.map((cell) => {
                const {...restCellProps } = cell.getCellProps();
                return (
                  <td  {...restCellProps}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const StyleTable = styled(TableReact)`
  table {
    width: 100%;
    border: none;
    border-collapse: collapse;
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
  td{
    padding: 1rem 0.2rem;
    font-size: 16px;
  }
 
`
export default StyleTable
