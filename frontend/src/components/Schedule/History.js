import React, {forwardRef, useState} from "react";

import {
  Typography,
  FormControl,
  SendIcon,
  Button,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';

import {
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  FilterList,
  Search,
  ArrowDownward,
  Clear,
  SaveAlt
} from '@material-ui/icons';

import MaterialTable from 'material-table'

{/*
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
*/}

export default function History() {

  const tableIcons = {

    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),

  };

  const [leave, setLeave] = useState('');

  const handleChange = (event) => {
    setLeave(event.target.value);
  };

    return (
      <div className="MainContainer">
        <MaterialTable
          icons={tableIcons}
          title="History"
          columns={[
            { title: 'Requested Date', field: 'requestedDate', type: 'date' },
            { title: 'Category', field: 'category' },
            { title: 'From', field: 'from', type: 'date' },
            { title: 'To', field: 'to', type: 'date'},
            { title: 'Outcome', field: 'outcome' },
          ]}
          data={[
            { requestedDate: '08/09/2020', category: 'Overtime', from: '26/09/2020', to: '28/09/2020', outcome: 'Approved' },
            { requestedDate: '07/09/2020', category  : 'Annual', from: '27/10/2020', to: '20/10/2020', outcome: 'Declined' },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              fontWeight: 'bold'
            },
            exportButton: true
          }}
        />


        {/*
        <form autoComplete="off">
          <FormControl className="drop-down" required>
            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={leave}
              onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Sick Leave</MenuItem>
              <MenuItem value={2}>Annual Leave</MenuItem>
              <MenuItem value={3}>Parental Leave</MenuItem>
              <MenuItem value={4}>Personal/carer’s Leave</MenuItem>
              <MenuItem value={5}>Compassionate Leave</MenuItem>
              <MenuItem value={6}>Community service Leave</MenuItem>
              <MenuItem value={7}>Long service Leave</MenuItem>
              <MenuItem value={8}>Birthday Leave</MenuItem>
            </Select>

          </FormControl>


        </form>
        */}
      </div>

    )
}
