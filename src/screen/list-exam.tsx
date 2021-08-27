import styled from 'styled-components'
import { useCallback, useEffect, useState, useContext } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import * as moment from 'moment'
import LoadingBar from 'react-top-loading-bar'
// import Progress from '../common/progress'
import * as CONSTANT from '../const'
import { AccountContext } from '../contexts/account-context'
import { refreshToken } from '../services/services'

import Table from '../common/tableReact'

interface IExam {
  id?: number
  examName?: string
  userId?: number
  subject?: {}
}
interface Subject {
  id: number
  subjectName: string
}
interface Answer {
  answerId: number
  answerText: string
}

interface AnswerGroup {
  id: number
  correctAnswer: boolean
  answer: Answer
}

interface Question {
  id: number
  questionBankId: number
  examId: number
  questionBank: {
    id: number
    questionText: string
    subjectId: 1
  }
  answerGroup: AnswerGroup[]
}

ListExam.propTypes = {
  className: PropTypes.string,
}

ListExam.defaultProps = {
  className: '',
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      height: 'auto',
    },
  },
  paper: {},
  containerCreate: {},
  titleCreate: {},
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
    marginBottom: '1rem',
    width: '300px',
    height: '80px',
    marginLeft: '17px',
  },
  formCreate: {},
  bank: {},
  titleView: {},
  showAnswer: {
    marginLeft: '1.5rem',
    color: '#2f6473'
  },
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '100vh',
  },
  dialogCreateExam: {
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '60vh',
  },
}))

