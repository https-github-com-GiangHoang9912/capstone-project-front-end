import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import LoadingBar from 'react-top-loading-bar'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import * as CONSTANT from '../const'
import { refreshToken } from '../services/services'
import Dialog from '../common/dialog'
import { TableCheckDuplicate } from '../common/table'
import { AccountContext } from '../contexts/account-context'

Duplicate.propTypes = {
  className: PropTypes.string,
}
Duplicate.defaultProps = {
  className: '',
}

axios.defaults.withCredentials = true
const MODEL_CHECK_DUPLICATE_URL = `${CONSTANT.BASE_URL}/check-duplicated`
const ADD_FILE_DATASET_URL = `${CONSTANT.BASE_URL}/check-duplicated/upload-dataset`
const GET_ROLE_URL = `${CONSTANT.BASE_URL}/user/role`
const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject`
const ADD_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject/create`
const ADD_SENTENCE_DATASET_URL = `${CONSTANT.BASE_URL}/check-duplicated/train-sentences`
const ADD_QUESTION_TO_BANK = `${CONSTANT.BASE_URL}/question-bank/create`
interface IQuestion {
  question: string
  point: number
}
interface Subject {
  id: number
  subjectName: string
}
const useStyles = makeStyles((theme) => ({
  root: {},
  inputQuestion: {
    width: '80%',
  },
  btnDup: {
    margin: 10,
  },
  chipDone: {
    marginLeft: '1rem',
    border: '1px solid #0fac31',
    color: '#0fac31',
  },
  inputSubject: {
    width: 120,
    height: 20,
    margin: 7,
  },
}))
function Duplicate(props: any) {
  const { className, handleNotification } = props
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const [visibleResult, setVisibleResult] = useState<boolean>(false)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false)
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [progress, setProgress] = useState(0)
  const [role, setRole] = useState(0)
  const [isDisable, setIsDisable] = useState(false)
  const [isDisableAddBank, setIsDisableAddBank] = useState(false)
  const [subjectId, setSubjectId] = useState<Number>(1)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [question, setQuestion] = useState<string>('')
  const [result, setResult] = useState<IQuestion[]>([])
  const [file, setFile] = useState<any>()
  const [subjectName, setSubjectName] = useState<String>()

  function handleFileChange(e: any) {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }
  const userId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id
  useEffect(() => {
    axios
      .get(`${GET_ROLE_URL}/${userId}`)
      .then((response) => {
        setRole(response.data.role)
      })
      .catch((err) => {
        console.log('Failed to fetch data: ', err.message)
      })
  }, [])

  useEffect(() => {
    axios.get(GET_SUBJECT_URL).then((response) => {
      setSubjects(response.data)
    })
  }, [])
  async function handleCheck() {
    if (question) {
      try {
        setIsDisable(true)
        setProgress(progress + 10)
        const response = await axios.post(MODEL_CHECK_DUPLICATE_URL, {
          question,
        })
        if (response && response.data) {
          setResult(response.data)
          if (response.data[0].point.toFixed(2) >= 0.6) {
            setIsAdd(false)
          } else {
            setIsAdd(true)
          }
          setVisibleResult(true)
          setProgress(100)
          setIsDisable(false)
          handleNotification('success', `${CONSTANT.MESSAGE().CHECK_SUCCESS}`)
          refreshToken(userId)
        }
      } catch (error) {
        handleNotification('danger', `${CONSTANT.MESSAGE('Check duplication').FAIL}`)
      }
    } else {
      handleNotification('danger', `${CONSTANT.MESSAGE().BLANK_INPUT}`)
    }
  }

  function handleInputQuestion(e: any) {
    setQuestion(e.target.value)
  }

  function handleClear() {
    setIsOpen(true)
  }
  const handleAcceptClear = () => {
    setVisibleResult(false)
    setQuestion('')
    setIsOpen(false)
  }
  const clickAddQuestion = () => {
    axios.get(GET_SUBJECT_URL).then((response) => {
      setSubjects(response.data)
    })
    setOpenDialogAdd(true)
  }
  const handleAcceptAdd = async () => {
    try {
      setOpenDialogAdd(false)
      Promise.all([
        await axios.post(ADD_SENTENCE_DATASET_URL, {
          question,
        }),
        await axios.post(ADD_QUESTION_TO_BANK, {
          question,
          subjectId,
        }),
      ])
    } catch (error) {
      handleNotification('danger', `${CONSTANT.MESSAGE('Add to bank').FAIL}`)
    }
    refreshToken(userId)
  }
  const handleDialogClose = () => {
    setIsOpen(false)
    setOpenDialogAdd(false)
  }

  const handleChange = (event: any) => {
    setSubjectId(Number(event.target.value))
  }

  const subjectDialogContent = (
    <div className={className}>
      <h4>Select a subject to add a question</h4>
      <Select
        className="select-subject"
        native
        value={subjectId}
        onChange={handleChange}
        input={<Input id="demo-dialog-native" />}
      >
        {subjects.map((sub: Subject) => (
          <option value={sub.id}>{sub.subjectName}</option>
        ))}
      </Select>
    </div>
  )

  const handleSubjectName = (e: any) => {
    setSubjectName(e.target.value)
  }
  const addSubject = async () => {
    try {
      const response = await axios.post(`${ADD_SUBJECT_URL}`, {
        subjectName
      })
      if (response && response.data) {
        handleNotification('success', `${CONSTANT.MESSAGE().ADD_SUCCESS}`)
        axios.get(GET_SUBJECT_URL).then((res) => {
          setSubjects(res.data)
        })
      } else {
        handleNotification('danger', `${CONSTANT.MESSAGE('Create New Subject').FAIL}`)
      }
    } catch {
      handleNotification('danger', `${CONSTANT.MESSAGE('Create New Subject').FAIL}`)
    }
  }
  const handleAddFileBank = async (e: any) => {
    e.preventDefault()
    try {
      setIsDisableAddBank(true)
      setProgress(progress + 10)
      const formData = new FormData()
      formData.append('train', file, file.name)
      formData.append('subject', `${subjectId}`)

      const response = await axios.post(ADD_FILE_DATASET_URL, formData)

      if (response && response.data) {
        setProgress(100)
        setIsDisableAddBank(false)
        handleNotification('success', `${CONSTANT.MESSAGE().TRAIN_SUCCESS}`)
      } else {
        setProgress(100)
        setIsDisableAddBank(false)
        handleNotification('danger', `${CONSTANT.MESSAGE('Upload data').FAIL}`)
      }
      refreshToken(userId)
    } catch (error) {
      handleNotification('danger', `${CONSTANT.MESSAGE('Upload data').FAIL}`)
    }
  }

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="container">
        {role !== 3 ? (
          <div className="control control-left">
            <div className="import-bank">
              <h2 className="select">Import new Bank</h2>
              <div className="input-bank">
                <input type="file" accept=".csv" onChange={handleFileChange} title=" " />
              </div>
              <p className="file-rule">Must be .csv file</p>
              <p className="bank-name">Bank name: {fileName}</p>
              {fileName.includes('.csv') ? (
                <div>
                  <div>
                    <h4>Select subject </h4>
                    <Select
                      className="select-subject"
                      native
                      value={subjectId}
                      onChange={handleChange}
                      input={<Input id="demo-dialog-native" />}
                    >
                      {subjects.map((sub: Subject) => (
                        <option value={sub.id}>{sub.subjectName}</option>
                      ))}
                    </Select>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.btnDup}
                    onClick={handleAddFileBank}
                    disabled={isDisableAddBank}
                  >
                    Add Bank
                  </Button>
                </div>
              ) : (
                ' '
              )}
              <div className="guide-line">
                <p id="gl-left">
                  <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Only
                  Staff and Admin can input question bank, dataset to system.
                </p>
              </div>
            </div>
            <div className="add-subject">
              <h4>Create new subject</h4>
              <TextField
                id="outlined"
                variant="outlined"
                label="Subject"
                size="small"
                value={subjectName}
                onChange={handleSubjectName}
                className={classes.inputSubject}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={addSubject}
                className={classes.btnDup}
                disabled={isDisable}
              >
                Add
              </Button>
            </div>
            <div className="convert-csv">
              <div className="csv-img" />
              <div className="csv-link">
                <a href="https://convertio.co/vn/doc-csv/" target="_blank" rel="noreferrer">
                  <h3>Convert file to CSV</h3>
                </a>
                <p>Go to CSV convert page and convert your file to CSV format</p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="control control-right">
          <h2>Enter your question:</h2>
          <TextField
            id="outlined-multiline-static"
            multiline
            rowsMax={6}
            variant="outlined"
            label="Question"
            value={question}
            onChange={handleInputQuestion}
            className={classes.inputQuestion}
          />
          <div className="button-group">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheck}
              className={classes.btnDup}
              disabled={isDisable}
            >
              Check
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              className={classes.btnDup}
            >
              Clear
            </Button>
            <Dialog
              title="Clear all text"
              message="Do you want to clear all the text"
              buttonAccept="Yes"
              buttonCancel="No"
              isOpen={isOpen}
              handleAccept={handleAcceptClear}
              handleClose={handleDialogClose}
            />
            <Dialog
              title="Add question"
              buttonAccept="Add"
              buttonCancel="Cancel"
              content={subjectDialogContent}
              isOpen={openDialogAdd}
              handleAccept={handleAcceptAdd}
              handleClose={handleDialogClose}
            />
          </div>
          <div className="guide-line">
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Processing
              will take a couple of time.
            </p>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Questions
              should be grammatically correct to get the best results
            </p>
            <p>
              {' '}
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> If the
              results is "not duplicated", you can add them to your bank.
            </p>
          </div>

          {visibleResult ? (
            <div>
              <TableCheckDuplicate results={result} />
              {isAdd ? (
                <div className="result-contain">
                  <p>
                    Able to add this question to bank
                    {/* Button add question to bank */}
                    <Chip
                      label="Add question"
                      clickable
                      icon={<DoneIcon />}
                      onClick={clickAddQuestion}
                      className={classes.chipDone}
                      variant="outlined"
                    />
                  </p>
                </div>
              ) : (
                <p style={{ color: '#d11c1c', fontSize: '0.9rem', margin: '2rem' }}>
                  Unable to add this question to bank
                </p>
              )}
            </div>
          ) : (
            ' '
          )}
        </div>
      </div>
    </div>
  )
}

