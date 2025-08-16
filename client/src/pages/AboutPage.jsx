import { FaLink, FaHammer, FaLock, FaGlobe, FaCreditCard, FaHospital, FaBoxes, FaLandmark } from "react-icons/fa";
import { FaCoins, FaUsers } from "react-icons/fa";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            About This Blockchain Demo
          </h1>
          <p className="text-xl text-gray-300">
            Understanding the fundamentals of blockchain technology
          </p>
        </div>

        {/* What is Blockchain Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">What is Blockchain?</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            A blockchain is a distributed, decentralized digital ledger that records
            transactions across multiple computers in a way that ensures the security,
            transparency, and immutability of the data. Think of it as a chain of
            blocks, where each block contains a list of transactions.
          </p>
        </div>

        {/* Key Concepts Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">Key Concepts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 hover:transform hover:-translate-y-2">
              <FaLink className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-3 text-white text-center">Blocks</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Each block contains transaction data, a timestamp, and a cryptographic
                hash of the previous block, creating an unbreakable chain.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-green-500 transition-all duration-300 hover:transform hover:-translate-y-2">
              <FaHammer className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-3 text-white text-center">Mining</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The process of adding new blocks to the blockchain through solving
                complex mathematical puzzles (Proof of Work).
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 hover:transform hover:-translate-y-2">
              <FaLock className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-3 text-white text-center">Cryptography</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Advanced mathematical algorithms ensure the security and integrity
                of all transactions and blocks.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300 hover:transform hover:-translate-y-2">
              <FaGlobe className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-3 text-white text-center">Decentralization</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                No single entity controls the network; instead, it's maintained by
                a distributed network of computers (nodes).
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">1</div>
              <h4 className="text-lg font-bold mb-2 text-white">Transaction Creation</h4>
              <p className="text-gray-300 text-sm">Users create transactions (sender, recipient, amount)</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">2</div>
              <h4 className="text-lg font-bold mb-2 text-white">Block Formation</h4>
              <p className="text-gray-300 text-sm">Transactions are grouped together into a new block</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">3</div>
              <h4 className="text-lg font-bold mb-2 text-white">Mining Process</h4>
              <p className="text-gray-300 text-sm">Miners solve complex puzzles to validate the block</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">4</div>
              <h4 className="text-lg font-bold mb-2 text-white">Chain Addition</h4>
              <p className="text-gray-300 text-sm">Validated block is added to the blockchain</p>
            </div>
          </div>
        </div>

        {/* Proof of Work Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Proof of Work</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Proof of Work (PoW) is a consensus mechanism that requires computational
            effort to solve complex mathematical puzzles. This process:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-green-400 mr-3">•</span>
              Prevents spam and attacks by making them computationally expensive
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3">•</span>
              Creates a fair system where miners compete to add new blocks
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3">•</span>
              Ensures network security through distributed consensus
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3">•</span>
              Makes it nearly impossible to alter historical transactions
            </li>
          </ul>
        </div>


        {/* Proof of Stake & DPoS Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Other Consensus Mechanisms
          </h2>
          <p className="text-lg text-gray-300 mb-6 text-center leading-relaxed">
            This demo focuses on Proof of Work (PoW), but here’s a brief overview of
            alternative consensus mechanisms used in real blockchains:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300">
              <div className="text-4xl mb-4 text-center text-yellow-400">
                <FaCoins />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white text-center">Proof of Stake (PoS)</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Validators are chosen to create new blocks based on the amount of cryptocurrency they stake.
                It is energy-efficient and the more you stake, the higher your chance to validate the next block.
              </p>
            </div>

            <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6 hover:border-green-500 transition-all duration-300">
              <div className="text-4xl mb-4 text-center text-green-400">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white text-center">Delegated Proof of Stake (DPoS)</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Coin holders vote for a small group of delegates who create and validate blocks on behalf of the network.
                This method is faster and more scalable but slightly less decentralized.
              </p>
            </div>
          </div>

          <p className="text-gray-400 mt-6 text-center text-sm">
            Note: This project is a PoW simulation. PoS and DPoS are included here for conceptual understanding only.
          </p>
        </div>


        {/* This Demo Project Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">This Demo Project</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            This blockchain demo is built using the MERN stack (MongoDB, Express.js,
            React, Node.js) and demonstrates the core concepts of blockchain technology:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-xl p-4">
              <strong className="text-blue-400">Block Creation:</strong>
              <span className="text-gray-300 ml-2">Create new blocks with transaction data</span>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <strong className="text-green-400">Transaction Management:</strong>
              <span className="text-gray-300 ml-2">Add and track transactions</span>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <strong className="text-yellow-400">Mining Simulation:</strong>
              <span className="text-gray-300 ml-2">Experience the mining process</span>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <strong className="text-purple-400">Proof of Work:</strong>
              <span className="text-gray-300 ml-2">Solve mining puzzles manually</span>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 md:col-span-2">
              <strong className="text-indigo-400">Chain Visualization:</strong>
              <span className="text-gray-300 ml-2">View the complete blockchain</span>
            </div>
          </div>
        </div>

        {/* Real-World Applications Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">Real-World Applications</h2>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Blockchain technology has applications beyond cryptocurrency, including:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:border-blue-500 transition-all duration-300">
              <FaCreditCard className="text-4xl mb-4 mx-auto" />
              <h4 className="text-lg font-bold mb-3 text-white">Finance</h4>
              <p className="text-gray-300 text-sm">Cross-border payments, smart contracts, decentralized finance</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:border-green-500 transition-all duration-300">
              <FaHospital className="text-4xl mb-4 mx-auto" />
              <h4 className="text-lg font-bold mb-3 text-white">Healthcare</h4>
              <p className="text-gray-300 text-sm">Patient records, drug supply chain, medical research</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:border-yellow-500 transition-all duration-300">
              <FaBoxes className="text-4xl mb-4 mx-auto" />
              <h4 className="text-lg font-bold mb-3 text-white">Supply Chain</h4>
              <p className="text-gray-300 text-sm">Product tracking, authenticity verification, logistics</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:border-purple-500 transition-all duration-300">
              <FaLandmark className="text-4xl mb-4 mx-auto" />
              <h4 className="text-lg font-bold mb-3 text-white">Government</h4>
              <p className="text-gray-300 text-sm">Voting systems, land registries, identity management</p>
            </div>
          </div>
        </div>

        {/* Learning Resources Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Learning Resources</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            To dive deeper into blockchain technology, consider exploring:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">•</span>
              Cryptographic hash functions and digital signatures
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3">•</span>
              Consensus mechanisms (PoW, PoS, DPoS)
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">•</span>
              Smart contracts and decentralized applications (DApps)
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">•</span>
              Blockchain scalability and layer 2 solutions
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-3">•</span>
              Web3 development and blockchain integration
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
