import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Carousel from 'react-elastic-carousel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import Chip from '@material-ui/core/Chip'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import { AccountContext } from '../contexts/account-context'
import Dialog from '../common/dialog'
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
  const [isOpen, setIsOpen] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [dialogContent, setDialogContent] = useState<any>()
  const [subjectId, setSubjectId] = useState<Number>(1)
  const [dialogSentence, setDialogSentence] = useState('')
  const [progress, setProgress] = useState(0)
  const [tagetIndex, setTagetIndex] = useState(1)
  const classes = useStyles()
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
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

  const idUser = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id

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

  const removeItem = (index: number) => (e: any) => {
    e.preventDefault()
    if (items.length === 1) return
    items.splice(index, 1)
    const newArr = [...items]
    setItems(newArr)
  }
  async function handleProgress(e: any) {
    e.preventDefault()
    if (!items[0].answer || !items[0].context) {
      handleNotification('danger', `${CONSTANT.MESSAGE().BLANK_INPUT}`)
    } else {
      try {
        setIsDisable(true)
        setProgress(progress + 10)
        const response = await axios.post(MODEL_SELF_GENERATION_URL, items)
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
      }
    }
  }

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const handleAccept = async () => {
    try {
      setIsOpen(false)

      Promise.all([
        await axios.post(ADD_SENTENCE_DATASET_URL, {
          question: dialogSentence,
        }),
        await axios.post(ADD_QUESTION_TO_BANK, {
          question: dialogSentence,
          subjectId,
        }),
      ])
      refreshToken(idUser)
      
      setDialogSentence('')
    } catch (error) {
      console.error(error)
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

  const handleInputContext = (index: number) => (e: any) => {
    const newArr = [...items]
    newArr[index].context = e.target.value
    setItems(newArr)
  }

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="form-container">
        <h2>Self Generation Questions</h2>
        <form>
          {/* Nhap cau tra loi */}
          <br />

          <Carousel isRTL={false} className="carousel">
            {items.map((item, index) => (
              <div className="item-input" key={index}>
                <div className="icon-delete">
                  <IconButton aria-label="delete" onClick={removeItem(index)}>
                    <SvgIcon className="svg-icon" viewBox="0 0 20 20">
                      <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
                    </SvgIcon>
                  </IconButton>
                </div>

                <p className="label">Input Answers {index + 1}</p>
                <TextField
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="Input answer"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={item.answer}
                  onChange={handleInputAnswer(index)}
                />
                <br />
                {/* Nhap doan van hoac ideal */}
                <p className="label">Context {index + 1}</p>
                <TextField
                  id="standard-full-width"
                  multiline
                  placeholder="Input Context"
                  rows={3}
                  rowsMax={10}
                  style={{ margin: 8 }}
                  fullWidth
                  variant="outlined"
                  value={item.context}
                  onChange={handleInputContext(index)}
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
          <div className="controls-wrapper">
            <AddCircleIcon color="primary" style={{ fontSize: 40 }} onClick={addItem} />
          </div>
          {/* Generate cau hoi */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleProgress}
            className={classes.btnGen}
            disabled={isDisable}
          >
            Generate
          </Button>
          <br />
          {/* call components ProgressBar */}
          
          {/* Display question generated */}
          {visibleResult ? (
            <div>
              <Table columns={columns} data={questions} isPagination={false} />
            </div>
          ) : (
            ' '
          )}
          {/* Dialog show select subject to add  */}
          <Dialog
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
    padding-top: 1.5em;
  }
  form {
    width: 80%;
    margin: auto;
    padding-bottom: 1rem;
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