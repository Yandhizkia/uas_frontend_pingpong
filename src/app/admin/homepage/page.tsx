"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CustomToast from "@/app/components/CustomToast";
import CustomConfirm from "@/app/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";
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

interface CarouselItem {
  id: number;
  image: string;
}

interface Section {
  id: number;
  title: string;
  description: string;
  image: string;
}

type ModalType = 'carousel' | 'section' | 'article';

export default function HomepageManagement() {
  // ✅ Tambahin hooks untuk notifications
  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('carousel');

  const [editingItem, setEditingItem] = useState<any>(null);

  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [articles, setArticles] = useState<Section[]>([]);

  // Load data dari localStorage saat pertama kali render
  useEffect(() => {
    const storedCarousel = localStorage.getItem("homepage_carousel");
    const storedSections = localStorage.getItem("homepage_sections");
    const storedArticles = localStorage.getItem("homepage_articles");

    if (storedCarousel) setCarouselItems(JSON.parse(storedCarousel));
    if (storedSections) setSections(JSON.parse(storedSections));
    if (storedArticles) setArticles(JSON.parse(storedArticles));
  }, []);

  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem("homepage_carousel", JSON.stringify(carouselItems));
  }, [carouselItems]);

  useEffect(() => {
    localStorage.setItem("homepage_sections", JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem("homepage_articles", JSON.stringify(articles));
  }, [articles]);

  const handleOpenModal = (
    type: "carousel" | "section" | "article",
    item?: any
  ) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  // ✅ GANTI confirm() dengan showConfirm()
  const handleDelete = (
    type: "carousel" | "section" | "article",
    id: number
  ) => {
    const typeLabels = {
      carousel: 'slide carousel',
      section: 'section',
      article: 'article'
    };

    showConfirm({
      title: `Delete ${typeLabels[type]}`,
      message: `Yakin ingin menghapus ${typeLabels[type]} ini? Tindakan ini tidak dapat dibatalkan.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
      onConfirm: () => {
        if (type === "carousel") {
          setCarouselItems((prev) => prev.filter((item) => item.id !== id));
        } else if (type === "section") {
          setSections((prev) => prev.filter((item) => item.id !== id));
        } else {
          setArticles((prev) => prev.filter((item) => item.id !== id));
        }
        success(`${typeLabels[type]} berhasil dihapus!`);
      },
    });
  };

  // ✅ GANTI alert() dengan success()
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      title:
        (form.elements.namedItem("title") as HTMLInputElement)?.value || "",
      description:
        (form.elements.namedItem("description") as HTMLTextAreaElement)
          ?.value || "",
      image: "/images/default.jpg",
    };

    if (modalType === "carousel") {
      setCarouselItems((prev) =>
        editingItem
          ? prev.map((i) => (i.id === editingItem.id ? newItem : i))
          : [...prev, newItem]
      );
    } else if (modalType === "section") {
      setSections((prev) =>
        editingItem
          ? prev.map((i) => (i.id === editingItem.id ? newItem : i))
          : [...prev, newItem]
      );
    } else {
      setArticles((prev) =>
        editingItem
          ? prev.map((i) => (i.id === editingItem.id ? newItem : i))
          : [...prev, newItem]
      );
    }

    handleCloseModal();
    success(editingItem ? 'Data berhasil diupdate!' : 'Data berhasil ditambahkan!');
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
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("carousel")}
                >
                  + Add Slide
                </Button>
              </div>

              <Row className="g-3">
                {carouselItems.map((item) => (
                  <Col md={4} key={item.id}>
                    <div className="carousel-item-card">
                      <img
                        src={item.image}
                        alt="Carousel"
                        className="carousel-preview"
                      />
                      <div className="item-actions">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal("carousel", item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("carousel", item.id)}
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

          {/* Sections */}
          <Card className="cms-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Content Sections</h4>
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("section")}
                >
                  + Add Section
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
                  {sections.map((section) => (
                    <tr key={section.id}>
                      <td>
                        <img
                          src={section.image}
                          alt={section.title}
                          className="table-image"
                        />
                      </td>
                      <td>{section.title}</td>
                      <td>{section.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleOpenModal("section", section)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("section", section.id)}
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

          {/* Article Section */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Article Section</h4>
                <Button
                  className="btn-add"
                  onClick={() => handleOpenModal("article")}
                >
                  + Add Article
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
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <img
                          src={article.image}
                          alt={article.title}
                          className="table-image"
                        />
                      </td>
                      <td>{article.title}</td>
                      <td>{article.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleOpenModal("article", article)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete("article", article.id)}
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
        </Container>
      </div>


      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            {editingItem ? "Edit" : "Add"}{" "}
            {modalType === "carousel"
              ? "Carousel Slide"
              : modalType === "section"
              ? "Section"
              : "Article"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" accept="image/*" />
              <Form.Text>Recommended size: 1600x900px</Form.Text>
            </Form.Group>

            {(modalType === "carousel" ||
              modalType === "section" ||
              modalType === "article") && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={editingItem?.title}
                    placeholder="Enter title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={editingItem?.description}
                    placeholder="Enter description"
                  />
                </Form.Group>
              </>
            )}

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ✅ TAMBAHIN Custom Toast & Confirm di akhir */}
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