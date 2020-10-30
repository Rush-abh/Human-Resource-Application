import React from "react";
import Sidebar from "./Sidebar";
import ScheduleRouter from "./ScheduleRouter";


export default class Schedule extends React.Component {
    render() {
        return(
            <div className="row" style={{'marginLeft': 0, 'marginRight': 0, 'paddingTop': 10}}>
                <Sidebar/>
                <ScheduleRouter/>
            </div>
        );
    }
}