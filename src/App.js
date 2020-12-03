import React from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Header} from './components/Header'
import {Add} from './components/Movie/Add'
import {Signup} from './components/Auth/Signup'
import {Login} from './components/Auth/Login'
import {Dashboard} from './components/Auth/Dashboard'
import {MyDetails} from './components/Auth/MyDetails'
import PrivateRoute from './components/Auth/PrivateRoute'
import ForgotPassword from './components/Auth/ForgotPassword';
import UpdateProfile from './components/Auth/UpdateProfile';

import Favourites from './components/Movie/Favourites'

import { useAuth } from './context/AuthContext'

import './lib/font-awesome/css/all.min.css'

function App() {

  const { currentUser } = useAuth()

  return (
    <>
      <Router>
        <Header/>

        <Switch>
          
          { currentUser ? null : <>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />  
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          </>
            
          } 
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <PrivateRoute path="/faves" component={Favourites} />
          <PrivateRoute path="/my-details" component={MyDetails} />
          <PrivateRoute path="/add" component={Add} />
          <Route exact path="/" component={Dashboard} />
          
        </Switch>
      </Router>
    </>
  
  );
}

export default App;
