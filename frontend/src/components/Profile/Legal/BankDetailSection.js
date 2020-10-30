import React from "react";
import {Link} from "react-router-dom";


export default function BankDetailSection (props) {

    console.log(props);

    let fields = [
        {
            'name': 'Bank Name',
            'value': props.bank_name
        },
        {
            'name': 'Branch',
            'value': props.branch
        },
        {
            'name': 'Account Name',
            'value': props.account_name
        },
        {
            'name': 'BSB',
            'value': props.bsb
        },
        {
            'name': 'Account Number',
            'value': props.account_number
        },
        {
            'name': 'TFN',
            'value': props.tfn
        },
        {
            'name': 'Super Number',
            'value': props.super_number
        }
    ]

    return <div>
        <div className="row bank-section-header-wrapper">
            <div>
                <h6 className="section-header-style-no-underline">Payroll Details</h6>
            </div>
            <div>
                <Link to="#" className="link-style-class-grey-no-underline">
                    Edit <i className="fa fa-chevron-right"></i>
                </Link>
            </div>

        </div>
        <table>
            <tbody>
                {fields.map((doc, index) => {
                    return <tr key={index}>
                        <td>{doc.name}</td>
                        <td className="attribute-style">{doc.value}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}
