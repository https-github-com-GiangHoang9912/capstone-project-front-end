import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Carousel from 'react-elastic-carousel'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import Progress from '../common/progress'
import Dialog from '../common/dialog'
import Table from '../common/tableReact'

const useStyles = makeStyles((theme) => ({
  root: {},
  btnGen: {
    margin: '20px 10px',
  },
}))

const SelfGenerate = ({ className = '' }) => {
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()
  const classes = useStyles()
  const [items, setItems] = useState([1, 2])

  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1)
    setItems([...items, nextItem])
  }

  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1)
    setItems(items.slice(0, endRange))
  }
  function handleProgress(e: any) {
    e.preventDefault()
    setShowProgress(!showProgress)
  }
  const handleDialogOpen = () => {
    setIsOpen(true)
  }
  const handleDialogClose = () => {
    setIsOpen(false)
  }
  const handleAccept = () => {
    history.push('/check-duplicate')
  }

  const [fakeQuestion, setFakeQuestion] = useState([
    {
      id: 1,
      text: "Which of the following is NOT considered characteristic of a low-context culture?"
    },
    {
      id: 2,
      text: "Which of the following is NOT a key strategy for effective global communication?"
    },
    {
      id: 3,
      text: "Why are short subject lines desirable in e-mail?"
    },
  ]);

  const columns = [
    {
      Header: "No. ",
      accessor: "id"
    },
    {
      Header: "Question",
      accessor: "text"
    },
    {
      Header: "Edit",
      Cell: (cell: any) => (
        <Icon color="secondary" >edit_circle</Icon>
      )
    }
  ];

  return (
    <div className={className}>
      <div className="form-container">
        <form>
          {/* Nhap cau tra loi */}
          <br />

          <Carousel isRTL className="carousel">
            {items.map((item) => (
              <div className="item-input">
                <p className="label">Input Answers {item}</p>
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
                <p className="label">Context {item}</p>
                <TextField
                  multiline
                  placeholder="Input Context"
                  style={{ margin: 8 }}
                  rowsMax={10}
                  fullWidth
                  variant="outlined"
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
            <Icon color="primary" onClick={addItem}>add_circle</Icon>
            <Icon color="secondary" onClick={removeItem}>delete_circle</Icon>
          </div>
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
          <Table columns={columns} data={fakeQuestion} isPagination={false} />
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
            isOpen={isOpen}
            handleAccept={handleAccept}
            handleClose={handleDialogClose}
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
    margin: 1rem;
    text-align: center;
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
    float: left;
  }
  .note-box {
    color: #545d7a;
    margin: 10px;
  }
  .item-input {
    border: 1px solid #DAE1F5;
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: rgba(118, 176, 230, 0.2) 4px 8px 24px;
  }

  .controls-wrapper {
    text-align: start;
    width: 80%;
    margin: auto;
  }
`
export default SelfStyle
