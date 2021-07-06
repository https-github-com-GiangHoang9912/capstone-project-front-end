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
import ListExam from '../screen/list-exam'


function App(props: any) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const toggleClass = isOpen ? 'menu-open' : 'menu-close'
  return (
    <Router>
      <AccountContextProvider>
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className={isLogin ? 'hidden-component' : ''}
        />
        <PersistentDrawerLeft
          isOpen={isOpen}
          className={isLogin ? 'hidden-component' : ''}
        />
        <div className={`main-content ${toggleClass}`}>
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
            <Route exact path="/change-password" component={Profile} >
              <ChangePassword />
            </Route>
            <Route exact path="/forgot-password" component={Profile} >
              <ForgotPassword />
            </Route>
            <Route exact path="/create-exam" component={Profile} >
              <CreateExam />
            </Route>
            <Route exact path="/update-exam" component={Profile} >
              <UpdateExam />
            </Route>
            <Route exact path="/list-exam" component={Profile} >
              <ListExam />
            </Route>
            <Route exact path="/admin/manage-staffs">
              <ManageStaffs />
            </Route>
            <Route exact path="/login" component={Login}>
              <Login setIsLogin={setIsLogin} />
            </Route>
          </Switch>
        </div>
      </AccountContextProvider>
    </Router>
  )
}

export default styled(App)`

`
