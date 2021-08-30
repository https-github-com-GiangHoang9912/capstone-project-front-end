import { useRef, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

// import Checkbox from '@material-ui/core/Checkbox';
import { useHistory, useLocation, NavLink } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import LoadingBar from 'react-top-loading-bar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, makeStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import SearchIcon from '@material-ui/icons/Search';
import DialogCustom from '../common/dialog'
import * as CONSTANT from '../const'
import { refreshToken } from '../services/services'
import { AccountContext } from '../contexts/account-context'
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
interface Answer {
  id?: number
  answerText: string
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
interface ISubject {
  id: number
  subjectName: string
  questionBank: QuestionBank[]
}
interface QuestionBank {
  idQuestion?: number
  questionText?: string
  subjectId?: number
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
    backgroundColor: '#fafafa',
    border: '1px solid #cacece',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05)',
    padding: '6px',
    borderRadius: '2px',
    display: 'inline-block',
    overflow: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  containQuesIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  titleOfExam: {
    lineHeight: '2rem',
    fontWeight: 600,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  containerBack: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3rem',
    width: '100%',
    textAlign: 'start',
    '&:hover': {
      cursor: 'pointer',
      color: '#3F51B5'
    },
  },
  textBack: {
    color: '#545d7a',
    fontWeight: 400,
    fontSize: ' 0.8rem',
    '&:hover': {
      cursor: 'pointer',
      color: '#3F51B5'
    },
  },
  iconBack: {
    color: '#545d7a',
    fontWeight: 400,
    '&:hover': {
      cursor: 'pointer',
      color: '#3F51B5'
    },
  },
  searchQuestions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'

  },
  fieldInputQuestions: {
    flexBasis: '45%'
  },
  totalQues: {
    flexBasis: '45%',
    color: '#272822',
    fontWeight: 550
  },
  containerQuestions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
}))

const GET_QUESTIONS_URL = `${CONSTANT.BASE_URL}/questions/examId`
const GET_QUESTION_DETAIL_URL = `${CONSTANT.BASE_URL}/questions`
const DELETE_QUESTION_URL = `${CONSTANT.BASE_URL}/questions/delete`
const GET_QUESTIONBANK_URL = `${CONSTANT.BASE_URL}/subject`
const CREATE_QUESTION_URL = `${CONSTANT.BASE_URL}/questions/create`
const CREATE_ANSWERS_URL = `${CONSTANT.BASE_URL}/answers-groups/create`


