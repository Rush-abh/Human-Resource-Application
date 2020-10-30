import React, { useState, useEffect } from "react";
import IDSection from "./IDSection";
import BankDetailSection from "./BankDetailSection";
import TaxSection from "./TaxSection";

import axios from 'axios';
import Cookies from 'js-cookie';

export default function LegalPage() {

  let [residency_status, setResidencyStatus] = useState('');
  let [payroll_details, setPayrollDetails] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/employee/residency-status/?emp_id=1',
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken')
      }
    }).then(success => {

      residency_status = setResidencyStatus(success.data[0]);

    }).catch(error=> {
      console.log(error)
    });

    axios({
      method: 'get',
      url: 'http://localhost:8000/api/employee/payroll/?emp_id=1',
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken')
      }
    }).then(success => {

      payroll_details = setPayrollDetails(success.data[0]);

    }).catch(error=> {
      console.log(error)
    });
  }, []);

    return <div className="row">
        <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2" >

            <div className="section-wrapper">
                <IDSection {...residency_status} />
            </div>
            <div className="section-wrapper">
                <BankDetailSection {...payroll_details} />
            </div>
            {/*<div className="section-wrapper">
                <TaxSection/>
            </div>*/}
        </div>
    </div>
}
