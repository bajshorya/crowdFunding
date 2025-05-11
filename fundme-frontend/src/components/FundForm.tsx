import { useState } from "react";
import { ethers } from "ethers";

interface FundFormProps {
  contract: ethers.Contract | null;
  account: string | null;
}

const FundForm: React.FC<FundFormProps> = ({ contract, account }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fund = async () => {
    if (!contract || !account) {
      setError("Please connect your wallet!");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const tx = await contract.fund({ value: ethers.parseEther(amount) });
      await tx.wait();
      alert("Funding successful!");
      setAmount("");
    } catch (err: any) {
      setError(err.message || "Failed to fund!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-sm shadow-xs border border-pink-500/50 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">
        Fund the Contract
      </h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter ETH amount (min $5 USD)"
        className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded-xs focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
      />
      <button
        onClick={fund}
        disabled={loading || !account}
        className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xs hover:bg-gradient-to-l disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? "Funding..." : "Fund Now"}
      </button>
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  );
};

export default FundForm;
