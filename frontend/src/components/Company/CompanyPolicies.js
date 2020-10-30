import React, { Component, useEffect, useState } from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';

import {Typography, Icon, TextField, Grid} from '@material-ui/core';

export default function CompanyPolicies () {

  const [files, updateFiles] = useState([]);
  const [searchTerm, updateSearchTerm] = useState("");

  return(
    <div>
      <div className=" MainContainer offset-1">
        <Typography className="title" variant="h6">Company Policies</Typography>
        <hr className="dividers"/>
        <Grid className="policy-grid" container spacing={1} alignItems="flex-end">
          <Grid item>
            <Icon className="fa fa-search" />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Search" value={searchTerm} onChange={(event) => { updateSearchTerm(event.target.value) }} />
          </Grid>
        </Grid>
        <table className="policy-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Document Type</th>
              <th>Description</th>
            </tr>

          </thead>

          <tbody>
            {
              files.map(file => {
                return <tr>
                  <td>{file.document_name}</td>
                  <td>{file.document_upload_date}</td>
                  <td>{file.document_type}</td>
                  <td>{file.document_description}</td>
                  <td><a href={file.file_location}>View File</a></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
