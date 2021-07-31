import react, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// import Checkbox from '@material-ui/core/Checkbox';
import { useHistory, useLocation } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, makeStyles } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import DialogCustom from '../common/dialog'
import * as CONSTANT from '../const'

import Table from '../common/tableReact'

UpdateExam.propTypes = {
  className: PropTypes.string,
}

UpdateExam.defaultProps = {
  className: '',
}
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
  id?: number
  answerText: string
  // answerGroupId?: number
  // correct?: boolean
}
interface AnswerGroup {
  id?: number
  correct: boolean
  answer: Answer
}
interface QuestionJoinTable {
  id: number
  questionBankId: number
  answerGroupId: number
  examId: number
  questionBank: {
    id: number
    questionText: string
    subjectId: 1
  }
  answerGroup: AnswerGroup[]
}
interface Question {
  id: number
  answerGroupId: number
  examId: number
  questionBankId: number
}
interface Subject {
  id: number
  subjectName: string
  questionBank: QuestionBank[]
}
interface QuestionBank {
  idQuestion: number
  questionText: string
  subjectId: number
  checked?: boolean
}

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '80vh',
    minWidth: '350px',
    width: '100vh',
  },
  styleBtn: {
    width: '5rem',
    height: 30,
    cursor: 'pointer',
    margin: '5px 20px',
  },
  paper: {},
  detailAnswer: {
    marginLeft: '1rem',
    display: 'block',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  titleExam: {
    color: '#46178F',
    alignItems: 'center',
  },
  contentExam: {
    // flexDirection: 'column'
  },
  question: {
    alignItems: 'center',
    padding: '10px',
  },
  answer: {
    marginTop: '-10px',
    padding: '5px',
  },
  multipleAnswer: {
    display: 'flex',
    flexDirection: 'column',
  },
  multiple: {
    marginTop: '1rem',
  },
  trueFalseAnswer: {
    marginLeft: '1rem',
  },
  iconAdd: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
  },
  containerAnswer: {
    display: 'flex',
    flexDirection: 'column',
  },
  answerQuestion: {
    width: '80%',
    marginTop: '1.5rem',
  },
  iconRemove: {
    color: 'red',
    marginTop: '1.5rem',
    marginLeft: '0.3rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  iconChooseCorrect: {
    marginTop: '1.5rem',
    marginLeft: '0.3rem',
  },
  checkBoxQuestion: {
    marginRight: '0.5rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  containQuesIcon: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const GET_QUESTIONS_URL = `${CONSTANT.BASE_URL}/questions/examId`
const GET_QUESTION_DETAIL_URL = `${CONSTANT.BASE_URL}/questions`
const DELETE_QUESTION_URL = `${CONSTANT.BASE_URL}/questions/delete`
const GET_QUESTIONBANK_URL = `${CONSTANT.BASE_URL}/subject`
const CREATE_QUESTION_URL = `${CONSTANT.BASE_URL}/questions/create`
const UPDATE_QUESTION_URL = `${CONSTANT.BASE_URL}/questions/update`

function UpdateExam(props: any) {
  const { className } = props
  const classes = useStyles()
  const [scroll, setScroll] = useState('paper')
  const history = useHistory()
  const typingTimeoutRef = useRef(-1)
  const [openDialogAdd, setOpenDialogAdd] = useState(false) // for event click add
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [idQuestion, setIdQuestion] = useState(0)
  const [nameQuestion, setNameQuestion] = useState('')
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const [currentQuestionAnswerGroup, setCurrentQuestionAnswerGroup] = useState<AnswerGroup[]>([])
  const [answerCorrect, setAnswerCorrect] = useState<Answer | undefined>(undefined)
  const arrayCheck = new Array<number>()
  const [question, setQuestion] = useState<Question>()
  const [questions, setQuestions] = useState<QuestionJoinTable[]>([
    {
      id: 1,
      questionBankId: 1,
      answerGroupId: 1,
      examId: 1,
      questionBank: {
        id: 1,
        questionText: '',
        subjectId: 1,
      },
      answerGroup: [],
    },
  ])

  const [subject, setSubject] = useState<Subject>()
  const [valueTypeAnswer, setValueTypeAnswer] = useState('tf')
  const [correctAnswerTypeTf, setCorrectAnswerTypeTf] = useState('true')
  const [valueCorrectAnswer, setValueCorrectAnswer] = useState('0')

  const location: any = useLocation()
  const { idExam } = location.state.params
  const { idSubject } = location.state.params
  const { examName } = location.state.params
  const idUser = localStorage.getItem('id') ? localStorage.getItem('id') : -1
  //* Get question by idExam */
  useEffect(() => {
    axios
      .get(`${GET_QUESTIONS_URL}/${idExam}`)
      .then((response) => {
        setQuestions(response.data[0].question)
      })
      .catch((err) => {
        console.log('Failed to get question by  id Exam: ', err.message)
      })
  }, [openDialogDelete, openDialogAdd, openDialogUpdate])

  //* Get question bank by subject id */
  useEffect(() => {
    console.log('update:', idSubject)
    axios
      .get(`${GET_QUESTIONBANK_URL}/${idSubject}`)
      .then((response) => {
        setSubject(response.data[0])
      })
      .catch((err) => {
        console.log('Failed to get question bank by id subject: ', err.message)
      })
  }, [])

  // console.log('Question huhu: ', subject);
  /** event click button delete */
  const handleClickDelete = (id: number, name: string) => {
    setOpenDialogDelete(true)
    setIdQuestion(id)
    setNameQuestion(name)
  }
  const handleAcceptDialogDelete = async (id: number) => {
    const response = await axios.delete(`${DELETE_QUESTION_URL}/${id}`)
    if (response) {
      console.log(response)
      setOpenDialogDelete(false)
    }
  }
  const handleCancelDialogDelete = () => {
    setOpenDialogDelete(false)
  }
  /** event click button add */
  const handleClickAddQuestion = () => {
    console.log('jajajaja', questions)
    setOpenDialogAdd(true)
    setScroll(scroll)
  }

  //* event process click button save in dialog add question

  const handleSaveQuestion = async (e: any) => {
    e.preventDefault()
    const questionAdd = arrayCheck.map((item: any) => ({
      questionBankId: item,
      examId: idExam,
    }))
    console.log('close dialog', questionAdd)
    const response = await axios.post(`${CREATE_QUESTION_URL}`, questionAdd)
    if (response) {
      console.log(response)
      setOpenDialogAdd(false)
    } else {
      console.log('Error add question to exam')
    }
  }
  const handleCloseDialogAdd = async (e: any) => {
    e.preventDefault()
    setOpenDialogAdd(false)
  }

  //* Handle process with answer
  const handleAddAnswer = () => {
    const newAnswerGroup = [...currentQuestionAnswerGroup]
    newAnswerGroup.push({
      correct: false,
      answer: {
        answerText: '',
      },
    })
    setCurrentQuestionAnswerGroup(newAnswerGroup)
  }

  const handleInputAnswer = (index: number) => (e: any) => {
    const newArr = [...currentQuestionAnswerGroup]
    newArr[index].answer.answerText = e.target.value
    setCurrentQuestionAnswerGroup(newArr)
  }

  const handleDeleteAnswer = (index: number) => {
    currentQuestionAnswerGroup.splice(index, 1)
    const newArr = [...currentQuestionAnswerGroup]
    setCurrentQuestionAnswerGroup(newArr)
    console.log(newArr)
  }

  //* Dialog edit question in exams
  const handleClickEditQuestion = (questionId: number, answerGroupsUpdate: AnswerGroup[]) => {
    setAnswerCorrect(undefined)
    setCurrentQuestionAnswerGroup(answerGroupsUpdate)
    answerGroupsUpdate.forEach((item: AnswerGroup) => {
      if (item.correct) setAnswerCorrect(item.answer)
    })
    setIdQuestion(questionId)
    axios
      .get(`${GET_QUESTION_DETAIL_URL}/${questionId}`)
      .then((response) => {
        console.log(response.data)
        setQuestion(response.data)
      })
      .catch((err) => {
        console.log('Failed to get question detail by id: ', err.message)
      })

    setOpenDialogUpdate(true)
  }

  const handleSaveUpdateQuestion = async (e: any) => {
    e.preventDefault()
    let response = null
    if (valueTypeAnswer === 'tf') {
      let answerGroupId = 1
      console.log('valueTypeAnswer 1', valueTypeAnswer)
      if (correctAnswerTypeTf == 'true') {
        console.log('answerGroupId ', answerGroupId)
        response = await axios.put(`${UPDATE_QUESTION_URL}/${idQuestion}`, {
          answerGroupId,
        })
      } else {
        answerGroupId = 2
        console.log('answerGroupId', answerGroupId)
        response = await axios.put(`${UPDATE_QUESTION_URL}/${idQuestion}`, {
          answerGroupId,
        })
      }
    } else {
      console.log('multiple choice', valueTypeAnswer)
      console.log('correct answer', valueCorrectAnswer)
    }
    if (response) {
      console.log(response)
      setOpenDialogUpdate(false)
    } else {
      console.log('Error update question to exam')
    }
  }

  const handleCloseUpdateQuestion = () => {
    setOpenDialogUpdate(false)
    setCurrentQuestionAnswerGroup([])
  }

  //* Event when click radio button tf or multiple choice
  const handleChange = (event: any) => {
    setValueTypeAnswer(event.target.value)
  }
  //* Event when click radio button tf
  const handleChangeCorrect = (event: any) => {
    setCorrectAnswerTypeTf(event.target.value)
  }
  //* Event when click multiple choice
  const handleCorrectAnswerMultiple = (event: any) => {
    setValueCorrectAnswer(event.target.value)
    const newAnswers = currentQuestionAnswerGroup.map((item: AnswerGroup, index: number) => {
      const itemAnswer = { ...item }
      itemAnswer.correct = false
      console.log(index, valueCorrectAnswer, 'kk')
      console.log(index == event.target.value)
      if (index == event.target.value) {
        itemAnswer.correct = true
      }
      return itemAnswer
    })
    console.log('new', newAnswers)
    setCurrentQuestionAnswerGroup(newAnswers)
  }

  const titleDialogUpdate = (
    <div>
      <h3>
        Update question in <span style={{ color: '#FD647A' }}>{examName}</span> Exam{' '}
      </h3>
    </div>
  )

  /* event when click Back */
  const handleClickBack = () => {
    history.push('/list-exam')
  }

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Question',
      accessor: 'questionBank.questionText',
    },
    {
      Header: 'Answer',
      accessor: (data: any) => (
        <div>
          {data.answerGroup.map((item: any, index: number) => (
            <p style={{ width: '100px' }}>
              {String.fromCharCode(65 + index)}. {item.answer.answerText}
            </p>
          ))}
        </div>
      ),
    },
    {
      Header: 'Correct Answer',
      accessor: (data: any) => (
        <div>
          {data.answerGroup.map((item: any) =>
            item.correct ? <p style={{ width: '100px' }}>{item.answer.answerText}</p> : <p />
          )}
        </div>
      ),
    },
    {
      Header: 'Update',
      Cell: (cell: any) => (
        <div className="contain">
          <Button
            variant="contained"
            color="primary"
            className="style-btn"
            id={cell.row.original.id}
            onClick={() =>
              handleClickEditQuestion(cell.row.original.id, cell.row.original.answerGroup)
            }
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="style-btn"
            id={cell.row.original.id}
            onClick={() =>
              handleClickDelete(cell.row.original.id, cell.row.original.questionBank.questionText)
            }
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const bodyAddQuestion = (
    <div className={classes.paper}>
      <div className={classes.contentExam}>
        {subject?.questionBank.map((quesBank: any, index: number) => {
          const isExist = questions.some((item) => item.questionBankId === quesBank.id)
          if (!isExist) {
            return (
              <div className={classes.question}>
                <input
                  type="checkbox"
                  className={classes.checkBoxQuestion}
                  onChange={(e: any) => {
                    if (e.target.checked) {
                      arrayCheck.push(quesBank.id)
                      // console.log('ka add', arrayCheck);
                    } else {
                      for (let i = 0; i < arrayCheck.length; i++) {
                        if (arrayCheck[i] === quesBank.id) {
                          arrayCheck.splice(i, 1)
                        }
                      }
                      // console.log('ka xoa', arrayCheck);
                    }
                  }}
                />
                <span className="sttQuestion">
                  {index + 1}.{' '}
                  <span
                    style={{
                      margin: '0px 10px',
                      color: '#000000',
                    }}
                  >
                    {quesBank.questionText}
                  </span>
                </span>
              </div>
            )
          }
          return ''
        })}
      </div>
    </div>
  )

  useEffect(() => {
    console.log(answerCorrect)
    console.log(valueTypeAnswer)
    setValueTypeAnswer('multiple')
    if (answerCorrect && (answerCorrect.id === 1 || answerCorrect.id === 2)) {
      setValueTypeAnswer('tf')
      setCorrectAnswerTypeTf(answerCorrect.answerText.toLowerCase())
    }

    if (currentQuestionAnswerGroup.length > 0) {
      currentQuestionAnswerGroup.forEach((item, index) => {
        if (item.correct) setValueCorrectAnswer(`${index}`)
      })
    } else {
      setCurrentQuestionAnswerGroup([])
      setValueCorrectAnswer(`0`)
    }
  }, [openDialogUpdate])

  const bodyUpdateQuestion = (
    <div className={classes.paper}>
      <div className={classes.contentExam}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <p style={{ color: '#4E5FBB', fontWeight: 'bold' }}>Type answer: </p>
          </FormLabel>
          <div className={classes.trueFalseAnswer}>
            <RadioGroup
              aria-label="group"
              name="group-answer"
              value={valueTypeAnswer}
              onChange={handleChange}
            >
              <FormControlLabel value="tf" control={<Radio />} label="True/False" />
              <FormControlLabel value="multiple" control={<Radio />} label="Multiple Choice" />
            </RadioGroup>
          </div>
        </FormControl>
        {valueTypeAnswer == 'tf' ? (
          <div>
            <FormLabel component="legend">
              <p style={{ color: '#4E5FBB', fontWeight: 'bold' }}> Correct Answer: </p>
            </FormLabel>
            <div className={classes.trueFalseAnswer}>
              <RadioGroup
                aria-label="correct"
                name="correct-answer"
                value={correctAnswerTypeTf}
                onChange={handleChangeCorrect}
              >
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className={classes.multipleAnswer}>
            <p style={{ color: '#4E5FBB', fontWeight: 'bold' }}>Multiple Answer:</p>
            <div className={classes.iconAdd}>
              <Fab color="primary" aria-label="add" size="small" onClick={handleAddAnswer}>
                <AddIcon />
              </Fab>
              <span
                style={{
                  color: '#4E5FBB',
                  fontWeight: 'normal',
                  marginLeft: '0.5rem',
                }}
              >
                Add answer
              </span>
            </div>
            <div className={classes.containerAnswer} id="containerAnswer">
              <RadioGroup
                aria-label="correct-answer"
                name="correct-answer"
                value={valueCorrectAnswer}
                onChange={handleCorrectAnswerMultiple}
              >
                {currentQuestionAnswerGroup.map((item: any, index: number) => (
                  <div className={classes.containQuesIcon}>
                    <TextField
                      id="outlined-basic"
                      value={currentQuestionAnswerGroup[index].answer.answerText}
                      onChange={handleInputAnswer(index)}
                      label={`Answer ${index + 1}`}
                      variant="outlined"
                      placeholder="Enter answer"
                      className={classes.answerQuestion}
                    />
                    <RemoveCircleIcon
                      className={classes.iconRemove}
                      fontSize="medium"
                      onClick={() => handleDeleteAnswer(index)}
                    />
                    <FormControlLabel
                      className={classes.iconChooseCorrect}
                      value={`${index.toString()}`}
                      control={<Radio />}
                      label="Correct"
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className={className}>
      <div className="create-exam">
        <div className="container-exam">
          <div className="main">
            <div className="text-subject">
              <h2>SSC101 Chapter 123</h2>
            </div>
            <div className="content-exam">
              <Table columns={columns} data={questions} isPagination={false} />
            </div>
          </div>
        </div>
        <div className="container-button" style={{ backgroundColor: 'rgb(255,255,255)' }}>
          <div>
            <Dialog open={openDialogDelete} onClose={handleCancelDialogDelete}>
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
                  <span style={{ fontWeight: 'bold', margin: '0 0.5rem' }}>
                    "{nameQuestion}"
                  </span>{' '}
                  question???
                </span>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDialogDelete} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleAcceptDialogDelete(idQuestion)} color="secondary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickAddQuestion}
              style={{ marginTop: '0.5rem', height: '30px' }}
            >
              Add Questions
            </Button>
            <Dialog
              classes={{ paper: classes.dialogPaper }}
              open={openDialogAdd}
              onClose={handleCloseDialogAdd}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <div className={classes.title}>
                  <h2 className={classes.titleExam}>{subject?.subjectName}</h2>
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {bodyAddQuestion}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogAdd} color="primary">
                  Close
                </Button>
                <Button onClick={handleSaveQuestion} color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="update-question">
            <DialogCustom
              classes={{ paper: classes.dialogPaper }}
              title={titleDialogUpdate}
              buttonAccept="Save"
              buttonCancel="Close"
              content={bodyUpdateQuestion}
              isOpen={openDialogUpdate}
              handleAccept={handleSaveUpdateQuestion}
              handleClose={handleCloseUpdateQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  )
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
    background-color: '#FFFFF';
  }

  .multiple {
    margin-top: 0.5rem;
  }

  .style-btn {
    width: 75;
    height: 40;
    cursor: pointer;
    margin: 0.5rem 1rem 0.5rem 0;
    font-size: 1;
  }

  .text-subject {
    margin-bottom: 1rem;
  }
  //* Css for button */

  .container-button {
    display: flex;
    justify-content: center;
    background-color: rgb(255, 255, 255);
  }
  //* Css for area create exam and bank */
  .create-exam {
    height: auto;
    width: 100%;
  }
  .container-exam {
    height: auto;
    display: flex;
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
  //* css for cell update.
  .contain {
    display: flex;
    align-items: center;
  }
  //* Responsive */
`
export default StyledUpdateExam
