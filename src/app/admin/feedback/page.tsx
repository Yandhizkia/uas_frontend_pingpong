"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Container,
  Card,
  Button,
  Form,
  Modal,
  Badge,
  Table,
} from "react-bootstrap";
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
  isLoggedIn: boolean;
  reply?: string;
  replyDate?: string;
}

export default function FeedbackPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [replyText, setReplyText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      message:
        "Hi admin, I'd like to ask about next week's training schedule. Are there any changes?",
      date: "2024-01-15",
      status: "new",
      isLoggedIn: true,
    },
    {
      id: 2,
      name: "Guest User",
      email: "guest@example.com",
      message:
        "I'm interested in joining this club. How can I register?",
      date: "2024-01-14",
      status: "replied",
      isLoggedIn: false,
      reply:
        "Thank you for your interest! Please visit our registration page.",
      replyDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      message:
        "The website looks great! But I have a suggestion to add a photo gallery feature for activities.",
      date: "2024-01-13",
      status: "read",
      isLoggedIn: true,
    },
  ]);

  const filteredFeedbacks = feedbacks.filter(f => 
    filterStatus === 'all' || f.status === filterStatus
  );

  const handleOpenModal = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setReplyText(feedback.reply || "");
    setShowModal(true);

    // Mark as read
    if (feedback.status === "new") {
      setFeedbacks(
        feedbacks.map((f) =>
          f.id === feedback.id ? { ...f, status: "read" } : f
        )
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
    setReplyText("");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeedback) return;

    if (!replyText.trim()) {
      error("Please write a reply message.");
      return;
    }

    setFeedbacks(
      feedbacks.map((f) =>
        f.id === selectedFeedback.id
          ? {
              ...f,
              status: "replied",
              reply: replyText,
              replyDate: new Date().toISOString().split("T")[0],
            }
          : f
      )
    );

    success("Reply sent successfully!");
    handleCloseModal();
  };

  const handleDelete = (id: number, name: string) => {
    showConfirm({
      title: "Delete Feedback",
      message: `Are you sure you want to delete feedback from ${name}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: () => {
        setFeedbacks(feedbacks.filter((f) => f.id !== id));
        success("Feedback deleted successfully!");
      },
    });
  };

  const handleMarkAsRead = (id: number) => {
    setFeedbacks(
      feedbacks.map((f) =>
        f.id === id && f.status === "new" ? { ...f, status: "read" } : f
      )
    );
    success("Marked as read!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge bg="primary">New</Badge>;
      case "read":
        return <Badge bg="secondary">Read</Badge>;
      case "replied":
        return <Badge bg="success">Replied</Badge>;
      default:
        return null;
    }
  };

  const getStatusCount = (status: string) => {
    return feedbacks.filter((f) => f.status === status).length;
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
                  <div className="stat-number">{getStatusCount("new")}</div>
                  <div className="stat-label">New Feedback</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{getStatusCount("read")}</div>
                  <div className="stat-label">Read</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="stat-card-mini">
                <Card.Body className="text-center">
                  <div className="stat-number">{getStatusCount("replied")}</div>
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="cms-section-title">All Feedback</h4>
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
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </Form.Select>
              </div>

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
                    {filteredFeedbacks.map((feedback) => (
                      <tr
                        key={feedback.id}
                        style={{
                          backgroundColor: feedback.status === "new" 
                            ? "rgba(13, 110, 253, 0.05)" 
                            : "transparent"
                        }}
                      >
                        <td>
                          <strong>{feedback.name}</strong>
                        </td>
                        <td>
                          <small style={{ color: 'var(--gray-400)' }}>
                            {feedback.email}
                          </small>
                        </td>
                        <td>
                          <div
                            style={{ maxWidth: "300px", fontSize: "0.9rem" }}
                          >
                            {feedback.message.length > 60
                              ? `${feedback.message.substring(0, 60)}...`
                              : feedback.message}
                          </div>
                        </td>
                        <td>{feedback.date}</td>
                        <td>
                          {feedback.isLoggedIn ? (
                            <Badge bg="info">Member</Badge>
                          ) : (
                            <Badge bg="secondary">Guest</Badge>
                          )}
                        </td>
                        <td>{getStatusBadge(feedback.status)}</td>
                        <td>
                          <div className="d-flex gap-1 flex-nowrap">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleOpenModal(feedback)}
                              style={{ minWidth: '60px' }}
                            >
                              {feedback.status === "replied" ? "View" : "Reply"}
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(feedback.id, feedback.name)}
                              style={{ minWidth: '60px' }}
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

              {filteredFeedbacks.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p>No feedback found.</p>
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
              <div 
                className="mb-3 p-3"
                style={{ 
                  backgroundColor: 'var(--gray-800)', 
                  border: '1px solid var(--gray-600)',
                  borderRadius: '0.5rem'
                }}
              >
                <div className="mb-2">
                  <strong style={{ color: '#f1c76e' }}>From:</strong>{' '}
                  <span style={{ color: '#cbd5e0' }}>
                    {selectedFeedback.name} ({selectedFeedback.email})
                  </span>
                </div>
                <div className="mb-2">
                  <strong style={{ color: '#f1c76e' }}>Date:</strong>{' '}
                  <span style={{ color: '#cbd5e0' }}>{selectedFeedback.date}</span>
                </div>
                <div className="mb-2">
                  <strong style={{ color: '#f1c76e' }}>User Type:</strong>{' '}
                  {selectedFeedback.isLoggedIn ? (
                    <Badge bg="info">Member</Badge>
                  ) : (
                    <Badge bg="secondary">Guest</Badge>
                  )}
                </div>
                <div className="mb-3">
                  <strong style={{ color: '#f1c76e' }}>Status:</strong>{' '}
                  {getStatusBadge(selectedFeedback.status)}
                </div>
                <hr style={{ borderColor: 'var(--gray-600)' }} />
                <div>
                  <strong style={{ color: '#f1c76e' }}>Message:</strong>
                  <p className="mt-2 mb-0" style={{ color: '#cbd5e0' }}>
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>

              {/* Previous Reply (if exists) */}
              {selectedFeedback.reply && (
                <div
                  className="mb-3 p-3"
                  style={{
                    backgroundColor: 'rgba(241, 199, 110, 0.1)',
                    border: '1px solid rgba(241, 199, 110, 0.3)',
                    borderRadius: '0.5rem'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong style={{ color: '#f1c76e' }}>Your Previous Reply:</strong>
                    <small style={{ color: 'var(--gray-400)' }}>
                      Sent on {selectedFeedback.replyDate}
                    </small>
                  </div>
                  <p className="mb-0" style={{ color: '#cbd5e0' }}>
                    {selectedFeedback.reply}
                  </p>
                </div>
              )}

              {/* Reply Form */}
              <Form onSubmit={handleSendReply}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong style={{ color: '#f1c76e' }}>
                      {selectedFeedback.status === "replied"
                        ? "Update Reply"
                        : "Your Reply"}
                    </strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    required
                    style={{ 
                      backgroundColor: 'var(--gray-700)', 
                      border: '1px solid var(--gray-600)',
                      color: 'white'
                    }}
                  />
                  <Form.Text style={{ color: 'var(--gray-400)' }}>
                    This reply will be sent to: {selectedFeedback.email}
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      backgroundColor: "#f1c76e",
                      borderColor: "#f1c76e",
                      color: "#333",
                    }}
                  >
                    Send Reply
                  </Button>
                </div>
              </Form>
            </>
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
  );
}