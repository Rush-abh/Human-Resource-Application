import React, {useState} from "react";
import "./CompanyPage.css";

export default function CompanyDirectory(){

    let userAvatar = require('../../img/alt-profile-pic.png');

    let initialEmployees = [
        {
            'name': 'Shona Robson',
            'designation': 'Project Lead',
            'team': 'HR App',
            'teamColor': 'red'
        },
        {
            'name': 'Anjan Rai',
            'designation': 'Front-end Developer',
            'team': 'HR App',
            'teamColor': 'red'
        },
        {
            'name': 'Shane D\'Silva',
            'designation': 'Front-end Developer',
            'team': 'HR App',
            'teamColor': 'red'
        },
        {
            'name': 'Nielsen David',
            'designation': 'BA',
            'team': 'HR App',
            'teamColor': 'blue'
        },
        {
            'name': 'Rushab Pancholi',
            'designation': 'Backend Developer',
            'team': 'HR App',
            'teamColor': 'yellow'
        },
        {
            'name': 'Sudip Baitha',
            'designation': 'Backend Developer',
            'team': 'HR App',
            'teamColor': 'black'
        },
        {
            'name': 'Mohommad Saif Ali',
            'designation': 'Backend Developer',
            'team': 'HR App',
            'teamColor': 'grey'
        },
        {
            'name': 'Dimuth Lasantha',
            'designation': 'Fullstack Developer',
            'team': 'Virtual Classroom Team',
            'teamColor': 'grey'
        }
    ];
    let [employee, updateEmployee] = useState(initialEmployees);

    return(
        <div className="container tableContainerStyle">
            <div className="row">
                <div className="col-10 offset-1 pageLabelContainer">
                    <strong>Directory</strong>
                </div>
            </div>
            <div className="row">
                <div className="col-10 offset-1">
                    <SearchBar/>
                </div>
            </div>
            {/*<SearchBar/>*/}
            <div className="row">
                <div className="col-10 offset-1 table-responsive">
                    <table className="table table-responsive table-borderless">
                        <tbody>
                        {employee.map((current_employee, index) => {
                            // circleStyle['backgroundColor'] = current_employee.teamColor;
                            return <tr key={index} className="tableRowStyle">
                                <td><img src={userAvatar} className="align-items-center table-data-image"
                                         alt="user-profile-pic"
                                /> {current_employee.name}</td>
                                <td>{current_employee.designation}</td>
                                <td>
                                    <span className="badge badge-pill table-data-span">
                                        {current_employee.team} <span className="circle-style"
                                                                      style={{'backgroundColor': `${current_employee.teamColor}`}}>

                                    </span>
                                    </span>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function SearchBar(){

    let [searchTerm, updateSearchTerm] = useState("");

    return <div className="searchBarContainerStyle">
        <input name="search-bar"
               value={searchTerm}
               className="col-12 fa searchBarStyle"
               placeholder="&#xF002; Search by Name, Designation or team."
               onChange={event => updateSearchTerm(event.target.value)}
        />
    </div>
}
