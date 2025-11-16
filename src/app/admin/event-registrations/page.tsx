'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";
 

export default function EventRegistrationsPage() {
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      eventTitle: 'Tournament Internal 2024',
      eventDate: '2024-02-15',
      name: 'John Doe',
      nim: '525200999',
      email: 'john.doe@student.untar.ac.id',
      phone: '081234567890',
      faculty: 'Teknik',
      major: 'Informatika',
      category: 'singles',
      experience: 'intermediate',
      registrationDate: '2024-01-20',
      status: 'pending',
      notes: 'Ready to compete!'
    },
    {
      id: 2,
      eventTitle: 'Workshop Teknik Serve',
      eventDate: '2024-02-20',
      name: 'Jane Smith',
      nim: '525200888',
      email: 'jane.smith@student.untar.ac.id',
      phone: '081234567891',
      faculty: 'Ekonomi',
      major: 'Manajemen',
      category: 'singles',
      experience: 'beginner',
      registrationDate: '2024-01-21',
      status: 'approved',
      notes: 'First time joining'
    },
    {
      id: 3,
      eventTitle: 'Tournament Internal 2024',
      eventDate: '2024-02-15',
      name: 'Bob Wilson',
      nim: '525200777',
      email: 'bob.wilson@student.untar.ac.id',
      phone: '081234567892',
      faculty: 'Hukum',
      major: 'Ilmu Hukum',
      category: 'doubles',
      experience: 'advanced',
      registrationDate: '2024-01-22',
      status: 'approved',
      notes: 'Looking for doubles partner'
    },
    {
      id: 4,
      eventTitle: 'Friendly Match',
      eventDate: '2024-02-10',
      name: 'Alice Brown',
      nim: '525200666',
      email: 'alice.brown@student.untar.ac.id',
      phone: '081234567893',
      faculty: 'Psikologi',
      major: 'Psikologi',
      category: 'singles',
      experience: 'intermediate',
      registrationDate: '2024-01-23',
      status: 'rejected',
      rejectionReason: 'Event full',
      notes: ''
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEvent, setFilterEvent] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();


  const safeRegistrations = registrations || [];

const events = Array.from(new Set(registrations.map(r => r.eventTitle)));


  const filteredRegistrations = safeRegistrations.filter(reg => {
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    const matchesEvent = filterEvent === 'all' || reg.eventTitle === filterEvent;
    return matchesStatus && matchesEvent;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'pending') return <Badge bg="warning">Pending</Badge>;
    if (status === 'approved') return <Badge bg="success">Approved</Badge>;
    if (status === 'rejected') return <Badge bg="danger">Rejected</Badge>;
    return <Badge bg="secondary">Unknown</Badge>;
  };

  const getStatusCount = (status: string) =>
    safeRegistrations.filter(r => r.status === status).length;

  const handleViewDetail = (registration: any) => {
    setSelectedRegistration(registration);
    setShowDetailModal(true);
  };

