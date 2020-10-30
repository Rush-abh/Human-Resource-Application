import React from "react";
import {Modal} from "react-bootstrap";

export default (props) => {
    return <div>
        <Modal show={props.show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <div style={{width: 600}}>
                <label style={{width: 400}}>Event Date</label><br/>
                <span>{props.selectedDate}</span><br/>
                <label style={{width: 400}}>Event Start Time</label><br/>
                <input type="time"/><br/>
                <label style={{width: 400}}>Event End Time</label><br/>
                <input type="time" placeholder={""}/><br/>
                <button style={{marginTop: 10}}>Save</button>
            </div>
          </Modal.Body>
        </Modal>
    </div>
}