const StyleDuplicate = styled(Duplicate)`
  width: 100%;
  height: auto;

  .container {
    margin: 0.5rem;
    padding: 5em 10px 10px 10px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    background-color: #fbfbfb;
    text-align: center;
    /* box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px; */
  }
  .control {
    flex: 1 1 auto;
    margin: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
  .control-left {
    width: 35%;
    height: 100%;
    background-color: #fbfbfb;
  }
  .control-left h2 {
    width: 90%;
    margin: auto;
    font-size: 20px;
    color: #10182f;
    border-bottom: 1px solid #dae1f5;
  }
  .result-contain {
    margin: 2rem;
  }
  .result-contain p {
    color: #1ab93d;
    font-size: 0.9rem;
    text-align: center;
  }
  .import-bank {
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 20px;
  }
  .convert-csv {
    display: flex;
    justify-content: center;
    height: auto;
    padding: 1em;
    margin-top: 1em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    text-align: start;
    border-radius: 5px;
  }

  .csv-link {
    margin-left: 1rem;
  }
  .csv-img {
    width: 150px;
    height: 90px;
    background-image: url('https://image.flaticon.com/icons/png/128/2305/2305855.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .csv-link h3 {
    font-size: 17px;
  }
  .csv-link p {
    color: #545d7a;
    padding: 0.2em;
    margin: 0;
    font-size: 0.9rem;
  }
  .add-subject {
    padding: 1em;
    margin-top: 1em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    text-align: start;
    border-radius: 5px;
  }
  .control-right {
    width: 50%;
    min-height: 500px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .control-right h2 {
    padding: 1rem;
  }
  input::-webkit-file-upload-button {
    padding: 10px 20px;
    background-color: #303f9f;
    border: none;
    font-size: 1rem;
    border-radius: 5px;
    color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: 100ms ease-out;
    font-weight: bold;
    cursor: pointer;
  }
  input::-webkit-file-upload-button:hover {
    background-color: #35367a;
  }
  .input-bank {
    margin: 1rem;
  }
  input[type='file'] {
    font-size: 0px;
  }
  .file-rule {
    color: #8c95ad;
  }
  .bank-name {
    padding: 20px 0;
    color: #10182f;
    font-size: 18px;
    font-weight: 600;
  }
  option {
    font-size: 0.9rem;
  }
  .select {
    color: #f9fbff;
    margin-top: 2rem;
    padding: 20px;
  }
  .duplicate-icon {
    color: #303f9f;
    margin: 0 5px;
  }
  .guide-line {
    margin: 1rem;
    text-align: start;
  }
  .guide-line p {
    width: 60%;
    margin: auto;
    line-height: 1.5rem;
    font-size: 0.9rem;
    color: #545d7a;
  }
  #gl-left {
    width: 100%;
    margin: 0;
  }
  .button-group {
    width: 40%;
    margin: auto;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .control-right {
    width: 100%;
    max-width: 100%;
  }
  .result-contain {
    text-align: start;
  }
  .result {
    margin: 40px;
    background-color: #f0f2fb;
  }
  @media screen and (max-width: 600px) {
    .container {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      height: auto;
    }
    .control-left {
      width: 100%;
    }
    .control-right {
      width: 100%;
      max-width: 100%;
    }
    .button-group {
      display: flex;
      flex-direction: column;
    }
    .input-question {
      width: 100%;
    }
    .guide-line p {
      width: 80%;
      margin: 20px 40px;
    }
    .add-subject {
      text-align: center;
    }
  }
  @media screen and (max-width: 1024px) {
    .container {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      height: auto;
    }
    .control-left {
      width: 100%;
    }
    .control-right {
      width: 100%;
      max-width: 100%;
    }
    .add-subject {
      text-align: center;
    }
  }
`
export default StyleDuplicate
