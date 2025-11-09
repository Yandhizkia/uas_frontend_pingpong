"use client";

import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

export default function AboutPage() {
  return (
    <div
      style={{ backgroundColor: "#1a1d29", minHeight: "100vh", color: "white" }}
    >
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
                color: "white",
              }}
            />
            <span style={{ color: "white" }}>LTMU</span>
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
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Link href="/login" passHref legacyBehavior>
                <Button className="btn-register ms-3" as="a">
                  Login
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="about-hero" style={{ marginTop: "100px" }}>
        <Container>
          <div className="hero-content-about">
            <img
              src="/images/About/About.jpg"
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
            <div className="hero-text-overlay">
              <h1>LTMU</h1>
              <p>
                LTMU adalah singkatan dari Liga Tenis Meja Untar, yang merupakan
                salah satu Unit Kegiatan Mahasiswa (UKM) di Universitas
                Tarumanagara. UKM ini berfungsi sebagai wadah bagi mahasiswa
                untuk mengembangkan minat dan bakat mereka dalam olahraga tenis
                meja, mulai dari latihan rutin hingga berpartisipasi dalam
                kompetisi antar universitas. UKM ini bertujuan untuk menumbuhkan
                prestasi olahraga dan disiplin diri di kalangan mahasiswa.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        <div className="foto-card">
          <Row className="align-items-center g-0">
            <Col md={6}>
              <img
                src="/images/About/Ketua.jpg"
                alt="Foto 1"
                className="foto-image"
              />
            </Col>
            <Col md={6}>
              <div className="foto-text">
                <h2>Den Khennet Neilson</h2>
                <p>Prodi: Teknik Arsitektur</p>
                <p>Status: Ketua Umum</p>
                <p>
                  Tugas: bertanggung jawab penuh atas seluruh keberlangsungan
                  organisasi dan pencapaian prestasi. Tugas utamanya meliputi
                  menetapkan visi dan strategi, mengambil keputusan penting,
                  mengawasi pelaksanaan program kerja dari semua divisi.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Container className="my-5">
        <div className="foto-card">
          <Row className="align-items-center g-0">
            <Col md={6}>
              <div className="foto-text">
                <h2>Rafael Amazia Laorence</h2>
                <p>Prodi: Teknik Informatika</p>
                <p>Status: Wakil Ketua</p>
                <p>
                  Tugas: menggantikan ketua ketika ketua tidak bisa hadir dalam
                  kegiatan ukm dan membantu ketua mengkoordinasi divisi untuk
                  menjalankan kegiatan ukm.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="/images/About/Wakil.jpg"
                alt="Foto 2"
                className="foto-image"
              />
            </Col>
          </Row>
        </div>
      </Container>

      <Container className="my-5 py-5">
        <h2 className="section-title">Related articles or posts</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="related-card">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop"
              />
              <Card.Body>
                <Card.Text className="related-title">Related</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="related-card">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop"
              />
              <Card.Body>
                <Card.Text className="related-title">Item</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="related-card">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=600&fit=crop"
              />
              <Card.Body>
                <Card.Text className="related-title">Payback</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="footer-custom">
        <div className="footer-wave"></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row>
            <Col md={3} className="mb-4">
              <h3>LTMU</h3>
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
            <Col md={3} className="mb-4">
              <h4>Title</h4>
              <ul>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h4>Title</h4>
              <ul>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h4>Title</h4>
              <ul>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
