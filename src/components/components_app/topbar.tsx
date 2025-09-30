'use client';
import React from "react";
import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">John Doe</span>
        </div>
      </div>
    </div>
  );
}