import { useState, useEffect } from "react";
import { Contract, formatEther } from "ethers";
import { toast } from "react-toastify";

interface FundersListProps {
  contract: Contract | null;
}

interface Funder {
  address: string;
  amount: string; // Formatted as ETH (string)
}

const FundersList: React.FC<FundersListProps> = ({ contract }) => {
  const [funders, setFunders] = useState<Funder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFunders = async () => {
    if (!contract) {
      //   toast.error("Contract not connected!", { theme: "dark" });
      return;
    }

    setLoading(true);
    try {
      const newFunders: Funder[] = [];
      let index = 0;

      // Iterate until getFunder reverts or returns zero address
      while (true) {
        try {
          const funderAddress = await contract.getFunder(index);
          if (funderAddress === "0x0000000000000000000000000000000000000000") {
            break; // No more funders
          }
          const amountWei = await contract.getAmountFunded(funderAddress);
          const amountEth = formatEther(amountWei);
          newFunders.push({
            address: funderAddress,
            amount: amountEth,
          });
          index++;
        } catch (err) {
          // Assume error means no more funders
          break;
        }
      }

      setFunders(newFunders);
    } catch (err: any) {
      toast.error(
        "Failed to fetch funders: " + (err.message || "Unknown error"),
        {
          theme: "dark",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunders(); // Initial fetch

    // Set up interval to refresh every 10 seconds
    const intervalId = setInterval(fetchFunders, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [contract]);

  return (
    <div className="mt-12 bg-gray-800/50 p-6 rounded-2xl shadow-xs border border-purple-500/50 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">
        Funders List{" "}
        <h3 className="text-sm font-light mb-4 text-purple-400">
          (refreshes every 10 seconds)
        </h3>
      </h2>

      {loading ? (
        <p className="text-purple-400">Loading funders...</p>
      ) : funders.length === 0 ? (
        <p className="text-purple-400">No funders yet!</p>
      ) : (
        <ul className="space-y-4">
          {funders.map((funder, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-900/50 rounded-xs border border-gray-700 hover:bg-gray-900 transition-colors duration-300"
            >
              <span className="text-purple-400">
                {funder.address.slice(0, 6)}...{funder.address.slice(-4)}
              </span>
              <span className="text-pink-400">{funder.amount} ETH</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FundersList;
