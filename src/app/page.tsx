"use client";

import React from "react";
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
import { Facebook, Youtube, Twitter, Instagram } from "react-bootstrap-icons";

export default function HomePage() {
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

      <Carousel className="hero-carousel">
        <Carousel.Item>
          <img
            src="/images/Home/Section1_1.jpg"
            alt="Hero 1"
            style={{
              maxWidth: "1800px",
              maxHeight: "680px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center 75%",
            }}
          />
          <div className="hero-overlay"></div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/images/Home/Section1_2.jpg"
            alt="Hero 2"
            style={{
              maxWidth: "1800px",
              maxHeight: "680px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center bottom",
            }}
          />
          <div className="hero-overlay"></div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/images/Home/Section1_3.jpg"
            alt="Hero 3"
            style={{
              maxWidth: "1800px",
              maxHeight: "680px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <div className="hero-overlay"></div>
        </Carousel.Item>
      </Carousel>

      <Container className="py-5 mt-5">
        <h2 className="section-title">Info Lengkap</h2>
        <Row className="g-4">
          <Col md={4}>
            <Link href="/about" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Card className="card-custom">
                  <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                    <Card.Img
                      variant="top"
                      src="/images/Home/Section2_1.jpg"
                      style={{
                        maxWidth: "800px",
                        maxHeight: "415px",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Card.Body className="p-0">
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                      LTMU adalah UKM di Universitas Tarumanagara yang menjadi
                      wadah bagi mahasiswa untuk mengembangkan minat dan bakat
                      dalam olahraga tenis meja melalui latihan rutin dan
                      kompetisi, dengan tujuan meningkatkan prestasi dan
                      disiplin diri.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>
          <Col md={4}>
            <Link href="/event" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Card className="card-custom">
                  <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                    <Card.Img
                      variant="top"
                      src="/images/Home/Section2_2.jpg"
                      style={{
                        maxWidth: "800px",
                        maxHeight: "415px",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Card.Body className="p-0">
                    <Card.Title>Event</Card.Title>
                    <Card.Text>
                      Selain melaksanakan latiha, LTMU juga ada beberapa
                      kegiatan lain yang bisa kalian ikutin loh!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>
          <Col md={4}>
            <Link href="/contact" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Card className="card-custom">
                  <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                    <Card.Img
                      variant="top"
                      src="/images/Home/Section2_3.jpg"
                      style={{
                        maxWidth: "800px",
                        maxHeight: "415px",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Card.Body className="p-0">
                    <Card.Title>Contact</Card.Title>
                    <Card.Text>
                      Untuk informasi lebih lanjut kalian dapat menghubungi
                      kami.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Location</h2>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <div className="feature-content">
              <div className="mb-4">
                <h3>Universitas Tarumanagara</h3>
                <p>
                  Letjen S. Parman St No.1, RT.6/RW.16, Tomang, Grogol
                  petamburan, West Jakarta City, Jakarta 11440
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div
              style={{
                borderRadius: "2rem",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(60,60,75,0.18)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5533.969931984045!2d106.78482255138283!3d-6.1671910691670115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f65c8572640d%3A0xc0a066d78372614e!2sTarumanagara%20University!5e0!3m2!1sen!2sid!4v1762392557961!5m2!1sen!2sid"
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Universitas Tarumanagara"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Article</h2>
        <Row className="g-4">
          <Col md={6}>
            <Card className="card-custom">
              <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                <Card.Img
                  variant="top"
                  src="/images/Home/Section4_1.jpg"
                  style={{
                    maxWidth: "800px",
                    maxHeight: "400px",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>Keseruan UKM LTMU</Card.Title>
                <Card.Text>
                  Must have for someone good luck to see more for the real
                  person.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="card-custom">
              <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                <Card.Img
                  variant="top"
                  src="/images/Home/Section4_2.jpg"
                  style={{
                    maxWidth: "800px",
                    maxHeight: "400px",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>Kegiatan Latihan LTMU</Card.Title>
                <Card.Text>
                  This is the awesome give lots of awesome for it about one of
                  those.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Feedback</h2>
        <Row className="g-4">
          <Col md={4}>
            <div className="feedback-card">
              <p>This is awesome food especially the service on it</p>
              <div className="feedback-avatar avatar-red"></div>
            </div>
          </Col>
          <Col md={4}>
            <div className="feedback-card">
              <p>The service was incredible and awesome</p>
              <div className="feedback-avatar avatar-gray"></div>
            </div>
          </Col>
          <Col md={4}>
            <div className="feedback-card">
              <p>Best food ever</p>
              <div className="feedback-avatar avatar-blue"></div>
            </div>
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
              <h4>Contact Us</h4>
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
    </div>
  );
}
