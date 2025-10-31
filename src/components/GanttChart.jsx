
// src/components/GanttChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GanttChart({ timeline }) {
  // convert timeline to bar lengths with start offsets via stacked trick
  if (!timeline || timeline.length === 0) return null;

  // Build labels = unique steps order - use each segment as label
  const labels = timeline.map((t, idx) => `${t.name} (${t.start}-${t.end})`);
  const durations = timeline.map(t => t.end - t.start);
  const starts = timeline.map(t => t.start);

  // Generate distinct colors for each process
  const generateColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    for (let i = 0; i < count; i++) {
      const hue = (i * hueStep) % 360;
      colors.push(`hsla(${hue}, 70%, 65%, 0.8)`);
    }
    return colors;
  };

  const processColors = generateColors([...new Set(timeline.map(t => t.name))].length);
  const colorMap = {};
  let colorIndex = 0;
  
  const backgroundColors = timeline.map(t => {
    if (!colorMap[t.name]) {
      colorMap[t.name] = processColors[colorIndex % processColors.length];
      colorIndex++;
    }
    return colorMap[t.name];
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Start",
        data: starts,
        backgroundColor: "rgba(0,0,0,0)",
        stack: "a"
      },
      {
        label: "Duration",
        data: durations,
        stack: "a",
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: { 
        stacked: true, 
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#94a3b8' }
      },
      y: { 
        stacked: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#94a3b8' }
      }
    },
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15,23,42,0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            if (context.dataset.label === "Duration") {
              return `Duration: ${context.raw} units`;
            }
            return `Start: ${context.raw} units`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="relative">
      <div className="bg-slate-700/30 rounded-xl p-4 mb-4">
        <Bar data={data} options={options} height={100 + timeline.length * 40} />
      </div>
      
      {/* Process Legend */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(colorMap).map(([process, color]) => (
          <div key={process} className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-full">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm text-gray-300">{process}</span>
          </div>
        ))}
      </div>
    </div>
  );
}