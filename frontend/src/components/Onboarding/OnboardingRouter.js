import React from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import OnboardingSidebar from  "./OnboardingSidebar";
import OnboardingPersonal from "./OnboardingPersonal";

export default function OnboardingRouter() {
    let {path} = useRouteMatch();
    return(
        <div >
            <Switch>
                <Route path={`${path}/onboardingpersonal`}>
                    <OnboardingPersonal/>
                </Route>
            </Switch>
        </div>
    );
}
