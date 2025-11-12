'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from 'react-bootstrap';
import {
  Speedometer2,
  Activity,
  Megaphone,
  Calendar3,
  ChatDots,
  BoxArrowRight,
} from 'react-bootstrap-icons';

export default function UserSidebar() {
  const pathname = usePathname();
  const unreadAnnouncements = 3;

  const menuItems = [
    { name: 'Dashboard', path: '/user', icon: Speedometer2, badge: null },
    { name: 'My Activity', path: '/user/activity', icon: Activity, badge: null },
    { name: 'Announcements', path: '/user/announcement', icon: Megaphone, badge: unreadAnnouncements },
    { name: 'Schedule', path: '/user/schedule', icon: Calendar3, badge: null },
    { name: 'Feedback', path: '/user/feedback', icon: ChatDots, badge: null },
  ];

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      alert('Logout berhasil!');
      window.location.href = '/login';
    }
  };

  return (
    <div className="admin-sidebar user-sidebar">
      <div className="sidebar-header">
        <img
          src="/images/Logo/ltmu.jpg"
          alt="LTMU"
          className="sidebar-logo"
        />
        <div>
          <h3>LTMU</h3>
          <p className="sidebar-subtitle">Member Dashboard</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          const iconColor = isActive ? '#f1c76e' : '#ffffff'; // 👈 cuma ini yang berubah

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon
                size={18}
                style={{
                  color: iconColor,
                  marginRight: '10px',
                  transition: '0.2s',
                }}
              />
              <span className="sidebar-text">{item.name}</span>
              {item.badge && item.badge > 0 && (
                <Badge bg="danger" className="sidebar-badge" pill>
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
