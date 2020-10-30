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

class AttritionReport extends Component {s
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
          title="Attrition Report"
          columns={[
            { title: 'Employee ID', field: 'employeeID', type: 'text' },
            { title: 'Name', field: 'name', type: 'text' },
            { title: 'Termination Date', field: 'terminationDate', type:'date' },
            { title: 'Reason', field: 'reason', type:'text' },
            { title: 'Manager(s)', field: 'manager', type:'text' },
            { title: 'Employment Duration', field: 'duration', type:'text' },
            { title: 'Branch', field: 'branch', type:'text' },
          ]}
          data={[
            { employeeID: 'U2611', name: 'John Oliver', terminationDate: '11/09/2010', reason: 'Performance', manager: 'Shane DSilva', duration: '< 1 month', branch: 'Sydney'  },
            { employeeID: 'U3937', name: 'Karen Green', terminationDate: '12/03/2013', reason: 'Other Employment', manager: 'Nielsen David', duration: '4 month', branch: 'Melbourne'},
            { employeeID: 'U9172', name: 'John Oliver', terminationDate: '17/06/2015', reason: 'Attendance', manager: 'Anjan Rai', duration: '1 year', branch: 'Brisbane' },
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

export default AttritionReport;
