'use client';

import React from 'react';

export type TabId = 'dashboard' | 'portafolio' | 'mercado' | 'compliance' | 'configuracion';

const NAV_ITEMS: { label: string; icon: string; id: TabId }[] = [
  { label: 'Dashboard', icon: 'grid', id: 'dashboard' },
  { label: 'Portafolio', icon: 'briefcase', id: 'portafolio' },
  { label: 'Mercado RWA', icon: 'trending', id: 'mercado' },
  { label: 'Compliance', icon: 'shield', id: 'compliance' },
  { label: 'Configuración', icon: 'settings', id: 'configuracion' },
];

interface SidebarProps {
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}

function NavIcon({ icon, className = 'w-4 h-4' }: { icon: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></>,
    trending: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[icon]}
    </svg>
  );
}

export default function Sidebar({ activeTab = 'dashboard', onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#111113] border-r border-[#1C1C1F] flex flex-col z-40 max-lg:hidden">
      {/* Logo */}
      <div className="h-14 flex items-center gap-3 px-5 border-b border-[#1C1C1F] shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-900/30">
          <span className="font-bold text-white text-xs tracking-tighter">AE</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#F4F4F5] leading-tight">Aetherius</span>
          <span className="text-[10px] font-medium text-[#3B82F6] tracking-wider uppercase leading-tight">Capital Network</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-[#71717A] uppercase tracking-widest px-3 mb-2">Principal</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === item.id
                ? 'bg-[#1E40AF]/15 text-[#3B82F6] border border-[#1E40AF]/20'
                : 'text-[#A1A1AA] hover:bg-[#1F1F23] hover:text-[#F4F4F5] border border-transparent'
            }`}
          >
            <NavIcon icon={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Network Status */}
      <div className="px-4 py-4 border-t border-[#1C1C1F] space-y-3 shrink-0">
        <div className="flex items-center gap-2.5 px-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-[#A1A1AA]">Avalanche Fuji C-Chain</span>
        </div>
        <div className="bg-[#09090B] rounded-lg border border-[#27272A] px-3 py-2 text-[10px] text-[#71717A] font-mono">
          Chain ID: 43113 · Testnet
        </div>
      </div>
    </aside>
  );
}
