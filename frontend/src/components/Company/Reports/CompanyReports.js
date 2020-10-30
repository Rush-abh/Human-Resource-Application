import React, {forwardRef, Component} from "react";
import "../CompanyPage.css";

import {DatePicker} from '@material-ui/pickers';
import {Typography, TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select, Button}  from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

import {Link} from 'react-router-dom';

class CompanyReports extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reports: {
        reportType: '',
        department: '',
        employee: '',
        fromDate: null,
        toDate: null
      }
    }
  }

  updateField(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      reports: {
        ...this.state.reports,
        [name]: value
      }
    })
  }

  updateDate = (name, date) => {
    this.setState({
      reports:{
        ...this.state.reports,
        [name]: date
      }
    });
  }

  updateEmployee = (event, value) => {
    this.setState({
      reports: {
        ...this.state.reports,
        employee: value
      }
    })
  }

  updateDepartment = (event, value) => {
    this.setState({
      reports: {
        ...this.state.reports,
        department: value
      }
    })
  }


  render() {
    const {reports} = this.state;

    const employees = [
      { name: 'John Oliver' },
      { name: 'Karen Green' },
      { name: 'Alastair Brown' },
    ];

    const employeeNames = {
      options: employees,
      getOptionLabel: (option) => option.name,
    };

    const departments = [
      { name: 'HR' },
      { name: 'IT' },
      { name: 'Marketing' },
    ];

    const departmentNames = {
      options: departments,
      getOptionLabel: (option) => option.name,
    };


    const renderGenerateButton = () => {
      let path = "";

      if(this.state.reports.reportType === 1)
        path = "company/reports/attendance"
      else if (this.state.reports.reportType===2)
        path = "company/reports/attrition"
      else
        path = "company/reports/leave"

      return (
        <Link to={{
          pathname: path,
          state: {details: this.state.reports}
          }}
          className="report-submit-btn">
          <Button
            type="submit"
            className="report-submit-btn"
            variant="contained"
            color="primary">
              Generate
          </Button>
        </Link>
      )
    }

    return (
      <div>
        <div className=" MainContainer offset-1">
          <Typography className="title" variant="h6">Company Reports</Typography>
          <hr className="dividers"/>

          <form>
          <div className="row">
            <div className="col-lg-3">
                <FormControl className="drop-down" required>
                  <InputLabel id="demo-simple-select-required-label">Report type</InputLabel>
                  <Select
                    labelId="reportType"
                    id="reportType"
                    name="reportType"
                    value={reports.reportType}
                    onChange={(event) => this.updateField(event)}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Attendance</MenuItem>
                    <MenuItem value={2}>Attrition</MenuItem>
                    <MenuItem value={3}>Leave Balance</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
            </div>
              {
                reports.reportType === ''
                ? (<div></div>) :
                (
                    <div className="col-lg-3">
                      <FormControl className="drop-down" required>
                        <Autocomplete
                          {...departmentNames}
                          className="auto-complete"
                          autoHighlight
                          onChange={(event, value) => this.updateDepartment(event, value)}
                          renderInput={(params) => <TextField {...params} name="department" label="Department" />}
                        />
                        <FormHelperText>Required</FormHelperText>
                      </FormControl>
                    </div>
                )
              }
              {
                reports.department === ''
                ? (<div></div>) :
                (
                  <div className="col-lg-3">

                    <FormControl className="drop-down" required>
                      <Autocomplete
                        {...employeeNames}
                        className="auto-complete"
                        autoHighlight
                        onChange={(event, value) => this.updateEmployee(event, value)}
                        renderInput={(params) => <TextField {...params} name="employee" label="Employee" />}
                      />
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </div>
                )
              }
              </div>
              {
                reports.employee === '' ? (<div></div>) :
                (<div>
                  <div className="row">
                    <div className="col-lg-3 date-field">
                     <DatePicker
                         autoOk="true"
                         name="fromDate"
                         label="From"
                         disableFuture
                         openTo="year"
                         format="dd/MM/yyyy"
                         views={["year", "month", "date"]}
                         value={reports.fromDate}
                         onChange={this.updateDate.bind(this, 'fromDate')}

                       />
                    </div>
                    <div className="col-lg-3 todate-left-margin">
                       <DatePicker
                           autoOk="true"
                           name="toDate"
                           label="To "
                           disableFuture
                           openTo="year"
                           format="dd/MM/yyyy"
                           views={["year", "month", "date"]}
                           value={reports.toDate}
                           onChange={this.updateDate.bind(this, 'toDate')}

                        />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-9 date-field">
                      <div className="report-submit-container">
                        {renderGenerateButton()}
                      </div>
                    </div>
                  </div>
                </div>
                )
              }
          </form>
        </div>
      </div>
  )
  }
}

export default CompanyReports;
