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
        <div className="relative w-12 h-12 rounded-[14px] bg-[#111113] flex items-center justify-center overflow-hidden border border-white/5 shadow-md">
          {/* El Isotipo: El Pico Blanco/Anillo Rubí de Midjourney */}
          <Image 
            src="/aetherius-logo.png" 
            alt="Aetherius Isotype"
            fill={true}
            className="object-contain p-2.5"
            priority={true} 
          />
        </div>
        {/* El Texto de la Marca: Manteniendo el story rubí brillante */}
        <div className="flex flex-col justify-center pt-0.5">
          <span className="font-black text-2xl tracking-wide text-white leading-none">
            ÆTHERIUS<span className="text-[#E0115F]">.</span>
          </span>
          <span className="text-[11px] text-[#60728F] font-bold uppercase tracking-[0.15em] leading-none mt-1.5">
            CAPITAL NETWORK
          </span>
        </div>
      </div>
      
      {/* Botones de Cabecera */}
      <div className="flex items-center space-x-4">
        <WalletConnect onAddressChange={onAddressChange} />
      </div>
    </header>
  );
}
