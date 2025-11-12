"use client";

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Link from "next/link";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    setError("");
    alert("Login berhasil (simulasi)");
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
          <h1 className="auth-welcome-title">Welcome to LTMU</h1>
          <p className="auth-welcome-text">
            Login untuk akses fitur eksklusif dan bergabung dengan komunitas tenis meja terbaik di Untar!
          </p>
          <div className="auth-wave-decoration"></div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-form-section">
        <div className="auth-form-content">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Login to Your Account</h2>
            <p className="auth-form-subtitle">Enter your credentials to continue</p>
          </div>

          {error && (
            <Alert variant="danger" className="auth-alert">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Email Address</Form.Label>
              <div className="auth-input-wrapper">
                <EnvelopeFill className="auth-input-icon" size={18} />
                <Form.Control
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Password</Form.Label>
              <div className="auth-input-wrapper">
                <LockFill className="auth-input-icon" size={18} />
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            </Form.Group>

            {/* Remember Me + Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check
                type="checkbox"
                label="Remember me"
                className="auth-checkbox"
              />
              <Link href="#" className="auth-forgot-link">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="auth-submit-btn w-100">
              Login
            </Button>
          </Form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Register Link */}
          <div className="auth-footer-text">
            Don't have an account?{" "}
            <Link href="/register" className="auth-link">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
