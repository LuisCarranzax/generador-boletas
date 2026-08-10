@echo off
title SISTEC - Generador de Boletas de Venta
color 0A

echo ===================================================
echo   SISTEC - Generador Corporativo de Boletas PDF
echo ===================================================
echo.

where bun >nul 2>nul
if %errorlevel% equ 0 (
    set PKG_MGR=bun
    set DEV_CMD=bun dev
) else (
    set PKG_MGR=npm
    set DEV_CMD=npm run dev
)

if not exist "node_modules" (
    echo [INFO] Detectando primer inicio. Instalando dependencias usando %PKG_MGR%...
    if "%PKG_MGR%"=="bun" (
        call bun install
    ) else (
        call npm install
    )
    echo [OK] Dependencias instaladas correctamente.
    echo.
)

echo [INFO] Iniciando servidor local con %PKG_MGR%...
echo [INFO] Si desea detener la ejecucion, presione Ctrl + C
echo ===================================================
echo.

start http://localhost:5173

if "%PKG_MGR%"=="bun" (
    bun dev
) else (
    npm run dev
)

pause