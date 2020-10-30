import React from "react";
import {Link} from "react-router-dom";


export default function TaxSection () {

    return <div>
        <h6 className="section-header-style">TFN & Super</h6>
        <table>
            <tbody>
            <tr>
                <td>TFN</td>
                <td className="attribute-style">123456</td>
              
            </tr>
            <tr>
                <td>Super</td>
                <td className="attribute-style">2356125</td>

            </tr>
            </tbody>
        </table>
    </div>
}
