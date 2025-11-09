"use client";

import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Link from "next/link";

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
    <div className="register-container">
      <Container>
        <div className="register-box mx-auto">
          <h2>Login</h2>
          {error && (
            <Alert
              variant="danger"
              className="mb-3"
              style={{
                backgroundColor: "#dc3545",
                border: "none",
                color: "white",
                borderRadius: "0.7rem",
              }}
            >
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="register-link">
            Belum punya akun? <Link href="/register">Daftar di sini</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
