import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Button } from '@material-ui/core';
import Login from './components/Login'
import Signup from './components/Signup'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <h1>311 Web App</h1>
              <Login />
              
                <Button 
                  color="secondary" 
                  variant="contained" 
                  href="/signup"
                  >
                    Signup
                </Button>
              
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
