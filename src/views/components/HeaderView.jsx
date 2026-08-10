import React from 'react';

export const HeaderView = ({ businessInfo, receiptNumber, itemCount, totalAmount }) => {
  const companyTitle = businessInfo?.name || "Generador de Boletas de Venta";
  const companySubtitle = businessInfo?.slogan || "Emisión oficial y exportación de comprobantes de pago por prestación de servicios profesionales.";

  return (
    <div className="app-header-card">
      <div className="header-info">
        <div className="badge-tag">Comprobantes Electrónicos</div>
        <h1 className="header-title">{companyTitle}</h1>
        <p className="header-subtitle">{companySubtitle}</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">Comprobante N°</span>
          <span className="metric-value code">{receiptNumber}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Servicios Ítems</span>
          <span className="metric-value">{itemCount}</span>
        </div>
        <div className="metric-box highlight">
          <span className="metric-label">Importe Total</span>
          <span className="metric-value primary">S/ {totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
