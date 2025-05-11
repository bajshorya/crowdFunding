import { useState, useEffect } from "react";
import { BrowserProvider, JsonRpcSigner, Contract } from "ethers";
import { ToastContainer, toast } from "react-toastify";
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

        // Check owner status
        if (currentAccount) {
          const owner = await contractInstance.getOwner();
          console.log("Connected account:", currentAccount);
          console.log("Contract owner:", owner);
          const isOwnerCheck =
            currentAccount.toLowerCase() === owner.toLowerCase();
          console.log("Is owner:", isOwnerCheck);
          setIsOwner(isOwnerCheck);
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
            console.log("New account:", newAccount);
            console.log("Contract owner:", owner);
            const isOwnerCheck =
              newAccount.toLowerCase() === owner.toLowerCase();
            console.log("Is owner:", isOwnerCheck);
            setIsOwner(isOwnerCheck);
          } catch (err) {
            console.error("Failed to handle account change:", err);
            setIsOwner(false);
          }
        } else {
          setAccount(null);
          setIsOwner(false);
          setSigner(null);
          setContract(null);
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
