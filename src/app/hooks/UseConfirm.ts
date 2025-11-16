'use client';

import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'success';
  onConfirm: () => void;
}

export function useConfirm() {
  const [confirmState, setConfirmState] = useState<{
    show: boolean;
    options: ConfirmOptions;
  }>({
    show: false,
    options: {
      message: '',
      onConfirm: () => {},
    },
  });

  const showConfirm = useCallback((options: ConfirmOptions) => {
    setConfirmState({
      show: true,
      options,
    });
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirmState((prev) => ({
      ...prev,
      show: false,
    }));
  }, []);

  const handleConfirm = useCallback(() => {
    confirmState.options.onConfirm();
    hideConfirm();
  }, [confirmState.options, hideConfirm]);

  return {
    confirmState,
    showConfirm,
    hideConfirm,
    handleConfirm,
  };
}