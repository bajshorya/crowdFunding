import { useState, useEffect } from "react";
import { BrowserProvider, JsonRpcSigner, Contract } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [ownerAddress, setOwnerAddress] = useState<string>("Fetching...");

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        console.error("Please install MetaMask or another Ethereum wallet!");
        toast.error("No Ethereum wallet detected. Please install MetaMask!", {
          theme: "dark",
        });
        return;
      }

      const web3Provider = new BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      // Check if already connected
      const accounts = await web3Provider.listAccounts();
      let currentAccount: string | null = null;
      if (accounts.length > 0) {
        currentAccount = accounts[0].address;
        setAccount(currentAccount);
      }

      // Initialize signer and contract
      try {
        const signer = await web3Provider.getSigner();
        setSigner(signer);
        const contractInstance = new Contract(
          CONTRACT_ADDRESS,
          FundMeABI,
          signer
        );
        setContract(contractInstance);

        // Fetch owner address
        try {
          const owner = await contractInstance.getOwner();
          setOwnerAddress(owner);
          console.log("Connected account:", currentAccount);
          console.log("Contract owner:", owner);
          if (currentAccount) {
            const isOwnerCheck =
              currentAccount.toLowerCase() === owner.toLowerCase();
            console.log("Is owner:", isOwnerCheck);
            setIsOwner(isOwnerCheck);
          }
        } catch (err) {
          console.error("Failed to fetch owner:", err);
          toast.error("Failed to fetch contract owner!", { theme: "dark" });
          setOwnerAddress("Unknown");
        }
      } catch (err) {
        console.error("Failed to initialize signer or contract:", err);
      }

      // Listen for account changes
      window.ethereum.on?.("accountsChanged", async (accounts: string[]) => {
        if (accounts.length > 0) {
          const newAccount = accounts[0];
          setAccount(newAccount);
          try {
            const newSigner = await web3Provider.getSigner();
            setSigner(newSigner);
            const contractInstance = new Contract(
              CONTRACT_ADDRESS,
              FundMeABI,
              newSigner
            );
            setContract(contractInstance);
            const owner = await contractInstance.getOwner();
            setOwnerAddress(owner);
            console.log("New account:", newAccount);
            console.log("Contract owner:", owner);
            const isOwnerCheck =
              newAccount.toLowerCase() === owner.toLowerCase();
            console.log("Is owner:", isOwnerCheck);
            setIsOwner(isOwnerCheck);
          } catch (err) {
            console.error("Failed to handle account change:", err);
            toast.error("Failed to fetch contract owner on account change!", {
              theme: "dark",
            });
            setOwnerAddress("Unknown");
            setIsOwner(false);
          }
        } else {
          setAccount(null);
          setIsOwner(false);
          setSigner(null);
          setContract(null);
          setOwnerAddress("Fetching...");
        }
      });
    };
    init();

    // Cleanup listener on unmount
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-mono">
      <Header account={account} setAccount={setAccount} provider={provider} />
      <main className="container mx-auto px-4 py-12 pt-16">
        <h1 className="p-10 text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
          CrowdFunding DApp
        </h1>
        <section className="mb-12 bg-gray-800/50 p-6 rounded-sm shadow-xs border border-pink-500/50 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            About CrowdFund
          </h2>
          <p className="text-gray-300 mb-4">
            CrowdFund is a decentralized crowdfunding platform built on the Sepolia
            testnet. It allows anyone to contribute ETH to a shared pool,
            supporting a cause or project. Only the contract owner can withdraw
            the funds to ensure they are used as intended.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-pink-400">
            How to Use
          </h3>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>
              <strong>Fund the Contract:</strong> Connect your MetaMask wallet,
              enter an ETH amount (minimum equivalent to $5 USD), and click
              "Fund Now". Your contribution will be recorded on the blockchain.
            </li>
            <li>
              <strong>Withdraw Funds:</strong> If you are the contract owner,
              use the "Withdraw Funds" button to transfer all funds to your
              wallet. This option is only visible to the owner.
            </li>
            <li>
              <strong>View Funders:</strong> Check the "Funders List" below to
              see all contributors and their contributions, updated every 10
              seconds.
            </li>
          </ul>
          <p className="text-gray-300">
            <strong>Contract Owner:</strong>{" "}
            <span className="text-purple-400">
              {ownerAddress.slice(0, 6)}...{ownerAddress.slice(-4)}
            </span>
          </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FundForm contract={contract} account={account} />
          {isOwner && <WithdrawButton contract={contract} />}
        </div>
        <FundersList contract={contract} />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "linear-gradient(to right, #1a202c, #2d3748)",
          color: "#fff",
          border: "1px solid #ed64a6",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}

export default App;
