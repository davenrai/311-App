import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link
} from "react-router-dom";
import { PrivateRoute } from './helpers/PrivateRoute'
import UserContext from './components/context/UserContext'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import Home from './components/Home'

function App() {
    const [userData, setUserData] = useState({
        token: undefined, 
        user: undefined
    })

    useEffect(() => {
      const checkIfLoggedIn = async () => {
        // check localStorage for auth token
        let token = localStorage.getItem("auth-token")
        
        // if there isn't a token (initial user) add auth-token
        if (token === null) {
          console.log("token is null")
          localStorage.setItem("auth-token", "")
          token = "";
        }

        const tokenResult = await Axios.post(
          "http://localhost:5000/validToken", null,
          { headers: { "x-auth-token": token }}
        )

        if(tokenResult.data) { // if there's a valid token, get the user's data
          // get info from user 
          console.log(token)
          const userRes = await Axios.get(
            "http://localhost:5000/users/", 
            {
              headers: { "x-auth-token": token },
            });

          console.log("userRes ", userRes)
          setUserData({
            token: token, 
            user: userRes.data,
          });
          
        }
      }
      checkIfLoggedIn();
    }, []);

    return (
      <div className="App">
        <Router>
          <UserContext.Provider value={{userData, setUserData}}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Signup />
            </Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/">
              <Header />
              <div style={{margin:'auto', textAlign:'center'}}>
                {
                  userData.token ? <Link to="/dashboard"><button>Continue to Dashboard</button> </Link> : <></>
                }
              </div>
              {/*Insert Footer Here, or About hyperlink to describe app, github*/}
            </Route>
            
          </Switch>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }

export default App;
