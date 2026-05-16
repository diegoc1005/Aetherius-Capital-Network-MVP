// ═══════════════════════════════════════════════════════════════
// AVALANCHE DATA API (Glacier) — Real Integration Layer
// Docs: https://build.avax.network/docs/api-reference/data-api
// Endpoints verified via AvalancheMCP docs_search
// ═══════════════════════════════════════════════════════════════

const GLACIER_BASE = 'https://glacier-api.avax.network';
const FUJI_CHAIN_ID = '43113';

// ─── Response Types ───

export interface NativeBalanceResponse {
  nativeTokenBalance: {
    chainId: string;
    name: string;
    symbol: string;
    decimals: number;
    price: {
      currencyCode: string;
      value: number;
    } | null;
    balance: string; // raw wei
    balanceValue: {
      currencyCode: string;
      value: number;
    } | null;
  };
}

export interface Erc20TokenBalance {
  ercType: string;
  chainId: string;
  address: string; // contract address
  name: string;
  symbol: string;
  decimals: number;
  price: {
    currencyCode: string;
    value: number;
  } | null;
  balance: string; // raw units
  balanceValue: {
    currencyCode: string;
    value: number;
  } | null;
  logoUri?: string;
}

export interface Erc20BalancesResponse {
  erc20TokenBalances: Erc20TokenBalance[];
}

// ─── Formatted types for UI ───

export interface FormattedNativeBalance {
  symbol: string;
  balance: string;      // human-readable
  balanceRaw: string;   // wei
  valueUsd: number;
  priceUsd: number;
}

export interface FormattedErc20Balance {
  symbol: string;
  name: string;
  contractAddress: string;
  balance: string;      // human-readable
  valueUsd: number;
  logoUri?: string;
}

// ─── API Functions ───

/**
 * Fetch native AVAX balance for a wallet on Fuji Testnet.
 * Endpoint: GET /v1/chains/{chainId}/addresses/{address}/balances:getNative
 */
export async function fetchNativeBalance(
  address: string,
  chainId: string = FUJI_CHAIN_ID
): Promise<FormattedNativeBalance> {
  const url = `${GLACIER_BASE}/v1/chains/${chainId}/addresses/${address}/balances:getNative`;

  const res = await fetch(url, {
    headers: { 'accept': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Data API Error (native balance): ${res.status} ${res.statusText}`);
  }

  const data: NativeBalanceResponse = await res.json();
  const { nativeTokenBalance: nb } = data;

  // Convert from wei (18 decimals) to AVAX
  const balanceHuman = (Number(nb.balance) / Math.pow(10, nb.decimals)).toFixed(4);

  return {
    symbol: nb.symbol || 'AVAX',
    balance: balanceHuman,
    balanceRaw: nb.balance,
    valueUsd: nb.balanceValue?.value ?? 0,
    priceUsd: nb.price?.value ?? 0,
  };
}

/**
 * Fetch all ERC-20 token balances for a wallet on Fuji Testnet.
 * Endpoint: GET /v1/chains/{chainId}/addresses/{address}/balances:listErc20
 */
export async function fetchErc20Balances(
  address: string,
  chainId: string = FUJI_CHAIN_ID
): Promise<FormattedErc20Balance[]> {
  const url = `${GLACIER_BASE}/v1/chains/${chainId}/addresses/${address}/balances:listErc20`;

  const res = await fetch(url, {
    headers: { 'accept': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Data API Error (ERC-20 balances): ${res.status} ${res.statusText}`);
  }

  const data: Erc20BalancesResponse = await res.json();

  return data.erc20TokenBalances.map((token) => {
    const balanceHuman = (Number(token.balance) / Math.pow(10, token.decimals)).toFixed(
      token.decimals <= 6 ? 2 : 4
    );

    return {
      symbol: token.symbol || 'UNKNOWN',
      name: token.name || 'Unknown Token',
      contractAddress: token.address,
      balance: balanceHuman,
      valueUsd: token.balanceValue?.value ?? 0,
      logoUri: token.logoUri,
    };
  });
}

/**
 * Convenience: Fetch all portfolio data in one call.
 * Returns native + ERC-20 balances, with graceful error handling.
 */
export async function fetchPortfolioData(address: string) {
  const [native, erc20] = await Promise.allSettled([
    fetchNativeBalance(address),
    fetchErc20Balances(address),
  ]);

  return {
    nativeBalance: native.status === 'fulfilled' ? native.value : null,
    erc20Balances: erc20.status === 'fulfilled' ? erc20.value : [],
    errors: {
      native: native.status === 'rejected' ? (native.reason as Error).message : null,
      erc20: erc20.status === 'rejected' ? (erc20.reason as Error).message : null,
    },
  };
}
