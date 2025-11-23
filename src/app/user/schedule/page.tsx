"use client";

import React, { useEffect, useState } from "react";
import UserSidebar from "../components/Sidebar";
import UserHeader from "../components/Header";
import { Container, Card, Row, Col, Badge, Button } from "react-bootstrap";
import { Calendar3, Clock, GeoAlt, People } from "react-bootstrap-icons";
import EventRegistrationModal from "../components/EventRegistrationModal";
import CustomToast from "@/components/CustomToast";
import { useToast } from "@/app/hooks/UseToast";

const API = process.env.NEXT_PUBLIC_EVENT_MANAGEMENT || "";

export default function SchedulePage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [schedules, setSchedules] = useState<any[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resSchedules, resEvents] = await Promise.all([
        fetch(`${API}/schedules`),
        fetch(`${API}/events`),
      ]);
      if (resSchedules.ok) {
        const s = await resSchedules.json();
        setSchedules(s);
      } else {
        error("Failed to load schedules");
      }
      if (resEvents.ok) {
        const ev = await resEvents.json();
        setUpcomingSessions(ev);
      } else {
        error("Failed to load events");
      }
    } catch (err) {
      console.error(err);
      error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: any = {
      training: "primary",
      special: "warning",
      tournament: "danger",
      workshop: "info",
    };
    return colors[type] || "secondary";
  };

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setShowRegisterModal(true);
  };

  const handleRegistrationSuccess = () => {
    success("Registration successful! We'll contact you soon.");
  };

  const handleRegistrationError = (message: string) => {
    error(message);
  };

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="Schedule" />

        <Container fluid className="admin-main">
          {/* Regular Schedule */}
          <Card className="cms-card mb-4">
            <Card.Body>
              <h4 className="cms-section-title mb-4">
                Regular Training Schedule
              </h4>
              <Row className="g-3">
                {schedules.map((schedule) => (
                  <Col md={6} lg={3} key={schedule.id}>
                    <Card className="schedule-card">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg={getTypeColor(schedule.type)}>
                            {schedule.type?.toUpperCase()}
                          </Badge>
                          {schedule.recurringWeekly && (
                            <span
                              style={{
                                color: "var(--gray-400)",
                                fontSize: "0.75rem",
                              }}
                            >
                              🔁 Weekly
                            </span>
                          )}
                        </div>

                        <h5 className="schedule-day">{schedule.day}</h5>
                        <h6 className="schedule-title">{schedule.title}</h6>

                        <div className="schedule-details">
                          <div className="schedule-detail-item">
                            <Clock size={14} />
                            <span>{schedule.time}</span>
                          </div>
                          <div className="schedule-detail-item">
                            <GeoAlt size={14} />
                            <span>{schedule.location}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {schedules.length === 0 && !loading && (
                  <div className="text-muted p-3">No schedules available.</div>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Upcoming Special Events */}
          <Card className="cms-card">
            <Card.Body>
              <h4 className="cms-section-title mb-4">
                Upcoming Special Events
              </h4>
              <Row className="g-4">
                {upcomingSessions.map((session) => (
                  <Col md={6} key={session.id}>
                    <Card className="event-card-special">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <Badge
                              bg={getTypeColor(session.type)}
                              className="mb-2"
                            >
                              {session.type?.toUpperCase()}
                            </Badge>
                            <h5
                              style={{
                                color: "#d3d7e8",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {session.title}
                            </h5>
                          </div>
                          <div className="event-date-mini">
                            {session.date
                              ? new Date(session.date).getDate()
                              : ""}
                            <span>
                              {session.date
                                ? new Date(session.date).toLocaleDateString(
                                    "en",
                                    { month: "short" }
                                  )
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className="event-meta-list">
                          <div className="event-meta-item">
                            <Calendar3 size={16} color="#f1c76e" />
                            <span>{session.date}</span>
                          </div>
                          <div className="event-meta-item">
                            <Clock size={16} color="#f1c76e" />
                            <span>{session.time}</span>
                          </div>
                          <div className="event-meta-item">
                            <GeoAlt size={16} color="#f1c76e" />
                            <span>{session.location}</span>
                          </div>
                          <div className="event-meta-item">
                            <People size={16} color="#f1c76e" />
                            <span>
                              {session.participants ?? 0} participants
                            </span>
                          </div>
                        </div>

                        <Button
                          className="btn-join-event w-100 mt-3"
                          onClick={() => handleRegisterClick(session)}
                        >
                          Register Now
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {upcomingSessions.length === 0 && !loading && (
                  <div className="text-muted p-3">
                    No upcoming special events.
                  </div>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Modal pendaftaran */}
          <EventRegistrationModal
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
