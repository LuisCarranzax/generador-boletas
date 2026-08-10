import React from 'react';
import { BUSINESS_INFO } from '../../models/businessModel';

export const NavbarView = ({ onReset }) => {
  return (
    <header className="navbar-container">
      <div className="navbar-content container">
        <div className="brand-badge">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">{BUSINESS_INFO.shortName}</span>
            <span className="brand-subtitle">Facturación & Control Fiscal</span>
          </div>
        </div>

        <div className="navbar-actions">
          <span className="status-indicator">
            <span className="dot pulse"></span> Sistema Operativo
          </span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onReset}
            title="Nueva Boleta / Limpiar Formulario"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Nueva Boleta
          </button>
        </div>
      </div>
    </header>
  );
};
