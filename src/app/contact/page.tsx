'use client'

import React from "react";
import { Navbar, Nav, Container, Button, Row, Col, Form } from "react-bootstrap";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div style={{ backgroundColor: "var(--dark-bg)", color: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Navbar.Brand href="/" style={{ fontWeight: 600 }}>
            PingPhonk
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/event">Event</Nav.Link>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <Row className="g-4">
          {/* Contact Form */}
          <Col lg={6} md={12}>
            <h3 className="mb-4">Contact Info</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Control as="textarea" rows={6} placeholder="Message" />
              </Form.Group>
              <Button type="submit" className="btn-event-cta">Send Message</Button>
            </Form>
          </Col>

          {/* Google Map */}
          <Col lg={6} md={12}>
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

      {/* Footer */}
      <footer className="footer-custom">
        <Container>
          <Row>
            <Col md={3} className="mb-4">
              <h3>PingPhonk</h3>
              <div>
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">t</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">yt</a>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <h4>Title</h4>
              <ul>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h4>Title</h4>
              <ul>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
              </ul>
            </Col>
            <Col md={3} className="mb-4">
              <h4>Title</h4>
              <ul>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default ContactPage;
