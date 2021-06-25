import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    minWidth: 700,
    marginTop: 50
  },
});

export default function CustomizedTables(props:any) {
  const classes = useStyles();
  const { results } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell>Duplicate Score</StyledTableCell>
            <StyledTableCell>Duplicate Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item:any,i:number) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {item.question}
              </StyledTableCell>
              <StyledTableCell>{item.point.toFixed(2)}</StyledTableCell>
              <StyledTableCell>{item.point.toFixed(2)>= 0.6 ? "Duplicate" : "No Duplicate"}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}