function UpdateExam(props: any) {
  const { className, handleNotification } = props
  const classes = useStyles()
  const [scroll, setScroll] = useState('paper')
  const history = useHistory()
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [openDialogAdd, setOpenDialogAdd] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [idQuestion, setIdQuestion] = useState(0)
  const [nameQuestion, setNameQuestion] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const [currentQuestionAnswerGroup, setCurrentQuestionAnswerGroup] = useState<AnswerGroup[]>([])
  const [defaultAnswerGroup, setDefaultAnswerGroup] = useState<AnswerGroup[]>([])
  const [answerCorrect, setAnswerCorrect] = useState<Answer | undefined>(undefined)
  const arrayCheck = new Array<number>()
  const [question, setQuestion] = useState<Question>()
  const [questions, setQuestions] = useState<QuestionJoinTable[]>([])

  const [questionBank, setQuestionBank] = useState<QuestionBank[]>([])
  const [toltalQuestion, setToltalQuestion] = useState(0)
  const [subject, setSubject] = useState<ISubject | undefined>(undefined)
  const typingTimeoutRef = useRef<any>(null);
  const [valueTypeAnswer, setValueTypeAnswer] = useState('tf')
  const [correctAnswerTypeTf, setCorrectAnswerTypeTf] = useState('true')
  const [valueCorrectAnswer, setValueCorrectAnswer] = useState('0')
  const [progress, setProgress] = useState(0)
  const [checkError, setCheckError] = useState(false)
  const [textError, setTextError] = useState('')
  const location: any = useLocation()
  const { idExam } = location.state.params
  const { idSubject } = location.state.params
  const { examName } = location.state.params
  const { subjectName } = location.state.params

  const userId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id
  //* Get question by idExam */
  useEffect(() => {
    setCorrectAnswerTypeTf('true')
    axios
      .get(`${GET_QUESTIONS_URL}/${idExam}`)
      .then((response) => {
        setQuestions(response.data[0].question)
        refreshToken(userId)
      })
      .catch((err) => {
        console.log('Failed to get question by  id Exam: ', err.message)
        refreshToken(userId)
      })
  }, [openDialogDelete, openDialogAdd, openDialogUpdate])

  //* Get question bank by subject id */
  useEffect(() => {
    axios
      .get(`${GET_QUESTIONBANK_URL}/${idSubject}`)
      .then((response) => {
        setSubject(response.data[0])
        setQuestionBank(response.data[0].questionBank)
        refreshToken(userId)
      })
      .catch((err) => {
        console.log('Failed to get question bank by id subject: ', err.message)
        refreshToken(userId)
      })
  }, [])

  /** event click button delete */
  const handleClickDelete = (id: number, name: string) => {
    setOpenDialogDelete(true)
    setIdQuestion(id)
    setNameQuestion(name)
  }
  const handleAcceptDialogDelete = async (id: number) => {
    try {
      setProgress(progress + 10)
      const response = await axios.delete(`${DELETE_QUESTION_URL}/${id}`)
      if (response && response.data) {
        handleNotification('success', `${CONSTANT.MESSAGE("Question").DELETE_SUCCESS}`)
        setOpenDialogDelete(false)
        setProgress(100)
        refreshToken(userId)
      } else {
        handleNotification('danger', `${CONSTANT.MESSAGE("Delete Question").FAIL}`);
        setProgress(100)
        refreshToken(userId)
      }
    } catch (error) {
      console.error(error)
      setProgress(100)
      refreshToken(userId)
    }
  }
  const handleCancelDialogDelete = () => {
    setOpenDialogDelete(false)
  }
  /** event click button add */
  const handleClickAddQuestion = () => {
    setSearchValue('')
    setOpenDialogAdd(true)
    setScroll(scroll)
  }

  //* event process click button save in dialog add question
  const getQuestionByIdExam = async () => {
    try {
      axios
        .get(`${GET_QUESTIONS_URL}/${idExam}`)
        .then((response) => {
          setQuestions(response.data[0].question)
          refreshToken(userId)
        })
        .catch((err) => {
          console.log('Failed to get question by  id Exam: ', err.message)
          refreshToken(userId)
        })
    } catch {
      console.log('Get questions by exam fail')
      refreshToken(userId)

    }

  }

  const handleSaveQuestion = async (e: any) => {
    e.preventDefault()
    setOpenDialogAdd(false)
    try {
      setProgress(progress + 10)
      setOpenDialogAdd(false)
      if (arrayCheck.length != 0) {
        const response = await axios.post(`${CREATE_QUESTION_URL}/${userId}`, {
          questionBankId: arrayCheck,
          examId: idExam
        });
        if (response && response.data) {
          handleNotification('success', `${CONSTANT.MESSAGE().ADD_SUCCESS}`)
          setProgress(100)
          setSearchValue('')
          getQuestionByIdExam()
          refreshToken(userId)

        } else {
          handleNotification('danger', `${CONSTANT.MESSAGE("Add Question").FAIL}`);
          setProgress(100)
          refreshToken(userId)
        }
      } else {
        setProgress(100)
        refreshToken(userId)
      }

    } catch (error) {
      console.error(error)
      setProgress(100)
      setSearchValue('')
      refreshToken(userId)
    }
  }
  const handleCloseDialogAdd = (e: any) => {
    e.preventDefault()
    setSearchValue('')
    setOpenDialogAdd(false)
  }

  //* Handle process with answer
  const handleAddAnswer = () => {
    const newAnswerGroup = [...currentQuestionAnswerGroup]
    newAnswerGroup.push({
      correct: newAnswerGroup.length == 0,
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
        setQuestion(response.data)
        refreshToken(userId)
      })
      .catch((err) => {
        console.log('Failed to get question detail by id: ', err.message)
        refreshToken(userId)
      })

    setOpenDialogUpdate(true)
  }

  const handleSaveUpdateQuestion = async (e: any) => {
    e.preventDefault()
    try {
      setProgress(progress + 10)
      if (currentQuestionAnswerGroup.length > 0) {
        const elementIsEmpty = currentQuestionAnswerGroup.filter((item: any) => item.answer.answerText.trim().length <= 0);
        if (elementIsEmpty.length === 0) {
          let response = null;
          response = await axios.post(`${CREATE_ANSWERS_URL}/${idQuestion}`, {
            currentQuestionAnswerGroup,
            valueTypeAnswer,
            userId
          })
          if (response) {
            handleNotification('success', `${CONSTANT.MESSAGE().UPDATE_SUCCESS}`)
            setProgress(100)
            setOpenDialogUpdate(false)
          } else {
            handleNotification('danger', `${CONSTANT.MESSAGE("Update Question").FAIL}`);
            setOpenDialogUpdate(true)
            setProgress(100)
          }
        } else {
          handleNotification('danger', `${CONSTANT.MESSAGE("update question cause answer is empty").FAIL}`)
          setOpenDialogUpdate(true)
          setProgress(100)
        }
      } else {
        handleNotification('danger', `${CONSTANT.MESSAGE("Update Question").NO_ANSWER}`)
        setOpenDialogUpdate(true)
        setProgress(100)
      }

      refreshToken(userId)
    } catch (error) {
      setProgress(100)
      console.error(error)
    }
  }

  const handleCloseUpdateQuestion = () => {
    setOpenDialogUpdate(false)
    setCurrentQuestionAnswerGroup([])
  }

  useEffect(() => {
    if (valueTypeAnswer === 'tf') {
      const answerGroupDefault = [
        {
          questionId: idQuestion,
          answerId: 1,
          correct: true,
          answer: {
            id: 1,
            answerText: 'true',
          },
        },
        {
          questionId: idQuestion,
          answerId: 2,
          correct: false,
          answer: {
            id: 2,
            answerText: 'false',
          },
        },
      ]
      setDefaultAnswerGroup(answerGroupDefault)
    }
  }, [valueTypeAnswer])

  //* Event when click radio button tf or multiple choice
  const handleChangeTypeAnswer = (event: any) => {
    setValueTypeAnswer(event.target.value)
    setCurrentQuestionAnswerGroup([])
    if (event.target.value === 'tf') {
      setCurrentQuestionAnswerGroup([...defaultAnswerGroup])
    }
  }
  //* Event when click radio button tf
  const handleChangeCorrectTf = (event: any) => {
    setCorrectAnswerTypeTf(event.target.value)
    const newResult = currentQuestionAnswerGroup.map((item: AnswerGroup, index: number) => {
      const itemAnswer = { ...item }
      itemAnswer.correct = false
      if (item.answer.answerText.toLowerCase() === event.target.value) {
        itemAnswer.correct = true
      }
      return itemAnswer
    })
    setCurrentQuestionAnswerGroup(() => newResult)
  }
  //* Event when click multiple choice
  const handleCorrectAnswerMultiple = (event: any) => {
    setValueCorrectAnswer(event.target.value)
    const newAnswers = currentQuestionAnswerGroup.map((item: AnswerGroup, index: number) => {
      const itemAnswer = { ...item }
      itemAnswer.correct = false
      if (index == event.target.value) {
        itemAnswer.correct = true
      }
      return itemAnswer
    })
    setCurrentQuestionAnswerGroup(newAnswers)
  }
  //* Check question exist in dialog **/
  const checkQuestionExistInDialog = (initialList: any, listChange: any) => {
    let countQuestion = 0;
    initialList?.map((quesBank: any, index: number) => {
      const isExist = listChange.some((item: any) => item.questionBankId === quesBank.id)
      if (!isExist) {
        countQuestion += 1;
      }
    })
    return countQuestion;
  }

  //* get question bank by name **/
  useEffect(() => {
    try {
      const resultQuestion: any = subject?.questionBank?.filter(
        (questionItem: any) =>
          questionItem?.questionText?.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
      setQuestionBank(resultQuestion)
      const countQuestion = checkQuestionExistInDialog(resultQuestion, questions)
      setToltalQuestion(countQuestion)
    } catch (err) {
      console.log('Message: ', err)
    }
  }, [searchValue, openDialogAdd])

  useEffect(() => {
    try {
      const countTy = checkQuestionExistInDialog(questionBank, questions);
      const result = countTy - arrayCheck.length;
      setToltalQuestion(result)
    } catch (err) {
      console.log('Message: ', err)
    }
  }, [questions.length])

  //* onChange value search **/
  const handleSearchValue = async (event: any) => {
    setSearchValue(event.target.value);
    if (event.target.value === '') {
      setQuestionBank(questionBank)
      const countQuestion = checkQuestionExistInDialog(questionBank, questions)
      setToltalQuestion(countQuestion)
    }
  }

  const titleDialogUpdate = (
    <div>
      <h3>
        Update answers for question in <span style={{ color: '#FD647A' }}>{examName} </span> Exam{' '}
      </h3>
    </div>
  )
  /* event when click Back */
  const handleClickBack = () => {
    history.push('/exam')
  }

  const columns = [

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
        {questionBank?.map((quesBank: any, index: number) => {
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
                      console.log(arrayCheck.length)

                    } else {
                      for (let i = 0; i < arrayCheck.length; i++) {
                        if (arrayCheck[i] === quesBank.id) {
                          arrayCheck.splice(i, 1)
                        }
                      }
                    }
                  }}
                />
                <span className="sttQuestion" style={{
                  margin: '0px 10px',
                  fontSize: ' 1rem',
                  fontWeight: 700,
                  color: '#495057'

                }}>
                  {index + 1}.{' '}
                  <span
                    style={{
                      margin: '0px 10px',
                      fontWeight: 700,
                      fontSize: ' 1rem',
                      color: '#2f6473'
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
              onChange={handleChangeTypeAnswer}
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
                onChange={handleChangeCorrectTf}
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
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="create-exam">
        <div className="container-exam">
          <div className="main">
            <div className={classes.containerBack}>
              <ArrowBackIcon
                className={classes.iconBack}
                fontSize="medium"
                onClick={handleClickBack}
              />
              <NavLink to="/exam">
                <span className={classes.textBack}>Back to list</span>
              </NavLink>
            </div>
            <div className={classes.titleOfExam}>
              <h2 style={{ color: '#495057', fontFamily: 'inherit', width: '82%' }}>{subjectName} - {examName}</h2>
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
                  Do you want to delete this question ?
                </span>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleAcceptDialogDelete(idQuestion)} color="secondary">
                  Yes
                </Button>
                <Button onClick={handleCancelDialogDelete} color="primary">
                  No
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
                  <h2 className={classes.titleExam}>{subjectName} Bank</h2>
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div className={classes.containerQuestions}>
                    <div className={classes.searchQuestions}>
                      <TextField
                        className={classes.fieldInputQuestions}
                        id="outlined-search"
                        label="Search questions"
                        variant="outlined"
                        size="small"
                        value={searchValue}
                        onChange={handleSearchValue}
                        helperText={textError}
                        error={checkError}
                      />
                      <span className={classes.totalQues}>
                        Total questions: {toltalQuestion}
                      </span>
                    </div>
                    {bodyAddQuestion}
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSaveQuestion} color="primary" autoFocus>
                  Save
                </Button>
                <Button onClick={handleCloseDialogAdd} color="primary">
                  Close
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
    /* margin-top: 7%; */
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
