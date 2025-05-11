import { useState, useEffect } from "react";
import { BrowserProvider, JsonRpcSigner, Contract } from "ethers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FundForm from "./components/FundForm";
import WithdrawButton from "./components/WithdrawButton";
import FundersList from "./components/FundersList";
import FundMeABI from "./abis/FundMe.json";

const CONTRACT_ADDRESS = "0xa5d16D02bfF5e2b3d944B2a654fe6e31920F7BCe";

function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Provider = new BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        const signer = await web3Provider.getSigner();
        setSigner(signer);
        const contractInstance = new Contract(
          CONTRACT_ADDRESS,
          FundMeABI,
          signer
        );
        setContract(contractInstance);

        // Check if already connected
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          const owner = await contractInstance.getOwner();
          setIsOwner(accounts[0].address.toLowerCase() === owner.toLowerCase());
        }

        // Listen for account changes
        window.ethereum.on?.("accountsChanged", async (accounts: string[]) => {
          if (accounts.length > 0) {
            const newSigner = await web3Provider.getSigner();
            setSigner(newSigner);
            setAccount(accounts[0]);
            const owner = await contractInstance.getOwner();
            setIsOwner(accounts[0].toLowerCase() === owner.toLowerCase());
          } else {
            setAccount(null);
            setIsOwner(false);
          }
        });
      } else {
        console.error("Please install MetaMask or another Ethereum wallet!");
      }
    };
    init();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-mono">
      <Header account={account} setAccount={setAccount} provider={provider} />
      <main className="container mx-auto px-4 py-12 pt-16">
        <h1 className="p-10 text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
          FundMe DApp
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FundForm contract={contract} account={account} />
          {isOwner && <WithdrawButton contract={contract} />}
        </div>
        <FundersList contract={contract} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
