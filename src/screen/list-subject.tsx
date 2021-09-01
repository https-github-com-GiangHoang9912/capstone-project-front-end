import styled from 'styled-components'
import { useEffect, useState, useContext, useCallback } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import Dialog from '../common/dialog'
import * as CONSTANT from '../const'
import { AccountContext } from '../contexts/account-context'
import { refreshToken } from '../services/services'

import Table from '../common/tableReact'

interface Subject {
  id: number
  subjectName: String
}

ListSubject.propTypes = {
  className: PropTypes.string,
}

ListSubject.defaultProps = {
  className: '',
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      height: 'auto',
    },
  },
  paper: {},
  containerCreate: {},
  titleCreate: {},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  nameExam: {
    display: 'flex',
    flexDirection: 'column',
  },
  txtNameExam: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '350px',
    height: '80px',
    marginLeft: '17px',
  },
  formCreate: {},
  bank: {},
  titleView: {},
  showAnswer: {
    marginLeft: '1.5rem',
    color: '#2f6473',
  },
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '100vh',
  },
  dialogCreateExam: {
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '60vh',
  },
  inputSubject: {
    width: 300,
    height: 20,
    marginBottom: '2rem',
  },
}))

const GET_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject`
const GET_SUBJECT_BY_NAME_URL = `${CONSTANT.BASE_URL}/subject`
const ADD_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject/create`
const EDIT_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject/edit`
const DELETE_SUBJECT_URL = `${CONSTANT.BASE_URL}/subject/delete`

function ListSubject(props: any) {
  const { className, handleNotification } = props
  const classes = useStyles()
  const { accountContextData } = useContext(AccountContext)
  const account = accountContextData
  const [progress, setProgress] = useState(0)
  const [duplicateSubject, setDuplicateSubject] = useState<String>('')
  const [isDuplicateSubject, setIsDuplicateSubject] = useState(false)
  const [isOpenDialogSubject, setIsOpenDialogSubject] = useState(false)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subjectName, setSubjectName] = useState<String>()
  const [textSearch, setTextSearch] = useState<string>('')
  const [currentEditSubject, setCurrentEditSubject] = useState(0)
  const [currentDeleteSubject, setCurrentDeleteSubject] = useState(0)
  const [currentDeleteSubjectName, setCurrentDeleteSubjectName] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  useEffect(() => {
    axios
      .get(`${GET_SUBJECT_URL}`)
      .then((response) => {
        setSubjects(() => response.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const idUser = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : account.id

  const handleClickEdit = (subjectId: number, newSubjectName: string) => {
    setIsOpenDialogSubject(true)
    setSubjectName(newSubjectName)
    setCurrentEditSubject(subjectId)
  }

  const handleDialogClose = () => {
    setIsOpenDialogSubject(false)
    setIsDuplicateSubject(false)
    setCurrentEditSubject(0)
    setSubjectName('')
    setDuplicateSubject('')
    setIsConfirmOpen(false)
    setCurrentDeleteSubject(0)
    setCurrentDeleteSubjectName('')
  }

  const handleDelete = async () => {
    setProgress(progress)
    try {
      const response = await axios.post(`${DELETE_SUBJECT_URL}`, {
        subjectId: currentDeleteSubject,
      })
      if (response && response.data) {
        handleNotification('success', `${CONSTANT.MESSAGE('').DELETE_SUCCESS}`)
        setSubjects(response.data)
      } else {
        handleNotification('danger', `${CONSTANT.MESSAGE('Delete').FAIL}`)
      }
      handleDialogClose()
      setProgress(100)
    } catch (error) {
      handleNotification('danger', `${CONSTANT.MESSAGE('Delete').FAIL}`)
      setProgress(100)
      handleDialogClose()
    }
  }

  const handleSubjectName = (e: any) => {
    setSubjectName(e.target.value)
  }

  const onTextSearchChange = useCallback(async (e) => {
    setTextSearch(e.target.value)
    if (e.target.value.trim().length === 0) {
      await axios
        .get(`${GET_SUBJECT_URL}`)
        .then((response) => {
          setSubjects(response.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [])

  const handleOpenConfirm = (subjectId: number, subjectNameDelete: string) => {
    setIsConfirmOpen(true)
    setCurrentDeleteSubject(subjectId)
    setCurrentDeleteSubjectName(subjectNameDelete)
  }

  const columns = [
    {
      Header: 'Subject Name',
      accessor: 'subjectName',
    },
    {
      Header: 'Update',
      Cell: (cell: any) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            className="style-btn"
            id={cell.row.original.id}
            onClick={() => handleClickEdit(cell.row.original.id, cell.row.original.subjectName)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="style-btn"
            id={cell.row.original.id}
            onClick={() => {
              handleOpenConfirm(cell.row.original.id, cell.row.original.subjectName)
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  async function getSubjectByName(name: string) {
    try {
      const response = await axios.get(`${GET_SUBJECT_BY_NAME_URL}/search/${name}`)
      if (response && response.data.length > 0) {
        setSubjects(response.data)
      } else {
        handleNotification('warning', `${CONSTANT.MESSAGE('').SEARCH_NOT_FOUND}'${textSearch}'`)
      }
      refreshToken(idUser)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddSubject = async () => {
    const subj = subjects.find((name) => name.subjectName === subjectName)
    if (!subjectName) {
      setIsDuplicateSubject(true)
      setDuplicateSubject(`subject name can't blank`)
    } else if (subj) {
      setIsDuplicateSubject(true)
      setDuplicateSubject('Existing subject ')
    } else {
      setIsDuplicateSubject(false)
      setDuplicateSubject('')
      setProgress(progress + 10)
      try {
        let response = null
        if (currentEditSubject !== 0) {
          response = await axios.post(`${EDIT_SUBJECT_URL}`, {
            subjectName,
            subjectId: currentEditSubject,
          })
        } else {
          response = await axios.post(`${ADD_SUBJECT_URL}`, {
            subjectName,
          })
        }

        if (response && response.data) {
          handleNotification('success', `${CONSTANT.MESSAGE().ADD_SUCCESS}`)
          await axios.get(GET_SUBJECT_URL).then((res) => {
            setSubjects(res.data)
          })
          handleDialogClose()
        } else {
          handleNotification('danger', `${CONSTANT.MESSAGE('Create New Subject').FAIL}`)
          handleDialogClose()
        }
        setSubjectName('')
        setCurrentEditSubject(0)
        setProgress(100)
      } catch {
        handleNotification('danger', `${CONSTANT.MESSAGE('Create New Subject').FAIL}`)
        handleDialogClose()
        setCurrentEditSubject(0)
        setProgress(100)
      }
    }
  }

  const subjectContent = (
    <div className={className}>
      <div className="add-subject">
        <div className="subject-name">Subject Name:</div>
        <TextField
          id="outlined"
          error={isDuplicateSubject}
          variant="outlined"
          size="medium"
          helperText={duplicateSubject}
          value={subjectName}
          onChange={handleSubjectName}
          className={classes.inputSubject}
        />
      </div>
    </div>
  )

  return (
    <div className={className}>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="limiter">
        <div className="container">
          <div className="main">
            <div className="search-exam">
              <div>
                <TextField
                  className="search-exam--txt"
                  id="outlined-search"
                  label="Search by title subject"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={textSearch}
                  onChange={onTextSearchChange}
                />
                <Button
                  size="small"
                  className="btn-search"
                  variant="contained"
                  disabled={!textSearch}
                  onClick={() => getSubjectByName(textSearch)}
                  color="primary"
                >
                  {' '}
                  Search{' '}
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setIsOpenDialogSubject(true)
                  }}
                  className="btn-search"
                  variant="contained"
                  color="primary"
                >
                  {' '}
                  Create Subject{' '}
                </Button>
              </div>
            </div>
            <div className="tbl-exams">
              <Table columns={columns} data={subjects} isPagination={true} />
            </div>
            <Dialog
              title={currentEditSubject === 0 ? 'Add Subject' : 'Update Subject'}
              buttonCancel="Close"
              buttonAccept={currentEditSubject === 0 ? 'Add' : 'Edit'}
              content={subjectContent}
              isOpen={isOpenDialogSubject}
              handleClose={handleDialogClose}
              handleAccept={handleAddSubject}
            />
            <Dialog
              id="subject"
              title="Delete"
              warn={true}
              buttonCancel="No"
              buttonAccept="Yes"
              message={`Do you want to delete ${currentDeleteSubjectName} ?`}
              isOpen={isConfirmOpen}
              handleClose={handleDialogClose}
              handleAccept={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
const StyleListExam = styled(ListSubject)`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    font-family: sans-serif;
  }

  .limiter {
    width: 100%;
    margin: 0 auto;
  }
  .container {
    width: 100%;
    /* min-height: 100vh; */
    overflow: auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }
  .main {
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow: auto;
    align-items: center;
    padding: 5px 10px;
    width: 90%;
    min-width: 600px;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    flex-direction: column;
  }
  .subject-name {
    height: 20px;
    margin: auto;
    margin-right: 10px;
  }
  //** icon create */
  .note-icon {
    color: #303f9f;
    margin: 0 5px;
  }
  .txt-nam__exam {
    margin-top: 1rem;
  }
  .tbl-exams {
    width: 90%;
  }
  .tiltle-delete {
    color: red;
  }
  .show-page {
    width: 100%;
    height: 100%;
  }
  .style-btn {
    width: 75;
    height: 40;
    cursor: pointer;
    margin-right: 1rem;
    margin-bottom: 5px;
    font-size: 1;
  }
  .detail-exam {
    margin-left: 0.3rem;
  }
  .detail-exam:hover {
    cursor: pointer;
    color: #5e6bd3;
  }
  //** icon prev next/
  .border-icon {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    outline: none;
    font-size: 10px;
    background-color: #ffffff;
    border: 1px solid #bad4f0;
  }
  .border-icon:hover {
    background-color: #e0e0e079;
    cursor: pointer;
  }
  .prev-next {
    font-size: 13px;
    margin: auto;
  }

  //* container paging /
  .pagination-area {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
  }

  .add-subject {
    display: flex;
    padding: 4rem;
    text-align: center;
    border: 1px solid lightgray;
  }

  //** button paging/
  .btn {
    outline: none;
    background-color: #ffffff;
    border: 1px solid #bad4f0;
    font-size: 10px;
    font-weight: bold;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 3px;
  }
  .btn:hover {
    cursor: pointer;
  }
  .active {
    background-color: rgb(229, 231, 245) !important;
    color: #5e6bd3;
  }
  .pagination-area button:hover:not(.active) {
    background-color: #e0e0e079;
    cursor: pointer;
  }

  //* are search exam/
  .search-exam {
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  .btn-search {
    width: 130px;
    height: 40px;
    margin-left: 0.5rem;
    font-size: 0.7rem;
  }
  /* Hide scrollbar for IE, Edge add Firefox */
  .scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
`
export default StyleListExam
