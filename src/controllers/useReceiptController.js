import { useState, useMemo } from 'react';
import {
  createInitialClientState,
  createInitialServiceItem,
  calculateReceiptTotal,
  validateReceiptData
} from '../models/receiptModel';
import {
  loadBusinessInfo,
  saveBusinessInfo,
  resetBusinessInfo
} from '../models/businessModel';
import {
  downloadReceiptPDF,
  getReceiptPDFBlobUrl
} from '../models/pdfModel';

export const useReceiptController = () => {
  const [client, setClient] = useState(createInitialClientState);
  const [services, setServices] = useState([createInitialServiceItem()]);
  const [businessInfo, setBusinessInfo] = useState(loadBusinessInfo);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notification, setNotification] = useState(null);

  // Manejo de datos del cliente
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de servicios prestados
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

  // Gestión de Configuración de Empresa
  const handleOpenConfig = () => setIsConfigOpen(true);
  const handleCloseConfig = () => setIsConfigOpen(false);

  const handleSaveBusinessInfo = (updatedInfo) => {
    saveBusinessInfo(updatedInfo);
    setBusinessInfo(updatedInfo);
    setIsConfigOpen(false);
    setNotification({
      type: 'success',
      message: 'Configuración de empresa y apariencia visual guardadas correctamente.'
    });
  };

  const handleResetBusinessInfo = () => {
    const resetData = resetBusinessInfo();
    setBusinessInfo(resetData);
    setIsConfigOpen(false);
    setNotification({
      type: 'info',
      message: 'Configuración de empresa restablecida a los valores por defecto.'
    });
  };

  // Totales y validaciones computadas
  const totalAmount = useMemo(() => {
    return calculateReceiptTotal(services);
  }, [services]);

  const validation = useMemo(() => {
    return validateReceiptData(client, services);
  }, [client, services]);

  // Acciones de PDF con la configuración dinámica de la empresa
  const handleDownloadPDF = () => {
    if (!validation.isValid) {
      setNotification({
        type: 'error',
        message: validation.errors[0] || 'Complete los campos obligatorios antes de exportar.'
      });
      return;
    }
    try {
      downloadReceiptPDF(client, services, businessInfo);
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
      const url = getReceiptPDFBlobUrl(client, services, businessInfo);
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

  // Manejo de reinicio del formulario con diálogo de confirmación
  const handlePromptResetForm = () => {
    const hasData = client.name || client.documentNumber || client.address || client.phone || 
      services.some(s => s.description || s.unitPrice > 0);
    
    if (hasData) {
      setIsConfirmResetOpen(true);
    } else {
      handleConfirmResetForm();
    }
  };

  const handleConfirmResetForm = () => {
    setClient(createInitialClientState());
    setServices([createInitialServiceItem()]);
    setIsConfirmResetOpen(false);
    setNotification({
      type: 'info',
      message: 'Formulario de cliente reiniciado para una nueva boleta.'
    });
  };

  const handleCancelResetForm = () => {
    setIsConfirmResetOpen(false);
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
    client,
    services,
    businessInfo,
    isConfigOpen,
    isConfirmResetOpen,
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
    handlePromptResetForm,
    handleConfirmResetForm,
    handleCancelResetForm,
    clearNotification
  };
};
