"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

const API_BASE = process.env.NEXT_PUBLIC_ABOUT_PAGE || "";

export default function AboutPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // data dari backend
  const [hero, setHero] = useState<any | null>(null);
  const [fotos, setFotos] = useState<any[]>([]);
  const [pengurus, setPengurus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [heroRes, fotoRes, pengurusRes] = await Promise.all([
        fetch(`${API_BASE}/hero`),
        fetch(`${API_BASE}/foto`),
        fetch(`${API_BASE}/pengurus`),
      ]);

      setHero(heroRes.ok ? (await heroRes.json())[0] ?? null : null);
      setFotos(fotoRes.ok ? await fotoRes.json() : []);
      setPengurus(pengurusRes.ok ? await pengurusRes.json() : []);
    } catch (err) {
      console.error("Fetch about data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={{ backgroundColor: "#1a1d29", minHeight: "100vh", color: "white" }}>
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <div className="navbar-wave"></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Navbar.Brand href="/" style={{ fontWeight: 600 }}>
            <img
              src="/images/Logo/ltmu.jpg"
              alt="LTMU Logo"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "10px",
              }}
            />
            <span className="navbar-logo-text">LTMU</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
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

      {/* HERO */}
      <div className="about-hero" style={{ marginTop: "100px" }}>
        <Container>
          <div className="hero-content-about">
                <img
                  src={hero?.image ?? "/images/Home/pingpong.jpeg"}
                  alt="LTMU Hero"
                  className="hero-image-about"
                  style={{
                    maxWidth: "1500px",
                    maxHeight: "600px",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center bottom",
                  }}
                />
                
                {hero && (
                  <div className="hero-text-overlay">
                    <h1>{hero.title}</h1>
                    <p>{hero.description}</p>
                  </div>
                )}
          </div>
        </Container>
      </div>

      {/* FOTO SECTION */}
      <Container className="my-5">
        {fotos[0] ? (
          <div className="foto-card">
            <Row className="align-items-center g-0">
              <Col md={6}>
                <img
                  src={fotos[0].image}
                  alt={fotos[0].name}
                  className="foto-image"
                  style={{ maxWidth: "400px", height: "auto" }}
                />
              </Col>
              <Col md={6}>
                <div className="foto-text">
                  <h2>{fotos[0].name}</h2>
                  <p>{fotos[0].description}</p>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <p className="text-muted">Belum ada data foto (ketua).</p>
        )}
      </Container>

      <Container className="my-5">
        {fotos[1] ? (
          <div className="foto-card">
            <Row className="align-items-center g-0">
              <Col md={6}>
                <div className="foto-text">
                  <h2>{fotos[1].name}</h2>
                  <p>{fotos[1].description}</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <img
                  src={fotos[1].image}
                  alt={fotos[1].name}
                  className="foto-image"
                  style={{ maxWidth: "400px", height: "auto" }}
                />
              </Col>
            </Row>
          </div>
        ) : (
          <p className="text-muted">Belum ada data foto (wakil).</p>
        )}
      </Container>

      {/* PENGURUS */}
      <Container className="my-5 py-5">
        <h2 className="section-title">Pengurus/Bidang Lainnya</h2>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          dialogClassName="modal-custom-fade"
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedItem?.image}
              alt="popup"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />
            <h5>Deskripsi Lengkap:</h5>
            <p>{selectedItem?.fullDescription}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="g-4">
          {pengurus.length === 0 && (
            <Col>
              <p className="text-muted">Belum ada data pengurus.</p>
            </Col>
          )}

          {pengurus.map((item, index) => (
            <Col md={4} key={item.id ?? index}>
              <Card
                className="pengurus-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
              >
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title className="pengurus-title">{item.name}</Card.Title>
                  <Card.Text style={{ fontSize: 14, color: "var(--gray-400)" }}>
                    {item.shortDescription}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* FOOTER (tetap sama) */}
      <footer className="footer-custom">
        <Container>
          <Row>
            <Col md={3}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/images/Logo/ltmu.jpg" alt="LTMU Logo" height={35} />
                <h3 style={{ margin: 0 }}>LTMU</h3>
              </div>
              <p style={{ fontSize: 14, marginTop: 8 }}>
                © 2025 LTMU UNTAR. All Rights Reserved.
              </p>
                <Col md={3} className="mb-4">
                  <div style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
                    <a className="nav-link" href="#" style={{ display: "flex", alignItems: "center" }}><Facebook size={24} color="#3b5998" /></a>
                    <a className="nav-link" href="#" style={{ display: "flex", alignItems: "center" }}><Youtube size={24} color="#FF0000" /></a>
                    <a className="nav-link" href="https://x.com/tenismejauntar?t=auj9mGyE3DCK6YlYJCFgbQ&s=09" style={{ display: "flex", alignItems: "center" }}><Twitter size={24} color="#1DA1F2" /></a>
                    <a className="nav-link" href="https://www.instagram.com/ltmu_untar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" style={{ display: "flex", alignItems: "center" }}><Instagram size={24} color="#d620eaff" /></a>
                  </div>
                </Col>
            </Col>

            <Col md={3}>
              <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>
                Link
              </h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/event">Event</a></li>
                <li><a href="/contact">Feedback</a></li>
              </ul>
            </Col>

            <Col md={3}>
              <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>
                Contact
              </h4>
              <ul>
                <li><a href="mailto:ltmu@untar.ac.id">maheshaabi@gmail.com</a></li>
                <li><a href="tel:02112345678">0812-1988-2077</a></li>
              </ul>
            </Col>

            <Col md={3}>
              <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>
                Practice Schedule
              </h4>
              <ul>
                <li>Rabu dan Jumat, 13.30–15.30</li>
                <li>Kamis, 13.30–17.00</li>
                <li>Lokasi: Untar Arena, Gedung Utama</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
