import React, {useState} from 'react';
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


class MedicalCardInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: true,
      loginId: JSON.parse(localStorage.getItem("user")).id,
      medicalProfile: {
        blood_type: '',
        allergies: '',
        special_condition: '',
        id: 0
      },
      bloodGroupType: ['+O', '+AB', '+A', '+B', '-O', '-AB', '-A', '-B'],
      token: Cookies.get('csrftoken')
    }
  }
  // const [disabled, setdisabled] = useState(false);

  componentDidMount(){

    hrAppBackend.get('/employee/medical-profile')
    .then(success => {
      this.setState({
        medicalProfile: success.data[0]
      })
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
      medicalProfile: {
        ...this.state.medicalProfile,
        [name]: value
      }
    })
  }

  updateMedicalProfile(event){
    event.preventDefault();
    let formData = new FormData();
    let {medicalProfile} = this.state;
    formData.append('blood_type', medicalProfile.blood_type);
    formData.append('allergies', medicalProfile.allergies);
    formData.append('special_condition', medicalProfile.special_condition);
    let api_url = 'http://localhost:8000/api/employee/medical-profile/'
    if(medicalProfile.id){
      api_url += medicalProfile.id.toString()+'/'
      formData.append('id', medicalProfile.id);
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
        medicalProfile: {
          ...this.state.medicalProfile,
          blood_type: success.data.blood_type,
          allergies: success.data.allergies,
          special_condition: success.data.special_condition
        },
        disabled: true
      })
    }).catch(error => {
      console.log(error);
    })
  }

  render(){
    const {medicalProfile} = this.state;
    console.log(medicalProfile);
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={this.props.classes.column}>
            <Typography className={this.props.classes.heading}>Medical Information</Typography>
            <Divider/>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={this.props.classes.details}>
          <div className="container">
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Blood type: </Typography>
                </div>
                <div className='col-md-6'>
                  <Select name="blood_type" labelId="label" id="select"
                    value={medicalProfile.blood_type} disabled={this.state.disabled}
                    onChange={(event)=> this.updateField(event)}>
                    {this.state.bloodGroupType.map((bloodGroup, index) => {
                      return <MenuItem value={bloodGroup} key={index}>{bloodGroup}</MenuItem>
                    })}
                  </Select>

                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Allergies: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="allergies" value={medicalProfile.allergies} inputProps={{ 'aria-label': 'description' }}
                      onChange={(event)=> this.updateField(event)}
                      disabled={this.state.disabled}
                  />
                </div>
              </div>
            </div>
            <div className={this.props.classes.rowPadding}>
              <div className="row">
                <div className='col-md-6'>
                  <Typography className={this.props.classes.labelPadding}>Special Conditions: </Typography>
                </div>
                <div className='col-md-6'>
                  <Input name="special_condition" value={medicalProfile.special_condition} inputProps={{ 'aria-label': 'description' }}
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
              <Button size="small" onClick={() => this.setdisabled()}>Edit</Button>

            ) : (
              <div>
                <Button size="small" onClick={() => this.setdisabled()}>Cancel</Button>
                <Button size="small" onClick={(event) => this.updateMedicalProfile(event)} color="primary">Save</Button>
              </div>
            )
          }
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

export default MedicalCardInfo;
