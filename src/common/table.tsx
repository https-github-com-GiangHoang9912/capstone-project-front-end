import React, { useState } from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Dialog from './dialog'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#303f9f',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow)

const useStyles = makeStyles({
  container: {
    width: '94%',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  styleBtn: {
    width: 75,
    height: 40,
    cursor: 'pointer',
    marginLeft: '1rem',
    marginBottom: '5px',
    fontSize: 12,
  },
  tableView: {
    maxWidth: '50%',
    height: '35%',
    marginTop: '0px',
  },
  viewExam: {
    display: 'flex',
    justifyContent: 'center',
    height: 'auto',
  },
  detailExam: {
    fontSize: 20,
    '&:hover': {
      cursor: 'pointer',
      color: '#4bcffa',
    },
  },
})

export function TableCheckDuplicate(props: any) {
  const classes = useStyles()
  const { results } = props

  const handleAddQuestion = (question: string) => (e: any) => {
    e.preventDefault()
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell>Duplicate Score</StyledTableCell>
            <StyledTableCell>Duplicate Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item: any, i: number) => {
            if (item.point.toFixed(2) >= 0.6) {
              return (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {item.question}
                  </StyledTableCell>
                  <StyledTableCell>{item.point.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>
                    {item.point.toFixed(2) >= 0.6 ? 'Duplicate' : 'No Duplicate'}
                  </StyledTableCell>
                </StyledTableRow>
              )
            }
            return ''
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
