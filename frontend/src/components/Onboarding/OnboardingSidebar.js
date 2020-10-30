import React from "react";
import {Link, useRouteMatch, useLocation} from "react-router-dom";

import PersonIcon from '@material-ui/icons/Person';


import OnboardingSidebarLayout from "./OnboardingSidebarLayout";

export default function OnboardingSidebar () {


    let {url} = useRouteMatch();
    // create link objects to supply as props to SidebarLayout.

    let sideLinks = [
        {
            'path': `${url}/onboardingpersonal`,
            'displayText': 'Personal',
            'name': 'personal',
            'icon': <PersonIcon/>
        }
    ];



    return <OnboardingSidebarLayout sideLinks={sideLinks}/>
}
