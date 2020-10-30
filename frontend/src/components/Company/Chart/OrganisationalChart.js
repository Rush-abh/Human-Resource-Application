import React from "react";
//import OrganizationChart from "@dabeng/react-orgchart";
import {Typography} from '@material-ui/core';

export default function OrganisationalChart () {
    {/* const ds = {
        id: "n1",
        name: "Shona Robson",
        title: "CIO",
        children: [
            { id: "n2", name: "Tim Bao", title: "Business Analyst" },
            {
                id: "n3",
                name: "Nielsen",
                title: "BA/ Project Lead",
                children: [
                    { id: "n4", name: "Anjan Rai", title: "Fullstack Developer" },
                    { id: "n5", name: "Shane", title: "Frontend Developer", },
                    { id: "n6", name: "Rushabh", title: "Backend Developer" },
                    { id: "n6", name: "Sudip", title: "Backend Developer" },
                    { id: "n6", name: "Saif", title: "Backend Developer" }
                ]
            },
            { id: "n9", name: "Hong Miao", title: "department manager" },
            {
                id: "n10",
                name: "Chun Miao",
                title: "department manager",
                children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }]
            }
        ]
    };

  return <OrganizationChart datasource={ds} pan={true} zoom={true} />;

  */}

  const source = require ('../../../img/org-chart.png');

  return(
    <div>
      <div className=" MainContainer offset-1">
        <Typography className="title" variant="h6">Organisational Chart</Typography>
        <hr className="dividers"/>

        <img className="org-chart" src={source} alt="Organisational Chart"></img>

      </div>
    </div>
  );
}
