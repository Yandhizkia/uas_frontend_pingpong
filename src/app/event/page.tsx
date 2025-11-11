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

export default function EventPage() {
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

<div className="event-hero"
style={{ marginTop: "100px", marginBottom: "10px" }}
>
        <Container>
          <div className="event-hero-content">
            <img
              src="/images/Event/Event1.jpg"
              alt="Event Hero"
              className="event-hero-image"
            />
          </div>
        </Container>
      </div>

      <Container className="my-5 py-5">
        <h2 className="section-title">Next Event</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="/images/Event/Event2.jpg"
                style={{
                  width: "100%",
                  height: "275px",
                  maxWidth: "1800px",
                  maxHeight: "680px",
                }}
              />
              <Card.Body>
                <Card.Title className="product-title">Event 1</Card.Title>
                <Card.Text className="product-desc">
                  Keterangan event 1
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="/images/Event/Event3.jpg"
                style={{
                  width: "100%",
                  height: "275px",
                  maxWidth: "1800px",
                  maxHeight: "680px",
                }}
              />
              <Card.Body>
                <Card.Title className="product-title">Event 2</Card.Title>
                <Card.Text className="product-desc">
                  Keterangan Event 2
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="/images/Event/Event4.jpg"
                style={{
                  width: "100%",
                  height: "275px",
                  maxWidth: "1800px",
                  maxHeight: "680px",
                }}
              />
              <Card.Body>
                <Card.Title className="product-title">Event 3</Card.Title>
                <Card.Text className="product-desc">
                  Keterangan Event 3
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="/images/Event/Event5.jpg"
                style={{
                  width: "100%",
                  height: "275px",
                  maxWidth: "1800px",
                  maxHeight: "680px",
                }}
              />
              <Card.Body>
                <Card.Title className="product-title">Event 4</Card.Title>
                <Card.Text className="product-desc">
                  Keterangan Event 4
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="/images/Event/Event6.jpg"
                style={{
                  width: "100%",
                  height: "275px",
                  maxWidth: "1800px",
                  maxHeight: "680px",
                }}
              />
              <Card.Body>
                <Card.Title className="product-title">Event 5</Card.Title>
                <Card.Text className="product-desc">
                  Keterangan Event 5
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="/images/Event/Event7.jpg"
                style={{
                  width: "100%",
                  height: "275px",
                  maxWidth: "1800px",
                  maxHeight: "680px",
                }}
              />
              <Card.Body>
                <Card.Title className="product-title">Event 6</Card.Title>
                <Card.Text className="product-desc">
                  Keterangan Event 6
                </Card.Text>
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
              <h4>ApaKabar</h4>
              <ul>
                <li>
                  <a href="#">0123456789</a>
                </li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h4>Garis</h4>
              <ul>
                <li>
                  <a href="#">Abibi88</a>
                </li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h4>TokTok</h4>
              <ul>
                <li>
                  <a href="#">AbiLTMU</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
