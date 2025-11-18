"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@pingfbank.com",
    photo:
      "https://ui-avatars.com/api/?name=Admin&background=b8a080&color=231e16&size=200",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState(profile.photo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } = useConfirm();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        error('Photo size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
        success('Photo selected! Click "Save Changes" to update.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!profile.name.trim()) {
      error('Name is required');
      return;
    }

    if (!profile.email.trim()) {
      error('Email is required');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      error('Please enter a valid email address');
      return;
    }

    // Password validation (if provided)
    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        error('Password must be at least 6 characters');
        return;
      }

      if (newPassword !== confirmPassword) {
        error('Passwords do not match');
        return;
      }
    }

    showConfirm({
      title: "Save Changes",
      message: "Are you sure you want to update your profile?",
      confirmText: "Save",
      cancelText: "Cancel",
      variant: "primary",
      onConfirm: async () => {
        setIsSubmitting(true);
        try {
          // TODO: Replace with actual API call
          // await axios.put('/api/admin/profile', {
          //   ...profile,
          //   password: newPassword || undefined
          // });

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          success('Profile updated successfully!');

          // Clear password fields
          setNewPassword('');
          setConfirmPassword('');

          // Update avatar if name changed
          const newAvatar = `https://ui-avatars.com/api/?name=${profile.name.replace(" ", "+")}&background=b8a080&color=231e16&size=200`;
          setProfile({ ...profile, photo: newAvatar });
          setPreviewPhoto(newAvatar);

        } catch (err: any) {
          console.error(err);
          error(err.response?.data?.message || 'Failed to update profile');
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  const handleCancel = () => {
    showConfirm({
      title: "Discard Changes",
      message: "Are you sure you want to discard all changes?",
      confirmText: "Discard",
      cancelText: "Keep Editing",
      variant: "warning",
      onConfirm: () => {
        // Reset to original data
        setProfile({
          name: "Admin User",
          email: "admin@pingfbank.com",
          photo: "https://ui-avatars.com/api/?name=Admin&background=b8a080&color=231e16&size=200",
        });
        setPreviewPhoto("https://ui-avatars.com/api/?name=Admin&background=b8a080&color=231e16&size=200");
        setNewPassword('');
        setConfirmPassword('');
        success('Changes discarded');
      },
    });
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
                  <h3 className="mb-4" style={{ color: '#d3d7e8' }}>Edit Profile</h3>

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
                    <small style={{ color: 'var(--gray-400)', display: 'block', marginTop: '0.5rem' }}>
                      Max file size: 5MB
                    </small>
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
                        required
                        style={{
                          backgroundColor: 'var(--gray-700)',
                          border: '1px solid var(--gray-600)',
                          color: 'white'
                        }}
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
                        required
                        style={{
                          backgroundColor: 'var(--gray-700)',
                          border: '1px solid var(--gray-600)',
                          color: 'white'
                        }}
                      />
                    </Form.Group>

                    <hr style={{ borderColor: 'var(--gray-600)', margin: '2rem 0' }} />

                    <h5 className="mb-3" style={{ color: '#f1c76e' }}>Change Password (Optional)</h5>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leave blank to keep current password"
                        style={{
                          backgroundColor: 'var(--gray-700)',
                          border: '1px solid var(--gray-600)',
                          color: 'white'
                        }}
                      />
                      <Form.Text style={{ color: 'var(--gray-400)' }}>
                        At least 6 characters
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        style={{
                          backgroundColor: 'var(--gray-700)',
                          border: '1px solid var(--gray-600)',
                          color: 'white'
                        }}
                      />
                    </Form.Group>

                    <div className="d-flex gap-3">
                      <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="flex-fill"
                        style={{
                          backgroundColor: 'var(--gray-600)',
                          border: 'none'
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-fill"
                        style={{
                          backgroundColor: "#f1c76e",
                          borderColor: "#f1c76e",
                          color: "#333",
                        }}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

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
        </Container>
      </div>
    </div>
  );
}