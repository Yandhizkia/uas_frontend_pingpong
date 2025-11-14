'use client';

import { useState, useCallback } from 'react';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    title?: string
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message, title }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message: string, title?: string) => {
    showToast('success', message, title);
  }, [showToast]);

  const error = useCallback((message: string, title?: string) => {
    showToast('error', message, title);
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    showToast('warning', message, title);
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    showToast('info', message, title);
  }, [showToast]);

  return {
    toasts,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}