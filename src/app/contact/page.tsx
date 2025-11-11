"use client";

import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Form,
  Card,
  Alert,
} from "react-bootstrap";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setShowSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--dark-bg)",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Navbar.Brand href="/" style={{ fontWeight: 600 }}>
            <img
              src="/images/Logo/ltmu.jpg"
              alt="LTMU Logo"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "10px",
                color: "white",
              }}
            />
            <span className="navbar-logo-text">LTMU</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/event">Event</Nav.Link>
              <Nav.Link href="/contact">Feedback</Nav.Link>
              <Link href="/login" passHref legacyBehavior>
                <Button className="btn-register ms-3" as="a">
                  Login
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ paddingTop: "120px", paddingBottom: "40px" }}>
        <div className="text-center mb-5">
          <h1
            style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#f1c76e" }}
          >
            We'd Love to Hear From You
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gray-400)",
              maxWidth: "600px",
              margin: "1rem auto",
            }}
          >
            Punya pertanyaan, saran, atau ingin bergabung? Kirim feedback Anda
            dan kami akan segera merespons!
          </p>
        </div>
      </Container>

      <Container style={{ paddingBottom: "80px" }}>
        <Row className="g-4 justify-content-center">
          <Col lg={6} md={12}>
            <Card className="feedback-form-card mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-4" style={{ color: "#d3d7e8" }}>
                  Send Us Your Feedback
                </h3>

                {showSuccess && (
                  <Alert
                    variant="success"
                    onClose={() => setShowSuccess(false)}
                    dismissible
                  >
                    <strong>Thank you!</strong> Feedback Anda berhasil dikirim.
                    Kami akan segera merespons.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="your.email@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Tell us what's on your mind..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 btn-feedback-submit">
                    Send Feedback
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="info-card">
              <Card.Body className="p-4 text-center">
                <h5 style={{ color: "#d3d7e8", marginBottom: "1rem" }}>
                  Already a Member?
                </h5>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--gray-400)",
                    marginBottom: "1rem",
                  }}
                >
                  Login untuk akses fitur eksklusif dan kirim feedback langsung
                  dari dashboard Anda!
                </p>
                <Link href="/login" passHref legacyBehavior>
                  <Button
                    className="btn-event-cta"
                    as="a"
                    style={{ width: "100%" }}
                  >
                    Login Now
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5} md={12}>
            <Card className="info-card mb-3">
              <Card.Body className="p-4">
                <h4 style={{ color: "#f1c76e", marginBottom: "1rem" }}>
                  💡 Why Send Feedback?
                </h4>
                <ul
                  style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}
                >
                  <li>✅ Help us improve our services</li>
                  <li>✅ Get answers to your questions</li>
                  <li>✅ Share your experience with LTMU</li>
                  <li>✅ Suggest new features or activities</li>
                </ul>
              </Card.Body>
            </Card>

            <Card className="info-card mb-3" style={{ minHeight: "420px" }}>
              <Card.Body className="p-4 d-flex flex-column justify-content-between">
                <div>
                  <h4 style={{ color: "#f1c76e", marginBottom: "1rem" }}>
                    📍 Find Us
                  </h4>
                  <p style={{ marginBottom: "0.5rem" }}>
                    <strong>Location:</strong>
                    <br />
                    Universitas Tarumanagara
                    <br />
                    Letjen S. Parman St No.1, RT.6/RW.16, Tomang, Grogol
                    petamburan, West Jakarta City, Jakarta 11440
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1.8rem",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.601988112077!2d106.79257287590297!3d-6.184567893806403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f68e67ab5fdb%3A0x34c7de9a62eeb0f6!2sUniversitas%20Tarumanagara!5e0!3m2!1sen!2sid!4v1698158888888!5m2!1sen!2sid"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

<footer className="footer-custom">
        <Container>
          <Row>
            <Col md={3}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img src="/images/Logo/ltmu.jpg" alt="LTMU Logo" height={35} />
                <h3 style={{ margin: 0 }}>LTMU</h3>
              </div>
              <p style={{ fontSize: 14, marginTop: 8 }}>
                © 2025 LTMU UNTAR. All Rights Reserved.
              </p>
              <Col md={3} className="mb-4">
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <a
                    className="nav-link"
                    href="#"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Facebook size={24} color="#3b5998" />
                  </a>
                  <a
                    className="nav-link"
                    href="#"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Youtube size={24} color="#FF0000" />
                  </a>
                  <a
                    className="nav-link"
                    href="https://x.com/tenismejauntar?t=auj9mGyE3DCK6YlYJCFgbQ&s=09"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Twitter size={24} color="#1DA1F2" />
                  </a>
                  <a
                    className="nav-link"
                    href="https://www.instagram.com/ltmu_untar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Instagram size={24} color="#d620eaff" />
                  </a>
                </div>
              </Col>
            </Col>
            <Col md={3}>
              <h4>Link</h4>
              <ul>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/event">Event</a>
                </li>
                <li>
                  <a href="/contact">Feedback</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h4>Kontak</h4>
              <ul>
                <li>
                  <a href="mailto:ltmu@untar.ac.id">maheshaabi@gmail.com</a>
                </li>
                <li>
                  <a href="tel:02112345678">0812-1988-2077</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h4>Jadwal Latihan</h4>
              <ul>
                <li>Rabu & Jumat, 13.30-15.30</li>
                <li>Kamis, 13.30-17.00</li>
                <li>Lokasi: Untar Arena, Gedung Utama</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>

    </div>
  );
};

export default FeedbackPage;
