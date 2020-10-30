import React, {Component} from "react";
import {Link} from "react-router-dom";
import {hrAppRoutes} from "../../routes/routes";
import hrAppBackend from "../../apis/hrAppBackend";
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo : require('../../img/alt-profile-pic.png'),
            onlineStatus: 'offline',
            buttonLabel: 'Start Shift',
            loginID: JSON.parse(localStorage.getItem("user")).id,
            shiftDetail: {},
            disableButton: false,
            openSnackbar: false,
            errorMessage: ""
        }
    }

    popUpNotification = (e) => {
        // e.preventDefault();
        alert("Notification Panel");
    };
    // const [activeLink, setActiveLink] = useState('Dashboard');

    setButtonLabel(shift_status){
        console.log("Reached at setButtonLabel", shift_status)
        if(shift_status === "Shift_Started"){
            return "Start Break";
        } else if(shift_status === "Break_Started"){
            return "End Break";
        } else if(shift_status === "Break_Ended"){
            return "End Shift";
        } else {
            return "Start Shift";
        }
    }

    componentDidMount(){
        hrAppBackend.get(`/shift_tracking/`)
        .then(success => {
            if(!!success.data && success.data.length > 0){
                let buttonLabel = this.setButtonLabel(success.data[0].shift_status);
                console.log(buttonLabel)
                this.setState({
                    ...this.state,
                    buttonLabel,
                    shiftDetail: success.data[0],
                    disableButton: false,
                    onlineStatus: 'online'
                })
            }
        })
        .catch(error => {
            console.log(error.data)
        })
    }

    generateShiftStartData(){
        console.log(moment().format("YYYY-MM-DD"));
    }

    startShift(){
        hrAppBackend.post(`/shift_tracking/`)
        .then(success => {
            let buttonLabelTemp = this.setButtonLabel(success.data.shift_status);
            this.setState({
                ...this.state,
                shiftDetail: success.data,
                buttonLabel: buttonLabelTemp
            })
            // console.log(success.data);
        })
        .catch(error => {
            this.setState({
                openSnackbar: true,
                errorMessage: error.response.data
            })
        })
        this.generateShiftStartData();
    }

    startBreak(){
        hrAppBackend.put(`/shift_tracking/${this.state.shiftDetail.id}/?event_type=start_break`)
        .then(success => {
            let buttonLabelTemp = this.setButtonLabel(success.data.shift_status);
            this.setState({
                ...this.state,
                shiftDetail: success.data,
                buttonLabel: buttonLabelTemp
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

    endBreak(){
        hrAppBackend.put(`/shift_tracking/${this.state.shiftDetail.id}/?event_type=end_break`)
        .then(success => {
            let buttonLabelTemp = this.setButtonLabel(success.data.shift_status);
            this.setState({
                ...this.state,
                shiftDetail: success.data,
                buttonLabel: buttonLabelTemp
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

    endShift(){
        hrAppBackend.put(`/shift_tracking/${this.state.shiftDetail.id}/?event_type=end_shift`)
        .then(success => {
            let buttonLabelTemp = this.setButtonLabel(success.data.shift_status);
            this.setState({
                ...this.state,
                shiftDetail: success.data,
                buttonLabel: buttonLabelTemp
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

    onButtonClick(event){
        event.preventDefault();
        switch(this.state.buttonLabel){
            case "Start Shift":
                this.startShift();
                break;
            case "Start Break":
                this.startBreak();
                break;
            case "End Break":
                this.endBreak();
                break;
            case "End Shift":
                this.endShift();
                break;
            default:
                console.log("Error")
                break;
        }
    }

    handleClose(event){
        if(event){
            event.preventDefault();
        }
        this.setState({
            ...this.state,
            openSnackbar: false
        })
    }

    render() {
        console.log(this.state);
        return(
            <div style={{ 'marginBottom': 100}}>
                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={(event) => this.handleClose(event)}>
                    <Alert onClose={(event) => this.handleClose(event)} severity="warning">
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
                <nav className="navbar navbar-light navbar-expand-md fixed-top border-bottom" style={{'backgroundColor': 'white'}}>
                    <div className="container">
                        <Link className="navbar-brand mr-auto" height="30" width="41" to="/">Logo</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="Navbar">
                            <ul className="navbar-nav ml-sm-4">
                                {hrAppRoutes.map((route, index) => {
                                    return (<li key={index} className="nav-item">
                                        <Link className="nav-link" to={route.path}>{route.displayText}</Link>
                                    </li>
                                  )
                                })}
                            </ul>
                            <ul id={'nav-right'} className="d-none d-md-flex navbar-nav ml-auto">
                                <li className="nav-item">
                                    <span className="nav-link" onClick={(e) => this.popUpNotification()}>
                                        <i className="fa fa-bell"> 4</i><br/>
                                        <small>Notification</small>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <button disabled={this.state.disableButton} type="button" onClick={(event)=>this.onButtonClick(event)}>
                                            {this.state.buttonLabel}
                                        </button><br/>
                                        {/*<button type="button" className="btn btn-sm btn-secondary rounded-pill">Start Shift</button>*/}
                                        <small>Your shift starts at 9:00 a.m.</small>
                                    </span>
                                </li>
                                <li className="nav-item align-self-center">
                                    <Link className="nav-link" to="/profile">
                                            <img src={this.state.logo}
                                                 className="rounded-circle bg-light"
                                                 width="50" height="50" alt="" />
                                            <div className="status-text-style">
                                                {this.state.onlineStatus}
                                            </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>);
    }
}

export default NavigationBar;