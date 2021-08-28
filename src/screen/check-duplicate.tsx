import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import LoadingBar from 'react-top-loading-bar'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import * as CONSTANT from '../const'
import { refreshToken } from '../services/services'
import Dialog from '../common/dialog'
import { TableCheckDuplicate } from '../common/table'
import { AccountContext } from '../contexts/account-context'

Duplicate.propTypes = {
  className: PropTypes.string,
}
Duplicate.defaultProps = {
  className: '',
}

axios.defaults.withCredentials = true
const MODEL_CHECK_DUPLICATE_URL = `${CONSTANT.BASE_URL}/check-duplicated`
const ADD_FILE_DATASET_URL = `${CONSTANT.BASE_URL}/check-duplicated/upload-dataset`
const GET_ROLE_URL = `${CONSTANT.BASE_URL}/user/role`
const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject`
const ADD_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject/create`
const ADD_QUESTION_TO_BANK = `${CONSTANT.BASE_URL}/question-bank/create`
interface IQuestion {
  question: string
  point: number
}
interface Subject {
  id: number
  subjectName: String
}
const useStyles = makeStyles((theme) => ({
  root: {},
  inputQuestion: {
    width: '100%',
  },
  btnDup: {
    margin: '1rem',
  },
  btnSubject: {
    margin: '0.5rem',
  },
  chipDone: {
    marginLeft: '1rem',
    border: '1px solid #0fac31',
    color: '#0fac31',
  },
  chipView: {
    margin: 5,
  },
  chipSubject: {
    margin: 10,
  },
  inputSubject: {
    width: 140,
    height: 20,
    margin: '7px 4px',
  },
  inputQB: {
    width: 600,
    margin: '1.2rem',
  },
  chipAddQB: {
    margin: '2rem 1rem',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}))

function Duplicate(props: any) {
  const { className, handleNotification } = props
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const [visibleResult, setVisibleResult] = useState<boolean>(false)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false)
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [progress, setProgress] = useState(0)
  const [role, setRole] = useState(0)
  const [isDisable, setIsDisable] = useState(false)
  const [isDisableAddBank, setIsDisableAddBank] = useState(false)
  const [subjectId, setSubjectId] = useState<Number>(1)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [question, setQuestion] = useState<string>('')
  const [result, setResult] = useState<IQuestion[]>([])
  const [file, setFile] = useState<any>()
  const [subjectName, setSubjectName] = useState<String>()
  const [isDuplicateSubject, setIsDuplicateSubject] = useState(false)
  const [duplicateSubject, setDuplicateSubject] = useState<String>('')
  const [isOpenDialogSubject, setIsOpenDialogSubject] = useState(false)
  const [isOpenDialogFormat, setIsOpenDialogFormat] = useState(false)
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const [isValidQues, setIsValidQues] = useState(true)
  const [listQuestion, setListQuestion] = useState<string[]>([''])

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [isGuideline, setIsGuideline] = useState(true)

  function handleFileChange(e: any) {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }
  const userId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id
  useEffect(() => {
    axios
      .get(`${GET_ROLE_URL}/${userId}`)
      .then((response) => {
        setRole(response.data.role)
      })
      .catch((err) => {
        console.log('Failed to fetch data: ', err.message)
      })
  }, [])

  useEffect(() => {
    axios.get(GET_SUBJECT_URL).then((response) => {
      setSubjects(response.data)
    })
  }, [])

  useEffect(() => {
    if (question === '') {
      setIsValidQues(true)
    } else if (isValidQuestion) {
      setIsValidQues(true)
    } else {
      setIsValidQues(false)
    }
  }, [question])

  const validQuestionRegex = /(([A-Za-z])+(\s)+){2,}/
  const isValidQuestion = validQuestionRegex.test(question)
  async function handleCheck() {
    if (isValidQuestion) {
      setIsValidQues(true)
      try {
        setIsDisable(true)
        setProgress(progress + 10)
        const response = await axios.post(MODEL_CHECK_DUPLICATE_URL, {
          question,
          subjectId,
        })
        if (response && response.data) {
          setResult(response.data)
          if (response.data[0].point.toFixed(2) >= 0.6) {
            setIsAdd(false)
          } else {
            setResult([])
            setIsAdd(true)
          }
          setVisibleResult(true)
          setProgress(100)
          setIsDisable(false)
          handleNotification('success', `${CONSTANT.MESSAGE().CHECK_SUCCESS}`)
          refreshToken(userId)
        }
      } catch (error) {
        handleNotification('danger', `${CONSTANT.MESSAGE('Check duplication').FAIL}`)
      }
    } else {
      setIsValidQues(false)
    }
  }

  function handleInputQuestion(e: any) {
    setQuestion(e.target.value)
  }

  function handleClear() {
    setIsOpen(true)
  }
  const handleAcceptClear = () => {
    setVisibleResult(false)
    setQuestion('')
    setIsOpen(false)
    setProgress(100)
  }
  const clickAddQuestion = () => {
    axios.get(GET_SUBJECT_URL).then((response) => {
      setSubjects(response.data)
    })
    setOpenDialogAdd(true)
  }
  const handleAcceptAdd = async () => {
    try {
      setProgress(progress + 10)
      setOpenDialogAdd(false)

      await axios.post(ADD_QUESTION_TO_BANK, {
        question,
        subjectId,
      })

      setProgress(100)
      handleNotification('success', `${CONSTANT.MESSAGE().ADD_SUCCESS}`)
    } catch (error) {
      setProgress(100)
      handleNotification('danger', `${CONSTANT.MESSAGE('Add to bank').FAIL}`)
    }
    refreshToken(userId)
  }
  const handleDialogClose = () => {
    setIsOpen(false)
    setOpenDialogAdd(false)
    setIsOpenDialogFormat(false)
    setIsOpenDialogForm(false)
  }
  const handleOpenDialogForm = () => {
    handleReset()
    setIsOpenDialogForm(true)
  }
  const handleOpenDialogFormat = () => {
    setIsOpenDialogFormat(true)
  }
  const handleChange = (event: any) => {
    setSubjectId(Number(event.target.value))
  }

  const formatDialog = (
    <div className={className}>
      <div className="format-container">
        <p className="format-guideline">
          {' '}
          Step 1: Download the sample file
        </p>
        <p className="format-guideline">
          Step 2: Open the sample file and edit it. The content of the bank file is written in the
          form:
          <br /> <li>The first line is "sentence,tag"</li>
          <br /> <li>The next line is question, tag</li>
        </p>
        <p className="format-guideline">
          {' '}
          Step 3: Replace all questions from the second line in the sample file with new questions in
          the question bank
        </p>
        <p className="format-guideline">
          {' '}
          Step 4: Create new subject if it doesn't already exist
        </p>
        <p className="format-guideline">
          {' '}
          Step 5: Upload the edited question bank file
        </p>
        <a href="train.csv" target="blank">
          <Button
            variant="contained"
            color="primary"
            className={classes.btnDup}
            disabled={isDisableAddBank}
          >
            Download sample
          </Button>
        </a>
      </div>
    </div>
  )

  const addQuestion = () => {
    const newList = [...listQuestion]
    newList.push('')
    setListQuestion(newList)
    console.log(listQuestion.length)
  }
  const deleteQuestion = (idx: number) => {
    const newList = [...listQuestion]
    newList.splice(idx, 1)
    setListQuestion(newList)
  }
  const handleQuestionValue = (index: number) => (e: any) => {
    const newList = [...listQuestion]
    newList[index] = e.target.value
    setListQuestion(newList)
  }
  const handleDialogFormAccept = () => {
    const dataCsv = listQuestion.map((e, index) => [`"${e.replaceAll(`"`, `'`)}"`, index])
    dataCsv.unshift(['sentence', 'tag'])

    const csvContent = `data:text/csv;charset=utf-8,${dataCsv.map((e) => e.join(',')).join('\n')}`

    const encodedUri = encodeURI(csvContent)

    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'train.csv')
    document.body.appendChild(link)

    link.click()
  }

  const createBankDiv = (
    <div className={className}>
      {listQuestion.map((ques, index) => (
        <div className="bank-item" key={index}>
          <TextField
            id="outlined-basic"
            value={ques}
            className={classes.inputQB}
            multiline
            maxRows={2}
            onChange={handleQuestionValue(index)}
            label={`Question ${index + 1}`}
            variant="outlined"
            placeholder="Enter question"
          />
          <RemoveCircleIcon
            fontSize="medium"
            color="secondary"
            onClick={() => deleteQuestion(index)}
          />
        </div>
      ))}
      <Chip
        avatar={<AddCircleIcon />}
        label="New question"
        clickable
        color="primary"
        className={classes.chipAddQB}
        onClick={addQuestion}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.btnDup}
        onClick={handleDialogFormAccept}
      >
        Save and download
      </Button>
    </div>
  )
  const formBankDialog = (
    <div className={className}>


      <div className="create-bank">
        <div className="guide-line" style={{ textAlign: 'center' }}>
          <p id="gl-left">
            <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" />
            View the guideline to create a question bank file manually or using the
            Create New Bank function bellow to automatically create it based on our tool.

          </p>
          <div className="chip-group">
            <Chip
              label="View guideline"
              clickable
              color={isGuideline ? "secondary" : "primary"}
              onClick={() => setIsGuideline(true)}
              className={classes.chipView}
              variant="outlined"
            />
            <Chip
              label="Create new bank"
              clickable
              color={!isGuideline ? "secondary" : "primary"}
              onClick={() => setIsGuideline(false)}
              className={classes.chipView}
              variant="outlined"
            />
          </div>
          <div className="toggle-format-option">
            {
              isGuideline
                ? formatDialog
                : createBankDiv
            }
          </div>
        </div>
      </div>
    </div>
  )

  const steps = ['Create New Subject', 'Create Bank File', 'Import Question Bank', 'Finish'];

  const subjectDialogContent = (
    <div className={className}>
      <h4>Select a subject to add a question</h4>
      <Select
        className="select-subject"
        native
        value={subjectId}
        onChange={handleChange}
        input={<Input id="demo-dialog-native" />}
      >
        {subjects.map((sub: Subject, index) => (
          <option key={index} value={sub.id}>
            {sub.subjectName}
          </option>
        ))}
      </Select>
    </div>
  )
  const subjectDialogList = (
    <div className={className}>
      {subjects.map((subject: Subject, index) => (
        <Chip key={index} label={subject.subjectName} className={classes.chipSubject} />
      ))}
    </div>
  )
  const handleOpenListSubject = () => {
    setIsOpenDialogSubject(true)
  }
  const handleCloseListSubject = () => {
    setIsOpenDialogSubject(false)
  }
  const handleSubjectName = (e: any) => {
    setSubjectName(e.target.value)
  }

  const addSubject = async () => {
    const subj = subjects.find((name) => name.subjectName === subjectName)
    if (subj) {
      setIsDuplicateSubject(true)
      setDuplicateSubject('Existing subject ')
    } else {
      setIsDuplicateSubject(false)
      setDuplicateSubject('')
      try {
        const response = await axios.post(`${ADD_SUBJECT_URL}`, {
          subjectName,
        })
        if (response && response.data) {
          handleNotification('success', `${CONSTANT.MESSAGE().ADD_SUCCESS}`)
          axios.get(GET_SUBJECT_URL).then((res) => {
            setSubjects(res.data)
          })
        } else {
          handleNotification('danger', `${CONSTANT.MESSAGE('Create New Subject').FAIL}`)
        }
      } catch {
        handleNotification('danger', `${CONSTANT.MESSAGE('Create New Subject').FAIL}`)
      }
    }
  }
  const handleAddFileBank = async (e: any) => {
    e.preventDefault()
    try {
      setIsDisableAddBank(true)
      setProgress(progress + 10)
      const formData = new FormData()
      formData.append('train', file, file.name)
      formData.append('subject', `${subjectId}`)

      const response = await axios.post(ADD_FILE_DATASET_URL, formData)

      if (response && response.data) {
        setProgress(100)
        setIsDisableAddBank(false)
        handleNotification('success', `${CONSTANT.MESSAGE().TRAIN_SUCCESS}`)
      } else {
        setProgress(100)
        setIsDisableAddBank(false)
        handleNotification('danger', `${CONSTANT.MESSAGE('Upload data').FAIL}`)
      }
      refreshToken(userId)
    } catch (error) {
      handleNotification('danger', `${CONSTANT.MESSAGE('Upload data').FAIL}`)
    }
  }

  const isStepOptional = (step: number) =>
    step === 0 || step === 1;
  ;

  const isStepSkipped = (step: number) =>
    skipped.has(step);
  ;

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setSubjectName('');
    setListQuestion(['']);
    setFileName('');
    setIsGuideline(true)
    setActiveStep(0);
  };

  const addSubjectStep = (
    <div className={className}>
      <div className="add-subject">
        <TextField
          id="outlined"
          error={isDuplicateSubject}
          variant="outlined"
          label="Subject"
          size="small"
          helperText={duplicateSubject}
          value={subjectName}
          onChange={handleSubjectName}
          className={classes.inputSubject}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addSubject}
          className={classes.btnSubject}
          disabled={isDisable}
        >
          Add
        </Button>
        <br />
        <Chip
          label="View Subject"
          clickable
          onClick={handleOpenListSubject}
          className={classes.chipView}
          variant="outlined"
        />
      </div>
    </div>

  )

  const importBankStep = (
    <div className={className}>
      <div className="import-bank">
        <h2 className="select">Import Bank File</h2>
        <div className="input-bank">
          <input type="file" accept=".csv" onChange={handleFileChange} title=" " />
        </div>
        <p className="file-rule">Must be .csv file</p>
        <p className="bank-name">Bank name: {fileName}</p>
        {fileName.includes('.csv') ? (
          <div>
            <div>
              <h4>Select subject </h4>
              <Select
                className="select-subject"
                native
                value={subjectId}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                {subjects.map((sub: Subject, index) => (
                  <option key={index} value={sub.id}>
                    {sub.subjectName}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btnDup}
              onClick={handleAddFileBank}
              disabled={isDisableAddBank}
            >
              Add Bank
            </Button>
          </div>
        ) : (
          ' '
        )}
      </div>
    </div>
  )

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return addSubjectStep;
      case 1:
        return formBankDialog;
      case 2:
        return importBankStep;
      default:
        return '';
    }
  }

  const stepWrapper = (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button
              onClick={handleReset}
              className={classes.button}
              color="primary"
              variant="contained"
            >
              Train another bank file
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="container">
        {role !== 3 ? (
          <div className="control control-left">
            <div className="create-bank">
              <h2 className="select">Train Bank File</h2>
              <p className="gl-bank">
                <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" />
                Train dataset for AI model
              </p>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenDialogForm}
                disabled={isDisable}
              >
                Start train
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="control control-right">
          <h2>Enter your question:</h2>
          <div className="ques-input-box">
            <TextField
              id="outlined-multiline-static"
              multiline
              maxRows={6}
              variant="outlined"
              label="Enter your question"
              value={question}
              onChange={handleInputQuestion}
              error={!isValidQues}
              className={classes.inputQuestion}
            />
            {isValidQues ? (
              ''
            ) : (
              <p className="warning">
                ⚠ The text you entered must be more than 2 words and should be meaningful !
              </p>
            )}
          </div>
          <div className="subject-box">
            <h3>Subject</h3>
            <Select
              native
              value={subjectId}
              onChange={handleChange}
              input={<Input id="demo-dialog-native" />}
            >
              {subjects.map((sub: Subject, index) => (
                <option key={index} value={sub.id}>
                  {sub.subjectName}
                </option>
              ))}
            </Select>
          </div>
          <div className="button-group">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheck}
              className={classes.btnDup}
              disabled={isDisable}
            >
              Check
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              className={classes.btnDup}
            >
              Clear
            </Button>
            <Dialog
              title="Clear all text"
              message="Do you want to clear all the text"
              buttonAccept="Yes"
              buttonCancel="No"
              isOpen={isOpen}
              handleAccept={handleAcceptClear}
              handleClose={handleDialogClose}
            />
            <Dialog
              title="Add question"
              buttonAccept="Add"
              buttonCancel="Cancel"
              content={subjectDialogContent}
              isOpen={openDialogAdd}
              handleAccept={handleAcceptAdd}
              handleClose={handleDialogClose}
            />
            <Dialog
              id="subject"
              title="Subjects"
              buttonCancel="Close"
              content={subjectDialogList}
              isOpen={isOpenDialogSubject}
              handleClose={handleCloseListSubject}
            />
            <Dialog
              title="Format file bank"
              buttonCancel="Close"
              content={formatDialog}
              isOpen={isOpenDialogFormat}
              handleClose={handleDialogClose}
            />
            <Dialog
              title="Creat New Bank"
              buttonCancel="Close"
              content={stepWrapper}
              isOpen={isOpenDialogForm}
              handleAccept={handleDialogFormAccept}
              handleClose={handleDialogClose}
            />

          </div>
          <div className="guide-line">
            <p>
              {' '}
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Enter a
              question and select a subject to check duplication for this question
            </p>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Processing
              will take a couple of time.
            </p>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="duplicate-icon" /> Questions
              should be grammatically correct to get the best results
            </p>
          </div>

          {visibleResult ? (
            <div>
              {result.length > 0 ? <TableCheckDuplicate results={result} /> : ''}

              {isAdd ? (
                <div className="result-contain">
                  <p>
                    No duplicate, able to add this question to bank
                    {/* Button add question to bank */}
                    <Chip
                      label="Add question"
                      clickable
                      icon={<DoneIcon />}
                      onClick={clickAddQuestion}
                      className={classes.chipDone}
                      variant="outlined"
                    />
                  </p>
                </div>
              ) : (
                <p className="duplicated-warning">
                  Detected duplication, do you still want to add this question to the bank ?
                  <Chip
                    label="Add question"
                    clickable
                    icon={<DoneIcon />}
                    onClick={clickAddQuestion}
                    className={classes.chipDone}
                    variant="outlined"
                  />
                </p>
              )}
            </div>
          ) : (
            ' '
          )}
        </div>
      </div>
    </div>
  )
}

const StyleDuplicate = styled(Duplicate)`
  width: 100%;
  height: auto;

  .container {
    margin: 0.5rem;
    padding: 5em 10px 10px 10px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    background-color: #fbfbfb;
    text-align: center;
    /* box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px; */
  }

  .warning {
    color: red;
    margin: 1rem 0.5rem;
    text-align: left;
  }

  .duplicated-warning {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }

  .ques-input-box {
    width: 80%;
    margin: auto;
  }

  .control {
    flex: 1 1 auto;
    margin: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
  .control-left {
    width: 35%;
    height: 100%;
    background-color: #fbfbfb;
  }
  .control-left h2 {
    width: 90%;
    margin: auto;
    font-size: 20px;
    color: #10182f;
    border-bottom: 1px solid #dae1f5;
  }
  .result-contain {
    margin: 2rem;
  }
  .result-contain p {
    color: #1ab93d;
    font-size: 0.9rem;
    text-align: center;
  }
  .import-bank {
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 20px;
    text-align: center;
  }
  .convert-csv {
    display: flex;
    justify-content: center;
    height: auto;
    padding: 1em;
    margin-top: 1em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    text-align: start;
    border-radius: 5px;
  }
  .subject-box {
    margin: 1rem 0rem;
  }
  .csv-link {
    margin-left: 1rem;
  }
  .csv-img {
    width: 150px;
    height: 90px;
    background-image: url('https://image.flaticon.com/icons/png/128/2305/2305855.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .csv-link h3 {
    font-size: 17px;
  }
  .csv-link p {
    color: #545d7a;
    padding: 0.2em;
    margin: 0;
    font-size: 0.9rem;
  }
  .add-subject {
    padding: 2rem;
    text-align: center;
    border: 1px solid lightgray;

  }

  .create-bank {
    margin-top: 0 1em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 1rem 
  }
  .create-bank {
    text-align: center;
  }
  .control-right {
    width: 50%;
    min-height: 500px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .control-right h2 {
    padding: 1rem;
  }
  input::-webkit-file-upload-button {
    padding: 10px 20px;
    background-color: #303f9f;
    border: none;
    font-size: 1rem;
    border-radius: 5px;
    color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: 100ms ease-out;
    font-weight: bold;
    cursor: pointer;
  }
  input::-webkit-file-upload-button:hover {
    background-color: #35367a;
  }
  .input-bank {
    margin: 1rem;
  }
  input[type='file'] {
    font-size: 0px;
  }
  .file-rule {
    color: #8c95ad;
  }
  .bank-name {
    padding: 20px 0;
    color: #10182f;
    font-size: 18px;
    font-weight: 600;
  }
  option {
    font-size: 0.9rem;
  }
  .select {
    color:#000;
    margin-top: 2rem;
    padding: 20px;
  }
  .duplicate-icon {
    color: #303f9f;
    margin: 0 5px;
  }
  .guide-line {
    margin: 1rem;
    text-align: start;
  }
  .guide-line p {
    width: 60%;
    margin: auto;
    line-height: 1.5rem;
    font-size: 0.9rem;
    color: #545d7a;
  }
  .gl-bank {
    font-size: 0.9rem;
    color: #545d7a;
    margin: 1rem;
  }
  #gl-left {
    width: 100%;
    margin: 0;
    padding: 1rem 0;
  }
  .format-container {
    border: 1px solid lightgray;
    margin: 1rem 0;
  }
  .format-guideline {
    font-size: 1rem;
    color: #545d7a;
    margin: 1rem !important;
    text-align: start;
  }
  .format-guideline li {
    margin: 0.4rem 0 0 2rem;
  }
  .button-group {
    width: 50%;
    margin: auto;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bank-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .control-right {
    width: 100%;
    max-width: 100%;
  }
  .result-contain {
    text-align: start;
  }
  .result {
    margin: 40px;
    background-color: #f0f2fb;
  }
  @media screen and (max-width: 600px) {
    .container {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      height: auto;
    }
    .control-left {
      width: 100%;
    }
    .control-right {
      width: 100%;
      max-width: 100%;
    }
    .button-group {
      display: flex;
      flex-direction: column;
    }
    .input-question {
      width: 100%;
    }
    .guide-line p {
      width: 80%;
      margin: 20px 40px;
    }
    .add-subject {
      text-align: center;
    }
  }
  @media screen and (max-width: 1024px) {
    .container {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      height: auto;
    }
    .control-left {
      width: 100%;
    }
    .control-right {
      width: 100%;
      max-width: 100%;
    }
    .add-subject {
      text-align: center;
    }
  }
`
export default StyleDuplicate
