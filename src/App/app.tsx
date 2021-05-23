import React from 'react';

// lib
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
 
// components
import HomePage from "../screen/home";
import CheckDuplicate from '../screen/check-duplicate';
import SelfGenerate from '../screen/self-generation-question';
import Login from '../screen/login';
import ForgotPassword from '../screen/forgot-password';
import ChangePassword from '../screen/change-password';
import Header from '../common/header';

    
function App(props:any) {
  return (
    // <Router>
    //   <Header />
    //   <Switch>
    //     <Route exact path="/">
    //       <HomePage />
    //     </Route>
    //     <Route exact path="/check-duplicate">
    //       <CheckDuplicate />
    //     </Route>
    //     <Route exact path="/self-generate">
    //       <SelfGenerate />
    //     </Route>
    //     <Route exact path="/login">
    //       <Login />
    //     </Route>
    //     </Switch>
    // </Router>

    //! Quy test screen 
    //! <Login />
    //! <ForgotPassword />
    <ChangePassword />
  );
}

export default App;