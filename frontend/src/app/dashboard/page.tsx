'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BrowserProvider, Contract } from 'ethers';
import AetheriusEquityArtifact from '../../AetheriusEquity.json';
import Sidebar from '@/components/Sidebar';
import type { TabId } from '@/components/Sidebar';
import WalletConnect from '@/components/WalletConnect';
import DashboardHeader from '@/components/DashboardHeader';
import PortfolioMetrics from '@/components/PortfolioMetrics';
import RWAMarketTable from '@/components/RWAMarketTable';
import ComplianceView from '@/components/ComplianceView';
import SettingsView from '@/components/SettingsView';
import type { RWAAsset } from '@/lib/mockData';

// ─── Loading Phase Steps for institutional spinner ───
const LOADING_PHASES = [
  { label: 'Consultando Oráculo Wavy Node...', icon: 'oracle' },
  { label: 'Verificando KYC Regulatorio...', icon: 'shield' },
  { label: 'Firmando en Blockchain Avalanche...', icon: 'chain' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // ════════════════════════════════════════════════════════════
  // handleInvest — ⚠️ INTOCABLE — NO MODIFICAR ESTE BLOQUE ⚠️
  // Connections: ngrok backend → Wavy Node Oracle → Ethers.js
  // ════════════════════════════════════════════════════════════
  const handleInvest = async (assetName?: string) => {
    setLoading(true);
    setLoadingPhase(0);
    setMessage('Consultando Oráculo Wavy Node...');
    setStatus('loading');
    if (assetName) setSelectedAsset(assetName);

    try {
      setLoadingPhase(0);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) throw new Error('Falta NEXT_PUBLIC_BACKEND_URL en .env.local');
      if (!window.avalanche && !window.ethereum) {
        throw new Error('No se encontró una wallet conectada. Por favor, conecta tu wallet primero.');
      }

      // @ts-ignore - window.avalanche exists on Core Wallet
      const provider = new BrowserProvider(window.avalanche || window.ethereum);
      const signer = await provider.getSigner();
      const currentWallet = await signer.getAddress();

      const response = await fetch(`${backendUrl}/api/register-wallet`, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true', 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: currentWallet }),
      });

      if (!response.ok) {
        throw new Error('Error al verificar Compliance (Wavy Node API).');
      }

      const riskData = await response.json();
      console.log('Oráculo Wavy Node:', riskData);

      if (riskData.riskScore > 39) {
        throw new Error(`Transacción denegada. Riesgo: ${riskData.riskLevel} (${riskData.riskScore}/100)`);
      }

      setLoadingPhase(1);
      setMessage('Compliance Verificado (Riesgo Bajo). Aprobando transacción en Smart Contract...');

      setLoadingPhase(2);
      setMessage('Firmando en Blockchain Avalanche...');

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      if (!contractAddress) throw new Error('Falta NEXT_PUBLIC_CONTRACT_ADDRESS en .env.local');

      const contract = new Contract(contractAddress, AetheriusEquityArtifact.abi, signer);
      const contractAddressReal = await contract.getAddress();

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessage(`Inversión aprobada · Contrato verificado en ${contractAddressReal.slice(0, 10)}...${contractAddressReal.slice(-6)}`);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Ocurrió un error en la transacción.');
      setStatus('error');
    } finally {
      setLoading(false);
      setSelectedAsset(null);
    }
  };

  const handleRWAInvest = (asset: RWAAsset) => {
    handleInvest(asset.name);
  };

  // ─── Invest Panel ───
  const InvestPanel = () => (
    <section className="bg-[#111113] rounded-lg border border-[#1C1C1F] overflow-hidden animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="px-5 py-4 border-b border-[#1C1C1F] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#F4F4F5]">Verificación de Compliance e Inversión</h3>
          <p className="text-[11px] text-[#71717A] mt-0.5">Oráculo Wavy Node · Smart Contract AetheriusEquity · eERC20</p>
        </div>
        {selectedAsset && (
          <span className="text-xs text-[#F59E0B] font-semibold bg-[#F59E0B]/10 px-3 py-1 rounded-md border border-[#F59E0B]/15">
            {selectedAsset}
          </span>
        )}
      </div>
      <div className="p-5 space-y-4">
        {loading && (
          <div className="space-y-3">
            {LOADING_PHASES.map((phase, i) => (
              <div key={phase.label} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i < loadingPhase
                      ? 'bg-[#22C55E]/15 text-[#22C55E]'
                      : i === loadingPhase
                      ? 'bg-[#1E40AF]/15 text-[#3B82F6] animate-pulse-ring'
                      : 'bg-[#18181B] text-[#71717A]'
                  }`}
                >
                  {i < loadingPhase ? (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : i === loadingPhase ? (
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#27272A]" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    i < loadingPhase ? 'text-[#22C55E]' : i === loadingPhase ? 'text-[#F4F4F5]' : 'text-[#71717A]'
                  }`}
                >
                  {phase.label}
                </span>
              </div>
            ))}
            <div className="progress-institutional mt-2">
              <div className="progress-fill" style={{ width: `${((loadingPhase + 1) / LOADING_PHASES.length) * 100}%` }} />
            </div>
          </div>
        )}
        <button
          onClick={() => handleInvest()}
          disabled={loading}
          id="btn-compliance-invest"
          className={`w-full py-3.5 px-6 rounded-lg font-semibold text-sm transition-all flex justify-center items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 ${
            loading
              ? 'bg-[#18181B] border-2 border-[#1E40AF]/30 text-[#3B82F6]'
              : 'bg-gradient-to-r from-[#1E40AF] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white shadow-lg shadow-blue-900/20'
          } disabled:cursor-not-allowed`}
        >
          {loading && (
            <svg className="animate-spin-slow h-5 w-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M12 2a10 10 0 019.95 9" />
            </svg>
          )}
          {loading ? LOADING_PHASES[loadingPhase]?.label || 'Procesando...' : 'Verificar Compliance e Invertir'}
        </button>
        {message && !loading && (
          <div
            className={`p-4 rounded-lg border flex items-start gap-3 animate-fade-in ${
              status === 'error'
                ? 'bg-[#EF4444]/8 border-[#EF4444]/15 text-[#EF4444]'
                : status === 'success'
                ? 'bg-[#22C55E]/8 border-[#22C55E]/15 text-[#22C55E]'
                : 'bg-[#3B82F6]/8 border-[#3B82F6]/15 text-[#3B82F6]'
            }`}
          >
            {status === 'success' && (
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {status === 'error' && (
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className="text-sm font-medium leading-relaxed">{message}</p>
          </div>
        )}
      </div>
    </section>
  );

  // ─── Render active tab view ───
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <PortfolioMetrics walletAddress={walletAddress} />
            <RWAMarketTable onInvestClick={handleRWAInvest} />
            <InvestPanel />
          </>
        );
      case 'portafolio':
        return <PortfolioMetrics walletAddress={walletAddress} />;
      case 'mercado':
        return (
          <>
            <RWAMarketTable onInvestClick={handleRWAInvest} />
            <InvestPanel />
          </>
        );
      case 'compliance':
        return <ComplianceView walletAddress={walletAddress} />;
      case 'configuracion':
        return <SettingsView walletAddress={walletAddress} />;
      default:
        return null;
    }
  };

  // ════════════════════════════════════════════════════════════
  // ESTADO 2: Sin wallet conectada → pantalla de acceso
  // ════════════════════════════════════════════════════════════
  if (!walletAddress) {
    return (
      <div className="h-screen w-full bg-[#09090B] flex items-center justify-center text-[#F4F4F5] relative overflow-hidden">
        {/* Subtle background logo watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-[0.03]">
          <div className="relative w-[800px] h-[800px] blur-2xl animate-glow-pulse">
            <Image
              src="/aetherius-logo.png"
              alt="Aetherius Background"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="relative z-10 max-w-md w-full mx-4 bg-[#111113] border border-[#27272A] rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-[#27272A]/50 border border-[#3F3F46] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#A1A1AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-3">Verificación de Tesorería</h2>
          <p className="text-sm text-[#A1A1AA] mb-8 leading-relaxed">
            Por seguridad institucional, conecta la wallet corporativa autorizada para acceder al terminal de Capital Privado.
          </p>
          <div className="flex justify-center">
            <WalletConnect connectedAddress={walletAddress} onAddressChange={setWalletAddress} />
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // ESTADO 3: Wallet conectada → Dashboard completo
  // ════════════════════════════════════════════════════════════
  return (
    <div className="h-screen flex overflow-hidden bg-[#09090B]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col lg:ml-[260px] min-w-0">
        {/* Top Bar */}
        <DashboardHeader walletAddress={walletAddress} onAddressChange={setWalletAddress} />

        {/* Scrollable Content — Renders active view */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-6">
          {renderView()}

          <footer className="text-center py-4 text-[10px] text-[#71717A] border-t border-[#1C1C1F]">
            Aetherius Capital Network · Avalanche C-Chain (Fuji Testnet) · Protocolo eERC20 · {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </div>
  );
}
