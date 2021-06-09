import React, { useState } from 'react'
import styled from 'styled-components'

import Progress from '../common/progress'
import Dialog from '../common/dialog'

const SelfGenerate = ({ className = '' }) => {
  const [showProgress, setShowProgress] = useState<Boolean>(false)
  const [showDialog, setShowDialog] = useState<Boolean>(false)
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
      <h2>Self-generation</h2>
      <div className="form-container">
        <form>
          {/* Nhap cau tra loi */}
          <p className="label">Input Answers</p>
          <input
            type="text"
            id="answer"
            className="input-answer inp-border"
            name="answer"
            placeholder="Enter an answer"
          />
          <br />
          {/* Nhap doan van hoac ideal */}
          <p className="label">Context</p>
          <textarea className="text-area inp-border" id="text" name="text" />
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
          <button className="btn-generate" onClick={handleProgress}>
            Generate
          </button>
          <br />

          {/* call components ProgressBar */}
          {showProgress ? <Progress percentage={60} /> : ''}

          {/* Display question generated */}
          <p className="label">Question generated</p>
          <textarea className="text-area inp-border question-area" />
          <button className="btn-generate" onClick={handleDialog}>
            Add to bank
          </button>
        </form>
      </div>
    </div>
  )
}

const SelfStyle = styled(SelfGenerate)`
  background-color: #f7f8fc;
  height: auto;
  margin: auto;
  .form-container {
    width: 80%;
    margin: auto;
    border: 4px solid #dae1f5;
    border-radius: 10px;
  }
  h2 {
    color: #10182f;
    font-style: italic;
    padding: 20px;
    text-align: center;
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
  }
  form .input-answer {
    width: 100%;
    height: 20px;
    padding: 10px;
  }
  .note-box {
    color: #616161;
  }
  .text-area {
    width: 100%;
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
    background-color: #306bf3;
    margin-bottom: 1rem;
  }
  .btn-generate:hover {
    background-color: #df184a;
  }
  .question-area {
    margin-top: 1rem;
    background-color: #ecfdf5;
  }
`
export default SelfStyle