const handleApprove = (id: number) => {
  showConfirm({
    title: "Approve Registration",
    message: "Are you sure you want to approve this participant?",
    confirmText: "Approve",
    cancelText: "Cancel",
    variant: "success", // ✅ Sekarang bisa pakai "success"
    onConfirm: () => {
      setRegistrations(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'approved' } : r))
      );
      success("Registration approved successfully!");
      setShowDetailModal(false);
    },
  });
};

  const handleReject = (id: number) => {
showConfirm({
  title: "Reject Registration",
  message: "Provide a reason for rejection.",
  confirmText: "Reject",
  cancelText: "Cancel",
  variant: "danger",
  onConfirm: () => {
    const reason = prompt("Rejection reason:");
    if (reason) {
      setRegistrations(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: 'rejected', rejectionReason: reason } : r
        )
      );
      error("Registration has been rejected.");
      setShowDetailModal(false);
    }
  },
});

  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Event Registrations" />
        <Container fluid className="admin-main">
          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {['pending', 'approved', 'rejected'].map(status => (
              <div className="col-md-3" key={status}>
                <Card className="stat-card-mini">
                  <Card.Body className="text-center">
                    <div className="stat-number">{getStatusCount(status)}</div>
                    <div className="stat-label">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                  </Card.Body>
                </Card>
              </div>
            ))}
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{safeRegistrations.length}</div>
                  <div className="stat-label">Total</div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Filter & Table */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="cms-section-title">All Registrations</h4>
                <div className="d-flex gap-2">
                  <Form.Select
                    value={filterEvent}
                    onChange={e => setFilterEvent(e.target.value)}
                    style={{
                      width: 'auto',
                      backgroundColor: 'var(--gray-700)',
                      border: '1px solid var(--gray-600)',
                      color: 'white'
                    }}
                  >
                    <option value="all">All Events</option>
                    {events.map(event => (
                      <option key={event} value={event}>{event}</option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    style={{
                      width: 'auto',
                      backgroundColor: 'var(--gray-700)',
                      border: '1px solid var(--gray-600)',
                      color: 'white'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </div>
              </div>

              <div className="table-responsive">
                <Table className="cms-table" hover>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Participant</th>
                      <th>NIM</th>
                      <th>Faculty</th>
                      <th>Category</th>
                      <th>Registration Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map(reg => (
                      <tr key={reg.id}>
                        <td>
                          <strong>{reg.eventTitle}</strong><br/>
                          <small style={{ color: 'var(--gray-400)' }}>{reg.eventDate}</small>
                        </td>
                        <td>
                          <strong>{reg.name}</strong><br/>
                          <small style={{ color: 'var(--gray-400)' }}>{reg.email}</small>
                        </td>
                        <td>{reg.nim}</td>
                        <td>{reg.faculty}</td>
                        <td><Badge bg="info">{reg.category.toUpperCase()}</Badge></td>
                        <td>{reg.registrationDate}</td>
                        <td>{getStatusBadge(reg.status)}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleViewDetail(reg)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {filteredRegistrations.length === 0 && (
                  <div className="text-center py-5 text-muted">
                    <p>No registrations found</p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>

        {/* Detail Modal */}
        <Modal
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>Registration Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">
            {selectedRegistration && (
              <div>
                <div className="mb-4">
                  <h5 style={{ color: '#f1c76e' }}>{selectedRegistration.eventTitle}</h5>
                  <p style={{ color: '#cbd5e0', margin: 0 }}>
                    Event Date: {selectedRegistration.eventDate}
                  </p>
                </div>

                <div className="registration-detail-grid">
                  <div className="detail-section">
                    <h6 style={{ color: '#b8bee6', marginBottom: '1rem' }}>Participant Information</h6>
                    <div className="detail-row"><strong>Name:</strong><span>{selectedRegistration.name}</span></div>
                    <div className="detail-row"><strong>NIM:</strong><span>{selectedRegistration.nim}</span></div>
                    <div className="detail-row"><strong>Email:</strong><span>{selectedRegistration.email}</span></div>
                    <div className="detail-row"><strong>Phone:</strong><span>{selectedRegistration.phone}</span></div>
                    <div className="detail-row"><strong>Faculty:</strong><span>{selectedRegistration.faculty}</span></div>
                    <div className="detail-row"><strong>Major:</strong><span>{selectedRegistration.major}</span></div>
                  </div>

                  <div className="detail-section mt-4">
                    <h6 style={{ color: '#b8bee6', marginBottom: '1rem' }}>Event Details</h6>
                    <div className="detail-row"><strong>Category:</strong> <Badge bg="info">{selectedRegistration.category.toUpperCase()}</Badge></div>
                    <div className="detail-row"><strong>Experience:</strong> <span className="text-capitalize">{selectedRegistration.experience}</span></div>
                    <div className="detail-row"><strong>Registration Date:</strong> <span>{selectedRegistration.registrationDate}</span></div>
                    <div className="detail-row"><strong>Status:</strong> {getStatusBadge(selectedRegistration.status)}</div>
                  </div>

                  {selectedRegistration.notes && (
                    <div className="detail-section mt-4">
                      <h6 style={{ color: '#b8bee6', marginBottom: '0.5rem' }}>Notes:</h6>
                      <p style={{ color: '#cbd5e0', marginBottom: 0 }}>{selectedRegistration.notes}</p>
                    </div>
                  )}

                  {selectedRegistration.rejectionReason && (
                    <div className="detail-section mt-4">
                      <h6 style={{ color: '#dc3545', marginBottom: '0.5rem' }}>Rejection Reason:</h6>
                      <p style={{ color: '#cbd5e0', marginBottom: 0 }}>{selectedRegistration.rejectionReason}</p>
                    </div>
                  )}
                </div>

                {selectedRegistration.status === 'pending' && (
                  <div className="d-flex gap-2 justify-content-end mt-4">
                    <Button variant="danger" onClick={() => handleReject(selectedRegistration.id)}>Reject</Button>
                    <Button variant="success" onClick={() => handleApprove(selectedRegistration.id)}>Approve</Button>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
        </Modal>
         <CustomToast toasts={toasts} onClose={removeToast} />
              <CustomConfirm
                show={confirmState.show}
                title={confirmState.options.title}
                message={confirmState.options.message}
                confirmText={confirmState.options.confirmText}
                cancelText={confirmState.options.cancelText}
                variant={confirmState.options.variant}
                onConfirm={handleConfirm}
                onCancel={hideConfirm}
              />
      </div>
    </div>
  );
}
