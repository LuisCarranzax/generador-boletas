import React from 'react';

export const ClientFormView = ({ client, onChange }) => {
  return (
    <section className="card form-section">
      <div className="card-header">
        <div className="card-header-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <h2>Datos del Cliente / Receptor</h2>
          <p className="card-subtitle">Ingrese los datos de facturación del cliente receptor</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group required">
          <label htmlFor="name">
            Nombre / Razón Social <span className="req">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ej. Corporación Perú S.A.C. / Juan Pérez"
            value={client.name}
            onChange={onChange}
            className={!client.name ? 'input-pending' : 'input-valid'}
          />
        </div>

        <div className="form-group required">
          <label htmlFor="documentNumber">
            DNI o RUC <span className="req">*</span>
          </label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            placeholder="Ej. 10456789012 o 20123456789"
            value={client.documentNumber}
            onChange={onChange}
            className={!client.documentNumber ? 'input-pending' : 'input-valid'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección Fiscal / Domicilio</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Ej. Av. Javier Prado Este 1230, San Isidro"
            value={client.address}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Número de Contacto</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Ej. +51 987 654 321"
            value={client.phone}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="issueDate">Fecha de Emisión</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={client.issueDate}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="receiptNumber">Serie y Correlativo Boleta</label>
          <input
            type="text"
            id="receiptNumber"
            name="receiptNumber"
            value={client.receiptNumber}
            onChange={onChange}
            className="input-code"
          />
        </div>
      </div>
    </section>
  );
};
