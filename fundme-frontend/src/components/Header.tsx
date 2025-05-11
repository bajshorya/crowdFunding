import { BrowserProvider } from "ethers";
import { useState } from "react";

interface HeaderProps {
  account: string | null;
  setAccount: (account: string | null) => void;
  provider: BrowserProvider | null;
}

const Header: React.FC<HeaderProps> = ({ account, setAccount, provider }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (!provider) {
      setError("No Ethereum wallet detected. Please install MetaMask!");
      return;
    }
    setIsConnecting(true);
    setError("");
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err: any) {
      setError("Failed to connect wallet: " + (err.message || "Unknown error"));
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setError("");
    // Note: MetaMask doesn't provide a native disconnect API, so we clear the local state
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-500">FundMe</h1>
        <div className="flex items-center space-x-4">
          {account ? (
            <>
              <span className="text-purple-400">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xs hover:scale-105 transition-transform duration-300"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xs hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="bg-red-500/80 text-white text-center py-2">{error}</div>
      )}
    </header>
  );
};

export default Header;
