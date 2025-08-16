import { useState } from "react";
import axios from "axios";
import { FaSpinner, FaSearch, FaDice } from "react-icons/fa";
import { FaHammer, FaBullseye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function PuzzlePage() {
  const [data, setData] = useState("");
  const [nonce, setNonce] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(4);

  const checkSolution = async () => {
    if (!data || !nonce) {
      setMessage("Please enter both data and nonce values");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/mininig",
        { data, nonce: Number(nonce), difficulty: Number(difficulty) },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.valid) {
        toast.success("Correct solution! Block mined successfully.", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error("Invalid nonce! Try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
      setMessage(response.data.message);
    } catch (error) {
      toast.error(`${error.response?.data?.message || "Server error or invalid nonce"}`, {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error checking solution:", error);
      setMessage("Error checking solution. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateRandomData = () => {
    const randomData = Math.random().toString(36).substring(7);
    setData(randomData);
  };

  const generateRandomNonce = () => {
    const randomNonce = Math.floor(Math.random() * 10000);
    setNonce(randomNonce.toString());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Proof of Work Puzzle
          </h1>
          <p className="text-xl text-gray-300">
            Experience the computational challenge of blockchain mining
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Educational Content */}
          <div className="space-y-6"> {/* Reduce vertical spacing */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12"> {/* Reduced padding from p-8 */}
              <h2 className="text-2xl font-bold mb-6 text-white text-center">How Proof of Work Works</h2> {/* Reduce bottom margin */}
              <div className="space-y-4"> {/* Reduced spacing between inner cards */}
                <div className="bg-gray-700 rounded-xl p-6 border-l-4 border-blue-500"> {/* Reduce padding */}
                  <h3 className="text-xl font-bold mb-1 text-white flex items-center"> {/* Reduce bottom margin */}
                    <FaSearch className="mr-2 text-blue-400" />
                    The Challenge
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm"> {/* Smaller text for compactness */}
                    Miners must find a nonce (number used once) that, when combined with
                    block data, produces a hash starting with a specific number of zeros.
                  </p>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold mb-1 text-white flex items-center">
                    <FaHammer className="mr-2 text-green-400" />
                    The Process
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    The only way to find the correct nonce is through trial and error -
                    trying different values until the hash meets the difficulty requirement.
                  </p>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold mb-1 text-white flex items-center">
                    <FaBullseye className="mr-2 text-purple-400" />
                    The Goal
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    This computational work makes it expensive to create fake blocks,
                    securing the blockchain against attacks.
                  </p>
                </div>
              </div>
            </div>
          </div>




          {/* Right Column - Interactive Mining UI */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold mb-2 text-white flex items-center justify-center">
              Try Mining a Block
            </h2>
            <p className="text-gray-400 mb-4">
              The system will check if your
              combination produces a valid hash. But it will take years to find a correct combination, Good Luck Champ.
            </p>

            {/* Block Data Input */}
            <div className="space-y-2">
              <label htmlFor="data" className="block text-sm font-medium text-gray-300">
                Block Data
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="data"
                  placeholder="Enter block data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={generateRandomData}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <FaDice className="mr-2" />
                  Random
                </button>
              </div>
            </div>

            {/* Nonce Input */}
            <div className="space-y-2">
              <label htmlFor="nonce" className="block text-sm font-medium text-gray-300">
                Nonce
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="nonce"
                  placeholder="Enter nonce value"
                  value={nonce}
                  onChange={(e) => setNonce(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={generateRandomNonce}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <FaDice className="mr-2" />
                  Random
                </button>
              </div>
            </div>

            {/* Difficulty Slider */}
            <div className="space-y-2">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">
                Difficulty (leading zeros): <span className="text-blue-400 font-bold">{difficulty}</span>
              </label>
              <input
                type="range"
                id="difficulty"
                min="1"
                max="6"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Check Solution Button */}
            <button
              onClick={checkSolution}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              disabled={loading || !data || !nonce}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Checking...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Check Solution
                </>
              )}
            </button>

          </div>

        </div>

        {/* Full-Width Mining Tips Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center justify-center">
            Mining Tips
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-200 flex-1 min-w-[250px] max-w-[300px]">
              <h3 className="text-lg font-bold text-white mb-10">Hashes are Unpredictable</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Even a tiny change in the block data or nonce completely changes the hash output.
                This property, called the avalanche effect, ensures that every attempt is unique
                and prevents predicting which nonce will produce a valid hash.
              </p>
            </div>

            <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-green-500 transition-all duration-200 flex-1 min-w-[250px] max-w-[300px]">
              <h3 className="text-lg font-bold text-white mb-10">Trial and Error</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mining is not about clever shortcuts — the correct nonce is discovered purely
                by trying many different values. Each attempt involves recalculating the hash
                and checking if it meets the difficulty requirement.
              </p>
            </div>

            <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-500 transition-all duration-200 flex-1 min-w-[250px] max-w-[300px]">
              <h3 className="text-lg font-bold text-white mb-10">High Difficulty</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The difficulty setting determines how many leading zeros the hash must start with.
                Higher difficulty drastically reduces the number of valid hashes, meaning miners
                must try far more nonces on average to find a solution.
              </p>
            </div>

            <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-all duration-200 flex-1 min-w-[250px] max-w-[300px]">
              <h3 className="text-lg font-bold text-white mb-2">Manual Mining is Nearly Impossible</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Modern mining computers can perform millions of hash calculations per second.
                Doing this manually with pen and paper would take years to solve even a single block,
                which is why mining relies on computational power.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PuzzlePage;
