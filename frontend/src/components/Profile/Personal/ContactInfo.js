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
import hrAppBackend from "../../../apis/hrAppBackend";

    //contact info class
    class ContactInfo extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          disabled: true,
          loginId: JSON.parse(localStorage.getItem("user")).id,
          profilecontact: {
            company_email_address: '',
            mobile_number: '',
            telephone_number: '',
            street: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            id: 0
          },
          token: Cookies.get('csrftoken')
        }
      }

    componentDidMount(){

      hrAppBackend.get('/employee')
        .then(success => {
            this.setState({
                profilecontact: success.data[0]
            })
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
            profilecontact: {
                ...this.state.profilecontact,
                [name]: value
            }
        })
    }

  updateProfileContact(event){
    event.preventDefault();
    let formData = new FormData();
    let {profilecontact} = this.state;
    formData.append('company_email_address', profilecontact.company_email_address);
    formData.append('mobile_number', profilecontact.mobile_number);
    formData.append('telephone_number', profilecontact.telephone_number);
    formData.append('street', profilecontact.street);
    formData.append('city', profilecontact.city);
    formData.append('state', profilecontact.state);
    formData.append('postcode', profilecontact.postcode);
    formData.append('country', profilecontact.country);
    let api_url = 'http://localhost:8000/api/employee/profile-contact/'
    if(profilecontact.id){
      api_url += profilecontact.id.toString()+'/'
      }
    axios({
      method: 'put',
      url: api_url,
      data: formData,
      headers: {
        'X-CSRFToken': this.state.token
      }
    }).then(success => {
      this.setState({
        profilecontact: {
          ...this.state.profilecontact,
          company_email_address: success.data.company_email_address,
          mobile_number: success.data.mobile_number,
          telephone_number: success.data.telephone_number,
          street: success.data.street,
          city: success.data.city,
          state: success.data.state,
          postcode: success.data.postcode,
          country: success.data.country,
        },
        disabled: true
      })
    }).catch(error => {
      console.log(error);
    })
  }

  render(){
    const {profilecontact} = this.state;
    console.log(profilecontact);
        return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
            <div className={this.props.classes.column}>
              <Typography className={this.props.classes.heading}>Contact Information</Typography>
              <Divider/>
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={this.props.classes.details}>
            <div className="container">
              <div className={this.props.classes.rowPadding}>
                <div className="row">
                  <div className='col-md-6'>
                    <Typography className={this.props.classes.labelPadding}>Email: </Typography>
                  </div>
                  <div className='col-md-6'>
                    <Input name="company_email_address" labelId="label" id="select"
                    value={profilecontact.company_email_address} inputProps={{ 'aria-label' : 'description'}}
                    onChange={(event)=> this.updateField(event)}
                    disabled={true}
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
                    <Input value={profilecontact.mobile_number} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
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
                    <Input value={profilecontact.telephone_number} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
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
                    <Input value={profilecontact.street} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
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
                    <Input name="city" value={profilecontact.city} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
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
                    <Input value={profilecontact.state} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
                        disabled={this.state.disabled}
                    />
                  </div>
                </div>
              </div>
               <div className={this.props.classes.rowPadding}>
                <div className="row">
                  <div className='col-md-6'>
                    <Typography className={this.props.classes.labelPadding}>PostCode: </Typography>
                  </div>
                  <div className='col-md-6'>
                    <Input value={profilecontact.postcode} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
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
                    <Input value={profilecontact.country} inputProps={{ 'aria-label': 'description' }}
                        onChange={(event)=> this.updateField(event)}
                        disabled={this.state.disabled}
                    />
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
                <Button size="small" onClick={() => this.setdisabled(!this.state.disabled)}>Edit</Button>

              ) : (
                <div>
                  <Button size="small" onClick={() => this.setdisabled(!this.state.disabled)}>Cancel</Button>
                  <Button size="small" color="primary" onClick= {(event) => this.updateProfileContact(event)}>Save</Button>
                </div>
              )
            }
          </ExpansionPanelActions>
        </ExpansionPanel>
      )
    }
  }

export default ContactInfo;
