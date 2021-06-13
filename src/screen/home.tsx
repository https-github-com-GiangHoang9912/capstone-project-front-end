// import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
// import Constant from "../const.json";
// import axios from "axios";

HomePage.propTypes = {
  className: PropTypes.string,
}
HomePage.defaultProps = {
  className: '',
}

function HomePage(props: any) {
  const { className } = props

  return (
    <div className={className}>
      <div className="container">
        <h1 className="intro-title">DDSQG</h1>
        <h2 className="intro-sub">Duplicate Detection and Self-Generation Question</h2>
        <img src="./duplicate.jpg" />
        <p className="intro-para">
          An application used to duplicate detection and self-generation of questions based on
          answers in <a>the final exam question bank (FE)</a> using{' '}
          <a>artificial intelligence (AI) </a> technology in{' '}
          <a>natural language processing (NLP)</a>
        </p>

        <div className="function">
          <NavLink to="/check-duplicate">
            <button className="btn btn-dup">Duplicate dectection</button>
          </NavLink>
          <NavLink to="/self-generate">
            <button className="btn btn-self">Self-Generation Question</button>
          </NavLink>
        </div>
        <p>Version 1.0.0</p>
      </div>
    </div>
  )
}

const HomeStyled = styled(HomePage)`
  width: 100%;
  height: 100vh;
  text-align: center;
  .container {
    background: linear-gradient(#141e30, #243b55);
    padding: 20px 0;
  }
  .intro-title {
    font-size: 48px;
    font-family: 'Helvetica Neue', sans-serif;
    letter-spacing: 12px;
    color: #fff;
    font-weight: 600;
    padding: 20px;
  }
  .intro-sub {
    font-family: 'Open Sans', sans-serif;
    font-size: 30px;
    color: #fff;
    font-weight: 300;
    line-height: 32px;
    margin: 0 0 32px;
  }
  .intro-para {
    color: #fff;
    width: 50%;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    line-height: 32px;
    margin: auto;
  }
  img {
    width: 50%;
  }
  p {
    font-family: 'Open Sans', sans-serif;
    color: #f8f9fa;
  }
  .intro-para a {
    color: #abc4ff;
    background: #545d7a;
    text-decoration: none;
  }
  .function {
    width: 40%;
    margin: auto;
    padding: 20px;
    display: flex;
    justify-content: space-around;
  }
  .btn {
    margin-top: 20px;
    height: 50px;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    padding: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
  .btn-dup {
    width: 200px;
    background-color: #0d1422;
  }
  .btn-dup:hover {
    background-color: #141e30;
  }
  .btn-self {
    width: 250px;
    background-color: #1b7bd2;
  }
  .btn-self:hover {
    background-color: #2b63cc;
  }

  @media screen and (max-width: 780px) {
    .function {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`
export default HomeStyled
