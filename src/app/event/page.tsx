"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

// 1. Definisikan Interface untuk EventType
interface EventType {
  id: number;
  title: string;
  shortDescription: string;
  image: string; // base64 string from backend or URL fallback
  fullDescription: string;
  date: string;
  time: string;
  location: string;
}

// ambil backend base dari env (configable)
const BACKEND_BASE = process.env.NEXT_PUBLIC_EVENT_PAGE || "";

export default function EventPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  // state untuk data yang diambil dari backend
  const [eventsData, setEventsData] = useState<EventType[]>([]);
  const [heroData, setHeroData] = useState<{ id: number; image: string; title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // GET hero -> backend returns array (controller uses find())
        const heroRes = await fetch(`${BACKEND_BASE}/hero`);
        if (heroRes.ok) {
          const heroArr = await heroRes.json();
          if (Array.isArray(heroArr) && heroArr.length > 0) {
            // ambil item pertama sebagai hero
            const h = heroArr[0];
            setHeroData({
              id: h.id,
              image: h.image,
              title: h.title,
              description: h.description,
            });
          } else {
            setHeroData(null);
          }
        } else {
          setHeroData(null);
        }

        // GET next events (controller route: /nextevent)
        const eventsRes = await fetch(`${BACKEND_BASE}/nextevent`);
        if (eventsRes.ok) {
          const arr = await eventsRes.json();
          setEventsData(Array.isArray(arr) ? arr : []);
        } else {
          setEventsData([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setHeroData(null);
        setEventsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleCardClick = (event: EventType) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

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

      {/* HERO: gunakan heroData apabila tersedia */}
      <div
        className="event-hero"
        style={{ marginTop: "100px", marginBottom: "10px", position: "relative" }}
      >
        <Container>
          <div className="event-hero-content">
            <img
              src={heroData?.image ?? "/images/Home/pingpong.jpeg"}
              alt="Event Hero"
              className="event-hero-image"
              style={{ objectPosition: "center 75%" }}
            />
            {/* tampilkan description di dalam gambar jika ada */}
            {heroData?.description && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "18%",
                  textAlign: "center",
                  color: "#fff",
                  padding: "1rem",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  zIndex: 3,
                }}
              >
                <h2 style={{ marginBottom: 8 }}>{heroData.title}</h2>
                <p style={{ maxWidth: 900, margin: "0 auto" }}>{heroData.description}</p>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="my-5 py-5">
        <h2 className="section-title">Next Event</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <Row className="g-4">
            {eventsData.map((event) => (
              <Col md={4} key={event.id}>
                <Card
                  className="product-card"
                  onClick={() => handleCardClick(event)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={event.image}
                    style={{
                      width: "100%",
                      height: "275px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="product-title">
                      {event.title}
                    </Card.Title>
                    <Card.Text className="product-desc">
                      {event.shortDescription}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {eventsData.length === 0 && <p>Tidak ada event tersedia.</p>}
          </Row>
        )}
      </Container>

      {/* Modal untuk detail event */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  objectPosition: "center",
                  marginBottom: "15px",
                  borderRadius: "5px",
                }}
              />
              <h5>Deskripsi:</h5>
              <p>{selectedEvent.fullDescription}</p>
              <hr />
              <p>
                <strong>Jadwal:</strong> {selectedEvent.date},{" "}
                {selectedEvent.time}
              </p>
              <p>
                <strong>Lokasi:</strong> {selectedEvent.location}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

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
              <h4
                style={{
                  fontWeight: 700,
                  color: "#f1c76e",
                  marginBottom: "0.5rem",
                }}
              >
                Link
              </h4>
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
              <h4
                style={{
                  fontWeight: 700,
                  color: "#f1c76e",
                  marginBottom: "0.5rem",
                }}
              >
                Contact
              </h4>
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
              <h4
                style={{
                  fontWeight: 700,
                  color: "#f1c76e",
                  marginBottom: "0.5rem",
                }}
              >
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
