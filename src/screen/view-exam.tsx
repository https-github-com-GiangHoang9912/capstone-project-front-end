import React from 'react';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Box from '@material-ui/core/Box';


import styled from 'styled-components'



ViewExam.propTypes = {
  className: PropTypes.string,
};

ViewExam.defaultProps = {
  className: '',
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#303f9f",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },

  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles({
  table: {
    maxWidth: 900,
    marginTop: 150,
    // marginLeft: 450
    // marginBottom: 100


  },
  styleBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    marginRight: '20px'
  }
});


function ViewExam(props: any) {
  const { className } = props
  const classes = useStyles()

  const results = [
    {
      id: 1,
      name: 'SSC101 Chapter 123',
    },
    {
      id: 2,
      name: 'MEA201 Chapter 789',
    },
    {
      id: 3,
      name: 'MAD102 Chapter 456',
    },
    {
      id: 4,
      name: 'HCM201 Chapter 1234',
    },
    {
      id: 5,
      name: 'VNR205 Chapter 10',
    }

  ]

  return (
    <div className={className}>
        <Box display="flex"
            justifyContent="center"
        >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>STT</StyledTableCell>
                <StyledTableCell>Exam Name</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
                <StyledTableCell>Update</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item: any, i: number) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" width={20}>
                    {i}
                  </StyledTableCell>
                  <StyledTableCell width={200}>{item.name}</StyledTableCell>
                  <StyledTableCell width={20}><span><FontAwesomeIcon className="view-exam" icon={faEye} /></span>
                  </StyledTableCell>
                  <StyledTableCell width={380}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.styleBtn}>Edit</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.styleBtn}>Delete</Button>
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </div>

  );
}
const StyleViewExam = styled(ViewExam)`
  height: 100vh;
  
.kaka {
  display: flex;
  justify-content: center;
}
`
export default StyleViewExam;