'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Button, Form, Modal, Badge, Table, Accordion } from 'react-bootstrap';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
  isLoggedIn: boolean;
  reply?: string;
  replyDate?: string;
}

export default function FeedbackPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState('');

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Halo admin, saya mau tanya tentang jadwal latihan minggu depan. Apakah ada perubahan?',
      date: '2024-01-15',
      status: 'new',
      isLoggedIn: true
    },
    {
      id: 2,
      name: 'Guest User',
      email: 'guest@example.com',
      message: 'Saya tertarik untuk bergabung dengan club ini. Bagaimana caranya?',
      date: '2024-01-14',
      status: 'replied',
      isLoggedIn: false,
      reply: 'Terima kasih atas minatnya! Silakan kunjungi halaman registrasi kami.',
      replyDate: '2024-01-14'
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Website-nya keren! Tapi saya ada saran untuk menambah fitur gallery foto kegiatan.',
      date: '2024-01-13',
      status: 'read',
      isLoggedIn: true
    },
  ]);

  const handleOpenModal = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setReplyText(feedback.reply || '');
    setShowModal(true);
    
    // Mark as read
    if (feedback.status === 'new') {
      setFeedbacks(feedbacks.map(f => 
        f.id === feedback.id ? { ...f, status: 'read' } : f
      ));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
    setReplyText('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeedback) return;

    setFeedbacks(feedbacks.map(f => 
      f.id === selectedFeedback.id 
        ? { 
            ...f, 
            status: 'replied', 
            reply: replyText,
            replyDate: new Date().toISOString().split('T')[0]
          } 
        : f
    ));

    alert('Reply berhasil dikirim!');
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus feedback ini?')) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
      alert('Feedback berhasil dihapus!');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new': return <Badge bg="primary">New</Badge>;
      case 'read': return <Badge bg="secondary">Read</Badge>;
      case 'replied': return <Badge bg="success">Replied</Badge>;
      default: return null;
    }
  };

  const getStatusCount = (status: string) => {
    return feedbacks.filter(f => f.status === status).length;
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Feedback Management" />
        
        <Container fluid className="admin-main">
          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{getStatusCount('new')}</div>
                  <div className="stat-label">New Feedback</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{getStatusCount('read')}</div>
                  <div className="stat-label">Read</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{getStatusCount('replied')}</div>
                  <div className="stat-label">Replied</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{feedbacks.length}</div>
                  <div className="stat-label">Total Feedback</div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Feedback List */}
          <Card className="cms-card">
            <Card.Body>
              <h4 className="cms-section-title mb-4">All Feedback</h4>
              
              <div className="table-responsive">
                <Table className="cms-table" hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>User Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((feedback) => (
                      <tr key={feedback.id} className={feedback.status === 'new' ? 'feedback-new' : ''}>
                        <td>
                          <strong>{feedback.name}</strong>
                        </td>
                        <td>{feedback.email}</td>
                        <td>
                          <div style={{ maxWidth: '300px', fontSize: '0.9rem' }}>
                            {feedback.message.length > 60 
                              ? `${feedback.message.substring(0, 60)}...` 
                              : feedback.message
                            }
                          </div>
                        </td>
                        <td>{feedback.date}</td>
                        <td>
                          {feedback.isLoggedIn 
                            ? <Badge bg="info">Member</Badge>
                            : <Badge bg="secondary">Guest</Badge>
                          }
                        </td>
                        <td>{getStatusBadge(feedback.status)}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleOpenModal(feedback)}
                            >
                              {feedback.status === 'replied' ? 'View' : 'Reply'}
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleDelete(feedback.id)}
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

              {feedbacks.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p>Belum ada feedback dari users.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal for Reply */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Feedback Detail & Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {selectedFeedback && (
            <>
              {/* Feedback Detail */}
              <Card className="mb-3" style={{ backgroundColor: 'var(--gray-700)', border: 'none' }}>
                <Card.Body>
                  <div className="mb-2">
                    <strong>From:</strong> {selectedFeedback.name} ({selectedFeedback.email})
                  </div>
                  <div className="mb-2">
                    <strong>Date:</strong> {selectedFeedback.date}
                  </div>
                  <div className="mb-2">
                    <strong>User Type:</strong>{' '}
                    {selectedFeedback.isLoggedIn 
                      ? <Badge bg="info">Member</Badge>
                      : <Badge bg="secondary">Guest</Badge>
                    }
                  </div>
                  <div className="mb-2">
                    <strong>Status:</strong> {getStatusBadge(selectedFeedback.status)}
                  </div>
                  <hr style={{ borderColor: 'var(--gray-600)' }} />
                  <div>
                    <strong>Message:</strong>
                    <p className="mt-2 mb-0">{selectedFeedback.message}</p>
                  </div>
                </Card.Body>
              </Card>

              {/* Previous Reply (if exists) */}
              {selectedFeedback.reply && (
                <Card className="mb-3" style={{ backgroundColor: 'rgba(184, 160, 128, 0.1)', border: '1px solid var(--gray-600)' }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Your Previous Reply:</strong>
                      <small className="text-muted">Sent on {selectedFeedback.replyDate}</small>
                    </div>
                    <p className="mb-0">{selectedFeedback.reply}</p>
                  </Card.Body>
                </Card>
              )}

              {/* Reply Form */}
              <Form onSubmit={handleSendReply}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>{selectedFeedback.status === 'replied' ? 'Update Reply' : 'Your Reply'}</strong>
                  </Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    required
                  />
                  <Form.Text>
                    Reply ini akan dikirim ke email: {selectedFeedback.email}
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Send Reply
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}