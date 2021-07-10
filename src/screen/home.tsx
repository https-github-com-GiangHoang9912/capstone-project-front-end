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
  btnDuplicate: {
    color: 'white',
    width: 250,
    height: 48,
    padding: '0 30px',
    fontSize: '0.8rem',
    margin: '1rem 1rem',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
  btnSelf: {
    color: 'white',
    width: 250,
    height: 48,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    fontSize: '0.8rem',
    margin: '1rem 1rem',
    background: '#030a45',
  },
}))
function HomePage(props: any) {
  const { className } = props
  const classes = useStyles()
  return (
    <div className={className}>
      <div className="container">
        <div className="introduction">
          <h1 className="intro-title">DDSQG</h1>
          <h2 className="intro-sub">Duplicate Detection and Self-Generation Question</h2>
          <p className="intro-para">
            An application used to duplicate detection and self-generation of questions based on
            answers in <a>the final exam question bank (FE)</a> using{' '}
            <a>artificial intelligence (AI) </a> technology in{' '}
            <a>natural language processing (NLP)</a>
          </p>
        </div>
        <div className="function">
          <NavLink to="/check-duplicate" className="link">
            <Button variant="contained" color="primary" className={classes.btnDuplicate}>
              Duplicate Detection
            </Button>
          </NavLink>
          <NavLink to="/self-generate" className="link">
            <Button variant="contained" color="primary" className={classes.btnSelf}>
              Self-Generation Question
            </Button>
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
    width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
      url('https://vcdn-vnexpress.vnecdn.net/2020/03/22/b-JPG-4063-1584888577.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: grayscale(20%);
    padding: 5em 0;
  }
  .introduction {
    margin-top: 4rem;
  }
  .intro-title {
    font-size: 48px;
    font-family: 'Helvetica Neue', sans-serif;
    letter-spacing: 12px;
    color: #fff;
    font-weight: 600;
    padding: 20px;
    width: 40%;
    margin: 0 auto;
    border-bottom: solid 2px rgba(255, 255, 255, 0.5);
  }
  .intro-sub {
    font-family: 'Open Sans', sans-serif;
    font-size: 30px;
    color: #fff;
    font-weight: 300;
    line-height: 32px;
    margin: 20px 0 50px 0;
  }
  .intro-para {
    color: #fff;
    width: 50%;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    line-height: 32px;
    margin: auto;
  }
  .link {
    text-decoration: none;
  }
  p {
    font-family: 'Open Sans', sans-serif;
    color: #f8f9fa;
  }
  .intro-para a {
    color: #16a3f5;
    background: #e2e7fa;
    text-decoration: none;
  }
  .function {
    width: 40%;
    margin: auto;
    padding: 60px 0;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 1024px) {
    .function {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`
export default HomeStyled
