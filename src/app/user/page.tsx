"use client";

import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
  Carousel,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("event");

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
              <p>
                Body text for whatever you'd like to expand on the main point.
              </p>
              <p className="mb-2 mt-4">
                <strong>Divisi</strong>
              </p>
              <p>
                Body text for whatever you'd like to expand on the main point.
              </p>
              <button className="btn pingphonk-edit-profile-btn">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pingphonk-jadwal-kegiatan-section">
        <div className="container">
          <h2 className="text-start">Jadwal Kegiatan</h2>
          <div className="d-flex flex-wrap justify-content-start gap-2">
            <ul
              className="nav nav-pills mb-3 pingphonk-nav-pills"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "event" ? "active" : ""
                  }`}
                  id="pills-event-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-event"
                  type="button"
                  role="tab"
                  aria-controls="pills-event"
                  aria-selected={activeTab === "event"}
                  onClick={() => setActiveTab("event")}
                >
                  Event
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "jadwalLatihan" ? "active" : ""
                  }`}
                  id="pills-jadwal-latihan-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-jadwal-latihan"
                  type="button"
                  role="tab"
                  aria-controls="pills-jadwal-latihan"
                  aria-selected={activeTab === "jadwalLatihan"}
                  onClick={() => setActiveTab("jadwalLatihan")}
                >
                  Jadwal Latihan
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link pingphonk-nav-link-pill ${
                    activeTab === "aktivitasSaya" ? "active" : ""
                  }`}
                  id="pills-aktivitas-saya-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-aktivitas-saya"
                  type="button"
                  role="tab"
                  aria-controls="pills-aktivitas-saya"
                  aria-selected={activeTab === "aktivitasSaya"}
                  onClick={() => setActiveTab("aktivitasSaya")}
                >
                  Aktivitas Saya
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
                activeTab === "event" ? "show active" : ""
              }`}
              id="pills-event"
              role="tabpanel"
              aria-labelledby="pills-event-tab"
              tabIndex={0}
            >
              <p>Konten untuk Event.</p>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "jadwalLatihan" ? "show active" : ""
              }`}
              id="pills-jadwal-latihan"
              role="tabpanel"
              aria-labelledby="pills-jadwal-latihan-tab"
              tabIndex={0}
            >
              <p>Konten untuk Jadwal Latihan.</p>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "aktivitasSaya" ? "show active" : ""
              }`}
              id="pills-aktivitas-saya"
              role="tabpanel"
              aria-labelledby="pills-aktivitas-saya-tab"
              tabIndex={0}
            >
              <p>Konten untuk Aktivitas Saya.</p>
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

        /* Navbar Styles */
        .pingphonk-navbar {
          background-color: var(--primary-bg) !important;
          padding: 1rem 0;
        }

        .pingphonk-navbar-brand {
          color: var(--text-color) !important;
          font-weight: bold;
          font-size: 1.5rem;
        }

        .pingphonk-nav-link {
          color: var(--light-text) !important;
          margin-right: 1.5rem;
        }
        .pingphonk-nav-link.active {
          color: var(--text-color) !important;
        }

        .pingphonk-btn-custom {
          background-color: var(--accent-color);
          color: var(--primary-bg);
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.3rem;
        }

        .pingphonk-btn-custom:hover {
          background-color: #8c8476; /* Slightly darker accent for hover */
          color: var(--primary-bg);
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

        /* Jadwal Kegiatan Section Styles */
        .pingphonk-jadwal-kegiatan-section {
          margin-top: 3rem;
          margin-bottom: 3rem;
          flex-grow: 1; /* Allow to grow and push footer down */
        }

        .pingphonk-jadwal-kegiatan-section h2 {
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
          color: #000000;
        }

        /* Footer Styles */
        .pingphonk-footer {
          background-color: var(--secondary-bg);
          padding: 3rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--light-text);
          flex-shrink: 0; /* Prevent from shrinking */
          margin-top: auto; /* Push footer to the bottom */
        }

        .pingphonk-footer .pingphonk-footer-brand {
          font-weight: bold;
          font-size: 1.5rem;
          color: var(--text-color);
          margin-bottom: 1rem;
        }

        .pingphonk-footer .pingphonk-social-icons a {
          color: var(--light-text);
          font-size: 1.2rem;
          margin-right: 1rem;
          transition: color 0.3s ease;
        }

        .pingphonk-footer .pingphonk-social-icons a:hover {
          color: var(--text-color);
        }

        .pingphonk-footer ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1rem;
        }

        .pingphonk-footer ul li a {
          color: var(--light-text);
          text-decoration: none;
          line-height: 2;
        }

        .pingphonk-footer ul li a:hover {
          color: var(--text-color);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
