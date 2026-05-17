import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

// Load the private key from the .env file.
// It must be a valid 64-character hexadecimal string (the Private Key, not the Public Address).
const privateKey = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      // Hardhat expects the private key used to sign transactions
      accounts: [privateKey]
    }
  }
};

export default config;
