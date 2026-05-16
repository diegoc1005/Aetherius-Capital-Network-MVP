'use client';

import React, { useState, useEffect } from 'react';

interface ComplianceViewProps {
  walletAddress: string | null;
}

const MOCK_RISK_SCORE = 12;
const MOCK_KYC = {
  fullName: 'Diego C. Rodríguez',
  rfc: 'ROCD****06M***',
  curp: 'ROCD****HNLR***',
  nationality: 'Mexicana',
  provider: 'Wavy Node Oracle v2.1',
};

const CHECKS = [
  { label: 'Verificación de Identidad (RFC/CURP)', status: 'passed', ts: '16 May 2026, 10:30' },
  { label: 'Lista Negra OFAC / ONU / UE', status: 'passed', ts: '16 May 2026, 10:30' },
  { label: 'PEP (Persona Expuesta Políticamente)', status: 'passed', ts: '16 May 2026, 10:31' },
  { label: 'Análisis de Origen de Fondos', status: 'passed', ts: '16 May 2026, 10:31' },
  { label: 'Monitoreo Transaccional Continuo', status: 'active', ts: 'En tiempo real' },
];

function getRisk(score: number) {
  if (score <= 19) return { label: 'Mínimo', color: '#22C55E', bg: 'rgba(34,197,94,0.10)', desc: 'Entidad legítima — Sin restricciones operativas' };
  if (score <= 39) return { label: 'Bajo', color: '#3B82F6', bg: 'rgba(59,130,246,0.10)', desc: 'Riesgo aceptable — Monitoreo estándar' };
  if (score <= 59) return { label: 'Medio', color: '#F59E0B', bg: 'rgba(245,158,11,0.10)', desc: 'Investigación recomendada — Revisión manual' };
  if (score <= 79) return { label: 'Alto', color: '#EF4444', bg: 'rgba(239,68,68,0.10)', desc: 'Restricciones parciales — Escalar a compliance' };
  return { label: 'Crítico', color: '#DC2626', bg: 'rgba(220,38,38,0.10)', desc: 'Bloqueo inmediato y reporte a autoridades' };
}

export default function ComplianceView({ walletAddress }: ComplianceViewProps) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => { setScore(MOCK_RISK_SCORE); setLoading(false); }, 1500);
    return () => clearTimeout(t);
  }, [walletAddress]);

  const risk = score !== null ? getRisk(score) : null;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-[#F4F4F5]">Motor de Compliance — Wavy Node</h2>
        <p className="text-[11px] text-[#71717A] mt-0.5">Análisis de riesgo AML/KYC en tiempo real · Regulación mexicana</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Risk Score */}
        <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Risk Score</span>
            <span className="px-2 py-0.5 text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 rounded border border-[#3B82F6]/15">Wavy Node v2.1</span>
          </div>
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-10 h-10 border-2 border-[#27272A] border-t-[#3B82F6] rounded-full animate-spin" />
              <p className="text-xs text-[#71717A] mt-4">Consultando oráculo...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#27272A" strokeWidth="8" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke={risk?.color} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(score! / 100) * 314} 314`} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold font-data" style={{ color: risk?.color }}>{score}</span>
                    <span className="text-[10px] text-[#71717A]">/ 100</span>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold border" style={{ color: risk?.color, backgroundColor: risk?.bg, borderColor: `${risk?.color}30` }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: risk?.color }} />
                  Riesgo {risk?.label}
                </span>
                <p className="text-[11px] text-[#A1A1AA]">{risk?.desc}</p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[9px] text-[#71717A] uppercase tracking-wider">
                  <span>0 Mínimo</span><span>40 Medio</span><span>80 Crítico</span><span>100</span>
                </div>
                <div className="h-2 rounded-full bg-[#18181B] overflow-hidden flex">
                  <div className="h-full bg-[#22C55E] rounded-l-full" style={{ width: '20%' }} />
                  <div className="h-full bg-[#3B82F6]" style={{ width: '20%' }} />
                  <div className="h-full bg-[#F59E0B]" style={{ width: '20%' }} />
                  <div className="h-full bg-[#EF4444]" style={{ width: '20%' }} />
                  <div className="h-full bg-[#DC2626] rounded-r-full" style={{ width: '20%' }} />
                </div>
                <div className="relative h-3">
                  <div className="absolute top-0 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px]" style={{ left: `${score}%`, borderTopColor: risk?.color, transform: 'translateX(-50%)' }} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* KYC Identity */}
        <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Identidad KYC</span>
            <span className="px-2 py-0.5 text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 rounded border border-[#22C55E]/15">Nivel 3</span>
          </div>
          <div className="space-y-3">
            {[
              { l: 'Nombre', v: MOCK_KYC.fullName },
              { l: 'RFC', v: MOCK_KYC.rfc },
              { l: 'CURP', v: MOCK_KYC.curp },
              { l: 'Nacionalidad', v: MOCK_KYC.nationality },
              { l: 'Wallet', v: walletAddress ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-6)}` : 'No conectada' },
              { l: 'Proveedor', v: MOCK_KYC.provider },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between py-2 border-b border-[#1C1C1F] last:border-0">
                <span className="text-[11px] text-[#71717A]">{r.l}</span>
                <span className="text-xs font-semibold text-[#F4F4F5] font-data">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checks */}
      <div className="bg-[#111113] rounded-lg border border-[#1C1C1F] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1C1C1F]">
          <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Verificaciones Regulatorias</span>
        </div>
        <div className="divide-y divide-[#1C1C1F]">
          {CHECKS.map((c) => (
            <div key={c.label} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${c.status === 'passed' ? 'bg-[#22C55E]/15' : 'bg-[#3B82F6]/15'}`}>
                  {c.status === 'passed' ? (
                    <svg className="w-3 h-3 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                  )}
                </div>
                <span className="text-xs font-medium text-[#F4F4F5]">{c.label}</span>
              </div>
              <span className="text-[10px] text-[#71717A] font-data">{c.ts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
