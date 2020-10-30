import React from "react";
import { Link } from "react-router-dom";
import hrAppBackend from "../../apis/hrAppBackend";
import PublicCardModal from "../commons/PublicCardModal";
import MyVerticallyCenteredModal from "../commons/PublicCard";

export default class JobInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_id: JSON.parse(localStorage.getItem("user")).id,
            employee: {
                projects: [],
                report_to: {
                    first_name: "",
                    last_name: "",
                    Emp_ID: ""
                }
            },
            compensation: {
                effective_date: "",
                pay_rate: "",
                pay_schedule: "",
                pay_type: ""
            },
            goal: {
                effective_date: "",
                goal_three_months: "",
                goal_six_months: "",
                goal_twelve_months: ""
            },
            openModal: false,
            active_manager: 0,
        }

    }

    componentDidMount() {
        // get employee data
        hrAppBackend.get(`/employee/job-info/?login_id=${this.state.login_id}`)
            .then(success => {
                this.setState({
                    ...this.state,
                    employee: success.data
                })
            })
            .catch(error => {
                console.log(error)
            })

        // get employee compensation data
        hrAppBackend.get(`/employee/compensation/?employee_id=${this.state.login_id}`)
            .then(success => {
                if (success.data.length) {
                    this.setState({
                        ...this.state,
                        compensation: success.data[0]
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

        // get employee goals data
        hrAppBackend.get(`/goal/?employee_id=${this.state.login_id}`)
            .then(success => {
                this.setState({
                    ...this.state,
                    goal: success.data[0]
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    popModal(empId) {
        // alert(empId);
        this.setState({
            ...this.state,
            openModal: true,
            active_manager: empId
        })
        // return <PublicCardModal open={true}/>
    }

    hideModal() {
        this.setState({
            ...this.state,
            openModal: false
        })
    }

    render() {
        console.log(this.state);
        const { employee, compensation, goal } = this.state;
        // const {compensation} = this.state;
        return <div className="row jobinfo-flex-wrapper">
            <MyVerticallyCenteredModal show={this.state.openModal} onHide={() => this.hideModal()}
                employee_id={this.state.active_manager}
            />
            <div className="col-12 col-sm-6 col-lg-5">
                <div className="section-wrapper">
                    <h6 className="section-header-style">Employment</h6>
                    <table>
                        <tbody>
                            <tr className="jobinfo-table-row-style">
                                <td>Effective date</td>
                                <td className="attribute-style">{employee.start_date}</td>
                            </tr>
                            <tr>
                                <td>Employment status</td>
                                <td className="attribute-style">{employee.employee_status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="section-wrapper">
                    <h6 className="section-header-style">Job Info</h6>
                    <table>
                        <tbody>
                            <tr className="jobinfo-table-row-style">
                                <td>Effective date</td>
                                <td className="attribute-style">{employee.start_date}</td>
                            </tr>
                            <tr>
                                <td>Job Title</td>
                                <td className="attribute-style">{employee.position}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td className="attribute-style">Melbourne Office</td>
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td className="attribute-style">IT</td>
                            </tr>
                            <tr>
                                <td>Manager</td>
                                <td className="attribute-style">
                                    {employee.projects.map(project => <Link to="#" className="link-style-class-grey" onClick={(event) => this.popModal(project.project_leader.Emp_ID)}>
                                        {project.project_leader.first_name + " " + project.project_leader.last_name}
                                        <i className="fa fa-chevron-right"></i>
                                    </Link>
                                    )}

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/*This is for compensation section*/}
                <div className="section-wrapper">
                    <h6 className="section-header-style">Compensation</h6>
                    <table>
                        <tbody>
                            <tr className="jobinfo-table-row-style">
                                <td>Effective date</td>
                                <td className="attribute-style">{compensation.effective_date}</td>
                            </tr>
                            <tr>
                                <td>Pay-rate</td>
                                <td className="attribute-style">{`AUD ${compensation.pay_rate} per hour`}</td>
                            </tr>
                            <tr>
                                <td>Pay Schedule</td>
                                <td className="attribute-style">{compensation.pay_schedule}</td>
                            </tr>
                            <tr>
                                <td>Pay Type</td>
                                <td className="attribute-style">{compensation.pay_type}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-5">
                <div className="section-wrapper">
                    <h6 className="section-header-style">Goals</h6>
                    <table>
                        <tbody>
                            <tr className="jobinfo-table-row-style">
                                <td>Effective date</td>
                                <td className="attribute-style">{goal.effective_date}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="timeline-content">
                        <ul className="timeline">
                            <li className="event">
                                <h6 className="section-header-style-no-underline">3 months goal</h6>
                                <p>{goal.goal_three_months}</p>
                                <Link to="/" className="link-style-class-grey">View Feedback</Link><br />
                                _
                            </li>
                            <li className="event-active">
                                <h6 className="section-header-style-no-underline">6 months goal</h6>
                                <p>{goal.goal_six_months}</p>
                                _
                            </li>
                            <li className="event">
                                <h6 className="section-header-style-no-underline">12 months goal</h6>
                                <p>{goal.goal_twelve_months}</p>
                                _
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
}