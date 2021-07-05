import styled from 'styled-components'
import { Pagination } from '@material-ui/lab';
import { Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash';
import { TableViewExam } from '../common/table'


ViewExam.propTypes = {
  className: PropTypes.string,
};

ViewExam.defaultProps = {
  className: '',
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
    },
  },

}));

function ViewExam(props: any) {
  const { className } = props;
  const classes = useStyles();
  const result = [
    {
      id: 1,
      name: 'SSC101 Chapter 123',
    },
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
  ]
  const [textInput, setTextInput] = useState<string>('');
  const [paginated, setPaginated] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(5);


  const totalPage = Math.ceil(result.length / pageSize);
  // if (totalPage === 1) return null;
  const pages = _.range(1, totalPage + 1);




  useEffect(() => {
    setPaginated(result.slice(0, pageSize));
  }, []);

  const pagination = (pageNo: number) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    console.log('index start', startIndex);
    const paginatedPost = result.slice(startIndex, pageSize * pageNo);

    console.log('current', pageNo);
    console.log('post', paginatedPost);

    setPaginated(paginatedPost);
    console.log(paginated);
  }

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  return (
    <div className={className}>
      <div className={classes.root}>
        <div className="search-exam">
          <TextField
            className="search-exam--txt"
            id="outlined-search"
            label="Search by title exam"
            type="search"
            variant="outlined"
            value={textInput}
            onChange={onTextInputChange} />
          <Button
            className="btn-search"
            variant="contained"
            disabled={!textInput}
            color="primary"> Search </Button>
        </div>
        <TableViewExam results={paginated} />
        <ul className="pagination">
          <li className="page-link"><FontAwesomeIcon icon={faChevronLeft} /></li>
          {
            pages.map((page, index) => (
              <li
                className={
                  page === currentPage ? "page-link active" : "page-link"
                }
                key={index}
              >
                <button
                  className="btn"
                  onClick={() => pagination(page)}
                >
                  {page}
                </button>
              </li>
            ))
          }
          <li className="page-link"><FontAwesomeIcon icon={faChevronRight} /></li>
        </ul>
      </div>
    </div>
  );
}
const StyleViewExam = styled(ViewExam)`
box-sizing: border-box;

.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}
.show-page {
  width: 100%;
  height: 100%;
}
.btn {
  border: none;
  outline: none;
  background-color: #ddd;
}
.page-link{
  border: 1px solid red;
  padding: 5px 12px;
  border: 1px solid #ddd;
  transition: background-color .3s;
  list-style: none;
  font-size: 1.4rem;
  align-items: center;

}
.pagination li:hover:not(.active) {
  background-color: #ddd;
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  display: inline-block;
  display: flex;
  justify-content: center;
}
.search-exam {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}
.btn-search {
  width: 120px;
  height: 50px;
  margin-left: 10px;
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
export default StyleViewExam;