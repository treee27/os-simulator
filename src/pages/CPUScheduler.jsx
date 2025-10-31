
// src/pages/CPUScheduler.jsx
import React, { useState } from "react";
import ProcessInputForm from "../components/ProcessInputForm";
import AlgorithmSelector from "../components/AlgorithmSelector";
import GanttChart from "../components/GanttChart";
import { fcfs } from "../algorithms/fcfs";
import { sjf } from "../algorithms/sjf";
import { roundRobin } from "../algorithms/roundrobin";
import { priorityScheduling } from "../algorithms/priority";
import { useAuth } from "../context/AuthContext";
import { saveSimulation } from "../utils/firestoreUtils";

export default function CPUScheduler() {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [quantum, setQuantum] = useState(2);
  const [timeline, setTimeline] = useState([]);
  const { user } = useAuth();

  const addProcess = (p) => setProcesses(prev => [...prev, p]);
  const clearProcesses = () => { setProcesses([]); setTimeline([]); };

  const simulate = async () => {
    if (processes.length === 0) return alert("Add processes first.");
    let result = [];
    // copy processes since algorithms mutate burst
    const input = processes.map(p => ({ ...p }));
    if (algorithm === "FCFS") result = fcfs(input);
    if (algorithm === "SJF") result = sjf(input);
    if (algorithm === "Round Robin") result = roundRobin(input, quantum);
    if (algorithm === "Priority") result = priorityScheduling(input);

    setTimeline(result);
    if (user) {
      await saveSimulation(user.uid, {
        type: "CPU",
        algorithm,
        quantum: algorithm === "Round Robin" ? quantum : null,
        input: processes,
        result
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
              CPU Process Scheduler
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-400 mt-4 text-lg">
            Visualize CPU scheduling algorithms with interactive Gantt charts
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Process Input Card */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
              <ProcessInputForm onAdd={addProcess} onClear={clearProcesses} />
            </div>

            {/* Algorithm Selection Card */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
              <AlgorithmSelector 
                algorithm={algorithm} 
                setAlgorithm={setAlgorithm} 
                quantum={quantum} 
                setQuantum={setQuantum} 
              />
            </div>

            {/* Processes List Card */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-cyan-300">Process Queue</h3>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                  {processes.length} processes
                </span>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {processes.length > 0 ? (
                  <div className="space-y-3">
                    {processes.map((p, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-700/30 rounded-xl p-4 border border-slate-600 hover:border-cyan-500/30 transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white text-lg">{p.name}</span>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            PID {idx + 1}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-400">Arrival:</div>
                          <div className="text-green-300 font-mono">{p.arrival}</div>
                          <div className="text-gray-400">Burst:</div>
                          <div className="text-yellow-300 font-mono">{p.burst}</div>
                          <div className="text-gray-400">Priority:</div>
                          <div className="text-purple-300 font-mono">{p.priority}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-lg mb-2">No processes added</div>
                    <div className="text-gray-600 text-sm">Add processes to start simulation</div>
                  </div>
                )}
              </div>

              <button 
                onClick={simulate}
                disabled={processes.length === 0}
                className={`w-full mt-6 py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  processes.length === 0
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                🚀 Run {algorithm} Simulation
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 space-y-6">
            {timeline.length > 0 ? (
              <>
                {/* Gantt Chart Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-green-300">Execution Timeline</h3>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                        {algorithm}
                      </span>
                      {algorithm === "Round Robin" && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                          Quantum: {quantum}
                        </span>
                      )}
                    </div>
                  </div>
                  <GanttChart timeline={timeline} />
                </div>

                {/* Timeline Details Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">Detailed Timeline</h3>
                  <div className="grid gap-3">
                    {timeline.map((t, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-700/30 rounded-xl p-4 border border-slate-600 hover:border-blue-500/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-bold text-white">{t.name}</span>
                            <span className="text-sm text-gray-400">Step {idx + 1}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div>
                              <span className="text-gray-400">Start: </span>
                              <span className="text-green-300 font-mono">{t.start}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">End: </span>
                              <span className="text-red-300 font-mono">{t.end}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Duration: </span>
                              <span className="text-yellow-300 font-mono">{t.end - t.start}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-12 shadow-2xl text-center">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-300 mb-3">Ready to Schedule</h3>
                <p className="text-gray-500 text-lg">
                  Add processes and run simulation to see the Gantt chart visualization
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}