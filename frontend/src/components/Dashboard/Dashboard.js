import React, {Component} from "react";
import DashboardSchedule from "./DashboardSchedule";
import DashboardWelcomeMessage from "./DashboardWelcomeMessage";
import DashboardEmployeeStatus from "./DashboardEmployeeStatus";

export default class Dashboard extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return(
            <div className="container">
                <DashboardWelcomeMessage/>
                <DashboardSchedule />
                <DashboardEmployeeStatus/>
            </div>
        )
    }
}

