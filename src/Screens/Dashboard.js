import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">

      <div className={`bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ${isSidebarOpen ? "block" : "hidden"}`}>
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard/slider" className="hover:underline">Slider</Link>
          <Link to="/dashboard/about" className="hover:underline">About</Link>
          <Link to="/dashboard/services" className="hover:underline">Services</Link>
          <Link to="/dashboard/testimonials" className="hover:underline">Testimonials</Link>
          <Link to="/dashboard/contacts" className="hover:underline">Contact Entries</Link>
          <Link to="/" onClick={() => {
            localStorage.clear();
          }} className="hover:underline">Logout</Link>
        </nav>
      </div>


      <div className="flex-1 flex flex-col">

        <div className="bg-white shadow p-4 flex items-center justify-between">
          <button
            className="text-2xl font-bold"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <RxHamburgerMenu />
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>


        <div className="p-4 overflow-auto flex-1 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;