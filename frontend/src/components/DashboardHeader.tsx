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
      {/* SECCIÓN DEL LOGO */}
      <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
        <div className="relative w-48 h-12 flex items-center justify-center">
          <Image 
            src="/aetherius-logo.png" 
            alt="Aetherius Logo"
            fill={true}
            className="object-contain object-left"
            priority={true} 
          />
        </div>
      </div>
      
      {/* Botones de Cabecera */}
      <div className="flex items-center space-x-4">
        <WalletConnect onAddressChange={onAddressChange} />
      </div>
    </header>
  );
}
