import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Progress from '../common/progress'
import Dialog from '../common/dialog'

const useStyles = makeStyles((theme) => ({
  root: {},
  btnGen: {
    margin: '20px 10px',
  },
}))
const SelfGenerate = ({ className = '' }) => {
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory()
  const classes = useStyles()
  function handleProgress(e: any) {
    e.preventDefault()
    setShowProgress(!showProgress)
  }
  const handleDialogOpen = () =>{
    setIsOpen(true);
  }
  const handleDialogClose = () =>{
    setIsOpen(false);
  }
  const handleAccept = () =>{
    history.push('/check-duplicate')
  }
  return (
    <div className={className}>
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

         
          {/* Generate cau hoi */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleProgress}
            className={classes.btnGen}
          >
            Generate
          </Button>
          <br />
          {/* call components ProgressBar */}
          {showProgress ? <Progress percentage={60} /> : ''}
          {/* Display question generated */}
          <p className="label">Question generated</p>
          <TextField multiline style={{ margin: 8 }} rowsMax={10} fullWidth variant="outlined" />
          <Button
            variant="contained"
            color="primary"
            className={classes.btnGen}
            onClick={handleDialogOpen}
          >
            Check duplicate for this question
          </Button>
          <Dialog
              title="Go to Duplicate Detection"
              message="Check duplicate this question with questions in the bank ?"
              buttonAccept="Yes"
              buttonCancel="No"
              isOpen= {isOpen}
              handleAccept = {handleAccept}
              handleClose ={handleDialogClose}
            />
          <p className="note-box">
            Go to the duplicate detection page to check the newly created question.
          </p>
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
    margin: 1rem ;
    border-radius: 5px;
    background: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
  .note-box {
    color: #545d7a;
    margin: 10px;
  }
`
export default SelfStyle
