import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import * as moment from 'moment'
import * as CONSTANT from '../const'


import Table from '../common/tableReact';

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
  questionText: string,
  answerGroupId: number,
  examId: number,
  answerGroup: {
    id: number,
    correctAnswer: number,
    answer: Answer[]
  }
}


const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject`;
const GET_EXAM_URL = `${CONSTANT.BASE_URL}/exam`;
const GET_QUESTION_URL1 = `${CONSTANT.BASE_URL}/question`;
ListExam.propTypes = {
  className: PropTypes.string,
};

ListExam.defaultProps = {
  className: '',
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      height: 'auto'
    },
  },
  paper: {

  },
  containerCreate: {

  },
  titleCreate: {

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  nameExam: {
    display: 'flex',
    flexDirection: 'column',
  },
  txtNameExam: {
    marginTop: '1rem',
    width: '200px',
    height: '80px',
    marginLeft: '17px'
  },
  formCreate: {

  },
  bank: {

  },
  titleView: {

  },
  showAnswer: {
    marginLeft: '1.5rem'
  },
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '100vh',
  },
}));

function ListExam(props: any) {
  const { className } = props;
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogView, setOpenDialogView] = useState(false);
  const [scroll, setScroll] = useState('paper');


  const [idDelete, setIdDelete] = useState(0);
  const [nameExam, setNameExam] = useState('');
  // const [subject, setSubject] = useState('');

  const [exams, setExams] = useState<IExam[]>([
    {}
  ]);
  const [subject, setSubject] = useState<Subject[]>([
  ]);

  const [question, setQuestion] = useState<Question[]>([
  ]);

  const [answers, setAnswers] = useState<Answer[]>([
  ]);
  //* Get subject */
  useEffect(() => {
    axios.get(`${GET_SUBJECT_URL}`).then((response) => {
      console.log('Subject data', response.data);
      setSubject(response.data);
    })
  }, []);

  //* userid */
  const idUser = localStorage.getItem('id') ? localStorage.getItem('id') : -1;

  //* Get Exam by userid */
  useEffect(() => {
    axios.get(`${GET_EXAM_URL}/${idUser}`).then((response) => {
      setExams(response.data);
    }).catch((err) => {
      console.log("Failed to fetch data: ", err.message);
    })
  }, []);
  //* Get Question */
  function takeContentByExam1(idExam: number) {
    setOpenDialogView(true);
    setScroll(scroll);
    axios.get(`${GET_QUESTION_URL1}/${idExam}`).then((response) => {
      console.log('question detail data: ', response.data);
      setQuestion(response.data)
    }).catch((err) => {
      console.log("Failed to fetch data: ", err.message);
    })
  }

  /* event when click edit */
  const handleClickEdit = () => {
    history.push('/update-exam');
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Exam Name",
      accessor: "examName",
    },
    {
      Header: "Subject Name",
      accessor: "subject.subjectName"
    },
    {
      Header: "View",
      Cell: (cell: any) => (
        <FontAwesomeIcon
          id={cell.row.original.id}
          className='detail-exam'
          onClick={() => takeContentByExam1(cell.row.original.id)}
          icon={faEye} />
      )
    },
    {
      Header: "Update",
      Cell: (cell: any) =>
      (
        <div>
          <Button
            variant="contained"
            color="primary"
            className='style-btn'
            id={cell.row.original.id}
            onClick={handleClickEdit}
          >Edit</Button>
          <Button
            variant="contained"
            color="secondary"
            className='style-btn'
            id={cell.row.original.id}
            onClick={() => handleDelete(cell.row.original.id, cell.row.original.name)}
          >Delete</Button>
        </div>
      )

    },
  ];
  /* Event when click icon view exam */
  function handleView(id: number) {
    setOpenDialogView(true);
    // setNameExam(name);
  };

  const handleViewClose = () => {
    setOpenDialogView(false);
  };
  /* Event when click button create exam */
  const handleChange = (event: any) => {
    // setSubject((event.target.value) || '');
  };
  const handleClickBtnCreate = () => {
    setOpenDialogCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenDialogCreate(false);
  };
  const onTxtNameExamChange = useCallback((e) => {
    setTxtNameExam(e.target.value);
  }, []);

  /* event when click delete */
  function handleDelete(id: number, name: string) {
    setOpenDialogDelete(true)
    setIdDelete(id);
    setNameExam(name);
  };

  const handleDeleteCancel = () => {
    setOpenDialogDelete(false)
  };

  const handleDeleteClose = (idPrams: number) => {
    let newExams = new Array<IExam>();
    console.log('current result', exams)
    newExams = exams.filter(item => item.id !== idPrams);
    setExams(newExams);
    console.log('after result', exams);
    setOpenDialogDelete(false);
  };

  const [textInput, setTextInput] = useState<string>('');
  const [txtNameExam, setTxtNameExam] = useState<string>('');

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  /* Body view exam dialog */
  const bodyView = (
    <div className={classes.paper}>
      <div className={classes.containerCreate}>
        {
          question.map((ques: Question, index: number) => (
            <div>
              <div className="question">
                <p>{index + 1}. {ques.questionText}</p>
              </div>
              <div className="answer">
                {ques.answerGroup.answer.map((ans: Answer) => (
                  <p className={classes.showAnswer}>{ans.answerText}</p>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div >
  );

  /* Body create exam dialog */
  const body = (
    <div className={classes.paper}>
      <div className={classes.containerCreate}>
        <div className={classes.bank}>
          <div className={classes.titleCreate}>
            <span>Choose subject bank: </span>
          </div>
          <div className={className.formCreate}>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-dialog-native">Subject</InputLabel>
                <Select
                  native
                  value={subject}
                  onChange={handleChange}
                  input={<Input id="demo-dialog-native" />}
                >
                  {
                    subject.map((sub: Subject) => (
                      <option value={sub.id}>{sub.subjectName}</option>
                    ))
                  }
                </Select>
              </FormControl>
            </form>
          </div>
        </div>
        <div className={classes.nameExam}>
          <span>Enter name new bank: </span>
          <TextField
            className={classes.txtNameExam}
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            value={txtNameExam}
            onChange={onTxtNameExamChange}
            required
          />
          <p style={{ width: '330px', color: '#30336b' }}>
            <FontAwesomeIcon icon={faExclamationCircle} style={{
              color: '#303f9f',
              margin: '0 5px'
            }} className="note-icon" />
            The system will automatically create a test with
            50 random questions in the school question bank.
          </p>
        </div>
      </div>
    </div >
  );

  return (
    <div className={className}>
      <div className="limiter">
        <div className="container">
          <div className="main">
            <div className="search-exam">
              <div>
                <TextField
                  className="search-exam--txt"
                  id="outlined-search"
                  label="Search by title exam"
                  type="search"
                  variant="outlined"
                  size="small"
                  value={textInput}
                  onChange={onTextInputChange} />
                <Button
                  size="small"
                  className="btn-search"
                  variant="contained"
                  disabled={!textInput}
                  color="primary"> Search </Button>
              </div>
              <Button
                size="small"
                onClick={handleClickBtnCreate}
                className="btn-search"
                variant="contained"
                color="primary"
              > Create Exam </Button>
              {/* Dialog Create  */}
              <Dialog open={openDialogCreate} onClose={handleCloseCreate}>
                <DialogTitle style={{
                  fontWeight: 'bold',
                }}>Fill the form to create New Exam</DialogTitle>
                <DialogContent>
                  {body}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreate} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary">
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Dialog Delete  */}
              <Dialog open={openDialogDelete} onClose={handleDeleteCancel}>
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
                    <span style={{ fontWeight: 'bold' }}> {nameExam} </span> exam???
                  </span>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteCancel} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={() => handleDeleteClose(idDelete)} color="secondary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Dialog View detail exam  */}
              <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={openDialogView}
                onClose={handleViewClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle style={{
                  fontWeight: 'bold',
                }}><h3>SSC101 Chapter123</h3></DialogTitle>
                <DialogContent>
                  {bodyView}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleViewClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="tbl-exams">
              <Table columns={columns} data={exams} isPagination={true} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
const StyleListExam = styled(ListExam)`
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

