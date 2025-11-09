"use client";

import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="profile-page-wrapper">
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

      <section className="pingphonk-profile-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-auto text-center text-md-start mb-4 mb-md-0">
              <Image
                src="/images/diem (2).png"
                alt="Profile Picture"
                width={150}
                height={150}
                className="pingphonk-profile-img"
              />
            </div>
            <div className="col-md pingphonk-profile-info text-center text-md-start">
              <h1>Nama</h1>
              <p className="mb-2">
                <strong>Status</strong>
              </p>
              <p>Atmin ceunah.</p>
              <p className="mb-2 mt-4">
                <strong>Divisi</strong>
              </p>
              <p>FTI.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pingphonk-admin-section">
        <div className="container">
          <h2 className="text-start">Admin</h2>
          <div className="d-flex flex-wrap justify-content-start gap-2">
            <ul
              className="nav nav-pills mb-3 pingphonk-nav-pills"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "home" ? "active" : ""
                  }`}
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected={activeTab === "home"}
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "about" ? "active" : ""
                  }`}
                  id="pills-about-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-about"
                  type="button"
                  role="tab"
                  aria-controls="pills-about"
                  aria-selected={activeTab === "about"}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "event" ? "active" : ""
                  }`}
                  id="pills-event-admin-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-event-admin"
                  type="button"
                  role="tab"
                  aria-controls="pills-event-admin"
                  aria-selected={activeTab === "event"}
                  onClick={() => setActiveTab("event")}
                >
                  Event
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "contact" ? "active" : ""
                  }`}
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected={activeTab === "contact"}
                  onClick={() => setActiveTab("contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div
            className="tab-content pingphonk-tab-content-area"
            id="pills-tabContent"
          >
            <div
              className={`tab-pane fade ${
                activeTab === "home" ? "show active" : ""
              }`}
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex={0}
            >
              <h4>Kelola Konten Home</h4>
              <p>
                Di sini Anda dapat mengelola elemen-elemen yang muncul di
                halaman beranda.
              </p>
              <div className="d-flex gap-2 mt-3">
                <Button variant="success">Add New</Button>
                <Button variant="info">Edit Existing</Button>
                <Button variant="danger">Delete Item</Button>
              </div>
            </div>

            <div
              className={`tab-pane fade ${
                activeTab === "about" ? "show active" : ""
              }`}
              id="pills-about"
              role="tabpanel"
              aria-labelledby="pills-about-tab"
              tabIndex={0}
            >
              <h4>Kelola Konten About</h4>
              <p>
                Di sini Anda dapat memperbarui informasi tentang halaman "About
                Us".
              </p>
              <div className="d-flex gap-2 mt-3">
                <Button variant="success">Add Section</Button>
                <Button variant="info">Edit Section</Button>
                <Button variant="danger">Delete Section</Button>
              </div>
            </div>

            <div
              className={`tab-pane fade ${
                activeTab === "event" ? "show active" : ""
              }`}
              id="pills-event-admin"
              role="tabpanel"
              aria-labelledby="pills-event-admin-tab"
              tabIndex={0}
            >
              <h4>Kelola Event</h4>
              <p>
                Di sini Anda dapat menambah, mengedit, atau menghapus event yang
                akan datang.
              </p>
              <div className="d-flex gap-2 mt-3">
                <Button variant="success">Add Event</Button>
                <Button variant="info">Edit Event</Button>
                <Button variant="danger">Delete Event</Button>
              </div>
            </div>

            <div
              className={`tab-pane fade ${
                activeTab === "contact" ? "show active" : ""
              }`}
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
              tabIndex={0}
            >
              <h4>Kelola Informasi Kontak</h4>
              <p>
                Di sini Anda dapat memperbarui detail kontak atau melihat pesan.
              </p>
              <div className="d-flex gap-2 mt-3">
                <Button variant="success">Add Contact Info</Button>
                <Button variant="info">Edit Contact Info</Button>
                <Button variant="danger">Delete Contact Info</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              </ul>
            </Col>
            <Col md={3}>
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
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>

      <style jsx global>{`
        /* CSS Variables */
        :root {
          --primary-bg: #1a1d29;
          --secondary-bg: #373d4b;
          --accent-color: #a39b8b;
          --text-color: #ffffff;
          --light-text: #b0b0b0;
        }

        /* General Body Styling (applied via a wrapper div to avoid global conflicts) */
        .profile-page-wrapper {
          background-color: var(--primary-bg);
          color: var(--text-color);
          font-family: sans-serif; /* Fallback to a common sans-serif font */
          min-height: 100vh; /* Ensure it covers the full height */
          display: flex;
          flex-direction: column;
        }

        /* Custom Navbar Styles (using react-bootstrap Navbar) */
        .navbar-custom {
          background-color: var(--primary-bg) !important;
          padding: 1rem 0;
          color: var(--text-color) !important;
        }

        .navbar-custom .navbar-brand {
          color: var(--text-color) !important;
          font-weight: bold;
          font-size: 1.5rem;
        }

        .navbar-custom .nav-link {
          color: var(--light-text) !important;
          margin-right: 1.5rem;
        }

        .navbar-custom .nav-link:hover,
        .navbar-custom .nav-link.active {
          color: var(--text-color) !important;
        }

        .btn-register {
          background-color: #b8a080;
          color: white !important;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.3rem;
        }

        .btn-register:hover {
          background-color: #8c8476;
          color: white !important;
        }

        /* Navbar wave effect (if any, as per the original component code) */
        .navbar-wave {
          /* Define your wave styles here if applicable */
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px; /* Example height */
          background: transparent; /* Or your wave image/svg */
        }

        /* Profile Section Styles */
        .pingphonk-profile-section {
          background-color: var(--secondary-bg);
          padding: 4rem 0;
          margin-top: 2rem;
          border-radius: 0.5rem;
          flex-shrink: 0; /* Prevent from shrinking */
        }

        .pingphonk-profile-img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }

        .pingphonk-profile-info h1 {
          color: var(--text-color);
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .pingphonk-profile-info p {
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .pingphonk-edit-profile-btn {
          background-color: #b8a080;
          color: #ffffff;
          border: none;
          padding: 0.7rem 2.5rem;
          border-radius: 0.3rem;
          margin-top: 2rem;
          font-weight: 600;
        }

        .pingphonk-edit-profile-btn:hover {
          background-color: #8c8476;
          color: #ffffff;
        }

        /* Admin Section Styles */
        .pingphonk-admin-section {
          margin-top: 3rem;
          margin-bottom: 3rem;
          flex-grow: 1; /* Allow to grow and push footer down */
        }

        .pingphonk-admin-section h2 {
          color: var(--text-color);
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }

        .pingphonk-nav-pills .pingphonk-nav-link-pill {
          /* Specificity for custom pills */
          background-color: #b8a080;
          color: #ffffff !important;
          border-radius: 0.3rem;
          padding: 0.7rem 1.5rem;
          margin-right: 1rem;
          font-weight: 600;
        }

        .pingphonk-nav-pills .pingphonk-nav-link-pill.active,
        .pingphonk-nav-pills .pingphonk-nav-link-pill:hover {
          background-color: #8c8476; /* Slightly darker accent for active/hover */
          color: #ffffff !important;
        }

        .pingphonk-tab-content-area {
          background-color: #ffffff; /* Light grey for the content box */
          min-height: 300px;
          border-radius: 0.5rem;
          margin-top: 1.5rem;
          padding: 2rem;
          color: #000000; /* Warna teks hitam agar terlihat di latar belakang putih */
        }

        /* Custom Footer Styles */
        .footer-custom {
          background-color: #1a1d29; /* Primary background for footer */
          color: white;
          padding: 3rem 0;
          position: relative;
          margin-top: auto;
        }

        .footer-custom h3,
        .footer-custom h4 {
          color: white;
          margin-bottom: 1rem;
        }

        .footer-custom ul {
          list-style: none;
          padding: 0;
        }

        .footer-custom ul li a {
          color: #b0b0b0; /* Light text for links */
          text-decoration: none;
          line-height: 2;
        }

        .footer-custom ul li a:hover {
          color: white;
        }

        .footer-custom .social-icon {
          display: inline-flex; /* Use inline-flex for vertical alignment */
          justify-content: center; /* Center icon horizontally */
          align-items: center; /* Center icon vertically */
          width: 35px; /* Slightly larger for better icon fit */
          height: 35px; /* Slightly larger for better icon fit */
          background-color: #b8a080;
          color: white;
          border-radius: 50%;
          margin-right: 10px;
          font-size: 1.1rem; /* Adjust icon size */
          text-decoration: none;
        }

        .footer-custom .social-icon:hover {
          background-color: #8c8476;
        }

        .footer-wave {
          /* Define your wave styles here if applicable */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20px; /* Example height */
          background: transparent; /* Or your wave image/svg */
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
