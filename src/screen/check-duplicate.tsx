import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import * as CONSTANT from '../const'

Duplicate.propTypes = {
  className: PropTypes.string,
}
Duplicate.defaultProps = {
  className: '',
}

interface IBank {
  id: number
  title: string
  code: string
}

interface IQuestion {
  question: string
  point: number
}

const useStyles = makeStyles((theme) => ({
  root: {},
  inputQuestion: {
    width: '80%',
  },
}))
function Duplicate(props: any) {
  const { className } = props
  const classes = useStyles()
  const [fileName, setFileName] = useState<string>('')
  const [visibleResult, setVisibleResult] = useState<boolean>(false)
  const [question, setQuestion] = useState<string>('')
  const [result, setResult] = useState<IQuestion[]>([])
  const [listBank, setListBank] = useState<IBank[]>([
    {
      id: 1,
      title: 'Data Warehouse',
      code: 'DBW391',
    },
    {
      id: 2,
      title: 'Japanese',
      code: 'JPN101',
    },
    {
      id: 3,
      title: 'English',
      code: 'ENM101',
    },
    {
      id: 4,
      title: 'Software Engineering',
      code: 'SWE102',
    },
  ])

  function handleFileChange(e: any) {
    setFileName(e.target.value)
  }
  async function handleCheck() {
    const response = await axios
    .post(CONSTANT.MODEL_CHECK_DUPLICATE_URL, {
      question,
    })
    .catch((err) => {
      console.log(err)
    })
    console.log(response)
    if (response && response.data) {
      setResult(response.data)
      setVisibleResult(true)
    }
  }
  function handleInputQuestion(e: any) {
    setQuestion(e.target.value)
  }
  function handleClear() {
    setVisibleResult(false)
    setQuestion('')
  }
  return (
    <div className={className}>
      <h2 className="title-task">Duplicate Detection</h2>
      <div className="container">
        <div className="control-left">
          <h2 className="select">Import a new Bank</h2>
          <input type="file" className="input-bank" value={fileName} onChange={handleFileChange} />
          <p className="bank-name">Bank name: {fileName}</p>
          <h2 className="select">Select Imported Bank</h2>
          <select className="input-select">
            {listBank.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.code} - {bank.title}
              </option>
            ))}
          </select>
        </div>
        <div className="control-right">
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
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Enter the question in the Question box
              then press Check button. Processing will take a couple of time.
            </p>
            <p>
              {' '}
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> If the results returned to the question
              is not duplicated with question in the bank, you can add them to your bank.{' '}
            </p>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Only Staff and Admin can input question
              bank, dataset to system.
            </p>
          </div>
          <div className="button-group">
            <Button variant="contained" color="primary" onClick={handleCheck}>
              Check
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
          {visibleResult ? (
            <div>
             {result.map((item, i) => (
                <p className="result" key={i}>❗❗ Existing question: {item.question} | Duplicate score: {item.point.toFixed(2)}</p>
              ))}
            <p className="result">✅ Does not duplicate with question in the bank  | <a href="#"> Add to question bank</a></p>
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
  height: 100vh;
  background-color: #f7f8fc;
  .container {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: center;
    background-color: #303f9f;
    text-align: center;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }

  .control-left {
    width: 30%;
    height: 100%;
  }
  .control-right {
    width: 70%;
    max-width: 70%;
    min-height: 500px;
    background: #f7f8fc;
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
    font-size: 20px;
    padding: 10px 20px;
    color: #000;
    background-color: #f0f2fb;
    font-weight: 600;
    margin-left: 1rem;
  }
  .input-bank:hover {
    background-color: #f0f2fb;
  }
  .bank-name {
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
  .select {
    color: #f9fbff;
    margin-top: 2rem;
    padding: 20px;
  }
  .input-select {
    outline: none;
    display: inline-block;
    font-size: 16px;
    padding: 5px 15px;
    margin: 20px;
    border: none;
    color: #545d7a;
    font-weight: 600;
  }
  .duplicate-icon{
    color:#303f9f;
    margin: 0 5px;
  }
  .guide-line {
    margin: 50px 20px;
    text-align: start;
  }
  .guide-line p {
    width: 60%;
    margin: 10px 0px 0px 100px;
    font-size: 16px;
    color: #545d7a;
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
  .result {
    margin: 40px;
    background-color: #F0F2FB;
  }
  @media screen and (max-width: 600px) {
    .container {
      display: flex;
      flex-direction: column;
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
  }
`
export default StyleDuplicate
