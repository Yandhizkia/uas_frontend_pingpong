"use client";

import React, { useState } from "react";
import UserSidebar from "../components/Sidebar";
import UserHeader from "../components/Header";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "training",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample previous feedbacks
  const previousFeedbacks = [
    {
      id: 1,
      subject: "Jadwal latihan terlalu malam",
      category: "training",
      message: "Apakah bisa jadwal latihan dimajukan 30 menit?",
      date: "2024-01-10",
      status: "replied",
      reply:
        "Terima kasih atas feedbacknya. Kami akan diskusikan dengan tim untuk kemungkinan perubahan jadwal.",
    },
    {
      id: 2,
      subject: "Request pelatih tambahan",
      category: "facility",
      message: "Tolong sediakan pelatih tambahan untuk pemula",
      date: "2024-01-05",
      status: "pending",
    },
  ];

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setShowSuccess(true);
    setFormData({ subject: "", category: "training", message: "" });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="Feedback" />

        <Container fluid className="admin-main">
          <Row className="g-4">
            {/* Feedback Form */}
            <Col lg={7}>
              <Card className="cms-card">
                <Card.Body className="p-4">
                  <h4 className="cms-section-title mb-2">Send Feedback</h4>
                  <p
                    style={{
                      color: "var(--gray-400)",
                      fontSize: "0.95rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Share your thoughts, suggestions, or report issues
                  </p>

                  {showSuccess && (
                    <Alert
                      variant="success"
                      onClose={() => setShowSuccess(false)}
                      dismissible
                    >
                      Feedback berhasil dikirim! Admin akan merespons segera.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="user-form-label">
                        Subject
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief description of your feedback"
                        className="user-form-input"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="user-form-label">
                        Category
                      </Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="user-form-input"
                      >
                        <option value="training">Training Schedule</option>
                        <option value="facility">Facility</option>
                        <option value="event">Event</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="complaint">Complaint</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="user-form-label">
                        Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your feedback..."
                        className="user-form-input"
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="btn-user-submit w-100">
                      Send Feedback
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Previous Feedbacks */}
            <Col lg={5}>
              <Card className="cms-card">
                <Card.Body className="p-4">
                  <h4 className="cms-section-title mb-4">
                    Your Previous Feedback
                  </h4>

                  <div className="feedback-history-list">
                    {previousFeedbacks.map((feedback) => (
                      <Card
                        key={feedback.id}
                        className="feedback-history-card mb-3"
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <strong
                              style={{ color: "#d3d7e8", fontSize: "0.95rem" }}
                            >
                              {feedback.subject}
                            </strong>
                            <Badge
                              bg={
                                feedback.status === "replied"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {feedback.status === "replied"
                                ? "Replied"
                                : "Pending"}
                            </Badge>
                          </div>
                          <p
                            style={{
                              color: "var(--gray-400)",
                              fontSize: "0.85rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {feedback.message}
                          </p>
                          {feedback.reply && (
                            <div className="admin-reply">
                              <strong>Admin Reply:</strong>
                              <p>{feedback.reply}</p>
                            </div>
                          )}
                          <small style={{ color: "var(--gray-400)" }}>
                            {feedback.date}
                          </small>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
