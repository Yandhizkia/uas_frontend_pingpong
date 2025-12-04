'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

// API baru khusus registrasi
const API_REG = process.env.NEXT_PUBLIC_EVENT_REGISTRATION_API || "http://localhost:5000/api";

export default function EventRegistrationsPage() {
  // state akan menampung bentuk data yang UI ekspektasikan (tanpa ubah UI)
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEvent, setFilterEvent] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  // fetch dari backend dan map ke bentuk yang UI sudah gunakan
  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch(`${API_REG}/registrations`);
      if (!res.ok) throw new Error("Failed to fetch registrations");
      const data = await res.json();

      // map setiap item ke bentuk yang digunakan UI (eventTitle, eventDate, name, nim, faculty, registrationDate, status, id, etc.)
      const mapped = (data || []).map((r: any) => {
        const statusLower = (r.status || '').toString().toLowerCase();
        return {
          id: r._id,
          eventTitle: r?.event_id?.title || (r.eventTitle ?? ''),
          eventDate: r?.event_id?.date || (r.eventDate ?? ''),
          name: r?.user_id?.full_name || r?.user_name || (r.name ?? ''),
          nim: r?.user_id?.nim || (r.nim ?? ''),
          email: r?.user_id?.email || (r.email ?? ''),
          phone: r?.user_id?.phone || (r.phone ?? ''),
          faculty: r?.user_id?.faculty || (r.faculty ?? ''),
          major: r?.user_id?.major || (r.major ?? ''),
          category: (r.category || '').toString(),
          experience: (r.experience || '').toString(),
          registrationDate: r?.created_at ? new Date(r.created_at).toISOString().split('T')[0] : (r.registrationDate ?? ''),
          status: statusLower === 'pending' ? 'pending' : statusLower === 'approved' ? 'approved' : statusLower === 'rejected' ? 'rejected' : (r.status ?? 'pending').toString().toLowerCase(),
          rejectionReason: r.rejectionReason || r.rejection_reason || null,
          notes: r.notes || '',
          raw: r // simpan raw jika diperlukan
        };
      });

      setRegistrations(mapped);
    } catch (err) {
      console.error(err);
      error("Failed to load registrations");
    }
  }, [error]);

  useEffect(() => {
    fetchRegistrations();

    // Dengarkan event dari QuickEventRegistrationModal agar admin refetch saat ada pendaftaran baru
    const handler = () => {
      fetchRegistrations();
    };
    window.addEventListener("registrations-updated", handler);

    return () => {
      window.removeEventListener("registrations-updated", handler);
    };
  }, [fetchRegistrations]);

  const safeRegistrations = registrations || [];
  const events = Array.from(new Set(safeRegistrations.map(r => r.eventTitle)));

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

  // panggil API untuk approve (PUT /registrations/:id/status)
  const handleApprove = (id: string) => {
    showConfirm({
      title: "Approve Registration",
      message: "Are you sure you want to approve this participant?",
      confirmText: "Approve",
      cancelText: "Cancel",
      variant: "success",
      onConfirm: async () => {
        try {
          const res = await fetch(`${API_REG}/registrations/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Approved" }), // backend enum capitalized
          });
          if (!res.ok) throw new Error("Update failed");
          success("Registration approved successfully!");
          setShowDetailModal(false);
          fetchRegistrations();
          // dispatch agar user page juga bisa mendengar (opsional)
          window.dispatchEvent(new CustomEvent("registrations-updated"));
        } catch (err) {
          console.error(err);
          error("Failed to approve registration");
        }
      },
    });
  };

  const handleReject = (id: string) => {
    setSelectedRegistration(registrations.find(r => r.id === id));
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      error("Please provide a rejection reason.");
      return;
    }
    try {
      const id = selectedRegistration?.id;
      if (!id) throw new Error("No selected registration");

      const res = await fetch(`${API_REG}/registrations/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected", rejectionReason }), // backend akan menyimpan 'status'
      });

      if (!res.ok) throw new Error("Reject failed");

      // update UI
      error("Registration has been rejected.");
      setShowRejectModal(false);
      setShowDetailModal(false);
      setRejectionReason('');
      fetchRegistrations();
      window.dispatchEvent(new CustomEvent("registrations-updated"));
    } catch (err) {
      console.error(err);
      error("Failed to reject registration");
    }
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
                        <td><Badge bg="info">{(reg.category || '').toString().toUpperCase()}</Badge></td>
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
                    <div className="detail-row"><strong>Category:</strong> <Badge bg="info">{(selectedRegistration.category || '').toString().toUpperCase()}</Badge></div>
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

        {/* Reject Modal */}
        <Modal
          show={showRejectModal}
          onHide={() => {
            setShowRejectModal(false);
            setRejectionReason('');
          }}
          centered
        >
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>Reject Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">
            <Form.Group>
              <Form.Label>Rejection Reason <span style={{ color: '#dc3545' }}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejecting this registration..."
                style={{
                  backgroundColor: 'var(--gray-700)',
                  border: '1px solid var(--gray-600)',
                  color: 'white'
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="modal-footer-custom">
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowRejectModal(false);
                setRejectionReason('');
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmReject}>
              Reject Registration
            </Button>
          </Modal.Footer>
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
