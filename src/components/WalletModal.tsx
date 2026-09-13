import React, { useState } from 'react';
import { WalletState, WalletProvider, SolanaNetwork } from '../types';
import { sounds } from '../audio';
import {
  X,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  Zap,
  LogOut,
  ShieldCheck,
  Coins,
} from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onConnect: (provider: WalletProvider) => Promise<void>;
  onDisconnect: () => Promise<void>;
  onSwitchNetwork: (network: SolanaNetwork) => void;
  onRequestAirdrop: () => Promise<void>;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
  onRequestAirdrop,
}) => {
  const [copied, setCopied] = useState(false);
  const [isAirdropping, setIsAirdropping] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!wallet.address) return;
    navigator.clipboard?.writeText(wallet.address);
    setCopied(true);
    sounds.playBeep(700);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAirdrop = async () => {
    setIsAirdropping(true);
    await onRequestAirdrop();
    setIsAirdropping(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="wallet-modal-panel"
        className="relative w-full max-w-md rounded-2xl bg-[#0a0f16]/95 border border-[#00f5d4]/40 shadow-[0_0_40px_rgba(0,245,212,0.25),0_12px_50px_rgba(0,0,0,0.9)] p-6 overflow-hidden flex flex-col gap-5 text-on-surface"
      >
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f5d4] via-[#10b981] to-[#a3e635]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#3a4a46]/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#131a22] border border-[#00f5d4]/40 flex items-center justify-center text-[#00f5d4]">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-lg uppercase font-black tracking-wider text-white">
                {wallet.isConnected ? 'SOLANA WALLET INTERFACE' : 'CONNECT SOLANA WALLET'}
              </h2>
              <span className="font-tech text-[10px] text-[#83948f] tracking-widest uppercase">
                {wallet.isConnected ? 'SUBTERRA_NET LINKED' : 'SELECT PROVIDER TO STAKE & WITHDRAW'}
              </span>
            </div>
          </div>
          <button
            id="close-wallet-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#131a22] hover:bg-[#1f2937] text-[#83948f] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CONNECTED STATE */}
        {wallet.isConnected ? (
          <div className="flex flex-col gap-4">
            {/* Balance Card */}
            <div className="p-4 rounded-xl bg-[#05080c] border border-[#00f5d4]/30 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-tech text-[10px] text-[#83948f] uppercase tracking-wider">
                  TOTAL VAULT BALANCE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(0,245,212,0.4)]">
                  {wallet.balance.toFixed(3)}
                </span>
                <span className="font-tech text-base font-bold text-[#00f5d4]">SOL</span>
                <span className="text-xs text-[#83948f] font-tech">
                  (≈ ${(wallet.balance * 188.5).toFixed(2)} USD)
                </span>
              </div>

              {/* Address with copy */}
              <div className="mt-2 pt-2 border-t border-[#3a4a46]/40 flex items-center justify-between text-xs font-tech">
                <span className="text-[#83948f] truncate max-w-[240px]">
                  {wallet.address}
                </span>
                <button
                  id="wallet-copy-address-btn"
                  onClick={handleCopy}
                  className="px-2 py-1 rounded bg-[#131a22] hover:bg-[#1e293b] text-[#00f5d4] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Network Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-tech text-[10px] text-[#83948f] uppercase tracking-wider">
                ACTIVE SOLANA CLUSTER
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSwitchNetwork('mainnet-beta')}
                  className={`py-2 px-3 rounded-lg font-tech text-xs uppercase font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    wallet.network === 'mainnet-beta'
                      ? 'bg-[#00f5d4]/20 border border-[#00f5d4] text-[#00f5d4] shadow-[0_0_12px_rgba(0,245,212,0.2)]'
                      : 'bg-[#05080c] border border-[#3a4a46]/50 text-[#83948f] hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  Mainnet-Beta
                </button>
                <button
                  onClick={() => onSwitchNetwork('devnet')}
                  className={`py-2 px-3 rounded-lg font-tech text-xs uppercase font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    wallet.network === 'devnet'
                      ? 'bg-[#f59e0b]/20 border border-[#f59e0b] text-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-[#05080c] border border-[#3a4a46]/50 text-[#83948f] hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  Devnet (Test)
                </button>
              </div>
            </div>

            {/* Devnet Faucet Action */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d131a] border border-[#3a4a46]/40">
              <div className="flex flex-col">
                <span className="font-tech text-xs text-white font-bold">FAUCET AIRDROP</span>
                <span className="font-tech text-[10px] text-[#83948f]">Instant +1.0 SOL simulation for arena testing</span>
              </div>
              <button
                id="wallet-airdrop-btn"
                onClick={handleAirdrop}
                disabled={isAirdropping}
                className="px-3 py-1.5 rounded-lg bg-[#a3e635] hover:bg-[#bef264] text-[#121f00] font-tech text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAirdropping ? 'animate-spin' : ''}`} />
                <span>+1.0 SOL</span>
              </button>
            </div>

            {/* Explorer & Disconnect */}
            <div className="flex items-center justify-between pt-2 border-t border-[#3a4a46]/40">
              <a
                href={`https://explorer.solana.com/address/${wallet.address}?cluster=${wallet.network}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-tech text-xs text-[#00f5d4] hover:underline flex items-center gap-1"
              >
                <span>View on Solana Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                id="wallet-disconnect-btn"
                onClick={async () => {
                  await onDisconnect();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#240b15] hover:bg-[#381121] border border-[#ec4899]/40 text-[#ec4899] font-tech text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>DISCONNECT</span>
              </button>
            </div>
          </div>
        ) : (
          /* DISCONNECTED / PROVIDER SELECTION STATE */
          <div className="flex flex-col gap-4">
            <p className="font-display text-sm text-[#b9cac4] leading-relaxed">
              Connect a non-custodial Solana wallet to stake on subterranean runs, withdraw accumulated bio-mass bounties, and climb the Solana leaderboards.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* PHANTOM WALLET (PRIMARY) */}
              <button
                id="connect-phantom-btn"
                onClick={() => onConnect('phantom')}
                disabled={wallet.isConnecting}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-[#1c142c] to-[#0f111a] hover:from-[#2a1d44] hover:to-[#171b29] border border-[#ab9ff2]/50 hover:border-[#ab9ff2] transition-all flex items-center justify-between group shadow-[0_0_20px_rgba(171,159,242,0.15)] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {/* Phantom Icon SVG */}
                  <div className="w-10 h-10 rounded-xl bg-[#ab9ff2]/20 border border-[#ab9ff2]/40 flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 128 128" fill="none">
                      <rect width="128" height="128" rx="28" fill="#AB9FF2" />
                      <path
                        d="M107.5 66.5C107.5 88.3152 89.8152 106 68 106C54.767 106 43.0805 99.4938 35.8856 89.4795C34.4695 87.5085 36.1911 84.8967 38.5912 85.3402C48.8687 87.2393 59.8824 84.3411 67.893 76.9535C77.4042 68.1822 81.3323 54.8996 78.4357 42.4285C77.8596 39.9482 80.3541 37.8689 82.6865 38.9248C97.4334 45.6015 107.5 59.9572 107.5 66.5Z"
                        fill="#2A2440"
                      />
                      <circle cx="50" cy="62" r="6" fill="#2A2440" />
                      <circle cx="74" cy="62" r="6" fill="#2A2440" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display text-sm font-bold text-white group-hover:text-[#ab9ff2] transition-colors">
                      PHANTOM WALLET
                    </span>
                    <span className="font-tech text-[10px] text-[#83948f]">
                      Recommended for Solana Web3 gaming
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#ab9ff2]/20 text-[#ab9ff2] font-tech text-[10px] font-bold uppercase">
                  DETECTED
                </span>
              </button>

              {/* SOLFLARE */}
              <button
                id="connect-solflare-btn"
                onClick={() => onConnect('solflare')}
                disabled={wallet.isConnecting}
                className="w-full p-4 rounded-xl bg-[#0d131a] hover:bg-[#131b24] border border-[#f59e0b]/40 hover:border-[#f59e0b] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display text-sm font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                      SOLFLARE
                    </span>
                    <span className="font-tech text-[10px] text-[#83948f]">
                      Fast browser extension &amp; web
                    </span>
                  </div>
                </div>
                <span className="text-xs font-tech text-[#83948f] group-hover:text-white">
                  CONNECT →
                </span>
              </button>

              {/* BACKPACK */}
              <button
                id="connect-backpack-btn"
                onClick={() => onConnect('backpack')}
                disabled={wallet.isConnecting}
                className="w-full p-4 rounded-xl bg-[#0d131a] hover:bg-[#131b24] border border-[#ec4899]/40 hover:border-[#ec4899] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ec4899]/20 border border-[#ec4899]/40 flex items-center justify-center text-[#ec4899]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display text-sm font-bold text-white group-hover:text-[#ec4899] transition-colors">
                      BACKPACK
                    </span>
                    <span className="font-tech text-[10px] text-[#83948f]">
                      xNFT &amp; crypto gaming wallet
                    </span>
                  </div>
                </div>
                <span className="text-xs font-tech text-[#83948f] group-hover:text-white">
                  CONNECT →
                </span>
              </button>
            </div>

            {/* Smart Contract Guarantee */}
            <div className="p-3 rounded-xl bg-[#05080c] border border-[#3a4a46]/40 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
              <p className="font-tech text-[10px] text-[#83948f] leading-relaxed">
                Non-custodial smart contract escrow. Staked funds remain locked in program <strong className="text-white">NRKY...99SOL</strong> until quantum wormhole extraction or collision termination.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
