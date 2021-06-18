import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Progress from '../common/progress'
import Dialog from '../common/dialog'



const useStyles = makeStyles((theme) => ({
  root: {},
  btnGen: {
    margin: "20px 10px",
  },
}))
const SelfGenerate = ({ className = '' }) => {
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [showDialog, setShowDialog] = useState<Boolean>(false)
  const classes = useStyles()
  function handleProgress(e: any) {
    e.preventDefault()
    setShowProgress(!showProgress)
  }

  function handleDialog(e: any) {
    e.preventDefault()
    setShowDialog(!showDialog)
  }
  return (
    <div className={className}>
      <h2 className="title-task">Self-generation</h2>
      <div className="form-container">
        <form>
          {/* Nhap cau tra loi */}
          <br />
          <p className="label">Input Answers</p>
          <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Input answer"
          variant="outlined"
          fullWidth
          margin="normal"
          
        />
          <br />
          {/* Nhap doan van hoac ideal */}
          <p className="label">Context</p>
          <TextField
            multiline
            placeholder="Input Context"
            style={{ margin: 8 }}
            rowsMax={10}
            fullWidth
            variant="outlined"
            
          />
          <br />
          <p className="note-box">
            Enter the question in the Question box and enter the text in the Context box then press
            Generate button.
            <br />
            Processing will take a couple of time
          </p>

          {showDialog ? (
            <Dialog
              title="Self"
              message="Do you want to add this question to the bank"
              buttonAccept="Yes"
              buttonCancel="No"
            />
          ) : (
            ''
          )}
          {/* Generate cau hoi */}
          <Button variant="contained" color="primary"  onClick={handleProgress} className={classes.btnGen} >
              Generate
            </Button>
          <br />
          {/* call components ProgressBar */}
          {showProgress ? <Progress percentage={60} /> : ''}
          {/* Display question generated */}
          <p className="label">Question generated</p>
          <TextField
            multiline
            style={{ margin: 8 }}
            rowsMax={10}
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleDialog}  className={classes.btnGen}>
              Check Duplicate
            </Button>
            <p className="note-box">
            Go to the duplicate detection page to check the newly created question.
            </p>
        </form>
      </div>
    </div>
  )
}

const SelfStyle = styled(SelfGenerate)`
  background: #f7f8fc;
  min-height: 100vh;
  margin: auto;
  padding: 20px;
  .form-container {
    width: 80%;
    margin: auto;
    border-radius: 5px;
    background: #f7f8fc;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px;
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
  }
  form .input-answer {
    width: 100%;
    height: 32px;
    padding: 10px;
    transition: 0.7s;
  }

  .note-box {
    color: #545d7a;
    margin: 10px;
  }
  .text-area {
    width: 100%;
    max-width: 100%;
    height: 150px;
    padding: 10px;
  }
  .inp-border {
    border-radius: 10px;
    border: 2px solid #dae1f5;
  }
  .btn-generate {
    width: 100px;
    height: 40px;
    color: #fff;
    font-weight: 600;
    border-radius: 5px;
    border: 2px solid #fff;
    background-color: #000000;
    margin: 1rem 0;
  }
  .btn-generate:hover {
    background-color: #333333;
  }
  .question-area {
    margin-top: 1rem;
    background-color: #ecfdf5;
  }
`
export default SelfStyle
