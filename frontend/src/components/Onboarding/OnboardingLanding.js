import React, {Component} from "react";
import './Onboarding.css';
import { Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import './Onboarding.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Popover from '@material-ui/core/Popover';
import {Link} from 'react-router-dom';


export default class OnboardingLanding extends Component {
    constructor(props){
        super(props)
        this.state = {
            enterPassword: "",
            reenterPassword: "",
            error: {
                enterPassword:"",
                reenterPassword: "",
                mismatch: ""
            },
            errorExists: false,
            show: false,
        }
    }


    render(){
        return(
            <div className="pageContainer">

                <div className="logoTitleContainer">
                    <div className="logoTitleContainerChild">
                        <div className="logo">
                            <a className="nav-link" to="/">
                                Logo Here
                            </a>
                        </div>
                    </div>
                    <div className="logoTitleContainerChild">
                        <div className="title">
                                <h4><strong>HR Application</strong></h4>
                        </div>
                    </div>
                </div>

               <Divider />

               <div className="bottomSectionContainer">

                   <div className="welcomePasswordContainer">
                       <div className="welcomeTitleMessage">
                            <div className="welcomeTitleContainer">
                                 <h4 className="welcomeHeader">Welcome to HR Application</h4>
                            </div>
                            <div className="welcomeMessageContainer">
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                       </div>

                       <Divider />

                       <div className="passwordSetupContainer">
                            <div className="passwordTitleContainer">
                                <h4> Setup New Password </h4>
                            </div>

                            <div className="passwordInputContainer">
                                <div className="password-input-border">
                                    <TextField className="password-input" id="outlined-basic" label="Enter Password Here" variant="outlined" size="large" />
                                </div>
                                <div className="help-icon">
                                    <HelpOutlineIcon />
                                </div>
                            </div>

                             <div className="passwordInputContainer">
                                <div className="reenter-password-input-border">
                                    <TextField className="reenter-password-input" id="outlined-basic" label="Re-Enter Password Here" variant="outlined" />
                                </div>
                             </div>

                             <div className="passwordInputContainer">
                                <Button className="save-button" variant="contained" color="primary">
                                    Save
                                </Button>
                             </div>
                       </div>
                   </div>

                   <div className="login-button-container">
                            <Link to = {{pathname: "/onboarding"}}>
                                <Button className="login-button" variant="outlined">Login</Button>
                            </Link>
                   </div>
               </div>
            </div>

        )

    }
}