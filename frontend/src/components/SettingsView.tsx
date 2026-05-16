'use client';

import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// eERC20 Viewing Keys & Auditoría — Configuración
// Basado en documentación oficial de Avalanche eERC:
// - Balances cifrados on-chain (solo titular ve el saldo)
// - Módulo de Auditoría: acceso otorgable/revocable a reguladores
// - Despliegue en C-Chain Mainnet, Fuji y L1s custom
// ═══════════════════════════════════════════════════════════════

interface SettingsViewProps {
  walletAddress: string | null;
}

const VIEWING_KEYS = [
  { id: 'vk-1', entity: 'Titular de Cuenta', type: 'owner', access: 'full', status: 'active' as const, created: '16 May 2026' },
  { id: 'vk-2', entity: 'Auditor Interno', type: 'auditor', access: 'read-only', status: 'active' as const, created: '16 May 2026' },
  { id: 'vk-3', entity: 'CNBV (Regulador)', type: 'regulator', access: 'pending', status: 'pending' as const, created: '—' },
];

export default function SettingsView({ walletAddress }: SettingsViewProps) {
  const [keys, setKeys] = useState(VIEWING_KEYS);
  const [showGrant, setShowGrant] = useState(false);
  const [granted, setGranted] = useState(false);

  const handleGrant = () => {
    setShowGrant(true);
    setTimeout(() => {
      setKeys((prev) => prev.map((k) => k.id === 'vk-3' ? { ...k, status: 'active' as const, access: 'read-only', created: new Date().toLocaleDateString('es-MX') } : k));
      setGranted(true);
      setShowGrant(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-[#F4F4F5]">Configuración — Protocolo eERC20</h2>
        <p className="text-[11px] text-[#71717A] mt-0.5">Gestión de Viewing Keys y auditoría regulatoria</p>
      </div>

      {/* eERC20 Explainer */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1E40AF]/10 border border-[#1E40AF]/15 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F5]">Encrypted ERC (eERC)</h3>
            <p className="text-[10px] text-[#71717A]">Estándar de tokens cifrados de Avalanche</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { title: 'Balances Cifrados', desc: 'Solo el titular y auditores autorizados ven el saldo real. Imposible rastrear holdings desde exploradores públicos.' },
            { title: 'Transferencias ZK', desc: 'Los montos se ocultan con pruebas de conocimiento cero. Observadores ven que ocurrió una transferencia, pero no cuánto.' },
            { title: 'Auditoría Configurable', desc: 'El acceso del auditor puede otorgarse y revocarse sin redesplegar el contrato. Cumplimiento regulatorio sin sacrificar privacidad.' },
          ].map((c) => (
            <div key={c.title} className="bg-[#09090B]/60 rounded-lg p-4 border border-[#27272A]/40">
              <h4 className="text-xs font-semibold text-[#F4F4F5] mb-1.5">{c.title}</h4>
              <p className="text-[10px] text-[#71717A] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Viewing Keys Table */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1C1C1F] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Viewing Keys</span>
          <span className="text-[10px] text-[#71717A] font-data">{keys.filter((k) => k.status === 'active').length} activas</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Entidad</th>
                <th>Tipo</th>
                <th className="text-center">Acceso</th>
                <th className="text-center">Estado</th>
                <th className="text-right">Creada</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}>
                  <td><span className="font-semibold text-[#F4F4F5]">{k.entity}</span></td>
                  <td><span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded border border-[#3B82F6]/15 uppercase">{k.type}</span></td>
                  <td className="text-center"><span className="text-xs font-data text-[#A1A1AA]">{k.access}</span></td>
                  <td className="text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                      k.status === 'active' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/15' : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/15'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${k.status === 'active' ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'}`} />
                      {k.status === 'active' ? 'Activa' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="text-right font-data text-xs">{k.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grant Auditor Access */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F5]">Otorgar Acceso de Auditoría</h3>
            <p className="text-[11px] text-[#71717A] mt-0.5">Permite a la CNBV o regulador autorizado visualizar balances cifrados eERC20</p>
          </div>
        </div>
        {granted ? (
          <div className="p-4 rounded-lg bg-[#22C55E]/8 border border-[#22C55E]/15 flex items-center gap-3 animate-fade-in">
            <svg className="w-5 h-5 text-[#22C55E] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm font-medium text-[#22C55E]">Viewing Key otorgada a la CNBV. El regulador puede auditar balances eERC20 en modo read-only.</p>
          </div>
        ) : (
          <button
            onClick={handleGrant}
            disabled={showGrant}
            className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all flex justify-center items-center gap-3 cursor-pointer ${
              showGrant ? 'bg-[#18181B] border-2 border-[#1E40AF]/30 text-[#3B82F6]' : 'bg-gradient-to-r from-[#1E40AF] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white shadow-lg shadow-blue-900/20'
            }`}
          >
            {showGrant ? (
              <>
                <svg className="animate-spin h-4 w-4 text-[#3B82F6]" viewBox="0 0 24 24" fill="none"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M12 2a10 10 0 019.95 9" /></svg>
                Firmando Viewing Key en Blockchain...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Otorgar Acceso de Auditoría a CNBV / Regulador
              </>
            )}
          </button>
        )}
        <p className="text-[10px] text-[#71717A] mt-3 text-center">
          Esta acción es revocable. La clave puede rotarse sin redesplegar el contrato eERC20.
        </p>
      </div>

      {/* Network Info */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] p-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Red', value: 'Avalanche Fuji' },
            { label: 'Chain ID', value: '43113' },
            { label: 'Protocolo', value: 'eERC20' },
            { label: 'Contrato', value: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ? `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.slice(0, 8)}...` : 'No configurado' },
          ].map((i) => (
            <div key={i.label} className="text-center">
              <div className="text-xs font-bold text-[#F4F4F5] font-data">{i.value}</div>
              <div className="text-[10px] text-[#71717A] mt-0.5">{i.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
