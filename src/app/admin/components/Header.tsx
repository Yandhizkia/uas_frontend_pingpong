"use client";

import React from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { Person, BoxArrowRight } from "react-bootstrap-icons"; // ⬅️ Tambah ini!

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      alert("Logout berhasil!");
      window.location.href = "/login";
    }
  };

  return (
    <div className="admin-header">
      <h1 className="admin-title">{title}</h1>

      <Dropdown align="end">
        <Dropdown.Toggle
          variant="link"
          className="profile-dropdown-toggle"
          bsPrefix="custom"
        >
          <div className="profile-link">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=b8a080&color=231e16&size=40"
              alt="Admin"
              className="profile-avatar"
            />
            <div className="profile-info">
              <span className="profile-name">Admin</span>
              <span className="profile-role">Administrator</span>
            </div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile-dropdown-menu">
          <Dropdown.Item href="/admin/profile" className="dropdown-item-custom">
            <Person size={20} className="dropdown-icon" />
            <span>Edit Profile</span>
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item
            onClick={handleLogout}
            className="dropdown-item-custom text-danger"
          >
            <BoxArrowRight size={20} className="dropdown-icon" />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
