export const STORAGE_KEY = 'generador_boletas_business_info';

export const COLOR_PALETTES = [
  {
    id: 'navy',
    name: 'Azul Corporativo (Defecto)',
    primaryColor: '#0f172a',
    accentColor: '#2563eb'
  },
  {
    id: 'emerald',
    name: 'Verde Esmeralda',
    primaryColor: '#064e3b',
    accentColor: '#059669'
  },
  {
    id: 'indigo',
    name: 'Índigo Ejecutivo',
    primaryColor: '#1e1b4b',
    accentColor: '#6366f1'
  },
  {
    id: 'crimson',
    name: 'Carmesí elegante',
    primaryColor: '#881337',
    accentColor: '#e11d48'
  },
  {
    id: 'charcoal',
    name: 'Carbón / Teledifusión',
    primaryColor: '#18181b',
    accentColor: '#0ea5e9'
  }
];

export const DEFAULT_BUSINESS_INFO = {
  name: "Servicios Integrales & Soluciones Tecnológicas S.A.C.",
  shortName: "SISTEC",
  slogan: "Soluciones Tecnológicas & Servicios Profesionales a tu Medida",
  hasRuc: true,
  ruc: "20601234567",
  address: "Av. Principal 456, Oficina 302, San Isidro, Lima",
  phone: "+51 987 654 321",
  hasEmail: true,
  email: "contacto@sistecperu.com",
  hasWebsite: true,
  website: "www.sistecperu.com",
  primaryColor: "#0f172a",
  accentColor: "#2563eb",
  bankAccounts: [
    { bank: "BCP Soles", account: "191-12345678-0-12", cci: "002-191-0012345678012-50", owner: "SISTEC S.A.C." },
    { bank: "BBVA Soles", account: "0011-0123-0100045678", cci: "011-123-000100045678-14", owner: "SISTEC S.A.C." },
    { bank: "Yape / Plin", account: "+51 987 654 321", cci: "", owner: "Titular Representante" }
  ]
};

/**
 * Carga la información de la empresa guardada en localStorage o devuelve el valor por defecto.
 */
export const loadBusinessInfo = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_BUSINESS_INFO,
        ...parsed,
        hasRuc: parsed.hasRuc !== undefined ? parsed.hasRuc : Boolean(parsed.ruc),
        hasEmail: parsed.hasEmail !== undefined ? parsed.hasEmail : Boolean(parsed.email),
        hasWebsite: parsed.hasWebsite !== undefined ? parsed.hasWebsite : Boolean(parsed.website)
      };
    }
  } catch (e) {
    console.error("Error al cargar la configuración de empresa:", e);
  }
  return { ...DEFAULT_BUSINESS_INFO };
};

/**
 * Guarda la configuración de la empresa en localStorage.
 */
export const saveBusinessInfo = (info) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  } catch (e) {
    console.error("Error al guardar la configuración de empresa:", e);
  }
};

/**
 * Elimina la configuración guardada y devuelve el estado por defecto.
 */
export const resetBusinessInfo = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error al restablecer la configuración de empresa:", e);
  }
  return { ...DEFAULT_BUSINESS_INFO };
};

/**
 * Convierte un color hexadecimal (ej: "#0f172a") a un arreglo de valores RGB [r, g, b].
 */
export const hexToRgb = (hex, fallback = [15, 23, 42]) => {
  if (!hex || typeof hex !== 'string') return fallback;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return [r, g, b];
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return [r, g, b];
  }
  return fallback;
};
