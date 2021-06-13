import React from 'react'

// lib
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Header from '../common/header'
import Login from '../screen/login'

function App(props: any) {
  return (
    <Router>
      <Switch>
       <Route exact path="/header">
          <Header />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/check-duplicate">
          <CheckDuplicate />
        </Route>
        <Route exact path="/self-generate">
          <SelfGenerate />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}



export default App
