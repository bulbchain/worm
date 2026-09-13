import React, { useState } from 'react';
import { ScreenType, WalletState } from '../types';
import { sounds } from '../audio';
import { Volume2, VolumeX, Wallet, Users, Flame } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, subMode?: 'free' | 'staked') => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  wallet,
  onOpenWalletModal,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getIsMuted());

  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) sounds.playBeep(520);
  };

  const LOGO_SRC =
    'https://lh3.googleusercontent.com/aida/AEtjO1X29x9RYL_-vEAjVUDquwxDdGw4p49FtVwVlyi-WQDwKe3bGqpKeffQxnaofspu78ClUQoYTREDuSIsmDNweJsg0Dv4pMubGZB-6amdAhSeoLlYnO_exaHsLZTtP6bXo05Ylo4dULfGFqW0goLPWHkgXtxt7JfWWX2Z-Y1JAZp6VM9rPddq_xQKO0kxhMqT_eHbfb2kimShMtHTQ1HUokni9ZHAt-5S32TkNqCs3K4ywShKIvmhxGpHq4o';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#05080c]/90 backdrop-blur-xl border-b border-[#00f5d4]/15 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
      <div className="h-20 w-full px-4 md:px-6 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-6">
          <button
            id="nav-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center h-10 w-10 overflow-hidden rounded-lg bg-[#0d1722]/60 border border-[#00f5d4]/30 p-1 transition-transform group-hover:scale-105">
              <img
                src={LOGO_SRC}
                alt="NARKY Cyberpunk Soil Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback to inline SVG if image blocked
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base md:text-lg uppercase tracking-widest text-[#00f5d4] font-black drop-shadow-[0_0_10px_rgba(0,245,212,0.6)]">
                NARKY
              </span>
              <span className="font-tech text-[8px] md:text-[9px] text-[#83948f] tracking-widest uppercase">
                SUB-TERRA // MATRIX-09
              </span>
            </div>
          </button>

          {/* DESKTOP NAVIGATION TABS */}
          <nav className="hidden lg:flex items-center gap-1.5 font-tech">
            <button
              id="nav-arena-btn"
              onClick={() => onNavigate('arena')}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer ${
                currentScreen === 'arena'
                  ? 'text-[#00f5d4] bg-[#00f5d4]/15 border border-[#00f5d4]/50 shadow-[0_0_12px_rgba(0,245,212,0.25)] font-bold'
                  : 'text-[#b9cac4] hover:text-white hover:bg-[#131a22] border border-transparent'
              }`}
            >
              SOIL ARENA
            </button>

            <button
              id="nav-free-btn"
              onClick={() => onNavigate('arena', 'free')}
              className="px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider text-[#b9cac4] hover:text-white hover:bg-[#131a22] transition-colors cursor-pointer"
            >
              PLAY FREE
            </button>

            <button
              id="nav-staked-btn"
              onClick={() => onNavigate('arena', 'staked')}
              className="px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider text-[#f59e0b] hover:text-[#fbbf24] hover:bg-[#131a22] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
              BET WITH SOL
            </button>

            <button
              id="nav-leaderboard-btn"
              onClick={() => onNavigate('leaderboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer ${
                currentScreen === 'leaderboard'
                  ? 'text-[#00f5d4] bg-[#00f5d4]/15 border border-[#00f5d4]/50 shadow-[0_0_12px_rgba(0,245,212,0.25)] font-bold'
                  : 'text-[#b9cac4] hover:text-white hover:bg-[#131a22] border border-transparent'
              }`}
            >
              LEADERBOARDS
            </button>

            <button
              id="nav-invite-btn"
              onClick={() => onNavigate('invite')}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                currentScreen === 'invite'
                  ? 'text-[#a3e635] bg-[#a3e635]/15 border border-[#a3e635]/50 shadow-[0_0_12px_rgba(163,230,53,0.25)] font-bold'
                  : 'text-[#b9cac4] hover:text-white hover:bg-[#131a22] border border-transparent'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              INVITE &amp; EARN
            </button>
          </nav>
        </div>

        {/* RIGHT CONTROLS: TELEMETRY & WALLET */}
        <div className="flex items-center gap-2.5 md:gap-3">
          {/* Depth Telemetry Badge */}
          <div className="hidden md:flex items-center gap-2.5 bg-[#0d131a] px-3.5 py-1.5 rounded-full border border-[#00f5d4]/20 shadow-inner">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="font-tech text-[10px] text-[#10b981] font-bold">2,840 SPECIMENS</span>
            </div>
            <span className="text-[#3a4a46] font-tech text-xs">|</span>
            <span className="font-tech text-[10px] text-[#b9cac4]">DEPTH: -420M</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
            className="w-9 h-9 rounded-lg bg-[#131a22] border border-[#3a4a46]/50 hover:border-[#00f5d4]/60 text-[#83948f] hover:text-[#00f5d4] flex items-center justify-center transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#ec4899]" /> : <Volume2 className="w-4 h-4 text-[#00f5d4]" />}
          </button>

          {/* Connect / Manage Wallet Button */}
          <button
            id="header-wallet-btn"
            onClick={onOpenWalletModal}
            className={`
              font-display text-xs uppercase px-3.5 md:px-4 py-2 font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer
              ${
                wallet.isConnected
                  ? 'bg-[#0d1722] border border-[#00f5d4] text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.3)] hover:bg-[#131f28]'
                  : 'bg-gradient-to-r from-[#00f5d4] to-[#10b981] text-[#00382f] shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.7)] border border-[#26fedc] hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            <Wallet className="w-4 h-4" />
            <span>
              {wallet.isConnected
                ? `${wallet.balance.toFixed(2)} SOL · ${wallet.address?.substring(0, 4)}...${wallet.address?.slice(-4)}`
                : 'CONNECT SOLANA'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM / SECONDARY NAV STRIP */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 bg-[#080b0f]/95 border-t border-[#3a4a46]/30 overflow-x-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-1 rounded text-[11px] font-tech uppercase ${currentScreen === 'home' ? 'text-[#00f5d4] font-bold' : 'text-[#83948f]'}`}
        >
          HOME
        </button>
        <button
          onClick={() => onNavigate('arena')}
          className={`px-3 py-1 rounded text-[11px] font-tech uppercase ${currentScreen === 'arena' ? 'text-[#00f5d4] font-bold' : 'text-[#83948f]'}`}
        >
          ARENA
        </button>
        <button
          onClick={() => onNavigate('arena', 'staked')}
          className="px-3 py-1 rounded text-[11px] font-tech uppercase text-[#f59e0b] font-bold flex items-center gap-1"
        >
          <Flame className="w-3 h-3" /> BET SOL
        </button>
        <button
          onClick={() => onNavigate('leaderboard')}
          className={`px-3 py-1 rounded text-[11px] font-tech uppercase ${currentScreen === 'leaderboard' ? 'text-[#00f5d4] font-bold' : 'text-[#83948f]'}`}
        >
          RANKS
        </button>
        <button
          onClick={() => onNavigate('invite')}
          className={`px-3 py-1 rounded text-[11px] font-tech uppercase ${currentScreen === 'invite' ? 'text-[#a3e635] font-bold' : 'text-[#83948f]'}`}
        >
          INVITE
        </button>
      </div>
    </header>
  );
};
