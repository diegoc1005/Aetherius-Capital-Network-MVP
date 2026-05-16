<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP-1E40AF?style=for-the-badge&labelColor=09090B" />
  <img src="https://img.shields.io/badge/Network-Avalanche_Fuji-E84142?style=for-the-badge&logo=avalanche&logoColor=white&labelColor=09090B" />
  <img src="https://img.shields.io/badge/Protocol-eERC20-22C55E?style=for-the-badge&labelColor=09090B" />
  <img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge&labelColor=09090B" />
</p>

# Aetherius Capital Network

**Plataforma institucional de Capital Privado tokenizado sobre Avalanche.** Gestión de portafolio, compliance regulatorio AML/KYC y mercado secundario de Real World Assets (RWA) con protocolo eERC20.

> Conectando startups e inversionistas calificados a través de infraestructura blockchain privada, escalable y regulada.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                     │
│  ┌──────────┐  ┌───────────────────┐  ┌──────────────────────┐  │
│  │ Sidebar  │  │ Portfolio Metrics  │  │  RWA Market Table    │  │
│  │ Nav      │  │ NAV · AVAX · ERC20│  │  Startups · Comply   │  │
│  │ Network  │  │ P&L · Holdings    │  │  Valuación · Yield   │  │
│  └──────────┘  └───────────────────┘  └──────────────────────┘  │
│                 ┌──────────────────────────────────────────┐     │
│                 │  Compliance & Invest (Wavy Node Oracle)  │     │
│                 │  KYC → Compliance → Blockchain Sign      │     │
│                 └────────────────┬─────────────────────────┘     │
└──────────────────────────────────┼───────────────────────────────┘
                                   │ fetch (ngrok tunnel)
┌──────────────────────────────────┼───────────────────────────────┐
│                     BACKEND (Node.js / Express)                  │
│                 ┌────────────────┴─────────────────────┐         │
│                 │  Wavy Node Simulator                 │         │
│                 │  POST /webhook  · GET /users/:id     │         │
│                 │  KYC (RFC, CURP) · AML Risk Alerts   │         │
│                 └──────────────────────────────────────┘         │
└──────────────────────────────────────────────────────────────────┘
                                   │ Ethers.js
┌──────────────────────────────────┼───────────────────────────────┐
│                  AVALANCHE C-CHAIN (Fuji Testnet)                │
│                 ┌────────────────┴─────────────────────┐         │
│                 │  AetheriusEquity.sol (eERC20)        │         │
│                 │  0x066e0221Be84B899b2e256E7A2f42d..  │         │
│                 └──────────────────────────────────────┘         │
│                                                                  │
│                 ┌──────────────────────────────────────┐         │
│                 │  Avalanche Data API (Ready to wire)  │         │
│                 │  ERC-20 Balances · Blocks · Txns     │         │
│                 └──────────────────────────────────────┘         │
└──────────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4 | Dashboard institucional (Dark OLED) |
| **Blockchain** | Ethers.js 6, Solidity, Hardhat | Interacción con smart contracts |
| **Red** | Avalanche C-Chain (Fuji Testnet) | Finalidad instantánea, bajo costo |
| **Privacidad** | eERC20 (Encrypted ERC-20) | Saldos y transferencias cifrados |
| **Compliance** | Node.js, Express, ngrok | Simulador Wavy Node (KYC/AML) |
| **Data** | Avalanche Data API | Balances, transacciones, bloques (ready) |
| **Tipografía** | Inter + Fira Code | Institucional + datos numéricos |

---

## Estructura del Proyecto

```
Aetherius-Capital-Network/
├── backend/
│   ├── server.js              # Simulador Wavy Node (KYC/AML)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Dashboard principal (orquestador)
│   │   │   ├── layout.tsx     # Fonts Inter + Fira Code, SEO
│   │   │   └── globals.css    # Design system institucional
│   │   ├── components/
│   │   │   ├── Sidebar.tsx        # Navegación + estado de red
│   │   │   ├── PortfolioMetrics.tsx # KPIs + tabla ERC-20
│   │   │   ├── RWAMarketTable.tsx  # Mercado secundario startups
│   │   │   └── WalletConnect.tsx   # Conexión Core/MetaMask
│   │   ├── lib/
│   │   │   └── mockData.ts   # Datos mock + funciones Data API
│   │   └── AetheriusEquity.json   # ABI del contrato
│   ├── .env.local             # Variables de entorno
│   └── package.json
├── .agent/skills/
│   ├── avalanche_eerc20/      # Smart contract + deploy scripts
│   └── ui-ux-pro-max/         # Design system intelligence
└── README.md
```

---

## Cómo Empezar

### Requisitos Previos

