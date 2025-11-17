'use client';

import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Person, BoxArrowRight } from 'react-bootstrap-icons';

interface HeaderProps {
  title: string;
}

export default function UserHeader({ title }: HeaderProps) {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("name") || "User";
    const savedEmail = localStorage.getItem("email") || "";

    setName(savedName);
    setEmail(savedEmail);

    const generatedAvatar =
      `https://ui-avatars.com/api/?name=${savedName.replace(" ", "+")}&background=b8a080&color=231e16&size=40`;

    setAvatar(generatedAvatar);
  }, []);

  return (
    <div className="admin-header">
      <h1 className="admin-title">{title}</h1>

      <div className="user-header-actions">
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" className="profile-dropdown-toggle" bsPrefix="custom">
            <div className="profile-link">
              <img 
                src={avatar}
                alt="User"
                className="profile-avatar"
              />
              <div className="profile-info">
                <span className="profile-name">{name}</span>
                <span className="profile-role">Member</span>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="profile-dropdown-menu">
            <Dropdown.Item href="/user/profile" className="dropdown-item-custom d-flex align-items-center gap-2">
              <Person size={18} />
              My Profile
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item
              onClick={() => {
                if (confirm('Yakin ingin logout?')) {
                  localStorage.clear();
                  window.location.href = '/login';
                }
              }}
              className="dropdown-item-custom text-danger d-flex align-items-center gap-2"
            >
              <BoxArrowRight size={18} />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
