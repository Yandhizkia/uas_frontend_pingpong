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

export default function HomePage() {
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


      <Carousel className="hero-carousel">
        <Carousel.Item>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop"
            alt="Hero 1"
          />
          <div className="hero-overlay"></div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=900&fit=crop"
            alt="Hero 2"
          />
          <div className="hero-overlay"></div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&h=900&fit=crop"
            alt="Hero 3"
          />
          <div className="hero-overlay"></div>
        </Carousel.Item>
      </Carousel>


      <Container className="py-5 mt-5">
        <h2 className="section-title">Section heading</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="card-custom">
              <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop"
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>About</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-custom">
              <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop"
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>Game</Card.Title>
                <Card.Text>
                  This will be awesome, proof that you will be awesome too and
                  other thing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-custom">
              <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop"
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>Contact</Card.Title>
                <Card.Text>
                  Lorem ipsum, awesome about the paragraph of this thing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Section heading</h2>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <div className="feature-content">
              <div className="mb-4">
                <h3>Subheading</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="mb-4">
                <h3>Subheading</h3>
                <p>
                  This will be awesome, proof that you will be awesome too. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="mb-4">
                <h3>Subheading</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
                  will be awesome, proof that you will be awesome too and other
                  thing.
                </p>
              </div>
              <div>
                <Button className="btn-custom">Button</Button>
                <Button className="btn-custom">Secondary button</Button>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div style={{ borderRadius: "2rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(60,60,75,0.18)" }}>
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
        <h2 className="section-title">Section heading</h2>
        <Row className="g-4">
          <Col md={6}>
            <Card className="card-custom">
              <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=500&fit=crop"
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>Article 1</Card.Title>
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
                  src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=500&fit=crop"
                />
              </div>
              <Card.Body className="p-0">
                <Card.Title>Article 2</Card.Title>
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

      {/* Footer */}
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
