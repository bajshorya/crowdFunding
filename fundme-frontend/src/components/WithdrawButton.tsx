import { useState } from "react";
import { Contract } from "ethers";
import { toast } from "react-toastify";

interface WithdrawButtonProps {
  contract: Contract | null;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({ contract }) => {
  const [loading, setLoading] = useState(false);

  const withdraw = async () => {
    if (!contract) {
      toast.error("Contract not connected!", { theme: "dark" });
      return;
    }
    setLoading(true);
    try {
      const tx = await contract.cheaperWithdraw();
      await tx.wait();
      toast.success("Withdrawal successful!", { theme: "dark" });
    } catch (err: any) {
      if (err.data === "0x579610db") {
        toast.error("Only the contract owner can withdraw funds!", {
          theme: "dark",
        });
      } else {
        toast.error(err.message || "Failed to withdraw!", { theme: "dark" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-xs border border-purple-500/50 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">Owner Withdraw</h2>
      <button
        onClick={withdraw}
        disabled={loading}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xs hover:bg-gradient-to-l disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? "Withdrawing..." : "Withdraw Funds"}
      </button>
    </div>
  );
};

export default WithdrawButton;
