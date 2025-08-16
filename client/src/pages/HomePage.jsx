import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner, FaBolt } from "react-icons/fa";



function HomePage() {
  const [blockchainData, setBlockchainData] = useState({
    chain: [],
    length: 0
  });
  const [transactionForm, setTransactionForm] = useState({
    sender: "",
    recipient: "",
    amount: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastBlock, setLastBlock] = useState(null);



  // Fetch blockchain data
  const fetchBlockchain = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chain");
      setBlockchainData(response.data);
      if (response.data.chain.length > 0) {
        setLastBlock(response.data.chain[response.data.chain.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching blockchain:", error);
      setMessage("Error fetching blockchain data");
    }
  };

  // Create new transaction
  const createTransaction = async (e) => {
    e.preventDefault();
    if (!transactionForm.sender || !transactionForm.recipient || !transactionForm.amount) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/transactions/new", {
        sender: transactionForm.sender,
        recipient: transactionForm.recipient,
        amount: parseFloat(transactionForm.amount)
      });

      setMessage(response.data.message);
      setTransactionForm({ sender: "", recipient: "", amount: "" });

      // Refresh blockchain data
      setTimeout(fetchBlockchain, 1000);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setMessage("Error creating transaction");
    } finally {
      setLoading(false);
    }
  };

  // Mine block
  const [miningActive, setMiningActive] = useState(false);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [minedMessage, setMinedMessage] = useState("");

  const mineBlock = async () => {
    try {
      setMiningActive(true);
      setLoading(true);

      // Start showing random nonces
      const nonceInterval = setInterval(() => {
        setCurrentNonce(Math.floor(Math.random() * 1000000));
      }, 50);

      // Simulate mining for 8 seconds
      setTimeout(async () => {
        clearInterval(nonceInterval);

        // Call the API to actually mine the block
        const response = await axios.get("http://localhost:5000/api/mine");
        setMinedMessage(response.data.message); // "New Block Forged"
        setMiningActive(false);

        setTimeout(() => {
          setMiningActive(false);  // hide overlay
          setMinedMessage("");     // clear message
        }, 3000);

        // Refresh blockchain
        fetchBlockchain();
      }, 5000);


    } catch (error) {
      console.error("Error mining block:", error);
      setMinedMessage("Error mining block");
      setMiningActive(false);
    } finally {
      setLoading(false);
    }
  };



  // Load blockchain data on component mount
  useEffect(() => {
    fetchBlockchain();
  }, []);

  return (
    <>
      <div className={miningActive ? "blur-sm transition-all duration-300" : ""}>
        <div className="min-h-screen bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Blockchain Control Panel
              </h1>
              <p className="text-xl text-gray-300">
                Monitor and interact with your blockchain network
              </p>
            </div>

            {/* Status Message */}
            {message && (
              <div className="bg-green-900 border border-green-700 text-green-200 px-6 py-4 rounded-xl mb-8">
                <p className="font-medium">{message}</p>
              </div>
            )}

            {/* Two-Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Blockchain Statistics */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white text-center ">Blockchain Statistics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-xl p-4 text-center">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Total Blocks</h3>
                      <p className="text-2xl font-bold text-green-400">{blockchainData.length}</p>
                    </div>
                    <div className="bg-gray-700 rounded-xl p-4 text-center">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Last Block Hash</h3>
                      <p className="text-sm font-mono text-blue-400 break-all">
                        {lastBlock ? lastBlock.hash?.substring(0, 20) + "..." : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-xl p-4 text-center">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Last Block Index</h3>
                      <p className="text-2xl font-bold text-purple-400">{lastBlock?.index ?? "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 rounded-xl p-4 text-center">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Last Block Proof</h3>
                      <p className="text-sm font-mono text-yellow-400 break-all">{lastBlock?.proof ?? "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Mine Block Section */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4 text-white text-center ">Mine New Block</h2>
                  <p className="text-gray-400 mb-6">
                    Click the button below to mine a new block with pending transactions
                  </p>
                  <button
                    onClick={mineBlock}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Mining...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FaBolt className="h-5 w-5 mr-2" />
                        Mine Block
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column - Create Transaction */}
              <div className="flex items-center justify-center h-full">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-xl">
                  <h2 className="text-2xl font-bold mb-6 text-white text-center">Create New Transaction</h2>
                  <form onSubmit={createTransaction} className="space-y-6">
                    <div>
                      <label htmlFor="sender" className="block text-sm font-medium text-gray-300 mb-2">Sender:</label>
                      <input
                        type="text"
                        id="sender"
                        value={transactionForm.sender}
                        onChange={(e) => setTransactionForm({ ...transactionForm, sender: e.target.value })}
                        placeholder="Enter sender address"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-2">Recipient:</label>
                      <input
                        type="text"
                        id="recipient"
                        value={transactionForm.recipient}
                        onChange={(e) => setTransactionForm({ ...transactionForm, recipient: e.target.value })}
                        placeholder="Enter recipient address"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">Amount:</label>
                      <input
                        type="number"
                        id="amount"
                        value={transactionForm.amount}
                        onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                        placeholder="Enter amount"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Transaction"}
                    </button>
                  </form>
                </div>
              </div>


            </div>

            {/* Recent Blocks Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Recent Blocks</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {blockchainData.chain.slice().reverse().map((block) => (
                  <div key={block.index} className="bg-gray-700 rounded-xl p-4 border border-gray-600 hover:border-blue-500 transition-all duration-200">
                    <h4 className="text-lg font-bold text-white mb-3">Block #{block.index}</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Hash:</span> <span className="text-blue-400 font-mono break-all">{block.hash?.substring(0, 20)}...</span></p>
                      <p><span className="text-gray-400">Prev Hash:</span> <span className="text-pink-400 font-mono break-all">{block.previous_hash?.substring(0, 20)}...</span></p>
                      <p><span className="text-gray-400">Proof:</span> <span className="text-yellow-400 font-mono">{block.proof}</span></p>
                      <p><span className="text-gray-400">Transactions:</span> <span className="text-green-400 font-bold">{block.transactions?.length || 0}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {miningActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-gray-800 p-8 rounded-xl text-white text-center shadow-lg animate-pulse">
            <h2 className="text-2xl font-bold mb-4">Mining in Progress...</h2>
            <p>Trying nonce: <span className="font-mono">{currentNonce}</span></p>
          </div>
        </div>
      )}

      {minedMessage && !miningActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-green-600 p-8 rounded-xl text-white text-center shadow-lg animate-pulse">
            <h2 className="text-2xl font-bold mb-4">{minedMessage}</h2>
            <p>🎉 Block successfully mined!</p>
          </div>
        </div>
      )}


    </>
  );
}

export default HomePage;
