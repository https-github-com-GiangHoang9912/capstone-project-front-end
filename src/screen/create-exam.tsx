import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button, makeStyles } from '@material-ui/core'


import styled from 'styled-components'

CreateExam.propTypes = {
  className: PropTypes.string,
};
CreateExam.defaultProps = {
  className: '',
};

const useStyles = makeStyles({
  styleBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#1e90ff'
  }
})

function CreateExam(props: any) {
  const { className } = props;
  const classes = useStyles();
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
              <p>7. In which region are the mountain and plateau
                systems of Asia concentrated?</p>
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
          {/* <div>
            <Button variant="contained"
              color="primary"
              className={classes.styleBtn}
            >
              Primary
            </Button>
          </div> */}
          <div>
            <button className="btn">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const StyledLogin = styled(CreateExam)`

  height: 100vh;
  font-family: Poppins-Regular, sans-serif;
  background-color: #f7f8fb;

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
  
  }
.btn:hover {
 background-color: #094a8a;
}
//* Css for area create exam and bank */

.create-exam {
  height: auto;
  width: 100%;
  /* background: linear-gradient(#141e30, #243b55); */
}
.container-exam {
  height: auto;
  display:flex;
  justify-content: space-around;
  padding:  0px 100px 10px 100px;
  text-align:center;
}
.content-exam, .content-bank {
  flex: 1;
  width: 100%;
  height: 650px;
  border: 1px solid black;
  background-color: #fff;
  padding: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow-y: scroll;
  text-align: start;
  border-radius: 10px;
}
.content-exam, .content-bank p {
  font-size: 20px;
}
.title-exam {
  align-items: center;
  font-family: Barlow;
  font-size: 40px;
  font-weight:1000;
  margin-left: 6%;
  color:#ee4949;
}
//* css for icon forward */
.forward {
  font-size: 50px;
  color: #e74c3c;  
  margin-top: 320px;
  width: 15%;
}
//* Responsive */
@media (max-width: 768px) { 
  .container-exam {
    flex-direction: column;
    padding: 10px;
  }
  .content-exam, .content-bank {
    width: 100%;
  }
}
`

export default StyledLogin;