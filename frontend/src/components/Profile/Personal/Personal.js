import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import BasicInfo from "./BasicInfo.js";
import ContactInfo from "./ContactInfo.js";
import EmergencyInfo from "./EmergencyInfo.js";
import MedicalCardInfo from "./MedicalCardInfo.js";
import GPInfo from "./GPInfo"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '100%',
  },
  rowPadding: {
    paddingBottom: '20px',
  },
  labelPadding: {
    paddingTop: '10px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

export default function Personal () {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BasicInfo classes={classes} />
      <ContactInfo classes={classes} />
      <EmergencyInfo classes={classes} />
      <MedicalCardInfo classes={classes} />
      <GPInfo classes={classes} />
    </div>
  )
}
