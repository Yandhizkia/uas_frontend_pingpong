'use client';

import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

interface QuickEventRegistrationModalProps {
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

export default function QuickEventRegistrationModal({ show, onHide, event }: QuickEventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    nim: '525200999',
    faculty: 'Teknik',
    major: 'Informatika'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quick registration submitted:', { ...formData, eventId: event?.id });
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onHide();
    }, 2000);
  };

  if (!event) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Quick Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        {showSuccess && (
          <Alert variant="success" className="mb-3">
            Registration successful! Check your email for confirmation.
          </Alert>
        )}

        <div className="mb-4">
          <h5 style={{ color: '#f1c76e', marginBottom: '0.5rem' }}>{event.title}</h5>
          <p style={{ color: '#cbd5e0', fontSize: '0.9rem', margin: 0 }}>
            📅 {event.date} | 🕐 {event.time}
          </p>
          <p style={{ color: '#cbd5e0', fontSize: '0.9rem', margin: 0 }}>
            📍 {event.location}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-4">
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

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide} style={{
              backgroundColor: 'var(--gray-600)',
              border: 'none',
              padding: '0.75rem 1.5rem'
            }}>
              Cancel
            </Button>
            <Button type="submit" className="btn-user-submit" style={{
              padding: '0.75rem 1.5rem'
            }}>
              Confirm Registration
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}