.limiter {
  width: 100%;
  margin: 0 auto;
}
.container {
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.main {
  background: #fff;
  border-radius: 10px;
  overflow: auto;
  align-items: center;
  padding: 10px;
  width: 90%;
  min-width: 600px;
  display: flex;
  /* margin-top: 5rem; */
  justify-content: center;
  flex-direction: column;
}
//** icon create */
.note-icon {
    color: #303f9f;
    margin: 0 5px;
}
.txt-nam__exam {
  margin-top: 1rem;
}
.tbl-exams {
  width: 100%;
}
.tiltle-delete {
  color: red;
}
.show-page {
  width: 100%;
  height: 100%;
}
.style-btn {
  width: 75;
  height: 40;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 5px;
  font-size: 1;
}
.detail-exam {
  margin-left: 0.3rem;
}
.detail-exam:hover {
  cursor: pointer;
  color: #5e6bd3;
}
//** icon prev next/
.border-icon {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius:50%;
  outline: none;
  font-size: 10px;
  background-color: #FFFFFF;
  border: 1px solid #bad4f0;
}
.border-icon:hover {
  background-color: #e0e0e079;
  cursor: pointer;
}
.prev-next {
  font-size: 13px;
  margin: auto;
}

//* container paging /
.pagination-area {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

//** button paging/
.btn {
  outline: none;
  background-color: #FFFFFF;
  border: 1px solid #bad4f0;
  font-size: 10px;
  font-weight: bold;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius:50%;
  margin: 0 3px;
}
.btn:hover {
  cursor: pointer;
}
.active {
  background-color: rgb(229,231,245) !important;
  color: #5e6bd3;
}
.pagination-area button:hover:not(.active) {
  background-color: #e0e0e079;
  cursor: pointer;
}

//* are search exam/
.search-exam {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 2%;
}
.btn-search {
  width: 120px;
  height: 40px;
  margin-left: 0.5rem;
  font-size: 0.7rem;
}
/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

`
export default StyleListExam;