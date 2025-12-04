"use client";

import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CalendarEvent, GeoAlt, Clock } from "react-bootstrap-icons";

interface QuickEventRegistrationModalProps {
  show: boolean;
  onHide: () => void;
  event: {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
  } | null;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function QuickEventRegistrationModal({
  show,
  onHide,
  event,
  onSuccess,
  onError,
}: QuickEventRegistrationModalProps) {

  // Ambil nama dari localStorage (jika ada)
  const storedName = typeof window !== "undefined" 
    ? localStorage.getItem("name") 
    : null;

  // === FIX UTAMA ===  
  // Gunakan setFormData supaya input bisa diketik
  const [formData, setFormData] = useState({
    name: storedName || "My Custom Name",
    nim: "525200123",
    faculty: "Teknik",
    major: "Informatika",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const decoded: any = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      onError?.("You must login first!");
      return;
    }

    if (!userId) {
      onError?.("Invalid token!");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        "http://localhost:5000/api/registrations",
        {
          user_id: userId,
          event_id: event?._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // beri tahu parent/komponen lain (admin) bahwa ada perubahan registrasi
      // admin page mendengarkan event 'registrations-updated' untuk refetch
      try {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("registrations-updated"));
        }
      } catch (evErr) {
        // silent fail jika environment tidak mendukung CustomEvent
        console.warn("dispatch registrations-updated failed", evErr);
      }

      onSuccess?.();

      setTimeout(() => {
        onHide();
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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Quick Registration</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <div className="mb-4">
          <h5 style={{ color: "#f1c76e", marginBottom: "0.5rem" }}>
            {event.title}
          </h5>
          <p style={{ color: "#cbd5e0", fontSize: "0.9rem", margin: 0 }}>
            <CalendarEvent className="me-2" /> {event.date} |{" "}
            <Clock className="me-2" /> {event.time}
          </p>
          <p style={{ color: "#cbd5e0", fontSize: "0.9rem", margin: 0 }}>
            <GeoAlt className="me-2" /> {event.location}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <Form.Group className="mb-3">
            <Form.Label className="user-form-label">Full Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="user-form-input"
            />
          </Form.Group>

          {/* NIM */}
          <Form.Group className="mb-3">
            <Form.Label className="user-form-label">NIM</Form.Label>
            <Form.Control
              type="text"
              value={formData.nim}
              onChange={(e) =>
                setFormData({ ...formData, nim: e.target.value })
              }
              className="user-form-input"
            />
          </Form.Group>

          {/* FACULTY */}
          <Form.Group className="mb-3">
            <Form.Label className="user-form-label">Faculty</Form.Label>
            <Form.Control
              type="text"
              value={formData.faculty}
              onChange={(e) =>
                setFormData({ ...formData, faculty: e.target.value })
              }
              className="user-form-input"
            />
          </Form.Group>

          {/* MAJOR */}
          <Form.Group className="mb-4">
            <Form.Label className="user-form-label">Major</Form.Label>
            <Form.Control
              type="text"
              value={formData.major}
              onChange={(e) =>
                setFormData({ ...formData, major: e.target.value })
              }
              className="user-form-input"
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={onHide}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="btn-user-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm Registration"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
