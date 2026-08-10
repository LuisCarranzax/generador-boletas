import React from 'react';

export const ServicesTableView = ({
  services,
  onServiceChange,
  onAddRow,
  onRemoveRow
}) => {
  return (
    <section className="card services-section">
      <div className="card-header-action">
        <div className="card-header">
          <div className="card-header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div>
            <h2>Servicios y Conceptos Prestados</h2>
            <p className="card-subtitle">Detalle los servicios, horas o bienes facturados</p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-icon-text"
          onClick={onAddRow}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Agregar Servicio
        </button>
      </div>

      <div className="table-responsive">
        <table className="corporate-table">
          <thead>
            <tr>
              <th className="th-idx">#</th>
              <th className="th-desc">Descripción del Servicio / Detalle</th>
              <th className="th-qty">Cant.</th>
              <th className="th-price">P. Unitario (S/)</th>
              <th className="th-subtotal">Subtotal (S/)</th>
              <th className="th-action"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((item, index) => {
              const subtotal = (Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2);
              return (
                <tr key={item.id} className="table-row">
                  <td className="td-idx">{index + 1}</td>
                  <td className="td-desc">
                    <input
                      type="text"
                      placeholder="Ej. Servicio de consultoría técnica de desarrollo software..."
                      value={item.description}
                      onChange={(e) => onServiceChange(item.id, 'description', e.target.value)}
                      className="input-table"
                    />
                  </td>
                  <td className="td-qty">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onServiceChange(item.id, 'quantity', e.target.value)}
                      className="input-table text-center"
                    />
                  </td>
                  <td className="td-price">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => onServiceChange(item.id, 'unitPrice', e.target.value)}
                      className="input-table text-right font-mono"
                    />
                  </td>
                  <td className="td-subtotal font-mono text-right font-bold">
                    S/ {subtotal}
                  </td>
                  <td className="td-action text-center">
                    <button
                      type="button"
                      className="btn-trash"
                      title="Eliminar este servicio"
                      disabled={services.length === 1}
                      onClick={() => onRemoveRow(item.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
