"use client";

import React, { useEffect, useState } from "react"; // Import useState
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
  Carousel,
  Modal, // Import Modal
} from "react-bootstrap";
import Link from "next/link";
import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  GeoAlt,
  Clock,
  People,
} from "react-bootstrap-icons";

interface ArticleType {
  id: number;
  title: string;
  shortDescription: string;
  image: string; // base64 or url
  fullDescription: string;
}

interface HeroType {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

interface SectionType {
  id: number;
  title: string;
  description: string;
  image: string;
  page: string;
}

const API = process.env.NEXT_PUBLIC_HOME_PAGE || "";

export default function HomePage() {

  // State for dynamic content from API
  const [heroItems, setHeroItems] = useState<HeroType[]>([]);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [articlesData, setArticlesData] = useState<ArticleType[]>([]);

  // State untuk modal article
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);

  const handleArticleClick = (article: ArticleType) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const handleCloseArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  // Fetch data from backend
  const fetchHomepageData = async () => {
    try {
      const [hRes, sRes, aRes] = await Promise.all([fetch(`${API}/hero`), fetch(`${API}/section`), fetch(`${API}/article`)]);
      const hJson = await hRes.json();
      const sJson = await sRes.json();
      const aJson = await aRes.json();
      if (!hRes.ok) console.error("hero error", hJson);
      if (!sRes.ok) console.error("section error", sJson);
      if (!aRes.ok) console.error("article error", aJson);

      setHeroItems(hJson?.data || []);
      setSections(sJson?.data || []);
      setArticlesData(aJson?.data || []);
    } catch (err) {
      console.error("Failed to load homepage data", err);
    }
  };

  useEffect(() => {
    fetchHomepageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ backgroundColor: "#1a1d29", minHeight: "100vh", color: "white" }}>
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Navbar.Brand href="/" style={{ fontWeight: 600 }}>
            <img src="/images/Logo/ltmu.jpg" alt="LTMU Logo" style={{ height: "40px", width: "auto", marginRight: "10px", color: "white" }} />
            <span className="navbar-logo-text">LTMU</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
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

