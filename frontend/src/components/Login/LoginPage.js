import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import './Login.css';
import axios from 'axios';
import Toast from "../commons/Toast";
import {browserHistory} from "../../index";
import Cookies from 'js-cookie';

class LoginPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
        mismatch: ""
      },
      errorExists: false,
      toastSeverity: "error",
      displayToast: false,
      show: false,
    }
    // let history = useHistory();
  }

  updateValue(eventName, eventValue){
    this.setState({[eventName]: eventValue});
  }

  setFormData(){
    let formData = new FormData();
    formData.append("username", this.state.email);
    formData.append("password", this.state.password);
    return formData;
  }

  validatedData(formData){
    let email = formData.get("username");
    let password = formData.get("password");
    let error = {
      email: "",
      password: ""
    };
    let errorExists = false;
    if(!email){
      error['email'] = "EmailID is required."
      errorExists = true
    }
    if(!password){
      error['password'] = "Password is required."
      errorExists = true
    }
    this.setState(state => ({
      error: error,
      errorExists: errorExists
    }));
  }

  requestSignIn(event){
    event.preventDefault();
    this.setState({
      displayToast: false
    })
    let formData = this.setFormData();
    let validatedData = this.validatedData(formData);

    if(!this.state.errorExists){
      axios({
      method: 'post',
      data: formData,
      url: 'http://localhost:8000/api-token-auth/',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
      })
      .then((success) => {
        console.log("success");
        this.props.onLogin(success.data);
        localStorage.setItem('user', JSON.stringify(success.data));
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        if(error.response){
          if(error.response.data){
            let data = error.response.data;
            console.log("Data", data);
            if(!!data.mismatch){
              this.setState(state => ({
                displayToast: true,
                error: data
              }))
            }
            this.setState(state => ({
              error: data
            }))
          }
        }
      })
    }
  }

  updateDisplayToast(){
    this.setState({
      displayToast: false
    })
  }

  togglePasswordVisibility(event){
    event.preventDefault();
    let show = this.state.show ? false : true
    this.setState({
      ...this.state,
      show
    })
  }

  render(){
    let eyeIcon = this.state.show ? "fa-eye-slash" : "fa-eye";
    return (
      <div className="container">
      <Toast displayToast={this.state.displayToast} severity={this.state.toastSeverity}
            displayMessage={this.state.error.mismatch} updateDisplayToast={this.updateDisplayToast}/>
          <center>
          <div className="logoContainer">
              <a className="nav-link" to="/">
                  Logo Here
              </a>
          </div>
          </center>
          <div className="loginFormContainer col-10 offset-1 col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
              <h4 className="login-header"><strong>Welcome to HR App</strong></h4>
              <form className="col col-md-8 offset-md-2 col-lg-10 offset-lg-1">
                  <div className="form-group">
                    <label htmlFor="email"><span>Email:</span></label>
                    <input type="email" className="form-textbox form-control form-control-sm" aria-describedby="emailHelp"
                       name="email" autoComplete="off" value={this.state.email}
                       onChange={(event)=> this.updateValue(event.target.name, event.target.value)}/>
                      <small id="emailHelp" className="form-text text-muted">
                        {(()=> {
                            if(!!this.state.error.email){
                                return <div className="error-style" role="alert">
                                            {this.state.error.email}
                                        </div>
                            }

                        })()}
                      </small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password:</label>
                      <input type={this.state.show ? "text": "password"} name="password" className="form-control form-control-sm"
                        value={this.state.password} onChange={(event)=> this.updateValue(event.target.name, event.target.value)}/>
                      <span onClick={(event)=> this.togglePasswordVisibility(event)}>
                        <i className={`fa ${eyeIcon} password-eye-icon`}></i>
                      </span>
                      <small>
                       {(()=> {
                            if(!!this.state.error.password){
                                return <div className="error-style" role="alert">
                                            {this.state.error.password}
                                        </div>
                            }

                        })()}
                      </small>
                      <small id="passwordHelp" className="form-text text-muted">
                          <strong>
                              <a className="nav-link forgot-password-link" href="/email-submission">I forgot my password.</a>
                          </strong>
                      </small>
                  </div>
                  <center>
                  <div className="submit-container">
                      <div className="form-check checkboxes">
                        <label className="checkbox-label form-check-label form-control-sm align-self-center" htmlFor="signedInCheck">
                            <input id="signedInCheck" type="checkbox" className="checkbox-input form-check-input" />
                            Keep me signed in.
                        </label>
                      </div>
                      <button type="submit" className="btn btn-secondary rounded-pill" onClick={(event) => this.requestSignIn(event)}>Sign In</button>
                  </div>
                  </center>
              </form>
          </div>
      </div>
  )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user) => dispatch({type: 'LOGIN', payload: user})
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);
