'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  House,
  FileText,
  CalendarEvent,
  Megaphone,
  Person,
  ClipboardCheck,
  Calendar2Event, 
} from 'react-bootstrap-icons';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <BarChart size={20} /> },
    { name: "Homepage", path: "/admin/homepage", icon: <House size={20} /> },
    { name: "About", path: "/admin/about", icon: <FileText size={20} /> },
    { name: "Event", path: "/admin/event", icon: <CalendarEvent size={20} /> },
    { name: 'Events Management', path: '/admin/events', icon :<Calendar2Event size={20} /> },
    { name: 'Event Registrations', path: '/admin/event-registrations', icon: <ClipboardCheck size={20} /> },
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
      {/* ===== HEADER LOGO ===== */}
      <div className="sidebar-header d-flex align-items-center mb-4">
        <img
          src="/images/Logo/ltmu.jpg"
          alt="LTMU Logo"
          style={{
            height: "45px",
            width: "45px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        />
        <div>
          <h3 className="sidebar-logo-text" style={{ marginLeft: "6px" }}>LTMU</h3>
          <p className="sidebar-subtitle" style={{ marginLeft: "6px" }}>Admin Panel</p>
        </div>
      </div>

      {/* ===== NAVIGATION ===== */}
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
    </div>
  );
}
