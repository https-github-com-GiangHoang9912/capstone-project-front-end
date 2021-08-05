import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Carousel from 'react-elastic-carousel'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import { AccountContext } from '../contexts/account-context'
import Progress from '../common/progress'
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
const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject `

const SelfGenerate = (props: any) => {
  const { className, handleNotification } = props
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [progress, setProgress] = useState(0)
  const [tagetIndex, setTagetIndex] = useState(1)
  const history = useHistory()
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

  const addItem = () => {
    if (items.length === 10) return
    const newArr = [...items]
    newArr.push({
      answer: '',
      context: '',
    })
    setItems(newArr)
    setTagetIndex(items.length)
    console.log(tagetIndex)
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
      }
      refreshToken(userId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDialogClose = () => {
    setIsOpen(false)
  }
  const handleAccept = () => {
    history.push('/check-duplicate')
  }

  const columns = [
    {
      Header: 'No. ',
      accessor: 'id',
    },
    {
      Header: 'Question',
      accessor: 'text',
    },
    {
      Header: 'Check Duplication',
      Cell: (cell: any) => (
        <Chip
          label="Check"
          clickable
          color="secondary"
          onClick={() => handleCheckDuplication(cell.row.original.text)}
          variant="outlined"
        />
      ),
    },
  ]

  {
    /* Content subject select dialog */
  }
  const subjectDialog = (
    <div className={className}>
      <h4>Select a subject to add a question</h4>
      <select className="select-subject">
        {subjects.map((sub) => (
          <option value={sub.id}>{sub.subjectName}</option>
        ))}
      </select>
    </div>
  )
  const handleCheckDuplication = async (text: String) => {
    try {
      await axios.get(GET_SUBJECT_URL).then((response) => {
        setSubjects(response.data)
        console.log(response.data)
      })
      setIsOpen(true)
      setIsDuplicate(true)
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
                  style={{ margin: 8 }}
                  rowsMax={10}
                  fullWidth
                  variant="outlined"
                  value={item.context}
                  rows={3}
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
          <Dialog
            title="Add question"
            buttonAccept="Add"
            buttonCancel="Cancel"
            content={subjectDialog}
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
