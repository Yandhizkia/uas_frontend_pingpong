'use client';

import React, { useState, useEffect } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Badge, Form, Modal, Button } from 'react-bootstrap';
import { BellFill, CheckCircleFill, ExclamationDiamondFill } from 'react-bootstrap-icons';

const API_BASE = process.env.NEXT_PUBLIC_ANNOUNCEMENT_MANAGEMENT || "";

export default function AnnouncementPage() {
  const [filter, setFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/announcement`);
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const data = await res.json();
      // 🔥 Sorting berdasarkan date + time
      const sorted = data.sort((a: any, b: any) => {
        const toDate = (x: any) => {
          const [day, month, year] = x.date.split("/").map(Number);
          return new Date(`${year}-${month}-${day}T${x.time}`);
        };

        return toDate(b).getTime() - toDate(a).getTime(); // terbaru paling atas
      });

      setAnnouncements(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAnnouncements = filter === 'all'
    ? announcements
    : filter === 'unread'
    ? announcements.filter(a => !a.read)
    : filter === 'important'
    ? announcements.filter(a => a.important)
    : announcements.filter(a => a.type === filter);

  const getTypeBadge = (type: string) => {
    const badges: any = {
      urgent: { bg: 'danger', label: 'URGENT', icon: '🚨' },
      warning: { bg: 'warning', label: 'WARNING', icon: '⚠️' },
      info: { bg: 'info', label: 'INFO', icon: 'ℹ️' }
    };
    const badge = badges[type] || { bg: 'secondary', label: 'INFO', icon: 'ℹ️' };
    return (
      <Badge bg={badge.bg}>
        {badge.icon} {badge.label}
      </Badge>
    );
  };

  const handleReadAnnouncement = async (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setShowDetailModal(true);
    
    // Mark as read (update on server) if unread
    if (!announcement.read) {
      try {
        const payload = {
          title: announcement.title,
          message: announcement.message,
          type: announcement.type,
          important: announcement.important,
          read: true
        };
        const res = await fetch(`${API_BASE}/announcement/${announcement.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          console.error("Failed to mark read");
        } else {
          // update local state
          setAnnouncements(prev => {
            const updated = prev.map(a =>
              a.id === announcement.id ? { ...a, read: true } : a
            );

            // 🔥 kirim event ke Sidebar (real-time)
            const unreadCount = updated.filter(a => !a.read).length;
            window.dispatchEvent(new CustomEvent("announcement-updated", {
              detail: { unreadCount }
            }));

            return updated;
          });

          setAnnouncements(prev => prev.map(a => a.id === announcement.id ? { ...a, read: true } : a));
          setSelectedAnnouncement((prev: any) => prev ? { ...prev, read: true } : prev);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const unreadCount = announcements.filter(a => !a.read).length;
  const importantCount = announcements.filter(a => a.important && !a.read).length;

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="Announcements" />
        
        <Container fluid className="admin-main">
          {/* Header Stats */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <Card className="announcement-stat-card">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="stat-icon-announcement unread">
                    <BellFill size={24} />
                  </div>
                  <div>
                    <div className="stat-number">{unreadCount}</div>
                    <div className="stat-label">Unread</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="announcement-stat-card">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="stat-icon-announcement important">
  <ExclamationDiamondFill size={24} />
</div>

                  <div>
                    <div className="stat-number">{importantCount}</div>
                    <div className="stat-label">Important</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="announcement-stat-card">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="stat-icon-announcement total">
                    <CheckCircleFill size={24} />
                  </div>
                  <div>
                    <div className="stat-number">{announcements.length}</div>
                    <div className="stat-label">Total</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="cms-section-title mb-2">All Announcements</h4>
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem', margin: 0 }}>
                    Stay updated with latest news from admin
                  </p>
                </div>
                <Form.Select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ 
                    width: 'auto',
                    backgroundColor: 'var(--gray-700)',
                    border: '1px solid var(--gray-600)',
                    color: 'white'
                  }}
                >
                  <option value="all">All Announcements</option>
                  <option value="unread">Unread Only</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </Form.Select>
              </div>

              <div className="announcement-list-user">
                {filteredAnnouncements.map((announcement) => (
                  <Card 
                    key={announcement.id} 
                    className={`announcement-card-user ${!announcement.read ? 'unread' : ''}`}
                    onClick={() => handleReadAnnouncement(announcement)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            {!announcement.read && (
                              <div className="unread-indicator"></div>
                            )}
                            <h5 className="announcement-title-user mb-0">
                              {announcement.title}
                            </h5>
                           {announcement.important && (
  <ExclamationDiamondFill size={20} color="#f1c76e" />
)}

                          </div>
                          {getTypeBadge(announcement.type)}
                        </div>
                        <div className="text-end">
                          <small style={{ color: 'var(--gray-400)', display: 'block' }}>
                            {announcement.date}
                          </small>
                          <small style={{ color: 'var(--gray-400)' }}>
                            {announcement.time}
                          </small>
                        </div>
                      </div>
                      <p className="announcement-preview">
                        {announcement.message.length > 120 
                          ? `${announcement.message.substring(0, 120)}...` 
                          : announcement.message
                        }
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="read-more-link">
                          Read more →
                        </span>
                        {!announcement.read && (
                          <Badge bg="primary" pill style={{ fontSize: '0.7rem' }}>
                            NEW
                          </Badge>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}

                {filteredAnnouncements.length === 0 && !loading && (
                  <div className="text-center py-5">
                    <p style={{ color: 'var(--gray-400)' }}>
                      No announcements found
                    </p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered size="lg">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Announcement Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {selectedAnnouncement && (
            <div>
              <div className="mb-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h4 style={{ color: '#f1c76e', marginBottom: 0 }}>
                    {selectedAnnouncement.title}
                  </h4>
                 {selectedAnnouncement.important && (
                  <ExclamationDiamondFill size={24} color="#f1c76e" />
                  )}

                </div>
                {getTypeBadge(selectedAnnouncement.type)}
              </div>

              <div className="announcement-meta-detail mb-4">
                <div className="meta-detail-item">
                  <span className="meta-label">Date:</span>
                  <span className="meta-value">{selectedAnnouncement.date}</span>
                </div>
                <div className="meta-detail-item">
                  <span className="meta-label">Time:</span>
                  <span className="meta-value">{selectedAnnouncement.time}</span>
                </div>
                <div className="meta-detail-item">
                  <span className="meta-label">Status:</span>
                  <Badge bg={selectedAnnouncement.read ? 'success' : 'warning'}>
                    {selectedAnnouncement.read ? 'Read' : 'Unread'}
                  </Badge>
                </div>
              </div>

              <div className="announcement-content-detail">
                <p style={{ 
                  color: '#cbd5e0', 
                  lineHeight: '1.8',
                  fontSize: '1rem',
                  margin: 0 
                }}>
                  {selectedAnnouncement.message}
                </p>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDetailModal(false)}
                  style={{
                    backgroundColor: 'var(--gray-600)',
                    border: 'none'
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
