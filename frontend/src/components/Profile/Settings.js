import React from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Settings() {
    let buttonStyle = {
        // 'width': '150px',
        'textAlign': 'center',
        'marginBottom': '10px'

    };

    // let token = Cookies.get('csrftoken')

    let signOut = (event) => {
        event.preventDefault();
        axios({
            method: 'get',
            url: "http://localhost:8000/api/login/logout/",
            // headers: {
            //     'X-CSRFToken': Cookies.get('csrftoken')
            // }
        }).then(success => {
            localStorage.removeItem("user");
            window.location.replace("/portal-login");
        }).catch(error=> {
            console.log(error);
        })
    }

    return <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 ml-auto signout-settings-button-wrapper">
        <button className="col-8 offset-2 btn btn-light btn-group-sm button-style">
            <span className="d-inline-block fa fa-cog"></span>
            <span className="d-sm-none d-lg-inline">Settings</span></button><br/>
        <button className="col-8 offset-2 btn btn-secondary btn-group-sm button-style" 
            onClick={(event)=>signOut(event)}>
            <span className="d-sm-none d-lg-inline">Sign Out </span>
            <i className="fa fa-sign-out"></i>
            </button>
    </div>
};