# Aetherius Capital Network

![Aetherius Capital Network](https://img.shields.io/badge/Status-MVP-blue) ![Avalanche](https://img.shields.io/badge/Network-Avalanche_Fuji-red)

**Aetherius Capital Network** es una plataforma institucional de grado empresarial diseñada para la **tokenización de Activos del Mundo Real (RWA)**, con un enfoque especializado en **Capital Privado (Private Equity)**.

Nuestra misión es proveer liquidez y eficiencia al ecosistema de capital privado, conectando startups y empresas con inversionistas calificados a través de una infraestructura blockchain robusta, privada y completamente regulada.

## 🏛 Arquitectura y Tecnología

Aetherius está construido sobre tecnologías Web3 de vanguardia para asegurar escalabilidad, privacidad y cumplimiento regulatorio inquebrantable:

- **Red Principal:** Avalanche C-Chain y L1s (Subnets) garantizando finalidad casi instantánea, seguridad institucional y bajas comisiones.
- **Privacidad Transaccional:** Implementación pionera del estándar **eERC20 en Modo Standalone**. Esto permite mantener los saldos y transferencias cifrados de extremo a extremo, protegiendo la información sensible de los inversionistas corporativos y ocultándola de la blockchain pública mientras se preserva la verificabilidad criptográfica.
- **Cumplimiento y Regulación (Wavy Node):** Integración de un backend especializado que actúa como puente y simula un oráculo de **Wavy Node**. Este componente se encarga de procesar verificaciones de identidad y emitir alertas **AML/KYC en tiempo real**, asegurando que el flujo de inversión cumpla estrictamente con la legislación local aplicable (incluyendo validaciones de RFC y CURP).

## 🚀 Cómo Empezar (Ejecución Local)

Para correr el MVP de Aetherius Capital Network en tu entorno local, debes levantar el Backend simulador de KYC, exponerlo y luego correr el Dashboard Frontend.

### 1. Iniciar el Backend (Wavy Node Simulator)

El backend simula la respuesta en tiempo real de KYC y Compliance.

1. Abre una terminal y navega a la carpeta `/backend`:
   ```bash
   cd backend
   npm install
   npm start
   ```
   *(Esto levantará el servidor en `http://localhost:3000`)*

### 2. Exponer el Backend con ngrok

Para que el frontend pueda consumir los endpoints de forma remota o local salvando configuraciones, utilizamos un túnel seguro.

1. Abre **otra terminal** y ejecuta:
   ```bash
   npx ngrok http 3000
   ```
2. Copia la URL pública HTTPS que te genera ngrok (ej. `https://random-words.ngrok-free.dev`).

### 3. Configurar y Ejecutar el Frontend

El frontend es un Dashboard Institucional en Next.js.

1. En una nueva terminal, ve a la carpeta `/frontend`:
   ```bash
   cd frontend
   npm install
   ```
2. Crea o edita el archivo `.env.local` en esa carpeta y asegúrate de configurar tus variables, pegando la URL de ngrok:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x066e0221Be84B899b2e256E7A2f42d629a051bc6
   NEXT_PUBLIC_BACKEND_URL=AQUI_TU_URL_DE_NGROK
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Ingresa a la URL que Next.js asigne (probablemente `http://localhost:3001` si el backend ya ocupa el 3000). 

¡Listo! Desde el Dashboard podrás conectar tu Core Wallet o MetaMask (configurada en Avalanche Fuji) y probar el flujo de validación institucional e inversión simulada.
