import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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
  function handleCheck() {
    setVisibleResult(true)
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
        <div className="control control-left">
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
          <div className="guide-line">
          <p id="gl-left">
            <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Only Staff and Admin can input question
            bank, dataset to system.
            </p>
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
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Enter the question in the Question box
              then press Check button. Processing will take a couple of time.
            </p>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Input questions should
               be grammatically correct to get the best results   
            </p>
            <p>
              {' '}
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> If the results returned to the question
              is not duplicated with question in the bank, you can add them to your bank.{' '}
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
             <p className="result"> ❗❗ Existing question.... ................ ? | Duplicate score</p>
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
  background-color: #f7f8fb;
  .container {
    width: 100%;
    margin: auto;
    padding: 10px;
    font-size: 16px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    background-color: #f7f8fb;
    text-align: center;
    /* box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px; */
  }
  .control{
    flex: 1 1 auto;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #DAE1F5;
  }
  .control-left {
    width: 35%;
    height: 100%;
  }
  .control-left h2{
    width: 90%;
    margin:auto;
    font-size: 20px;
    color: #10182F;
    border-bottom: 1px solid #DAE1F5;
  }
  .control-right {
    width: 50%;
    min-height: 500px;
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
  .input-bank:hover::before{
    background-color: #2727a1;
  }
  .bank-name {
    padding-top: 20px;
    color: #10182F;
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
    width: 90%;
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
  #gl-left{
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
    .guide-line p{
      width: 80%;
      margin: 20px 40px;
    }
  }
  @media screen and (max-width: 1024px) {
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
  }
`
export default StyleDuplicate
