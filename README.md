# Generador Corporativo de Boletas de Venta (PDF)

## Sistema web moderno, liviano y profesional diseñado para la emisión, gestión y exportación rápida de **Boletas de Venta de Servicios** en formato PDF.

## 🎯 Finalidad del Proyecto

La finalidad de esta aplicación es ofrecer un sistema libre de base de datos para generar comprobantes de venta de manera inmediata.

Cualquier persona puede clonar el proyecto, personalizar los datos corporativos de su empresa (RUC, logo/nombre, cuentas bancarias para transferencias y colores institucionales) y comenzar a emitir boletas sin depender de servidores ni configuraciones complejas.

---

## ✨ Características Principales

- **Registro de Cliente / Receptor**: Formulario dinámico con validación de campos obligatorios (_Nombre/Razón Social, DNI/RUC, Dirección, Teléfono, Fecha de Emisión y Serie/Número de Boleta_).
- **Servicios e Ítems Dinámicos**: Permite agregar y eliminar renglones de servicios según las necesidades de cada venta, realizando el cálculo automático de sub-totales y total general en tiempo real.
- **Panel de Configuración de Empresa**: Accesible desde la barra superior de la aplicación para editar:
  - Nombre o Razón Social de la Empresa
  - Marca corta o siglas
  - RUC o Registro Fiscal
  - Eslogan / Descripción de actividades
  - Teléfono, Email, Sitio Web y Dirección Fiscal
  - Lista dinámica de cuentas bancarias y métodos de pago (BCP, BBVA, Yape/Plin, Interbank, etc.)
- **Personalización Visual de la Boleta**:
  - Paletas de colores corporativas predefinidas (_Azul Corporativo, Verde Esmeralda, Índigo Ejecutivo, Carmesí Elegante, Carbón_).
  - Selectores de color hexadecimal libre para personalizar la cabecera del documento PDF y los acentos visuales.
- **Previsualización Interactiva del PDF**: Permite inspeccionar el documento PDF final dentro de un modal en tiempo real antes de descargarlo.
- **Exportación a PDF Profesional**: Generación de PDF nítido mediante `jsPDF` y `jspdf-autotable`, con márgenes auto-ajustables y formato contable limpio.
- **Persistencia Local**: Guardado automático de la configuración en `localStorage` (sin necesidad de base de datos o backend).
- **Ejecución Directa en 1 Clic**: Incluye el archivo ejecutable `Ejecutar.bat` para iniciar el entorno en clase o demostraciones sin abrir la consola manualmente.

---

## 💻 Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de contar con alguno de los siguientes entornos instalados en su sistema:

- **Node.js** (v18.0.0 o superior) y **npm**
- Ó **Bun** (opcional, para ejecución ultra rápida)

---

## Ejecución

### Ejecución Directa en 1 Clic

1. Clone el repositorio en su computadora:
   ```bash
   git clone https://github.com/LuisCarranzax/generador-boletas.git
   cd generador-boletas
   ```
2. Haga **doble clic** en el archivo **`Ejecutar.bat`**.
3. El script detectará si es la primera ejecución para instalar las dependencias automáticamente, iniciará el servidor de desarrollo y abrirá la aplicación en su navegador web predeterminado en `http://localhost:5173`.

---

### Ejecución por Consola / Terminal

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
