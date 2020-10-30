import React from "react";

import SendRequest from "./Components/SendRequest.js";
import PendingApprovals from "./Components/PendingApprovals.js";


export default function Requests() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <SendRequest/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <PendingApprovals/>
        </div>
      </div>
    </div>
  )
}
