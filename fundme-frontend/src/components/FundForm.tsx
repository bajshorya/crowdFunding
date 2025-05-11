import { useState } from "react";
import { Contract, parseEther } from "ethers";
import { toast } from "react-toastify";

interface FundFormProps {
  contract: Contract | null;
  account: string | null;
}

const FundForm: React.FC<FundFormProps> = ({ contract, account }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const fund = async () => {
    if (!contract || !account) {
      toast.error("Please connect your wallet!", { theme: "dark" });
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount!", { theme: "dark" });
      return;
    }
    setLoading(true);
    try {
      const tx = await contract.fund({ value: parseEther(amount) });
      await tx.wait();
      toast.success("Funding successful!", { theme: "dark" });
      setAmount("");
    } catch (err: any) {
      if (err.code === 4100) {
        toast.error(
          "Transaction not authorized. Please approve the transaction in MetaMask.",
          {
            theme: "dark",
          }
        );
      } else {
        toast.error(err.message || "Failed to fund!", { theme: "dark" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-xs border border-pink-500/50 hover:shadow-md transition-shadow duration-300  ">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Fund the Pool</h2>
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
    </div>
  );
};

export default FundForm;
