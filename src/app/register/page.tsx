"use client";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import { PersonFill, EnvelopeFill, LockFill } from "react-bootstrap-icons";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi harus sama.");
      return;
    }
    alert(`Registrasi berhasil! Username: ${form.username}`);
  };

  return (
    <div className="auth-container">
      {/* Left Side - Welcome Section */}
      <div className="auth-welcome-section">
        <div className="auth-welcome-content">
          <div className="auth-logo">
            <img 
              src="/images/Logo/ltmu.jpg" 
              alt="LTMU Logo" 
              className="auth-logo-img"
            />
          </div>
          <h1 className="auth-welcome-title">Join LTMU Community</h1>
          <p className="auth-welcome-text">
            Daftar sekarang dan mulai perjalanan kamu bersama komunitas tenis meja terbaik di Untar!
          </p>
          <div className="auth-wave-decoration"></div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-form-section">
        <div className="auth-form-content">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Your Account</h2>
            <p className="auth-form-subtitle">Fill in the details to get started</p>
          </div>

          <Form onSubmit={handleSubmit} className="auth-form">
            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Username</Form.Label>
              <div className="auth-input-wrapper">
                <PersonFill className="auth-input-icon" size={18} />
                <Form.Control
                  type="text"
                  placeholder="Choose a username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Email Address</Form.Label>
              <div className="auth-input-wrapper">
                <EnvelopeFill className="auth-input-icon" size={18} />
                <Form.Control
                  type="email"
                  placeholder="your.email@example.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Password</Form.Label>
              <div className="auth-input-wrapper">
                <LockFill className="auth-input-icon" size={18} />
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Confirm Password</Form.Label>
              <div className="auth-input-wrapper">
                <LockFill className="auth-input-icon" size={18} />
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </Form.Group>

            <Button type="submit" className="auth-submit-btn w-100">
              Create Account
            </Button>
          </Form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer-text">
            Already have an account?{" "}
            <Link href="/login" className="auth-link">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}