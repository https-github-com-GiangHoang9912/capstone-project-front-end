import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Carousel from 'react-elastic-carousel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogCustom from '../common/dialog'

import { AccountContext } from '../contexts/account-context'
import Progress from '../common/progress'
import Table from '../common/tableReact'

import { refreshToken } from '../services/services'
import * as CONSTANT from '../const'

axios.defaults.withCredentials = true

const useStyles = makeStyles((theme) => ({
  root: {},
  btnGen: {
    margin: '20px 10px',
  },
  chipDone: {
    marginLeft: '1rem',
    border: '1px solid #0fac31',
    color: '#0fac31',
  },
}))

interface AnswerInput {
  answer: string
  context: string
}

interface Question {
  id: number
  text: string
}

interface Subject {
  id: number
  subjectName: string
}
const MODEL_SELF_GENERATION_URL = `${CONSTANT.BASE_URL}/self-generate`
const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject`
const ADD_SENTENCE_DATASET_URL = `${CONSTANT.BASE_URL}/check-duplicated/train-sentences`
const ADD_QUESTION_TO_BANK = `${CONSTANT.BASE_URL}/question-bank/create`
const MODEL_CHECK_DUPLICATE_URL = `${CONSTANT.BASE_URL}/check-duplicated`

const SelfGenerate = (props: any) => {
  const { className, handleNotification } = props
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [openDialogRemove, setOpenDialogRemove] = useState(false)
  const [isDisable, setIsDisable] = useState(true)
  const [dialogContent, setDialogContent] = useState<any>()
  const [subjectId, setSubjectId] = useState<Number>(1)
  const [dialogSentence, setDialogSentence] = useState('')
  const [progress, setProgress] = useState(0)
  const [tagetIndex, setTagetIndex] = useState(1)
  const history = useHistory()
  const classes = useStyles()
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [idRemove, setIdRemove] = useState(0)
  const userId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  const [visibleResult, setVisibleResult] = useState<boolean>(false)
  const [items, setItems] = useState<AnswerInput[]>([
    {
      answer: '',
      context: '',
    },
  ])

  const addItem = () => {
    if (items.length === 10) return
    const newArr = [...items]
    newArr.push({
      answer: '',
      context: '',
    })
    setItems(newArr)
    setTagetIndex(items.length)
  }

  async function handleProgress(e: any) {
    e.preventDefault()
    try {
      setIsDisable(true)
      setProgress(progress + 10)
      const response = await axios.post(MODEL_SELF_GENERATION_URL, items)
      console.log(response)
      if (response && response.data) {
        const newArr = response.data.question?.map((item: string, index: number) => ({
          id: index + 1,
          text: item,
        }))
        setQuestions(newArr)
        setProgress(100)
        setVisibleResult(true)
        setIsDisable(false)
        handleNotification('success', `${CONSTANT.MESSAGE().GEN_SUCCESS}`)
      }
      refreshToken(userId)
    } catch (error) {
      console.error(error)
      setProgress(100)
      handleNotification('danger', `${CONSTANT.MESSAGE('Generate Questions !!').FAIL}`)
    }
  }

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const handleAccept = async () => {
    try {
      setIsOpen(false)
      setProgress(progress + 10)
      Promise.all([
        await axios.post(ADD_SENTENCE_DATASET_URL, {
          question: dialogSentence,
        }),
        await axios.post(ADD_QUESTION_TO_BANK, {
          question: dialogSentence,
          subjectId,
        }),
      ])
      setProgress(100)
      handleNotification('success', `${CONSTANT.MESSAGE().ADD_SUCCESS}`)
      refreshToken(userId)
      setDialogSentence('')
    } catch (error) {
      console.error(error)
      setProgress(100)
      handleNotification('danger', `${CONSTANT.MESSAGE("Add Questions").FAIL}`)
    }
  }

  const columns = [
    {
      Header: 'Question',
      accessor: 'text',
    },
    {
      Header: 'Add to bank',
      Cell: (cell: any) => (
        <Chip
          label="Add"
          clickable
          color="secondary"
          onClick={() => handleCheckDuplicationThenAdd(cell.row.original.text)}
          variant="outlined"
        />
      ),
    },
  ]

  const duplicatedDialogContent = (
    <div className={className}>
      <h4>{dialogSentence} was duplicate</h4>
    </div>
  )

  const selectSubjectDialogContent = (
    <div className={className}>
      <h4>Select a subject to add a question</h4>
      <Select
        className="select-subject"
        native
        value={subjectId}
        onChange={(event: any) => setSubjectId(Number(event.target.value))}
        input={<Input id="demo-dialog-native" />}
      >
        {subjects.map((sub: Subject) => (
          <option value={sub.id}>{sub.subjectName}</option>
        ))}
      </Select>
    </div>
  )

  useEffect(() => {
    if (isDuplicate) {
      setDialogContent(duplicatedDialogContent)
    } else {
      setDialogContent(selectSubjectDialogContent)
    }
  }, [dialogSentence, subjectId])

  const handleCheckDuplicationThenAdd = async (text: string) => {
    try {
      await axios.get(GET_SUBJECT_URL).then((response) => {
        setSubjects(response.data)
        console.log(response.data)
      })

      const res = await axios.post(MODEL_CHECK_DUPLICATE_URL, {
        question: text,
      })

      const duplicateCondition = res && res.data.length > 0 && res.data[0].point > CONSTANT.CONFIDENT.point

      setIsDuplicate(duplicateCondition)
      setDialogSentence(text)
      setIsOpen(true)
      refreshToken(userId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputAnswer = (index: number) => (e: any) => {
    const newArr = [...items]
    newArr[index].answer = e.target.value
    setItems(newArr)
  }

  const validQuestionRegex = /([A-Za-z])+(\s)+/

  const handleInputContext = (index: number) => (e: any) => {
    const newArr = [...items]
    newArr[index].context = e.target.value
    setItems(newArr)

    const input = e.target.value
    const isValidInput = !!input && validQuestionRegex.test(input)
    
    if (!isValidInput) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }

  const removeItem = (index: number, arrayLength: number) => (e: any) => {
    e.preventDefault()
    setIdRemove(index)
    if (index === 0 && arrayLength === 1) {
      setOpenDialogRemove(false)
    } else {
      setOpenDialogRemove(true)
    }
  }

  const handleAcceptRemove = (index: number) => (e: any) => {
    e.preventDefault()
    if (items.length === 1) return
    items.splice(index, 1)
    const newArr = [...items]
    setItems(newArr)
    handleNotification('success', `${CONSTANT.MESSAGE('').DELETE_SUCCESS}`)
    setOpenDialogRemove(false)
  }

  const handleDialogCloseRemove = (e: any) => {
    e.preventDefault()
    setOpenDialogRemove(false)
  }

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="form-container">
        <h2>Self Generation Questions</h2>
        <form onSubmit={handleProgress}>
          {/* Nhap cau tra loi */}
          <br />

          <Carousel isRTL={false} className="carousel">
            {items.map((item, index) => (
              <div className="item-input" key={index}>
                <div className="icon-delete">
                  <IconButton aria-label="delete" onClick={removeItem(index, items.length)}>
                    <SvgIcon className="svg-icon" viewBox="0 0 20 20">
                      <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
                    </SvgIcon>
                  </IconButton>
                </div>
                <p className="label">Input Answers {index + 1}</p>
                <TextField
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="Enter a answer"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={item.answer}
                  required={true}
                  onChange={handleInputAnswer(index)}
                />
                <br />
                {/* Nhap doan van hoac ideal */}
                <p className="label">Context {index + 1}</p>
                <TextField
                  id="standard-full-width"
                  className="context-field"
                  multiline
                  placeholder="Enter the Context"
                  style={{ margin: 8 }}
                  maxRows={10}
                  fullWidth
                  variant="outlined"
                  value={item.context}
                  rows={3}
                  onChange={handleInputContext(index)}
                  required={true}
                  error={!!item.context && !validQuestionRegex.test(item.context)}
                  helperText={!!item.context && !validQuestionRegex.test(item.context)
                    ? '⚠ The text you entered is not valid or too short!'
                    : ''}
                />

                <p className="note-box">
                  Enter the question in the Question box and enter the text in the Context box then
                  press Generate button.
                  <br />
                  Processing will take a couple of time
                </p>
              </div>
            ))}
          </Carousel>
          {/* Dialog confirm remove iteam self generate */}
          <div>
            <Dialog open={openDialogRemove} onClose={handleDialogCloseRemove}>
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
                  Do you want delete this section ?
                </span>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAcceptRemove(idRemove)} color="secondary">
                  Delete
                </Button>
                <Button onClick={handleDialogCloseRemove} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

          </div>
          <div className="controls-wrapper">
            <AddCircleIcon color="primary" style={{ fontSize: 40 }} onClick={addItem} />
          </div>
          {/* Generate cau hoi */}
          <Button
            variant="contained"
            color="primary"
            className={classes.btnGen}
            disabled={isDisable}
            type='submit'
          >
            Generate
          </Button>
          <br />
          {/* call components ProgressBar */}
          {showProgress ? <Progress percentage={60} /> : ''}
          {/* Display question generated */}
          {visibleResult ? (
            <div>
              <Table columns={columns} data={questions} isPagination={false} />
            </div>
          ) : (
            ' '
          )}
          {/* Dialog show select subject to add  */}
          <DialogCustom
            title="Add question"
            buttonAccept="Add"
            buttonCancel="Cancel"
            content={dialogContent}
            isOpen={isOpen}
            handleAccept={handleAccept}
            handleClose={handleDialogClose}
          />
        </form>
      </div>
    </div>
  )
}

const SelfStyle = styled(SelfGenerate)`
  background: #f7f8fb;
  min-height: auto;
  margin: auto;
  padding-bottom: 20px;
  .form-container {
    margin: 2rem;
    text-align: center;
    border-radius: 5px;
    background: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-top: 6em;
  }
  .form-container h2 {
    padding-top: 0.5em;
  }
  form {
    width: 80%;
    margin: auto;
    padding-bottom: 1rem;
  }

  .context-field p{
    color: red;
    margin: 1rem 0.5rem;
    text-align: left;
    font-size: 0.9rem;
  }

  .label {
    font-size: 18px;
    font-weight: 600;
    color: #545d7a;
    padding: 10px 0;
    float: left;
  }
  .note-box {
    color: #89928c;
    margin: 10px;
    font-size: 0.9rem;
  }
  .result-contain {
    margin-top: 2rem;
  }
  .result-contain p {
    color: #1ab93d;
    font-size: 0.9rem;
  }
  .select-subject {
    width: 200px;
    height: 24px;
    border: none;
    outline: none;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    border-bottom: 2px solid #303f9f;
  }
  .item-input {
    text-align: start;
    border: 1px solid #dae1f5;
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: rgba(118, 176, 230, 0.2) 4px 8px 24px;
  }
  .item-delete {
    display: flex;
    justify-content: flex-end;
  }
  .controls-wrapper {
    display: flex;
    text-align: start;
    width: 80%;
    margin: auto;
    justify-content: flex-end;
  }
  .icon-delete {
    display: flex;
    justify-content: flex-end;
  }
  .icon-add {
    font-size: 3em !important;
    padding-right: 2.5em;
  }
  .svg-icon {
    width: 1em;
    height: 1em;
  }
  .svg-icon path,
  .svg-icon polygon,
  .svg-icon rect {
    fill: #ca3434;
  }
  .svg-icon circle {
    stroke: #ca3434;
    stroke-width: 1;
  }
`
export default SelfStyle