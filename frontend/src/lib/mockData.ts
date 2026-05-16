'use client';

// ═══════════════════════════════════════════════════════
// AVALANCHE DATA API — Mock Data + Integration Ready
// Base URL: https://data-api.avax.network
// Auth: x-glacier-api-key header
// Docs: https://build.avax.network/docs/api-reference/data-api
// ═══════════════════════════════════════════════════════

// TODO: Add your AvaCloud Data API Key here
// Get one free at: https://build.avax.network/console/utilities/data-api-keys
// const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY || '';
// const DATA_API_BASE = 'https://data-api.avax.network';

export interface PortfolioMetric {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  sublabel: string;
}

export interface ErcBalance {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  positive: boolean;
}

// ─── MOCK DATA (Realistic for demo) ───

export const MOCK_METRICS: PortfolioMetric[] = [
  { label: 'NAV Total', value: '$4,285,720', change: '+2.4%', changePositive: true, sublabel: 'Net Asset Value' },
  { label: 'AVAX Balance', value: '12,847.32', change: '+5.1%', changePositive: true, sublabel: 'C-Chain Nativo' },
  { label: 'ERC-20 Holdings', value: '$1,942,500', change: '+1.8%', changePositive: true, sublabel: '6 Tokens Activos' },
  { label: 'P&L Estimado', value: '+$342,180', change: '+8.7%', changePositive: true, sublabel: 'YTD Performance' },
];

export const MOCK_BALANCES: ErcBalance[] = [
  { symbol: 'USDC', name: 'USD Coin', balance: '1,250,000.00', value: '$1,250,000', change: '+0.01%', positive: true },
  { symbol: 'WAVAX', name: 'Wrapped AVAX', balance: '8,420.50', value: '$421,025', change: '+5.2%', positive: true },
  { symbol: 'sAVAX', name: 'Staked AVAX', balance: '4,200.00', value: '$214,200', change: '+4.8%', positive: true },
  { symbol: 'AETH', name: 'AetheriusEquity', balance: '500,000', value: '$57,275', change: '+12.3%', positive: true },
];

export interface RWAAsset {
  name: string;
  sector: string;
  valuation: string;
  target: string;
  protocol: string;
  compliance: 'Passed' | 'Pending' | 'Required' | 'Failed';
  status: 'Active' | 'Funded' | 'Review';
  yield: string;
}

export const MOCK_RWA_ASSETS: RWAAsset[] = [
  { name: 'EcoTech LatAm', sector: 'Green Energy & AgriTech', valuation: '$15M', target: '$2.5M', protocol: 'eERC20', compliance: 'Passed', status: 'Active', yield: '18.5%' },
  { name: 'MedChain MX', sector: 'HealthTech & BioData', valuation: '$8.2M', target: '$1.2M', protocol: 'eERC20', compliance: 'Pending', status: 'Review', yield: '14.2%' },
  { name: 'FinBridge LATAM', sector: 'DeFi Infrastructure', valuation: '$22M', target: '$4.0M', protocol: 'eERC20', compliance: 'Passed', status: 'Funded', yield: '21.0%' },
  { name: 'AgroToken BR', sector: 'Commodities RWA', valuation: '$11.5M', target: '$2.0M', protocol: 'eERC20', compliance: 'Required', status: 'Active', yield: '16.8%' },
  { name: 'Solar DAO CL', sector: 'Renewable Energy', valuation: '$6.8M', target: '$900K', protocol: 'eERC20', compliance: 'Passed', status: 'Active', yield: '13.5%' },
];

// ─── DATA API INTEGRATION FUNCTIONS (Ready to wire) ───

/*
 * When you have your API key, uncomment and use these functions
 * to replace the mock data above with real C-Chain data.
 *
 * Example: Fetch ERC-20 balances for a connected wallet address
 *
 * export async function fetchErc20Balances(address: string) {
 *   const res = await fetch(
 *     `${DATA_API_BASE}/v1/chains/43113/addresses/${address}/balances:listErc20`,
 *     { headers: { 'x-glacier-api-key': DATA_API_KEY, 'accept': 'application/json' } }
 *   );
 *   if (!res.ok) throw new Error('Data API Error');
 *   return res.json(); // { erc20TokenBalances: [...] }
 * }
 *
 * export async function fetchNativeBalance(address: string) {
 *   const res = await fetch(
 *     `${DATA_API_BASE}/v1/chains/43113/addresses/${address}/balances:getNative`,
 *     { headers: { 'x-glacier-api-key': DATA_API_KEY, 'accept': 'application/json' } }
 *   );
 *   if (!res.ok) throw new Error('Data API Error');
 *   return res.json(); // { nativeTokenBalance: { ... } }
 * }
 *
 * export async function fetchLatestBlocks() {
 *   const res = await fetch(
 *     `${DATA_API_BASE}/v1/chains/43113/blocks?pageSize=5`,
 *     { headers: { 'x-glacier-api-key': DATA_API_KEY, 'accept': 'application/json' } }
 *   );
 *   if (!res.ok) throw new Error('Data API Error');
 *   return res.json(); // { blocks: [...] }
 * }
 */
