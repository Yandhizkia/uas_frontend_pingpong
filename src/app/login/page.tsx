"use client";

import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1d29", // tema dark konsisten
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        color: "white",
      }}
    >
      <Card
        style={{
          backgroundColor: "#2c2f4a", // shade sedikit lebih terang dari background
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ color: "#f1c76e", fontWeight: 600 }}
        >
          Login ke PingPhonk
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
  <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
  <Form.Control
    type="email"
    placeholder="Masukkan email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    autoFocus
    required
    className="custom-input"
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label style={{ color: 'white' }}>Password</Form.Label>
  <Form.Control
    type="password"
    placeholder="Masukkan password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="custom-input"
  />
</Form.Group>


          <Button
            variant="warning"
            type="submit"
            className="w-100"
            style={{
              color: "#1a1d29",
              fontWeight: "600",
              borderRadius: "0.5rem",
            }}
          >
            Login
          </Button>
        </Form>
        <div className="mt-3 text-center" style={{ color: "#ccc" }}>
          Belum punya akun?{" "}
          <a href="/register" style={{ color: "#f1c76e", fontWeight: 600 }}>
            Daftar di sini
          </a>
        </div>
      </Card>
    </div>
  );
}
