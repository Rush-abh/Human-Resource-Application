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

class LeaveReport extends Component {s
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
          title="Leave Balance Report"
          columns={[
            { title: 'Employee ID', field: 'employeeID', type: 'text' },
            { title: 'Name', field: 'name', type: 'text' },
            { title: 'Starting Balance', field: 'startingBalance', type: 'text' },
            { title: 'Accrued', field: 'accrued', type: 'text' },
            { title: 'Used', field: 'used', type:'text' },
            { title: 'Scheduled', field: 'scheduled', type:'text' },
            { title: 'Remaining Balance', field: 'remainingBalance', type:'text' },
          ]}
          data={[
            { employeeID: 'U2611', name: 'John Oliver', startingBalance: '40.00', accrued: '0.00',  used: '0.00', scheduled: '0.00', remainingBalance: '40.00' },
            { employeeID: 'U3937', name: 'Karen Green', startingBalance: '16.00', accrued: '2.00', used: '0.00', scheduled: '0.00', remainingBalance: '18.00' },
            { employeeID: 'U9172', name: 'John Oliver', startingBalance: '23.00', accrued: '1.00', used: '3.00', scheduled: '0.00', remainingBalance: '21.00' },
          ]}
          options={{
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

export default LeaveReport;
