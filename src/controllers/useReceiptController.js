import { useState, useMemo } from 'react';
import {
  createInitialClientState,
  createInitialServiceItem,
  calculateReceiptTotal,
  validateReceiptData
} from '../models/receiptModel';
import {
  downloadReceiptPDF,
  getReceiptPDFBlobUrl
} from '../models/pdfModel';

export const useReceiptController = () => {
  const [client, setClient] = useState(createInitialClientState);
  const [services, setServices] = useState([createInitialServiceItem()]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notification, setNotification] = useState(null);

  // Manejo de datos del cliente
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de servicios
  const handleServiceChange = (id, field, value) => {
    setServices(prev => prev.map(item => {
      if (item.id === id) {
        let parsedValue = value;
        if (field === 'quantity' || field === 'unitPrice') {
          parsedValue = value === '' ? '' : Math.max(0, Number(value));
        }
        return { ...item, [field]: parsedValue };
      }
      return item;
    }));
  };

  const addServiceRow = () => {
    setServices(prev => [...prev, createInitialServiceItem(Date.now())]);
  };

  const removeServiceRow = (id) => {
    if (services.length <= 1) return;
    setServices(prev => prev.filter(item => item.id !== id));
  };

  // Totales y validaciones computadas
  const totalAmount = useMemo(() => {
    return calculateReceiptTotal(services);
  }, [services]);

  const validation = useMemo(() => {
    return validateReceiptData(client, services);
  }, [client, services]);

  // Acciones de PDF
  const handleDownloadPDF = () => {
    if (!validation.isValid) {
      setNotification({
        type: 'error',
        message: validation.errors[0] || 'Complete los campos obligatorios antes de exportar.'
      });
      return;
    }
    try {
      downloadReceiptPDF(client, services);
      setNotification({
        type: 'success',
        message: `Boleta ${client.receiptNumber} exportada exitosamente a PDF.`
      });
    } catch (err) {
      console.error("Error al exportar PDF:", err);
      setNotification({
        type: 'error',
        message: 'Ocurrió un error al generar la boleta.'
      });
    }
  };

  const handleOpenPreview = () => {
    if (!validation.isValid) {
      setNotification({
        type: 'error',
        message: validation.errors[0] || 'Complete los datos obligatorios para previsualizar.'
      });
      return;
    }
    try {
      const url = getReceiptPDFBlobUrl(client, services);
      setPreviewUrl(url);
      setIsPreviewOpen(true);
    } catch (err) {
      console.error("Error al generar vista previa:", err);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleResetForm = () => {
    setClient(createInitialClientState());
    setServices([createInitialServiceItem()]);
    setNotification({
      type: 'info',
      message: 'Formulario reiniciado para una nueva boleta.'
    });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
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
  };
};
