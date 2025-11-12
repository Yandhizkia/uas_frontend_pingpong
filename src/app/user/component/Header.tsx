"use client";

import React from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { Person, BoxArrowRight } from "react-bootstrap-icons";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      alert("Logout berhasil!");
      window.location.href = "/login"; // Sesuaikan jika halaman login berbeda
    }
  };

  return (
    <div className="user-header"> {/* Ubah class menjadi user-header */}
      <h1 className="user-title">{title}</h1> {/* Ubah class menjadi user-title */}

      <Dropdown align="end">
        <Dropdown.Toggle
          variant="link"
          className="profile-dropdown-toggle"
          bsPrefix="custom"
        >
          <div className="profile-link">
            <img
              src="https://ui-avatars.com/api/?name=User&background=80a0b8&color=161e23&size=40" // Ubah name dan warna untuk user
              alt="User" // Ubah alt text
              className="profile-avatar"
            />
            <div className="profile-info">
              <span className="profile-name">Nama Pengguna</span> {/* Ubah menjadi nama pengguna */}
              <span className="profile-role">Pengguna</span> {/* Ubah menjadi peran pengguna */}
            </div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile-dropdown-menu">
          <Dropdown.Item href="/user/profile" className="dropdown-item-custom"> {/* Ubah path ke /user/profile */}
            <Person size={20} className="dropdown-icon" />
            <span>Edit Profil</span> {/* Ubah teks */}
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