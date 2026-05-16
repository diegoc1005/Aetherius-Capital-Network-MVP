import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // We are using dummy addresses for the registrar and encrypted storage for testnet deployment.
  const dummyRegistrar = "0x0000000000000000000000000000000000000001";
  const dummyEncryptedStorage = "0x0000000000000000000000000000000000000002";

  const aetheriusEquity = await ethers.deployContract("AetheriusEquity", [
    "Aetherius Equity",
    "AEQ",
    dummyRegistrar,
    dummyEncryptedStorage
  ]);

  await aetheriusEquity.waitForDeployment();

  console.log("AetheriusEquity deployed to:", await aetheriusEquity.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
