{/*'use client';

import React, { useState } from 'react';
import UserSidebar from '../components/Sidebar';
import UserHeader from '../components/Header';
import { Container, Card, Row, Col, Form, Badge } from 'react-bootstrap';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');

  const members = [
    {
      id: 1,
      name: 'John Doe',
      nim: '525200999',
      batch: '2020',
      faculty: 'Teknik',
      position: 'Captain',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=b8a080&color=231e16'
    },
    {
      id: 2,
      name: 'Jane Smith',
      nim: '525200888',
      batch: '2021',
      faculty: 'Ekonomi',
      position: 'Member',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=4299e1&color=fff'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      nim: '525200777',
      batch: '2022',
      faculty: 'Hukum',
      position: 'Member',
      avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson&background=48bb78&color=fff'
    },
    {
      id: 4,
      name: 'Alice Brown',
      nim: '525200666',
      batch: '2020',
      faculty: 'Psikologi',
      position: 'Vice Captain',
      avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=ed8936&color=fff'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      nim: '525200555',
      batch: '2021',
      faculty: 'Teknik',
      position: 'Member',
      avatar: 'https://ui-avatars.com/api/?name=Charlie+Davis&background=9f7aea&color=fff'
    },
    {
      id: 6,
      name: 'Diana Evans',
      nim: '525200444',
      batch: '2022',
      faculty: 'Desain',
      position: 'Member',
      avatar: 'https://ui-avatars.com/api/?name=Diana+Evans&background=f56565&color=fff'
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.nim.includes(searchTerm);
    const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
    return matchesSearch && matchesBatch;
  });

  const getPositionBadge = (position: string) => {
    if (position === 'Captain') return <Badge bg="warning">Captain</Badge>;
    if (position === 'Vice Captain') return <Badge bg="info">Vice Captain</Badge>;
    return <Badge bg="secondary">Member</Badge>;
  };

  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-content">
        <UserHeader title="Members" />
        
        <Container fluid className="admin-main">
          <Card className="cms-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="cms-section-title mb-2">LTMU Members</h4>
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem', margin: 0 }}>
                    Connect with other members
                  </p>
                </div>
                <Badge bg="primary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                  {filteredMembers.length} Members
                </Badge>
              </div>


              <Row className="mb-4">
                <Col md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or NIM..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="user-form-input"
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={filterBatch}
                    onChange={(e) => setFilterBatch(e.target.value)}
                    className="user-form-input"
                  >
                    <option value="all">All Batches</option>
                    <option value="2020">Batch 2020</option>
                    <option value="2021">Batch 2021</option>
                    <option value="2022">Batch 2022</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className="g-4">
                {filteredMembers.map((member) => (
                  <Col md={6} lg={4} key={member.id}>
                    <Card className="member-card">
                      <Card.Body className="p-4 text-center">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="member-avatar"
                        />
                        <h5 className="member-name">{member.name}</h5>
                        <p className="member-nim">{member.nim}</p>
                        
                        <div className="mb-3">
                          {getPositionBadge(member.position)}
                        </div>

                        <div className="member-info">
                          <div className="member-info-item">
                            <span className="info-label">Faculty:</span>
                            <span className="info-value">{member.faculty}</span>
                          </div>
                          <div className="member-info-item">
                            <span className="info-label">Batch:</span>
                            <span className="info-value">{member.batch}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {filteredMembers.length === 0 && (
                <div className="text-center py-5">
                  <p style={{ color: 'var(--gray-400)' }}>
                    No members found
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
  */}