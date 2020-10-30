import React from 'react';
import {Link} from "react-router-dom";

export default function IDSection (props) {

    let fields = [
        {
            'name': 'Passport',
            'value': props.pp_number
        },
        {
            'name': 'Passport Issue Date',
            'value': props.pp_issue_date
        },
        {
            'name': 'Passport Expiry Date',
            'value': props.pp_issue_date
        },
        {
            'name': 'Passport Country',
            'value': props.pp_country
        },
        {
            'name': 'Driver License',
            'value': props.dl_number
        },
        {
            'name': 'Driver License Expiry Date',
            'value': props.dl_expiry_date
        },
        {
            'name': 'Driver License State',
            'value': props.dl_state
        },
        {
            'name': 'Visa Number',
            'value': props.visa_number
        },
        {
            'name': 'Visa Class',
            'value': props.visa_class
        },
        {
            'name': 'Visa Expiry Date',
            'value': props.visa_expiry
        },
        {
            'name': 'Visa Restrictions',
            'value': props.visa_restrictions
        },
    ]

    return <div>
        <div className="row bank-section-header-wrapper">
            <h6 className="section-header-style">
                Citizenship
            </h6>
            <table>
                <tbody>
                <tr>
                  <td>Residence Status</td>
                  <td className="attribute-style">{props.residency_status}</td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td className="attribute-style">India</td>
                </tr>
                {fields.map((doc, index) => {
                    return <tr key={index}>
                        <td>{doc.name}</td>
                        <td className="attribute-style">{doc.value}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
}
