/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { ScreenType } from './types';
import { useSolanaWallet } from './hooks/useSolanaWallet';
import { useLeaderboardData } from './hooks/useLeaderboardData';
import { SoilTunnelsBackground } from './components/SoilTunnelsBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WalletModal } from './components/WalletModal';
import { HomeScreen } from './components/HomeScreen';
import { BettingArenaScreen } from './components/BettingArenaScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { InviteScreen } from './components/InviteScreen';
import { sounds } from './audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [arenaMode, setArenaMode] = useState<'free' | 'staked'>('free');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [playerCallsign, setPlayerCallsign] = useState('NARKY_PRIME');

  const {
    wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    requestAirdrop,
    deductSol,
    creditSol,
  } = useSolanaWallet();

  const {
    leaderboard,
    combatLogs,
    updatePlayerScore,
  } = useLeaderboardData(playerCallsign);

  const handleNavigate = useCallback((screen: ScreenType, subMode?: 'free' | 'staked') => {
    sounds.playBeep(560);
    if (subMode) {
      setArenaMode(subMode);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleScoreUpdate = useCallback(
    (score: number) => {
      updatePlayerScore(score, 0);
    },
    [updatePlayerScore]
  );

  const handleKillsUpdate = useCallback(
    (kills: number) => {
      updatePlayerScore(0, kills);
    },
    [updatePlayerScore]
  );

  const handleSolWon = useCallback(
    (sol: number) => {
      updatePlayerScore(0, 0, sol);
    },
    [updatePlayerScore]
  );

  return (
    <div className="min-h-screen w-full bg-[#080b0f] text-[#e1e2e8] flex flex-col justify-between selection:bg-[#00f5d4] selection:text-[#00382f] relative">
      {/* Animated Subterranean Soil Tunnels Background */}
      <SoilTunnelsBackground />

      {/* Global Application Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* Main Screen Views */}
      <main className="flex-1 w-full pt-20">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            playerCallsign={playerCallsign}
            setPlayerCallsign={setPlayerCallsign}
            leaderboard={leaderboard}
            combatLogs={combatLogs}
            onScoreUpdate={handleScoreUpdate}
            onKillsUpdate={handleKillsUpdate}
          />
        )}

        {currentScreen === 'arena' && (
          <BettingArenaScreen
            onNavigate={handleNavigate}
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            playerCallsign={playerCallsign}
            initialMode={arenaMode}
            onScoreUpdate={handleScoreUpdate}
            onKillsUpdate={handleKillsUpdate}
            onSolWon={handleSolWon}
            deductSol={deductSol}
            creditSol={creditSol}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            onNavigate={handleNavigate}
            leaderboard={leaderboard}
            combatLogs={combatLogs}
            playerCallsign={playerCallsign}
          />
        )}

        {currentScreen === 'invite' && (
          <InviteScreen
            onNavigate={handleNavigate}
            playerCallsign={playerCallsign}
          />
        )}

        {currentScreen === 'wallet' && (
          <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              {/* If user navigates directly to wallet screen, show the wallet modal inline */}
              <WalletModal
                isOpen={true}
                onClose={() => handleNavigate('home')}
                wallet={wallet}
                onConnect={connectWallet}
                onDisconnect={disconnectWallet}
                onSwitchNetwork={switchNetwork}
                onRequestAirdrop={requestAirdrop}
              />
            </div>
          </div>
        )}
      </main>

      {/* Global Wallet Modal Popup */}
      <WalletModal
        isOpen={isWalletModalOpen && currentScreen !== 'wallet'}
        onClose={() => setIsWalletModalOpen(false)}
        wallet={wallet}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onSwitchNetwork={switchNetwork}
        onRequestAirdrop={requestAirdrop}
      />

      {/* Subterranean Ecosystem Footer */}
      <Footer />
    </div>
  );
}
