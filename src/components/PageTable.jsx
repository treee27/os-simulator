// src/components/PageTable.jsx
import React from "react";

export default function PageTable({ history }) {
  return (
    <div className="card mt-4">
      <h3 className="font-semibold mb-2">Frame History</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-1">Step</th>
            <th className="text-left py-1">Frames</th>
          </tr>
        </thead>
        <tbody>
          {history.map((f, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2">{idx + 1}</td>
              <td className="py-2">{f.length ? f.join(" , ") : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
