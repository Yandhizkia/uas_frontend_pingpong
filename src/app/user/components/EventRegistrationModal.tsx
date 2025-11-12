'use client';

import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

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
}

export default function EventRegistrationModal({ show, onHide, event }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: 'John Doe', // Pre-filled from logged in user
    nim: '525200999',
    email: 'john.doe@student.untar.ac.id',
    phone: '081234567890',
    faculty: 'Teknik',
    major: 'Informatika',
    category: 'singles',
    experience: 'intermediate',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', { ...formData, eventId: event?.id });
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onHide();
      // Reset form if needed
    }, 2000);
  };

  if (!event) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Event Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        {showSuccess && (
          <Alert variant="success" className="mb-3">
            Registration successful! We'll contact you soon.
          </Alert>
        )}

        <div className="mb-4">
          <h5 style={{ color: '#f1c76e' }}>{event.title}</h5>
          <p style={{ color: '#cbd5e0', fontSize: '0.9rem', margin: 0 }}>
            📅 {event.date} | 🕐 {event.time} | 📍 {event.location}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
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
                  required
                  readOnly
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
                  required
                  readOnly
                />
              </Form.Group>
            </div>
          </div>

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
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="user-form-input"
                  required
                />
              </Form.Group>
            </div>
          </div>

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
                  required
                  readOnly
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
                  required
                  readOnly
                />
              </Form.Group>
            </div>
          </div>

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
                >
                  <option value="singles">Singles</option>
                  <option value="doubles">Doubles</option>
                  <option value="mixed">Mixed Doubles</option>
                  <option value="team">Team</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="user-form-label">Experience Level</Form.Label>
                <Form.Select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="user-form-input"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label className="user-form-label">Additional Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requirements or notes..."
              className="user-form-input"
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide} style={{
              backgroundColor: 'var(--gray-600)',
              border: 'none'
            }}>
              Cancel
            </Button>
            <Button type="submit" className="btn-user-submit">
              Submit Registration
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}