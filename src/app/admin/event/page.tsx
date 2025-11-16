'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Card, Button, Form, Modal, Row, Col, Table } from 'react-bootstrap';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function EventManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'hero' | 'product'>('hero');
  const [editingItem, setEditingItem] = useState<any>(null);

  const [hero, setHero] = useState({
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit...'
  });

  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'Andrei', description: 'This will always be the product', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400' },
    { id: 2, title: 'Product', description: 'This will always be the product', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
    { id: 3, title: 'Product', description: 'This will always be the product', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400' },
  ]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleOpenModal = (type: 'hero' | 'product', item?: any) => {
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
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(item => item.id !== id));
      alert('Produk berhasil dihapus!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'hero') {
      setHero({
        image: previewImage || hero.image,
        description: (e.target as any).description.value || hero.description
      });
    } else {
      if (editingItem) {
        setProducts(products.map(p =>
          p.id === editingItem.id
            ? {
                ...p,
                title: (e.target as any).title.value,
                description: (e.target as any).description.value,
                image: previewImage || p.image,
              }
            : p
        ));
      } else {
        const newProduct: Product = {
          id: products.length + 1,
          title: (e.target as any).title.value,
          description: (e.target as any).description.value,
          image: previewImage || 'https://via.placeholder.com/150',
        };
        setProducts([...products, newProduct]);
      }
    }
    alert('Data berhasil disimpan!');
    handleCloseModal();
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
                <Button className="btn-add" onClick={() => handleOpenModal('hero', hero)}>
                  Edit
                </Button>
              </div>
              
              <Row>
                <Col md={5}>
                  <img src={hero.image} alt="Event Hero" className="w-100 rounded" />
                </Col>
                <Col md={7}>
                  <p className="text-muted">{hero.description}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Products */}
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="cms-section-title">Related Products</h4>
                <Button className="btn-add" onClick={() => handleOpenModal('product')}>
                  + Add Product
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
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.title} className="table-image" />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>
                        <Button 
                          variant="warning" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleOpenModal('product', product)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDelete(product.id)}
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            {editingItem ? 'Edit' : 'Add'} {modalType === 'hero' ? 'Hero Section' : 'Product'}
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

            {modalType === 'product' && (
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title"
                  defaultValue={editingItem?.title}
                  placeholder="Enter product title"
                />
              </Form.Group>
            )}

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

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                type="submit"
                // Apply custom styles for the background, border, and text color
                style={{ 
                  backgroundColor: '#f1c76e', 
                  borderColor: '#f1c76e', 
                  color: '#333' // Dark text for better contrast
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}