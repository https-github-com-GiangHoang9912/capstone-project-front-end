import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../home/home";
import React, {Component} from 'react';
    
class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;