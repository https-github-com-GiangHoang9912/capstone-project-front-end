import { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Select from '@material-ui/core/Select';

import Modal from "@material-ui/core/Modal";
import { Button, FormHelperText, makeStyles } from '@material-ui/core'


import styled from 'styled-components'

UpdateExam.propTypes = {
  className: PropTypes.string,
};

UpdateExam.defaultProps = {
  className: '',
};
const useStyles = makeStyles((theme) => ({
  styleBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    margin: '5px',
  },
  paper: {
    position: 'relative',
    width: 500,
    height: 450,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll"
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnInModal: {
    position: 'absolute',
    bottom: '5px',
    right: '10px',
    width: 70,
    height: 30,
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    margin: '5px',
    fontSize: '10px',
    fontWeight: 'bold',
    "&:hover": {
      backgroundColor: '#074e96'
    },
  },
  detailAnswer: {
    marginLeft: '1rem',
    display: 'block'
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  titleExam: {
    color: '#46178F',
    alignItems: 'center'
  },
  contentExam: {

  },
  question: {
    marginLeft: '-25px',
    alignItems: 'center'
  },
  answer: {
    marginTop: '-10px',
    padding: '5px'
  }
}));

function UpdateExam(props: any) {
  const { className } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState('');
  const [nameBank, setNameBank] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <div className={classes.title}>
        <h2 className={classes.titleExam}>SSC101 Chapter 123 </h2>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <div className={classes.contentExam}>
        <div className={classes.question}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <span>1. What do you want?</span>
        </div>
        <div className={classes.answer}>
          <span className={classes.detailAnswer}>a. China</span>
          <span className={classes.detailAnswer}>b. England</span>
          <span className={classes.detailAnswer}>c. Laos</span>
          <span className={classes.detailAnswer}>d. VietNam</span>
        </div>
      </div>
      <Button
        className={classes.btnInModal}
        onClick={handleClose}>
        Save
      </Button>
    </div>
  );

  const selectionChangeHandler = (event: any) => {
    setSelected(event.target.value)
  };
  const selectionBankHandler = (event: any) => {
    setNameBank(event.target.value)
  };
  return (

    <div className={className}>
      <div className="create-exam">
        <div className="container-exam">
          <div className="exam">
            <div className="text-subject">
              <h2>SSC101 Chapter 123</h2>
            </div>
            <div className="content-exam" >
              <p>1. In which region does Asia have a lot of oil and gas?</p>
              <p>2. Asia is a continent?</p>
              <p>3. Asia has a land area about approx?</p>
              <p>4. Which continent is bordered by Asia?</p>
              <p>7. In which region are the mountain and plateau
                systems of Asia concentrated?</p>
            </div>
          </div>
        </div>
        <div className="container-button">
          <div>
            <Button variant="contained"
              color="primary"
              className={classes.styleBtn}
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.styleBtn}
              onClick={handleOpen}
            >
              Add
            </Button>
            <Modal
              className={classes.modal}
              open={open}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledUpdateExam = styled(UpdateExam)`

/* height: 100vh; */
  font-family: Poppins-Regular, sans-serif;
  background-color: #f7f8fb;

.contain-select-subjects {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-subject {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
//* Css for button */

.container-button {
    margin-bottom: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
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
.content-exam {
  flex: 1;
  width: 100%;
  height: 500px;
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
export default StyledUpdateExam;