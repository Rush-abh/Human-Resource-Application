import React, {useState} from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import Cookies from 'js-cookie';


class GPInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      disabled: true,
      loginId: JSON.parse(localStorage.getItem("user")).id,
      token: Cookies.get('csrftoken'),
      generalPractitioner: {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        telephoneNumber: "",
        street: "",
        state: "",
        postcode: "",
        id: ""
      }
    }
  }

  componentDidMount(){
    let apiURL = 'http://localhost:8000/api/employee/general-practitioner/'
    if(this.state.loginId){
      apiURL += '?login_id='+this.state.loginId.toString()
    }
    axios({
      method: 'get',
      url: apiURL,
      headers: {
        'X-CSRFToken': this.state.token
      }
    }).then(success => {
      let gp = success.data[0];
      let gpData = {}
      gpData.firstName = gp.first_name
      gpData.lastName = gp.last_name
      gpData.mobileNumber = gp.mobile_number
      gpData.telephoneNumber = gp.telephone_number
      gpData.street = gp.street
      gpData.state = gp.state
      gpData.postcode = gp.postcode.toString()
      gpData.id = gp.id
      // console.log(success.data);
      this.setState({
        generalPractitioner: gpData
      })
    }).catch(error => {
      console.log(error);
    })
  }

  setEditable(){
    this.state.disabled ? this.setState({disabled: false}): this.setState({disabled: true})
  }

  updateField(event){
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      generalPractitioner: {
        ...this.state.generalPractitioner,
        [name]: value
      }
    })
  }

  updateGeneralPractitioner(event){
    event.preventDefault();
    let {generalPractitioner} = this.state;
    let formData = new FormData();
    formData.append('first_name', generalPractitioner.firstName);
    formData.append('last_name', generalPractitioner.lastName);
    formData.append('mobile_number', generalPractitioner.mobileNumber);
    formData.append('telephone_number', generalPractitioner.telephoneNumber);
    formData.append('street', generalPractitioner.street);
    formData.append('state', generalPractitioner.state);
    formData.append('postcode', generalPractitioner.postcode);
    let apiURL = 'http://localhost:8000/api/employee/general-practitioner/'
    if(generalPractitioner.id){
      apiURL += generalPractitioner.id.toString()+"/"
    }
    axios({
      method: 'put',
      data: formData,
      url: apiURL,
      headers: {
        'X-CSRFToken': this.state.token
      }
    }).then(success => {
      this.setState({
        generalPractitioner: {
          ...this.state.generalPractitioner,
          firstName: success.data.first_name,
          lastName: success.data.last_name,
          mobileNumber: success.data.mobile_number,
          telephoneNumber: success.data.telephone_number,
          street: success.data.street,
          state: success.data.state,
          postcode: success.data.postcode,
          // id: success.data.id
        },
        disabled: true
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render(){
    console.log(this.state);
    let {generalPractitioner} = this.state;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={this.props.classes.column}>
            <Typography className={this.props.classes.heading}>General Practioner</Typography>
            <Divider/>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={this.props.classes.details}>
          <div className="container">
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>First Name: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="firstName" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.firstName}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Last Name: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="lastName" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.lastName}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Mobile Number: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="mobileNumber" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.mobileNumber}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Telephone Number: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="telephoneNumber" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.telephoneNumber}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Street: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="street" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.street}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>State: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="state" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.state}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Post code: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="postcode" inputProps={{ 'aria-label': 'description' }} 
                    disabled={this.state.disabled} value={generalPractitioner.postcode}
                    onChange={(event)=> this.updateField(event)}/>
                </div>
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider/>
        <ExpansionPanelActions>
          {
            this.state.disabled ?
            (
              <Button size="small" onClick={() => this.setEditable()}>Edit</Button>
            ) : (
              <div>
                <Button size="small" onClick={() => this.setEditable()}>Cancel</Button>
                <Button size="small" color="primary" 
                  onClick={(event)=> this.updateGeneralPractitioner(event)}>Save</Button>
              </div>
            )
          }
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

export default GPInfo;
