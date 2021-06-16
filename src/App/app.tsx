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
import ManageStaffs from '../screen/manage-staffs'
import { AccountContextProvider } from '../contexts/account-context'

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
      <AccountContextProvider>
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
          <Route exact path="/admin/manage-staffs">
            <ManageStaffs />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </AccountContextProvider>
    </Router>
  )
}

export default App
