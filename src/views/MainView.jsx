import React from 'react';
import { useReceiptController } from '../controllers/useReceiptController';
import { NavbarView } from './components/NavbarView';
import { HeaderView } from './components/HeaderView';
import { ClientFormView } from './components/ClientFormView';
import { ServicesTableView } from './components/ServicesTableView';
import { ReceiptSummaryView } from './components/ReceiptSummaryView';
import { PDFPreviewModal } from './components/PDFPreviewModal';
import { BusinessConfigModal } from './components/BusinessConfigModal';

export const MainView = () => {
  const {
    client,
    services,
    businessInfo,
    isConfigOpen,
    totalAmount,
    validation,
    isPreviewOpen,
    previewUrl,
    notification,
    handleClientChange,
    handleServiceChange,
    addServiceRow,
    removeServiceRow,
    handleOpenConfig,
    handleCloseConfig,
    handleSaveBusinessInfo,
    handleResetBusinessInfo,
    handleDownloadPDF,
    handleOpenPreview,
    handleClosePreview,
    handleResetForm,
    clearNotification
  } = useReceiptController();

  return (
    <div className="app-shell">
      <NavbarView
        businessInfo={businessInfo}
        onReset={handleResetForm}
        onOpenConfig={handleOpenConfig}
      />

      <div className="container main-content-wrapper">
        {notification && (
          <div className={`toast-notification ${notification.type}`}>
            <span>{notification.message}</span>
            <button type="button" onClick={clearNotification} className="toast-close">✕</button>
          </div>
        )}

        <HeaderView
          businessInfo={businessInfo}
          receiptNumber={client.receiptNumber}
          itemCount={services.length}
          totalAmount={totalAmount}
        />

        <main className="dashboard-grid">
          <ClientFormView
            client={client}
            onChange={handleClientChange}
          />

          <ServicesTableView
            services={services}
            onServiceChange={handleServiceChange}
            onAddRow={addServiceRow}
            onRemoveRow={removeServiceRow}
          />

          <ReceiptSummaryView
            businessInfo={businessInfo}
            totalAmount={totalAmount}
            validation={validation}
            onDownloadPDF={handleDownloadPDF}
            onOpenPreview={handleOpenPreview}
          />
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} {businessInfo?.shortName || businessInfo?.name} - Sistema de Gestión de Comprobantes. Todos los derechos reservados.</p>
        </footer>
      </div>

      <PDFPreviewModal
        isOpen={isPreviewOpen}
        previewUrl={previewUrl}
        onClose={handleClosePreview}
        onDownload={handleDownloadPDF}
      />

      <BusinessConfigModal
        isOpen={isConfigOpen}
        businessInfo={businessInfo}
        onClose={handleCloseConfig}
        onSave={handleSaveBusinessInfo}
        onReset={handleResetBusinessInfo}
      />
    </div>
  );
};
