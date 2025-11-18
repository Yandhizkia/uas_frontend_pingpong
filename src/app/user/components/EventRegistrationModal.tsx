"use client";

import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { CalendarEvent, Clock, GeoAlt } from "react-bootstrap-icons";

interface EventRegistrationModalProps {
  show: boolean;
  onHide: () => void;
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
  } | null;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function EventRegistrationModal({
  show,
  onHide,
  event,
  onSuccess,
  onError,
}: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    email: "",
    phone: "",
    faculty: "",
    major: "",
    category: "",
    experience: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("Registration submitted:", {
        ...formData,
        eventId: event?.id,
      });

      // TODO: Replace with actual API call
      // await axios.post('/api/event-registrations', { ...formData, eventId: event?.id });

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess?.();

      // Close modal and reset form
      setTimeout(() => {
        onHide();
        setFormData({
          name: "",
          nim: "",
          email: "",
          phone: "",
          faculty: "",
          major: "",
          category: "",
          experience: "",
          notes: "",
        });
      }, 1500);
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to submit registration";
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Event Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="mb-4">
          <h5 style={{ color: "#f1c76e" }}>{event.title}</h5>
          <p style={{ color: "#cbd5e0", fontSize: "0.9rem", margin: 0 }}>
            <CalendarEvent className="me-1" /> {event.date} |{" "}
            <Clock className="me-1" /> {event.time} |{" "}
            <GeoAlt className="me-1" /> {event.location}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* ===== Basic Info ===== */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="user-form-input"
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">NIM</Form.Label>
                <Form.Control
                  type="text"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  className="user-form-input"
                  placeholder="Enter your NIM"
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* ===== Contact Info ===== */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="user-form-input"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="user-form-input"
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* ===== Academic Info ===== */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Faculty</Form.Label>
                <Form.Control
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="user-form-input"
                  placeholder="Enter your faculty"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Major</Form.Label>
                <Form.Control
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="user-form-input"
                  placeholder="Enter your major"
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* ===== Category & Experience ===== */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="user-form-input"
                  required
                  style={{ color: formData.category ? "" : "#cbd5e0" }}
                >
                  <option value="" disabled hidden style={{ color: "#cbd5e0" }}>
                    -- Select Category --
                  </option>
                  <option value="singles">Singles</option>
                  <option value="doubles">Doubles</option>
                  <option value="mixed">Mixed Doubles</option>
                  <option value="team">Team</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">
                  Experience Level
                </Form.Label>
                <Form.Select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="user-form-input"
                  required
                  style={{ color: formData.experience ? "" : "#cbd5e0" }}
                >
                  <option value="" disabled hidden style={{ color: "#cbd5e0" }}>
                    -- Select Experience Level --
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          {/* ===== Notes ===== */}
          <Form.Group className="mb-4">
            <Form.Label className="user-form-label">
              Additional Notes (Optional)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Write any notes or special requirements here..."
              className="user-form-input"
            />
          </Form.Group>

          {/* ===== Buttons ===== */}
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={onHide}
              disabled={isSubmitting}
              style={{
                backgroundColor: "var(--gray-600)",
                border: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-user-submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "#f1c76e",
                borderColor: "#f1c76e",
                color: "#333",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
