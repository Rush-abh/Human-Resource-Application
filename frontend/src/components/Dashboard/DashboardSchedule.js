import React, {useState} from "react";
import moment from "moment";
// import {Link} from "react-router-dom";

import hrAppBackend from '../../apis/hrAppBackend';

export default class DashboardSchedule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fromDate: moment().startOf('isoWeek').format("YYYY-MM-DD"),
            toDate: moment().startOf('isoWeek').add(4, 'days').format("YYYY-MM-DD"),
            loginId: JSON.parse(localStorage.getItem("user")).id,
            weekDays: [moment().startOf('isoWeek').format("YYYY-MM-DD"),
                        moment().startOf('isoWeek').add(1, 'days').format("YYYY-MM-DD"),
                        moment().startOf('isoWeek').add(2, 'days').format("YYYY-MM-DD"),
                        moment().startOf('isoWeek').add(3, 'days').format("YYYY-MM-DD"),
                        moment().startOf('isoWeek').add(4, 'days').format("YYYY-MM-DD"),],
            startTime: "9:00 a.m.",
            endTime: "5:00 p.m.",
            schedule: [],
            days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        }
    }

    componentDidMount(){
        hrAppBackend.get(`/schedule?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`)
        .then(success => {
            // console.log(success.data)
            this.setState({
                ...this.state,
                schedule: success.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    renderShift(day) {
        let shift = this.state.schedule.find(schedule_day => moment(schedule_day.fromDate).format("ddd") === day)
        return !!shift ? `${shift.shift_start_time} - ${shift.shift_end_time}` : "--"
    }
    
    render(){
        console.log(this.state);
        return <div className="dashboard-shaded-container">
            <div className={'container'}>
                <div className="row dashboard-shaded-container-second-div">
                    <div className={'col-12 col-sm-3 offset-sm-1 dashboard-shaded-container-third-div'}>
                        <h4 className="dashboard-shaded-container-header">My Week</h4>
                    </div>
                    <div className="col-12 col-sm-7 align-self-center">
                        <span className="float  - sm-right dashboard-shaded-container-span">Your shift starts at {this.state.startTime} and
                            ends at {this.state.endTime} You have 1 hour break time which can be taken at anytime.</span>
                    </div>
                </div>
                <div className="row">
                    <div className={'col-12 col-sm-10 offset-sm-1 dashboard-schedule-shortcuts'}>
                        <div className="schedule-box-class-white ml-2 mr-2 ml-sm-0 mr-sm-0">
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="row">
                                        <td className="col-1"></td>
                                        <td className="col-2"><div className="text-center">Mon</div></td>
                                        <td className="col-2"><div className="text-center">Tue</div></td>
                                        <td className="col-2"><div className="text-center">Wed</div></td>
                                        <td className="col-2"><div className="text-center">Thurs</div></td>
                                        <td className="col-2"><div className="text-center">Fri</div></td>
                                    </tr>
                                </thead>
                            <tbody>
                                <tr className="row">
                                    <td className="col-1"></td>
                                    {this.state.days.map((day, index) => <td className="col-2" key={index}><div className="text-center">{
                                        this.renderShift(day)
                                    }</div></td>)}
                                </tr>
                                
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={'col-12 col-sm-10 offset-sm-1 dashboard-schedule-shortcuts'}>
                        <div className="container">
                            <ul className="row list-unstyled float-sm-right">
                                <li className="dashboard-schedule-shortcuts-links ml-2 ml-sm-0"><strong>Request timeoff</strong></li>
                                <li className="dashboard-schedule-shortcuts-links ml-2 ml-sm-0"><strong>Request overtime</strong></li>
                                <li className="dashboard-schedule-shortcuts-links ml-2 ml-sm-0"><strong>Full schedule and history</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}