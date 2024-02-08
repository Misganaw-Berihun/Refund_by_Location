import React, { useState } from "react";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <div>
      <CreateEmployee />
      <EmployeeList />
    </div>
  );
}

export default App;
