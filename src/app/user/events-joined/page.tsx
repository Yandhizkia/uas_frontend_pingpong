'use client';

import React, { useState } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Badge, Row, Col, Button, Modal } from 'react-bootstrap';
// Import icons dari react-bootstrap-icons
import { CalendarDate, Clock, GeoAlt, Trophy } from 'react-bootstrap-icons';

export default function EventsJoinedPage() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const eventsJoined = [
    {
      id: 1,
      title: 'Latihan Rutin Januari',
      type: 'training',
      date: '2024-01-15',
      time: '16.00 - 18.00',
      location: 'GOR Untar',
      status: 'completed',
      attendance: 'present',
      notes: 'Latihan teknik forehand dan serve'
    },
    {
      id: 2,
      title: 'Tournament Internal 2024',
      type: 'tournament',
      date: '2024-01-12',
      time: '09.00 - 15.00',
      location: 'GOR Untar',
      status: 'completed',
      attendance: 'present',
      achievement: 'Juara 2 - Singles',
      notes: 'Pertandingan berjalan lancar'
    },
    {
      id: 3,
      title: 'Friendly Match vs Team B',
      type: 'match',
      date: '2024-01-10',
      time: '14.00 - 16.00',
      location: 'GOR Untar',
      status: 'completed',
      attendance: 'present',
      notes: 'Match seru dan banyak pembelajaran'
    },
    {
      id: 4,
      title: 'Workshop Teknik Backhand',
      type: 'workshop',
      date: '2024-01-05',
      time: '14.00 - 16.00',
      location: 'Ruang A',
      status: 'completed',
      attendance: 'present',
      notes: 'Workshop dengan coach profesional'
    },
    {
      id: 5,
      title: 'Team Meeting Q1 2024',
      type: 'meeting',
      date: '2024-01-03',
      time: '13.00 - 14.00',
      location: 'Online - Zoom',
      status: 'completed',
      attendance: 'present',
      notes: 'Pembahasan program kerja'
    },
    {
      id: 6,
      title: 'Tournament Nasional',
      type: 'tournament',
      date: '2024-02-10',
      time: '08.00 - 17.00',
      location: 'Jakarta Convention Center',
      status: 'registered',
      attendance: 'pending',
      notes: 'Menunggu hari H'
    },
  ];

  const getTypeColor = (type: string) => {
    const colors: any = {
      training: 'primary',
      tournament: 'danger',
      match: 'success',
      workshop: 'info',
      meeting: 'secondary'
    };
    return colors[type] || 'secondary';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed') return <Badge bg="success">Completed</Badge>;
    if (status === 'registered') return <Badge bg="warning">Registered</Badge>;
    return <Badge bg="secondary">Unknown</Badge>;
  };

  const getAttendanceBadge = (attendance: string) => {
    if (attendance === 'present') return <Badge bg="success">Present</Badge>;
    if (attendance === 'absent') return <Badge bg="danger">Absent</Badge>;
    return <Badge bg="secondary">Pending</Badge>;
  };

  const handleShowDetail = (event: any) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  // Define a dark background color for the icons to contrast with yellow
  const iconBgColor = '#343a40'; // Using the same dark color as button hover text for consistency

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="Events Joined" />
        
        <Container fluid className="admin-main">
          <Card className="cms-card">
            <Card.Body>
              <div className="mb-4">
                <h4 className="cms-section-title mb-2">My Event History</h4>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
                  Track all events you've participated in
                </p>
              </div>

              <Row className="g-4">
                {eventsJoined.map((event) => (
                  <Col md={6} lg={4} key={event.id}>
                    <Card className="event-joined-card h-100"> 
                      <Card.Body className="p-4 d-flex flex-column"> 
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg={getTypeColor(event.type)}>
                            {event.type.toUpperCase()}
                          </Badge>
                          {getStatusBadge(event.status)}
                        </div>

                        <h5 className="event-joined-title">{event.title}</h5>

                        <div className="event-joined-meta mb-3"> {/* mb-3 for ~15px spacing */}
                          <div className="meta-item">
                            <span className="icon-with-background">
                                <CalendarDate style={{ color: iconBgColor }} /> {/* Icon color */}
                            </span>
                            <span>{event.date}</span>
                          </div>
                          <div className="meta-item">
                            <span className="icon-with-background">
                                <Clock style={{ color: iconBgColor }} /> {/* Icon color */}
                            </span>
                            <span>{event.time}</span>
                          </div>
                          <div className="meta-item">
                            <span className="icon-with-background">
                                <GeoAlt style={{ color: iconBgColor }} /> {/* Icon color */}
                            </span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.status === 'completed' && (
                          <div className="mt-3 pt-3 mb-3" style={{ borderTop: '1px solid var(--gray-600)' }}> {/* mb-3 for ~15px spacing */}
                            <div className="d-flex justify-content-between align-items-center">
                              <span style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>
                                Attendance:
                              </span>
                              {getAttendanceBadge(event.attendance)}
                            </div>
                            {event.achievement && (
                              <div className="mt-2">
                                <Badge bg="warning" style={{ fontSize: '0.85rem' }}>
                                  <span className="icon-with-background small-icon-bg me-1">
                                      <Trophy style={{ color: iconBgColor }} />
                                  </span> 
                                  {event.achievement}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                        <Button 
                          className="btn-view-detail w-100 mt-auto btn-custom-yellow-outline" 
                          onClick={() => handleShowDetail(event)}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {selectedEvent && (
            <div>
              <div className="mb-3">
                <Badge bg={getTypeColor(selectedEvent.type)} className="me-2">
                  {selectedEvent.type.toUpperCase()}
                </Badge>
                {getStatusBadge(selectedEvent.status)}
              </div>

              <h5 style={{ color: '#d3d7e8', marginBottom: '1rem' }}>
                {selectedEvent.title}
              </h5>

              <div className="event-detail-info">
                <div className="detail-row">
                  <strong>Date:</strong>
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="detail-row">
                  <strong>Time:</strong>
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="detail-row">
                  <strong>Location:</strong>
                  <span>{selectedEvent.location}</span>
                </div>
                {selectedEvent.status === 'completed' && (
                  <div className="detail-row">
                    <strong>Attendance:</strong>
                    {getAttendanceBadge(selectedEvent.attendance)}
                  </div>
                )}
                {selectedEvent.achievement && (
                  <div className="detail-row">
                    <strong>Achievement:</strong>
                    <span style={{ color: '#f1c76e' }}>
                      <span className="icon-with-background small-icon-bg me-1">
                          <Trophy style={{ color: iconBgColor }} />
                      </span>
                      {selectedEvent.achievement}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <strong style={{ color: '#b8bee6' }}>Notes:</strong>
                <p style={{ color: '#cbd5e0', marginTop: '0.5rem', lineHeight: '1.6' }}>
                  {selectedEvent.notes}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Custom styles for the button, icons, and their backgrounds */}
      <style jsx global>{`
        .btn-custom-yellow-outline {
          border: 1px solid #f1c76e !important;
          color: #f1c76e !important;
          background-color: transparent !important;
          transition: all 0.2s ease-in-out;
        }

        .btn-custom-yellow-outline:hover {
          background-color: #f1c76e !important;
          color: #343a40 !important; /* Dark text for contrast on yellow background */
          border-color: #f1c76e !important;
        }

        .event-joined-card .card-body {
          display: flex;
          flex-direction: column;
        }
        
        .event-joined-card {
            height: 100%;
        }

        /* Styles for the icon with yellow background */
        .icon-with-background {
          display: inline-flex; /* Use inline-flex to align with text */
          align-items: center;
          justify-content: center;
          width: 30px; /* Fixed width for the background circle */
          height: 30px; /* Fixed height for the background circle */
          background-color: #f1c76e; /* Yellow background */
          border-radius: 50%; /* Make it circular */
          margin-right: 0.75rem; /* Space between icon background and text, roughly 12px */
          flex-shrink: 0; /* Prevent shrinking */
        }

        .icon-with-background svg {
          font-size: 1.1rem; /* Adjust icon size to fit well within the circle */
        }

        /* Smaller version for the trophy icon in the achievement badge */
        .icon-with-background.small-icon-bg {
            width: 22px;
            height: 22px;
            margin-right: 0.5rem; /* Adjust margin for smaller icon */
        }

        .icon-with-background.small-icon-bg svg {
            font-size: 0.9rem; /* Adjust icon size for smaller background */
        }

        /* Ensure meta-item items align nicely */
        .event-joined-meta .meta-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem; /* Space between meta items */
        }

        .event-joined-meta .meta-item:last-child {
            margin-bottom: 0; /* No margin for the last item */
        }
      `}</style>
    </div>
  );
}