'use client';

import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CheckCircleFill, ExclamationTriangleFill, InfoCircleFill, XCircleFill } from 'react-bootstrap-icons';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

interface CustomToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function CustomToast({ toasts, onClose }: CustomToastProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleFill size={20} color="#28a745" />;
      case 'error':
        return <XCircleFill size={20} color="#dc3545" />;
      case 'warning':
        return <ExclamationTriangleFill size={20} color="#ffc107" />;
      case 'info':
        return <InfoCircleFill size={20} color="#17a2b8" />;
      default:
        return <InfoCircleFill size={20} color="#17a2b8" />;
    }
  };

  const getTitle = (type: string, customTitle?: string) => {
    if (customTitle) return customTitle;
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      default:
        return 'Notification';
    }
  };

  return (
    <ToastContainer position="top-end" className="custom-toast-container p-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onClose={() => onClose(toast.id)}
          show={true}
          delay={5000}
          autohide
          className={`custom-toast custom-toast-${toast.type}`}
        >
          <Toast.Header closeButton>
            <div className="d-flex align-items-center gap-2">
              {getIcon(toast.type)}
              <strong className="me-auto">{getTitle(toast.type, toast.title)}</strong>
            </div>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}