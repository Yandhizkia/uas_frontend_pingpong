'use client';

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

interface CustomConfirmProps {
  show: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CustomConfirm({
  show,
  title = 'Confirmation',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: CustomConfirmProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="d-flex align-items-center gap-2">
          <ExclamationTriangleFill 
            size={24} 
            color={variant === 'danger' ? '#dc3545' : variant === 'warning' ? '#ffc107' : '#f1c76e'}
          />
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <p style={{ color: '#cbd5e0', fontSize: '1rem', margin: 0 }}>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button 
          variant="secondary" 
          onClick={onCancel}
          style={{
            backgroundColor: 'var(--gray-600)',
            border: 'none'
          }}
        >
          {cancelText}
        </Button>
        <Button 
          variant={variant} 
          onClick={onConfirm}
          style={{
            backgroundColor: variant === 'danger' ? '#dc3545' : variant === 'warning' ? '#ffc107' : '#f1c76e',
            border: 'none',
            color: variant === 'warning' || variant === 'primary' ? '#231e16' : 'white'
          }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}