const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject`
const GET_EXAM_URL = `${CONSTANT.BASE_URL}/exam`
const GET_EXAM_BY_NAME_URL = `${CONSTANT.BASE_URL}/exam`
const GET_QUESTIONS_URL = `${CONSTANT.BASE_URL}/questions/examId`
const CREATE_EXAM_URL = `${CONSTANT.BASE_URL}/exam/create-exam`
const DELETE_EXAM_URL = `${CONSTANT.BASE_URL}/exam/delete-exam`

function ListExam(props: any) {
  const { className, handleNotification } = props
  const classes = useStyles()
  const history = useHistory()
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [isOpen, setIsOpen] = useState(false)
  const [openDialogCreate, setOpenDialogCreate] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openDialogView, setOpenDialogView] = useState(false)
  const [checkError, setCheckError] = useState(false)
  const [textError, setTextError] = useState('')
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [scroll, setScroll] = useState('paper')
  const [idDelete, setIdDelete] = useState(0)
  const [nameExam, setNameExam] = useState('')
  const [exams, setExams] = useState<IExam[]>([])

  const [subject, setSubject] = useState<Subject[]>([])

  const [subjectId, setSubjectId] = useState<Number>(1)

  const [question, setQuestion] = useState<Question[]>([])

  const [answers, setAnswers] = useState<Answer[]>([])


  //* Get subject */
  useEffect(() => {
    console.log('url', GET_SUBJECT_URL)
    axios
      .get(`${GET_SUBJECT_URL}`)
      .then((response) => {
        // console.log('laalala', response.data)
        setSubject(() => response.data)
      })
      .catch((err) => {
        console.log('Failed to fetch data subject: ', err.message)
      })
  }, [])

  //* userid */
  const idUser = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id

  //* Get Exam by userid */
  useEffect(() => {
    axios
      .get(`${GET_EXAM_URL}/${idUser}`)
      .then((response) => {
        setExams(response.data)
      })
      .catch((err) => {
        console.log('Failed to fetch data exam by userID: ', err.message)
      })
  }, [openDialogCreate, openDialogDelete])

  //* Get Exam by name */
  async function getExamByName(name: string) {
    try {
      const response = await axios.get(`${GET_EXAM_BY_NAME_URL}/${idUser}/search/${name}`);
      if (response && response.data.length > 0) {
        setExams(response.data);
        setTextSearch('')
      }
      else {
        setTextSearch('')
        handleNotification('warning', `${CONSTANT.MESSAGE('no exam with name ').SEARCH_NOT_FOUND}'${textSearch}'`)
      }
      refreshToken(idUser)
    } catch (error) {
      console.error(error)
    }
  }

  //* Get Question */
  async function takeContentByExam(idExam: number, titleExam: string) {
    setOpenDialogView(true)
    setScroll(scroll)
    setNameExam(titleExam)
    try {
      const response = await axios.get(`${GET_QUESTIONS_URL}/${idExam}`);
      if (response && response.data) {
        setQuestion(response.data[0].question)

      } else {
        setQuestion([])
      }
      refreshToken(idUser)
    } catch (error) {
      console.log('Failed to get data question by examID: ', error.message)
    }
  }

  //* event when click edit */
  const handleClickEdit = (idExam: number, idSubject: number, examName: string) => {
    const infor = {
      idExam,
      idSubject,
      examName,
    }
    history.push('/update-exam', { params: infor })
  }

  const columns = [
    {
      Header: 'Exam Name',
      accessor: 'examName',
    },
    {
      Header: 'Subject Name',
      accessor: 'subject.subjectName',
    },
    {
      Header: 'View',
      Cell: (cell: any) => (
        <FontAwesomeIcon
          id={cell.row.original.id}
          className="detail-exam"
          onClick={() => takeContentByExam(cell.row.original.id, cell.row.original.examName)}
          icon={faEye}
        />
      ),
    },
    {
      Header: 'Update',
      Cell: (cell: any) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            className="style-btn"
            id={cell.row.original.id}
            onClick={() =>
              handleClickEdit(
                cell.row.original.id,
                cell.row.original.subject.id,
                cell.row.original.examName
              )
            }
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="style-btn"
            id={cell.row.original.id}
            onClick={() => handleDelete(cell.row.original.id, cell.row.original.examName)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]
  //* Event when click icon view exam */
  const handleViewClose = () => {
    setOpenDialogView(false)
  }
  //* Event when click button create exam */
  const handleChange = (event: any) => {
    // setSubject((event.target.value) || '');
    setSubjectId(Number(event.target.value))
  }
  const handleClickBtnCreate = () => {
    setOpenDialogCreate(true)
  }

  const handleCloseCreate = () => {
    setOpenDialogCreate(false)
    setTxtNameExam('')
    setCheckError(false)
    setTextError('')
  }


  //* event when click delete */
  const handleDelete = (id: number, titleExam: string) => {
    setOpenDialogDelete(true)
    setIdDelete(id)
    setNameExam(titleExam)
  }

  const handleDeleteCancel = () => {
    setOpenDialogDelete(false)
  }

  const handleDeleteAccept = async (id: number) => {
    try {
      const response = await axios.delete(`${DELETE_EXAM_URL}/${id}`);
      if (response) {
        setOpenDialogDelete(false)
        handleNotification('success', `${CONSTANT.MESSAGE("Exam").DELETE_SUCCESS}`)
      } else {
        handleNotification('danger', `${CONSTANT.MESSAGE("Delete Exam").FAIL}`)
      }
      refreshToken(idUser)
    } catch (error) {
      console.error(error)
    }
  }

  const [textSearch, setTextSearch] = useState<string>('')
  const [txtNameExam, setTxtNameExam] = useState<string>('')

  const onTextSearchChange = useCallback((e) => {
    setTextSearch(e.target.value)
  }, [])

  const validateNameExam = (inputName: string) => {
    const myRegex = /(?=^.{3,}$)(?=.*)(?=.*[a-z]).*$/;
    return myRegex.test(String(inputName).toLowerCase());
  }

  const checkDuplicateName = (inputName: string, listItem: any) => {
    const resultDuplicate = listItem.filter((exam: any) =>
      exam.examName?.toLowerCase() === inputName.trim().toLowerCase())
    if (resultDuplicate.length > 0) {
      return true
    }
    return false;
  }

  const onTxtNameExamChange = useCallback((e) => {
    setTxtNameExam(e.target.value)
    setCheckError(false)
    setTextError('')
    const checkNameExamDuplicate = checkDuplicateName(e.target.value, exams);
    if (!validateNameExam(e.target.value.trim())) {
      setCheckError(true)
      setTextError('Name must be at least 3 characters including one letter!')
    }
    if (checkNameExamDuplicate) {
      setCheckError(true)
      setTextError('Name exam is duplicate!')
    }
  }, [txtNameExam])

  const handleCreateExam = async (e: any) => {
    e.preventDefault()
    try {
      if (validateNameExam(txtNameExam.trim())) {
        const checkNameExamDuplicate = checkDuplicateName(txtNameExam, exams);
        if (checkNameExamDuplicate) {
          setProgress(100)
          return;
        }
        const response = await axios.post(`${CREATE_EXAM_URL}/${idUser}`, {
          subjectId,
          examName: txtNameExam,
        })
        if (response && response.data) {
          handleNotification('success', `${CONSTANT.MESSAGE().CREATE_SUCCESS}`);
          setOpenDialogCreate(false);
          setTxtNameExam('');
          setProgress(100)
        } else {
          handleNotification('danger', `${CONSTANT.MESSAGE("Create Exam").FAIL}`);
          setProgress(100)
        }
      } else {
        setProgress(progress + 10)
        setCheckError(true)
        setTextError('Name can not is blank!!!')
      }
      refreshToken(idUser)
      setProgress(100)
    } catch (error) {
      setProgress(100)
      handleNotification('danger', `${CONSTANT.MESSAGE("Create Exam").FAIL}`);
      console.error(error)
      refreshToken(idUser)
    }
  }


  //* Body view exam dialog */
  const bodyView = (
    <div className={classes.paper}>
      {question.length !== 0 ? (
        <div className={classes.containerCreate}>
          {question.map((ques: Question, index: number) => (
            <div>
              <div className="question">
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#2F6473',
                    padding: '5px'
                  }}
                >
                  {index + 1}. {ques.questionBank.questionText}
                </p>
              </div>
              <div className="answer">
                {ques.answerGroup.map((ansGroup: AnswerGroup, ansIndex: number) => (
                  <p className={classes.showAnswer}>
                    {String.fromCharCode(97 + ansIndex)}. {ansGroup.answer.answerText}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3
            style={{
              fontWeight: 'bold',
              color: '#2F6473',
              textAlign: 'center',
            }}
          >
            This exam has no questions
          </h3>
        </div>
      )}
    </div>
  )

  //* Body create exam dialog */
  const bodyCreateExam = (
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
                  value={subjectId}
                  onChange={handleChange}
                  input={<Input id="demo-dialog-native" />}
                >
                  {subject.map((sub: Subject) => (
                    <option value={sub.id}>{sub.subjectName}</option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </div>
        </div>
        <div className={classes.nameExam}>
          <span>Enter name new bank: </span>
          <TextField
            error={checkError}
            className={classes.txtNameExam}
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            value={txtNameExam}
            onChange={onTxtNameExamChange}
            helperText={textError}
            required
          />
          <p style={{ color: '#30336b' }}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{
                color: '#303f9f',
                margin: '0 10 0 0',
              }}
              className="note-icon"
            />
            The system will automatically create a test with 50 random questions in the school
            question bank.
          </p>
        </div>
      </div>
    </div>
  )


  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
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
                  value={textSearch}
                  onChange={onTextSearchChange}
                />
                <Button
                  size="small"
                  className="btn-search"
                  variant="contained"
                  disabled={!textSearch}
                  onClick={() => getExamByName(textSearch)}
                  color="primary"
                >
                  {' '}
                  Search{' '}
                </Button>
              </div>
              <Button
                size="small"
                onClick={handleClickBtnCreate}
                className="btn-search"
                variant="contained"
                color="primary"
              >
                {' '}
                Create Exam{' '}
              </Button>
              {/* Dialog Create  */}
              <Dialog
                classes={{ paper: classes.dialogCreateExam }}
                open={openDialogCreate}
                onClose={handleCloseCreate}
              >
                <DialogTitle
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  <h3>Fill the form to create New Exam</h3>
                </DialogTitle>
                <DialogContent>{bodyCreateExam}</DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={handleCreateExam}>
                    Create
                  </Button>
                  <Button onClick={handleCloseCreate} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Dialog Delete  */}
              <Dialog open={openDialogDelete} onClose={handleDeleteCancel}>
                <DialogTitle
                  style={{
                    backgroundColor: '#ff6b81',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '5px 24px',
                  }}
                >
                  <h3 className="title-delete">Delete</h3>
                </DialogTitle>
                <DialogContent
                  style={{
                    padding: '35px 24px',
                  }}
                >
                  <span>
                    Do you want delete
                    <span style={{ fontWeight: 'bold' }}> {nameExam} </span> exam???
                  </span>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDeleteAccept(idDelete)} color="secondary">
                    Delete
                  </Button>
                  <Button onClick={handleDeleteCancel} color="primary">
                    Cancel
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
                <DialogTitle
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: '5px'
                  }}
                >
                  <h3>{nameExam}</h3>
                </DialogTitle>
                <DialogContent>{bodyView}</DialogContent>
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
  )
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
    /* min-height: 100vh; */
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
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow: auto;
    align-items: center;
    padding: 5px 10px;
    width: 90%;
    min-width: 600px;
    display: flex;
    margin-top: 5rem;
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
    border-radius: 50%;
    outline: none;
    font-size: 10px;
    background-color: #ffffff;
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
    background-color: #ffffff;
    border: 1px solid #bad4f0;
    font-size: 10px;
    font-weight: bold;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 3px;
  }
  .btn:hover {
    cursor: pointer;
  }
  .active {
    background-color: rgb(229, 231, 245) !important;
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
export default StyleListExam
