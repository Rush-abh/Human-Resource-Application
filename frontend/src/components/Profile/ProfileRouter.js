import React from "react";
// import LeaveComponent from "./LeaveComponent";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import PublicCard from "./PublicCard";
import Personal from "./Personal/Personal.js";
import JobInfo from "./JobInfo";
import LegalPage from "./Legal/LegalPage";
import Documents from "./Documents";

export default function CompanyRouter() {
    let {path} = useRouteMatch();
    return(
        <div className="col-12 col-sm-10 col-md-6 col-lg-8">
            <Switch>
                <Route exact path={path}>
                    <PublicCard/>
                </Route>
                <Route path={`${path}/public-card`}>
                    <PublicCard/>
                </Route>
                <Route path={`${path}/profile-edit`}>
                    <Personal/>
                </Route>
                <Route path={`${path}/job-info`}>
                    <JobInfo/>
                </Route>
                <Route path={`${path}/legal`}>
                    <LegalPage/>
                </Route>
                <Route path={`${path}/documents`}>
                    <Documents/>
                </Route>
            </Switch>
        </div>
    );
}
