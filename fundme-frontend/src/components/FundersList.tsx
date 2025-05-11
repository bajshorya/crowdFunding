import { useState, useEffect } from "react";
import { Contract, formatEther } from "ethers";
import { toast } from "react-toastify";
interface FundersListProps {
  contract: Contract | null;
}
interface Funder {
  address: string;
  amount: string;
}
const FundersList: React.FC<FundersListProps> = ({ contract }) => {
  const [funders, setFunders] = useState<Funder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalFunders, setTotalFunders] = useState<number>(0);

  const fetchFunders = async () => {
    if (!contract) {
      setError("Contract not connected");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newFunders: Funder[] = [];

      let funderCount = 0;
      try {
        while (true) {
          await contract.getFunder(funderCount);
          funderCount++;
        }
      } catch (err) {
        setTotalFunders(funderCount);
      }

      for (let i = 0; i < funderCount; i++) {
        try {
          const funderAddress = await contract.getFunder(i);
          const amountWei = await contract.getAddressToAmountFunded(
            funderAddress
          );
          const amountEth = formatEther(amountWei);

          newFunders.push({
            address: funderAddress,
            amount: amountEth,
          });
        } catch (err) {
          continue;
        }
      }

      setFunders(newFunders);
    } catch (err: any) {
      setError("Failed to fetch funders: " + (err.message || "Unknown error"));
      toast.error(
        "Failed to fetch funders: " + (err.message || "Unknown error"),
        { theme: "dark" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunders();
    const intervalId = setInterval(fetchFunders, 30000);
    return () => clearInterval(intervalId);
  }, [contract]);

  return (
    <div className="mt-12 bg-gray-800/50 p-6 rounded-2xl shadow-xs border border-purple-500/50 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-pink-400">Funders List </h2>
          <h6 className="text-xs font-extralight text-purple-500">
            Refreshes every 30sec
          </h6>
        </div>
        <div className="text-purple-400 bg-gray-900/50 px-3 py-1 rounded-xs border border-purple-500/50">
          Total Funders: {totalFunders}
        </div>
      </div>

      {error && <p className="text-red-400 mb-4">Error: {error}</p>}

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
