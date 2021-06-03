import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

Duplicate.propTypes = {
  className: PropTypes.string
}
Duplicate.defaultProps = {
  className: ''
}

  interface IBank{
    id: number,
    title: string,
    code: string,
  }
function Duplicate(props: any) {
  const { className } = props;
  const [fileName, setFileName] =  useState<string>('');
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

  ]);

  function handleFileChange(e:any){
      setFileName(e.target.value);
  }
  return (
    <div className={className}>
      <h2 className="title-task">Duplicate Detection</h2>
      <div className="container">
        <div className="control-left">
        <h2 className="select">Import a new Bank</h2>
           <input type="file" className="input-bank" value={fileName} onChange={handleFileChange}/>
           <p className="bank-name">Bank name: {fileName}</p>
           <h2 className="select">Select Imported Bank</h2>
           <select className="input-select" >
             {listBank.map(bank =>(
               <option key={bank.id} value={bank.id}>{bank.title}</option>
             ))}
           </select>
        </div>
        <div className="control-right">
          <h2>Enter your question here:</h2>
          <textarea className="input-question"/>
          <button className="btn btn-check">Check</button>
          <button className="btn btn-clear">Clear</button>

        </div>
      </div>
    </div>
  )
}

const StyleDuplicate = styled(Duplicate)`
    width: 100%;
    height: 100vh;
    background-color: #F7F8FC;
      .container{
        width: 80%;
        height: 500px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F7F8FC;
        text-align: center;
        border-radius: 10px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
      }
      .control-left{
        width: 100%;
        height: 100%;
        background-color: red;
        
        background: linear-gradient(#141E30,#243B55);

      }
      .control-right{
        width: 100%;
        max-width: 80%;
        height: 100%;
        
      }
      .control-right{
        margin-top: 2rem;
      }
      .input-bank::-webkit-file-upload-button {
          visibility: hidden;
        }
      .input-bank::before{
        content: "Import your bank";
        display: inline-block;
        font-size:20px;
        padding: 10px 20px;
        color: #000;
        background-color:#F0F2FB;
        font-weight: 600;
        margin-left: 1rem;
      }
      .input-bank:hover{
        background-color:#F0F2FB;
      }
      .bank-name{
        padding-top: 20px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
      .select{
        color: #F9FBFF;
        margin-top: 2rem;
        padding: 20px;
      }
      .input-select{
        outline: none;
        display: inline-block;
        font-size: 16px;
        padding: 5px 15px;
        margin: 20px;
        border: none;
        color: #545D7A;
        font-weight: 600;
      }
      .input-question{
        margin: 2rem;
        width: 80%;
        min-width: 80%;
        max-width: 80%;
        height: 30%;
        font-size: 18px;
        border-radius: 10px;
        padding:10px;
        border: 2px solid #DAE1F5;
      }
      .btn{
        width: 100px;
        height: 40px;
        border: none;
        margin: 20px;
        color: #fff;
        font-weight: bold;
      }
    .btn:hover{
      background-color: #306BF3;
    }
    .btn-check{
      background-color: #10182F;
    }
    .btn-clear{
      background-color: #21774F;
    }
    
    @media screen and (max-width:600px){
      .container{
        display: flex;
        flex-direction: column;
        height: auto;
      }
    }

`
export default StyleDuplicate
