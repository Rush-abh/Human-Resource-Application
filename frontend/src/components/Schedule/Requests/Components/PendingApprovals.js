import React, {useState} from "react";

import "../../styles/styles.css";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function PendingApprovals() {

  return(
      <div className="MainContainer">
        <Typography className="title" variant="h6">Pending Approvals</Typography>
        <hr className="dividers"/>
        <List className="list">
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    >
                    08/May/2020 - 15/May/2020 <b>7 day sick leave</b>
                </Typography>
                {" — Pending"}
              </React.Fragment>
            }
            />
        </ListItem>
        <Divider className="list-divider" variant="middle"/>
      </List>
    </div>
  )
}
