import React, { useState } from "react";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import { ethers } from "ethers";
import ComplianceContractABI from "./ComplianceContractABI.json";

function App() {
  return (
    <div>
      <CreateEmployee />
      <EmployeeList />
    </div>
  );
}

export default App;
