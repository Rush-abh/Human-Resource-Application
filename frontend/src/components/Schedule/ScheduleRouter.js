import React from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";

import CalendarComponent from "./CalendarComponent";
import Requests from "./Requests/Requests.js"
import LeaveComponent from "./History.js";

export default function ScheduleRouter() {
    let {path} = useRouteMatch();
    return(
        <div className="col">
            <Switch>
                <Route exact path={path}>
                    <CalendarComponent/>
                </Route>
                <Route path={`${path}/calendar`}>
                    <CalendarComponent/>
                </Route>
                <Route path={`${path}/history`}>
                    <LeaveComponent/>
                </Route>
                <Route path={`${path}/requests`}>
                    <Requests/>
                </Route>
            </Switch>
        </div>
    );
}
