import React from 'react';
import {Collapse} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

export default (props) => {
	return(
		<Collapse in={props.displayToast}>
			<Alert variant="outlined" severity={props.severity} onClose={() => {props.updateDisplayToast(false)}}>
			{props.displayMessage}</Alert>
		</Collapse>
		)
}