# Generador Corporativo de Boletas de Venta (PDF)

Sistema web moderno, liviano y profesional diseñado para la emisión, gestión y exportación rápida de **Boletas de Venta de Servicios** en formato PDF. Desarrollado en **React 19 + Vite** con arquitectura **MVC (Modelo-Vista-Controlador)**.

---

## 🎯 Finalidad del Proyecto

La finalidad de esta aplicación es ofrecer a profesionales independientes, pequeñas empresas y emprendedores un sistema libre de base de datos para generar comprobantes de venta formales y pulidos de manera inmediata. 

Cualquier persona puede clonar el proyecto, personalizar los datos corporativos de su empresa (RUC, logo/nombre, cuentas bancarias para transferencias y colores institucionales) y comenzar a emitir boletas sin depender de servidores ni configuraciones complejas.

---

## ✨ Características Principales

- **Registro de Cliente / Receptor**: Formulario dinámico con validación de campos obligatorios (*Nombre/Razón Social, DNI/RUC, Dirección, Teléfono, Fecha de Emisión y Serie/Número de Boleta*).
- **Servicios e Ítems Dinámicos**: Permite agregar y eliminar renglones de servicios según las necesidades de cada venta, realizando el cálculo automático de sub-totales y total general en tiempo real.
- **Panel de Configuración de Empresa**: Accesible desde la barra superior de la aplicación para editar:
  - Nombre o Razón Social de la Empresa
  - Marca corta o siglas
  - RUC o Registro Fiscal
  - Eslogan / Descripción de actividades
  - Teléfono, Email, Sitio Web y Dirección Fiscal
  - Lista dinámica de cuentas bancarias y métodos de pago (BCP, BBVA, Yape/Plin, Interbank, etc.)
- **Personalización Visual de la Boleta**:
  - Paletas de colores corporativas predefinidas (*Azul Corporativo, Verde Esmeralda, Índigo Ejecutivo, Carmesí Elegante, Carbón*).
  - Selectores de color hexadecimal libre para personalizar la cabecera del documento PDF y los acentos visuales.
- **Previsualización Interactiva del PDF**: Permite inspeccionar el documento PDF final dentro de un modal en tiempo real antes de descargarlo.
- **Exportación a PDF Profesional**: Generación de PDF nítido mediante `jsPDF` y `jspdf-autotable`, con márgenes auto-ajustables y formato contable limpio.
- **Persistencia Local**: Guardado automático de la configuración en `localStorage` (sin necesidad de base de datos o backend).
- **Ejecución Directa en 1 Clic**: Incluye el archivo ejecutable `Ejecutar.bat` para iniciar el entorno en clase o demostraciones sin abrir la consola manualmente.

---

## 🏗️ Arquitectura del Proyecto (MVC)

El código fuente en la carpeta `src/` sigue estrictamente el patrón **Modelo-Vista-Controlador**:

```
generador-boletas/
├── Ejecutar.bat                # Script de inicio rápido en 1 clic
├── README.md                   # Documentación oficial del proyecto
├── package.json
├── vite.config.js
└── src/
    ├── models/                 # MODELOS (Lógica de negocio y persistencia)
    │   ├── businessModel.js    # Carga/guardado en localStorage, paletas y RGB
    │   ├── receiptModel.js     # Definición de estructuras y cálculos contables
    │   └── pdfModel.js         # Generador de documentos PDF con jsPDF
    ├── controllers/            # CONTROLADORES
    │   └── useReceiptController.js # Custom Hook controlador de estado y eventos
    ├── views/                  # VISTAS (Componentes UI)
    │   ├── components/
    │   │   ├── NavbarView.jsx         # Barra superior con branding y botón de configuración
    │   │   ├── HeaderView.jsx         # Resumen de métricas e identidad de la empresa
    │   │   ├── ClientFormView.jsx     # Formulario de datos del cliente
    │   │   ├── ServicesTableView.jsx  # Tabla dinámica de servicios prestados
    │   │   ├── ReceiptSummaryView.jsx # Resumen de totales y métodos de abono
    │   │   ├── PDFPreviewModal.jsx    # Modal de previsualización en vivo del PDF
    │   │   └── BusinessConfigModal.jsx# Panel modal de configuración del negocio
    │   └── MainView.jsx               # Vista orquestadora principal
    ├── App.jsx
    ├── index.css               # Sistema de diseño CSS corporativo
    └── main.jsx
```

---

## 💻 Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de contar con alguno de los siguientes entornos instalados en su sistema:

- **Node.js** (v18.0.0 o superior) y **npm**
- Ó **Bun** (opcional, para ejecución ultra rápida)

---

## 🚀 Guía de Instalación y Ejecución

### Opción A: Ejecución Directa en 1 Clic (Recomendado para clases/demo)

1. Clone el repositorio en su computadora:
   ```bash
   git clone https://github.com/LuisCarranzax/generador-boletas.git
   cd generador-boletas
   ```
2. Haga **doble clic** en el archivo **`Ejecutar.bat`**.
3. El script detectará si es la primera ejecución para instalar las dependencias automáticamente, iniciará el servidor de desarrollo y abrirá la aplicación en su navegador web predeterminado en `http://localhost:5173`.

---

### Opción B: Ejecución por Consola / Terminal

1. Abra su consola en la carpeta del proyecto y ejecute:
   ```bash
   # Con npm
   npm install
   npm run dev

   # O con Bun
   bun install
   bun dev
   ```
2. Ingrese a la dirección indicada en la consola (normalmente `http://localhost:5173`).

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos y de libre adopción para emprendedores y desarrolladores. Siéntase libre de utilizarlo, modificarlo y adaptarlo a su propio negocio.
