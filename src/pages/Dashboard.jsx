// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="font-semibold mb-2">CPU Scheduler</h3>
        <p className="text-sm text-gray-600">Simulate FCFS, SJF, Round Robin, Priority scheduling with a Gantt chart and save results.</p>
        <Link to="/cpu" className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded">Open CPU Simulator</Link>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Page Replacement</h3>
        <p className="text-sm text-gray-600">Simulate FIFO and LRU page replacement with frame history visualization.</p>
        <Link to="/memory" className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded">Open Page Replacement</Link>
      </div>
    </div>
  );
}
