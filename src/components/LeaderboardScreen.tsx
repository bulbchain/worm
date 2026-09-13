import React, { useState } from 'react';
import { ScreenType, LeaderboardEntry, CombatLogEvent } from '../types';
import { sounds } from '../audio';
import {
  Trophy,
  Flame,
  ArrowRight,
  TrendingUp,
  Coins,
  Search,
} from 'lucide-react';

interface LeaderboardScreenProps {
  onNavigate: (screen: ScreenType, subMode?: 'free' | 'staked') => void;
  leaderboard: LeaderboardEntry[];
  combatLogs: CombatLogEvent[];
  playerCallsign: string;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  onNavigate,
  leaderboard,
  combatLogs,
  playerCallsign,
}) => {
  const [timeframe, setTimeframe] = useState<'epoch' | 'daily' | 'alltime'>('epoch');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'staked' | 'kills'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeaderboard = leaderboard.filter((entry) => {
    if (searchQuery && !entry.callsign.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (categoryFilter === 'staked') {
      return entry.solBounty > 0;
    }
    if (categoryFilter === 'kills') {
      return entry.takedowns >= 8;
    }
    return true;
  });

  const playerEntry = leaderboard.find((e) => e.isPlayer || e.callsign === playerCallsign);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] pt-6 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* HEADER WITH EPOCH TELEMETRY */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#00f5d4]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131a22] border border-[#00f5d4]/30 text-[#00f5d4] text-[10px] font-tech uppercase tracking-widest mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>GLOBAL SUBTERRANEAN MATRIX RANKINGS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl uppercase text-white font-black tracking-wider">
            DEEP SOIL LEADERBOARD
          </h1>
          <p className="font-display text-sm text-[#b9cac4] mt-1">
            Top surviving specimens ranked by ingested bio-mass, verified takedowns, and extracted SOL bounties.
          </p>
        </div>

        {/* Quick Launch CTA */}
        <button
          onClick={() => {
            sounds.playBoostSound();
            onNavigate('arena');
          }}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f5d4] to-[#10b981] text-[#00382f] font-display text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,245,212,0.5)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>CHALLENGE THE APEX</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* TOP METRIC CARDS (APEX PODIUM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Podium 1: APEX PREDATOR */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1f1020] to-[#0a0f16] border border-[#ec4899]/50 shadow-[0_0_25px_rgba(236,72,153,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-tech text-[10px] text-[#ec4899] font-bold uppercase tracking-wider bg-[#05080c] px-2.5 py-1 rounded border border-[#ec4899]/30">
              #01 APEX CHAMPION
            </span>
            <Trophy className="w-5 h-5 text-[#ec4899] animate-pulse" />
          </div>
          <div className="my-4">
            <h3 className="font-display text-2xl font-black text-white">
              {leaderboard[0]?.callsign || 'GRAVE_ROOT'}
            </h3>
            <span className="font-tech text-xs text-[#ec4899]">
              {leaderboard[0]?.species || 'TITAN CENTIPEDE'}
            </span>
          </div>
          <div className="pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
            <span className="text-[#83948f]">SOL BOUNTY</span>
            <span className="text-[#f59e0b] font-bold text-sm">
              {leaderboard[0]?.solBounty || 3.85} SOL
            </span>
          </div>
        </div>

        {/* Podium 2: SECOND SEED */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#131b24] to-[#0a0f16] border border-[#00f5d4]/40 shadow-[0_0_25px_rgba(0,245,212,0.12)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-tech text-[10px] text-[#00f5d4] font-bold uppercase tracking-wider bg-[#05080c] px-2.5 py-1 rounded border border-[#00f5d4]/30">
              #02 SUB-TERRA RUNNER
            </span>
            <span className="font-tech text-xs text-[#00f5d4] font-bold">SILVER</span>
          </div>
          <div className="my-4">
            <h3 className="font-display text-2xl font-black text-white">
              {leaderboard[1]?.callsign || 'NEON_SLUGGER'}
            </h3>
            <span className="font-tech text-xs text-[#00f5d4]">
              {leaderboard[1]?.species || 'RAD-SLUG'}
            </span>
          </div>
          <div className="pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
            <span className="text-[#83948f]">TAKEDOWNS</span>
            <span className="text-[#00f5d4] font-bold text-sm">
              {leaderboard[1]?.takedowns || 16} RIVALS
            </span>
          </div>
        </div>

        {/* Podium 3: YOUR STANDING */}
        <div className="p-5 rounded-2xl bg-[#0a0f16] border border-[#a3e635]/40 shadow-[0_0_25px_rgba(163,230,53,0.12)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-tech text-[10px] text-[#a3e635] font-bold uppercase tracking-wider bg-[#05080c] px-2.5 py-1 rounded border border-[#a3e635]/30">
              YOUR SPECIMEN RANK
            </span>
            <span className="font-tech text-xs text-[#a3e635] font-bold">ACTIVE PILOT</span>
          </div>
          <div className="my-4">
            <h3 className="font-display text-2xl font-black text-white">
              {playerEntry?.callsign || playerCallsign}
            </h3>
            <span className="font-tech text-xs text-[#a3e635]">
              RANK #{playerEntry?.rank || 5} · {playerEntry?.bioMass.toLocaleString() || 6465} BIO-MASS
            </span>
          </div>
          <div className="pt-3 border-t border-[#3a4a46]/40 flex items-center justify-between font-tech text-xs">
            <span className="text-[#83948f]">WIN / LOSS</span>
            <span className="text-[#a3e635] font-bold text-sm">
              {playerEntry?.winLossRatio || '7W / 1L (87%)'}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-[#0a0f16] border border-[#3a4a46]/50">
        {/* TIMEFRAME TABS */}
        <div className="flex items-center gap-1.5 font-tech text-xs bg-[#05080c] p-1 rounded-lg border border-[#3a4a46]/40">
          <button
            onClick={() => setTimeframe('epoch')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              timeframe === 'epoch'
                ? 'bg-[#00f5d4] text-[#00382f] shadow-[0_0_10px_rgba(0,245,212,0.3)]'
                : 'text-[#83948f] hover:text-white'
            }`}
          >
            EPOCH 12
          </button>
          <button
            onClick={() => setTimeframe('daily')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              timeframe === 'daily'
                ? 'bg-[#00f5d4] text-[#00382f] shadow-[0_0_10px_rgba(0,245,212,0.3)]'
                : 'text-[#83948f] hover:text-white'
            }`}
          >
            DAILY
          </button>
          <button
            onClick={() => setTimeframe('alltime')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              timeframe === 'alltime'
                ? 'bg-[#00f5d4] text-[#00382f] shadow-[0_0_10px_rgba(0,245,212,0.3)]'
                : 'text-[#83948f] hover:text-white'
            }`}
          >
            ALL-TIME
          </button>
        </div>

        {/* CATEGORY FILTER & SEARCH */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 font-tech text-xs bg-[#05080c] p-1 rounded-lg border border-[#3a4a46]/40">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                categoryFilter === 'all' ? 'bg-[#131a22] text-white font-bold' : 'text-[#83948f]'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setCategoryFilter('staked')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                categoryFilter === 'staked' ? 'bg-[#f59e0b]/20 text-[#f59e0b] font-bold' : 'text-[#83948f]'
              }`}
            >
              <Coins className="w-3 h-3" />
              SOL STAKED
            </button>
            <button
              onClick={() => setCategoryFilter('kills')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                categoryFilter === 'kills' ? 'bg-[#ec4899]/20 text-[#ec4899] font-bold' : 'text-[#83948f]'
              }`}
            >
              <Flame className="w-3 h-3" />
              HIGH TAKEDOWNS
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-[#83948f] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search callsign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#05080c] border border-[#3a4a46]/50 text-white font-tech text-xs pl-8 pr-3 py-1.5 rounded-lg outline-none focus:border-[#00f5d4] transition-all"
            />
          </div>
        </div>
      </div>

      {/* NEON GRID TABLE */}
      <div className="rounded-2xl bg-[#0a0f16]/95 border border-[#00f5d4]/25 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-tech text-xs">
            <thead>
              <tr className="bg-[#05080c] text-[#83948f] uppercase text-[10px] tracking-wider border-b border-[#3a4a46]/40">
                <th className="p-4">RANK</th>
                <th className="p-4">PILOT CALLSIGN</th>
                <th className="p-4">CREATURE SPECIES</th>
                <th className="p-4">BIO-MASS LUMENS</th>
                <th className="p-4">TAKEDOWNS</th>
                <th className="p-4">SOL BOUNTY</th>
                <th className="p-4">WIN / LOSS</th>
                <th className="p-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3a4a46]/20">
              {filteredLeaderboard.map((row) => (
                <tr
                  key={row.rank + row.callsign}
                  className={`hover:bg-[#131a22]/60 transition-colors ${
                    row.isPlayer || row.callsign === playerCallsign
                      ? 'bg-[#00f5d4]/10 border-l-4 border-l-[#00f5d4]'
                      : ''
                  }`}
                >
                  <td className="p-4 font-bold">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        row.rank === 1
                          ? 'bg-[#ec4899] text-black font-black'
                          : row.rank === 2
                          ? 'bg-[#00f5d4] text-[#00382f] font-black'
                          : row.rank === 3
                          ? 'bg-[#f59e0b] text-black font-black'
                          : 'text-[#83948f]'
                      }`}
                    >
                      #{row.rank.toString().padStart(2, '0')}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          row.rank === 1
                            ? 'bg-[#ec4899] shadow-[0_0_8px_#ec4899]'
                            : 'bg-[#00f5d4]'
                        }`}
                      />
                      <span
                        className={`font-bold ${
                          row.isPlayer || row.callsign === playerCallsign
                            ? 'text-[#00f5d4]'
                            : 'text-white'
                        }`}
                      >
                        {row.callsign}
                      </span>
                      {(row.isPlayer || row.callsign === playerCallsign) && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#00f5d4] text-[#00382f] rounded font-black">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-[#b9cac4]">{row.species}</td>

                  <td className="p-4 font-bold text-[#00f5d4] text-sm">
                    {row.bioMass.toLocaleString()}
                  </td>

                  <td className="p-4 text-white font-bold">{row.takedowns}</td>

                  <td className="p-4 text-[#f59e0b] font-bold">
                    {row.solBounty > 0 ? `${row.solBounty.toFixed(2)} SOL` : '—'}
                  </td>

                  <td className="p-4 text-[#83948f]">{row.winLossRatio}</td>

                  <td className="p-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        row.status === 'APEX PREDATOR'
                          ? 'bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/40'
                          : row.status === 'EXTRACTING'
                          ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40'
                          : 'bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/30'
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

      {/* COMBAT TICKER STRIP AT BOTTOM */}
      <div className="p-4 rounded-xl bg-[#0a0f16] border border-[#3a4a46]/50 flex flex-col md:flex-row items-center justify-between gap-4 font-tech text-xs">
        <div className="flex items-center gap-2 text-[#ec4899]">
          <Flame className="w-4 h-4 animate-pulse" />
          <span className="font-bold uppercase tracking-wider">LIVE HARVEST ACTIVITY:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[#b9cac4]">
          {combatLogs.slice(0, 3).map((log) => (
            <span key={log.id} className="truncate">
              <strong className="text-white">{log.killer}</strong> annihilated {log.victim} (
              <span className="text-[#00f5d4]">+{log.bioMassReaped}</span>)
            </span>
          ))}
        </div>
        <span className="text-[10px] text-[#83948f] shrink-0">AUTO-REFRESHING</span>
      </div>
    </div>
  );
};
