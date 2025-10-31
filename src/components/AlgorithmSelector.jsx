
import React from "react";

export default function AlgorithmSelector({ algorithm, setAlgorithm, quantum, setQuantum }) {
  const algorithms = [
    { value: "FCFS", label: "First Come First Serve (FCFS)", description: "Non-preemptive, processes executed in arrival order" },
    { value: "SJF", label: "Shortest Job First (SJF)", description: "Non-preemptive, shortest burst time first" },
    { value: "Round Robin", label: "Round Robin (RR)", description: "Preemptive, time slices with quantum" },
    { value: "Priority", label: "Priority Scheduling", description: "Non-preemptive, higher priority first" }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Scheduling Algorithm</h3>
      
      <div className="space-y-4">
        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-semibold text-blue-300 mb-3">
            Select Algorithm
          </label>
          <div className="grid grid-cols-1 gap-3">
            {algorithms.map((algo) => (
              <div
                key={algo.value}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  algorithm === algo.value
                    ? 'border-purple-500 bg-purple-500/10 shadow-lg'
                    : 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                }`}
                onClick={() => setAlgorithm(algo.value)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{algo.label}</div>
                    <div className="text-sm text-gray-400 mt-1">{algo.description}</div>
                  </div>
                  {algorithm === algo.value && (
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantum Input (only for Round Robin) */}
        {algorithm === "Round Robin" && (
          <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <label className="block text-sm font-semibold text-blue-300 mb-2">
              Time Quantum
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={quantum}
                onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
                className="flex-1 p-3 rounded-xl bg-slate-700/50 border-2 border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white"
                min="1"
              />
              <div className="text-sm text-blue-300 font-mono bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-500/30">
                {quantum} unit{quantum !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Time slice allocated to each process in Round Robin scheduling
            </div>
          </div>
        )}

        {/* Algorithm Info */}
        <div className="mt-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
          <h4 className="font-semibold text-gray-300 mb-2">📊 Current Selection:</h4>
          <div className="text-sm text-gray-400">
            <span className="text-purple-300 font-bold">{algorithm}</span> - {
              algorithms.find(a => a.value === algorithm)?.description
            }
          </div>
        </div>
      </div>
    </div>
  );
}
