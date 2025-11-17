'use client';

import React, { useState, useEffect } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function UserProfilePage() {

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '081234567890',
    nim: '525200999',
    faculty: 'Teknik',
    major: 'Informatika',
    photo: ''
  });

  const [previewPhoto, setPreviewPhoto] = useState('');

  // ADDED: ambil nama & email dari localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("name") || "User";
    const savedEmail = localStorage.getItem("email") || "";

    const avatar = `https://ui-avatars.com/api/?name=${savedName.replace(" ", "+")}&background=b8a080&color=231e16&size=200`;

    setProfile((prev) => ({
      ...prev,
      name: savedName,
      email: savedEmail,
      photo: avatar
    }));

    setPreviewPhoto(avatar);
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="My Profile" />
        
        <Container fluid className="admin-main">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="profile-card">
                <Card.Body className="p-4">
                  <h3 className="mb-4" style={{ color: '#d3d7e8' }}>Profile Settings</h3>
                  
                  <div className="text-center mb-4">
                    <div className="profile-photo-wrapper">
                      <img 
                        src={previewPhoto} 
                        alt="Profile" 
                        className="profile-photo-large"
                      />
                      <label htmlFor="photoUpload" className="photo-upload-btn">
                        📷 Change Photo
                      </label>
                      <input 
                        type="file" 
                        id="photoUpload" 
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">NIM</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.nim}
                            onChange={(e) => setProfile({ ...profile, nim: e.target.value })}
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Faculty</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.faculty}
                            onChange={(e) => setProfile({ ...profile, faculty: e.target.value })}
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Major</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.major}
                            onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr style={{ borderColor: 'var(--gray-600)', margin: '2rem 0' }} />

                    <h5 className="mb-3" style={{ color: '#f1c76e' }}>Change Password</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter current password"
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">New Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex gap-3 justify-content-end mt-4">
                      <Button variant="secondary" style={{
                        backgroundColor: 'var(--gray-600)',
                        border: 'none',
                        padding: '0.75rem 2rem'
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit" className="btn-user-submit" style={{
                        padding: '0.75rem 2rem'
                      }}>
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
