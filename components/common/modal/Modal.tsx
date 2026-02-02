'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

// 기본 모달
export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // SSR 대응: 클라이언트에서만 렌더링
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dim 배경 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 팝업 내용 */}
      <div
        className="relative bg-bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body, // ← body에 직접 렌더링
  );
}
