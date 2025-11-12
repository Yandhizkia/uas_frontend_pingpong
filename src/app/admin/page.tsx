"use client";

import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Container, Row, Col, Card } from "react-bootstrap";
import { House, FileText, CalendarEvent, Megaphone } from "react-bootstrap-icons";


export default function DashboardPage() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Dashboard" />

<Container fluid className="admin-main">
          <Row className="g-4">
            <Col md={4}>
              <Card className="stat-card h-100"> {/* Added h-100 here */}
                <Card.Body>
                  <div className="stat-icon">
                    <House size={48} color="#f1c76e" />
                  </div>
                  <h3>Homepage</h3>
                  <p>Manage homepage content</p>
                  <a href="/admin/homepage" className="stat-link">
                    Kelola →
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="stat-card h-100"> {/* Added h-100 here */}
                <Card.Body>
                  <div className="stat-icon">
                    <FileText size={48} color="#f1c76e" />
                  </div>
                  <h3>About</h3>
                  <p>Manage about page</p>
                  <a href="/admin/about" className="stat-link">
                    Kelola →
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="stat-card h-100"> {/* Added h-100 here */}
                <Card.Body>
                  <div className="stat-icon">
                    <CalendarEvent size={48} color="#f1c76e" />
                  </div>
                  <h3>Event</h3>
                  <p>Manage events & products</p>
                  <a href="/admin/event" className="stat-link">
                    Kelola →
                  </a>
                </Card.Body>
              </Card>
            </Col>

              <Col md={4}>
              <Card className="stat-card h-100"> {/* Added h-100 here */}
                <Card.Body>
                  <div className="stat-icon">
                    <Megaphone size={48} color="#f1c76e" />
                  </div>
                  <h3>Announcement</h3>
                  <p>Manage Info for Customers</p>
                  <a href="/admin/announcement" className="stat-link">
                    Kelola →
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="stat-card h-100"> {/* Added h-100 here */}
                <Card.Body>
                  <div className="stat-icon">
                    <Megaphone size={48} color="#f1c76e" />
                  </div>
                  <h3>Feedback</h3>
                  <p>Read & reply message from customers</p>
                  <a href="/admin/announcement" className="stat-link">
                    Kelola →
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
