// src/app/admin/about/page.tsx
"use client";

import React, { useEffect, useState } from "react";
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
  Row,
  Col,
  Table,
} from "react-bootstrap";

const API_BASE = process.env.NEXT_PUBLIC_ABOUT_PAGE || "";

export default function AboutManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"ltmu" | "foto" | "pengurus">(
    "ltmu"
  );

  const { toasts, removeToast, success, error, info } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  const [editingItem, setEditingItem] = useState<any>(null);

  const [ltmu, setLtmu] = useState<any | null>(null);
  const [fotos, setFotos] = useState<any[]>([]);
  const [pengurus, setPengurus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // helper: convert File to base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [heroRes, fotoRes, pengurusRes] = await Promise.all([
        fetch(`${API_BASE}/hero`),
        fetch(`${API_BASE}/foto`),
        fetch(`${API_BASE}/pengurus`),
      ]);

      if (heroRes.ok) {
        const heroData = await heroRes.json();
        setLtmu(Array.isArray(heroData) && heroData.length > 0 ? heroData[0] : null);
      } else {
        setLtmu(null);
      }

      if (fotoRes.ok) {
        const fotoData = await fotoRes.json();
        setFotos(Array.isArray(fotoData) ? fotoData : []);
      } else {
        setFotos([]);
      }

      if (pengurusRes.ok) {
        const pengurusData = await pengurusRes.json();
        setPengurus(Array.isArray(pengurusData) ? pengurusData : []);
      } else {
        setPengurus([]);
      }
    } catch (err) {
      console.error("Fetch admin about data error:", err);
      error("Gagal mengambil data dari server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (type: "ltmu" | "foto" | "pengurus", item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (type: "foto" | "pengurus" | "ltmu", id: number) => {
    showConfirm({
      title: "Konfirmasi Penghapusan",
      message: "Yakin ingin menghapus item ini?",
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      variant: "danger",
      onConfirm: async () => {
        try {
          const endpoint =
            type === "foto" ? `${API_BASE}/foto/${id}` :
            type === "pengurus" ? `${API_BASE}/pengurus/${id}` :
            `${API_BASE}/hero/${id}`;

          const res = await fetch(endpoint, { method: "DELETE" });
          if (!res.ok) throw new Error("Delete failed");
          success("Item berhasil dihapus!");
          await fetchAll();
        } catch (err) {
          console.error(err);
          error("Gagal menghapus item");
        }
      },
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const file = formData.get("image") as File | null;

    try {
      // image handling: jika ada file baru -> base64, jika tidak -> pakai editingItem.image
      let imageBase64: string | undefined = undefined;
      if (file && (file as File).size > 0) {
        imageBase64 = await fileToBase64(file as File);
      } else {
        imageBase64 = editingItem?.image; // may be undefined
      }

      if (modalType === "ltmu") {
        // single hero logic: jika ada ltmu di DB -> update, else create
        if (ltmu && ltmu.id) {
          // update
          const payload: any = {
            title: title || ltmu.title,
            description: description || ltmu.description,
          };
          if (imageBase64) payload.image = imageBase64;
          const res = await fetch(`${API_BASE}/hero/${ltmu.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed to update hero");
          success("Hero berhasil diupdate");
        } else {
          // create
          if (!imageBase64) {
            error("Image dibutuhkan untuk membuat Hero baru");
            return;
          }
          const payload = {
            title,
            description,
            image: imageBase64,
          };
          const res = await fetch(`${API_BASE}/hero`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed to create hero");
          success("Hero berhasil dibuat");
        }
      } else if (modalType === "foto") {
        const payload: any = {
          name: title,
          description,
          image: imageBase64,
        };

        if (editingItem && editingItem.id) {
          // update foto
          const res = await fetch(`${API_BASE}/foto/${editingItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed to update foto");
          success("Foto berhasil diupdate");
        } else {
          // create foto
          if (!payload.image) {
            error("Image dibutuhkan untuk menambahkan Foto");
            return;
          }
          const res = await fetch(`${API_BASE}/foto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed to create foto");
          success("Foto berhasil ditambahkan");
        }
      } else if (modalType === "pengurus") {
      const payload: any = {
        name: title,
        shortDescription: formData.get("shortDescription") || editingItem?.shortDescription || "",
        fullDescription: formData.get("fullDescription") || editingItem?.fullDescription || "",
      };

      if (imageBase64) payload.image = imageBase64;

        if (editingItem && editingItem.id) {
          // update pengurus
          const res = await fetch(`${API_BASE}/pengurus/${editingItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed to update pengurus");
          success("Pengurus berhasil diupdate");
        } else {
          // create pengurus
          if (!payload.image) {
            error("Image dibutuhkan untuk menambahkan Pengurus");
            return;
          }
          const res = await fetch(`${API_BASE}/pengurus`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed to create pengurus");
          success("Pengurus berhasil ditambahkan");
        }
      }

      handleCloseModal();
      await fetchAll();
    } catch (err) {
      console.error("Save error:", err);
      error("Terjadi kesalahan saat menyimpan. Cek console untuk detail.");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="About Page Management" />

        <Container fluid className="admin-main">
          {/* LTMU Hero Section */}
          <Card className="cms-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">LTMU Hero Section</h4>
                <div>
                  <Button
                    className="btn-add me-2"
                    onClick={() => handleOpenModal("ltmu", ltmu || null)}
                  >
                    {ltmu ? "Edit" : "Create"}
                  </Button>
                  {ltmu && ltmu.id && (
                    <Button variant="danger" onClick={() => handleDelete("ltmu", ltmu.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>

              <Row>
                <Col md={4}>
                  <img
                    src={ltmu?.image || "/images/Home/pingpong.jpeg"}
                    alt="LTMU"
                    className="w-100 rounded"
                  />
                </Col>
                <Col md={8}>
                  <h5>{ltmu?.title || "Tidak ada judul"}</h5>
                  <p className="text-muted">{ltmu?.description || "Deskripsi belum tersedia."}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Foto Cards */}
          <Card className="cms-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Foto Sections</h4>
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("foto")}
                >
                  + Add Foto
                </Button>
              </div>

              <Table className="cms-table" hover responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fotos.map((foto) => (
                    <tr key={foto.id}>
                      <td>
                        <img
                          src={foto.image}
                          alt={foto.name}
                          className="table-image"
                        />
                      </td>
                      <td>{foto.name}</td>
                      <td>{foto.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleOpenModal("foto", foto)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("foto", foto.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {fotos.length === 0 && (
                    <tr><td colSpan={4} style={{textAlign: "center"}}>Tidak ada info ketua dan wakil</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Pengurus Sections */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Pengurus Sections</h4>
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("pengurus")}
                >
                  + Add Pengurus 
                </Button>
              </div>

              <Row className="g-3">
                {pengurus.map((item) => (
                  <Col md={4} key={item.id}>
                    <div className="carousel-item-card">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="carousel-preview"
                      />
                      <div className="mt-2 text-center">
                        <strong>{item.name}</strong>
                        <p className="carousel-desc">{item.shortDescription}</p>
                      </div>
                      <div className="item-actions">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal("pengurus", item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("pengurus", item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            {editingItem ? "Edit" : "Add"}{" "}
            {modalType === "ltmu"
              ? "LTMU Section"
              : modalType === "foto"
              ? "Foto"
              : "Pengurus Section"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" />
              {editingItem?.image && (
                <div className="mt-2">
                  <small>Preview saat ini:</small>
                  <img src={editingItem.image} alt="preview" style={{ width: 120, display: "block", marginTop: 8 }} />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={
                  modalType === "ltmu"
                    ? editingItem?.title || ltmu?.title || ""
                    : editingItem?.name || ""
                }
                placeholder="Enter title"
                required
              />
            </Form.Group>

            {modalType === "pengurus" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="shortDescription"
                    defaultValue={editingItem?.shortDescription || ""}
                    placeholder="Enter short description"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="fullDescription"
                    defaultValue={editingItem?.fullDescription || ""}
                    placeholder="Enter full description"
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  defaultValue={
                    modalType === "ltmu"
                      ? editingItem?.description || ltmu?.description || ""
                      : editingItem?.description || ""
                  }
                  placeholder="Enter description"
                />
              </Form.Group>
            )}

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
                  color: "#333", // Dark text for better contrast
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form>
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
