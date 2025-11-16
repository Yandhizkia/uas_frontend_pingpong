'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Button, Table, Modal, Form, Badge, Tabs, Tab } from 'react-bootstrap';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function EventsManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'quick' | 'regular' | 'special'>('quick');
  const [editingItem, setEditingItem] = useState<any>(null);

  const [quickEvents, setQuickEvents] = useState<any[]>([]);
  const [regularSchedule, setRegularSchedule] = useState<any[]>([]);
  const [specialEvents, setSpecialEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchQuickEvents(), fetchSchedules(), fetchSpecialEvents()]);
    setLoading(false);
  };

  const fetchQuickEvents = async () => {
    try {
      const res = await fetch(`${API}/api/quick-events`);
      if (!res.ok) throw new Error('Gagal fetch quick events');
      const data = await res.json();
      setQuickEvents(data);
    } catch (err) {
      console.error(err);
      alert('Gagal memuat quick events');
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await fetch(`${API}/api/schedules`);
      if (!res.ok) throw new Error('Gagal fetch schedules');
      const data = await res.json();
      setRegularSchedule(data);
    } catch (err) {
      console.error(err);
      alert('Gagal memuat schedules');
    }
  };

  const fetchSpecialEvents = async () => {
    try {
      const res = await fetch(`${API}/api/events`);
      if (!res.ok) throw new Error('Gagal fetch events');
      const data = await res.json();
      // treat all events as "special" for this tab (backend's event model)
      setSpecialEvents(data);
    } catch (err) {
      console.error(err);
      alert('Gagal memuat special events');
    }
  };

  const handleOpenModal = (type: 'quick' | 'regular' | 'special', item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  // ---------- DELETE handlers ----------
  const handleDeleteQuick = async (id: number) => {
    if (!confirm('Yakin ingin menghapus event ini?')) return;
    try {
      const res = await fetch(`${API}/api/quick-events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setQuickEvents(prev => prev.filter(e => e.id !== id));
      alert('Event berhasil dihapus!');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus quick event');
    }
  };

  const handleDeleteRegular = async (id: number) => {
    if (!confirm('Yakin ingin menghapus schedule ini?')) return;
    try {
      const res = await fetch(`${API}/api/schedules/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setRegularSchedule(prev => prev.filter(e => e.id !== id));
      alert('Schedule berhasil dihapus!');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus schedule');
    }
  };

  const handleDeleteSpecial = async (id: number) => {
    if (!confirm('Yakin ingin menghapus special event ini?')) return;
    try {
      const res = await fetch(`${API}/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setSpecialEvents(prev => prev.filter(e => e.id !== id));
      alert('Special event berhasil dihapus!');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus special event');
    }
  };

  // ---------- SAVE (Create or Update) ----------
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      if (modalType === 'quick') {
        // quick event fields
        const payload: any = {
          title: fd.get('title') as string,
          date: fd.get('date') as string,
          time: fd.get('time') as string,
          location: fd.get('location') as string,
          type: fd.get('type') as string,
          recurringWeekly: fd.get('recurringWeekly') ? true : false,
        };

        if (editingItem) {
          // UPDATE
          const res = await fetch(`${API}/api/quick-events/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Update failed');
          const data = await res.json();
          setQuickEvents(prev => prev.map(p => (p.id === data.id ? data : p)));
          alert('Quick event berhasil diperbarui');
        } else {
          // CREATE
          const res = await fetch(`${API}/api/quick-events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Create failed');
          const data = await res.json();
          setQuickEvents(prev => [data, ...prev]);
          alert('Quick event berhasil dibuat');
        }
      } else if (modalType === 'regular') {
        // schedule fields
        const payload: any = {
          title: fd.get('title') as string,
          day: fd.get('day') as string,
          time: fd.get('time') as string,
          location: fd.get('location') as string,
          type: fd.get('type') as string,
          recurringWeekly: fd.get('recurringWeekly') ? true : false,
        };

        if (editingItem) {
          const res = await fetch(`${API}/api/schedules/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Update failed');
          const data = await res.json();
          setRegularSchedule(prev => prev.map(p => (p.id === data.id ? data : p)));
          alert('Schedule berhasil diperbarui');
        } else {
          const res = await fetch(`${API}/api/schedules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Create failed');
          const data = await res.json();
          setRegularSchedule(prev => [data, ...prev]);
          alert('Schedule berhasil dibuat');
        }
      } else {
        // special event fields (use Event model)
        const payload: any = {
          title: fd.get('title') as string,
          description: fd.get('description') as string,
          date: fd.get('date') as string,
          time: fd.get('time') as string,
          location: fd.get('location') as string,
          type: fd.get('type') as string,
          max_participants: Number(fd.get('max_participants') || 0),
        };

        if (editingItem) {
          const res = await fetch(`${API}/api/events/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Update failed');
          const data = await res.json();
          setSpecialEvents(prev => prev.map(p => (p.id === data.id ? data : p)));
          alert('Special event berhasil diperbarui');
        } else {
          const res = await fetch(`${API}/api/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Create failed');
          const data = await res.json();
          setSpecialEvents(prev => [data, ...prev]);
          alert('Special event berhasil dibuat');
        }
      }

      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data. Cek console untuk detail.');
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: any = {
      training: 'primary',
      tournament: 'danger',
      workshop: 'info',
      special: 'warning',
      match: 'success'
    };
    return <Badge bg={colors[type] || 'secondary'}>{(type || '').toUpperCase()}</Badge>;
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Events Management" />

        <Container fluid className="admin-main">
          <Tabs defaultActiveKey="quick" className="event-tabs mb-4">
            {/* Quick Events Tab */}
            <Tab eventKey="quick" title={`Quick Events (Dashboard) ${loading ? '— loading...' : ''}`}>
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
                        {quickEvents.length === 0 && (
                          <tr><td colSpan={6} className="text-center">No quick events</td></tr>
                        )}
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
                          <th>Type</th>
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
                            <td>{getTypeBadge(schedule.type)}</td>
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
                        {regularSchedule.length === 0 && (
                          <tr><td colSpan={6} className="text-center">No schedules</td></tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Tab>

            {/* Special Upcoming Events Tab */}
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
                                {event.participants ?? 0}/{event.max_participants ?? event.maxParticipants ?? 0}
                              </Badge>
                            </td>
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
                        {specialEvents.length === 0 && (
                          <tr><td colSpan={7} className="text-center">No special events</td></tr>
                        )}
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
                    name="title"
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
                        name="date"
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
                        name="time"
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
                    name="location"
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
                      <Form.Select name="type" defaultValue={editingItem?.type || 'training'}>
                        <option value="training">Training</option>
                        <option value="tournament">Tournament</option>
                        <option value="workshop">Workshop</option>
                        <option value="match">Match</option>
                        <option value="meeting">Meeting</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Check 
                    name="recurringWeekly"
                    type="checkbox"
                    label="Recurring Weekly"
                    defaultChecked={editingItem?.recurringWeekly ?? false}
                  />
                </Form.Group>
              </>
            ) : modalType === 'regular' ? (
              // Regular Schedule Form
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Schedule Title</Form.Label>
                  <Form.Control
                    name="title"
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
                      <Form.Select name="day" defaultValue={editingItem?.day || 'Monday'}>
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
                        name="time"
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
                    name="location"
                    type="text"
                    placeholder="e.g., GOR Untar"
                    defaultValue={editingItem?.location}
                    required
                  />
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select name="type" defaultValue={editingItem?.type || 'training'}>
                        <option value="training">Training</option>
                        <option value="special">Special Training</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Check 
                    name="recurringWeekly"
                    type="checkbox"
                    label="Recurring Weekly"
                    defaultChecked={editingItem?.recurringWeekly ?? false}
                  />
                </Form.Group>
              </>
            ) : (
              // Special Event Form - NEW!
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    name="title"
                    type="text"
                    placeholder="e.g., Tournament Nasional"
                    defaultValue={editingItem?.title}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
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
                        name="date"
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
                        name="time"
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
                    name="location"
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
                      <Form.Select name="type" defaultValue={editingItem?.type || 'tournament'}>
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
                        name="max_participants"
                        type="number"
                        placeholder="e.g., 50"
                        defaultValue={editingItem?.max_participants ?? editingItem?.maxParticipants}
                        required
                      />
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
              <Button 
                type="submit"
                // Apply custom styles for the background, border, and text color
                style={{ 
                  backgroundColor: '#f1c76e', 
                  borderColor: '#f1c76e', 
                  color: '#333' // Dark text for better contrast
                }}
              >
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
