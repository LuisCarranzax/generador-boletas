/**
 * Estructuras de datos iniciales y funciones contables puras para el recibo/boleta.
 */

export const generateReceiptNumber = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `B001-${randomNum}`;
};

export const createInitialClientState = () => ({
  name: '',
  documentNumber: '',
  address: '',
  phone: '',
  email: '',
  issueDate: new Date().toISOString().split('T')[0],
  receiptNumber: generateReceiptNumber()
});

export const createInitialServiceItem = (id = Date.now()) => ({
  id,
  description: '',
  quantity: 1,
  unitPrice: 0
});

export const calculateItemSubtotal = (quantity, unitPrice) => {
  const qty = Number(quantity) || 0;
  const price = Number(unitPrice) || 0;
  return qty * price;
};

export const calculateReceiptTotal = (services = []) => {
  return services.reduce((acc, item) => {
    return acc + calculateItemSubtotal(item.quantity, item.unitPrice);
  }, 0);
};

export const validateReceiptData = (client, services) => {
  const errors = [];
  if (!client.name.trim()) errors.push("El Nombre o Razón Social del cliente es obligatorio.");
  if (!client.documentNumber.trim()) errors.push("El DNI o RUC del cliente es obligatorio.");
  if (!services || services.length === 0) errors.push("Debe incluir al menos un servicio prestado.");
  
  const hasValidService = services.some(s => s.description.trim() !== '' && s.unitPrice > 0);
  if (!hasValidService) errors.push("Debe ingresar la descripción y un precio válido para al menos un servicio.");

  return {
    isValid: errors.length === 0,
    errors
  };
};
