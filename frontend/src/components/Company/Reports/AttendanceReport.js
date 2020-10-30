import React, {forwardRef, Component} from "react";


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

import MaterialTable from 'material-table';

class AttendanceReport extends Component {s
  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(this.props.location.state.details);
  }

  render() {
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

    return(
      <div>
      <MaterialTable
        icons={tableIcons}
        title="Attendance Report"
        columns={[
          { title: 'Employee ID', field: 'employeeID', type: 'text' },
          { title: 'Name', field: 'name', type: 'text' },
          { title: 'Position', field: 'position', type: 'text' },
          { title: 'Department', field: 'department', type: 'text' },
          { title: '# of Days Absent', field: 'noDaysAbsent', type:'text' },
        ]}
        data={[
          { employeeID: 'U2611', name: 'John Oliver', position: 'Overtime', department: 'IT',  noDaysAbsent: '3' },
          { employeeID: 'U3937', name: 'Karen Green', position: 'Annual', department: 'HR', noDaysAbsent: '1' },
          { employeeID: 'U9172', name: 'John Oliver', position: 'Annual', department: 'Marketing', noDaysAbsent: '5' },
        ]}
        options={{
          filtering: true,
          headerStyle: {
            fontWeight: 'bold'
          },
          exportButton: true
        }}
      />
      </div>
    )
  }
}

export default AttendanceReport;
