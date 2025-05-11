import { BrowserProvider } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";

interface HeaderProps {
  account: string | null;
  setAccount: (account: string | null) => void;
  provider: BrowserProvider | null;
}

const Header: React.FC<HeaderProps> = ({ account, setAccount, provider }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!provider) {
      toast.error("No Ethereum wallet detected. Please install MetaMask!", {
        theme: "dark",
      });
      return;
    }
    setIsConnecting(true);
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err: any) {
      toast.error(
        "Failed to connect wallet: " + (err.message || "Unknown error"),
        {
          theme: "dark",
        }
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (provider) {
      try {
        // Attempt to revoke permissions (MetaMask-specific)
        await provider.send("wallet_revokePermissions", [
          {
            eth_accounts: {},
          },
        ]);
      } catch (err) {
        // If revocation fails, prompt manual disconnect
        toast.warn(
          "Please manually disconnect this site in MetaMask: Settings > Connected Sites > http://localhost:5173",
          { theme: "dark", autoClose: 10000 }
        );
      }
    }
    setAccount(null);
    toast.success("Wallet disconnected!", { theme: "dark" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-500">CrowdFunding</h1>
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
    </header>
  );
};

export default Header;
