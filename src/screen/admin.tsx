import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '@material-ui/core';

import styled from 'styled-components';

Admin.propTypes = {
  className: PropTypes.string,
}

Admin.defaultProps = {
  className: ''
}
function Admin(props: any) {
  const { className } = props;
  const [checked, setChecked] = useState(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={className}>
      <div className="limiter">
        <div className="container">
          <div className="main">
            <div className="search">
              <input type="text" className="value-search" placeholder="Search to add available staff..." />
              <span className="icon-search">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <div className="text-box">
                <a href="#" className="btn btn-white btn-animate">Cancel</a>
              </div>
            </div>
            <hr className="display" />
            <div className="add-delete">
              <div className="content-all">
                <div className="checkbox">
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </div>
                <span>Select All</span>
                <div className="profile">
                  <span>Profile</span>
                </div>
                <div className="iconTrash">
                  <span className="icon-pass">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </div>
              <div className="content-detail">
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <div className="img-show">
                  <img src='avatar2.png' alt="IMG" />
                </div>
                <div className="profile">
                  <span>@fe.edu.vn</span>
                </div>
                <span className="icon-pass">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledAdmin = styled(Admin)`
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

input {
  outline: none;
  border: none;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}
.container {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #9053c7;
  background: -webkit-linear-gradient(-135deg, #50c8c2f8, #e24c4c);
  background: -o-linear-gradient(-135deg, #50c8c2f8, #e24c9f);
  background: -moz-linear-gradient(-135deg, #50c8c2f8, #e24c9f);
  background: linear-gradient(-135deg, #50c8c2f8, #e24c9f);
}
.main {
  width: 960px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  align-items: center;
  /* padding: 120px 130px 102px 95px; */
  padding-top: 10px;
}

/** css for area contain search */
.search {
  position: relative;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  margin-left: 220px;
  background: #cecdcd;
  padding: 10px;
  width: 500px;
  /* margin-top: 20px; */
  /* justify-content: ; */
}
.value-search {
  width: 350px;
  font-family: sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;
  display: block;
  background: #fff;
  height: 50px;
  border-radius: 10px;
  padding: 0 30px 0 30px;
  cursor: pointer;
  padding: 0 30px 0 65px;
  cursor: pointer;
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
}
/** icon search */
.icon-search {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  padding-left: 35px;
}
.fa-search:hover {
  color: rgb(20, 235, 20);
  cursor: pointer;
}
a {
  text-decoration: none;
}
.btn-white {
  margin-left: 10px;
}

/** css button */
.text-box {
  margin-left: 25px;
  width: 90px;
  height: 45px;
  background: rgb(81, 207, 230);
  align-items: center;
  display: flex;
  border-radius: 5px;
  padding-left: 10px;
}
.text-box a {
  color: #fff;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.text-box a:hover {
  color: red;
}

/** kẻ ngang **/
.display {
  width: 45%;
  align-items: center;
  margin-top: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.content-all {
  display: flex;
  margin-top: 70px;
  align-items: center;
  justify-content: space-around;
}
.content-detail {
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: space-around;
}
img {
  width: 50px;
  height: 50px;
}

.checkbox {
  display: flex;
  flex-direction: column;
}
`
export default StyledAdmin;