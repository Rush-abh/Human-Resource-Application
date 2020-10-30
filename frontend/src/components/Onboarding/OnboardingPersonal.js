import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OnboardingSidebar from "./OnboardingSidebar";
import OnboardingRouter from "./OnboardingRouter";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "./Onboarding.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OnboardingPersonal() {

    const classes = useStyles();
    const [Gender, setGender] = React.useState('');

    const handleChange = (event) => {
    setGender(event.target.value);
    };

    //render(){
    return(
    //<OnboardingSidebar/>

    //container for whole page
    <div>

        <center>
        <div>
        <div className="personal-page-title">
            <h2>Personal Information</h2>
        </div>

        <div className="personal-name-number">
            <p></p>
                <h6 className="personal-heading"><strong>First Name</strong></h6>
                <TextField className="personal-textfield-input"  variant="outlined" />
                <h6 className="personal-heading"><strong>Last Name</strong></h6>
                <TextField className="personal-textfield-input" variant="outlined" />
                <h6 className="personal-heading"><strong>Preferred Name</strong></h6>
                <TextField className="personal-textfield-input"  variant="outlined"/>
                <h6 className="personal-heading"><strong>Telephone Number</strong></h6>
                <TextField className="personal-textfield-input"  variant="outlined" />
                <h6 className="personal-heading"><strong>Mobile Number</strong></h6>
                <TextField className="personal-textfield-input"  variant="outlined" />

        </div>

        <div className="personal-gender-dob">
            <div className="personal-gender-dob-child">
                <FormControl variant="filled" className={classes.formControl}>
                    <h6 className="personal-gender-dob-title"><strong>Gender</strong></h6>
                    <Select labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={Gender}
                            onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Male</MenuItem>
                        <MenuItem value={20}>Female</MenuItem>
                    </Select>
                </FormControl>
            </div>


            <div className="personal-gender-dob-child">
                <h6 className="personal-gender-dob-title"><strong>Date of Birth</strong></h6>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
            </div>
        </div>

        <div className="personal-address">
             <h6 className="personal-heading"><strong>Residence Address</strong></h6>
            <TextField className="personal-textfield-input"  variant="outlined" />
        </div>
        </div>
        </center>
        <span className="save-button-container">
            <Button className="save-button" color="primary" variant="contained">Save</Button>

            <Button className="next-button"  variant="outlined">Next</Button>
        </span>
    </div>


    )
//}
}