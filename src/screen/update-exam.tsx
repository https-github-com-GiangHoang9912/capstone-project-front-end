import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import { useHistory, useLocation } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Button, FormHelperText, makeStyles } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import * as CONSTANT from '../const'


import Table from '../common/tableReact'


UpdateExam.propTypes = {
  className: PropTypes.string,
};

UpdateExam.defaultProps = {
  className: '',
};
interface IExam {
  id?: number,
  examName?: string,
  userId?: number
  subject?: {}
}
interface Subject {
  id: number,
  subjectName: string,
}

interface Answer {
  id: number,
  answerText: string,
  answerGroupId: number,
}

interface Question {
  id: number,
  questionBankId: number,
  answerGroupId: number,
  examId: number,
  questionBank: {
    id: number,
    questionText: string,
    subjectId: 1
  },
  answerGroup: {
    id: number,
    correctAnswer: number,
    answer: Answer[]
  }
}

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

const GET_QUESTION_URL = `${CONSTANT.BASE_URL}/questions`;

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

  const [question, setQuestion] = useState<Question[]>([
  ]);

  const location: any = useLocation();
  const idExam = location.state.params;

  console.log(idExam);

  //* Get question by idExam */
  useEffect(() => {
    axios.get(`${GET_QUESTION_URL}/${idExam}`).then((response) => {
      console.log(response.data);
      setQuestion(response.data);
    }).catch((err) => {
      console.log("Failed to get question by  id Exam: ", err.message);
    })
  }, []);

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

  const handleShow = () => {
    console.log(question);
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

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Question",
      accessor: "questionText",
    },
    {
      Header: "Answer",
      accessor: (data: any) =>
        <div>
          {
            data.answerGroup.answer.map((item: string) =>
              (<p style={{ width: "100px" }}>{item}</p>))
          }
        </div>
    },
    {
      Header: "Correct Answer",
      accessor: "answerGroup.correctAnswer"
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
              <Table columns={columns} data={question} isPagination={false} />
            </div>
          </div>
        </div>
        <div className="container-button"
          style={{ backgroundColor: 'rgb(255,255,255)' }}
        >
          <div>
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
          <div
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickAdd}
              style={{ marginTop: '0.5rem', height: '30px' }}
            >
              Add Questions
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShow}
              style={{ marginTop: '0.5rem', height: '30px' }}
            >
              Show Questions
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
  background-color:"#FFFFF"; 
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
    background-color: rgb(255,255,255);
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
  text-align: center;
}
.content-exam {
  width: 90%;
  margin-top: 3%;
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