- **Node.js** v18+
- **Core Wallet** o **MetaMask** (configurada en Avalanche Fuji Testnet)
- **AVAX de testnet** — Obtener en [Avalanche Faucet](https://faucet.avax.network/)

### 1. Iniciar el Backend (Wavy Node Simulator)

```bash
cd backend
npm install
npm start
# → Servidor en http://localhost:3000
```

### 2. Exponer con ngrok

```bash
npx ngrok http 3000
# Copia la URL HTTPS generada (ej: https://xyz.ngrok-free.dev)
```

### 3. Configurar y Ejecutar el Frontend

```bash
cd frontend
npm install
```

Crea/edita `frontend/.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x066e0221Be84B899b2e256E7A2f42d629a051bc6
NEXT_PUBLIC_BACKEND_URL=<TU_URL_DE_NGROK>
```

```bash
npm run dev
# → Dashboard en http://localhost:3001
```

---

## Dashboard Institucional

El frontend implementa un diseño de grado institucional inspirado en **BlackRock Aladdin** y **Bloomberg Terminal**:

### Panel Lateral (Sidebar)
- Navegación: Dashboard, Portafolio, Mercado RWA, Compliance, Configuración
- Indicador de red en vivo (Avalanche Fuji C-Chain)
- Chain ID y estado de conexión

### Métricas de Portafolio
- **NAV Total** — Net Asset Value del fondo
- **AVAX Balance** — Balance nativo en C-Chain
- **ERC-20 Holdings** — Tabla con USDC, WAVAX, sAVAX, AETH
- **P&L Estimado** — Performance year-to-date

> Los datos son simulados (mock). Las funciones para la **Avalanche Data API** están documentadas y listas en `frontend/src/lib/mockData.ts`. Solo agrega `NEXT_PUBLIC_DATA_API_KEY` para activar datos reales.

### Mercado Secundario RWA
Tabla de alta densidad con startups tokenizadas:

| Asset | Sector | Valuación | Target | Protocolo | Compliance |
|-------|--------|-----------|--------|-----------|------------|
| EcoTech LatAm | Green Energy | $15M | $2.5M | eERC20 | Aprobado |
| MedChain MX | HealthTech | $8.2M | $1.2M | eERC20 | Pendiente |
| FinBridge LATAM | DeFi Infra | $22M | $4.0M | eERC20 | Aprobado |
| AgroToken BR | Commodities | $11.5M | $2.0M | eERC20 | Requerido |
| Solar DAO CL | Renewable | $6.8M | $900K | eERC20 | Aprobado |

### Flujo de Compliance e Inversión

El botón **"Verificar Compliance e Invertir"** ejecuta un proceso de 3 fases con spinner institucional:

1. **Consultando Oráculo Wavy Node** → `fetch()` al backend vía ngrok
2. **Verificando KYC Regulatorio** → Validación de datos (RFC, CURP)
3. **Firmando en Blockchain Avalanche** → Ethers.js + contrato AetheriusEquity

---

## Avalanche Data API (Integración Preparada)

La plataforma está lista para consumir la [Data API de Avalanche](https://build.avax.network/docs/api-reference/data-api):

```
Base URL: https://data-api.avax.network
Auth:     x-glacier-api-key: <API_KEY>
```

| Endpoint | Uso |
|----------|-----|
| `GET /v1/chains/43113/addresses/{addr}/balances` | Balances ERC-20 |
| `GET /v1/chains/43113/blocks` | Últimos bloques C-Chain |
| `GET /v1/chains/{id}/addresses/{addr}` | Metadata de contrato |

Obtén tu API Key gratis en [Builder Hub Console](https://build.avax.network/console/utilities/data-api-keys).

---

## Smart Contract

**AetheriusEquity** — Token de Capital Privado fraccional con privacidad eERC20.

| Propiedad | Valor |
|-----------|-------|
| **Red** | Avalanche Fuji Testnet (C-Chain) |
| **Dirección** | `0x066e0221Be84B899b2e256E7A2f42d629a051bc6` |
| **Estándar** | eERC20 (Encrypted ERC-20, Standalone Mode) |
| **Explorer** | [Ver en Snowtrace](https://testnet.snowtrace.io/address/0x066e0221Be84B899b2e256E7A2f42d629a051bc6) |

---

## Design System

| Token | Valor |
|-------|-------|
| Background | `#09090B` (Negro OLED) |
| Surface | `#111113` |
| Primary | `#1E40AF` (Azul institucional) |
| Accent | `#F59E0B` (Ámbar) |
| Success | `#22C55E` |
| Font Display | Inter |
| Font Data | Fira Code (tabular-nums) |

---

## Licencia

MIT — Aetherius Capital Network © 2026
