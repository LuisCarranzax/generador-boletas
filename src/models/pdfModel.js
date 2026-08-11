import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { loadBusinessInfo, hexToRgb } from './businessModel';
import { calculateReceiptTotal } from './receiptModel';

/**
 * Genera el documento PDF de la boleta de venta utilizando la configuración dinámica de la empresa.
 * @param {Object} client Datos del cliente.
 * @param {Array} services Lista de ítems/servicios.
 * @param {Object} businessInfo Configuración de la empresa (opcional).
 * @returns {jsPDF} Instancia del documento jsPDF generado.
 */
export const buildReceiptPDF = (client, services, businessInfo = null) => {
  const info = businessInfo || loadBusinessInfo();
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  const totalAmount = calculateReceiptTotal(services);

  // Conversión dinámica de colores hexadecimales a RGB para jsPDF
  const primaryColor = hexToRgb(info.primaryColor, [15, 23, 42]);
  const accentColor = hexToRgb(info.accentColor, [37, 99, 235]);
  const secondaryColor = [71, 85, 105]; // Slate Muted
  const lightBg = [248, 250, 252];      // Light Gray/Blue

  // Banner Superior - Header Corporativo
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 34, 'F');

  // Franja decorativa de acento
  doc.setFillColor(...accentColor);
  doc.rect(0, 34, 210, 2, 'F');

  // Nombre de la Empresa y Datos de Emisión (con maxWidth para evitar superposición con el recuadro)
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(info.name || 'EMPRESA PRESTADORA DE SERVICIOS', 14, 13, { maxWidth: 120 });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  
  // Construcción limpia de la línea de datos (omite campos desactivados sin imprimir etiquetas en blanco)
  const headerParts = [];
  if (info.hasRuc !== false && info.ruc && info.ruc.trim() !== '') {
    headerParts.push(`RUC: ${info.ruc.trim()}`);
  }
  if (info.phone && info.phone.trim() !== '') {
    headerParts.push(`Tel: ${info.phone.trim()}`);
  }
  if (info.hasEmail !== false && info.email && info.email.trim() !== '') {
    headerParts.push(`Email: ${info.email.trim()}`);
  }

  if (headerParts.length > 0) {
    doc.text(headerParts.join(' | '), 14, 21, { maxWidth: 120 });
  }
  
  if (info.address && info.address.trim() !== '') {
    doc.text(`Dirección: ${info.address.trim()}`, 14, 26, { maxWidth: 120 });
  }

  // Tarjeta flotante del Número de Boleta
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.5);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(138, 6, 58, 22, 2, 2, 'FD');

  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('BOLETA DE VENTA', 167, 12, { align: 'center' });

  doc.setTextColor(...accentColor);
  doc.setFontSize(10);
  doc.text(`N°: ${client.receiptNumber || 'B001-000000'}`, 167, 21, { align: 'center' });

  // Bloque 1: Información del Cliente (Tarjeta limpia con dimensiones adaptadas)
  doc.setFillColor(...lightBg);
  doc.roundedRect(14, 40, 182, 36, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 40, 182, 36, 2, 2, 'D');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...accentColor);
  doc.text('INFORMACIÓN DEL CLIENTE / RECEPTOR', 18, 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...secondaryColor);

  // Fila 1: Cliente y Fecha Emisión
  doc.setFont('helvetica', 'bold');
  doc.text('Cliente / Razón Social:', 18, 53);
  doc.setFont('helvetica', 'normal');
  doc.text(client.name || '---', 55, 53, { maxWidth: 68 });

  doc.setFont('helvetica', 'bold');
  doc.text('Fecha Emisión:', 128, 53);
  doc.setFont('helvetica', 'normal');
  doc.text(client.issueDate || '---', 153, 53);

  // Fila 2: DNI/RUC y Teléfono
  doc.setFont('helvetica', 'bold');
  doc.text('DNI / RUC:', 18, 60);
  doc.setFont('helvetica', 'normal');
  doc.text(client.documentNumber || '---', 38, 60);

  doc.setFont('helvetica', 'bold');
  doc.text('Teléfono:', 128, 60);
  doc.setFont('helvetica', 'normal');
  doc.text(client.phone || '---', 145, 60);

  // Fila 3: Dirección (ancho amplio con ajuste multilínea si es muy larga)
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección:', 18, 67);
  doc.setFont('helvetica', 'normal');
  doc.text(client.address || '---', 36, 67, { maxWidth: 154 });

  // Bloque 2: Tabla de Servicios
  const tableBody = services.map((item, index) => [
    index + 1,
    item.description || 'Sin descripción',
    item.quantity,
    `S/ ${Number(item.unitPrice || 0).toFixed(2)}`,
    `S/ ${(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['Item', 'Descripción del Servicio / Producto', 'Cant.', 'P. Unitario', 'Importe']],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center' },
      1: { cellWidth: 95 },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 28, halign: 'right' }
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 3.5,
      textColor: [30, 41, 59]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    }
  });

  const finalY = doc.lastAutoTable.finalY + 8;

  // Cuadro de Resumen de Totales
  doc.setFillColor(...primaryColor);
  doc.roundedRect(128, finalY, 68, 14, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('TOTAL A PAGAR:', 133, finalY + 9);
  doc.setFontSize(11);
  doc.text(`S/ ${totalAmount.toFixed(2)}`, 191, finalY + 9, { align: 'right' });

  // Sección de Información Bancaria para Depósitos (Compacta y ajustada a los datos)
  const bankAccounts = info.bankAccounts || [];
  if (bankAccounts.length > 0) {
    const bankSectionHeight = 12 + (bankAccounts.length * 6);
    const bankY = finalY + 22;
    
    
    doc.setFillColor(...lightBg);
    doc.roundedRect(14, bankY, 135, bankSectionHeight, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, bankY, 135, bankSectionHeight, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...accentColor);
    doc.text('DEPÓSITOS Y TRANSFERENCIAS BANCARIAS', 18, bankY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...secondaryColor);

    let currentBankY = bankY + 12;
    bankAccounts.forEach((acc) => {
      const cciText = acc.cci && acc.cci.trim() !== '' ? ` | CCI: ${acc.cci.trim()}` : '';
      const ownerText = acc.owner && acc.owner.trim() !== '' ? ` | Titular: ${acc.owner.trim()}` : '';
      doc.text(`• ${acc.bank || 'Banco'}: N° ${acc.account || '---'}${cciText}${ownerText}`, 18, currentBankY);
      currentBankY += 5.5;
    });
  }

  // Pie de Página Institucional
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Gracias por su preferencia.', 105, 284, { align: 'center' });
  
  if (info.hasWebsite !== false && info.website && info.website.trim() !== '') {
    doc.text(`${info.website.trim()}`, 105, 288, { align: 'center' });
  } 

  return doc;
};

/**
 * Descarga el archivo PDF en la computadora del cliente.
 */
export const downloadReceiptPDF = (client, services, businessInfo = null) => {
  const doc = buildReceiptPDF(client, services, businessInfo);
  const safeClientName = (client.name || 'Cliente').replace(/\s+/g, '_');
  const filename = `Boleta_${client.receiptNumber || 'B001'}_${safeClientName}.pdf`;
  doc.save(filename);
};

/**
 * Genera una URL Blob para la vista previa del PDF en un iframe o modal.
 */
export const getReceiptPDFBlobUrl = (client, services, businessInfo = null) => {
  const doc = buildReceiptPDF(client, services, businessInfo);
  return doc.output('bloburl');
};
