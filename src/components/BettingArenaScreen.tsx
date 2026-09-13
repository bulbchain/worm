import React, { useState, useEffect } from 'react';
import { ScreenType, WalletState } from '../types';
import { ArenaCanvas } from './ArenaCanvas';
import { useSolanaBettingContract } from '../hooks/useSolanaBettingContract';
import { sounds } from '../audio';
import {
  Coins,
  Shield,
  Zap,
  Flame,
  ArrowLeft,
  ExternalLink,
  Wallet,
  Clock,
  Sparkles,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface BettingArenaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
  playerCallsign: string;
  initialMode?: 'free' | 'staked';
  onScoreUpdate: (score: number) => void;
  onKillsUpdate: (kills: number) => void;
  onSolWon?: (sol: number) => void;
  deductSol: (amount: number) => boolean;
  creditSol: (amount: number) => void;
}

export const BettingArenaScreen: React.FC<BettingArenaScreenProps> = ({
  onNavigate,
  wallet,
  onOpenWalletModal,
  playerCallsign,
  initialMode = 'free',
  onScoreUpdate,
  onKillsUpdate,
  onSolWon,
  deductSol,
  creditSol,
}) => {
  const [currentMode, setCurrentMode] = useState<'free' | 'staked'>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  const {
    bettingState,
    setWager,
    stakeSol,
    startMatch,
    updateBioMassAndMultiplier,
    initiateExtraction,
    forfeitStake,
    resetBet,
  } = useSolanaBettingContract(deductSol, (payout) => {
    creditSol(payout);
    if (onSolWon) onSolWon(payout);
  });

  // Keep betting multiplier in sync with game score
  const handleScoreChange = (score: number) => {
    setCurrentScore(score);
    onScoreUpdate(score);
    if (currentMode === 'staked') {
      updateBioMassAndMultiplier(score);
    }
  };

  const handleStartStakedGame = async () => {
    if (!wallet.isConnected) {
      onOpenWalletModal();
      return;
    }
    const success = await stakeSol();
    if (success) {
      startMatch(currentScore);
    }
  };

  useEffect(() => {
    if (initialMode) {
      setCurrentMode(initialMode);
    }
  }, [initialMode]);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] pt-4 pb-12 px-4 md:px-6 max-w-7xl mx-auto flex flex-col gap-5">
      {/* ARENA HEADER STRIP */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0a0f16]/90 border border-[#00f5d4]/20 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 rounded-lg bg-[#131a22] hover:bg-[#1f2937] border border-[#3a4a46]/50 text-[#83948f] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-tech text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">EXIT TERMINAL</span>
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] animate-pulse" />
              <h1 className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-wider">
                SECTOR SUB-09 ARENA
              </h1>
              <span className="font-tech text-[10px] px-2 py-0.5 rounded bg-[#131a22] text-[#00f5d4] border border-[#00f5d4]/30">
                DEPTH: -420M
              </span>
            </div>
            <span className="font-tech text-xs text-[#83948f]">
              SPECIMEN: <strong className="text-[#00f5d4]">{playerCallsign}</strong>
            </span>
          </div>
        </div>

        {/* MODE TOGGLES & FULLSCREEN */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex bg-[#05080c] p-1 rounded-lg border border-[#3a4a46]/40 font-tech text-xs">
            <button
              onClick={() => {
                setCurrentMode('free');
                sounds.playBeep(520);
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer font-bold ${
                currentMode === 'free'
                  ? 'bg-[#00f5d4] text-[#00382f] shadow-[0_0_10px_rgba(0,245,212,0.4)]'
                  : 'text-[#83948f] hover:text-white'
              }`}
            >
              FREE PLAY
            </button>
            <button
              onClick={() => {
                setCurrentMode('staked');
                sounds.playBeep(640);
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer font-bold flex items-center gap-1 ${
                currentMode === 'staked'
                  ? 'bg-gradient-to-r from-[#f59e0b] to-[#ec4899] text-black shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                  : 'text-[#f59e0b] hover:text-white'
              }`}
            >
              <Coins className="w-3 h-3" />
              BET WITH SOL
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-2.5 rounded-lg bg-[#131a22] hover:bg-[#1f2937] border border-[#3a4a46]/50 text-[#83948f] hover:text-[#00f5d4] transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT GRID: GAME CANVAS (8 COLS) + BETTING HUD (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* GAME CANVAS */}
        <div className="lg:col-span-8 flex flex-col">
          <ArenaCanvas
            callsign={playerCallsign}
            onScoreUpdate={handleScoreChange}
            onKillsUpdate={onKillsUpdate}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            isStakedMode={currentMode === 'staked'}
            stakedWager={bettingState.wager}
          />
        </div>

        {/* BETTING / ARENA CONTROLS SIDEBAR */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {currentMode === 'staked' ? (
            /* STAKED SOL INTERFACE */
            <div className="rounded-2xl bg-[#0a0f16]/95 border border-[#f59e0b]/40 p-5 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#00f5d4]" />

              <div className="flex items-center justify-between border-b border-[#3a4a46]/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b]">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display text-sm font-bold uppercase text-white">
                      SOLANA BETTING ESCROW
                    </h2>
                    <span className="font-tech text-[10px] text-[#83948f]">
                      NON-CUSTODIAL VAULT CONTRACT
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                  {bettingState.status.toUpperCase()}
                </span>
              </div>

              {/* Wallet Balance Display */}
              <div className="p-3 rounded-xl bg-[#05080c] border border-[#3a4a46]/40 flex items-center justify-between">
                <div className="flex flex-col font-tech">
                  <span className="text-[10px] text-[#83948f] uppercase">YOUR WALLET BALANCE</span>
                  <span className="text-sm text-white font-bold">
                    {wallet.isConnected ? `${wallet.balance.toFixed(3)} SOL` : 'NOT CONNECTED'}
                  </span>
                </div>
                {!wallet.isConnected && (
                  <button
                    onClick={onOpenWalletModal}
                    className="px-2.5 py-1 rounded bg-[#00f5d4] hover:bg-[#26fedc] text-[#00382f] font-tech text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Wallet className="w-3 h-3" />
                    <span>CONNECT</span>
                  </button>
                )}
              </div>

              {/* Wager Selection Buttons */}
              <div className="flex flex-col gap-1.5 font-tech">
                <div className="flex justify-between text-[10px] text-[#83948f] uppercase font-bold">
                  <span>SELECT SOL WAGER</span>
                  <span className="text-[#f59e0b]">
                    STAKE: {bettingState.wager} SOL
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0.1, 0.5, 1.0, 2.5].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      disabled={bettingState.status === 'active' || bettingState.status === 'extracting'}
                      onClick={() => setWager(amt)}
                      className={`py-2 rounded-lg font-tech text-xs font-bold transition-all cursor-pointer disabled:opacity-50 ${
                        bettingState.wager === amt
                          ? 'bg-[#f59e0b] text-black shadow-[0_0_12px_rgba(245,158,11,0.5)] font-black'
                          : 'bg-[#131a22] border border-[#3a4a46]/50 text-white hover:border-[#f59e0b]'
                      }`}
                    >
                      {amt} SOL
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Multiplier & Potential Payout Gauge */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-[#131b24] to-[#0a0f16] border border-[#00f5d4]/30 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-tech text-xs text-[#b9cac4] uppercase">
                    HARVEST MULTIPLIER
                  </span>
                  <span className="font-display text-2xl font-black text-[#00f5d4] drop-shadow-[0_0_10px_rgba(0,245,212,0.6)]">
                    {bettingState.currentMultiplier.toFixed(2)}x
                  </span>
                </div>

                {/* Progress bar to 10x */}
                <div className="w-full h-2 rounded-full bg-[#05080c] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00f5d4] via-[#10b981] to-[#f59e0b] transition-all duration-300"
                    style={{
                      width: `${Math.min(100, ((bettingState.currentMultiplier - 1.0) / 9.0) * 100)}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#3a4a46]/40 font-tech">
                  <span className="text-[11px] text-[#83948f]">POTENTIAL BOUNTY:</span>
                  <span className="text-base text-[#f59e0b] font-bold">
                    {(bettingState.wager * bettingState.currentMultiplier).toFixed(3)} SOL
                  </span>
                </div>
              </div>

              {/* Action Buttons based on state */}
              {bettingState.status === 'idle' || bettingState.status === 'lost' ? (
                <button
                  onClick={handleStartStakedGame}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ec4899] text-black font-display text-sm font-black uppercase tracking-wider hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  <span>
                    {wallet.isConnected
                      ? `STAKE ${bettingState.wager} SOL & SPAWN`
                      : 'CONNECT WALLET TO STAKE'}
                  </span>
                </button>
              ) : bettingState.status === 'extracting' ? (
                /* EXTRACTION COUNTDOWN IN PROGRESS */
                <div className="p-4 rounded-xl bg-[#05080c] border border-[#f59e0b] flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-[#f59e0b] font-tech text-xs font-bold">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>QUANTUM EXTRACTION RUNNING...</span>
                  </div>
                  <span className="font-display text-4xl font-black text-white">
                    {bettingState.extractionTimeRemaining.toFixed(1)}s
                  </span>
                  <span className="font-tech text-[10px] text-[#83948f]">
                    Hold position! Do not collide with soil walls or worms!
                  </span>
                </div>
              ) : bettingState.status === 'cashed_out' ? (
                /* WINNING STATE */
                <div className="p-4 rounded-xl bg-[#00f5d4]/20 border border-[#00f5d4] flex flex-col items-center gap-2 text-center">
                  <Sparkles className="w-6 h-6 text-[#00f5d4] animate-bounce" />
                  <span className="font-display text-lg font-black text-white">
                    SPOILS SAFELY EXTRACTED!
                  </span>
                  <span className="font-tech text-sm text-[#00f5d4] font-bold">
                    +{(bettingState.wager * bettingState.currentMultiplier).toFixed(3)} SOL CREDITED
                  </span>
                  <button
                    onClick={resetBet}
                    className="w-full mt-2 py-2.5 rounded-lg bg-[#00f5d4] text-[#00382f] font-tech text-xs font-bold uppercase transition-all hover:bg-[#26fedc] cursor-pointer"
                  >
                    PLAY AGAIN
                  </button>
                </div>
              ) : (
                /* ACTIVE STAKED RUN */
                <div className="flex flex-col gap-2">
                  <button
                    onClick={initiateExtraction}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f5d4] to-[#10b981] text-[#00382f] font-display text-sm font-black uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>EXTRACT LOOT TO WALLET</span>
                  </button>
                  <button
                    onClick={forfeitStake}
                    className="w-full py-1.5 text-center text-xs font-tech text-[#83948f] hover:text-[#ec4899] transition-colors cursor-pointer"
                  >
                    ABORT RUN (FORFEIT STAKE)
                  </button>
                </div>
              )}

              {/* Protocol Guarantee Footnote */}
              <div className="flex items-start gap-2 pt-2 border-t border-[#3a4a46]/40 font-tech text-[10px] text-[#83948f]">
                <Shield className="w-3.5 h-3.5 text-[#00f5d4] shrink-0 mt-0.5" />
                <span>
                  Program ID: <strong className="text-white">NRKYsUiL...99SOL</strong>. 94% player pool, 2.5% treasury, 3.5% soil burn.
                </span>
              </div>
            </div>
          ) : (
            /* FREE MODE CARD */
            <div className="rounded-2xl bg-[#0a0f16]/95 border border-[#00f5d4]/30 p-5 flex flex-col gap-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#3a4a46]/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00f5d4]/20 border border-[#00f5d4]/40 flex items-center justify-center text-[#00f5d4]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display text-sm font-bold uppercase text-white">
                      FREE PLAY MODE
                    </h2>
                    <span className="font-tech text-[10px] text-[#83948f]">
                      INSTANT BROWSER ARENA
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40">
                  UNLIMITED
                </span>
              </div>

              <p className="font-display text-xs text-[#b9cac4] leading-relaxed">
                Practice steering, master high-speed spiral cutoffs, and harvest photon spores to test worm reflexes before staking SOL.
              </p>

              {/* Score HUD */}
              <div className="p-3 rounded-xl bg-[#05080c] border border-[#00f5d4]/20 flex items-center justify-between">
                <span className="font-tech text-xs text-[#83948f] uppercase">CURRENT HARVEST</span>
                <span className="font-display text-2xl font-black text-[#00f5d4]">
                  {currentScore.toLocaleString()}
                </span>
              </div>

              {/* Switch to Staked Promo */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1c142c] to-[#0f111a] border border-[#f59e0b]/40 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#f59e0b] font-display text-xs font-bold uppercase">
                  <Coins className="w-4 h-4" />
                  <span>READY FOR REAL BOUNTIES?</span>
                </div>
                <p className="font-tech text-[11px] text-[#b9cac4]">
                  Deposit SOL into the smart contract escrow to earn multiplier bounties on every takedown.
                </p>
                <button
                  onClick={() => setCurrentMode('staked')}
                  className="mt-1 py-2 px-3 rounded-lg bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-tech text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>SWITCH TO BET WITH SOL</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Subterranean Controls Guide */}
          <div className="p-4 rounded-xl bg-[#0d131a] border border-[#3a4a46]/40 flex flex-col gap-2 font-tech text-xs">
            <span className="text-[10px] text-[#00f5d4] font-bold uppercase tracking-wider">
              PILOT COMMANDS:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#b9cac4]">
              <div className="p-2 rounded bg-[#05080c]">
                <strong className="text-white">Mouse / Finger:</strong> Steer
              </div>
              <div className="p-2 rounded bg-[#05080c]">
                <strong className="text-white">Space / Click:</strong> Boost
              </div>
              <div className="p-2 rounded bg-[#05080c]">
                <strong className="text-white">P:</strong> Pause Game
              </div>
              <div className="p-2 rounded bg-[#05080c]">
                <strong className="text-white">F:</strong> Fullscreen
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
