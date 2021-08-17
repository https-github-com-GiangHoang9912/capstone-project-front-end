import styled from 'styled-components'
import React, {useRef } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Link, animateScroll as scroll } from "react-scroll";
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

HomePage.propTypes = {
  className: PropTypes.string,
}
HomePage.defaultProps = {
  className: '',
}

const useStyles = makeStyles((theme) => ({
  root: {},
  btn: {
    color: 'white',
    width: 200,
    height: 200,
    margin: '1rem',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    backgroundSize: "cover",
    transition: 'filter 0.5s ease-in-out',
    '&:hover': {
       filter: 'grayscale(60%)',
      
    },
    '@media (max-width: 780px)' : {
      width: 330,
      height: 330,
      marginTop: '2rem',
    }
    
  },
  btnCheck: {
    backgroundImage: 'url("images/duplicate.png")',
  },
  btnSelf: {
    backgroundImage: 'url("images/self.png")',
  },
  btnExam: {
    backgroundImage: 'url("images/Exam.png")',
  },
  btnScroll: {
    '@media (max-width: 780px)' : {
      width: 100,
      height: 30,
      fontSize: '0.5rem',
      marginTop: '2rem',
    }
  }
  
}))


function HomePage(props: any) {
  const { className } = props
  const classes = useStyles()
  const infos = [
    {
      title: "AI Technology",
      description: "Using machine learning and natural language processing technology in Artifical Intelligence.",
      image: "images/machine.png"
    },
    {
      title: "High Accuracy",
      description: "The accuracy when solving the problem is very high",
      image: "images/accuracy.png"
    },
    {
      title: "Security System",
      description: "All input data is encrypted to ensure the security of information",
      image: "images/security.png"
    },

  ]
  
  return (
    <div className={className}>
      <div className="container">
        <div className="introduction">
          <div className="intro">
          <h1 className="intro-title">DDSQG</h1>
          <h2 className="intro-sub">Duplicate Detection and Self-Generation Question based on answers</h2>
          <Link
                to="main-function"
                spy={true}
                smooth={true}
                offset={-70}
                duration={700}
              ><Button variant="contained" color="secondary" className={classes.btnScroll}>
              Get Started
            </Button></Link>
          </div>
     
        </div>
        <div className="home-title">
        <h2 className="main-ft title-task main-function">Main Features</h2>
        <p>Check duplicate questions, self-generated questions, create and manage your own exam</p>
        </div>
        <div className="function">
          <NavLink to="/check-duplicate" className="link">
            <Button variant="contained" color="primary" className={`${classes.btnCheck} ${classes.btn}`} /> 
          </NavLink>
          <NavLink to="/self-generate" className="link">
            <Button variant="contained" color="primary" className={`${classes.btnSelf} ${classes.btn}`} />
          </NavLink>
          <NavLink to="/exam" className="link">
            <Button variant="contained" color="primary" className={`${classes.btnExam} ${classes.btn}`} />
          </NavLink>
        </div>
        <div className="home-title">
        <h2 className="main-ft title-task">About our system</h2>
        <p>Artifical Intelligence Technology to solve the problem, high accuracy and security</p>
        </div>
        <div className="technology-contain">
        <div className="technology">
           {infos.map(info =>(
            <div className="technology-item">
            <div className="tech-img">
               <img src={info.image} />
            </div>
            <div className="tech-text">
               <h3>{info.title}</h3>
               <p>{info.description}</p>
            </div>
            </div>
           ))}
        </div>
       
        </div>
      </div>
    </div>
  )
}

const HomeStyled = styled(HomePage)`
  width: 100%;
  .container{
    width: 100%;
    background-color: #fff;
  }
  .introduction {
    width: 100%;
    height: 650px;
    background-image: 
      url('images/banner.png');
    background-repeat: no-repeat;
    background-size: cover;
   

  }
  
  .intro{
    text-align: start;
    width: 40%;
    padding: 5rem 0rem 0rem 10rem;
  }
  .intro-title {
    font-size: 4rem;
    font-family: 'Helvetica Neue', sans-serif;
    letter-spacing: 12px;
    color: #fff;
    font-weight: 600;
    padding: 20px 0;
    margin: 0 auto;
  }
  .intro-sub {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 1.2rem;
    color: #fff;
    font-weight: 300;
    line-height: 32px;
    margin: 20px 0 50px 0;
  }
  .home-title{
    text-align: center;
    margin-top: 1rem;
  }

  .main-ft{
    font-size: 30px;
    margin: 4rem 0 0  2rem;
    line-height: 40px;
  }
  
  .link {
    text-decoration: none;
  }
  p {
    font-family: 'Open Sans', sans-serif;
    color: #000;
    padding-left: 5px;
    font-size: 0.9rem;

  }
  .intro-para a {
    color: #16a3f5;
    background: #e2e7fa;
    text-decoration: none;
  }
 
  .function {
    width: 80%;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .technology-contain{
    width: 100%;
    margin: 1rem 0;
    
  }
  .technology{
    width: 80%;
    margin: 0 auto;
    display: flex;
  }
  .technology-item{
    text-align: center;
    margin: 1rem;
    border: 1px solid #e2e7fa;
    width: 30%;
    min-height: 300px;
  }
  .tech-img img{
   margin-top: 1rem;
   width: 50%;
  }
  .tech-text{
   padding: 10px;
   border-radius: 5px;
   background-color: #fff;
  }
  .tech-text h3{
    font-size: 1.1rem;
    margin: 1rem 0 0.2rem 0;
    width: auto;
    padding: 0.5rem;
  }
  @media screen and (max-width: 780px) {
    .function, .technology {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: none;
    }

    .introduction{
      height: 400px;
    }
    .introduction img{
      margin-bottom: 1rem;
    }
    .intro{
      width: 60%;
      padding: 5rem 0rem 0rem 6rem;
      margin: 0;
    }
    .intro-title{
      font-size: 2rem;
    }
    .intro-sub{
      font-size: 1rem;
      margin: 0;
    }
    .technology-item{
      width: 70%
    }
  }
  @media screen and (min-device-width: 781px) and (max-device-width: 1024px) {
     .function, .technology{
       width: 100%;
     }
     .intro{
      width: 60%;
      padding: 5rem 0rem 0rem 10rem;
      margin: 0;
    }
  }
`
export default HomeStyled
