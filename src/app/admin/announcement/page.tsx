"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import CustomToast from "@/app/components/CustomToast";
import CustomConfirm from "@/app/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

import {
  Container,
  Card,
  Button,
  Form,
  Modal,
  Badge,
  Table,
} from "react-bootstrap";

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "urgent";
  date: string;
  important: boolean;
}

export default function AnnouncementPage() {
  // 🔥 Tambahin hook toast & confirm
  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } =
    useConfirm();

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Kegiatan Club Ditiadakan",
      message: "Kegiatan club minggu ini ditiadakan karena ada acara sekolah.",
      type: "warning",
      date: "2024-01-15",
      important: true,
    },
    {
      id: 2,
      title: "Perubahan Jadwal",
      message: "Jadwal latihan dipindah dari Jumat ke Sabtu jam 14.00.",
      type: "info",
      date: "2024-01-10",
      important: true,
    },
  ]);

  const handleOpenModal = (item?: Announcement) => {
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  // 🚀 Ganti confirm() → CustomConfirm
  const handleDelete = (id: number) => {
    showConfirm({
      title: "Delete Announcement",
      message: "Yakin ingin menghapus announcement ini?",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: () => {
        setAnnouncements((prev) => prev.filter((item) => item.id !== id));
        success("Announcement berhasil dihapus!");
      },
    });
  };

  // 🚀 Ganti alert() → success()
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const newAnnouncement: Announcement = {
      id: editingItem ? editingItem.id : Date.now(),
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      type: (form.elements.namedItem("type") as HTMLSelectElement).value as
        | "info"
        | "warning"
        | "urgent",
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      important: (form.elements.namedItem("important") as HTMLInputElement)
        .checked,
    };

    if (editingItem) {
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? newAnnouncement : item
        )
      );
    } else {
      setAnnouncements((prev) => [...prev, newAnnouncement]);
    }

    handleCloseModal();
    success("Announcement berhasil disimpan!");
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "urgent":
        return "danger";
      case "warning":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Announcement Management" />

        <Container fluid className="admin-main">
          <Card className="cms-card">
            <Card.Body>
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="cms-section-title mb-1">Announcements</h4>
                  <p className="text-muted mb-0">
                    Kelola pengumuman untuk anggota yang sudah login
                  </p>
                </div>
                <Button className="btn-add" onClick={() => handleOpenModal()}>
                  + New Announcement
                </Button>
              </div>

              {/* Table */}
              <Table className="cms-table" hover responsive>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Important</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {announcements.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.title}</strong>
                      </td>
                      <td>
                        <div style={{ maxWidth: "300px" }}>
                          {item.message.length > 60
                            ? `${item.message.substring(0, 60)}...`
                            : item.message}
                        </div>
                      </td>
                      <td>
                        <Badge bg={getBadgeVariant(item.type)}>
                          {item.type.toUpperCase()}
                        </Badge>
                      </td>
                      <td>{item.date}</td>

                      <td>
                        {item.important ? (
                          <Badge bg="danger">YES</Badge>
                        ) : (
                          <Badge bg="secondary">NO</Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleOpenModal(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Empty State */}
              {announcements.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p>
                    Belum ada announcement. Klik "New Announcement" untuk
                    membuat.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>{editingItem ? "Edit" : "New"} Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                placeholder="Enter announcement title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                defaultValue={editingItem?.message}
                placeholder="Enter announcement message"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                defaultValue={editingItem?.type || "info"}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="urgent">Urgent</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                defaultValue={
                  editingItem?.date || new Date().toISOString().split("T")[0]
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Important</Form.Label>
              <Form.Check
                type="switch"
                name="important"
                id="important"
                label="Mark this announcement as Important"
                defaultChecked={editingItem?.important || false}
              />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Announcement
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* 🔥 Tambahin komponen toast & confirm */}
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
