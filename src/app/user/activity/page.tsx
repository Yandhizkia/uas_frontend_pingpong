'use client';

import React, { useState } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Badge, Tabs, Tab } from 'react-bootstrap';
// Import icons dari react-icons/bs
import { Clock, GeoAlt } from "react-bootstrap-icons";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('all');

  const activities = [
    {
      id: 1,
      title: 'Latihan Rutin',
      type: 'training',
      date: '2024-01-15',
      time: '16.00 - 18.00',
      location: 'GOR Untar',
      status: 'completed',
      description: 'Latihan teknik serve dan forehand'
    },
    {
      id: 2,
      title: 'Tournament Internal',
      type: 'tournament',
      date: '2024-01-12',
      time: '09.00 - 15.00',
      location: 'GOR Untar',
      status: 'completed',
      description: 'Juara 2 - Singles Category'
    },
    {
      id: 3,
      title: 'Friendly Match',
      type: 'match',
      date: '2024-01-10',
      time: '14.00 - 16.00',
      location: 'GOR Untar',
      status: 'completed',
      description: 'Match melawan team B'
    },
    {
      id: 4,
      title: 'Workshop Teknik',
      type: 'workshop',
      date: '2024-01-28',
      time: '14.00 - 16.00',
      location: 'Ruang A',
      status: 'upcoming',
      description: 'Workshop teknik backhand dengan coach profesional'
    },
    {
      id: 5,
      title: 'Team Meeting',
      type: 'meeting',
      date: '2024-02-01',
      time: '13.00 - 14.00',
      location: 'Online - Zoom',
      status: 'upcoming',
      description: 'Pembahasan jadwal tournament'
    },
  ];

  const filteredActivities = activeTab === 'all' 
    ? activities 
    : activities.filter(a => a.status === activeTab);

  const getTypeColor = (type: string) => {
    const colors: any = {
      training: 'primary',
      tournament: 'warning',
      match: 'success',
      workshop: 'info',
      meeting: 'secondary'
    };
    return colors[type] || 'secondary';
  };

  const getStatusBadge = (status: string) => {
    return status === 'completed' 
      ? <Badge bg="success">Completed</Badge>
      : <Badge bg="warning">Upcoming</Badge>;
  };

  return (
    <div className="admin-layout">
      <style jsx global>{`
        /* Mengatur gaya dasar untuk semua nav-link (tab tidak aktif) */
        .activity-tabs .nav-link {
          color: #ADB5BD !important; /* Warna teks abu-abu untuk tab yang TIDAK dipilih */
          font-weight: bold !important; /* Membuat teks menjadi lebih tebal */
          background-color: transparent !important; /* Latar belakang selalu transparan */
          border-bottom: 3px solid transparent !important; /* Garis bawah transparan */
          border-radius: 0 !important; /* Hapus border-radius */
          outline: none !important; /* Pastikan tidak ada outline default */
          box-shadow: none !important; /* Pastikan tidak ada box-shadow default */
          transition: all 0.2s ease-in-out; /* Transisi halus untuk efek hover */
        }

        /* Mengatur gaya saat tab TIDAK aktif di-hover atau fokus */
        .activity-tabs .nav-link:not(.active):hover,
        .activity-tabs .nav-link:not(.active):focus {
          background-color: #FFFFFF !important; /* Latar belakang menjadi putih (seperti card) */
          color: #2C313A !important; /* Warna teks menjadi gelap (seperti background utama) */
          border-bottom-color: transparent !important; /* Hapus garis bawah saat di-hover */
          border-radius: 0.25rem 0.25rem 0 0 !important; /* Tambahkan border-radius di atas */
          outline: none !important; /* Hapus outline saat hover/focus */
          box-shadow: none !important; /* Hapus box-shadow saat hover/focus */
        }

        /* Mengatur gaya untuk tab yang aktif */
        .activity-tabs .nav-link.active {
          color: #f1c76e !important; /* Warna teks kuning untuk tab yang DIPILIH */
          background-color: transparent !important; /* Latar belakang tab aktif tetap transparan */
          border-bottom-color: #f1c76e !important; /* Garis bawah kuning untuk tab aktif */
          border-color: transparent transparent #f1c56e transparent !important; /* Sesuaikan border agar hanya bawah yang kuning */
          outline: none !important; /* Hapus outline saat aktif */
          box-shadow: none !important; /* Hapus box-shadow saat aktif */
        }

        /* Mengatur gaya saat tab AKTIF di-hover atau fokus (agar tidak berubah dari state aktif) */
        .activity-tabs .nav-link.active:hover,
        .activity-tabs .nav-link.active:focus {
          color: #f1c76e !important; /* Tetap kuning */
          background-color: transparent !important; /* Tetap transparan */
          border-bottom-color: #f1c76e !important; /* Tetap garis bawah kuning */
          outline: none !important; /* Hapus outline */
          box-shadow: none !important; /* Hapus box-shadow */
        }

        /* Menyesuaikan jarak antar tab jika diperlukan */
        .activity-tabs .nav-item {
          margin-right: 15px; /* Sesuaikan jarak antar tab */
        }

        /* Menghilangkan garis abu-abu di bawah tab secara keseluruhan jika ada */
        .activity-tabs .nav-tabs {
          border-bottom: none !important;
        }

        /* Gaya untuk ikon di activity-meta agar sejajar dengan teks */
        .activity-meta span {
            display: flex;
            align-items: center;
            gap: 5px; /* Jarak antara ikon dan teks */
        }
      `}</style>
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="My Activity" />
        
        <Container fluid className="admin-main">
          <Card className="cms-card">
            <Card.Body>
              <div className="mb-4">
                <h4 className="cms-section-title mb-2">Activity History</h4>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
                  Track all your events, trainings, and activities
                </p>
              </div>

              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || 'all')}
                className="activity-tabs mb-4"
              >
                <Tab eventKey="all" title="All Activities">
                  <div className="activity-timeline">
                    {filteredActivities.map((activity) => (
                      <div key={activity.id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <Card className="timeline-card">
                          <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="mb-2">{activity.title}</h5>
                                <div className="d-flex gap-2 mb-2">
                                  <Badge bg={getTypeColor(activity.type)}>
                                    {activity.type.toUpperCase()}
                                  </Badge>
                                  {getStatusBadge(activity.status)}
                                </div>
                              </div>
                              <div className="activity-date-badge">
                                {new Date(activity.date).toLocaleDateString('en', { 
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </div>
                            </div>
                            
                            <p className="activity-description">{activity.description}</p>
                            
                            <div className="activity-meta">
                              {/* Menggunakan React Bootstrap Icons di sini */}
                              <span><Clock /> {activity.time}</span>
                              <span><GeoAlt /> {activity.location}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab eventKey="completed" title="Completed">
                  <div className="activity-timeline">
                    {filteredActivities.map((activity) => (
                      <div key={activity.id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <Card className="timeline-card">
                          <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="mb-2">{activity.title}</h5>
                                <div className="d-flex gap-2 mb-2">
                                  <Badge bg={getTypeColor(activity.type)}>
                                    {activity.type.toUpperCase()}
                                  </Badge>
                                  {getStatusBadge(activity.status)}
                                </div>
                              </div>
                              <div className="activity-date-badge">
                                {new Date(activity.date).toLocaleDateString('en', { 
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </div>
                            </div>
                            
                            <p className="activity-description">{activity.description}</p>
                            
                            <div className="activity-meta">
                              {/* Menggunakan React Bootstrap Icons di sini */}
                              <span><Clock /> {activity.time}</span>
                              <span><GeoAlt /> {activity.location}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab eventKey="upcoming" title="Upcoming">
                  <div className="activity-timeline">
                    {filteredActivities.map((activity) => (
                      <div key={activity.id} className="timeline-item">
                        <div className="timeline-marker upcoming"></div>
                        <Card className="timeline-card">
                          <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="mb-2">{activity.title}</h5>
                                <div className="d-flex gap-2 mb-2">
                                  <Badge bg={getTypeColor(activity.type)}>
                                    {activity.type.toUpperCase()}
                                  </Badge>
                                  {getStatusBadge(activity.status)}
                                </div>
                              </div>
                              <div className="activity-date-badge upcoming">
                                {new Date(activity.date).toLocaleDateString('en', { 
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </div>
                            </div>
                            
                            <p className="activity-description">{activity.description}</p>
                            
                            <div className="activity-meta">
                              {/* Menggunakan React Bootstrap Icons di sini */}
                              <span><Clock /> {activity.time}</span>
                              <span><GeoAlt /> {activity.location}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}