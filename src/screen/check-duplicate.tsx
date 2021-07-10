import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'

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
}))
function Duplicate(props: any) {
  const { className } = props
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const [visibleResult, setVisibleResult] = useState<boolean>(false)
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [progress, setProgress] = useState(0)
  const [isDisable, setIsDisable] = useState(false)
  const [question, setQuestion] = useState<string>('')
  const [result, setResult] = useState<IQuestion[]>([])

  function handleFileChange(e: any) {
    setFileName(e.target.files[0].name)
  }
  const id = localStorage.getItem('id')
  async function handleCheck() {
    setIsDisable(true)
    setProgress(progress + 10)
    const response = await axios
      .post(MODEL_CHECK_DUPLICATE_URL, {
        question,
      })
      .catch(async (error) => {
        refreshToken(error, id ? Number(id) : account.id)
      })
    if (response && response.data) {
      setResult(response.data)
      setVisibleResult(true)
      setProgress(100)
      setIsDisable(false)
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
  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="container">
        <div className="control control-left">
          <div className="import-bank">
            <h2 className="select">Import a new Bank</h2>
            <input type="file" accept=".csv" className="input-bank" onChange={handleFileChange} />
            <p className="file-rule">Bank input must be .csv file</p>
            <p className="bank-name">Bank name: {fileName}</p>
            {fileName.includes('.csv') ? (
              <Button variant="contained" color="secondary" className={classes.btnDup}>
                Add Bank
              </Button>
            ) : (
              ' '
            )}
            <div className="guide-line">
              <p id="gl-left">
                <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Only Staff
                and Admin can input question bank, dataset to system.
              </p>
            </div>
          </div>
          <div className="convert-csv">
            <img src="csv.png" />
            <div className="csv-link">
              <a href="https://convertio.co/vn/doc-csv/" target="_blank" rel="noreferrer">
                <h3>Convert file to CSV</h3>
              </a>
              <p>Go to CSV convert page and convert your file to CSV format</p>
            </div>
          </div>
        </div>
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
          {visibleResult ? <TableCheckDuplicate results={result} /> : ' '}
        </div>
      </div>
    </div>
  )
}

const StyleDuplicate = styled(Duplicate)`
  width: 100%;
  height: auto;
  background-color: #f7f8fb;
  .container {
    margin: 0.5rem;
    padding: 5em 10px 10px 10px;
    font-size: 16px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    background-color: #f7f8fb;
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
    background-color: #f7f8fb;
  }
  .control-left h2 {
    width: 90%;
    margin: auto;
    font-size: 20px;
    color: #10182f;
    border-bottom: 1px solid #dae1f5;
  }
  .import-bank {
    width: 100%;
    border: 1px solid #dae1f5;
    background-color: #fff;
    border-radius: 5px;
  }
  .convert-csv {
    display: flex;
    padding: 1em;
    margin-top: 1em;
    border: 1px solid #dae1f5;
    background-color: #fff;
    text-align: start;
    border-radius: 5px;
  }
  .convert-csv img {
    width: 20%;
  }
  .csv-link {
    margin-left: 1rem;
  }
  .csv-link h3 {
    font-size: 17px;
  }
  .csv-link p {
    color: #545d7a;
    padding: 0.2em;
    font-size: 0.9rem;
  }
  .control-right {
    width: 50%;
    min-height: 500px;
    border: 1px solid #dae1f5;
  }
  .control-right h2 {
    padding: 1rem;
  }
  .input-bank::-webkit-file-upload-button {
    visibility: hidden;
  }
  .input-bank::before {
    content: 'Import your bank';
    display: inline-block;
    font-size: 1.3em;
    padding: 10px 20px;
    color: #fff;
    background-color: #303f9f;
    font-weight: 600;
    margin: 1em 0 0 2em;
  }
  .input-bank:hover::before {
    background-color: #2727a1;
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
