
'use client';
import React from "react";

export default function Table() {
  const data = [
    { id: 1, name: "John Doe", position: "Developer", status: "Active" },
    { id: 2, name: "Jane Smith", position: "Designer", status: "On Leave" },
    { id: 3, name: "Alice Johnson", position: "Manager", status: "Active" },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b last:border-none hover:bg-gray-50"
            >
              <td className="px-6 py-3">{row.id}</td>
              <td className="px-6 py-3">{row.name}</td>
              <td className="px-6 py-3">{row.position}</td>
              <td className="px-6 py-3">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}