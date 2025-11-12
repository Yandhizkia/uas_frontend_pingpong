'use client';

import React, { useState } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Badge, Form, Modal, Button } from 'react-bootstrap';
import { BellFill, CheckCircleFill } from 'react-bootstrap-icons';

export default function AnnouncementPage() {
  const [filter, setFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Kegiatan Club Ditiadakan',
      message: 'Kegiatan club minggu ini ditiadakan karena ada acara sekolah. Mohon maaf atas ketidaknyamanannya. Kami akan mengadakan kegiatan pengganti minggu depan.',
      type: 'warning',
      date: '2024-01-15',
      time: '10:30 AM',
      read: false,
      important: true
    },
    {
      id: 2,
      title: 'Perubahan Jadwal Latihan',
      message: 'Jadwal latihan dipindah dari Jumat ke Sabtu jam 14.00. Harap semua member hadir tepat waktu. Jangan lupa bawa perlengkapan lengkap.',
      type: 'info',
      date: '2024-01-10',
      time: '09:15 AM',
      read: true,
      important: false
    },
    {
      id: 3,
      title: 'Tournament Nasional - Pendaftaran Dibuka!',
      message: 'Pendaftaran untuk tournament nasional sudah dibuka! Buruan daftar sebelum tanggal 20 Januari 2024. Kuota terbatas hanya 50 peserta. Info lengkap hubungi admin.',
      type: 'urgent',
      date: '2024-01-08',
      time: '02:45 PM',
      read: true,
      important: true
    },
    {
      id: 4,
      title: 'Workshop Teknik Serve',
      message: 'Workshop khusus teknik serve akan diadakan minggu depan. Free untuk semua member LTMU! Akan dibimbing oleh coach profesional dari luar negeri.',
      type: 'info',
      date: '2024-01-05',
      time: '11:20 AM',
      read: true,
      important: false
    },
    {
      id: 5,
      title: 'Iuran Bulanan Reminder',
      message: 'Reminder untuk membayar iuran bulanan sebelum tanggal 25. Transfer ke rekening yang sudah ditentukan. Konfirmasi ke bendahara setelah transfer.',
      type: 'warning',
      date: '2024-01-03',
      time: '08:00 AM',
      read: true,
      important: false
    },
  ]);

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

  const handleReadAnnouncement = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setShowDetailModal(true);
    
    // Mark as read
    if (!announcement.read) {
      setAnnouncements(announcements.map(a => 
        a.id === announcement.id ? { ...a, read: true } : a
      ));
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
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
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
                              <span style={{ fontSize: '1.25rem' }}>⭐</span>
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

                {filteredAnnouncements.length === 0 && (
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
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
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