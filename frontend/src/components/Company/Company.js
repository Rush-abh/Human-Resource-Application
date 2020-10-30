import React from "react";
import Sidebar from "./Sidebar";
import CompanyRouter from "./CompanyRouter";
// import {useLocation} from "react-router-dom";
import "./CompanyPage.css";


export default function Company () {
    return <div className="row companyContainer">
        <Sidebar/>
        <CompanyRouter/>
    </div>
}