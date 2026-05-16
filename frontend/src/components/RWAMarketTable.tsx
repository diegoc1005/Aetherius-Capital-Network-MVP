'use client';

import { MOCK_RWA_ASSETS } from '@/lib/mockData';
import type { RWAAsset } from '@/lib/mockData';

function ComplianceBadge({ status }: { status: RWAAsset['compliance'] }) {
  const styles: Record<string, string> = {
    Passed: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/15',
    Pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/15',
    Required: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/15',
    Failed: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/15',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Passed' ? 'bg-[#22C55E]' : status === 'Pending' ? 'bg-[#F59E0B]' : status === 'Required' ? 'bg-[#3B82F6]' : 'bg-[#EF4444]'}`} />
      {status === 'Passed' ? 'Aprobado' : status === 'Pending' ? 'Pendiente' : status === 'Required' ? 'Requerido' : 'Rechazado'}
    </span>
  );
}

function StatusBadge({ status }: { status: RWAAsset['status'] }) {
  const styles: Record<string, string> = {
    Active: 'text-[#22C55E]',
    Funded: 'text-[#3B82F6]',
    Review: 'text-[#F59E0B]',
  };
  return <span className={`text-[11px] font-semibold ${styles[status]}`}>{status}</span>;
}

export default function RWAMarketTable({ onInvestClick }: { onInvestClick: (asset: RWAAsset) => void }) {
  return (
    <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-[#F4F4F5]">Mercado Secundario RWA</h2>
          <p className="text-[11px] text-[#71717A] mt-0.5">Startups tokenizadas · Protocolo eERC20 sobre Avalanche</p>
        </div>
        <span className="px-2.5 py-1 bg-[#18181B] text-[#A1A1AA] text-[10px] font-bold rounded-md border border-[#27272A] uppercase tracking-wider">
          {MOCK_RWA_ASSETS.length} Oportunidades
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="min-w-[180px]">Asset</th>
                <th>Sector</th>
                <th className="text-right">Valuación</th>
                <th className="text-right">Target</th>
                <th className="text-center">Protocolo</th>
                <th className="text-right">Yield Est.</th>
                <th className="text-center">Compliance</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RWA_ASSETS.map((asset, i) => (
                <tr key={asset.name} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E40AF]/20 to-[#3B82F6]/10 flex items-center justify-center border border-[#1E40AF]/15">
                        <span className="text-[10px] font-bold text-[#3B82F6]">{asset.name.split(' ').map(w => w[0]).join('')}</span>
                      </div>
                      <span className="font-semibold text-[#F4F4F5]">{asset.name}</span>
                    </div>
                  </td>
                  <td><span className="text-[#A1A1AA] text-xs">{asset.sector}</span></td>
                  <td className="text-right font-data font-semibold">{asset.valuation}</td>
                  <td className="text-right font-data font-semibold text-[#F59E0B]">{asset.target}</td>
                  <td className="text-center">
                    <span className="px-2 py-0.5 bg-[#1E40AF]/10 text-[#3B82F6] text-[10px] font-bold rounded border border-[#1E40AF]/15 font-data">{asset.protocol}</span>
                  </td>
                  <td className="text-right font-data font-semibold text-[#22C55E]">{asset.yield}</td>
                  <td className="text-center"><ComplianceBadge status={asset.compliance} /></td>
                  <td className="text-center"><StatusBadge status={asset.status} /></td>
                  <td className="text-center">
                    <button
                      onClick={() => onInvestClick(asset)}
                      disabled={asset.compliance === 'Failed'}
                      className="px-3 py-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] disabled:bg-[#27272A] disabled:text-[#71717A] text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      Invertir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
