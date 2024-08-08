import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// lists the address and balance in the ethereum network
task("accounts", "List of all accounts and balances", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners(); // accounts present in hardhat local blockchain
  
  for(const account of accounts) {
    const address = await account.getAddress(); // get the public address of signer
    const balance = await hre.ethers.provider.getBalance(address); // get the balance present in each account address
    console.log(address + ":" + hre.ethers.formatEther(balance)); // format the wei into ether tokens
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {}
  }
};

export default config;
