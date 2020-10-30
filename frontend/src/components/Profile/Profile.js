import React from "react";
import Sidebar from "./Sidebar";
import ProfileRouter from "./ProfileRouter";
import Settings from "./Settings";

import "./ProfilePage.css";

export default function Profile () {

    return <div className="row profile-content-wrapper">
        <Sidebar/>
        <ProfileRouter/>
        <Settings/>
    </div>
}


