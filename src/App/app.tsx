import React, { useState } from 'react'

// lib
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Header from '../common/header'
import Profile from '../screen/profile'
import Login from '../screen/login'

function App(props: any) {

  // const [Account, setAccount] = useState<Object>({});
  let Account = {

  }

  function handleTakeAccount(values: any) {
    // setAccount(values)
    // return Account;
    Account = values;
    console.log('value kakak ', Account);
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/header">
          <Header />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/check-duplicate">
          <CheckDuplicate />
        </Route>
        <Route exact path="/self-generate">
          <SelfGenerate />
        </Route>
        <Route exact path="/profile">
          <Profile account={Account} />
        </Route>
        <Route exact path="/login">
          <Login onSubmit={handleTakeAccount} />
        </Route>
      </Switch>
    </Router>
    
  )
}

export default App
