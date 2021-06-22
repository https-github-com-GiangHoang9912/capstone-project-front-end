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
import CreateExam from '../screen/create-exam'
import { AccountContextProvider } from '../contexts/account-context'
import ManageStaffs from '../screen/manage-staffs'
import ViewHistory from '../screen/view-history'
import ChangePassword from '../screen/change-password'

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
      <AccountContextProvider>
        <Switch>
          <Route exact path="/">
            <Header />
            <HomePage />
          </Route>
          <Route exact path="/home">
            <Header />
            <HomePage />
          </Route>
          <Route exact path="/check-duplicate">
            <Header />
            <CheckDuplicate />
          </Route>
          <Route exact path="/self-generate">
            <Header />
            <SelfGenerate />
          </Route>
          <Route exact path="/profile" component={Profile} >
            <Header />
            <Profile />
          </Route>
          <Route exact path="/history" component={Profile} >
            <Header />
            <ViewHistory />
          </Route>
          <Route exact path="/changePassword" component={Profile} >
            <ChangePassword />
          </Route>
          <Route exact path="/admin/manage-staffs">
            <Header />
            <ManageStaffs />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-exam">
            <Header />
            <CreateExam />
          </Route>
        </Switch>
      </AccountContextProvider>
    </Router>

  )
}

export default App
