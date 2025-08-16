import { useNavigate } from "react-router-dom";
import { CubeIcon, LinkIcon, CpuChipIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";


function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Main Section */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  Blockchain Demo
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Learn blockchain by playing with it! Explore blocks, transactions, mining,
                and proof-of-work through interactive, hands-on demo.
              </p>


              <button
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-5 px-10 rounded-xl text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate("/home")}
              >
                Get Started
              </button>
            </div>

            {/* Right Column - Clean Blockchain Flow without section background */}
            {/* Right Column - Equal Width Blocks with Description Inside */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">

                <div className="flex items-center justify-center space-x-4">
                  {/* Block 1 - Block Creation */}
                  <div className="w-32 h-32 bg-gray-800 rounded-md shadow-md border border-blue-500 animate-float text-center flex flex-col justify-center items-center px-2">
                    <CubeIcon className="w-6 h-6 text-blue-400" />
                    <div className="text-sm font-semibold text-blue-400 mt-1">Block</div>
                    <p className="text-[10px] text-gray-300 leading-tight mt-1">
                      Manage and validate blocks.
                    </p>
                  </div>

                  {/* Chain Link */}
                  <LinkIcon className="w-6 h-6 text-blue-400" />

                  {/* Block 2 - Mining */}
                  <div className="w-32 h-32 bg-gray-800 rounded-md shadow-md border border-green-500 animate-float-delayed text-center flex flex-col justify-center items-center px-2">
                    <CpuChipIcon className="w-6 h-6 text-green-400" />
                    <div className="text-sm font-semibold text-green-400 mt-1">Mining</div>
                    <p className="text-[10px] text-gray-300 leading-tight mt-1">
                      Simulate mining effort.
                    </p>
                  </div>

                  {/* Chain Link */}
                  <LinkIcon className="w-6 h-6 text-blue-400" />

                  {/* Block 3 - Proof */}
                  <div className="w-32 h-32 bg-gray-800 rounded-md shadow-md border border-purple-500 animate-float text-center flex flex-col justify-center items-center px-2">
                    <PuzzlePieceIcon className="w-6 h-6 text-purple-400" />
                    <div className="text-sm font-semibold text-purple-400 mt-1">Proof</div>
                    <p className="text-[10px] text-gray-300 leading-tight mt-1">
                      Solve crypto puzzles.
                    </p>
                  </div>
                </div>



              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Removed bottom section */}
    </div>
  );
}

export default LandingPage;
