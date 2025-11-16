"use client";

import React, { useState } from "react";
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

export default function AboutManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"ltmu" | "foto" | "related">(
    "ltmu"
  );

const { success, error, info } = useToast();
const { showConfirm } = useConfirm();
const { toasts, removeToast } = useToast();
const { confirmState, hideConfirm, handleConfirm } = useConfirm();

  const [editingItem, setEditingItem] = useState<any>(null);

  const [ltmu, setLtmu] = useState({
    title: "LTMU",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  });

  const [fotos, setFotos] = useState([
    {
      id: 1,
      title: "Foto 1",
      description: "Lorem ipsum",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    },
    {
      id: 2,
      title: "Foto 2",
      description: "Lorem ipsum",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    },
  ]);

  const [related, setRelated] = useState([
    {
      id: 1,
      title: "Related",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400",
    },
    {
      id: 2,
      title: "Item",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    },
    {
      id: 3,
      title: "Payback",
      image:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400",
    },
  ]);

  const handleOpenModal = (type: "ltmu" | "foto" | "related", item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (type: "foto" | "related", id: number) => {
 showConfirm({
  title: "Konfirmasi Penghapusan",
  message: "Yakin ingin menghapus item ini?",
  confirmText: "Ya, Hapus",
  cancelText: "Batal",
  variant: "danger",
  onConfirm: () => {
    if (type === "foto") {
      setFotos(fotos.filter((item) => item.id !== id));
    } else {
      setRelated(related.filter((item) => item.id !== id));
    }
    success("Item berhasil dihapus!");
  },
});

  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    // kalau user upload gambar baru, preview dulu
    const imageUrl =
      image && image.size > 0 ? URL.createObjectURL(image) : editingItem?.image;

    if (modalType === "ltmu") {
      setLtmu({
        title: title || ltmu.title,
        description: description || ltmu.description,
        image: imageUrl || ltmu.image,
      });
    } else if (modalType === "foto") {
      if (editingItem) {
        // edit foto existing
        setFotos(
          fotos.map((f) =>
            f.id === editingItem.id
              ? { ...f, title, description, image: imageUrl || f.image }
              : f
          )
        );
      } else {
        // add foto baru
        setFotos([
          ...fotos,
          {
            id: Date.now(),
            title,
            description,
            image: imageUrl,
          },
        ]);
      }
    } else if (modalType === "related") {
      if (editingItem) {
        // edit related article
        setRelated(
          related.map((r) =>
            r.id === editingItem.id
              ? { ...r, title, image: imageUrl || r.image }
              : r
          )
        );
      } else {
        // add related article baru
        setRelated([
          ...related,
          {
            id: Date.now(),
            title,
            image: imageUrl,
          },
        ]);
      }
    }

    handleCloseModal();
    success('Event berhasil disimpan!');
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
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("ltmu", ltmu)}
                >
                  Edit
                </Button>
              </div>

              <Row>
                <Col md={4}>
                  <img src={ltmu.image} alt="LTMU" className="w-100 rounded" />
                </Col>
                <Col md={8}>
                  <h5>{ltmu.title}</h5>
                  <p className="text-muted">{ltmu.description}</p>
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
                          alt={foto.title}
                          className="table-image"
                        />
                      </td>
                      <td>{foto.title}</td>
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
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Related Articles */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Related Articles</h4>
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("related")}
                >
                  + Add Article
                </Button>
              </div>

              <Row className="g-3">
                {related.map((item) => (
                  <Col md={4} key={item.id}>
                    <div className="carousel-item-card">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="carousel-preview"
                      />
                      <div className="mt-2">
                        <strong>{item.title}</strong>
                      </div>
                      <div className="item-actions">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal("related", item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("related", item.id)}
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
              : "Related Article"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={editingItem?.title || ""}
                placeholder="Enter title"
                required
              />
            </Form.Group>

            {modalType !== "related" && (
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  defaultValue={editingItem?.description || ""}
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
