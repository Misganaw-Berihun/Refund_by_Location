const hre = require("hardhat");

async function main() {
  try {
    // const ownerAddress = "0x7d7eBFad17b19cd15d8241521A85a5cbc4D15d53";
    const [deployer] = await hre.ethers.getSigners();
    // console.log("Deploying contracts with the account:", ownerAddress);
    console.log(deployer.address);
    const ComplianceContract = await hre.ethers.getContractFactory(
      "ComplianceContract"
    );
    const complianceContract = await ComplianceContract.deploy();
    console.log(
      "ComplianceContract deployed to:",
      await complianceContract.getAddress()
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
