"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

type ModalType = "carousel" | "section" | "article";

interface HeroItem {
  id: number;
  image: string; // base64
  title?: string;
  description?: string;
}

interface SectionItem {
  id: number;
  image: string; // base64
  title: string;
  description: string;
  page: "/about" | "/event" | "/contact";
}

interface ArticleItem {
  id: number;
  image: string; // base64
  title: string;
  shortDescription: string;
  fullDescription: string;
}

const API = process.env.NEXT_PUBLIC_HOME_PAGE || "";

export default function HomepageManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("carousel");
  const [editingItem, setEditingItem] = useState<any>(null);

  // Data states
  const [carouselItems, setCarouselItems] = useState<HeroItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  // Form state (controlled form inside modal)
  const [formState, setFormState] = useState<any>({
    imageFile: null, // File | null
    imagePreview: "", // base64 or url preview of existing
    title: "",
    description: "",
    page: "/about",
    shortDescription: "",
    fullDescription: "",
  });

  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  // Helpers: convert file -> base64
  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });

  // API helpers
  const fetchCarousel = async () => {
    try {
      const res = await fetch(`${API}/hero`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch hero");
      setCarouselItems(json.data || []);
    } catch (err: any) {
      console.error(err);
      error("Failed to load hero data");
    }
  };

  const fetchSections = async () => {
    try {
      const res = await fetch(`${API}/section`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch section");
      setSections(json.data || []);
    } catch (err: any) {
      console.error(err);
      error("Failed to load sections");
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API}/article`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch articles");
      setArticles(json.data || []);
    } catch (err: any) {
      console.error(err);
      error("Failed to load articles");
    }
  };

  useEffect(() => {
    // initial load
    fetchCarousel();
    fetchSections();
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (type: ModalType, item?: any) => {
    setModalType(type);
    setEditingItem(item || null);

    // initialize formState based on item & type
    if (!item) {
      setFormState({
        imageFile: null,
        imagePreview: "",
        title: "",
        description: "",
        page: "/about",
        shortDescription: "",
        fullDescription: "",
      });
    } else {
      // populate fields
      setFormState({
        imageFile: null,
        imagePreview: item.image || "",
        title: item.title || "",
        description: item.description || "",
        page: item.page || "/about",
        shortDescription: item.shortDescription || "",
        fullDescription: item.fullDescription || "",
      });
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormState({
      imageFile: null,
      imagePreview: "",
      title: "",
      description: "",
      page: "/about",
      shortDescription: "",
      fullDescription: "",
    });
  };

  // Delete handler uses confirm
  const handleDelete = (type: ModalType, id: number) => {
    const typeLabel = type === "carousel" ? "slide" : type === "section" ? "section" : "article";

    showConfirm({
      title: `Delete ${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)}`,
      message: `Are you sure you want to delete this ${typeLabel}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        try {
          const route =
            type === "carousel" ? "hero" : type === "section" ? "section" : "article";
          const res = await fetch(`${API}/${route}/${id}`, { method: "DELETE" });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || json.message || "Delete failed");

          // refresh corresponding list
          if (type === "carousel") await fetchCarousel();
          if (type === "section") await fetchSections();
          if (type === "article") await fetchArticles();

          success(`${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)} deleted successfully!`);
        } catch (err: any) {
          console.error(err);
          error("Failed to delete: " + (err.message || ""));
        }
      },
    });
  };

  // Save (create or update)
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // build payload according to modalType
      const payload: any = {};

      // handle image
      if (formState.imageFile) {
        const b64 = await fileToBase64(formState.imageFile);
        payload.image = b64; // base64 string like data:image/...
      } else if (formState.imagePreview) {
        // If editing and no new file, keep existing base64
        payload.image = formState.imagePreview;
      } else {
        // fallback default (backend requires image for models)
        payload.image = formState.imagePreview || "";
      }

      if (modalType === "carousel") {
        payload.title = formState.title;
        payload.description = formState.description;
      } else if (modalType === "section") {
        payload.title = formState.title;
        payload.description = formState.description;
        payload.page = formState.page;
      } else {
        // article
        payload.title = formState.title;
        payload.shortDescription = formState.shortDescription;
        payload.fullDescription = formState.fullDescription;
      }

      const route = modalType === "carousel" ? "hero" : modalType === "section" ? "section" : "article";

      if (editingItem) {
        // update
        const res = await fetch(`${API}/${route}/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || json.message || "Update failed");
        success("Updated successfully!");
      } else {
        // create
        const res = await fetch(`${API}/${route}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || json.message || "Create failed");
        success("Created successfully!");
      }

      // refresh lists
      await Promise.all([fetchCarousel(), fetchSections(), fetchArticles()]);

      handleCloseModal();
    } catch (err: any) {
      console.error(err);
      error("Failed to save: " + (err.message || ""));
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Homepage Management" />

        <Container fluid className="admin-main">
          {/* Hero Carousel Section */}
          <Card className="cms-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Hero Carousel</h4>
                <Button className="btn-add" onClick={() => handleOpenModal("carousel")}>
                  + Add Slide
                </Button>
              </div>

              <Row className="g-3">
                {carouselItems.map((item) => (
                  <Col md={4} key={item.id}>
                    <div className="carousel-item-card">
                      <img src={item.image} alt="Carousel" className="carousel-preview" />

                      {/* Tambahkan ini agar title & description muncul */}
                      <div className="carousel-text">
                        <h5 className="carousel-title text-center">{item.title || "No Title"}</h5>
                        <p className="carousel-desc text-center">{item.description || "No Description"}</p>
                      </div>

                      <div className="item-actions">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal("carousel", item)}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete("carousel", item.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          {/* Sections */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Content Sections</h4>
                <Button className="btn-add" onClick={() => handleOpenModal("section")}>
                  + Add Section
                </Button>
              </div>

              <Table className="cms-table" hover responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Page</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section) => (
                    <tr key={section.id}>
                      <td>
                        <img src={section.image} alt={section.title} className="table-image" />
                      </td>
                      <td>{section.title}</td>
                      <td>{section.description}</td>
                      <td>{section.page}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenModal("section", section)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete("section", section.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="cms-card mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Article Section</h4>
                <Button className="btn-add" onClick={() => handleOpenModal("article")}>
                  + Add Article
                </Button>
              </div>

              <Table className="cms-table" hover responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Short Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <img src={article.image} alt={article.title} className="table-image" />
                      </td>
                      <td>{article.title}</td>
                      <td>{article.shortDescription}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenModal("article", article)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete("article", article.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            {editingItem ? "Edit" : "Add"}{" "}
            {modalType === "carousel" ? "Carousel Slide" : modalType === "section" ? "Section" : "Article"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                  const f = ev.target.files?.[0] || null;
                  if (f) {
                    setFormState((s: any) => ({ ...s, imageFile: f }));
                    // preview
                    const reader = new FileReader();
                    reader.onload = () => setFormState((s: any) => ({ ...s, imagePreview: String(reader.result) }));
                    reader.readAsDataURL(f);
                  } else {
                    setFormState((s: any) => ({ ...s, imageFile: null }));
                  }
                }}
              />
              <Form.Text>Recommended size: 1600x900px</Form.Text>
              {formState.imagePreview ? (
                <div style={{ marginTop: 8 }}>
                  <img src={formState.imagePreview} alt="preview" style={{ maxWidth: "100%", borderRadius: 6 }} />
                </div>
              ) : null}
            </Form.Group>

            {/* Fields for Section & Article */}
            {modalType === "carousel" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={(e) => setFormState((s: any) => ({ ...s, title: e.target.value }))}
                    placeholder="Enter title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    value={formState.description}
                    onChange={(e) => setFormState((s: any) => ({ ...s, description: e.target.value }))}
                    placeholder="Enter description"
                  />
                </Form.Group>
              </>
            )}

            {modalType === "section" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formState.title} onChange={(e) => setFormState((s: any) => ({ ...s, title: e.target.value }))} placeholder="Enter title" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={formState.description} onChange={(e) => setFormState((s: any) => ({ ...s, description: e.target.value }))} placeholder="Enter description" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Page</Form.Label>
                  <Form.Select value={formState.page} onChange={(e) => setFormState((s: any) => ({ ...s, page: e.target.value }))}>
                    <option value="/about">/about</option>
                    <option value="/event">/event</option>
                    <option value="/contact">/contact</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}

            {modalType === "article" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formState.title} onChange={(e) => setFormState((s: any) => ({ ...s, title: e.target.value }))} placeholder="Enter title" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control type="text" name="shortDescription" value={formState.shortDescription} onChange={(e) => setFormState((s: any) => ({ ...s, shortDescription: e.target.value }))} placeholder="Enter short description" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control as="textarea" rows={4} name="fullDescription" value={formState.fullDescription} onChange={(e) => setFormState((s: any) => ({ ...s, fullDescription: e.target.value }))} placeholder="Enter full description" />
                </Form.Group>
              </>
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
                  color: "#333",
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
