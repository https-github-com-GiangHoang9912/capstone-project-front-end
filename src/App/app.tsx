// lib
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useState, useEffect, FC } from 'react'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../common/notification'
import { RootState } from '../store'
import { setNotification } from '../store/actions/notifications'

// components
import HomePage from '../screen/home'
import CheckDuplicate from '../screen/check-duplicate'
import SelfGenerate from '../screen/self-generation-question'
import Header from '../common/header'
import PersistentDrawerLeft from '../common/drawer'
import Profile from '../screen/profile'
import Login from '../screen/login'
import ListExam from '../screen/list-exam'
import { AccountContextProvider } from '../contexts/account-context'
import ManageStaffs from '../screen/manage-staffs'
import ViewHistory from '../screen/view-history'
import ChangePassword from '../screen/change-password'
import UpdateExam from '../screen/update-exam'
import NotFound from '../screen/404-not-found'
import { refreshToken } from '../services/services'

const App: FC = (props: any) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem('id')
    const data = {
      response: null,
    }
    refreshToken(data, id ? Number(id) : -1)
      .then(() => {})
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.clear()
          handleNotification('danger', `${err.response.status}: Unauthorized`)
        }
      })
  }, [])

  const role = Number(localStorage.getItem('role') ? localStorage.getItem('role') : 3)

  const toggleMenuClass = isOpen ? 'menu-open' : 'menu-close'
  const toggleHeaderClass = !isLogin ? 'header-open' : ''

  const dispatch = useDispatch()
  const { message, type } = useSelector((state: RootState) => state.notification)

  const handleNotification = (types: 'success' | 'danger' | 'warning', messageString: string) => {
    dispatch(setNotification({ message: messageString, types }))
  }

  return (
    <Router>
      {message && <Notification message={message} types={type} />}
      <AccountContextProvider>
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className={isLogin ? 'hidden-component' : ''}
        />
        <PersistentDrawerLeft isOpen={isOpen} className={isLogin ? 'hidden-component' : ''} />
        <div className={`main-content ${toggleMenuClass} ${toggleHeaderClass}`}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/check-duplicate">
              <CheckDuplicate handleNotification={handleNotification} />
            </Route>
            <Route exact path="/self-generate">
              <SelfGenerate handleNotification={handleNotification} />
            </Route>
            <Route exact path="/profile" component={Profile}>
              <Profile handleNotification={handleNotification} />
            </Route>
            <Route exact path="/history" component={Profile}>
              <ViewHistory />
            </Route>
            <Route exact path="/changePassword" component={Profile}>
              <ChangePassword />
            </Route>
            <Route exact path="/exam" component={Profile}>
              <ListExam />
            </Route>
            <Route exact path="/update-exam" component={Profile}>
              <UpdateExam />
            </Route>
            {role === 1 ? (
              <Route exact path="/manage-staffs" component={ManageStaffs}>
                <ManageStaffs />
              </Route>
            ) : (
              ''
            )}
            <Route exact path="/login" component={Login}>
              <Login setIsLogin={setIsLogin} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </AccountContextProvider>
    </Router>
  )
}

export default styled(App)``
