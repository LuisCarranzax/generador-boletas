import React, { useState, useEffect } from 'react';
import { COLOR_PALETTES } from '../../models/businessModel';
import { ConfirmModal } from './ConfirmModal';

export const BusinessConfigModal = ({
  isOpen,
  businessInfo,
  onClose,
  onSave,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'banks' | 'appearance'
  const [formData, setFormData] = useState(businessInfo);
  const [isConfirmDiscardOpen, setIsConfirmDiscardOpen] = useState(false);

  useEffect(() => {
    setFormData(businessInfo);
    setIsConfirmDiscardOpen(false);
  }, [businessInfo, isOpen]);

  if (!isOpen) return null;

  // Comprueba si el formulario sufrió cambios con respecto al estado guardado original
  const checkIsDirty = () => {
    return JSON.stringify(formData) !== JSON.stringify(businessInfo);
  };

  const handleAttemptClose = () => {
    if (checkIsDirty()) {
      setIsConfirmDiscardOpen(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setIsConfirmDiscardOpen(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejo de Cuentas Bancarias
  const handleBankChange = (index, field, value) => {
    setFormData(prev => {
      const updatedAccounts = [...prev.bankAccounts];
      updatedAccounts[index] = { ...updatedAccounts[index], [field]: value };
      return { ...prev, bankAccounts: updatedAccounts };
    });
  };

  const handleAddBank = () => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: [
        ...prev.bankAccounts,
        { bank: '', account: '', cci: '', owner: '' }
      ]
    }));
  };

  const handleRemoveBank = (index) => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index)
    }));
  };

  // Selección de Paleta Predefinida
  const handleSelectPalette = (palette) => {
    setFormData(prev => ({
      ...prev,
      primaryColor: palette.primaryColor,
      accentColor: palette.accentColor
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleAttemptClose}>
        <div className="modal-container config-modal" onClick={(e) => e.stopPropagation()}>
          
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Configuración del Negocio & Estilo Visual
            </div>
            <button type="button" className="btn-close" onClick={handleAttemptClose} title="Cerrar modal">✕</button>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="config-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Datos de la Empresa
            </button>
            
            <button
              type="button"
              className={`tab-btn ${activeTab === 'banks' ? 'active' : ''}`}
              onClick={() => setActiveTab('banks')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              Cuentas de Pago ({formData.bankAccounts.length})
            </button>

            <button
              type="button"
              className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.38-.43-.6-1-.6-1.58 0-1.38 1.12-2.5 2.5-2.5H18c2.21 0 4-1.79 4-4 0-5.51-4.49-9.92-10-9.92z"></path>
              </svg>
              Colores & Estilo Boleta
            </button>
          </div>

          {/* Modal Body / Tab Contents */}
          <form onSubmit={handleSubmit} className="modal-body config-body">
            
            {/* TAB 1: GENERAL INFO */}
            {activeTab === 'general' && (
              <div className="tab-pane">
                <p className="tab-description">
                  Ingrese la información oficial de su empresa o negocio independiente. Configure los switches opcionales si no cuenta con RUC, correo o página web.
                </p>
                
                <div className="form-grid">
                  <div className="form-group required">
                    <label htmlFor="cfg_name">Nombre de la Empresa / Razón Social *</label>
                    <input
                      type="text"
                      id="cfg_name"
                      name="name"
                      placeholder="Ej. Mi Negocio Comercial S.A.C."
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cfg_shortName">Marca Corta / Siglas</label>
                    <input
                      type="text"
                      id="cfg_shortName"
                      name="shortName"
                      placeholder="Ej. MINEGOCIO"
                      value={formData.shortName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Campo RUC con Checkbox Opcional */}
                  <div className="form-group">
                    <div className="label-with-checkbox">
                      <label htmlFor="cfg_ruc">RUC / Registro Fiscal</label>
                      <label className="checkbox-toggle">
                        <input
                          type="checkbox"
                          name="hasRuc"
                          checked={formData.hasRuc !== false}
                          onChange={handleChange}
                        />
                        <span>¿Tiene RUC?</span>
                      </label>
                    </div>
                    {formData.hasRuc !== false ? (
                      <input
                        type="text"
                        id="cfg_ruc"
                        name="ruc"
                        placeholder="Ej. 20123456789"
                        value={formData.ruc}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="input-disabled-placeholder">No registrado (No se mostrará en el PDF)</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cfg_phone">Teléfono de Contacto</label>
                    <input
                      type="text"
                      id="cfg_phone"
                      name="phone"
                      placeholder="Ej. +51 987 654 321"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Campo Correo con Checkbox Opcional */}
                  <div className="form-group">
                    <div className="label-with-checkbox">
                      <label htmlFor="cfg_email">Correo Electrónico</label>
                      <label className="checkbox-toggle">
                        <input
                          type="checkbox"
                          name="hasEmail"
                          checked={formData.hasEmail !== false}
                          onChange={handleChange}
                        />
                        <span>¿Tiene Correo?</span>
                      </label>
                    </div>
                    {formData.hasEmail !== false ? (
                      <input
                        type="text"
                        id="cfg_email"
                        name="email"
                        placeholder="Ej. ventas@minegocio.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="input-disabled-placeholder">No registrado (No se mostrará en el PDF)</div>
                    )}
                  </div>

                  {/* Campo Sitio Web con Checkbox Opcional */}
                  <div className="form-group">
                    <div className="label-with-checkbox">
                      <label htmlFor="cfg_website">Sitio Web / Red Social</label>
                      <label className="checkbox-toggle">
                        <input
                          type="checkbox"
                          name="hasWebsite"
                          checked={formData.hasWebsite !== false}
                          onChange={handleChange}
                        />
                        <span>¿Tiene Sitio Web?</span>
                      </label>
                    </div>
                    {formData.hasWebsite !== false ? (
                      <input
                        type="text"
                        id="cfg_website"
                        name="website"
                        placeholder="Ej. www.minegocio.com"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="input-disabled-placeholder">No registrado (No se mostrará en el pie de página)</div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width margin-top">
                  <label htmlFor="cfg_slogan">Eslogan o Descripción de Servicios</label>
                  <input
                    type="text"
                    id="cfg_slogan"
                    name="slogan"
                    placeholder="Ej. Soluciones profesionales de ingeniería y diseño a tu medida"
                    value={formData.slogan}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width margin-top">
                  <label htmlFor="cfg_address">Dirección Fiscal / Oficina</label>
                  <input
                    type="text"
                    id="cfg_address"
                    name="address"
                    placeholder="Ej. Av. Los Laureles 321, Oficina 501, Lima"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: BANK ACCOUNTS */}
            {activeTab === 'banks' && (
              <div className="tab-pane">
                <div className="tab-header-action">
                  <div>
                    <p className="tab-description margin-bottom-none">
                      Configure las cuentas bancarias o métodos de pago que aparecerán al pie de la boleta para que sus clientes realicen abonos.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleAddBank}
                  >
                    + Agregar Cuenta
                  </button>
                </div>

                <div className="bank-accounts-list">
                  {formData.bankAccounts.length === 0 ? (
                    <div className="empty-bank-state">
                      No ha registrado cuentas de abono. Haga clic en "+ Agregar Cuenta".
                    </div>
                  ) : (
                    formData.bankAccounts.map((acc, idx) => (
                      <div key={idx} className="bank-account-card">
                        <div className="bank-card-header">
                          <span className="bank-idx">Cuenta #{idx + 1}</span>
                          <button
                            type="button"
                            className="btn-trash-sm"
                            onClick={() => handleRemoveBank(idx)}
                            title="Eliminar cuenta"
                          >
                            ✕ Eliminar
                          </button>
                        </div>

                        <div className="bank-card-grid">
                          <div className="form-group">
                            <label>Banco / Método</label>
                            <input
                              type="text"
                              placeholder="Ej. BCP Soles / Yape"
                              value={acc.bank || ''}
                              onChange={(e) => handleBankChange(idx, 'bank', e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>Número de Cuenta</label>
                            <input
                              type="text"
                              placeholder="Ej. 191-12345678-0-12"
                              value={acc.account || ''}
                              onChange={(e) => handleBankChange(idx, 'account', e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>CCI (Opcional)</label>
                            <input
                              type="text"
                              placeholder="Ej. 002-191-0012345678012-50"
                              value={acc.cci || ''}
                              onChange={(e) => handleBankChange(idx, 'cci', e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>Titular de la Cuenta</label>
                            <input
                              type="text"
                              placeholder="Ej. Juan Pérez / Empresa S.A.C."
                              value={acc.owner || ''}
                              onChange={(e) => handleBankChange(idx, 'owner', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: VISUAL APPEARANCE & COLORS */}
            {activeTab === 'appearance' && (
              <div className="tab-pane">
                <p className="tab-description">
                  Personalice la estética de su boleta en PDF seleccionando una combinación de colores corporativos o personalizándolos libremente.
                </p>

                <h4 className="section-subtitle">Paletas de Colores Recomendadas</h4>
                <div className="palettes-grid">
                  {COLOR_PALETTES.map((pal) => (
                    <div
                      key={pal.id}
                      className={`palette-card ${
                        formData.primaryColor === pal.primaryColor && formData.accentColor === pal.accentColor ? 'selected' : ''
                      }`}
                      onClick={() => handleSelectPalette(pal)}
                    >
                      <div className="palette-preview">
                        <div className="palette-swatch primary" style={{ backgroundColor: pal.primaryColor }}></div>
                        <div className="palette-swatch accent" style={{ backgroundColor: pal.accentColor }}></div>
                      </div>
                      <span className="palette-name">{pal.name}</span>
                    </div>
                  ))}
                </div>

                <h4 className="section-subtitle margin-top">Personalización de Color Libre</h4>
                <div className="color-pickers-grid">
                  <div className="color-picker-box">
                    <label htmlFor="cfg_primaryColor">Color del Banner Principal (Header PDF)</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        id="cfg_primaryColor"
                        name="primaryColor"
                        value={formData.primaryColor || '#0f172a'}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="primaryColor"
                        value={formData.primaryColor || '#0f172a'}
                        onChange={handleChange}
                        className="font-mono text-uppercase"
                      />
                    </div>
                  </div>

                  <div className="color-picker-box">
                    <label htmlFor="cfg_accentColor">Color de Acento (Bordes y Destacados)</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        id="cfg_accentColor"
                        name="accentColor"
                        value={formData.accentColor || '#2563eb'}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="accentColor"
                        value={formData.accentColor || '#2563eb'}
                        onChange={handleChange}
                        className="font-mono text-uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="modal-footer config-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onReset}
                title="Restablecer datos de fábrica"
              >
                Restablecer por Defecto
              </button>

              <div className="footer-right-buttons">
                <button type="button" className="btn btn-secondary" onClick={handleAttemptClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Configuración
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmDiscardOpen}
        title="Cambios no guardados"
        message="Ha realizado cambios en la configuración de la empresa. ¿Está seguro de cerrar y descartar la edición?"
        confirmLabel="Sí, Descartar Cambios"
        cancelLabel="Seguir Editando"
        variant="warning"
        onConfirm={handleConfirmDiscard}
        onCancel={() => setIsConfirmDiscardOpen(false)}
      />
    </>
  );
};
