"use client";

import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
// Import ikon dari react-bootstrap-icons
import { CalendarEvent, Clock, GeoAlt } from 'react-bootstrap-icons';


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

export default function EventRegistrationModal({
  show,
  onHide,
  event,
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

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", { ...formData, eventId: event?.id });
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onHide();
      // Optionally reset form after submission
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
          <h5 style={{ color: "#f1c76e" }}>{event.title}</h5>
          <p style={{ color: "#cbd5e0", fontSize: "0.9rem", margin: 0 }}>
            {/* Menggunakan ikon dari react-bootstrap-icons */}
            <CalendarEvent className="me-1" /> {event.date} | <Clock className="me-1" /> {event.time} | <GeoAlt className="me-1" /> {event.location}
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
                  placeholder="Masukkan Nama Lengkap Anda" // Placeholder ditambahkan
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
                  placeholder="Masukkan NIM Anda" // Placeholder ditambahkan
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
                  placeholder="Masukkan Email Anda" // Placeholder ditambahkan
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
                  placeholder="Masukkan Nomor Telepon Anda" // Placeholder ditambahkan
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
                  placeholder="Masukkan Fakultas Anda" // Placeholder ditambahkan
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
                  placeholder="Masukkan Jurusan Anda" // Placeholder ditambahkan
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
                  style={{ color: formData.category ? '' : '#cbd5e0' }} // Mengatur warna teks untuk placeholder
                >
                  {/* Teks "placeholder" untuk select */}
                  <option value="" disabled hidden style={{ color: '#cbd5e0' }}>-- Pilih Kategori --</option>
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
                  style={{ color: formData.experience ? '' : '#cbd5e0' }} // Mengatur warna teks untuk placeholder
                >
                  {/* Teks "placeholder" untuk select */}
                  <option value="" disabled hidden style={{ color: '#cbd5e0' }}>-- Pilih Level Pengalaman --</option>
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
              placeholder="Tulis catatan atau kebutuhan khusus Anda di sini..." // Placeholder ditambahkan
              className="user-form-input"
            />
          </Form.Group>

          {/* ===== Buttons ===== */}
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={onHide}
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
              style={{
                backgroundColor: "#f1c76e",
                borderColor: "#f1c76e",
                color: "#333", // Dark text for better contrast
              }}
            >
              Submit Registration
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
} 