      <Carousel className="hero-carousel" fade interval={5000} pause="hover">
        {heroItems && heroItems.length > 0 && (
          heroItems.map((h) => (
            <Carousel.Item key={h.id}>
              <img
                src={h.image}
                alt={`Hero ${h.id}`}
                style={{
                  maxWidth: "1800px",
                  maxHeight: "680px",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover"
                }}
              />
              <div className="hero-overlay"></div>
              <Carousel.Caption className="hero-caption">
                <h2 className="hero-caption-title">{h.title}</h2>
                <p className="hero-caption-text">{h.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        )}
      </Carousel>

      <Container className="py-5 mt-5">
        <h2 className="section-title">Info Lengkap</h2>
        <Row className="g-4">
          {/* Render the first three sections from API (or fallback) */}
          {sections && sections.length > 0 && sections.slice(0, 3).map((sec: any) => (
            <Col md={4} key={sec.id}>
              <Link href={sec.page || "/"} passHref legacyBehavior>
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  <Card className="card-custom">
                    <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                      <Card.Img variant="top" src={sec.image} style={{ maxWidth: "800px", maxHeight: "415px", width: "100%", height: "auto", objectFit: "cover" }} />
                    </div>
                    <Card.Body className="p-0">
                      <Card.Title>{sec.title}</Card.Title>
                      <Card.Text>{sec.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Location</h2>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <Card className="location-info-card">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="location-icon">
                    <GeoAlt size={32} color="#f1c76e" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>Universitas Tarumanagara</h4>
                    <p style={{ color: "#cbd5e0", marginBottom: 0, lineHeight: "1.6" }}>Letjen S. Parman St No.1, RT.6/RW.16, Tomang, Grogol petamburan, West Jakarta City, Jakarta 11440</p>
                  </div>
                </div>

                <div className="location-details">
                  <div className="location-detail-item">
                    <Clock size={20} color="#b8a080" />
                    <div>
                      <strong>Jadwal Latihan</strong>
                      <p>Rabu & Jumat: 13.30 - 15.30 WIB
                        <br />
                        Kamis: 13.30 - 15.30 WIB
                      </p>
                    </div>
                  </div>

                  <div className="location-detail-item">
                    <People size={20} color="#b8a080" />
                    <div>
                      <strong>Contact Person</strong>
                      <p>Telp: 0812-1988-2077
                        <br />
                        Email: maheshaabi@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <div className="maps-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5533.969931984045!2d106.78482255138283!3d-6.1671910691670115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f65c8572640d%3A0xc0a066d78372614e!2sTarumanagara%20University!5e0!3m2!1sen!2sid!4v1762392557961!5m2!1sen!2sid" width="100%" height="400" style={{ border: 0, borderRadius: "1.5rem" }} allowFullScreen={false} loading="lazy" title="Universitas Tarumanagara" />
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Article</h2>
        <Row className="g-4">
          {articlesData && articlesData.length > 0 &&
            articlesData.map((article: ArticleType) => (
              <Col md={6} key={article.id}>
                <Card
                  className="card-custom"
                  onClick={() => handleArticleClick(article)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                    <Card.Img
                      variant="top"
                      src={article.image}
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
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.shortDescription}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="section-title">Feedback</h2>
        <Row className="g-4">
          {/* keep static feedback as before */}
          <Col md={4}>
            <div className="feedback-card-improved">
              <p className="feedback-message">This is awesome food especially the service on it</p>
              <div className="feedback-footer">
                <div className={`feedback-avatar avatar-red`}>J</div>
                <div className="feedback-user-info">
                  <strong>John Doe</strong>
                  <small>Member</small>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="feedback-card-improved">
              <p className="feedback-message">The service was incredible and awesome</p>
              <div className="feedback-footer">
                <div className={`feedback-avatar avatar-gray`}>J</div>
                <div className="feedback-user-info">
                  <strong>Jane Smith</strong>
                  <small>Member</small>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="feedback-card-improved">
              <p className="feedback-message">Best food ever</p>
              <div className="feedback-footer">
                <div className={`feedback-avatar avatar-blue`}>G</div>
                <div className="feedback-user-info">
                  <strong>Guest User</strong>
                  <small>Guest</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal untuk detail Artikel */}
      <Modal show={showArticleModal} onHide={handleCloseArticleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedArticle?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArticle && (
            <>
              <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: "100%", maxHeight: "250px", objectFit: "cover", objectPosition: "center", marginBottom: "15px", borderRadius: "5px" }} />
              <h5>Deskripsi Lengkap:</h5>
              <p>{selectedArticle.fullDescription}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseArticleModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="footer-custom">
        <Container>
          <Row>
            <Col md={3}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/images/Logo/ltmu.jpg" alt="LTMU Logo" height={35} />
                <h3 style={{ margin: 0 }}>LTMU</h3>
              </div>
              <p style={{ fontSize: 14, marginTop: 8 }}>© 2025 LTMU UNTAR. All Rights Reserved.</p>
              <Col md={3} className="mb-4">
                <div style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
                  <a className="nav-link" href="#" style={{ display: "flex", alignItems: "center" }}><Facebook size={24} color="#3b5998" /></a>
                  <a className="nav-link" href="#" style={{ display: "flex", alignItems: "center" }}><Youtube size={24} color="#FF0000" /></a>
                  <a className="nav-link" href="https://x.com/tenismejauntar?t=auj9mGyE3DCK6YlYJCFgbQ&s=09" style={{ display: "flex", alignItems: "center" }}><Twitter size={24} color="#1DA1F2" /></a>
                  <a className="nav-link" href="https://www.instagram.com/ltmu_untar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" style={{ display: "flex", alignItems: "center" }}><Instagram size={24} color="#d620eaff" /></a>
                </div>
              </Col>
            </Col>
            <Col md={3}>
              <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>Link</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/event">Event</a></li>
                <li><a href="/contact">Feedback</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>Contact</h4>
              <ul>
                <li><a href="mailto:ltmu@untar.ac.id">maheshaabi@gmail.com</a></li>
                <li><a href="tel:02112345678">0812-1988-2077</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h4 style={{ fontWeight: 700, color: "#f1c76e", marginBottom: "0.5rem" }}>Practice Schedule</h4>
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
