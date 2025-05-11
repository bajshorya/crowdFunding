import { ethers } from "ethers";
import * as FundMeAbi from "../out/FundMe.sol/FundMe.json";
const CONTRACT_ADDRESS = "0xa5d16D02bfF5e2b3d944B2a654fe6e31920F7BCe";
const RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://sepolia.infura.io/v3/<YOUR_INFURA_PROJECT_ID>";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "<YOUR_PRIVATE_KEY>";

async function main() {
  // Initialize provider and wallet
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, FundMeAbi.abi, wallet);

  // Fund the contract
  console.log("Funding contract...");
  const tx = await contract.fund({ value: ethers.parseEther("0.1") });
  await tx.wait();
  console.log(`Funded! Transaction hash: ${tx.hash}`);

  // Check funding amount
  const amount = await contract.getAddressToAmountFunded(wallet.address);
  console.log(`Funded amount: ${ethers.formatEther(amount)} ETH`);

  // Check owner
  const owner = await contract.getOwner();
  console.log(`Contract owner: ${owner}`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
