'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UserSidebar from '../user/components/Sidebar';
import UserHeader from '../user/components/Header';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  Calendar,        // Already used for "Events Joined" stat
  Trophy,          // Already used for "Upcoming Events" stat
  ChatDots,        // Already used for "Feedback Sent" stat
  Megaphone,       // Already used for "Announcements" stat
  CalendarEvent,   // For event date in event list
  Clock,           // For event time in event list
  GeoAlt,          // For event location in event list
  CheckCircleFill, // For activity status in recent activity
} from 'react-bootstrap-icons';
import QuickEventRegistrationModal from '../user/components/QuickEventRegistrationModal';

export default function UserDashboard() {
  const stats = {
    eventsJoined: 12,
    upcomingEvents: 3,
    feedbackSent: 5,
    announcements: 2,
  };

  const upcomingEvents = [
    { id: 1, title: 'Latihan Rutin', date: '2024-01-20', time: '16.00 - 18.00', location: 'GOR Untar' },
    { id: 2, title: 'Tournament Internal', date: '2024-01-25', time: '09.00 - 15.00', location: 'GOR Untar' },
    { id: 3, title: 'Workshop Teknik', date: '2024-01-28', time: '14.00 - 16.00', location: 'Ruang A' },
  ];

  const recentActivity = [
    { id: 1, event: 'Latihan Rutin', date: '2024-01-15', status: 'completed' },
    { id: 2, event: 'Friendly Match', date: '2024-01-10', status: 'completed' },
    { id: 3, event: 'Team Meeting', date: '2024-01-05', status: 'completed' },
  ];

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setShowRegisterModal(true);
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
                  <h3 className="mb-2" style={{ color: '#f1c76e' }}>
                    Welcome back, John! 👋
                  </h3>
                  <p className="mb-0" style={{ color: '#cbd5e0' }}>
                    Ready for today's training? Check out your upcoming events and stay updated!
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <img
                    src="/images/Logo/ltmu.jpg"
                    alt="LTMU"
                    style={{ width: '80px', opacity: 0.8 }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Stats Cards */}
          <Row className="g-4 mb-4">
            {/* Events Joined */}
            <Col md={3}>
              <Link href="/user/events-joined" style={{ textDecoration: 'none' }}>
                <Card className="stat-card-user text-center p-4" style={{ cursor: 'pointer' }}>
                  <div className="stat-icon-user mb-3">
                    <Calendar size={32} color="#f1c76e" />
                  </div>
                  <h3 className="stat-number">{stats.eventsJoined}</h3>
                  <p className="stat-label-user">Events Joined</p>
                </Card>
              </Link>
            </Col>

            {/* Upcoming Events */}
            <Col md={3}>
              <Card className="stat-card-user text-center p-4">
                <div className="stat-icon-user mb-3">
                  <Trophy size={32} color="#f1c76e" />
                </div>
                <h3 className="stat-number">{stats.upcomingEvents}</h3>
                <p className="stat-label-user">Upcoming Events</p>
              </Card>
            </Col>

            {/* Feedback Sent */}
            <Col md={3}>
              <Card className="stat-card-user text-center p-4">
                <div className="stat-icon-user mb-3">
                  <ChatDots size={32} color="#f1c76e" />
                </div>
                <h3 className="stat-number">{stats.feedbackSent}</h3>
                <p className="stat-label-user">Feedback Sent</p>
              </Card>
            </Col>

            {/* Announcements */}
            <Col md={3}>
              <Link href="/user/announcement" style={{ textDecoration: 'none' }}>
                <Card className="stat-card-user text-center p-4" style={{ cursor: 'pointer' }}>
                  <div className="stat-icon-user mb-3">
                    <Megaphone size={32} color="#f1c76e" />
                  </div>
                  <h3 className="stat-number">{stats.announcements}</h3>
                  <p className="stat-label-user">New Announcements</p>
                </Card>
              </Link>
            </Col>
          </Row>

          {/* Event List + Recent Activity */}
          <Row className="g-4">
            {/* Upcoming Events */}
            <Col lg={7}>
              <Card className="cms-card">
                <Card.Body>
                  <h4 className="cms-section-title mb-4">Upcoming Events</h4>
                  <div className="event-list">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="event-item-user">
                        <div className="event-date-badge">
                          <div className="event-day">{new Date(event.date).getDate()}</div>
                          <div className="event-month">
                            {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                          </div>
                        </div>
                        <div className="event-details">
                          <h5>{event.title}</h5>
                          <p className="event-info">
                            <span><Clock className="me-1" /> {event.time}</span>
                            <span><GeoAlt className="me-1" /> {event.location}</span>
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
                        {/* Changed '✓' to CheckCircleFill icon */}
                        <div className="activity-icon"><CheckCircleFill color="#28a745" size={20} /></div>
                        <div className="activity-content">
                          <strong>{activity.event}</strong>
                          <small>{activity.date}</small>
                        </div>
                        <span className="activity-status completed">Completed</span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Modal */}
          <QuickEventRegistrationModal
            show={showRegisterModal}
            onHide={() => setShowRegisterModal(false)}
            event={selectedEvent}
          />
        </Container>
      </div>
    </div>
  );
}