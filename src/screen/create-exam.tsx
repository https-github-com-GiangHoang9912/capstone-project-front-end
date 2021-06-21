import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'

CreateExam.propTypes = {
  className: PropTypes.string,
};

CreateExam.defaultProps = {
  className: '',
};

function CreateExam(props: any) {
  const { className } = props;
  return (
    <div className={className}>
      <div className="create-exam">
        <div className="container-exam">
          <div className="exam">
            <span className="title-exam">
              New Exam
            </span>
            <div className="content-exam" >
              <p>1. In which region does Asia have a lot of oil and gas?</p>
              <p>2. Asia is a continent?</p>
              <p>3. Asia has a land area about approx?</p>
              <p>4. Which continent is bordered by Asia?</p>
            </div>
          </div>
          <div className="icon">
            <FontAwesomeIcon className="forward" icon={faArrowLeft} />
          </div>
          <div className="bank">
            <span className="title-exam">
              Exam Bank
            </span>
            <div className="content-bank" >
              <p>1. In which region does Asia have a lot of oil and gas?</p>
              <p>2. Asia is a continent?</p>
              <p>3. Asia has a land area about approx?</p>
              <p>4. Which continent is bordered by Asia?</p>
              <p>5. Which ocean does Asia not border?</p>
              <p>6. Which of the following plains is not part of Asia?</p>
              <p>7. In which region are the mountain and plateau systems of Asia
                concentrated?</p>
              <p>8. In which direction does the mountain and plateau
                system run?</p>
              <p>9. In which region does Asia have a lot of oil and gas?</p>
              <p>10. Asia is a continent?</p>
              <p>11. Asia has a land area about approx?</p>
              <p>12. Which continent is bordered by Asia?</p>
              <p>13. Which ocean does Asia not border?</p>
              <p>14. Which of the following plains is not part of Asia?</p>
              <p>15. In which region are the mountain and plateau systems
                of Asia concentrated?</p>
              <p>16. In which region are the mountain and plateau systems
                of Asia concentrated?</p>
              <p>17. In which direction does the mountain and plateau
                system run?</p>
              <p>18. In which region are the mountain and plateau systems
                of Asia concentrated?</p>
              <p>19. In which direction does the mountain and plateau
                system run?</p>
            </div>
          </div>
        </div>
        <div className="container-button">
          <div>
            <button className="btn">Random</button>
          </div>
          <div>
            <button className="btn">Save</button>
          </div>
          <div>
            <button className="btn">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const StyledLogin = styled(CreateExam)`
body,
html {
    height: 100%;
    font-family: Poppins-Regular, sans-serif;
  }

//* Css for button */
.container-button {
    margin-bottom: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
}

.btn {
    font-family: Helvetica;
    font-size: 20px;
    font-weight: bold;
    line-height: 1.5;
    color: #fff;
    width: 150px;
    height: 50px;
    background: #1e90ff;
    outline: none;
    border:none;
    cursor: pointer;
    /* margin-left: 500px; */
  }
.btn:hover {
 background-color: #094a8a;
}
//* Css for area create exam and bank */
.create-exam {
  height: 900px;
  width: 100%;
  background: linear-gradient(#141e30, #243b55);
}
.container-exam {
  height: auto;
  display:flex;
  justify-content: space-around;
  padding:  60px 100px 10px 100px;
}

.content-exam, .content-bank {
  flex: 2;
  width: 600px;
  height: 650px;
  border: 1px solid black;
  background-color: #fff;
  padding: 10px;
  border: none;
  box-shadow: rgba(240, 234, 234, 0.35) 0px 5px 15px;
  overflow-y: scroll;
}
.content-exam, .content-bank p {
  font-size: 20px;
}
.title-exam {
  align-items: center;
  font-size: 40px;
  margin-left: 35%;
  color:#fff;
}
//* css for icon forward */
.forward {
  font-size: 50px;
  color: #fff;  
  margin-top: 320px;
}
`

export default StyledLogin;