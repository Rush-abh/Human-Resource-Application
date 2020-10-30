import React from "react";
import {Link} from 'react-router-dom';
import hrAppBackend from "../../apis/hrAppBackend";
import MyVerticallyCenteredModal from "../commons/PublicCard";

export default class DashboardEmployeeStatus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            defaultProfilePic : require('../../img/alt-profile-pic.png'),
            signedInEmployees : [],
            openModal: false,
            active_employee: 0,
        }
    }

    componentDidMount(){
        hrAppBackend.get(`/shift_tracking/?exclude=self`)
        .then(success => {
            this.setState({
                ...this.state,
                signedInEmployees: success.data
            })
            // console.log(success.data)
        })
        .catch( error => {
            console.log(error)
        })
    }

    popModal(empId) {
        // alert(empId);
        this.setState({
            ...this.state,
            openModal: true,
            active_employee: empId
        })
        // return <PublicCardModal open={true}/>
    }

    hideModal(){
        this.setState({
            ...this.state,
            openModal: false
        })
    }

    render(){
        return(
            <div className="dashboard-shaded-container">
                <MyVerticallyCenteredModal show={this.state.openModal} onHide={() => this.hideModal()}
                    employee_id={this.state.active_employee}
                />
                <div className="container">
                    <div className="row" style={{'paddingTop': 20}}>
                        <div className="col-12 offset-sm-1 dashboard-shaded-container-second-div">
                            <h4 className="dashboard-shaded-container-header">Who is in</h4>
                        </div>
                    </div>
                    <div className="row schedule-box-class">
                    {
                        this.state.signedInEmployees.map((signedInEmployee, index) => {
                            if(index === 0) {
                                return <div key={index} className="col-sm-5 col-md-3 offset-md-1">
                                    <div className="row">
                                        <div className="col-5 col-md-5 align-self-center employee-status-avatar-container">
                                            <img src={this.state.defaultProfilePic} className="employee-status-avatar-style" alt=""/><br/>
                                            <div className="employee-status-text-style">
                                                {signedInEmployee.employee.status}
                                            </div>
                                        </div>
                                        <div className="col-6 mr-2">
                                            {`${signedInEmployee.employee.first_name} ${signedInEmployee.employee.last_name}`}<br/>
                                            <div className="employee-detail-designation-text">{signedInEmployee.employee.position}</div><br/>
                                            <div className="employee-card-link-container-style">
                                                <Link className="employee-card-link-style" to="#" onClick={(event) => this.popModal(signedInEmployee.employee.Emp_ID)}>
                                                    View Card
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } else {
                                return <div key={index} className="col-sm-5 col-md-3">
                                    <div className="row">
                                        <div className="col-5 col-md-5 align-self-center employee-status-avatar-container">
                                            <img className="employee-status-avatar-style" src={this.state.defaultProfilePic}
                                                 alt="profile-pic"
                                            /><br/>
                                            <div className="employee-status-text-style">
                                                {signedInEmployee.employee.status}
                                            </div>
                                        </div>
                                        <div className="col-6 mr-2">
                                            {`${signedInEmployee.employee.first_name} ${signedInEmployee.employee.last_name}`}<br/>
                                            <div className="employee-detail-designation-text">{signedInEmployee.employee.position}</div><br/>
                                            <div className="employee-card-link-container-style">
                                                <Link className="employee-card-link-style" onClick={(event) => this.popModal(signedInEmployee.employee.Emp_ID)} to="#">
                                                    View Card
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                    </div>
                    <div className="row pb-3">
                        <div className="col-12 col-sm-10 offset-sm-1">
                            <span className="float-right">
                                <Link to="/company" className="dashboard-link-to-directory"><strong>Full Directory</strong></Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}