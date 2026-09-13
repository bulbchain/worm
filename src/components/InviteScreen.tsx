import React, { useState } from 'react';
import { ScreenType } from '../types';
import { sounds } from '../audio';
import {
  Users,
  Copy,
  Check,
  Share2,
  Sparkles,
  ArrowRight,
  Shield,
  Coins,
  Send,
  Zap,
} from 'lucide-react';

interface InviteScreenProps {
  onNavigate: (screen: ScreenType) => void;
  playerCallsign: string;
}

export const InviteScreen: React.FC<InviteScreenProps> = ({
  onNavigate,
  playerCallsign,
}) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'SUB_7792';
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/?ref=${referralCode}&squad=${encodeURIComponent(playerCallsign)}`
      : `https://narky.game/?ref=${referralCode}&squad=${encodeURIComponent(playerCallsign)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    sounds.playBeep(740);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetText = `Burrow with me into NARKY! Dark neon cyberpunk soil arena with underground worms, centipedes, and Solana battles. Feed on light, outgrow the dark! %23NARKY %23SolanaGaming`;

  const invitedSpecimens = [
    { callsign: 'NITRO_SPORE', status: 'IN MATCH (SECTOR-09)', earnedSol: '0.04 SOL', joined: '12m ago' },
    { callsign: 'GLOW_CENTI', status: 'BURROWING DEPTH -380M', earnedSol: '0.08 SOL', joined: '2h ago' },
    { callsign: 'RAD_CRAWLER_9', status: 'OFFLINE', earnedSol: '0.02 SOL', joined: '1d ago' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-80px)] pt-6 pb-16 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#131a22] border border-[#a3e635]/40 text-[#a3e635] text-[10px] font-tech uppercase tracking-widest mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>SPORE NETWORK VIRAL INVITATION MATRIX</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl uppercase text-white font-black tracking-wider">
          INVITE YOUR SQUAD
        </h1>
        <p className="font-display text-base text-[#b9cac4] mt-2 leading-relaxed">
          Share your subterranean burrow link with fellow pilots to enter live matches together, unlock exclusive glowing organism skins, and earn SOL rakeback on their arena stakes.
        </p>
      </div>

      {/* PRIMARY LINK SHARING CARD */}
      <div className="rounded-2xl p-6 sm:p-8 bg-[#0a0f16]/95 border border-[#a3e635]/40 shadow-[0_0_35px_rgba(163,230,53,0.15)] flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a3e635] via-[#00f5d4] to-[#10b981]" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl uppercase font-black text-white">
              YOUR LIVE MATCH INVITATION LINK
            </h2>
            <span className="font-tech text-xs text-[#a3e635]">
              PILOT CODE: {referralCode} // SQUAD LEADER: {playerCallsign}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] font-tech text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            MATCH LINK ACTIVE
          </span>
        </div>

        {/* Input & Copy Box */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-[#05080c] border border-[#a3e635]/40 text-[#a3e635] font-tech text-xs sm:text-sm px-4 py-3.5 rounded-xl outline-none select-all"
          />
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-[#121f00] font-tech text-xs font-black uppercase transition-all shadow-[0_0_15px_rgba(163,230,53,0.4)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED LINK!' : 'COPY URL'}</span>
          </button>
        </div>

        {/* Direct Social Channels Share */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-[#131a22] hover:bg-[#1a232e] border border-[#3a4a46]/50 hover:border-[#00f5d4] text-white font-tech text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#00f5d4]" />
            <span>SHARE ON X / TWITTER</span>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Join%20my%20NARKY%20soil%20arena%20squad!`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-[#131a22] hover:bg-[#1a232e] border border-[#3a4a46]/50 hover:border-[#10b981] text-white font-tech text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#10b981]" />
            <span>SHARE ON TELEGRAM</span>
          </a>

          <button
            onClick={handleCopy}
            className="p-3.5 rounded-xl bg-[#131a22] hover:bg-[#1a232e] border border-[#3a4a46]/50 hover:border-[#ec4899] text-white font-tech text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#ec4899]" />
            <span>COPY DISCORD / SQUAD LINK</span>
          </button>
        </div>
      </div>

      {/* SQUAD TIERS & RAKEBACK LADDER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1 */}
        <div className="p-5 rounded-2xl bg-[#0a0f16] border border-[#00f5d4]/40 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-2">
            <span className="font-tech text-[10px] text-[#00f5d4] uppercase font-bold bg-[#05080c] px-2.5 py-1 rounded w-fit border border-[#00f5d4]/30">
              TIER 1 // 1 PILOT
            </span>
            <h3 className="font-display text-lg uppercase font-black text-white">
              SPORE APPRENTICE
            </h3>
            <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
              Unlock unlimited Free Mode instant respawns and access to standard subterranean matrix sectors.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
            <span className="text-[#10b981] font-bold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> UNLOCKED
            </span>
            <span className="text-[#83948f]">STATUS</span>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="p-5 rounded-2xl bg-[#0a0f16] border border-[#f59e0b]/40 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-2">
            <span className="font-tech text-[10px] text-[#f59e0b] uppercase font-bold bg-[#05080c] px-2.5 py-1 rounded w-fit border border-[#f59e0b]/30">
              TIER 2 // 5 PILOTS
            </span>
            <h3 className="font-display text-lg uppercase font-black text-white">
              APEX HIVEMATE
            </h3>
            <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
              Earn <strong className="text-white">5% ongoing SOL rakeback</strong> on every soil stake deposited by your invited squad members.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
            <span className="text-[#f59e0b] font-bold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> 3 / 5 RECRUITED
            </span>
            <span className="text-[#83948f]">PROGRESS</span>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="p-5 rounded-2xl bg-[#0a0f16] border border-[#ec4899]/40 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-2">
            <span className="font-tech text-[10px] text-[#ec4899] uppercase font-bold bg-[#05080c] px-2.5 py-1 rounded w-fit border border-[#ec4899]/30">
              TIER 3 // 15 PILOTS
            </span>
            <h3 className="font-display text-lg uppercase font-black text-white">
              SUBTERRA SOVEREIGN
            </h3>
            <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
              Exclusive Legendary Cyber-Viper Phosphor Skin + direct 0.1 SOL bonus reward sent directly to your connected wallet.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
            <span className="text-[#ec4899] font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 3 / 15 RECRUITED
            </span>
            <span className="text-[#83948f]">PROGRESS</span>
          </div>
        </div>
      </div>

      {/* RECRUITED SPECIMENS LIST */}
      <div className="rounded-2xl bg-[#0a0f16]/95 border border-[#3a4a46]/50 overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0d131a] border-b border-[#3a4a46]/40 flex items-center justify-between font-tech">
          <span className="text-xs text-[#a3e635] font-bold uppercase">
            YOUR RECRUITED SQUAD MEMBERS (3 ACTIVE)
          </span>
          <span className="text-[10px] text-[#83948f]">TOTAL COMMISSIONS: 0.14 SOL</span>
        </div>

        <div className="divide-y divide-[#3a4a46]/20 font-tech text-xs">
          {invitedSpecimens.map((specimen) => (
            <div
              key={specimen.callsign}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#131a22]/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-bold text-white">{specimen.callsign}</span>
                <span className="text-[10px] text-[#83948f]">({specimen.joined})</span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-[#00f5d4]">{specimen.status}</span>
                <span className="text-[#f59e0b] font-bold">
                  +{specimen.earnedSol} REWARD
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LAUNCH SQUAD MATCH CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#131b24] to-[#0a0f16] border border-[#00f5d4]/30">
        <div>
          <h3 className="font-display text-lg uppercase font-black text-white">
            READY TO BURROW WITH YOUR SQUAD?
          </h3>
          <p className="font-display text-xs text-[#b9cac4]">
            Launch Sector SUB-09 and intercept enemy subterranean worms together in real-time.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playBoostSound();
            onNavigate('arena');
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f5d4] to-[#10b981] text-[#00382f] font-display text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,245,212,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <span>BURROW INTO ARENA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
