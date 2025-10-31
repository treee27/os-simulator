
import React, { useState } from "react";
import { fifo } from "../algorithms/fifoPage";
import { lru } from "../algorithms/lruPage";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const PageReplacement = () => {
  const { currentUser } = useAuth();
  const [pages, setPages] = useState("");
  const [capacity, setCapacity] = useState(3);
  const [algorithm, setAlgorithm] = useState("FIFO");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    console.log(" Button clicked");

    try {
      setLoading(true);

      const pagesArr = pages
        .split(",")
        .map((p) => parseInt(p.trim()))
        .filter((p) => !isNaN(p));

      console.log(" Pages Array:", pagesArr);

      let res;
      if (algorithm === "FIFO") {
        console.log("⚙️ Running FIFO...");
        res = fifo(pagesArr, capacity);
      } else {
        console.log("⚙️ Running LRU...");
        res = lru(pagesArr, capacity);
      }

      console.log(" Algorithm result:", res);
      setResult(res);

    } catch (err) {
      console.error("Error in handleSimulate:", err);
      alert("Something went wrong — check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
              Page Replacement Simulator
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-400 mt-4 text-lg">
            Visualize FIFO and LRU page replacement algorithms in action
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-blue-300 uppercase tracking-wide">
                Pages (comma separated)
              </label>
              <input
                type="text"
                className="w-full p-4 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                placeholder="e.g., 1, 2, 3, 2, 4, 1, 5, 2, 4, 3"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-green-300 uppercase tracking-wide">
                Frame Capacity
              </label>
              <input
                type="number"
                className="w-full p-4 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide">
                Algorithm
              </label>
              <select
                className="w-full p-4 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                <option value="FIFO" className="bg-gray-800">FIFO</option>
                <option value="LRU" className="bg-gray-800">LRU</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSimulate}
            disabled={loading}
            className={`w-full mt-8 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Simulating...</span>
              </div>
            ) : (
              `Run ${algorithm} Simulation`
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                Simulation Results
              </h2>
              <div className="flex justify-center items-center space-x-4">
                <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                  {algorithm} Algorithm
                </span>
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                  Capacity: {capacity}
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-500/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-2">{result.faults}</div>
                  <div className="text-blue-200 font-semibold">Total Page Faults</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6 border border-purple-500/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">{result.faultRate}</div>
                  <div className="text-purple-200 font-semibold">Fault Rate</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-2xl">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-700 to-gray-800">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-r border-gray-600">
                      Step
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-300 uppercase tracking-wider border-r border-gray-600">
                      Page
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider border-r border-gray-600">
                      Frames
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-red-300 uppercase tracking-wider">
                      Page Fault
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {result.history.map((row, i) => (
                    <tr 
                      key={i} 
                      className={`transition-all duration-200 hover:bg-gray-700/50 ${
                        i % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300 border-r border-gray-700">
                        {row.step}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-400 font-bold border-r border-gray-700">
                        {row.page}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-yellow-400 border-r border-gray-700">
                        [{row.frames.join(', ')}]
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          row.pageFault 
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                            : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {row.pageFault ? 'MISS' : 'HIT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600">
              <h3 className="text-xl font-bold text-center text-cyan-300 mb-4">
                Performance Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{result.faults}</div>
                  <div className="text-gray-400 text-sm">Page Faults</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{result.history.length - result.faults}</div>
                  <div className="text-gray-400 text-sm">Page Hits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{result.faultRate}</div>
                  <div className="text-gray-400 text-sm">Fault Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageReplacement;