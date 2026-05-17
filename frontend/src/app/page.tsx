'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

// ─── Framer Motion Variants ───
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: 0.3 + i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

// ─── Step Data ───
const STEPS = [
  {
    step: '01',
    title: 'KYC Regulatorio',
    description: 'Verificación de identidad con validación de RFC y CURP. Cumplimiento total con legislación mexicana y estándares AML internacionales.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Oráculo Wavy Node',
    description: 'Análisis de riesgo en tiempo real. El oráculo evalúa el perfil del inversionista y emite alertas AML/KYC antes de aprobar la transacción.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Firma en Blockchain',
    description: 'Transacción firmada con Ethers.js sobre Avalanche C-Chain. Fracciones de Capital Privado emitidas como tokens eERC20 con privacidad criptográfica.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7" /><circle cx="8" cy="12" r="3" /><circle cx="16" cy="12" r="3" />
      </svg>
    ),
  },
];

// ─── Tech Cards Data ───
const TECH_CARDS = [
  {
    title: 'Avalanche L1s',
    badge: 'Red',
    description: 'Avalanche permite crear blockchains independientes (L1s) con su propio set de validadores, reglas de consenso y VMs personalizadas. Esto garantiza escalabilidad horizontal: cada L1 procesa sus transacciones sin competir por recursos con otras redes. La finalidad es sub-segundo, las comisiones son mínimas, y la privacidad es configurable por cadena.',
    stats: [
      { label: 'Finalidad', value: '< 1 seg' },
      { label: 'Escalabilidad', value: 'Horizontal' },
      { label: 'Validadores', value: 'Dedicados' },
    ],
  },
  {
    title: 'Protocolo eERC20',
    badge: 'Privacidad',
    description: 'eERC (Encrypted ERC) es el estándar de tokens cifrados de Avalanche. Los balances están completamente encriptados on-chain — solo el titular (y auditores autorizados) pueden ver el saldo real. Las transferencias ocultan los montos usando pruebas de conocimiento cero (ZK), mientras un Módulo de Auditoría permite cumplimiento regulatorio sin sacrificar la privacidad del inversionista.',
    stats: [
      { label: 'Balances', value: 'Cifrados' },
      { label: 'Transferencias', value: 'ZK Proofs' },
      { label: 'Auditoría', value: 'Configurable' },
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="landing-scroll bg-[#09090B] text-[#F4F4F5]">
      {/* ═══ NAV ═══ */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#1C1C1F]/60 bg-[#09090B]/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image 
                src="/aetherius-logo.png" 
                alt="Aetherius Isotype"
                fill={true}
                className="object-contain"
                priority={true} 
              />
            </div>
            <div className="flex flex-col justify-center pt-0.5">
              <span className="font-black text-xl tracking-wide text-white leading-none">
                ÆTHERIUS
              </span>
              <span className="text-[10px] text-[#60728F] font-bold uppercase tracking-[0.15em] leading-none mt-1">
                CAPITAL NETWORK
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:flex items-center gap-2 text-[11px] text-[#71717A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Avalanche Fuji
            </span>
            <Link
              href="/dashboard"
              className="px-5 py-2 bg-[#E0115F] hover:bg-[#FF2D78] text-white text-xs font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#E0115F]/25 cursor-pointer"
            >
              Acceder al Terminal
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large Logo Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] opacity-[0.03] mix-blend-screen blur-2xl animate-glow-pulse">
            <Image 
              src="/aetherius-logo.png" 
              alt="Aetherius Background"
              fill={true}
              className="object-contain"
              priority={true}
            />
          </div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E0115F]/8 blur-[120px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1E40AF]/6 blur-[100px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E0115F]/10 border border-[#E0115F]/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#E0115F] animate-pulse" />
            <span className="text-xs font-medium text-[#E0115F]">Protocolo eERC20 · Avalanche C-Chain</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            Liquidez Institucional{' '}
            <br className="hidden sm:block" />
            para{' '}
            <span className="bg-gradient-to-r from-[#E0115F] via-[#FF2D78] to-[#E0115F] bg-clip-text text-transparent animate-gradient-shift">
              Capital Privado
            </span>{' '}
            <br className="hidden sm:block" />
            en LatAm
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tokenización de activos reales con privacidad criptográfica, compliance regulatorio automatizado
            y finalidad sub-segundo sobre la red de Avalanche.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              id="btn-hero-cta"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#E0115F] to-[#B80D4E] text-white font-semibold text-sm rounded-xl transition-all hover:shadow-2xl hover:shadow-[#E0115F]/30 hover:scale-[1.02] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Acceder al Terminal
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
            <a
              href="https://github.com/diegoc1005/Aetherius-Capital-Network-MVP"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F5] hover:border-[#E0115F]/30 font-medium text-sm rounded-xl transition-all cursor-pointer"
            >
              Ver Repositorio
            </a>
          </motion.div>

          {/* Metrics Bar */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { value: '< 1s', label: 'Finalidad' },
              { value: 'eERC20', label: 'Privacidad' },
              { value: 'KYC+AML', label: 'Compliance' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#F4F4F5] font-data">{m.value}</div>
                <div className="text-[10px] text-[#71717A] uppercase tracking-wider mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-[#E0115F] uppercase tracking-[0.2em]">Proceso</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Cómo Funciona</h2>
            <p className="text-sm text-[#71717A] mt-3 max-w-md mx-auto">
              Tres pasos verificables para inversión institucional con compliance automatizado.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="glass-card p-6 relative group hover:border-[#E0115F]/20 transition-all duration-300"
              >
                {/* Step number */}
                <div className="text-[80px] font-bold text-[#E0115F]/5 absolute top-3 right-5 leading-none select-none">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#E0115F]/10 border border-[#E0115F]/15 flex items-center justify-center text-[#E0115F] mb-5 group-hover:bg-[#E0115F]/15 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{step.description}</p>

                {/* Connector line (not on last) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-[#27272A]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGY ═══ */}
      <section className="relative py-24 px-6 border-t border-[#1C1C1F]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-[#E0115F] uppercase tracking-[0.2em]">Infraestructura</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Por Qué Avalanche</h2>
            <p className="text-sm text-[#71717A] mt-3 max-w-lg mx-auto">
              Datos extraídos de la documentación oficial mediante el servidor MCP de Avalanche.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {TECH_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="glass-card p-7 hover:border-[#E0115F]/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold text-[#E0115F] bg-[#E0115F]/10 rounded-md border border-[#E0115F]/15 uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  {card.description}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {card.stats.map((s) => (
                    <div key={s.label} className="bg-[#09090B]/60 rounded-lg p-3 text-center border border-[#27272A]/40">
                      <div className="text-sm font-bold text-[#F4F4F5] font-data">{s.value}</div>
                      <div className="text-[10px] text-[#71717A] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 px-6 border-t border-[#1C1C1F]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Empieza a Invertir <span className="text-[#E0115F]">Ahora</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mb-8 max-w-md mx-auto">
            Conecta tu Core Wallet o MetaMask y accede al terminal institucional de Capital Privado sobre Avalanche Fuji Testnet.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E0115F] to-[#B80D4E] text-white font-semibold text-sm rounded-xl transition-all hover:shadow-2xl hover:shadow-[#E0115F]/30 hover:scale-[1.02] cursor-pointer"
          >
            Acceder al Terminal
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#1C1C1F] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E0115F] to-[#FF2D78] flex items-center justify-center">
              <span className="font-bold text-white text-[8px]">AE</span>
            </div>
            <span className="text-xs text-[#71717A]">Aetherius Capital Network © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#71717A]">
            <span>Avalanche Fuji Testnet</span>
            <span>·</span>
            <span>Protocolo eERC20</span>
            <span>·</span>
            <span>Wavy Node Oracle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
