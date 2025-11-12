'use client';

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Person, BoxArrowRight } from 'react-bootstrap-icons'; // ✅ pakai bootstrap icon

interface HeaderProps {
  title: string;
}

export default function UserHeader({ title }: HeaderProps) {
  return (
    <div className="admin-header">
      <h1 className="admin-title">{title}</h1>
      <div className="user-header-actions">
        {/* Profile Dropdown Only */}
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" className="profile-dropdown-toggle" bsPrefix="custom">
            <div className="profile-link">
              <img 
                src="https://ui-avatars.com/api/?name=John+Doe&background=b8a080&color=231e16&size=40" 
                alt="User" 
                className="profile-avatar"
              />
              <div className="profile-info">
                <span className="profile-name">John Doe</span>
                <span className="profile-role">Member</span>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="profile-dropdown-menu">
            <Dropdown.Item href="/user/profile" className="dropdown-item-custom d-flex align-items-center gap-2">
              <Person size={18} /> {/* 👤 diganti bootstrap icon */}
              My Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                if (confirm('Yakin ingin logout?')) {
                  alert('Logout berhasil!');
                  window.location.href = '/login';
                }
              }}
              className="dropdown-item-custom text-danger d-flex align-items-center gap-2"
            >
              <BoxArrowRight size={18} /> {/* 🚪 diganti bootstrap icon */}
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
