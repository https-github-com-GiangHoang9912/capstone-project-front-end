import React from 'react'
import './self.css'

import Progress from './../Progess-Bar/progress';

interface Props {
  
}
 
const self = (props: Props) => {
 
  return (
    <div className="self-container">
      <h2>Self-generation</h2>
    <div className="form-container">
    <form>
      {/* Nhap cau tra loi */}
      <label>Input Answers</label><br/>
      <input type="text" className="input-answer inp-border" name="answer" placeholder="Enter an answer"></input>
      <br/>
       {/* Nhap doan van hoac ideal */}
      <label>Context</label><br/>
      <textarea className="text-area inp-border"></textarea><br/>
      <p className="note-box">Enter the question in the Question box 
        and enter the text in the Context box then press Generate button.<br/>
        Processing will take a couple of time
         </p>
      {/* Generate cau hoi */}
      <button className="btn-generate">Generate</button><br/>

      {/* call components ProgressBar */}
      <Progress percentage={60} >/</Progress>

      {/* Display question generated */}
      <textarea className="text-area inp-border question-area"></textarea>
    </form>
      
    </div>
      
    
    </div>
  )
}

export default self

