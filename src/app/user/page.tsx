"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserSidebar from "../user/components/Sidebar";
import UserHeader from "../user/components/Header";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import {
  Calendar,
  Trophy,
  ChatDots,
  Megaphone,
  CheckCircleFill,
} from "react-bootstrap-icons";
import QuickEventRegistrationModal from "../user/components/QuickEventRegistrationModal";
import CustomToast from "@/components/CustomToast";
import { useToast } from "@/app/hooks/UseToast";

const API = process.env.NEXT_PUBLIC_EVENT_MANAGEMENT || "";

export default function UserDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const { toasts, removeToast, success, error } = useToast();

  const stats = {
    eventsJoined: 12,
    upcomingEvents: 3,
    feedbackSent: 5,
    announcements: 2,
  };

  const [name, setName] = useState("User");

  useEffect(() => {
    const savedName = localStorage.getItem("name") || "User";
    setName(savedName);
  }, []);

  // Fetch events from backend
  useEffect(() => {
    fetchQuick();
  }, []);

  const fetchQuick = async () => {
    try {
      setLoadingEvents(true);
      const res = await fetch(`${API}/quick-events`);
      if (!res.ok) throw new Error("Fetch quick events failed");
      const data = await res.json();
      setUpcomingEvents(data);
    } catch (err) {
      console.error(err);
      error("Failed to load events");
    } finally {
      setLoadingEvents(false);
    }
  };

  const recentActivity = [
    { id: 1, event: "Latihan Rutin", date: "2024-01-15", status: "completed" },
    { id: 2, event: "Friendly Match", date: "2024-01-10", status: "completed" },
    { id: 3, event: "Team Meeting", date: "2024-01-05", status: "completed" },
  ];

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleRegisterClick = (event: any) => {
    setSelectedEvent({
      _id: event._id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
    });

    setShowRegisterModal(true);
  };

  const handleRegistrationSuccess = () => {
    success("Registration successful! Check your email for confirmation.");
  };

  const handleRegistrationError = (message: string) => {
    error(message);
  };

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="Dashboard" />

        <Container fluid className="admin-main">
          {/* Welcome Banner */}
          <Card className="welcome-banner mb-4">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h3 className="mb-2" style={{ color: "#f1c76e" }}>
                    Welcome back, {name}! 👋
                  </h3>
                  <p className="mb-0" style={{ color: "#cbd5e0" }}>
                    Ready for today's training?
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <img
                    src="/images/Logo/ltmu.jpg"
                    alt="LTMU"
                    style={{ width: "80px", opacity: 0.8 }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Stats Cards */}
          <Row className="g-4 mb-4">
            <Col md={3}>
              <Link
                href="/user/events-joined"
                style={{ textDecoration: "none" }}
              >
                <Card className="stat-card-user text-center p-4">
                  <Calendar size={32} color="#f1c76e" />
                  <h3 className="stat-number">{stats.eventsJoined}</h3>
                  <p className="stat-label-user">Events Joined</p>
                </Card>
              </Link>
            </Col>

            <Col md={3}>
              <Card className="stat-card-user text-center p-4">
                <Trophy size={32} color="#f1c76e" />
                <h3 className="stat-number">{stats.upcomingEvents}</h3>
                <p className="stat-label-user">Upcoming Events</p>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="stat-card-user text-center p-4">
                <ChatDots size={32} color="#f1c76e" />
                <h3 className="stat-number">{stats.feedbackSent}</h3>
                <p className="stat-label-user">Feedback Sent</p>
              </Card>
            </Col>

            <Col md={3}>
              <Link
                href="/user/announcement"
                style={{ textDecoration: "none" }}
              >
                <Card className="stat-card-user text-center p-4">
                  <Megaphone size={32} color="#f1c76e" />
                  <h3 className="stat-number">{stats.announcements}</h3>
                  <p className="stat-label-user">New Announcements</p>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Upcoming Events */}
            <Col lg={7}>
              <Card className="cms-card">
                <Card.Body>
                  <h4 className="cms-section-title mb-4">Upcoming Events</h4>

                  {loadingEvents ? (
                    <p style={{ color: "#cbd5e0" }}>Loading events...</p>
                  ) : upcomingEvents.length === 0 ? (
                    <p style={{ color: "#cbd5e0" }}>No events available.</p>
                  ) : (
                    <div className="event-list">
                      {upcomingEvents.map((event) => (
                        <div key={event._id} className="event-item-user">
                          <div className="event-date-badge">
                            <div className="event-day">
                              {new Date(event.date).getDate()}
                            </div>
                            <div className="event-month">
                              {new Date(event.date).toLocaleDateString("en", {
                                month: "short",
                              })}
                            </div>
                          </div>

                          <div className="event-details">
                            <h5>{event.title}</h5>
                            <p className="event-info">
                              <span>🕐 {event.time}</span>
                              <span>📍 {event.location}</span>
                            </p>
                          </div>

                          <button
                            className="btn-event-join"
                            onClick={() => handleRegisterClick(event)}
                          >
                            Join
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Recent Activity */}
            <Col lg={5}>
              <Card className="cms-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="cms-section-title mb-0">Recent Activity</h4>
                    <Link href="/user/events-joined" className="view-all-link">
                      View All
                    </Link>
                  </div>

                  <div className="activity-list">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="activity-item-user">
                        <div className="activity-icon">
                          <CheckCircleFill color="#28a745" size={20} />
                        </div>
                        <div className="activity-content">
                          <strong>{activity.event}</strong>
                          <small>{activity.date}</small>
                        </div>
                        <span className="activity-status completed">
                          Completed
                        </span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <QuickEventRegistrationModal
            show={showRegisterModal}
            onHide={() => setShowRegisterModal(false)}
            event={selectedEvent}
            onSuccess={handleRegistrationSuccess}
            onError={handleRegistrationError}
          />

          <CustomToast toasts={toasts} onClose={removeToast} />
        </Container>
      </div>
    </div>
  );
}
