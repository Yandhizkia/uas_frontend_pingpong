"use client";

import React, { useState, useEffect } from "react";
import UserSidebar from "../components/Sidebar";
import UserHeader from "../components/Header";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CustomToast from "@/components/CustomToast";
import CustomConfirm from "@/components/CustomConfirm";
import { useToast } from "@/app/hooks/UseToast";
import { useConfirm } from "@/app/hooks/UseConfirm";

export default function UserProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "081234567890",
    nim: "525200999",
    faculty: "Teknik",
    major: "Informatika",
    photo: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewPhoto, setPreviewPhoto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toasts, removeToast, success, error } = useToast();
  const { confirmState, showConfirm, hideConfirm, handleConfirm } =
    useConfirm();

  useEffect(() => {
    const savedName = localStorage.getItem("name") || "User";
    const savedEmail = localStorage.getItem("email") || "";

    const avatar = `https://ui-avatars.com/api/?name=${savedName.replace(
      " ",
      "+"
    )}&background=b8a080&color=231e16&size=200`;

    setProfile((prev) => ({
      ...prev,
      name: savedName,
      email: savedEmail,
      photo: avatar,
    }));

    setPreviewPhoto(avatar);
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        error("Photo size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        error("Please upload an image file");
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
      error("Name is required");
      return;
    }

    if (!profile.email.trim()) {
      error("Email is required");
      return;
    }

    if (!profile.nim.trim()) {
      error("NIM is required");
      return;
    }

    // Check if password fields are filled
    const isPasswordChange =
      passwordData.currentPassword ||
      passwordData.newPassword ||
      passwordData.confirmPassword;

    if (isPasswordChange) {
      // Validate password change
      if (!passwordData.currentPassword) {
        error("Current password is required");
        return;
      }

      if (!passwordData.newPassword) {
        error("New password is required");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        error("New password must be at least 6 characters");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        error("New passwords do not match");
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
          // await axios.put('/api/user/profile', profile);
          // if (isPasswordChange) {
          //   await axios.put('/api/user/password', passwordData);
          // }

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Update localStorage
          localStorage.setItem("name", profile.name);
          localStorage.setItem("email", profile.email);

          success("Profile updated successfully!");

          // Clear password fields after successful update
          if (isPasswordChange) {
            setPasswordData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          }
        } catch (err: any) {
          console.error(err);
          error(err.response?.data?.message || "Failed to update profile");
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
        // Reset to saved data
        const savedName = localStorage.getItem("name") || "User";
        const savedEmail = localStorage.getItem("email") || "";
        const avatar = `https://ui-avatars.com/api/?name=${savedName.replace(
          " ",
          "+"
        )}&background=b8a080&color=231e16&size=200`;

        setProfile((prev) => ({
          ...prev,
          name: savedName,
          email: savedEmail,
          photo: avatar,
        }));

        setPreviewPhoto(avatar);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        success("Changes discarded");
      },
    });
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
                  <h3 className="mb-4" style={{ color: "#d3d7e8" }}>
                    Profile Settings
                  </h3>

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
                        style={{ display: "none" }}
                      />
                    </div>
                    <small
                      style={{
                        color: "var(--gray-400)",
                        display: "block",
                        marginTop: "0.5rem",
                      }}
                    >
                      Max file size: 5MB
                    </small>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            className="user-form-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            NIM
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.nim}
                            onChange={(e) =>
                              setProfile({ ...profile, nim: e.target.value })
                            }
                            className="user-form-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            className="user-form-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Faculty
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.faculty}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                faculty: e.target.value,
                              })
                            }
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Major
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.major}
                            onChange={(e) =>
                              setProfile({ ...profile, major: e.target.value })
                            }
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr
                      style={{
                        borderColor: "var(--gray-600)",
                        margin: "2rem 0",
                      }}
                    />

                    <h5 className="mb-3" style={{ color: "#f1c76e" }}>
                      Change Password (Optional)
                    </h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Current Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                              })
                            }
                            placeholder="Enter current password"
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            New Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            placeholder="Enter new password"
                            className="user-form-input"
                          />
                          <Form.Text style={{ color: "var(--gray-400)" }}>
                            At least 6 characters
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="user-form-label">
                            Confirm New Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                            placeholder="Confirm new password"
                            className="user-form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex gap-3 justify-content-end mt-4">
                      <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "var(--gray-600)",
                          border: "none",
                          padding: "0.75rem 2rem",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="btn-user-submit"
                        disabled={isSubmitting}
                        style={{
                          padding: "0.75rem 2rem",
                          backgroundColor: "#f1c76e",
                        }}
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
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
