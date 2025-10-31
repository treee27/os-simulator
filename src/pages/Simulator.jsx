import { useState } from "react";
import { fcfs, sjf } from "../logic";
import GanttChart from "../components/GanttChart";
import { useAuth } from "../context/AuthContext";
import { saveSimulation } from "../utils/firestoreHelpers";

export default function Simulator() {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [result, setResult] = useState([]);
  const { user } = useAuth();

  const simulate = async () => {
    let output;
    if (algorithm === "FCFS") output = fcfs(processes);
    if (algorithm === "SJF") output = sjf(processes);
    setResult(output);
    if (user) await saveSimulation(user.uid, { algorithm, processes, result });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">OS Scheduling Simulator</h2>
      {/* Add InputForm here */}
      <button onClick={simulate} className="bg-blue-600 text-white px-4 py-2 rounded">Simulate</button>
      {result.length > 0 && <GanttChart result={result} />}
    </div>
  );
}
