'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Button, Table, Modal, Form, Badge, Tabs, Tab } from 'react-bootstrap';

export default function EventsManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'quick' | 'regular' | 'special'>('quick');
  const [editingItem, setEditingItem] = useState<any>(null);

  // Quick Events (yang di dashboard)
  const [quickEvents, setQuickEvents] = useState([
    {
      id: 1,
      title: 'Latihan Rutin',
      date: '2024-01-20',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      status: 'active'
    },
    {
      id: 2,
      title: 'Tournament Internal',
      date: '2024-01-25',
      time: '09.00 - 15.00',
      location: 'GOR Untar',
      type: 'tournament',
      status: 'active'
    },
    {
      id: 3,
      title: 'Workshop Teknik',
      date: '2024-01-28',
      time: '14.00 - 16.00',
      location: 'Ruang A',
      type: 'workshop',
      status: 'active'
    },
  ]);

  // Regular Schedule (yang di schedule page - recurring)
  const [regularSchedule, setRegularSchedule] = useState([
    {
      id: 1,
      title: 'Latihan Rutin',
      day: 'Monday',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      recurring: true,
      coach: 'Coach Budi',
      status: 'active'
    },
    {
      id: 2,
      title: 'Latihan Rutin',
      day: 'Wednesday',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      recurring: true,
      coach: 'Coach Sari',
      status: 'active'
    },
    {
      id: 3,
      title: 'Latihan Rutin',
      day: 'Friday',
      time: '16.00 - 18.00 WIB',
      location: 'GOR Untar',
      type: 'training',
      recurring: true,
      coach: 'Coach Budi',
      status: 'active'
    },
    {
      id: 4,
      title: 'Latihan Khusus',
      day: 'Saturday',
      time: '09.00 - 12.00 WIB',
      location: 'GOR Untar',
      type: 'special',
      recurring: true,
      coach: 'Coach Andi',
      status: 'active'
    },
  ]);

  // Special Upcoming Events (yang di schedule page - upcoming special events)
  const [specialEvents, setSpecialEvents] = useState([
    {
      id: 1,
      title: 'Tournament Internal',
      date: '2024-01-25',
      time: '09.00 - 15.00',
      location: 'GOR Untar',
      type: 'tournament',
      participants: 24,
      maxParticipants: 50,
      description: 'Tournament internal untuk seleksi atlet',
      status: 'active'
    },
    {
      id: 2,
      title: 'Workshop Teknik Serve',
      date: '2024-01-28',
      time: '14.00 - 16.00',
      location: 'Ruang A',
      type: 'workshop',
      participants: 15,
      maxParticipants: 30,
      description: 'Workshop teknik backhand dengan coach profesional',
      status: 'active'
    },
  ]);

  const handleOpenModal = (type: 'quick' | 'regular' | 'special', item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDeleteQuick = (id: number) => {
    if (confirm('Yakin ingin menghapus event ini?')) {
      setQuickEvents(quickEvents.filter(e => e.id !== id));
      alert('Event berhasil dihapus!');
    }
  };

  const handleDeleteRegular = (id: number) => {
    if (confirm('Yakin ingin menghapus schedule ini?')) {
      setRegularSchedule(regularSchedule.filter(e => e.id !== id));
      alert('Schedule berhasil dihapus!');
    }
  };

  const handleDeleteSpecial = (id: number) => {
    if (confirm('Yakin ingin menghapus special event ini?')) {
      setSpecialEvents(specialEvents.filter(e => e.id !== id));
      alert('Special event berhasil dihapus!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Event berhasil disimpan!');
    handleCloseModal();
  };

  const getTypeBadge = (type: string) => {
    const colors: any = {
      training: 'primary',
      tournament: 'danger',
      workshop: 'info',
      special: 'warning',
      match: 'success'
    };
    return <Badge bg={colors[type] || 'secondary'}>{type.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge bg="success">Active</Badge>
      : <Badge bg="secondary">Inactive</Badge>;
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Events Management" />
        
        <Container fluid className="admin-main">
          <Tabs defaultActiveKey="quick" className="event-tabs mb-4">
            {/* Quick Events Tab */}
            <Tab eventKey="quick" title="Quick Events (Dashboard)">
              <Card className="cms-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="cms-section-title mb-1">Quick Events</h4>
                      <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0 }}>
                        Events yang muncul di user dashboard
                      </p>
                    </div>
                    <Button className="btn-add" onClick={() => handleOpenModal('quick')}>
                      + Add Quick Event
                    </Button>
                  </div>

                  <div className="table-responsive">
                    <Table className="cms-table" hover>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quickEvents.map((event) => (
                          <tr key={event.id}>
                            <td><strong>{event.title}</strong></td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.location}</td>
                            <td>{getTypeBadge(event.type)}</td>
                            <td>{getStatusBadge(event.status)}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button 
                                  variant="warning" 
                                  size="sm"
                                  onClick={() => handleOpenModal('quick', event)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  onClick={() => handleDeleteQuick(event.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Tab>

            {/* Regular Schedule Tab */}
            <Tab eventKey="regular" title="Regular Schedule">
              <Card className="cms-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="cms-section-title mb-1">Regular Training Schedule</h4>
                      <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0 }}>
                        Jadwal latihan rutin mingguan
                      </p>
                    </div>
                    <Button className="btn-add" onClick={() => handleOpenModal('regular')}>
                      + Add Schedule
                    </Button>
                  </div>

                  <div className="table-responsive">
                    <Table className="cms-table" hover>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Day</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Coach</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regularSchedule.map((schedule) => (
                          <tr key={schedule.id}>
                            <td><strong>{schedule.title}</strong></td>
                            <td>{schedule.day}</td>
                            <td>{schedule.time}</td>
                            <td>{schedule.location}</td>
                            <td>{schedule.coach}</td>
                            <td>{getTypeBadge(schedule.type)}</td>
                            <td>{getStatusBadge(schedule.status)}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button 
                                  variant="warning" 
                                  size="sm"
                                  onClick={() => handleOpenModal('regular', schedule)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  onClick={() => handleDeleteRegular(schedule.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Tab>

            {/* Special Upcoming Events Tab - NEW! */}
            <Tab eventKey="special" title="Upcoming Special Events">
              <Card className="cms-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="cms-section-title mb-1">Upcoming Special Events</h4>
                      <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0 }}>
                        Special events di schedule page (dengan full registration)
                      </p>
                    </div>
                    <Button className="btn-add" onClick={() => handleOpenModal('special')}>
                      + Add Special Event
                    </Button>
                  </div>

                  <div className="table-responsive">
                    <Table className="cms-table" hover>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Type</th>
                          <th>Participants</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {specialEvents.map((event) => (
                          <tr key={event.id}>
                            <td>
                              <strong>{event.title}</strong>
                              <br />
                              <small style={{ color: 'var(--gray-400)' }}>
                                {event.description}
                              </small>
                            </td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.location}</td>
                            <td>{getTypeBadge(event.type)}</td>
                            <td>
                              <Badge bg="info">
                                {event.participants}/{event.maxParticipants}
                              </Badge>
                            </td>
                            <td>{getStatusBadge(event.status)}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button 
                                  variant="warning" 
                                  size="sm"
                                  onClick={() => handleOpenModal('special', event)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  onClick={() => handleDeleteSpecial(event.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            {editingItem ? 'Edit' : 'Add'} {
              modalType === 'quick' ? 'Quick Event' : 
              modalType === 'regular' ? 'Regular Schedule' : 
              'Special Event'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            {modalType === 'quick' ? (
              // Quick Event Form
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Tournament Internal"
                    defaultValue={editingItem?.title}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={editingItem?.date}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., 16.00 - 18.00 WIB"
                        defaultValue={editingItem?.time}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., GOR Untar"
                    defaultValue={editingItem?.location}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Event Type</Form.Label>
                      <Form.Select defaultValue={editingItem?.type || 'training'}>
                        <option value="training">Training</option>
                        <option value="tournament">Tournament</option>
                        <option value="workshop">Workshop</option>
                        <option value="match">Match</option>
                        <option value="meeting">Meeting</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select defaultValue={editingItem?.status || 'active'}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              </>
            ) : modalType === 'regular' ? (
              // Regular Schedule Form
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Schedule Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Latihan Rutin"
                    defaultValue={editingItem?.title}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Day</Form.Label>
                      <Form.Select defaultValue={editingItem?.day || 'Monday'}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., 16.00 - 18.00 WIB"
                        defaultValue={editingItem?.time}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., GOR Untar"
                    defaultValue={editingItem?.location}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Coach Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Coach Budi"
                    defaultValue={editingItem?.coach}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select defaultValue={editingItem?.type || 'training'}>
                        <option value="training">Training</option>
                        <option value="special">Special Training</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select defaultValue={editingItem?.status || 'active'}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox"
                    label="Recurring Weekly"
                    defaultChecked={editingItem?.recurring ?? true}
                  />
                </Form.Group>
              </>
            ) : (
              // Special Event Form - NEW!
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Tournament Nasional"
                    defaultValue={editingItem?.title}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Brief description of the event"
                    defaultValue={editingItem?.description}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={editingItem?.date}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., 09.00 - 15.00"
                        defaultValue={editingItem?.time}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Jakarta Convention Center"
                    defaultValue={editingItem?.location}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Event Type</Form.Label>
                      <Form.Select defaultValue={editingItem?.type || 'tournament'}>
                        <option value="tournament">Tournament</option>
                        <option value="workshop">Workshop</option>
                        <option value="match">Match</option>
                        <option value="special">Special Event</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Max Participants</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="e.g., 50"
                        defaultValue={editingItem?.maxParticipants}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select defaultValue={editingItem?.status || 'active'}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <div className="alert alert-info" style={{ 
                  backgroundColor: 'rgba(23, 162, 184, 0.1)',
                  border: '1px solid rgba(23, 162, 184, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#cbd5e0'
                }}>
                  <small>
                    💡 Special events akan muncul di schedule page dengan button "Register Now" dan full registration form.
                  </small>
                </div>
              </>
            )}

            <div className="d-flex gap-2 justify-content-end mt-4">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingItem ? 'Update' : 'Create'} {
                  modalType === 'quick' ? 'Event' : 
                  modalType === 'regular' ? 'Schedule' : 
                  'Special Event'
                }
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}