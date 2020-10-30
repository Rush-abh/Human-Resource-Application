import React from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import hrAppBackend from "../../apis/hrAppBackend";


export default class PublicCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginId: JSON.parse(localStorage.getItem("user")).id,
            token: Cookies.get('csrftoken'),
            user : {
                profile_pic : require('../../img/alt-profile-pic.png'),
                user_name: '',
                designation: '',
                intro: '',
                team: '',
                preferredName: '',
                email: '',
                mobile: '',
                birthday: ''
            },
            cardContainer : {
                'textAlign': 'center',
                'minWidth': '300px',
            },
        }
    };

    componentDidMount(){
        hrAppBackend.get('/employee')
        .then(success => {
            let user_data = success.data[0]
            let user_name = user_data.first_name + " " + user_data.last_name
            this.setState({
                user: {
                    ...this.state.user,
                    user_name: user_name,
                    preferredName: user_data.preferred_name,
                    email: user_data.company_email_address,
                    mobile: user_data.mobile_number,
                    birthday: user_data.date_of_birth
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        let {user} = this.state;
        return <div className="col-12" style={this.state.cardContainer}>
            <div className="avatar-container">
                <img src={user.profile_pic} className="avatar-image-style"/><br/>
                {user.user_name}<br/>
                <small>{user.designation}</small><br/>
                {user.intro}
                {`Currently I am part of ${user.team}`}
            </div>
            <div>
                <table className="table table-responsive table-borderless public-card-table-style">
                    <tbody>
                        <tr>
                            <td className="public-card-table-first-column-style">Full Name:</td>
                            <td>{user.user_name}</td>
                        </tr>
                        <tr>
                            <td>Preferred Name:</td>
                            <td>{user.preferredName}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Mobile Number:</td>
                            <td>{user.mobile}</td>
                        </tr>
                        <tr>
                            <td>Birthday:</td>
                            <td>{user.birthday}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}