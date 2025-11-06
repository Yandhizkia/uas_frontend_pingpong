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

export default function AboutPage() {
  return (
    <div
      style={{ backgroundColor: "#1a1d29", minHeight: "100vh", color: "white" }}
    >

      <Navbar expand="lg" className="navbar-custom fixed-top">
        <div className="navbar-wave"></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Navbar.Brand
            href="/"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            PingPhonk
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
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=600&fit=crop"
              alt="LTMU Hero"
              className="hero-image-about"
            />
            <div className="hero-text-overlay">
              <h1>LTMU</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=500&fit=crop"
                alt="Foto 1"
                className="foto-image"
              />
            </Col>
            <Col md={6}>
              <div className="foto-text">
                <h2>Foto 1</h2>
                <p>Lorem ipsum</p>
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
                <h2>Foto 2</h2>
                <p>Lorem ipsum</p>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop"
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
              <h3>Pingfbank</h3>
              <div>
                <a href="#" className="social-icon">
                  f
                </a>
                <a href="#" className="social-icon">
                  t
                </a>
                <a href="#" className="social-icon">
                  in
                </a>
                <a href="#" className="social-icon">
                  yt
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
