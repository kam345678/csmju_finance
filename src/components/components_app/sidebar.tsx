'use client';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-green-900 border-5 shadow-md">
      <ul className="p-4 space-y-2 text-white">
        <li className="hover:bg-slate-600 p-2 rounded">Dashboard</li>
        <li className="hover:bg-slate-600 p-2 rounded">Employees</li>
        <li className="hover:bg-slate-600 p-2 rounded">Attendance</li>
      </ul>
    </div>
  );
}