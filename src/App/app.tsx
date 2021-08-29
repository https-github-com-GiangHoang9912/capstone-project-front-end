// lib
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useState, useEffect, FC, useContext } from 'react'

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
import { AccountContextProvider, AccountContext } from '../contexts/account-context'
import ManageStaffs from '../screen/manage-staffs'
import ViewHistory from '../screen/view-history'
import ChangePassword from '../screen/change-password'
import UpdateExam from '../screen/update-exam'
import NotFound from '../screen/404-not-found'
import ForgotPassword from '../screen/forgot-password'
import { refreshToken } from '../services/services'

const AuthRequired: FC<{}> = (props) => {
  const { isLoggedIn } = useContext(AccountContext)

  return <Switch>{isLoggedIn ? props.children : <Redirect to="/login" />}</Switch>
}

const App: FC = (props: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false)

  useEffect(() => {
    const id = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : -1
    if (id !== -1) {
      refreshToken(id)
        .then((res) => {
          console.info(res)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.clear()
            handleNotification('danger', `${err.response.status}: Unauthorized`)
          }
        })
    }
  }, [])

  const role = Number(localStorage.getItem('role') ? localStorage.getItem('role') : 3)

  let toggleMenuClass = isMenuOpen ? 'menu-open' : 'menu-close'
  if (isLogin) {
    toggleMenuClass = ''
  }
  const toggleHeaderClass = !isLogin ? 'header-open' : ''
  const mainContent = isLogin || isForgotPassword ? 'main-content' : 'main-content-transition'
  const dispatch = useDispatch()
  const { message, type } = useSelector((state: RootState) => state.notification)

  const handleNotification = (types: 'success' | 'danger' | 'warning', messageString: string) => {
    dispatch(setNotification({ message: messageString, types }))
  }

  return (
    <AccountContextProvider>
      <Router>
        {message && <Notification message={message} types={type} />}
        <Header
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          isForgotPassword={isForgotPassword}
          className={isLogin ? 'hidden-component' : ''}
          setIsLogin={setIsLogin}
          setIsForgotPassword={setIsForgotPassword}
        />
        <PersistentDrawerLeft
          isForgotPassword={isForgotPassword}
          isOpen={isMenuOpen}
          className={isLogin ? 'hidden-component' : ''}
        />
        <div className={`${mainContent} ${toggleMenuClass} ${toggleHeaderClass}`}>
          <Switch>
            <Route exact path="/login" component={Login}>
              <Login setIsLogin={setIsLogin} handleNotification={handleNotification} />
            </Route>
            <Route exact path="/forgot-password" component={ForgotPassword}>
              <ForgotPassword
                setIsForgotPassword={setIsForgotPassword}
                setIsMenuOpen={setIsMenuOpen}
                handleNotification={handleNotification}
              />
            </Route>
          </Switch>
          <AuthRequired>
            <Route exact path="/login" />
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
            <Route exact path="/change-password" component={Profile}>
              <ChangePassword handleNotification={handleNotification} />
            </Route>
            <Route exact path="/exam" component={Profile}>
              <ListExam handleNotification={handleNotification} />
            </Route>
            <Route exact path="/update-exam" component={Profile}>
              <UpdateExam handleNotification={handleNotification} />
            </Route>
            {role === 1 ? (
              <Route exact path="/manage-staffs" component={ManageStaffs}>
                <ManageStaffs handleNotification={handleNotification} />
              </Route>
            ) : (
              ''
            )}
            <Route component={NotFound} />
          </AuthRequired>
        </div>
      </Router>
    </AccountContextProvider>
  )
}

export default styled(App)``
