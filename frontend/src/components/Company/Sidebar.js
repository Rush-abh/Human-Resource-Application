import React from "react";
import {useRouteMatch} from "react-router-dom";
import SidebarLayout from "../commons/SidebarLayout";

export default function Sidebar () {

    let {url} = useRouteMatch();
    // create link objects to supply as props to SidebarLayout.
    let sideLinks = [
        {
            'path': `${url}/org-chart`,
            'displayText': 'Organisational Chart',
            'name': 'org-chart'
        },
        {
            'path': `${url}/directory`,
            'displayText': 'Company Directory',
            'name': 'directory'
        },
        {
            'path': `${url}/reports`,
            'displayText': 'Company Reports',
            'name': 'reports'
        },
        {
            'path': `${url}/policies`,
            'displayText': 'Company Policies',
            'name': 'policies'
        }
    ];

    return(
        <SidebarLayout sideLinks={sideLinks}/>
    );
}
