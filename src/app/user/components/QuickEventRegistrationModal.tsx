'use client';

import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface QuickEventRegistrationModalProps {
  show: boolean;
  onHide: () => void;
  event: {
    _id: string;   // <= pakai _id dari MongoDB
    title: string;
    date: string;
    time: string;
    location: string;
  } | null;
}

export default function QuickEventRegistrationModal({ show, onHide, event }: QuickEventRegistrationModalProps) {
  const [formData] = useState({
    name: 'John Doe',
    nim: '525200999',
    faculty: 'Teknik',
    major: 'Informatika'
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const decoded: any = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return alert("Anda harus login dulu!");
    if (!userId) return alert("Token tidak valid!");

    try {
      await axios.post(
        "http://localhost:5000/api/registrations",
        {
          user_id: userId,
          event_id: event?._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onHide();
      }, 2000);

    } catch (err) {
      console.error(err);
      alert("Gagal mengirim pendaftaran");
    }
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
            <Form.Control type="text" value={formData.name} readOnly className="user-form-input" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="user-form-label">NIM</Form.Label>
            <Form.Control type="text" value={formData.nim} readOnly className="user-form-input" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="user-form-label">Faculty</Form.Label>
            <Form.Control type="text" value={formData.faculty} readOnly className="user-form-input" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="user-form-label">Major</Form.Label>
            <Form.Control type="text" value={formData.major} readOnly className="user-form-input" />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>

            <Button type="submit" className="btn-user-submit">
              Confirm Registration
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
