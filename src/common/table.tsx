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
  table: {
    minWidth: 700,
    marginTop: 50,
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
    console.log(question)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell>Duplicate Score</StyledTableCell>
            <StyledTableCell>Duplicate Status</StyledTableCell>
            <StyledTableCell>Add</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item: any, i: number) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {item.question}
              </StyledTableCell>
              <StyledTableCell>{item.point.toFixed(2)}</StyledTableCell>
              <StyledTableCell>
                {item.point.toFixed(2) >= 0.6 ? 'Duplicate' : 'No Duplicate'}
              </StyledTableCell>
              <StyledTableCell>
                {item.point.toFixed(2) >= 0.6 ? (
                  'Duplicate'
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddQuestion(item.question)}
                  >
                    Add To Bank
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function TableViewExam(props: any) {
  const classes = useStyles()
  const { results } = props
  const [isOpen, setIsOpen] = useState(false)

  function handleDelete() {
    setIsOpen(true)
    // return id;
    // console.log()
  }
  const handleAcceptDelete = () => {
    setIsOpen(false)
    console.log('aaa')
  }
  const handleDialogClose = () => {
    setIsOpen(false)
  }
  return (
    <TableContainer className={classes.viewExam}>
      <Table className={classes.tableView} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Exam Name</StyledTableCell>
            <StyledTableCell>View</StyledTableCell>
            <StyledTableCell>Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item: any, i: number) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row" width={20}>
                {item.id}
              </StyledTableCell>
              <StyledTableCell width={200}>{item.name}</StyledTableCell>
              <StyledTableCell width={20}>
                <span>
                  <FontAwesomeIcon className={classes.detailExam} icon={faEye} />
                </span>
              </StyledTableCell>
              <StyledTableCell width={180}>
                <Button variant="contained" color="primary" className={classes.styleBtn}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                  className={classes.styleBtn}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <Dialog
            title="Delete Exam"
            message="Do you want delete this exam???"
            buttonAccept="Yes"
            buttonCancel="No"
            isOpen={isOpen}
            handleAccept={handleAcceptDelete}
            handleClose={handleDialogClose}
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
