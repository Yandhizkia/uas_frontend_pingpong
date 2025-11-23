'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Button, Form, Modal, Row, Col, Table } from 'react-bootstrap';
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

interface Nextevent {
  id: number;
  title: string;
  description: string;
  image: string; // base64 expected
  fullDescription?: string;
  shortDescription?: string;
  date?: string;
  time?: string;
  location?: string;
  _id?: string; // mongo internal if backend returns it
}

const BACKEND_BASE = process.env.NEXT_PUBLIC_EVENT_PAGE || "";

export default function EventManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'hero' | 'nextevent'>('hero');
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  const [hero, setHero] = useState<any | null>(null);

  const [nextevents, setNextevents] = useState<Nextevent[]>([]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // load initial data from backend
  useEffect(() => {
    const load = async () => {
      try {
        // hero -> backend returns array (controller: find())
        const heroRes = await fetch(`${BACKEND_BASE}/hero`);
        if (heroRes.ok) {
          const arr = await heroRes.json();
          if (Array.isArray(arr) && arr.length > 0) {
            setHero(arr[0]); // pick first hero doc
          } else {
            setHero(null);
          }
        }

        // nextevents
        const eventsRes = await fetch(`${BACKEND_BASE}/nextevent`);
        if (eventsRes.ok) {
          const list = await eventsRes.json();
          setNextevents(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        console.error("Load error:", err);
      }
    };
    load();
  }, []);

  const handleOpenModal = (type: 'hero' | 'nextevent', item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setPreviewImage(item?.image || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setPreviewImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // backend expects base64 string with data:image/... prefix — FileReader result is dataURL
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteNextevent = (id: number) => {
    showConfirm({
      title: "Konfirmasi Penghapusan",
      message: "Yakin ingin menghapus item ini?",
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      variant: "danger",
      onConfirm: async () => {
        try {
          await fetch(`${BACKEND_BASE}/nextevent/${id}`, { method: "DELETE" });
          // refresh list
          const fresh = await (await fetch(`${BACKEND_BASE}/nextevent`)).json().catch(()=>[]);
          setNextevents(Array.isArray(fresh) ? fresh : []);
          success("Item berhasil dihapus!");
        } catch (err) {
          console.error(err);
          error("Gagal menghapus item");
        }
      },
    });
  };

  const handleDeleteHero = async () => {
    if (!hero?.id) return;
    showConfirm({
      title: "Hapus Hero Section",
      message: "Yakin ingin menghapus hero section?",
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      variant: "danger",
      onConfirm: async () => {
        try {
          await fetch(`${BACKEND_BASE}/hero/${hero.id}`, { method: "DELETE" });
          setHero(null);
          success("Hero berhasil dihapus!");
        } catch (err) {
          console.error(err);
          error("Gagal menghapus hero");
        }
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (modalType === 'hero') {
      // fields: title, description (we included title handling)
      const title = (form as any).title?.value || (hero?.title || '');
      const description = (form as any).description?.value || (hero?.description || '');
      const payload = {
        title,
        description,
        image: previewImage || hero?.image || '', // base64 required by model
      };

      try {
        if (hero && hero.id) {
          // update existing hero (PUT /hero/:id)
          await fetch(`${BACKEND_BASE}/hero/${hero.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          // create new hero (POST /hero)
          await fetch(`${BACKEND_BASE}/hero`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
        // refresh hero
        const hr = await (await fetch(`${BACKEND_BASE}/hero`)).json().catch(()=>[]);
        if (Array.isArray(hr) && hr.length > 0) setHero(hr[0]);
        else setHero(null);

        success('Hero berhasil disimpan!');
        handleCloseModal();
      } catch (err) {
        console.error(err);
        error('Gagal menyimpan hero');
      }
    } else {
      // nextevent create/update
      const title = (form as any).title?.value || '';
      const shortDescription = (form as any).shortDescription?.value || '';
      const fullDescription = (form as any).fullDescription?.value || '';
      const date = (form as any).date?.value || '';
      const time = (form as any).time?.value || '';
      const location = (form as any).location?.value || '';

      const payload: any = {
        title,
        shortDescription,
        fullDescription,
        date,
        time,
        location,
        image: previewImage || editingItem?.image || 'data:image/png;base64,iVBORw0...', // fallback minimal
      };

      try {
        if (editingItem && editingItem.id) {
          await fetch(`${BACKEND_BASE}/nextevent/${editingItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          await fetch(`${BACKEND_BASE}/nextevent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }

        // refresh nextevents
        const fresh = await (await fetch(`${BACKEND_BASE}/nextevent`)).json().catch(()=>[]);
        setNextevents(Array.isArray(fresh) ? fresh : []);
        success('Event berhasil disimpan!');
        handleCloseModal();
      } catch (err) {
        console.error(err);
        error('Gagal menyimpan event');
      }
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Event Management" />

        <Container fluid className="admin-main">
          {/* Hero Section */}
          <Card className="cms-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Event Hero Section</h4>
                <div>
                  <Button className="btn-add me-2" onClick={() => handleOpenModal('hero', hero)}>
                    {hero ? "Edit" : "Create"}
                  </Button>
                  {hero && (
                    <Button variant="danger" onClick={handleDeleteHero}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>

              <Row>
                <Col md={5}>
                  <img src={hero?.image || "/images/Home/pingpong.jpeg"} alt="Event Hero" className="w-100 rounded" />
                </Col>
                <Col md={7}>
                  <h5>{hero?.title || "Tidak ada judul"}</h5>
                  <p className="text-muted">{hero?.description || "Dekskripsi belum ada"}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Nextevents */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Next Event</h4>
                <Button className="btn-add" onClick={() => handleOpenModal('nextevent')}>
                  + Add Event
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
                  {nextevents.map((nextevent) => (
                    <tr key={nextevent.id}>
                      <td>
                        <img src={nextevent.image} alt={nextevent.title} className="table-image" />
                      </td>
                      <td>{nextevent.title}</td>
                      <td>{nextevent.shortDescription ?? nextevent.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleOpenModal('nextevent', nextevent)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteNextevent(nextevent.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {nextevents.length === 0 && (
                    <tr><td colSpan={4} style={{textAlign: "center"}}>Tidak ada event</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            {editingItem ? 'Edit' : 'Add'} {modalType === 'hero' ? 'Hero Section' : 'Nextevent'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              {previewImage && (
                <div className="mt-3 text-center">
                  <img src={previewImage} alt="Preview" className="rounded" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover' }} />
                </div>
              )}
            </Form.Group>

            {modalType === 'hero' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={editingItem?.title}
                    placeholder="Enter Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    defaultValue={editingItem?.description}
                    placeholder="Enter description"
                  />
                </Form.Group>
              </>
            )}

            {modalType === 'nextevent' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={editingItem?.title}
                    placeholder="Enter nextevent title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="shortDescription"
                    defaultValue={editingItem?.shortDescription}
                    placeholder="Short description for card"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="fullDescription"
                    defaultValue={editingItem?.fullDescription}
                    placeholder="Enter full description"
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="text" name="date" defaultValue={editingItem?.date} placeholder="e.g. 10 Desember 2025" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Time</Form.Label>
                      <Form.Control type="text" name="time" defaultValue={editingItem?.time} placeholder="e.g. 10:00 - 13:00" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" defaultValue={editingItem?.location} placeholder="e.g. Untar Arena" />
                </Form.Group>
              </>
            )}

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: '#f1c76e',
                  borderColor: '#f1c76e',
                  color: '#333'
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
