'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WalletConnect from './WalletConnect';

interface DashboardHeaderProps {
  onAddressChange?: (address: string | null) => void;
}

export default function DashboardHeader({ onAddressChange }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <header className="max-w-7xl mx-auto px-4 h-20 items-center flex justify-between w-full border-b border-white/5 sticky top-0 bg-[#030304] z-10 shrink-0">
      {/* SECCIÓN DEL LOGO CON INTEGRACIÓN MIDJOURNEY */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
        <div className="relative w-8 h-8 rounded-lg bg-[#0e0f14] flex items-center justify-center ruby-glow overflow-hidden">
          {/* El Isotipo: El Pico Blanco/Anillo Rubí de Midjourney */}
          <Image 
            src="/aetherius-logo.png" 
            alt="Aetherius Isotype"
            fill={true}
            className="object-contain"
            priority={true} 
          />
        </div>
        {/* El Texto de la Marca: Manteniendo el story rubí brillante */}
        <div className="flex flex-col">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">ÆTHERIUS<span className="text-[#E30B5D]">.</span></span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">CAPITAL NETWORK</span>
        </div>
      </div>
      
      {/* Botones de Cabecera */}
      <div className="flex items-center space-x-4">
        <WalletConnect onAddressChange={onAddressChange} />
      </div>
    </header>
  );
}
