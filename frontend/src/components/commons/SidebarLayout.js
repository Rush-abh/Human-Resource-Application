import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

// This Sidebar Component is a layout to present sidebar if there is any sub-link present under main navigation link.
const SidebarLayout = (props) => {
    // console.log(props.sideLinks);
    //state hook to use props to state
    const [sideLinks, updateLinks] = useState(props);

    //useEffect hook to look for any changes in the sideLinks props
    useEffect(() => {
        updateLinks(props)
    }, [props]);

    let dropdownLinkStyleClass = {
        'color': 'black',
        'textDecoration': 'none'
    };

    let horizontalScrollWrapper = {
        'width': '100px',
        'height': '300px',
        'overflowY': 'auto',
        'overflowX': 'hidden',
        'transform': 'rotate(-90deg) translate(-100px)',
        'transformOrigin': 'right top'
    }

    let horizontalScrollWrapperDiv = {
        'width': '100px',
        'height': '100px',
        'transform': 'rotate(90deg)',
        'transformOrigin': 'right top'
    }

    let currentLocation = useLocation();
    let activeLinkArr = currentLocation.pathname.split("/");
    let activeLink = activeLinkArr[activeLinkArr.length-1];
    let parentLink = activeLinkArr[1];


    return <div className="col-12 col-md-4 col-lg-2">
        <ul className="list-unstyled d-none d-md-block">
            {sideLinks.sideLinks.map((link, index) => {
                if(link.name === activeLink){
                    if(!link.bigDisplay || link.bigDisplay !== 'false'){
                        return <li key={index} className="pt-2 active-list-style">
                            <Link className="offset-1 link-style-class" to={link.path}>
                                <span className="d-inline align-top">{link.displayText}</span></Link>
                        </li>
                    }
                } else {
                    if(!link.bigDisplay || link.bigDisplay !== 'false'){
                        return <li key={index} className="pt-2 list-style-class">
                            <Link className="offset-1 link-style-class" to={link.path}>{link.displayText}</Link>
                        </li>
                    }
                }
            })}
        </ul>

        {/*This portion is to display dropdown of the links in mobile screen rather than sidebar links.*/}

        {/*<div className="d-sm-none dropdown" style={{'paddingBottom': 10, 'borderBottom': 'solid', 'borderWidth': '1px', 'borderColor': '#e2e2e'}}>*/}
        {/*    <a className="dropdown-toggle" type="button" id="dropdownMenu2"*/}
        {/*            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
        {/*        {parentLink.toUpperCase()}*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">*/}
        {/*        {*/}
        {/*            sideLinks.sideLinks.map((link, index)=> {*/}
        {/*                return <button className="d-block dropdown-item" type="button">*/}
        {/*                    <Link to={link.path} style={dropdownLinkStyleClass}>{link.displayText}</Link>*/}
        {/*                </button>*/}
        {/*            })*/}
        {/*        }*/}
        {/*    </div>*/}
        {/*</div>*/}


        <div className="d-md-none scrollmenu">
            {sideLinks.sideLinks.map((link, index) => {
                                    if(!link.bigDisplay || link.bigDisplay !== 'false'){
                                        if(link.name === activeLink){
                                            return <Link key={index} to={link.path} className="nav-link scrollmenu-item-active">
                                                {link.displayText}
                                            </Link>
                                        }
                                        return <Link key={index} to={link.path} className="nav-link scrollmenu-item">
                                            {link.displayText}
                                        </Link>
                                    }
                                })}
        </div>
    </div>
};

export default SidebarLayout;