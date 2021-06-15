// lib
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'
// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Header from '../common/header'
import Profile from '../screen/profile'
import Login from '../screen/login'
import { AccountContextProvider } from '../contexts/account-context'

function App(props: any) {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/check-duplicate">
          <CheckDuplicate />
        </Route>
        <Route exact path="/self-generate">
          <SelfGenerate />
        </Route>
        <AccountContextProvider>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/login" component={Login} />
        </AccountContextProvider>
      </Switch>
    </Router>
  )
}

export default App
