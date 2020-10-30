
import React, { useState } from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import Cookies from 'js-cookie';
import hrAppBackend from "../../../apis/hrAppBackend";



class EmergencyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      loginId: JSON.parse(localStorage.getItem("user")).id,
      emergencyProfile: {
        first_name: '',
        last_name: '',
        relation: '',
        mobile_number: '',
        telephone_number: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postcode: '',
        id: 4
      },
      token: Cookies.get('csrftoken')
    }
  }



  componentDidMount() {

    hrAppBackend.get(`emergency-contact/?login_id=${this.state.loginId}`)
      .then(success => {
        this.setState({
          ...this.state,
          emergencyProfile: success.data[0]
        })
      })
      .catch(error => {
        console.log(error)
      })
  }


  setdisabled() {
    this.state.disabled ? this.setState({ disabled: false }) : this.setState({ disabled: true })
  }

  updateField(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      emergencyProfile: {
        ...this.state.emergencyProfile,
        [name]: value
      }
    })
  }


  updateEmergencyContact(event) {
    event.preventDefault();
    let formData = new FormData();
    let { emergencyProfile } = this.state;
    formData.append('first_name', emergencyProfile.first_name);
    formData.append('last_name', emergencyProfile.last_name);
    formData.append('relation', emergencyProfile.relation);
    formData.append('mobile_number', emergencyProfile.mobile_number);
    formData.append('telephone_number', emergencyProfile.telephone_number);
    formData.append('street', emergencyProfile.street);
    formData.append('city', emergencyProfile.city);
    formData.append('state', emergencyProfile.state);
    formData.append('country', emergencyProfile.country);
    formData.append('postcode', emergencyProfile.postcode);
    let api_url = 'http://127.0.0.1:8000/api/emergency-contact/'
    if (emergencyProfile.id) {
      api_url += emergencyProfile.id.toString() + '/'
      formData.append('id', emergencyProfile.id);
    }
    hrAppBackend.put(`emergency-contact/${this.state.emergencyProfile.id}/`, formData)
      .then(success => {
        this.setState({
          emergencyProfile: {
            ...this.state.emergencyProfile,
            full_name: success.data.first_name,
            full_name: success.data.last_name,
            mobile_number: success.data.mobile_number,
            telephone_number: success.data.telephone_number,
            street: success.data.street,
            city: success.data.city,
            state: success.data.state,
            country: success.data.country,
            postcode: success.data.postcode,
          },
          disabled: true
        })
      }).catch(error => {
        console.log(error);
      })
  }


  render() {
    const { emergencyProfile } = this.state;
    console.log(emergencyProfile);
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={this.props.classes.column}>
            <Typography className={this.props.classes.heading}>Emergency Contact</Typography>
            <Divider />
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
                  <Input value={this.state.emergencyProfile.first_name} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="first_name"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>

            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Last Name: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.last_name} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="last_name"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>

            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Relation: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.relation} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="relation"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Mobile Number: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.mobile_number} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="mobile_number"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Telephone Number: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.telephone_number} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="telephone_number"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Street: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.street} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="street"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>City: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.city} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="city"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>State: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.state} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="state"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Country: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.country} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="country"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Postcode: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input value={this.state.emergencyProfile.postcode} inputProps={{ 'aria-label': 'description' }}
                    onChange={(event) => this.updateField(event)} name="postcode"
                    disabled={this.state.disabled}
                  />
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
                <Button size="small" onClick={() => this.setdisabled(!this.state.disabled)}>Edit</Button>
              ) : (
                <div>
                  <Button size="small" onClick={() => this.setdisabled(!this.state.disabled)}>Cancel</Button>
                  <Button size="small" onClick={(event) => this.updateEmergencyContact(event)} color="primary">Save</Button>
                </div>

              )
          }
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}
export default EmergencyInfo;
