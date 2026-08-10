import React from 'react';
import { BUSINESS_INFO } from '../../models/businessModel';

export const ReceiptSummaryView = ({
  totalAmount,
  validation,
  onDownloadPDF,
  onOpenPreview
}) => {
  return (
    <section className="card summary-card">
      <div className="summary-layout">
        {/* Información bancaria corporativa */}
        <div className="bank-info-box">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
            Métodos de Pago & Cuentas Oficiales
          </h3>
          <ul className="bank-list">
            {BUSINESS_INFO.bankAccounts.map((acc, index) => (
              <li key={index}>
                <span className="bank-name">{acc.bank}:</span>
                <span className="bank-acc">{acc.account}</span>
                {acc.cci && <span className="bank-cci">CCI: {acc.cci}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Totales y Acciones Principales */}
        <div className="summary-actions-box">
          {!validation.isValid && (
            <div className="validation-alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Para exportar o ver la boleta, complete el Nombre y DNI/RUC del cliente.</span>
            </div>
          )}

          <div className="grand-total-display">
            <span className="total-label">TOTAL GENERAL A PAGAR</span>
            <span className="total-amount font-mono">S/ {totalAmount.toFixed(2)}</span>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onOpenPreview}
              disabled={!validation.isValid}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Previsualizar PDF
            </button>

            <button
              type="button"
              className="btn btn-primary btn-lg shine-effect"
              onClick={onDownloadPDF}
              disabled={!validation.isValid}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Exportar Boleta a PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
