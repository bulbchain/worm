import React, { useState } from 'react';
import { ScreenType, WalletState } from '../types';
import { ArenaCanvas } from './ArenaCanvas';
import { sounds } from '../audio';
import {
  Shuffle,
  Compass,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Shield,
  Coins,
  Share2,
  Users,
  Flame,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType, subMode?: 'free' | 'staked') => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
  playerCallsign: string;
  setPlayerCallsign: (callsign: string) => void;
  leaderboard: Array<{
    rank: number;
    callsign: string;
    species: string;
    bioMass: number;
    takedowns: number;
    solBounty: number;
    winLossRatio: string;
    status: string;
    isPlayer?: boolean;
  }>;
  combatLogs: Array<{
    id: string;
    killer: string;
    victim: string;
    method: string;
    bioMassReaped: number;
    timeAgo: string;
  }>;
  onScoreUpdate: (score: number) => void;
  onKillsUpdate: (kills: number) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  wallet,
  onOpenWalletModal,
  playerCallsign,
  setPlayerCallsign,
  leaderboard,
  combatLogs,
  onScoreUpdate,
  onKillsUpdate,
}) => {
  const [selectedMode, setSelectedMode] = useState<'free' | 'staked'>('free');
  const [selectedWager, setSelectedWager] = useState<number>(0.5);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sampleCallsigns = [
    'NARKY_PRIME',
    'SUB_VIPER',
    'CHITIN_LORD',
    'NITRO_CENTIPEDE',
    'RAD_BEETLE',
    'SPORE_VIPER',
    'CYBER_WORM_X',
    'VOID_SLUG',
  ];

  const handleRandomizeCallsign = () => {
    sounds.playBeep(640);
    const pick = sampleCallsigns[Math.floor(Math.random() * sampleCallsigns.length)];
    setPlayerCallsign(pick);
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?ref=SUB_7792`
    : 'https://narky.game/?ref=SUB_7792';

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopiedShare(true);
    sounds.playBeep(750);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: HERO & LIVE SOIL ARENA */}
      <section className="relative w-full overflow-hidden pt-6 pb-12 lg:pb-16 px-4 md:px-8 flex flex-col items-center justify-center">
        {/* Ambient Subterranean Lighting Radials */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-gradient-to-b from-[#10b981]/15 via-[#00f5d4]/10 to-transparent blur-[120px] opacity-90 rounded-full" />
          <div className="absolute top-1/3 -left-48 w-[450px] h-[450px] bg-[#ec4899]/10 blur-[130px] rounded-full" />
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-[#a3e635]/10 blur-[140px] rounded-full" />
        </div>

        {/* Hero Title & Tagline */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#131a22]/90 border border-[#00f5d4]/30 text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.2)] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
            <span className="font-tech uppercase tracking-widest text-[10px]">
              CYBER-SUBTERRANEAN BIOSYSTEM // SECTOR SUB-09
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#d7fff3] via-[#00f5d4] to-[#a3e635] drop-shadow-[0_0_40px_rgba(0,245,212,0.55)] font-black select-none">
            NARKY
          </h1>

          <p className="font-display text-lg md:text-xl text-[#b9cac4] italic font-medium tracking-wide mt-1">
            Feed on Light · Outgrow the Dark
          </p>

          <div className="flex items-center gap-3 mt-2 font-tech text-xs text-[#83948f]">
            <span>
              BURROW DEPTH: <strong className="text-[#00f5d4]">-420M</strong>
            </span>
            <span>•</span>
            <span>
              ORGANIC SUBSTRATE: <strong className="text-[#a3e635]">LEVEL 9 NITROGEN</strong>
            </span>
          </div>
        </div>

        {/* Dual Layout: Subterranean Terminal + Live Soil Matrix Canvas */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Specimen Control Terminal (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#0d131a]/95 border border-[#00f5d4]/25 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col gap-4">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-[#3a4a46]/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] animate-pulse" />
                  <span className="font-tech text-xs text-[#00f5d4] font-bold tracking-widest uppercase">
                    SOIL BURROW TERMINAL
                  </span>
                </div>
                <span className="font-tech text-[#83948f] text-[10px] bg-[#05080c] px-2 py-0.5 rounded border border-[#3a4a46]/40">
                  SUBTERRA_NET: 18MS
                </span>
              </div>

              {/* Specimen Callsign Input with Randomizer */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-tech text-[#b9cac4] text-[10px] uppercase tracking-wider">
                  <span>BURROWING SPECIMEN CALLSIGN</span>
                  <span className="text-[#00f5d4]">SPECIES: CYBER-WORM</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="pilot-callsign-input"
                    type="text"
                    maxLength={16}
                    value={playerCallsign}
                    onChange={(e) => setPlayerCallsign(e.target.value.toUpperCase())}
                    className="w-full bg-[#05080c] border border-[#00f5d4]/30 text-[#00f5d4] font-tech text-sm px-4 py-3 rounded-lg outline-none focus:border-[#00f5d4] focus:ring-1 focus:ring-[#00f5d4] transition-all uppercase placeholder-slate-600 shadow-inner"
                    placeholder="ENTER CALLSIGN..."
                  />
                  <button
                    id="randomize-callsign-btn"
                    type="button"
                    onClick={handleRandomizeCallsign}
                    title="Randomize Callsign"
                    className="absolute right-2 px-2.5 py-1 rounded bg-[#131a22] border border-[#00f5d4]/30 hover:bg-[#00f5d4] hover:text-[#00382f] text-[#00f5d4] transition-all text-xs flex items-center gap-1 font-tech cursor-pointer"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span className="text-[10px]">RND</span>
                  </button>
                </div>
              </div>

              {/* Mode Selector Tabs (Play Free vs Bet with SOL) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-tech text-[#b9cac4] text-[10px] uppercase tracking-wider">
                  CHOOSE BURROW PROTOCOL
                </label>
                <div className="grid grid-cols-2 gap-2" id="mode-selector">
                  <button
                    id="mode-free-tab"
                    type="button"
                    onClick={() => {
                      setSelectedMode('free');
                      sounds.playBeep(520);
                    }}
                    className={`flex flex-col text-left p-3 rounded-xl transition-all cursor-pointer ${
                      selectedMode === 'free'
                        ? 'bg-[#00f5d4]/15 border border-[#00f5d4] text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.15)]'
                        : 'bg-[#05080c] border border-[#3a4a46]/60 text-[#b9cac4] hover:text-white hover:border-[#00f5d4]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display text-xs uppercase font-bold text-[#00f5d4]">
                        PLAY FREE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
                    </div>
                    <span className="font-tech text-[9px] text-[#b9cac4] mt-1 leading-tight">
                      Instant spawn · Viral unlock · Daily glory
                    </span>
                  </button>

                  <button
                    id="mode-staked-tab"
                    type="button"
                    onClick={() => {
                      setSelectedMode('staked');
                      sounds.playBeep(640);
                    }}
                    className={`flex flex-col text-left p-3 rounded-xl transition-all cursor-pointer ${
                      selectedMode === 'staked'
                        ? 'bg-[#f59e0b]/15 border border-[#f59e0b] text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-[#05080c] border border-[#3a4a46]/60 text-[#b9cac4] hover:text-white hover:border-[#f59e0b]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display text-xs uppercase font-bold text-[#f59e0b]">
                        BET WITH SOL
                      </span>
                      <Coins className="w-3.5 h-3.5 text-[#f59e0b]" />
                    </div>
                    <span className="font-tech text-[9px] text-[#83948f] mt-1 leading-tight">
                      0.1 - 2.5 SOL · Devour rivals · Extract loot
                    </span>
                  </button>
                </div>
              </div>

              {/* Mode Details Box */}
              <div className="p-3 rounded-xl bg-[#05080c] border border-[#00f5d4]/20 text-[#b9cac4] flex items-start gap-2">
                {selectedMode === 'free' ? (
                  <>
                    <Zap className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed font-display">
                      Spawn inside Sector SUB-09. Slither through dark root veins, feed on photon pods, and cut down rival centipedes and beetles for the daily leaderboard crown.
                    </span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed font-display text-[#fde047]">
                      High-Stakes Escrow: Deposit SOL into smart contract. Harvest bio-mass to multiply your payout up to 10x, then extract before being ambushed!
                    </span>
                  </>
                )}
              </div>

              {/* Launch / Burrow Button */}
              <button
                id="hero-launch-arena-btn"
                type="button"
                onClick={() => {
                  sounds.playBoostSound();
                  onNavigate('arena', selectedMode);
                }}
                className="w-full py-4 mt-1 rounded-xl bg-gradient-to-r from-[#00f5d4] via-[#10b981] to-[#a3e635] text-[#00382f] font-display text-sm font-black tracking-widest uppercase shadow-[0_0_25px_rgba(0,245,212,0.5)] hover:shadow-[0_0_40px_rgba(0,245,212,0.85)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#26fedc] cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <span>BURROW INTO SOIL ARENA</span>
              </button>
            </div>

            {/* Flight Directives Footer */}
            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 bg-[#05080c]/60 p-3 rounded-lg flex flex-col gap-1 font-tech">
              <span className="text-[9px] text-[#00f5d4] font-bold tracking-wider uppercase">
                SUBTERRANEAN STEERING:
              </span>
              <p className="text-[10px] text-[#b9cac4] leading-relaxed">
                Move cursor/touch to steer creature · Hold Click/Space to accelerate · Never strike another creature's toxic trail!
              </p>
            </div>
          </div>

          {/* RIGHT: Interactive Live Simulated Soil Matrix Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <ArenaCanvas
              callsign={playerCallsign}
              onScoreUpdate={onScoreUpdate}
              onKillsUpdate={onKillsUpdate}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              isStakedMode={selectedMode === 'staked'}
              stakedWager={selectedWager}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: DUAL LAUNCH TERMINALS (PLAY FREE vs BET WITH SOL) */}
      <section className="w-full py-16 px-4 md:px-8 bg-[#05080c]/90 border-y border-[#00f5d4]/15" id="clearance-matrix">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-[#00f5d4] font-tech text-[11px] uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
              <span>BURROWING CLEARANCE MATRIX</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white font-black tracking-wider">
              PLAY FREE <span className="text-[#83948f]">VS</span> BET WITH SOL
            </h2>
            <p className="font-display text-sm text-[#b9cac4] mt-2">
              Unlock instant subterranean access by spreading the spore matrix, or stake SOL in high-stakes non-custodial soil hunting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* CARD 1: PLAY FREE WITH VIRAL SHARE UNLOCK */}
            <div className="relative rounded-2xl p-6 lg:p-8 bg-[#0a0f16]/95 border border-[#00f5d4]/30 backdrop-blur-xl flex flex-col justify-between shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f5d4] to-[#10b981] shadow-[0_0_15px_#00f5d4]" />
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-tech text-[10px] text-[#00f5d4] px-3 py-1 bg-[#05080c] rounded-lg border border-[#00f5d4]/30 font-bold uppercase">
                    TIER 01 // VIRAL SPORE PASS
                  </span>
                  <span className="flex items-center gap-1.5 font-tech text-[11px] text-[#10b981]">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    FREE LIFETIME UNLOCK
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl uppercase text-white font-black">
                    PLAY FREE ARENA
                  </h3>
                  <p className="font-tech text-xs text-[#00f5d4] tracking-wider mt-1">
                    SHARE WEBSITE URL TO UNLOCK FREE MODE
                  </p>
                </div>

                <p className="font-display text-sm text-[#b9cac4] leading-relaxed">
                  Zero wallet connection needed. Share the NARKY link with fellow gamers or social channels to immediately unlock unlimited free burrow runs, test worm maneuvers, and battle for the daily leaderboard crown.
                </p>

                {/* Interactive Viral Share Box */}
                <div className="p-4 rounded-xl bg-[#05080c] border border-[#00f5d4]/30 flex flex-col gap-3 font-tech">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#83948f] uppercase font-bold">
                      YOUR UNIQUE SPORE INVITATION LINK
                    </span>
                    <span className="text-[10px] text-[#10b981] font-bold flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> UNLOCKED
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="w-full bg-[#0d131a] border border-[#3a4a46]/60 text-[#00f5d4] font-tech text-xs px-3 py-2 rounded-lg outline-none select-all"
                    />
                    <button
                      id="card-copy-share-btn"
                      onClick={handleCopyShareLink}
                      className="px-3.5 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#26fedc] text-[#00382f] font-tech text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-[0_0_12px_rgba(0,245,212,0.3)] cursor-pointer"
                    >
                      {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedShare ? 'COPIED!' : 'COPY'}</span>
                    </button>
                  </div>

                  {/* Social Share Quick Links */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <a
                      href={`https://twitter.com/intent/tweet?text=Burrow%20deep%20into%20NARKY%20-%20The%20neon%20soil%20multiplayer%20arena.%20Feed%20on%20light,%20outgrow%20the%20dark!%20${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-[#131a22] hover:bg-[#1a232e] border border-[#3a4a46]/50 text-white font-tech text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#00f5d4]" />
                      <span>SHARE ON X</span>
                    </a>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Join%20NARKY%20cyberpunk%20soil%20arena!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-[#131a22] hover:bg-[#1a232e] border border-[#3a4a46]/50 text-white font-tech text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <Users className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>SHARE TELEGRAM</span>
                    </a>
                  </div>
                </div>

                {/* Free Mode Metric Pills */}
                <div className="grid grid-cols-2 gap-3 pt-1 font-tech text-xs">
                  <div className="p-3 bg-[#05080c] border border-[#3a4a46]/40 rounded-xl flex flex-col">
                    <span className="text-[#83948f] text-[10px]">ENTRY COST</span>
                    <span className="text-[#10b981] text-base font-bold">0.00 SOL / FREE</span>
                  </div>
                  <div className="p-3 bg-[#05080c] border border-[#3a4a46]/40 rounded-xl flex flex-col">
                    <span className="text-[#83948f] text-[10px]">RESPAWN INTERVAL</span>
                    <span className="text-white text-base font-bold">INSTANT (&lt;0.5s)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  id="spawn-free-cta-btn"
                  type="button"
                  onClick={() => onNavigate('arena', 'free')}
                  className="w-full py-3.5 rounded-xl bg-[#00f5d4]/20 hover:bg-[#00f5d4] text-[#00f5d4] hover:text-[#00382f] font-display text-xs font-black tracking-widest uppercase border border-[#00f5d4] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,245,212,0.2)] cursor-pointer"
                >
                  <span>SPAWN FREE RUN NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 2: BET WITH SOL (HIGH-STAKES ESCROW) */}
            <div
              className="relative rounded-2xl p-6 lg:p-8 bg-[#0a0f16]/95 border border-[#f59e0b]/40 backdrop-blur-xl flex flex-col justify-between shadow-2xl overflow-hidden group"
              id="staked-card"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f59e0b] to-[#ec4899] shadow-[0_0_15px_#f59e0b]" />
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-tech text-[10px] text-[#f59e0b] px-3 py-1 bg-[#05080c] rounded-lg border border-[#f59e0b]/30 font-bold uppercase">
                    TIER 02 // SUBTERRANEAN ESCROW
                  </span>
                  <span className="flex items-center gap-1.5 font-tech text-[11px] text-[#f59e0b]">
                    <Shield className="w-3.5 h-3.5" />
                    ESCROW VERIFIED ON SOLANA
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl uppercase text-white font-black">
                    BET WITH SOL
                  </h3>
                  <p className="font-tech text-xs text-[#f59e0b] tracking-wider mt-1">
                    HUNT RIVAL CREATURES · HARVEST BIO-MASS · EXTRACT SPOILS
                  </p>
                </div>

                <p className="font-display text-sm text-[#b9cac4] leading-relaxed">
                  Stake SOL into the non-custodial soil contract. Downed specimens release their accumulated vault value into glowing photon rings. Slither to quantum wormhole extraction roots to bank your spoils before you are ambushed.
                </p>

                {/* Wager Selector */}
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#05080c] border border-[#f59e0b]/30 font-tech">
                  <div className="flex justify-between text-[10px] text-[#83948f] uppercase font-bold">
                    <span>SELECT BURROW WAGER</span>
                    <span className="text-[#f59e0b]">PAYOUT MULTIPLIER: UP TO 10x</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[0.1, 0.5, 1.0, 2.5].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedWager(amt);
                          sounds.playBeep(480);
                        }}
                        className={`py-2 px-1 rounded-lg font-tech text-xs font-bold transition-all cursor-pointer ${
                          selectedWager === amt
                            ? 'bg-[#f59e0b]/20 border border-[#f59e0b] text-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                            : 'bg-[#131a22] border border-[#3a4a46]/50 text-white hover:border-[#f59e0b]'
                        }`}
                      >
                        {amt} SOL
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#83948f] mt-1 pt-2 border-t border-[#3a4a46]/40">
                    <span>PILOT BOUNTY POOL: <strong className="text-white">94%</strong></span>
                    <span>EXTRACTION FEE: <strong className="text-white">2.5%</strong></span>
                  </div>
                </div>

                {/* Staked Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1 font-tech text-xs">
                  <div className="p-3 bg-[#05080c] border border-[#3a4a46]/40 rounded-xl flex flex-col">
                    <span className="text-[#83948f] text-[10px]">EXTRACTION WINDOW</span>
                    <span className="text-[#f59e0b] text-base font-bold">8.4 SECONDS</span>
                  </div>
                  <div className="p-3 bg-[#05080c] border border-[#3a4a46]/40 rounded-xl flex flex-col">
                    <span className="text-[#83948f] text-[10px]">PROGRAM ID</span>
                    <span className="text-[#00f5d4] text-base font-bold truncate">NRKY...99SOL</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  id="bet-sol-cta-btn"
                  type="button"
                  onClick={() => {
                    if (!wallet.isConnected) {
                      onOpenWalletModal();
                    } else {
                      onNavigate('arena', 'staked');
                    }
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ec4899] text-[#000000] font-display text-xs font-black tracking-widest uppercase hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 border border-[#fde047] cursor-pointer"
                >
                  <Coins className="w-4 h-4" />
                  <span>
                    {wallet.isConnected
                      ? `STAKE ${selectedWager} SOL & BURROW`
                      : 'CONNECT WALLET & STAKE SOL'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BIOLUMINESCENT SOIL CREATURE MATRIX (SPECIES SHOWCASE) */}
      <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8" id="species-matrix">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#00f5d4] mb-1 font-tech text-[11px] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
              <span>SUBTERRANEAN BIOME CATALOGUE</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white font-black tracking-wider">
              SOIL CREATURE MATRIX
            </h2>
          </div>
          <p className="font-display text-sm text-[#b9cac4] max-w-md">
            Each subterranean specimen mutates unique bioluminescent organs, burrowing velocities, and lethal perimeter exhausts.
          </p>
        </div>

        {/* 5 Species Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Creature 1: CYBER-WORM */}
          <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#00f5d4]/30 p-6 flex flex-col justify-between hover:border-[#00f5d4] transition-all group shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-tech text-[10px] text-[#00f5d4] px-2.5 py-1 bg-[#05080c] rounded-lg border border-[#00f5d4]/30 font-bold uppercase">
                  SPECIMEN 01 // AGILE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] shadow-[0_0_8px_#00f5d4]" />
              </div>
              <div className="h-32 rounded-xl bg-[#05080c] border border-[#00f5d4]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00f5d4]/10 to-transparent" />
                <svg className="w-36 h-24" viewBox="0 0 160 100">
                  <path d="M 20 70 C 40 20, 80 80, 110 35 C 130 10, 145 50, 150 45" fill="none" stroke="#00f5d4" strokeLinecap="round" strokeWidth="8" />
                  <path d="M 20 70 C 40 20, 80 80, 110 35 C 130 10, 145 50, 150 45" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="2.5" />
                  <circle cx="150" cy="45" fill="#ffffff" r="6" />
                  <circle cx="150" cy="45" fill="#00f5d4" r="3" />
                </svg>
              </div>
              <h3 className="font-display text-xl uppercase text-white font-black">CYBER-WORM</h3>
              <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                The baseline subterranean apex predator. Extreme turning inertia with segmented neon bioluminescent rings that trap reckless burrowers in high-speed spirals.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
              <span className="text-[#83948f]">TURNING SPEED</span>
              <span className="text-[#00f5d4] font-bold">9.4 RAD/S</span>
            </div>
          </div>

          {/* Creature 2: TITAN CENTIPEDE */}
          <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#a3e635]/30 p-6 flex flex-col justify-between hover:border-[#a3e635] transition-all group shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-tech text-[10px] text-[#a3e635] px-2.5 py-1 bg-[#05080c] rounded-lg border border-[#a3e635]/30 font-bold uppercase">
                  SPECIMEN 02 // HEAVY
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
              </div>
              <div className="h-32 rounded-xl bg-[#05080c] border border-[#a3e635]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#a3e635]/10 to-transparent" />
                <svg className="w-36 h-24" viewBox="0 0 160 100">
                  <path d="M 15 50 Q 50 30, 80 60 T 145 50" fill="none" stroke="#a3e635" strokeLinecap="round" strokeWidth="10" />
                  <path d="M 30 40 L 25 25 M 50 38 L 45 22 M 70 52 L 65 38 M 90 58 L 85 75 M 110 52 L 105 70 M 130 48 L 125 66" stroke="#a3e635" strokeLinecap="round" strokeWidth="3" />
                  <circle cx="145" cy="50" fill="#ffffff" r="7" />
                  <circle cx="145" cy="50" fill="#a3e635" r="4" />
                </svg>
              </div>
              <h3 className="font-display text-xl uppercase text-white font-black">TITAN CENTIPEDE</h3>
              <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                Massive segmented chitin plated legs. Unlocks toxic burst overdrive by dumping stored bio-mass, leaving a deadly perimeter of glowing venomous residue.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
              <span className="text-[#83948f]">BURST OVERDRIVE</span>
              <span className="text-[#a3e635] font-bold">+180% VELOCITY</span>
            </div>
          </div>

          {/* Creature 3: PHOSPHOR BEETLE */}
          <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#ec4899]/30 p-6 flex flex-col justify-between hover:border-[#ec4899] transition-all group shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-tech text-[10px] text-[#ec4899] px-2.5 py-1 bg-[#05080c] rounded-lg border border-[#ec4899]/30 font-bold uppercase">
                  SPECIMEN 03 // ARMORED
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899] shadow-[0_0_8px_#ec4899]" />
              </div>
              <div className="h-32 rounded-xl bg-[#05080c] border border-[#ec4899]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ec4899]/10 to-transparent" />
                <svg className="w-36 h-24" viewBox="0 0 160 100">
                  <ellipse cx="80" cy="50" fill="none" rx="30" ry="20" stroke="#ec4899" strokeWidth="5" />
                  <line stroke="#ffffff" strokeWidth="3" x1="80" x2="80" y1="30" y2="70" />
                  <circle cx="115" cy="50" fill="#ec4899" r="9" />
                  <circle cx="115" cy="50" fill="#ffffff" r="4" />
                  <path d="M 60 35 L 45 20 M 80 30 L 80 15 M 100 35 L 115 20 M 60 65 L 45 80 M 80 70 L 80 85 M 100 65 L 115 80" stroke="#ec4899" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="font-display text-xl uppercase text-white font-black">PHOSPHOR BEETLE</h3>
              <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                Heavily armored carapace that detonates blinding light spores upon receiving glancing contact, absorbing kinetic impacts and disorienting stalkers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
              <span className="text-[#83948f]">CHITIN ARMOR</span>
              <span className="text-[#ec4899] font-bold">1 GLANCE SHIELD</span>
            </div>
          </div>

          {/* Creature 4: RAD-SLUG */}
          <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#00f5d4]/30 p-6 flex flex-col justify-between hover:border-[#00f5d4] transition-all group shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-tech text-[10px] text-[#00f5d4] px-2.5 py-1 bg-[#05080c] rounded-lg border border-[#00f5d4]/30 font-bold uppercase">
                  SPECIMEN 04 // TOXIC
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] shadow-[0_0_8px_#00f5d4]" />
              </div>
              <div className="h-32 rounded-xl bg-[#05080c] border border-[#00f5d4]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00f5d4]/10 to-transparent" />
                <svg className="w-36 h-24" viewBox="0 0 160 100">
                  <path d="M 25 65 Q 60 75, 95 60 Q 125 50, 140 45" fill="none" stroke="#00f5d4" strokeLinecap="round" strokeWidth="12" />
                  <circle cx="140" cy="45" fill="#ffffff" r="5" />
                  <circle cx="35" cy="65" fill="#a3e635" r="3" />
                  <circle cx="55" cy="70" fill="#00f5d4" r="4" />
                  <circle cx="80" cy="65" fill="#10b981" r="3.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl uppercase text-white font-black">RAD-SLUG</h3>
              <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                Secretes persistent bioluminescent irradiated slime. Enemy creatures crossing this slippery wake suffer 45% deceleration and slow bio-mass leakage.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
              <span className="text-[#83948f]">SLIME PERSISTENCE</span>
              <span className="text-[#00f5d4] font-bold">12.0 SECONDS</span>
            </div>
          </div>

          {/* Creature 5: SHADOW MILLIPEDE & VIPER */}
          <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#f59e0b]/30 p-6 flex flex-col justify-between hover:border-[#f59e0b] transition-all group shadow-xl md:col-span-2 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-tech text-[10px] text-[#f59e0b] px-2.5 py-1 bg-[#05080c] rounded-lg border border-[#f59e0b]/30 font-bold uppercase">
                  SPECIMEN 05 // DEEP-AMBUSH VIPER
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
              </div>
              <div className="h-32 rounded-xl bg-[#05080c] border border-[#f59e0b]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f59e0b]/10 via-[#ec4899]/5 to-transparent" />
                <svg className="w-72 h-24" viewBox="0 0 280 100">
                  <path d="M 20 50 C 60 20, 90 80, 140 40 C 180 10, 220 70, 260 45" fill="none" stroke="#f59e0b" strokeLinecap="round" strokeWidth="8" />
                  <path d="M 20 50 C 60 20, 90 80, 140 40 C 180 10, 220 70, 260 45" fill="none" stroke="#ec4899" strokeLinecap="round" strokeWidth="2.5" />
                  <circle cx="260" cy="45" fill="#ffffff" r="7" />
                  <circle cx="260" cy="45" fill="#f59e0b" r="3.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl uppercase text-white font-black">
                SHADOW MILLIPEDE &amp; VIPER
              </h3>
              <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                The deepest burrower in Sector SUB-09. Can submerge beneath other trails for 2.2 seconds to ambush unwary apex worms from absolute darkness.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
              <span className="text-[#83948f]">SUBTERRANEAN CAMOUFLAGE</span>
              <span className="text-[#f59e0b] font-bold">2.2s STEALTH DIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TACTICAL SUBTERRANEAN DYNAMICS */}
      <section className="w-full py-16 px-4 md:px-8 bg-[#05080c]/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#10b981] mb-1 font-tech text-[11px] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>BURROW SURVIVAL PROTOCOLS</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl uppercase text-white font-black tracking-wider">
                TACTICAL SUBTERRANEAN DYNAMICS
              </h2>
            </div>
            <p className="font-display text-sm text-[#b9cac4] max-w-md">
              Mastering soil friction and neon trails separates apex subterranean champions from decaying organic fertilizer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Ingestion */}
            <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#00f5d4]/30 p-6 flex flex-col justify-between hover:border-[#00f5d4] transition-all shadow-xl">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#05080c] border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.3)]">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="font-tech text-[#00f5d4] text-[10px] tracking-widest font-bold">
                  01 // INGESTION
                </span>
                <h3 className="font-display text-lg uppercase text-white font-black">
                  FEED ON LIGHT
                </h3>
                <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                  Absorb ambient subterranean photon pods and glowing root spores (+15 Bio-Mass per spore). Each harvested pod expands your segmented worm trail and tightens turning inertia.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
                <span className="text-[#83948f]">TRAIL LENGTH BOOST</span>
                <span className="text-[#00f5d4] font-bold">+1 SEGMENT / POD</span>
              </div>
            </div>

            {/* Bento Card 2: Interception */}
            <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#ec4899]/30 p-6 flex flex-col justify-between hover:border-[#ec4899] transition-all shadow-xl">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#05080c] border border-[#ec4899]/30 flex items-center justify-center text-[#ec4899] shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="font-tech text-[#ec4899] text-[10px] tracking-widest font-bold">
                  02 // INTERCEPTION
                </span>
                <h3 className="font-display text-lg uppercase text-white font-black">
                  CUT &amp; SHATTER
                </h3>
                <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                  Maneuver your lethal neon trail directly across an enemy creature's burrow path. Colliding specimens instantly shatter into rich clusters of floating bio-mass for instant feast.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
                <span className="text-[#83948f]">EXOSKELETON CRUSH</span>
                <span className="text-[#ec4899] font-bold">100% FATAL</span>
              </div>
            </div>

            {/* Bento Card 3: Extraction */}
            <div className="rounded-2xl bg-[#0a0f16]/90 border border-[#f59e0b]/30 p-6 flex flex-col justify-between hover:border-[#f59e0b] transition-all shadow-xl">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#05080c] border border-[#f59e0b]/30 flex items-center justify-center text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="font-tech text-[#f59e0b] text-[10px] tracking-widest font-bold">
                  03 // EXTRACTION
                </span>
                <h3 className="font-display text-lg uppercase text-white font-black">
                  ESCAPE WITH LOOT
                </h3>
                <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                  In Bet with SOL runs, holding top mass turns your radar blip into the arena target. Race toward spontaneous quantum root wormholes to safely withdraw your bounty into your wallet.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
                <span className="text-[#83948f]">WORMHOLE HOLD TIME</span>
                <span className="text-[#f59e0b] font-bold">8.4 SECONDS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE LEADERBOARDS & SUBTERRANEAN COMBAT LOG */}
      <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8" id="leaderboards">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#00f5d4] mb-1 font-tech text-[11px] uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>SECTOR SUB-09 PILOT REGISTRY</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white font-black tracking-wider">
              DEEP SOIL LEADERBOARDS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('leaderboard')}
            className="text-xs font-tech text-[#00f5d4] hover:underline flex items-center gap-1"
          >
            <span>VIEW FULL STANDINGS &amp; EPOCH STATS</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Pilots Leaderboard Table (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#0a0f16]/95 border border-[#00f5d4]/20 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#0d131a] border-b border-[#3a4a46]/40 flex items-center justify-between font-tech">
              <span className="text-xs text-[#00f5d4] font-bold uppercase">
                APEX UNDERGROUND SPECIMENS
              </span>
              <span className="text-[10px] text-[#83948f]">EPOCH 12 // SECTOR SUB-09</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-tech text-xs">
                <thead>
                  <tr className="bg-[#05080c]/80 text-[#83948f] uppercase text-[10px] tracking-wider border-b border-[#3a4a46]/30">
                    <th className="p-3.5">RANK</th>
                    <th className="p-3.5">CALLSIGN</th>
                    <th className="p-3.5">SPECIES</th>
                    <th className="p-3.5">BIO-MASS</th>
                    <th className="p-3.5">TAKEDOWNS</th>
                    <th className="p-3.5">SOL BOUNTY</th>
                    <th className="p-3.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3a4a46]/20">
                  {leaderboard.slice(0, 5).map((row) => (
                    <tr
                      key={row.rank + row.callsign}
                      className={`hover:bg-[#131a22]/50 transition-colors ${
                        row.isPlayer ? 'bg-[#00f5d4]/10 border-t border-[#00f5d4]/30' : ''
                      }`}
                    >
                      <td className="p-3.5 font-bold text-[#f59e0b]">
                        #{row.rank.toString().padStart(2, '0')}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              row.rank === 1 ? 'bg-[#ec4899] shadow-[0_0_6px_#ec4899]' : 'bg-[#00f5d4]'
                            }`}
                          />
                          <span className={`font-bold ${row.isPlayer ? 'text-[#00f5d4]' : 'text-white'}`}>
                            {row.callsign}
                          </span>
                          {row.isPlayer && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#00f5d4] text-[#00382f] rounded font-black">
                              YOU
                            </span>
                          )}
                          {row.rank === 1 && !row.isPlayer && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#ec4899]/20 text-[#ec4899] rounded font-bold">
                              APEX
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-[#b9cac4]">{row.species}</td>
                      <td className="p-3.5 font-bold text-[#00f5d4]">
                        {row.bioMass.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-white font-bold">{row.takedowns} SPECIMENS</td>
                      <td className="p-3.5 text-[#f59e0b] font-bold">{row.solBounty.toFixed(2)} SOL</td>
                      <td className="p-3.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            row.status === 'APEX PREDATOR'
                              ? 'bg-[#ec4899]/20 text-[#ec4899]'
                              : row.status === 'EXTRACTING'
                              ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                              : 'bg-[#00f5d4]/20 text-[#00f5d4]'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Subterranean Combat Log (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0a0f16]/95 border border-[#ec4899]/30 p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3a4a46]/40 font-tech">
                <span className="text-xs text-[#ec4899] uppercase font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#ec4899]" />
                  <span>SUB-TERRA COMBAT LOG</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-ping" />
              </div>

              <div className="flex flex-col gap-2.5">
                {combatLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-[#05080c] border border-[#3a4a46]/30 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-tech">
                      <span className="text-[#ec4899] font-bold">{log.killer}</span>
                      <span className="text-[#83948f] text-[9px]">{log.timeAgo}</span>
                    </div>
                    <span className="text-xs text-[#b9cac4] font-display">
                      Shattered <strong className="text-white">{log.victim}</strong> with {log.method}
                    </span>
                    <span className="text-[10px] text-[#00f5d4] font-tech font-bold">
                      +{log.bioMassReaped} BIO-MASS REAPED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 bg-[#05080c] p-2.5 rounded-lg flex items-center justify-between text-[10px] font-tech text-[#83948f]">
              <span>SUBTERRANEAN BIOSPHERE MASS</span>
              <span className="text-[#00f5d4] font-bold">1,492,800 LUMENS</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: READY TO BURROW? (CONVERTING CTA) */}
      <section className="relative w-full py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-t from-[#00f5d4]/20 via-[#10b981]/5 to-transparent blur-[120px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#131a22] border border-[#00f5d4]/40 text-[#00f5d4]">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
            <span className="font-tech text-[10px] tracking-widest uppercase font-bold">
              2,840 SPECIMENS IN SECTOR SUB-09
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-white font-black tracking-wider leading-none drop-shadow-[0_0_30px_rgba(0,245,212,0.4)]">
            READY TO BURROW?
          </h2>

          <p className="font-display text-base md:text-lg text-[#b9cac4] max-w-xl">
            Zero install, instant browser execution. Crawl into the neon depths, feed on luminous spores, and challenge underground legends.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
            <button
              id="cta-launch-narky-btn"
              type="button"
              onClick={() => onNavigate('arena')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f5d4] to-[#10b981] text-[#00382f] font-display text-sm font-black tracking-widest uppercase shadow-[0_0_30px_rgba(0,245,212,0.6)] hover:shadow-[0_0_45px_rgba(0,245,212,0.9)] hover:scale-105 transition-all flex items-center justify-center gap-2 border border-[#26fedc] cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span>LAUNCH NARKY ARENA</span>
            </button>

            <button
              id="cta-invite-btn"
              type="button"
              onClick={() => onNavigate('invite')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#0d131a] hover:bg-[#131a22] text-white font-tech text-xs tracking-widest uppercase border border-[#3a4a46]/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#00f5d4]" />
              <span>INVITE SQUAD</span>
            </button>
          </div>

          <p className="font-tech text-[#83948f] text-[10px] tracking-widest uppercase mt-2">
            WEBGL 2.0 BIOME · REAL-TIME WEBSOCKET SUBSURFACE · SOLANA VERIFIED
          </p>
        </div>
      </section>
    </div>
  );
};
