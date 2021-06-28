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
    backgroundColor: '#1e90ff',
    cursor: 'pointer'
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
            <Button variant="contained"
              color="primary"
              className={classes.styleBtn}
            >
              Random
            </Button>
          </div>
          <div>
            <Button variant="contained"
              color="primary"
              className={classes.styleBtn}
            >
              Save
            </Button>
          </div>
          <div>
            <Button variant="contained"
              color="primary"
              className={classes.styleBtn}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
const StyledCreateExam = styled(CreateExam)`

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
//* Css for area create exam and bank */
.create-exam {
  height: auto;
  width: 100%;
}
.container-exam {
  height: auto;
  display:flex;
  justify-content: space-around;
  padding:  0px 100px 10px 100px;
  text-align: center;
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

.content-exam p:hover {
  color:#5cb85c;
  cursor: pointer;
}
.content-bank p:hover {
  color:#5cb85c;
  cursor: pointer;
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
  color: #fd647a;  
  margin-top: 320px;
  width: 15%;
}
.forward:hover {
  color: #c5031f;
  cursor: pointer;
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
  .forward {
    margin: 50px;
    
  }
}
`

export default StyledCreateExam;