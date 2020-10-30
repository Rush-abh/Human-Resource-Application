import React from "react";
import {Modal} from "react-bootstrap";
import hrAppBackend from "../../apis/hrAppBackend";


export default class MyVerticallyCenteredModal extends React.Component {
  constructor(props){
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      showModal: props.show,
      profile_pic : require('../../img/alt-profile-pic.png'),
      employee: {
        user_name: '',
        designation: '',
        intro: '',
        team: '',
        preferredName: '',
        email: '',
        mobile: '',
        birthday: ''
      }
    }
  }

  componentDidMount(){
    // if there is any update in props, then this lifecycle is executed.
    if(!!this.props.employee_id){
      hrAppBackend.get(`/employee/${this.props.employee_id}/`)
      .then(success => {
        this.setState({
          ...this.state,
          employee: success.data
        })
      }).catch(error=> {
        console.log(error);
      })
    }
  }

  componentDidUpdate (prevProps) {
    if(this.props.employee_id !== prevProps.employee_id){
      hrAppBackend.get(`/employee/${this.props.employee_id}/`)
      .then(success => {
        this.setState({
          ...this.state,
          employee: success.data,
          employee_id: this.props.employee_id
        })
      }).catch(error=> {
        console.log(error);
      })
    }
    if(this.props.show !== prevProps.show){
      this.setState({
        ...this.state,
        showModal: this.props.show
      })
    }
  }

  hideModal(){
    this.props.onHide();
  }

  render(){
    const {employee} = this.state;
    console.log(employee);
    return (
      <div ref={this.wrapper}>
        <Modal show={this.state.showModal} size="sm" aria-labelledby="contained-modal-title-vcenter" centered onHide={() => this.hideModal()}>
          <Modal.Header closeButton/>
          <Modal.Body>
            <div className="col-12" style={this.state.cardContainer}>
              <div className="avatar-container">
                  <img src={this.state.profile_pic} className="avatar-image-style"/><br/>
                  {employee.user_name}<br/>
                  <small>{employee.designation}</small><br/>
                  {employee.intro}
                  {`Currently I am part of ${employee.team}`}
              </div>
              <div>
                  <table className="table table-responsive table-borderless public-card-table-style">
                      <tbody>
                          <tr>
                              <td className="public-card-table-first-column-style">Full Name:</td>
                              <td>{employee.first_name+ " "+employee.last_name}</td>
                          </tr>
                          <tr>
                              <td>Preferred Name:</td>
                              <td>{employee.preferred_name}</td>
                          </tr>
                          <tr>
                              <td>Email:</td>
                              <td>{employee.company_email_address}</td>
                          </tr>
                          <tr>
                              <td>Mobile Number:</td>
                              <td>{employee.mobile_number}</td>
                          </tr>
                          <tr>
                              <td>Birthday:</td>
                              <td>{employee.date_of_birth}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  
}