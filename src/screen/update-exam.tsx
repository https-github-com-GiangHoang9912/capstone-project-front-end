import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';

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
    width: '5rem',
    height: 30,
    cursor: 'pointer',
    margin: '5px 20px',
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
  const history = useHistory();
  const [open, setOpen] = useState(false); // for event click add
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [idQuestion, setIdQuestion] = useState(0);
  const [nameQuestion, setNameQuestion] = useState('');
  /** event click button delete */
  const handleClickDelete = (id: number, name: string) => {
    setOpenDialogDelete(true);
    setIdQuestion(id);
    setNameQuestion(name);
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };
  /** event click button add */
  const handleClickAdd = () => {
    setOpen(true);
    setScroll(scroll);
  };
  const handleCloseDialogAdd = () => {
    setOpen(false);
  };

  const selectionChangeHandler = (event: any) => {
    setSelected(event.target.value)
  };
  const selectionBankHandler = (event: any) => {
    setNameBank(event.target.value)
  };

  /* event when click Back */
  const handleClickBack = () => {
    history.push('/list-exam');
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
      ],
      correct: 'A'
    },
    {
      id: 102,
      name: 'Asia is a continent?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'Asia has a land area about approx?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: ' In which region are the mountain and platea systems of Asia concentrated?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world?',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world? ',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world? ',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 201,
      name: 'What is the largest ocean in the world? ',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
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
      ],
      correct: 'A'
    },
    {
      id: 999,
      name: 'What is the largest ocean in the world? ',
      answer: [
        'A. Japan',
        'B. Laos',
        'C. China',
        'D. VietNam'
      ],
      correct: 'A'
    }
  ]

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Question",
      accessor: "name",
    },
    {
      Header: "Answer",
      accessor: (data: any) =>
        <div>
          {data.answer.map((item: string) => (<p style={{ width: "100px" }}>{item}</p>))}
        </div>
    },
    {
      Header: "Correct Answer",
      Cell: (cell: any) =>
        <div style={{ textAlign: "center" }}>
          {cell.row.original.correct}
        </div>
    },
    {
      Header: "Delete",
      Cell: (cell: any) =>
      (
        <div className="contain">
          <Button
            variant="contained"
            color="secondary"
            className='style-btn'
            id={cell.row.original.id}
            onClick={() => handleClickDelete(cell.row.original.id, cell.row.original.name)}
          >Delete</Button>
        </div>

      )

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
          <div className="main">
            <div className="text-subject">
              <h2>SSC101 Chapter 123</h2>
            </div>
            <div className="content-exam" >
              <Table columns={columns} data={exams} isPagination={false} />
            </div>
          </div>
        </div>
        <div className="container-button">
          <div>
            {/* <Button
              variant="contained"
              color="secondary"
              className={classes.styleBtn}
              onClick={handleClickDelete}
            >
              Delete
            </Button> */}
            {/* Dialog Delete  */}
            <Dialog open={openDialogDelete} onClose={handleCloseDialogDelete}>
              <DialogTitle style={{
                backgroundColor: '#ff6b81',
                color: '#ffffff', fontWeight: 'bold',
                padding: '5px 24px'
              }}>
                <h3 className="title-delete">Delete</h3>
              </DialogTitle>
              <DialogContent style={{
                padding: '35px 24px'
              }}>
                <span>Do you want delete
                    <span style={{ fontWeight: 'bold' }}>"{nameQuestion}"</span> question???
                </span>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogDelete} color="primary">
                  Cancel
                  </Button>
                <Button onClick={handleCloseDialogDelete} color="secondary">
                  Delete
                  </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickAdd}
              style={{ marginTop: '0.2rem', height:'30px'}}
            >
              Add Questions
            </Button>
            <Dialog
              classes={{ paper: classes.dialogPaper }}
              open={open}
              onClose={handleCloseDialogAdd}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <div className={classes.title}>
                  <h2 className={classes.titleExam}>SSC101 Bank </h2>
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {body}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogAdd} color="primary">
                  Close
                </Button>
                <Button onClick={handleCloseDialogAdd} color="primary" autoFocus>
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: sans-serif;
}

.style-btn {
  width: 75;
  height: 40;
  cursor: pointer;
  margin-top: 1rem;
  margin-right: 1rem;
  font-size: 1;
}

.text-subject {
  margin-bottom: 1rem;
}
//* Css for button */

.container-button {
    display: flex;
    justify-content: center;
}
//* Css for area create exam and bank */
.create-exam {
  height: auto;
  width: 100%;
}
.container-exam {
  height: auto;
  display:flex;
  justify-content: space-around;
  padding:  0px 100px 0px 100px;
  text-align: center;
}
.content-exam {
  width: 90%;
  height: 500px;
  border: 1px solid black;
  background-color: #fff; 
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow-y: scroll;
  text-align: start;
}
.main {
  background: #fff;
  border-radius: 10px;
  overflow: auto;
  align-items: center;
  padding: 10px;
  width: 100%;
  min-width: 600px;
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  flex-direction: column;
}

//* Responsive */
`
export default StyledUpdateExam;