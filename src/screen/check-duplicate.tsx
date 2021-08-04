import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
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
interface IQuestion {
  question: string
  point: number
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
    color: '#0fac31'
  }
})) 
function Duplicate(props: any) {
  const { className, handleNotification } = props
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const [visibleResult, setVisibleResult] = useState<boolean>(true)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [progress, setProgress] = useState(0)
  const [role, setRole] = useState(0)
  const [isDisable, setIsDisable] = useState(false)
  const [isDisableAddBank, setIsDisableAddBank] = useState(false)
  const [question, setQuestion] = useState<string>('')
  const [result, setResult] = useState<IQuestion[]>([])
  const [file, setFile] = useState<any>()

  function handleFileChange(e: any) {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }
  const id = localStorage.getItem('id')
  useEffect(() => {
    axios
      .get(`${GET_ROLE_URL}/${id}`)
      .then((response) => {
        setRole(response.data.role)
      })
      .catch((err) => {
        console.log('Failed to fetch data: ', err.message)
      })
  }, [])

  async function handleCheck() {
    try {
      setIsDisable(true)
      setProgress(progress + 10)
      const response = await axios.post(MODEL_CHECK_DUPLICATE_URL, {
        question,
      })
      .catch(async (error) => {
        refreshToken(error, id ? Number(id) : account.id)
      })
    if (response && response.data) {
      setResult(response.data)
      if(response.data[0].point.toFixed(2) >= 0.6){
         setIsAdd(false);
      }else{
        setIsAdd(true);
      }
      setVisibleResult(true)
      setProgress(100)
      setIsDisable(false)
      handleNotification('success', `${response.status}: Successful`)
    }
    } catch (error) {
      refreshToken(error, id ? Number(id) : account.id)

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
  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const handleAddFileBank = async (e: any) => {
    e.preventDefault()
    try {
      setIsDisableAddBank(true)
      setProgress(progress + 10)
      const formData = new FormData()
      formData.append('train', file, file.name)

      const response = await axios.post(ADD_FILE_DATASET_URL, formData)

      if (response && response.data) {
        setProgress(100)
        setIsDisableAddBank(false)
        handleNotification('success', `${response.status}: Training data Successful`)
      } else {
        setProgress(100)
        setIsDisableAddBank(false)
        handleNotification('danger', `Training data fail`)
      }
    } catch (error) {
      refreshToken(error, id ? Number(id) : account.id)
    }
  }

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="container">
        {role !== 3 ? (
          <div className="control control-left">
            <div className="import-bank">
              <h2 className="select">Import a new Bank</h2>
              <div className="input-bank">
                <input type="file" accept=".csv" onChange={handleFileChange} title=" " />
              </div>
              <p className="file-rule">Bank input must be .csv file</p>
              <p className="bank-name">Bank name: {fileName}</p>
              {fileName.includes('.csv') ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.btnDup}
                  onClick={handleAddFileBank}
                  disabled={isDisableAddBank}
                >
                  Add Bank
                </Button>
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
          <h2>Enter your question here:</h2>
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
          <div className="guide-line">
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Enter the
              question in the Question box then press Check button. Processing will take a couple of
              time.
            </p>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Input
              questions should be grammatically correct to get the best results
            </p>
            <p>
              {' '}
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> If the
              results returned to the question is not duplicated with question in the bank, you can
              add them to your bank.{' '}
            </p>
          </div>
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
          </div>
          {visibleResult ? (
          <div>
          <TableCheckDuplicate results={result} />
           {isAdd ? <div className="result-contain">
           <p>
             Able to add this question to bank
             {/* Button add question to bank */}
             <Chip
             label="Add question"
             clickable
             icon={<DoneIcon />}
             className={classes.chipDone}
             variant="outlined"
           />
           </p>
           </div> : <p style ={{color: '#d11c1c', fontSize:"0.9rem", margin:"2rem"}}>
             Unable to add this question to bank</p>}
          </div>
          
          ) : ' '}
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
  .result-contain{
    margin: 2rem;
  }
  .result-contain p{
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
    padding-top: 20px;
    color: #10182f;
    font-size: 18px;
    font-weight: 600;
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
    margin: 50px 20px;
    text-align: start;
  }
  .guide-line p {
    width: 60%;
    margin: 10px 0px 0px 100px;
    font-size: 0.9rem;
    color: #545d7a;
  }
  #gl-left {
    width: 100%;
    margin: 0;
  }
  .button-group {
    width: 30%;
    margin: auto;
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
  }
`
export default StyleDuplicate
