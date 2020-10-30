import React, {useState} from "react";
import '../Login/Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Toast from '../commons/Toast';

export default () => {
    const [email, updateEmail] = useState("");
    const [responseMessage, updateResponseMessage] = useState("");
    const [displayToast, updateDisplayToast] = useState(false);
    const [toastSeverity, updateToastSeverity] = useState("");
    const [errorMessage, updateErrorMessage] = useState("");
    const errorStyle = {
        color: '#ff0000',
        backgroundColor: 'red'
    }

    function createFormData() {
        let formData = new FormData();
        formData.append("email", email);
        return formData;
    }

    function submitPasswordResetRequest(event) {
        event.preventDefault();
        let url = "api/login/password-reset-request/";
        console.log(document.cookie);
        let token = Cookies.get('csrftoken');
        let formData = createFormData();
        console.log(token);
        updateErrorMessage("");
        updateResponseMessage("");
        updateToastSeverity("");
        updateDisplayToast(false);
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {
                "X-CSRFToken": token
            },
        }).then((response) => {
            updateResponseMessage(response.data);
            updateToastSeverity("success");
            updateDisplayToast(true);            
        }).catch((error) => {
            if(error.response){
                updateErrorMessage(error.response.data);
            }
        })
    }
    return (

        <div className="container">
        <Toast displayToast={displayToast} severity={toastSeverity} 
            displayMessage={responseMessage} updateDisplayToast={updateDisplayToast}/>
            
            <center>
                <div className="logoContainer">
                    <a className="nav-link" to="/">
                        Logo Here
                    </a>
                </div>
            </center>
            <div className="loginFormContainer col-10 offset-1 col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
                <h4 className="login-header"><strong>Provide your email address to reset your password.</strong></h4>
                <form className="col col-md-8 offset-md-2 col-lg-10 offset-lg-1">
                    <div className="form-group">
                        <label htmlFor="email"><span>Email:</span></label>
                        <input type="email" className="form-textbox form-control form-control-sm" aria-describedby="emailHelp"
                               name="email" value={email} autoComplete="off" onChange={e => updateEmail(e.target.value)}/>
                        {(()=> {
                            if(errorMessage){
                                return <div className="error-style" role="alert">
                                            {errorMessage}
                                        </div>
                            }                           

                        })()}
                    </div>
                    <center>
                        <div className="submit-container">
                            <button type="submit" className="btn btn-secondary rounded-pill"
                                    onClick={e => submitPasswordResetRequest(e)}>Submit</button>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    )
}
