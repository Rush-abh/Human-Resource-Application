import React, {useState} from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';

import {DatePicker, LocalizationProvider } from '@material-ui/pickers';

import axios from 'axios';
import Cookies from 'js-cookie';
import hrAppBackend from "../../../apis/hrAppBackend";

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      basicInfo: {
        first_name: '',
        last_name: '',
        preferred_name: '',
        date_of_birth: new Date(),
        gender: 'Male',
        Emp_ID: 1
      },
      genderType: ['Male', 'Female', 'Other'],
      loginId: JSON.parse(localStorage.getItem("user")).id,
      token: Cookies.get('csrftoken')
    }
  }

  componentDidMount(){

    hrAppBackend.get('/employee')
    .then(success => {
      this.setState({
        basicInfo: success.data[0]
      })
      console.log(this.state.basicInfo)
      // console.log(success.data)
    }).catch(error=> {
      console.log(error)
    })
  }

  setdisabled(){
    this.state.disabled ? this.setState({disabled: false}) : this.setState({disabled: true})
  }


  updateField(event){
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      basicInfo: {
        ...this.state.basicInfo,
        [name]: value
      }
    })
  }

  updateBasicInfo(event){
    event.preventDefault();
    let formData = new FormData();
    let {basicInfo} = this.state;
    console.log(basicInfo.Emp_ID);
    formData.append('first_name', basicInfo.first_name);
    formData.append('last_name', basicInfo.last_name);
    formData.append('preferred_name', basicInfo.preferred_name);
    formData.append('gender', basicInfo.gender);
    formData.append('date_of_birth', basicInfo.date_of_birth);
    let api_url = 'http://localhost:8000/api/employee/basic-info/'
    if(basicInfo.Emp_ID){
      api_url += basicInfo.Emp_ID.toString()+'/'
      formData.append('Emp_ID', basicInfo.Emp_ID);
    }
    axios({
      method: 'PUT',
      url: api_url,
      data: formData,
      headers: {
        'X-CSRFToken': this.state.token
      }
    }).then(success => {
      this.setState({
        basicInfo: {
          ...this.state.basicInfo,
          first_name: success.data.first_name,
          last_name: success.data.last_name,
          preferred_name: success.data.preferred_name,
          gender: success.data.gender,
          date_of_birth: success.data.date_of_birth
        },
        disabled: true
      })
    }).catch(error => {
      console.log(error);
    })
  }

render() {
  const {basicInfo} = this.state;
  return(
    <ExpansionPanel DefaultExpanded>
      <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
        <div className={this.props.classes.column}>
          <Typography className={this.props.classes.heading}>Basic Information</Typography>
          <Divider/>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={this.props.classes.details}>
        <div className="container">
          <div className={this.props.classes.rowPadding}>
            <div className="row">
              <div className='col-md-6'>
                <Typography className={this.props.classes.labelPadding}>First name: </Typography>

              </div>
              <div className='col-md-6'>
                <Input
                  name="first_name"
                  value={basicInfo.first_name}
                  onChange={(event)=> this.updateField(event)}
                  inputProps={{ 'aria-label': 'description' }}
                  disabled={this.state.disabled} />

              </div>
            </div>
          </div>
          <div className={this.props.classes.rowPadding}>
            <div className="row">
              <div className='col-md-6'>
                <Typography className={this.props.classes.labelPadding}>Last name: </Typography>

              </div>
              <div className='col-md-6'>
                <Input
                  name="last_name"
                  value={basicInfo.last_name}
                  onChange={(event)=> this.updateField(event)}
                  inputProps={{ 'aria-label': 'description' }}
                  disabled={this.state.disabled} />

              </div>
            </div>
          </div>

          <div className={this.props.classes.rowPadding}>
            <div className="row">
              <div className='col-md-6'>
                <Typography className={this.props.classes.labelPadding}>Preferred name: </Typography>

              </div>
              <div className='col-md-6'>
                <Input
                  name="preferred_name"
                  // value={basicInfo.preferred_name}
                  value={basicInfo.preferred_name}
                  onChange={(event)=> this.updateField(event)}
                  inputProps={{ 'aria-label': 'description' }}
                  disabled={this.state.disabled} />

              </div>
            </div>
          </div>

          <div className={this.props.classes.rowPadding}>
            <div className="row">
              <div className='col-md-6'>
                <Typography className={this.props.classes.labelPadding}>Gender</Typography>
              </div>
              <div className='col-md-6'>
                <Select name="gender" labelId="label" id="select"
                  value={basicInfo.gender} disabled={this.state.disabled}
                  onChange={(event)=> this.updateField(event)}>
                  {this.state.genderType.map((gender, index) => {
                    return <MenuItem value={gender} key={index}>{gender}</MenuItem>
                  })}
                </Select>

              </div>
            </div>
          </div>

          <div className={this.props.classes.rowPadding}>
            <div className="row">
              <div className='col-md-6'>
                <Typography className={this.props.classes.labelPadding}>Date of Birth: </Typography>

              </div>
              <div className='col-md-6'>
                  <DatePicker
                      name="date_of_birth"
                      disableFuture
                      disabled={this.state.disabled}
                      openTo="year"
                      format="dd/MM/yyyy"
                      views={["year", "month", "date"]}
                      value={basicInfo.date_of_birth}
                      onChange={(event) => this.updateField(event)}
                    />
              </div>
            </div>
          </div>

          <div className={this.props.classes.rowPadding}>
            <div className="row">
              <div className='col-md-6'>
                <Typography className={this.props.classes.labelPadding}>Teams: </Typography>

              </div>
              <div className='col-md-6'>
                <div className={this.props.classes.labelPadding}>
                  <span className="badge badge-pill table-data-span">
                    HR App <span className="circle-style" style={{'backgroundColor': 'red'}}>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExpansionPanelDetails>
    <Divider />
    <ExpansionPanelActions>
      {
        this.state.disabled ?
        (
          <Button size="small" onClick={() => this.setdisabled()}>Edit</Button>

        ) : (
          <div>
            <Button size="small" onClick={() => this.setdisabled()}>Cancel</Button>
            <Button size="small" onClick={(event) => this.updateBasicInfo(event)} color="primary">Save</Button>
          </div>
        )
      }
    </ExpansionPanelActions>
    </ExpansionPanel>
  )
}
}
export default BasicInfo;
