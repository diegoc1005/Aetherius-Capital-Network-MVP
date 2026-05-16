'use client';

import { useState, useEffect } from 'react';
import { MOCK_METRICS, MOCK_BALANCES } from '@/lib/mockData';
import { fetchPortfolioData } from '@/lib/avalancheApi';
import type { FormattedNativeBalance, FormattedErc20Balance } from '@/lib/avalancheApi';
import type { PortfolioMetric, ErcBalance } from '@/lib/mockData';

interface PortfolioMetricsProps {
  walletAddress?: string | null;
}

function MetricCard({ metric, index }: { metric: PortfolioMetric; index: number }) {
  return (
    <div className="metric-card animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">{metric.label}</span>
        <span className={`text-[11px] font-semibold font-data ${metric.changePositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
          {metric.change}
        </span>
      </div>
      <div className="text-2xl font-bold text-[#F4F4F5] font-data tracking-tight leading-tight">{metric.value}</div>
      <div className="text-[10px] text-[#71717A] mt-1">{metric.sublabel}</div>
    </div>
  );
}

function BalanceRow({ b }: { b: ErcBalance }) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1E40AF]/15 flex items-center justify-center border border-[#1E40AF]/20">
            <span className="text-[10px] font-bold text-[#3B82F6]">{b.symbol.slice(0, 2)}</span>
          </div>
          <div>
            <div className="font-semibold text-[#F4F4F5] text-sm">{b.symbol}</div>
            <div className="text-[10px] text-[#71717A]">{b.name}</div>
          </div>
        </div>
      </td>
      <td className="font-data text-right">{b.balance}</td>
      <td className="font-data text-right font-semibold">{b.value}</td>
      <td className={`font-data text-right font-semibold ${b.positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{b.change}</td>
    </tr>
  );
}

function formatUsd(n: number): string {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` :
         n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K` :
         `$${n.toFixed(2)}`;
}

function formatNumber(s: string): string {
  const n = parseFloat(s);
  if (isNaN(n)) return s;
  return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

export default function PortfolioMetrics({ walletAddress }: PortfolioMetricsProps) {
  const [metrics, setMetrics] = useState<PortfolioMetric[]>(MOCK_METRICS);
  const [balances, setBalances] = useState<ErcBalance[]>(MOCK_BALANCES);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) {
      // Reset to mock data when wallet disconnects
      setMetrics(MOCK_METRICS);
      setBalances(MOCK_BALANCES);
      setIsLive(false);
      return;
    }

    let cancelled = false;

    async function loadRealData() {
      setLoading(true);
      try {
        const data = await fetchPortfolioData(walletAddress!);

        if (cancelled) return;

        // Build metrics from real data
        const nativeVal = data.nativeBalance?.valueUsd ?? 0;
        const nativeBal = data.nativeBalance?.balance ?? '0';
        const erc20Total = data.erc20Balances.reduce((sum, t) => sum + t.valueUsd, 0);
        const navTotal = nativeVal + erc20Total;

        const realMetrics: PortfolioMetric[] = [
          { label: 'NAV Total', value: formatUsd(navTotal), change: '—', changePositive: true, sublabel: 'Net Asset Value (Real)' },
          { label: 'AVAX Balance', value: formatNumber(nativeBal), change: data.nativeBalance ? `$${data.nativeBalance.priceUsd.toFixed(2)}` : '—', changePositive: true, sublabel: 'C-Chain Nativo' },
          { label: 'ERC-20 Holdings', value: formatUsd(erc20Total), change: `${data.erc20Balances.length} tokens`, changePositive: true, sublabel: `${data.erc20Balances.length} Tokens Detectados` },
          { label: 'Wallet', value: `${walletAddress?.slice(0, 6) ?? ''}...${walletAddress?.slice(-4) ?? ''}`, change: 'Conectada', changePositive: true, sublabel: 'Avalanche Fuji' },
        ];

        // Build ERC-20 balance rows from real data
        const realBalances: ErcBalance[] = data.erc20Balances.map((t) => ({
          symbol: t.symbol,
          name: t.name,
          balance: formatNumber(t.balance),
          value: formatUsd(t.valueUsd),
          change: '—',
          positive: true,
        }));

        setMetrics(realMetrics);
        setBalances(realBalances.length > 0 ? realBalances : MOCK_BALANCES);
        setIsLive(true);
      } catch (err) {
        console.error('Error fetching real portfolio data, using mock:', err);
        // Graceful fallback to mock data
        setMetrics(MOCK_METRICS);
        setBalances(MOCK_BALANCES);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    loadRealData();

    return () => { cancelled = true; };
  }, [walletAddress]);

  return (
    <section className="space-y-5 animate-slide-up">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#F4F4F5]">Métricas de Portafolio</h2>
          <p className="text-[11px] text-[#71717A] mt-0.5">
            {isLive ? 'Datos en vivo · Avalanche Data API (Glacier)' : 'Datos simulados · Conecta tu wallet para datos reales'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <svg className="animate-spin h-3.5 w-3.5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border uppercase tracking-wider ${
            isLive
              ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/15'
              : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/15'
          }`}>
            {isLive ? 'Live' : 'Mock'}
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {metrics.map((m, i) => <MetricCard key={m.label} metric={m} index={i} />)}
      </div>

      {/* ERC-20 Holdings Table */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1C1C1F] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">ERC-20 Holdings</span>
          <span className="text-[10px] text-[#71717A] font-data">{balances.length} activos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="min-w-[160px]">Token</th>
                <th className="text-right">Balance</th>
                <th className="text-right">Valor USD</th>
                <th className="text-right">24h</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((b) => <BalanceRow key={b.symbol} b={b} />)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
