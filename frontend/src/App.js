import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/commons/NavigationBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Company from "./components/Company/Company";
import Schedule from "./components/Schedule/Schedule";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/LoginPage";
import OnboardingLanding from "./components/Onboarding/OnboardingLanding";
import Onboarding from "./components/Onboarding/Onboarding";
import OnboardingPersonal from "./components/Onboarding/OnboardingPersonal";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import EmailSubmissionForm from "./components/EmailSubmission/EmailSubmissionForm";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoUrl: require('./img/logo.png'),
      loggedIn: false
    }
  }

  renderContent() {
    // if(this.state.loggedIn){
    //   return (
    //       <RouteComponent/>
    //   )
    // } else{
    //   return <Login/>
    // }
    return <RouteComponent />
  }
  render() {
    return this.renderContent();
  }
}

function RouteComponent() {
  return (
    <Router>
      <div>
        <Route exact path="/portal-login">
          <Login />
        </Route>
        <Route path="/email-submission">
          <EmailSubmissionForm />
        </Route>
        <PrivateRoute exact path="/">
          <NavigationBar />
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <NavigationBar />
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <NavigationBar />
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/schedule">
          <NavigationBar />
          <Schedule />
        </PrivateRoute>
        <PrivateRoute path="/company">
          <NavigationBar />
          <Company />
        </PrivateRoute>
        <PrivateRoute path="/onboardinglanding">
          <OnboardingLanding/>
        </PrivateRoute>
        <PrivateRoute path="/onboarding">
          <Onboarding/>
        </PrivateRoute>
        <PrivateRoute path="/onboardingpersonal">
          <OnboardingPersonal/>
        </PrivateRoute>



        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      </div>
    </Router>
  );
}


function PrivateRoute({ children, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  let is_authenticated = null;

  if (user) {
    is_authenticated = user.token;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        is_authenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/portal-login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
connect(mapStateToProps)(PrivateRoute);
