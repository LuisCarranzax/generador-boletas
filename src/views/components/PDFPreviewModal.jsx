import React from 'react';

export const PDFPreviewModal = ({ isOpen, previewUrl, onClose, onDownload }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            Previsualización del Comprobante PDF
          </div>
          <button type="button" className="btn-close" onClick={onClose} title="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              title="Vista Previa de Boleta"
              className="pdf-iframe"
            />
          ) : (
            <div className="loading-spinner">Cargando documento...</div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button type="button" className="btn btn-primary" onClick={onDownload}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};
