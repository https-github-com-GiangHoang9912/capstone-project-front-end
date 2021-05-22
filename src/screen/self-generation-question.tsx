import React from 'react';
import styled from 'styled-components';

import Progress from '../common/progress'

export default function SelfGenerate(props:any) {
  return (
    <SelfContainer>
      <Head2>Self-generation</Head2>
      <FormContainer>
    <Form>
      {/* Nhap cau tra loi */}
      <FormLabel>Input Answers</FormLabel><br/>
      <InputAnswer type="text" className="input-answer inp-border" name="answer" placeholder="Enter an answer"></InputAnswer>
      <br/>
       {/* Nhap doan van hoac ideal */}
      <FormLabel>Context</FormLabel><br/>
      <TextArea className="text-area inp-border"></TextArea><br/>
      <p className="note-box">Enter the question in the Question box 
        and enter the text in the Context box then press Generate button.<br/>
        Processing will take a couple of time
         </p>
      {/* Generate cau hoi */}
      <BtnGen className="btn-generate">Generate</BtnGen><br/>

      {/* call components ProgressBar */}
      <Progress percentage={60} padding="10px" >/</Progress>

      {/* Display question generated */}
      <TextArea className="text-area inp-border question-area"></TextArea>
    </Form>
      
    </FormContainer>
      
    
    </SelfContainer>
  )
}

const SelfContainer = styled.div`
      background-color: #F7F8FC;
      width: 100%;
      height: auto;
      margin:auto;
`
const FormContainer = styled.div`
  width: 80%;
  margin:auto;
  border: 4px solid #DAE1F5;
  border-radius: 10px;
`
const Form = styled.form`
   width:80%;
   margin:auto;
   padding: 1rem;
`
const Head2 = styled.h2`
  color: #10182F;
  font-style: italic;
  padding: 20px;
  text-align: center;
`
const FormLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  color:#545D7A;
  
  
`
const InputAnswer = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid #DAE1F5;
`
const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding:10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid #DAE1F5;
  
`
const BtnGen = styled.button`
   width: 100px;
   height:40px;
   color: #fff;
   font-weight: 600;
   border-radius: 5px;
   border: 2px solid #fff;
   background-color: #306BF3;
   margin-bottom: 1rem;
   &:hover{
    background-color: #DF184A;
   }
`