import { useState } from "react";
import { ethers } from "ethers";

interface WithdrawButtonProps {
  contract: ethers.Contract | null;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({ contract }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const withdraw = async () => {
    if (!contract) {
      setError("Contract not connected!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const tx = await contract.cheaperWithdraw();
      await tx.wait();
      alert("Withdrawal successful!");
    } catch (err: any) {
      setError(err.message || "Failed to withdraw!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-sm shadow-xs border border-purple-500/50 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">Owner Withdraw</h2>
      <button
        onClick={withdraw}
        disabled={loading}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xs hover:bg-gradient-to-l disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? "Withdrawing..." : "Withdraw Funds"}
      </button>
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  );
};

export default WithdrawButton;
