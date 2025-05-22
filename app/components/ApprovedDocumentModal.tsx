'use client';

import { useEffect } from 'react';

interface ApprovedDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export default function ApprovedDocumentModal({ isOpen, onClose, pdfUrl }: ApprovedDocumentModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Approved Document
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
          {pdfUrl ? (
            <embed
              src={pdfUrl}
              className="w-full h-[calc(90vh-12rem)] border border-gray-300 rounded-lg shadow-md"
              type="application/pdf"
            />
          ) : (
            <div className="text-center text-gray-600 py-8">
              No document available
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 