import React from 'react'

// lib
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Login from "../screen/login"
import ForgotPassword from '../screen/forgot-password'
import Header from '../common/header'
import Admin from '../screen/admin'

function App(props: any) {
  return (
    <Router>
      <Switch>
        {/* <ForgotPassword /> */}
        {/* <Login /> */}
        <Admin />
      </Switch>
    </Router>
  )
}

export default App
