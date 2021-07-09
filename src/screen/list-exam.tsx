import styled from 'styled-components'
import * as React from "react";

import { useCallback, useEffect, useState } from 'react';
// import { Pagination } from '@material-ui/lab';
import { Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
// import {  } from 'react';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom'
import Table from '../common/tableReact'
import Dialog from '../common/dialog'


// import { TableViewExam } from '../common/table';

interface IExam {
  id: number,
  name: string
}

ListExam.propTypes = {
  className: PropTypes.string,
};

ListExam.defaultProps = {
  className: '',
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      height: 'auto'
    },
  },

}));

function ListExam(props: any) {
  const { className } = props;
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  function handleDelete() {
    setIsOpen(true)
  }
  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const handleAccept = () => {
    history.push('/update-exam')
  }


  const [result, setResult] = useState<IExam[]>([
    {
      id: 1,
      name: 'SSC101 Chapter 123',
    }
    ,
    {
      id: 2,
      name: 'MEA201 Chapter 789',
    },
    {
      id: 3,
      name: 'MAD102 Chapter 456',
    },
    {
      id: 4,
      name: 'HCM201 Chapter 1234',
    },
    {
      id: 5,
      name: 'VNR205 Chapter 10',
    }, {
      id: 6,
      name: 'SSC101 Chapter 123',
    },
    {
      id: 7,
      name: 'MEA201 Chapter 789',
    },
    {
      id: 8,
      name: 'MAD102 Chapter 456',
    },
    {
      id: 9,
      name: 'HCM201 Chapter 1234',
    },
    {
      id: 10,
      name: 'VNR205 Chapter 10',
    }, {
      id: 11,
      name: 'SSC101 Chapter 123',
    },
    {
      id: 12,
      name: 'MEA201 Chapter 789',
    },
    {
      id: 13,
      name: 'MAD102 Chapter 456',
    },
    {
      id: 14,
      name: 'HCM201 Chapter 1234',
    },
    {
      id: 15,
      name: 'VNR205 Chapter 10',
    }, {
      id: 16,
      name: 'SSC101 Chapter 123',
    },
    {
      id: 17,
      name: 'MEA201 Chapter 789',
    },
    {
      id: 18,
      name: 'MAD102 Chapter 456',
    },
    {
      id: 19,
      name: 'HCM201 Chapter 1234',
    },
    {
      id: 20,
      name: 'VNR205 Chapter 10',
    }
  ])

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Exam Name",
      accessor: "name",
    },
    {
      Header: "View",
      Cell: (cell: any) => (
        <FontAwesomeIcon className='detail-exam' icon={faEye} />
      )
    },
    {
      Header: "Update",
      Cell: (row: any) =>
      (
        <div>
          <Button
            variant="contained"
            color="primary"
            className='style-btn'
            onClick={handleAccept}
          >Edit</Button>
          <Button
            variant="contained"
            color="secondary"
            className='style-btn'>Delete</Button>
        </div>
      )
    },
  ]
  const [textInput, setTextInput] = useState<string>('');
  const handleSearchExam = function (content: string) {
    return result.filter(item => item.name.includes(content.trim()));
  }
  console.log('search neeee', handleSearchExam('SSC101'));


  // useEffect(() => {
  //   setPaginated(result.slice(0, pageSize));
  // }, []);
  // const showPages = _.range(1, pages);
  // const childResult = Array<IExam[]>([]);
  // console.log(childResult)
  // const pagination = (pageNo: number) => {
  //   setCurrentPage(pageNo);
  //   const startIndex = (pageNo - 1) * pageSize;
  //   console.log('index start', startIndex);
  //   const paginatedPost = result.slice(startIndex, pageSize * pageNo);
  //   console.log('current', pageNo);
  //   console.log('post', paginatedPost);
  //   setPaginated(paginatedPost);
  //   console.log(paginated);
  // }

  // const nextPagination = (pageNo: number) => {
  //   console.log('current', pageNo);
  //   const newCurrentPage = pageNo + 1;
  //   setCurrentPage(newCurrentPage);
  //   console.log('new current', newCurrentPage);
  //   const startIndex = (newCurrentPage - 1) * pageSize;
  //   console.log('start Index', startIndex);
  //   const paginatedPost = result.slice(startIndex, pageSize * newCurrentPage);
  //   setPaginated(paginatedPost);
  //   console.log(paginated);
  // }

  // const prevPagination = (pageNo: number) => {
  //   console.log('current', pageNo);
  //   const newCurrentPage = pageNo - 1;
  //   setCurrentPage(newCurrentPage);
  //   console.log('new current', newCurrentPage);
  //   const startIndex = (newCurrentPage - 1) * pageSize;
  //   console.log('start Index', startIndex);
  //   const paginatedPost = result.slice(startIndex, pageSize * newCurrentPage);
  //   setPaginated(paginatedPost);
  //   console.log(paginated);
  // }
  // const [paginated, setPaginated] = useState<any>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageSize, setPageSize] = useState(5);
  // let pages = 1;

  // const totalPage = Math.ceil(result.length / pageSize);
  // pages = result.length && pageSize === 0 ? totalPage : totalPage + 1;
  // const showPages = Array<number>();
  // for (let i = 1; i < pages; i++) {
  //   showPages.push(i);
  // }

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);



  return (
    <div className={className}>
      <div className="limiter">
        <div className="container">
          <div className="main">
            <div className="search-exam">
              <TextField
                className="search-exam--txt"
                id="outlined-search"
                label="Search by title exam"
                type="search"
                variant="outlined"
                size="small"
                value={textInput}
                onChange={onTextInputChange} />
              <Button
                size="small"
                className="btn-search"
                variant="contained"
                disabled={!textInput}
                color="primary"> Search </Button>
              <Button
                size="small"
                className="btn-search"
                variant="contained"
                color="primary"> Create Exam </Button>
            </div>
            <div className="tbl-exams">
              <Table columns={columns} data={result} isPagination={true} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
const StyleListExam = styled(ListExam)`
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
  min-height: 100vh;
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
  border-radius: 10px;
  overflow: auto;
  align-items: center;
  padding: 10px;
  width: 70%;
  min-width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.tbl-exams {
  width: 70%;
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
  border-radius:50%;
  outline: none;
  font-size: 10px;
  background-color: #FFFFFF;
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

//** button paging/
.btn {
  outline: none;
  background-color: #FFFFFF;
  border: 1px solid #bad4f0;
  font-size: 10px;
  font-weight: bold;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius:50%;
  margin: 0 3px;
}
.btn:hover {
  cursor: pointer;
}
.active {
  background-color: rgb(229,231,245) !important;
  color: #5e6bd3;
}
.pagination-area button:hover:not(.active) {
  background-color: #e0e0e079;
  cursor: pointer;
}

//* are search exam/
.search-exam {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 2%;
}
.btn-search {
  width: 120px;
  height: 40px;
  margin-left: 10px;
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
export default StyleListExam;