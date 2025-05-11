import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface FundersListProps {
  contract: ethers.Contract | null;
}

const FundersList: React.FC<FundersListProps> = ({ contract }) => {
  const [funders, setFunders] = useState<{ address: string; amount: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFunders = async () => {
      if (!contract) return;
      setLoading(true);
      try {
        let index = 0;
        const fundersList: { address: string; amount: string }[] = [];
        while (true) {
          try {
            const funder = await contract.getFunder(index);
            const amount = await contract.getAddressToAmountFunded(funder);
            fundersList.push({
              address: funder,
              amount: ethers.formatEther(amount),
            });
            index++;
          } catch {
            break; // Exit when no more funders
          }
        }
        setFunders(fundersList);
      } catch (err) {
        console.error("Failed to fetch funders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFunders();
  }, [contract]);

  return (
    <div className="mt-12 bg-gray-800/50 p-6 rounded-sm shadow-xs border border-purple-500/50 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">Funders</h2>
      {loading ? (
        <p className="text-gray-400">Loading funders...</p>
      ) : funders.length === 0 ? (
        <p className="text-gray-400">No funders yet.</p>
      ) : (
        <ul className="space-y-2">
          {funders.map((funder, index) => (
            <li
              key={index}
              className="p-2 bg-gray-900/50 rounded-xs hover:bg-gray-900 transition-colors duration-300"
            >
              <span className="text-purple-400">{funder.address}</span> funded{" "}
              <span className="text-pink-400">{funder.amount} ETH</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FundersList;
