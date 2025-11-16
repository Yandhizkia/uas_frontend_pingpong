'use client';

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangleFill, CheckCircleFill } from 'react-bootstrap-icons';

interface CustomConfirmProps {
  show: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'success';
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
  const getIconColor = () => {
    switch (variant) {
      case 'danger': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'success': return '#28a745';
      case 'primary': return '#f1c76e';
      default: return '#f1c76e';
    }
  };

  const getButtonColor = () => {
    switch (variant) {
      case 'danger': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'success': return '#28a745';
      case 'primary': return '#f1c76e';
      default: return '#f1c76e';
    }
  };

  const getTextColor = () => {
    return (variant === 'warning' || variant === 'primary') ? '#231e16' : 'white';
  };

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="d-flex align-items-center gap-2">
          {variant === 'success' ? (
            <CheckCircleFill size={24} color={getIconColor()} />
          ) : (
            <ExclamationTriangleFill size={24} color={getIconColor()} />
          )}
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
          variant={variant === 'success' ? 'success' : variant} 
          onClick={onConfirm}
          style={{
            backgroundColor: getButtonColor(),
            border: 'none',
            color: getTextColor()
          }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}