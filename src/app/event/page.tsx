"use client";

import React, { useState } from "react";
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
  image: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
}

// Data contoh untuk event-event Anda
const eventsData: EventType[] = [
  // Gunakan EventType[] untuk array
  {
    id: 1,
    title: "Event 1",
    shortDescription: "Keterangan event 1",
    image: "/images/Event/Event2.jpg",
    fullDescription:
      "Detail lengkap untuk Event 1. Acara ini akan menampilkan kompetisi tenis meja antar fakultas dengan hadiah menarik.",
    date: "10 Desember 2025",
    time: "14:00 - 17:00 WIB",
    location: "Untar Arena, Gedung Utama",
  },
  {
    id: 2,
    title: "Event 2",
    shortDescription: "Keterangan Event 2",
    image: "/images/Event/Event3.jpg",
    fullDescription:
      "Detail lengkap untuk Event 2. Workshop ini akan membahas teknik dasar dan strategi bermain tenis meja untuk pemula.",
    date: "15 Desember 2025",
    time: "09:00 - 12:00 WIB",
    location: "Aula Gedung M, Lantai 5",
  },
  {
    id: 3,
    title: "Event 3",
    shortDescription: "Keterangan Event 3",
    image: "/images/Event/Event4.jpg",
    fullDescription:
      "Detail lengkap untuk Event 3. Turnamen persahabatan antara LTMU dengan komunitas tenis meja dari universitas lain.",
    date: "20 Desember 2025",
    time: "13:00 - 18:00 WIB",
    location: "Untar Arena, Gedung Utama",
  },
  {
    id: 4,
    title: "Event 4",
    shortDescription: "Keterangan Event 4",
    image: "/images/Event/Event5.jpg",
    fullDescription:
      "Detail lengkap untuk Event 4. Sesi latihan bersama dengan pelatih profesional untuk meningkatkan skill pemain.",
    date: "26 Desember 2025",
    time: "16:00 - 19:00 WIB",
    location: "Untar Arena, Gedung Utama",
  },
  {
    id: 5,
    title: "Event 5",
    shortDescription: "Keterangan Event 5",
    image: "/images/Event/Event6.jpg",
    fullDescription:
      "Detail lengkap untuk Event 5. Malam keakraban anggota LTMU dengan berbagai permainan dan hiburan.",
    date: "28 Desember 2025",
    time: "18:00 - 21:00 WIB",
    location: "Kantin Pusat, Universitas Tarumanagara",
  },
  {
    id: 6,
    title: "Event 6",
    shortDescription: "Keterangan Event 6",
    image: "/images/Event/Event7.jpg",
    fullDescription:
      "Detail lengkap untuk Event 6. Demonstrasi teknik-teknik khusus tenis meja oleh atlet berprestasi.",
    date: "05 Januari 2026",
    time: "10:00 - 13:00 WIB",
    location: "Untar Arena, Gedung Utama",
  },
];

export default function EventPage() {
  const [showModal, setShowModal] = useState(false);
  // Anotasi tipe untuk selectedEvent, bisa berupa EventType atau null
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  // Anotasi tipe untuk parameter 'event'
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

      <div
        className="event-hero"
        style={{ marginTop: "100px", marginBottom: "10px" }}
      >
        <Container>
          <div className="event-hero-content">
            <img
              src="/images/Event/Event1.jpg"
              alt="Event Hero"
              className="event-hero-image"
              style={{ objectPosition: "center 75%" }}
            />
          </div>
        </Container>
      </div>

      <Container className="my-5 py-5">
        <h2 className="section-title">Next Event</h2>
        <Row className="g-4">
          {eventsData.map(
            (
              event: EventType // Anotasi tipe di map juga opsional tapi bagus
            ) => (
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
            )
          )}
        </Row>
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
