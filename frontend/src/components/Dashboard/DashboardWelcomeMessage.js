import React, {useState} from "react";
import {Link} from "react-router-dom";


export default function DashboardWelcomeMessage () {
    let [user, getUser] = useState({name: "Fredy"});
    getUser = () => {
        user = {
            ...user,
            'name': "Fredy",
        }
    };

    return(
        <div className="container">
            <div className="col-12 col-sm-10 offset-sm-1" style={{'textAlign': 'center', 'paddingTop': 50, 'paddingBottom': 20}}>
                <h6><strong>Welcome {user.name}</strong></h6><br/>
                <p><small>
                    Our retail stores are closed, but you can buy our products here online and get fast, free delivery. 
                    If you need help finding the right product or have a question about your order, chat online with a 
                    Specialist.<br/>
                    Please read our new terms and policies <Link to="/terms">here</Link>.</small>
                </p>
            </div>
        </div>
    );
}