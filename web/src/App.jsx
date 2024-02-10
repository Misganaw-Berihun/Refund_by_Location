import React, { useState } from "react";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import { ethers } from "ethers";
import ComplianceContractABI from "./ComplianceContractABI.json";

const contractAddress = "0xABD275b4A0Fcef6Dbf78CE361E019Cd2d3457c7a";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  contractAddress,
  ComplianceContractABI,
  signer
);

async function sendCurrentLocation(currentLongitude, currentLatitude) {
  const tx = await contract.sendCurrentLocation(
    currentLongitude,
    currentLatitude
  );
  await tx.wait();
  console.log("Location sent successfully");
}

async function checkCompliance(driverAddress) {
  const tx = await contract.checkCompliance(driverAddress);
  await tx.wait();
  console.log("Compliance checked successfully");
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected to Ethereum wallet");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    console.error("No Ethereum wallet detected");
  }
}

function App() {
  return (
    <div>
      <CreateEmployee />
      <EmployeeList />
    </div>
  );
}

export default App;
