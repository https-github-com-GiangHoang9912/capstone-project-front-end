import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
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
    width: 500,
    height: 248,
    marginTop: '1rem',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    backgroundSize: "cover",
    transition: 'filter 0.5s ease-in-out',
    '&:hover': {
       filter: 'grayscale(60%)',
      
    },
    
  },
  btnCheck: {
    backgroundImage: 'url("images/duplicate.png")',
  },
  btnSelf: {
    backgroundImage: 'url("images/Self-Generated Questions.png")',
  },
  btnExam: {
    width: 1024,
    height: 300,
    backgroundImage: 'url("images/Exam.png")',
    '@media (max-width: 780px)' : {
      width: 500,
      height: 248,
      backgroundImage: 'url("images/Exam-res.png")',
    }
  },
  
}))
function HomePage(props: any) {
  const { className } = props
  const classes = useStyles()
  return (
    <div className={className}>
      <div className="container">
        <div className="introduction">
          <div className="intro">
          <h1 className="intro-title">DDSQG</h1>
          <h2 className="intro-sub">Duplicate Detection and Self-Generation Question based on answers</h2>
          <img src="/images/ai.png" alt="ai" />
          </div>
        </div>
        <h2 className="main-ft title-task">Main Features</h2>
        <div className="function-contain">
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
        </div>
        <h2 className="main-ft title-task">Technology</h2>
        <div className="technology-contain">
        <div className="technology">
            <div className="tech-img">
               <img src="https://t4.ftcdn.net/jpg/04/11/50/99/240_F_411509944_NHQwlYfg1td6fBQyyHLdlfltmlv8cmAp.jpg" />
            </div>
            <div className="tech-text">
               <h3>Natural language processing (NLP)</h3>
               <p>NLP focuses on the interactions between human and computer natural language. 
                 NLP has the ability to automate support, 
                 enhance user experience, and analyze and respond</p>
            </div>
        </div>
        <div className="technology reverse">
            <div className="tech-img">
               <img src="https://www.techiexpert.com/wp-content/uploads/2020/06/Machine-Learning-in-Mobile-App-360x180.jpeg" />
            </div>
            <div className="tech-text">
               <h3>Machine Learning</h3>
               <p>Machine learning is a branch of artificial intelligence (AI) and
                 computer science which focuses on the use of data and algorithms to imitate the way that humans learn,
                  gradually improving its accuracy.</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

const HomeStyled = styled(HomePage)`
  width: 100%;
  height: 100vh;
  .container {
    width: 100%;
    min-height: 100vh;
    padding: 4em 0;
    background-color: #fff;
  }
  .introduction {
    width: 100%;
    height: 100vh;
    background-image: 
      url('images/banner.png');
    background-repeat: no-repeat;
    background-size: contain;
    /* background: linear-gradient(to right, #0072ff, #00c6ff);  */

  }
  .intro{
    text-align: start;
    width: 50%;
    padding: 5rem 0rem 0rem 8rem;
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
  .main-ft{
    font-size: 30px;
    text-align: start;
    margin: 4rem 0 3rem 2rem;
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
  .function-contain{
    width: 100%;
  }
  .function {
    width: 1040px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .technology-contain{
    width: 100%;
    
  }
  .technology{
    width: 1040px;
    margin: 0 auto;
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .reverse{
    display: flex;
    flex-direction: row-reverse;
    
  }
  .tech-img{
    width: 50%;
  }
  .tech-img img{
   width: 100%;
   filter: brightness(1.6)
  }
  .tech-text{
   width: 50%;
   padding: 15px;
   background-color: #fff;
  }
  .tech-text h3{
    font-size: 1.1rem;
    margin: 2rem 0;
    width: auto;
    padding: 0.5rem;
    background-color: #5691c8;
  }
  @media screen and (max-width: 780px) {
    .function, .technology {
      width: 780px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: none;
    }
    
  }
`
export default HomeStyled
