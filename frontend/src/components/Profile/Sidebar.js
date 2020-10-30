import React from "react";
import {Link, useRouteMatch, useLocation} from "react-router-dom";

import SidebarLayout from "../commons/SidebarLayout";

export default function Sidebar () {

    let {url} = useRouteMatch();
    // create link objects to supply as props to SidebarLayout.

    let sideLinks = [
        {
            'path': `${url}/public-card`,
            'displayText': 'Public Card',
            'name': 'public-card'
        },
        {
            'path': `${url}/profile-edit`,
            'displayText': 'Profile',
            'name': 'profile-edit'
        },
        {
            'path': `${url}/job-info`,
            'displayText': 'Job info & Goals',
            'name': 'job-info'
        },
        {
            'path': `${url}/legal`,
            'displayText': 'Legal',
            'name': 'legal'
        },
        {
            'path': `${url}/documents`,
            'displayText': 'Documents',
            'name': 'documents'
        },
        {
            'path': `${url}/profile-edit`,
            'displayText': 'Settings',
            'name': 'settings',
            'bigDisplay': 'false',
        },
        {
            'path': '${url}/',
            'displayText': 'Sign Out',
            'name': 'signout',
            'bigDisplay': 'false' //bigDisplay = false meaning not to display in big screen but to display only in mobile screen
        }
    ];

    let extraLinks = [
        {
            'path': `${url}/profile-edit`,
            'displayText': 'Settings',
            'name': 'settings'
        },
        {
            'path': '${url}/',
            'displayText': 'Sign Out',
            'name': 'signout'
        }
    ]

    return <SidebarLayout sideLinks={sideLinks} extraLinks={extraLinks}/>
}
