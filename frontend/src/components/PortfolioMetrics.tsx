'use client';

import { MOCK_METRICS, MOCK_BALANCES } from '@/lib/mockData';
import type { PortfolioMetric, ErcBalance } from '@/lib/mockData';

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

export default function PortfolioMetrics() {
  return (
    <section className="space-y-5 animate-slide-up">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#F4F4F5]">Métricas de Portafolio</h2>
          <p className="text-[11px] text-[#71717A] mt-0.5">Datos simulados · Listo para Avalanche Data API</p>
        </div>
        <span className="px-2.5 py-1 bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold rounded-md border border-[#22C55E]/15 uppercase tracking-wider">Live</span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {MOCK_METRICS.map((m, i) => <MetricCard key={m.label} metric={m} index={i} />)}
      </div>

      {/* ERC-20 Holdings Table */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1C1C1F] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">ERC-20 Holdings</span>
          <span className="text-[10px] text-[#71717A] font-data">{MOCK_BALANCES.length} activos</span>
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
              {MOCK_BALANCES.map((b) => <BalanceRow key={b.symbol} b={b} />)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
