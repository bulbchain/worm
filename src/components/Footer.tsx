import React from 'react';
import { ExternalLink, ShieldCheck, Terminal, MessageSquare } from 'lucide-react';
import { SOLANA_PROGRAM_ID } from '../hooks/useSolanaBettingContract';

export const Footer: React.FC = () => {
  const LOGO_SRC =
    'https://lh3.googleusercontent.com/aida/AEtjO1X29x9RYL_-vEAjVUDquwxDdGw4p49FtVwVlyi-WQDwKe3bGqpKeffQxnaofspu78ClUQoYTREDuSIsmDNweJsg0Dv4pMubGZB-6amdAhSeoLlYnO_exaHsLZTtP6bXo05Ylo4dULfGFqW0goLPWHkgXtxt7JfWWX2Z-Y1JAZp6VM9rPddq_xQKO0kxhMqT_eHbfb2kimShMtHTQ1HUokni9ZHAt-5S32TkNqCs3K4ywShKIvmhxGpHq4o';

  return (
    <footer className="w-full bg-[#05080c] py-12 border-t border-[#00f5d4]/15 relative z-10">
      <div className="w-full px-6 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_SRC}
                alt="NARKY Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-display text-xl uppercase text-white font-black tracking-wider">
                NARKY
              </span>
              <span className="font-tech text-[10px] bg-[#131a22] px-2 py-0.5 rounded text-[#00f5d4] border border-[#00f5d4]/30">
                v3.0.0-SOIL
              </span>
            </div>
            <p className="font-tech text-xs text-[#83948f] tracking-widest text-center lg:text-left">
              FEED ON LIGHT · OUTGROW THE DARK
            </p>
          </div>

          {/* External Ecosystem Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 font-tech text-xs text-[#b9cac4]">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#00f5d4]" />
              <span>DISCORD</span>
            </a>
            <a
              href="https://x.com/narkygame"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5"
            >
              <span>X / TWITTER</span>
              <ExternalLink className="w-3 h-3 text-[#83948f]" />
            </a>
            <a
              href="https://t.me/narkygame"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#10b981]">TELEGRAM</span>
            </a>
            <a
              href={`https://explorer.solana.com/address/${SOLANA_PROGRAM_ID}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5 text-[#f59e0b]"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>SMART CONTRACT</span>
            </a>
          </div>
        </div>

        {/* Sub-node telemetry & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#3a4a46]/30">
          <div className="flex items-center gap-2 bg-[#0d131a] px-3.5 py-1.5 rounded-full border border-[#00f5d4]/20">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-tech text-[11px] text-[#b9cac4]">
              SUB-NODE: SOLANA MAINNET-BETA · 24MS LATENCY
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#83948f] font-tech">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00f5d4]" />
              Escrow Audit Verified
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Fair Play Algorithm</span>
          </div>

          <span className="font-tech text-xs text-[#83948f] text-center md:text-right">
            © 2026 NARKY PROTOCOL. ALL SUBTERRANEAN VECTOR RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
};
