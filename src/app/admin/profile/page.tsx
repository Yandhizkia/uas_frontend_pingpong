"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@pingfbank.com",
    photo:
      "https://ui-avatars.com/api/?name=Admin&background=b8a080&color=231e16&size=200",
  });

  const [previewPhoto, setPreviewPhoto] = useState(profile.photo);

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
    alert("Profile updated successfully!");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header title="Profile Settings" />

        <Container fluid className="admin-main">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="profile-card">
                <Card.Body className="p-4">
                  <h3 className="mb-4">Edit Profile</h3>

                  <div className="text-center mb-4">
                    <div className="profile-photo-wrapper">
                      <img
                        src={previewPhoto}
                        alt="Profile"
                        className="profile-photo-large"
                      />
                      <label
                        htmlFor="photoUpload"
                        className="photo-upload-btn"
                        style={{ color: "white" }}
                      >
                        📷 Change Photo
                      </label>
                      <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password (Optional)</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Leave blank to keep current password"
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mt-3"
                      style={{
                        backgroundColor: "#f1c76e",
                        borderColor: "#f1c76e",
                        color: "#333", // Dark text for better contrast
                      }}
                    >
                      Save Changes
                    </Button>
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
