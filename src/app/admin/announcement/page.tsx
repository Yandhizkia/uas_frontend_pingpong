"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
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
  time?: string;
  important: boolean;
  read?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_ANNOUNCEMENT_MANAGEMENT || "";

export default function AnnouncementPage() {
  // 🔥 Tambahin hook toast & confirm
  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } =
    useConfirm();

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/announcement`);
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (err: any) {
      console.error(err);
      error?.("Gagal mengambil announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      onConfirm: async () => {
        try {
          const res = await fetch(`${API_BASE}/announcement/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.message || "Delete failed");
          }
          success("Announcement berhasil dihapus!");
          await fetchAnnouncements();
        } catch (err: any) {
          console.error(err);
          error?.("Gagal menghapus announcement");
        } finally {
          hideConfirm();
        }
      },
    });
  };

  // 🚀 Ganti alert() → success()
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    const type = (form.elements.namedItem("type") as HTMLSelectElement)
      .value as "info" | "warning" | "urgent";
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const important = (form.elements.namedItem("important") as HTMLInputElement)
      .checked;

    const payload = {
      title,
      message,
      type,
      // backend will set date/time, but include date if UI provided (controller overwrites date/time anyway)
      date,
      important,
      read: editingItem ? editingItem.read ?? false : false,
    };

    try {
      if (editingItem) {
        // UPDATE
        const res = await fetch(
          `${API_BASE}/announcement/${editingItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Update failed");
        }
        success("Announcement berhasil diperbarui!");
      } else {
        // CREATE
        const res = await fetch(`${API_BASE}/announcement`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Create failed");
        }
        success("Announcement berhasil disimpan!");
      }

      handleCloseModal();
      await fetchAnnouncements();
    } catch (err: any) {
      console.error(err);
      error?.("Gagal menyimpan announcement");
    }
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
              {announcements.length === 0 && !loading && (
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
          <Modal.Title>{editingItem ? "Edit" : "New"} Announcements</Modal.Title>
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
              <Button
                type="submit"
                style={{
                  backgroundColor: "#f1c76e",
                  borderColor: "#f1c76e",
                  color: "#333",
                }}
              >
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
