import React from "react";
import {Link, useRouteMatch, useLocation} from "react-router-dom";
import SidebarLayout from "../commons/SidebarLayout";

export default function Sidebar () {

    let {url} = useRouteMatch();

    let sideLinks = [
        {
            'path': `${url}/calendar`,
            'displayText': 'Calendar',
            'name': 'calendar'
        },
        {
            'path': `${url}/history`,
            'displayText': 'History',
            'name': 'history'
        },
        {
            'path': `${url}/requests`,
            'displayText': 'Requests',
            'name': 'requests'
        }
    ];

    return(
        <SidebarLayout sideLinks={sideLinks}/>
    );
}
