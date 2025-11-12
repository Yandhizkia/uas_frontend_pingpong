'use client';

import React, { useState } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Badge, Row, Col, Button, Modal } from 'react-bootstrap';

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
                    <Card className="event-joined-card">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg={getTypeColor(event.type)}>
                            {event.type.toUpperCase()}
                          </Badge>
                          {getStatusBadge(event.status)}
                        </div>

                        <h5 className="event-joined-title">{event.title}</h5>

                        <div className="event-joined-meta">
                          <div className="meta-item">
                            <span className="meta-icon">📅</span>
                            <span>{event.date}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">🕐</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.status === 'completed' && (
                          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--gray-600)' }}>
                            <div className="d-flex justify-content-between align-items-center">
                              <span style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>
                                Attendance:
                              </span>
                              {getAttendanceBadge(event.attendance)}
                            </div>
                            {event.achievement && (
                              <div className="mt-2">
                                <Badge bg="warning" style={{ fontSize: '0.85rem' }}>
                                  🏆 {event.achievement}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}

                        <Button 
                          className="btn-view-detail w-100 mt-3"
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
                    <span style={{ color: '#f1c76e' }}>{selectedEvent.achievement}</span>
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
    </div>
  );
}