import React from "react";
// import LeaveComponent from "./LeaveComponent";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import OrganisationalChart from "./Chart/OrganisationalChart";
import CompanyDirectory from "./CompanyDirectory";
import CompanyReports from "./Reports/CompanyReports"
import CompanyPolicies from "./CompanyPolicies";
import AttendanceReport from "./Reports/AttendanceReport";
import AttritionReport from "./Reports/AttritionReport";
import LeaveReport from "./Reports/LeaveReport";
// import CalendarComponent from "./CalendarComponent";

export default function CompanyRouter() {
    let {path} = useRouteMatch();
    return(
        <div className="col-12 col-md-8 col-lg-9">
            <Switch>
                {/*<Route exact path={path}>*/}
                {/*    <OrganisationalChart/>*/}
                {/*</Route>*/}
                <Route path={`${path}/org-chart`}>
                  <OrganisationalChart/>
                </Route>
                <Route path={`${path}/reports`}>
                    <CompanyReports/>
                </Route>
                <Route path={`${path}/company/reports/attendance`} component={AttendanceReport} />
                <Route path={`${path}/company/reports/attrition`} component={AttritionReport} />
                <Route path={`${path}/company/reports/leave`} component={LeaveReport} />
                <Route path={`${path}/directory`}>
                    <CompanyDirectory/>
                </Route>
                <Route path={`${path}/policies`}>
                    <CompanyPolicies/>
                </Route>
            </Switch>
        </div>
    );
}
