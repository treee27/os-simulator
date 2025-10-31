

// src/components/ProcessInputForm.jsx
import React, { useState } from "react";

export default function ProcessInputForm({ onAdd, onClear }) {
  const [process, setProcess] = useState({
    name: "",
    arrival: 0,
    burst: 1,
    priority: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!process.name.trim()) {
      alert("Please enter a process name");
      return;
    }
    onAdd({ ...process });
    setProcess({
      name: "",
      arrival: 0,
      burst: 1,
      priority: 0
    });
  };

  const handleChange = (field, value) => {
    setProcess(prev => ({
      ...prev,
      [field]: field === 'name' ? value : parseInt(value) || 0
    }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">Add New Process</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Process Name */}
        <div>
          <label className="block text-sm font-semibold text-blue-300 mb-2">
            Process Name *
          </label>
          <input
            type="text"
            value={process.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-700/50 border-2 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
            placeholder="Enter process name (e.g., P1, ProcessA)"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Arrival Time */}
          <div>
            <label className="block text-sm font-semibold text-green-300 mb-2">
              Arrival Time
            </label>
            <input
              type="number"
              value={process.arrival}
              onChange={(e) => handleChange('arrival', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-700/50 border-2 border-slate-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white"
              min="0"
            />
            <div className="text-xs text-gray-400 mt-1">When process arrives</div>
          </div>

          {/* Burst Time */}
          <div>
            <label className="block text-sm font-semibold text-yellow-300 mb-2">
              Burst Time *
            </label>
            <input
              type="number"
              value={process.burst}
              onChange={(e) => handleChange('burst', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-700/50 border-2 border-slate-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-white"
              min="1"
              required
            />
            <div className="text-xs text-gray-400 mt-1">CPU time required</div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Priority (Low)
            </label>
            <input
              type="number"
              value={process.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-700/50 border-2 border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
              min="0"
            />
            <div className="text-xs text-gray-400 mt-1">Lower number = higher priority</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
             Add Process
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
             Clear All
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
        <h4 className="font-semibold text-gray-300 mb-2">💡 How to use:</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• <span className="text-blue-300">Process Name</span>: Unique identifier for the process</li>
          <li>• <span className="text-green-300">Arrival Time</span>: When the process enters the system (default: 0)</li>
          <li>• <span className="text-yellow-300">Burst Time</span>: CPU time required by the process (min: 1)</li>
          <li>• <span className="text-purple-300">Priority</span>: Priority level (lower number = higher priority)</li>
        </ul>
      </div>
    </div>
  );
}