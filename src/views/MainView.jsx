import React from 'react';
import { useReceiptController } from '../controllers/useReceiptController';
import { NavbarView } from './components/NavbarView';
import { HeaderView } from './components/HeaderView';
import { ClientFormView } from './components/ClientFormView';
import { ServicesTableView } from './components/ServicesTableView';
import { ReceiptSummaryView } from './components/ReceiptSummaryView';
import { PDFPreviewModal } from './components/PDFPreviewModal';

export const MainView = () => {
  const {
    client,
    services,
    totalAmount,
    validation,
    isPreviewOpen,
    previewUrl,
    notification,
    handleClientChange,
    handleServiceChange,
    addServiceRow,
    removeServiceRow,
    handleDownloadPDF,
    handleOpenPreview,
    handleClosePreview,
    handleResetForm,
    clearNotification
  } = useReceiptController();

  return (
    <div className="app-shell">
      <NavbarView onReset={handleResetForm} />

      <div className="container main-content-wrapper">
        {notification && (
          <div className={`toast-notification ${notification.type}`}>
            <span>{notification.message}</span>
            <button type="button" onClick={clearNotification} className="toast-close">✕</button>
          </div>
        )}

        <HeaderView
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
            totalAmount={totalAmount}
            validation={validation}
            onDownloadPDF={handleDownloadPDF}
            onOpenPreview={handleOpenPreview}
          />
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} SISTEC - Sistema de Gestión de Comprobantes de Venta. Todos los derechos reservados.</p>
        </footer>
      </div>

      <PDFPreviewModal
        isOpen={isPreviewOpen}
        previewUrl={previewUrl}
        onClose={handleClosePreview}
        onDownload={handleDownloadPDF}
      />
    </div>
  );
};
