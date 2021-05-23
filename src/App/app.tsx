import React from 'react'

// lib
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Header from '../common/header'

function App(props: any) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/check-duplicate">
          <CheckDuplicate />
        </Route>
        <Route exact path="/self-generate">
          <SelfGenerate />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
