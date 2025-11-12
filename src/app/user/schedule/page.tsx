'use client';

import React, { useState } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { Calendar3, Clock, GeoAlt, People } from 'react-bootstrap-icons';
import EventRegistrationModal from '../components/EventRegistrationModal';

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const schedules = [
    {
      id: 1,
      title: 'Latihan Rutin',
      day: 'Monday',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      recurring: true,
      coach: 'Coach Budi'
    },
    {
      id: 2,
      title: 'Latihan Rutin',
      day: 'Wednesday',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      recurring: true,
      coach: 'Coach Sari'
    },
    {
      id: 3,
      title: 'Latihan Rutin',
      day: 'Friday',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      recurring: true,
      coach: 'Coach Budi'
    },
    {
      id: 4,
      title: 'Latihan Khusus',
      day: 'Saturday',
      time: '09.00 - 12.00 WIB',
      location: 'GOR Untar',
      type: 'special',
      recurring: true,
      coach: 'Coach Andi'
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Tournament Internal',
      date: '2024-01-25',
      time: '09.00 - 15.00',
      location: 'GOR Untar',
      type: 'tournament',
      participants: 24
    },
    {
      id: 2,
      title: 'Workshop Teknik Serve',
      date: '2024-01-28',
      time: '14.00 - 16.00',
      location: 'Ruang A',
      type: 'workshop',
      participants: 15
    },
  ];

  const getTypeColor = (type: string) => {
    const colors: any = {
      training: 'primary',
      special: 'warning',
      tournament: 'danger',
      workshop: 'info'
    };
    return colors[type] || 'secondary';
  };

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setShowRegisterModal(true);
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
              <h4 className="cms-section-title mb-4">Regular Training Schedule</h4>
              <Row className="g-3">
                {schedules.map((schedule) => (
                  <Col md={6} lg={3} key={schedule.id}>
                    <Card className="schedule-card">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg={getTypeColor(schedule.type)}>
                            {schedule.type.toUpperCase()}
                          </Badge>
                          {schedule.recurring && (
                            <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>
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
                          <div className="schedule-detail-item">
                            <People size={14} />
                            <span>{schedule.coach}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          {/* Upcoming Special Events */}
          <Card className="cms-card">
            <Card.Body>
              <h4 className="cms-section-title mb-4">Upcoming Special Events</h4>
              <Row className="g-4">
                {upcomingSessions.map((session) => (
                  <Col md={6} key={session.id}>
                    <Card className="event-card-special">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <Badge bg={getTypeColor(session.type)} className="mb-2">
                              {session.type.toUpperCase()}
                            </Badge>
                            <h5 style={{ color: '#d3d7e8', marginBottom: '0.5rem' }}>
                              {session.title}
                            </h5>
                          </div>
                          <div className="event-date-mini">
                            {new Date(session.date).getDate()}
                            <span>{new Date(session.date).toLocaleDateString('en', { month: 'short' })}</span>
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
                            <span>{session.participants} participants</span>
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
              </Row>
            </Card.Body>
          </Card>

          {/* Modal pendaftaran */}
          <EventRegistrationModal
            show={showRegisterModal}
            onHide={() => setShowRegisterModal(false)}
            event={selectedEvent}
          />
        </Container>
      </div>
    </div>
  );
}
