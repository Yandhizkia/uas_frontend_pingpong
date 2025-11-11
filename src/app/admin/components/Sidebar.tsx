'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, House, FileText, CalendarEvent, Megaphone, Person } from "react-bootstrap-icons";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <BarChart size={20} /> },
  { name: "Homepage", path: "/admin/homepage", icon: <House size={20} /> },
  { name: "About", path: "/admin/about", icon: <FileText size={20} /> },
  { name: "Event", path: "/admin/event", icon: <CalendarEvent size={20} /> },
  { name: "Announcement", path: "/admin/announcement", icon: <Megaphone size={20} /> },
  { name: "Feedback", path: "/admin/feedback", icon: <Person size={20} /> },
];


  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      alert('Logout berhasil!');
      window.location.href = '/login';
    }
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
         <img
              src="/images/Logo/ltmu.jpg"
              alt="LTMU Logo"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "10px",
                color: "white",
              }}
            />
            <span className="sidebar-logo-text">LTMU</span>
        <p className="sidebar-subtitle">Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/*<div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div> */}
    </div>
  );
}