// import React from "react";
// import * as React from "react";
'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function AttendanceChart() {
  const data = [
    { day: "Mon", present: 90 },
    { day: "Tue", present: 85 },
    { day: "Wed", present: 92 },
    { day: "Thu", present: 88 },
    { day: "Fri", present: 95 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="present" stroke="#4F46E5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DepartmentChart() {
  const data = [
    { name: "IT", value: 40 },
    { name: "HR", value: 20 },
    { name: "Finance", value: 30 },
    { name: "Marketing", value: 10 },
  ];
  const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444"];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Departments</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>    
    </div>
  );
}