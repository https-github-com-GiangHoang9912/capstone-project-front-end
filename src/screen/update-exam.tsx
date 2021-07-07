import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Button, FormHelperText, makeStyles } from '@material-ui/core'
import styled from 'styled-components'

import Table from '../common/tableReact'


UpdateExam.propTypes = {
  className: PropTypes.string,
};

UpdateExam.defaultProps = {
  className: '',
};
const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '100vh',
  },
  styleBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    margin: '5px',
  },
  paper: {
    
  },
  detailAnswer: {
    marginLeft: '1rem',
    display: 'block'
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  titleExam: {
    color: '#46178F',
    alignItems: 'center'
  },
  contentExam: {
    // flexDirection: 'column'
  },
  question: {
    marginLeft: '-25px',
    alignItems: 'center'
  },
  answer: {
    marginTop: '-10px',
    padding: '5px'
  }

}));

function UpdateExam(props: any) {
  const { className } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState('');
  const [nameBank, setNameBank] = useState('Exam Bank');
  const [scroll, setScroll] = useState('paper');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setScroll(scroll);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const selectionChangeHandler = (event: any) => {
    setSelected(event.target.value)
  };
  const selectionBankHandler = (event: any) => {
    setNameBank(event.target.value)
  };

  const exams = [
    {
      id: 101,
      name: 'In which region does Asia have a lot of oil and gas?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 102,
      name: 'Asia is a continent?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 201,
      name: 'Asia has a land area about approx?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    }
    ,
    {
      id: 102,
      name: 'Which continent is bordered by Asia?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 201,
      name: ' In which region are the mountain and platea systems of Asia concentrated?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    }
    ,
    {
      id: 102,
      name: 'Who are you?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    }
    ,
    {
      id: 102,
      name: 'Who are you?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    }
    ,
    {
      id: 102,
      name: 'Who are you?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    }
    ,
    {
      id: 102,
      name: 'Who are you?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world? ',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ]
    }
  ]

  const columns = [
    {
      width: '5%',
      Header: "ID",
      accessor: "id",
      position: 'fixed',
    },
    {
      width: '65%',
      Header: "Question",
      accessor: "name",
      position: 'fixed',
    },
    {
      width: '30%',
      Header: "Answer",
      accessor: "answer",
    },
  ]
  const body = (
    <div className={classes.paper}>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      <div className="create-exam">
        <div className="container-exam">
          <div className="exam">
            <div className="text-subject">
              <h2>SSC101 Chapter 123</h2>
            </div>
            <div className="content-exam" >
              <Table columns={columns} data={exams} />
            </div>
          </div>
        </div>
        <div className="container-button">
          <div>
            <Button variant="contained"
              color="primary"
              className={classes.styleBtn}
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.styleBtn}
              onClick={handleClickOpen}
            >
              Add
            </Button>
            <Dialog
              classes={{ paper: classes.dialogPaper }}
              open={open}
              onClose={handleClose}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <div className={classes.title}>
                  <h2 className={classes.titleExam}>SSC101 Chapter 123 </h2>
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {body}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledUpdateExam = styled(UpdateExam)`

/* height: 100vh; */
  font-family: Poppins-Regular, sans-serif;
  background-color: #f7f8fb;

.contain-select-subjects {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-subject {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
//* Css for button */

.container-button {
    margin-bottom: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
}
//* Css for area create exam and bank */
.create-exam {
  height: auto;
  width: 100%;
  overflow-y: scroll;
}
.container-exam {
  height: auto;
  display:flex;
  justify-content: space-around;
  padding:  0px 100px 10px 100px;
  text-align: center;
}
.content-exam {
  flex: 1;
  width: 100%;
  height: 500px;
  border: 1px solid black;
  background-color: #fff;
  padding: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow-y: scroll;
  text-align: start;
}
.content-exam, .content-bank p {
  font-size: 20px;
}

.content-exam p:hover {
  color:#5cb85c;
  cursor: pointer;
}
.content-bank p:hover {
  color:#5cb85c;
  cursor: pointer;
}
.title-exam {
  align-items: center;
  font-family: Barlow;
  font-size: 40px;
  font-weight:1000;
  margin-left: 6%;
  color:#ee4949;
}
//* css for icon forward */
.forward {
  font-size: 50px;
  color: #fd647a;  
  margin-top: 320px;
  width: 15%;
}
.forward:hover {
  color: #c5031f;
  cursor: pointer;
}
//* Responsive */
@media (max-width: 768px) { 
  .container-exam {
    flex-direction: column;
    padding: 10px;
  }
  .content-exam, .content-bank {
    width: 100%;
  } 
  .forward {
    margin: 50px;
    
  }
}
`
export default StyledUpdateExam;