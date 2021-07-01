// lib
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import styled from 'styled-components'

// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Header from '../common/header'
import PersistentDrawerLeft from '../common/drawer'
import Profile from '../screen/profile'
import Login from '../screen/login'
import CreateExam from '../screen/create-exam'
import { AccountContextProvider } from '../contexts/account-context'
import ManageStaffs from '../screen/manage-staffs'
import ViewHistory from '../screen/view-history'
import ChangePassword from '../screen/change-password'
import ForgotPassword from '../screen/forgot-password'
import UpdateExam from '../screen/update-exam'

function App(props: any) {

  return (
    <Router>
      <AccountContextProvider>
        <Header />
        <PersistentDrawerLeft isOpen={true} />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <HomePage />
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
            <Route exact path="/profile" component={Profile} >
              <Profile />
            </Route>
            <Route exact path="/history" component={Profile} >
              <ViewHistory />
            </Route>
            <Route exact path="/changePassword" component={Profile} >
              <ChangePassword />
            </Route>
            <Route exact path="/create-exam" component={Profile} >
              <CreateExam />
            </Route>
            <Route exact path="/update-exam" component={Profile} >
              <UpdateExam />
            </Route>
            <Route exact path="/admin/manage-staffs">
              <ManageStaffs />
            </Route>
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>

      </AccountContextProvider>
    </Router>
  )
}

export default styled(App)`
  
`
