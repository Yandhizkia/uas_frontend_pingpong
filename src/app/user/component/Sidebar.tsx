'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Activity, Megaphone, ChatLeftText } from "react-bootstrap-icons"; // Tambah Activity dan ChatLeftText, hapus yang tidak perlu

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: <BarChart size={20} /> }, // Ubah path
    { name: "Aktivitas", path: "/user/activity", icon: <Activity size={20} /> }, // Tambah menu Aktivitas
    { name: "Pengumuman", path: "/user/announcement", icon: <Megaphone size={20} /> }, // Ubah path
    { name: "Feedback", path: "/user/feedback", icon: <ChatLeftText size={20} /> }, // Ubah path dan ikon
  ];

  return (
    <div className="user-sidebar"> {/* Ubah class menjadi user-sidebar */}
      <div className="sidebar-header">
         <img
              src="/images/Logo/ltmu.jpg" // Pastikan path logo benar
              alt="LTMU Logo"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "10px",
                color: "white",
              }}
            />
            <span className="sidebar-logo-text">LTMU</span>
        <p className="sidebar-subtitle">Panel Pengguna</p> {/* Ubah subtitle */}
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
    </div>
  );
}