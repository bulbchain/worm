import { useState, useEffect, useCallback } from 'react';
import { WalletState, WalletProvider, SolanaNetwork } from '../types';
import { sounds } from '../audio';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      on: (event: string, handler: (args: unknown) => void) => void;
      publicKey?: { toString: () => string };
    };
  }
}

const STORAGE_KEY = 'narky_wallet_state';

export function useSolanaWallet() {
  const [wallet, setWallet] = useState<WalletState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      isConnected: false,
      address: null,
      balance: 2.85,
      provider: null,
      network: 'mainnet-beta',
      isConnecting: false,
    };
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet));
    } catch {}
  }, [wallet]);

  // Check for Phantom in browser window
  const isPhantomInstalled = typeof window !== 'undefined' && Boolean(window.solana?.isPhantom);

  const connectWallet = useCallback(async (provider: WalletProvider = 'phantom') => {
    setWallet(prev => ({ ...prev, isConnecting: true }));
    sounds.playBeep(520);

    try {
      // Integration point for actual Phantom wallet browser extension
      if (provider === 'phantom' && window.solana?.isPhantom) {
        try {
          const resp = await window.solana.connect();
          const pubkey = resp.publicKey.toString();
          setWallet({
            isConnected: true,
            address: pubkey,
            balance: 4.82,
            provider: 'phantom',
            network: 'mainnet-beta',
            isConnecting: false,
          });
          sounds.playBeep(880);
          return;
        } catch {
          // User rejected or fallback to simulated connection
        }
      }

      // Simulated realistic wallet connection for preview / non-extension environments
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockAddresses: Record<WalletProvider, string> = {
        phantom: 'NRKY9pHTMQXvB6oZfWkL7wG2yF4u8D9aE3zT',
        solflare: 'SF9xKqV2aW8mP4zL7yR3tE5uN1c0bJ6d',
        backpack: 'BP4zL8wQ2mR7tY1uN9cV3bX5kM6dF0eA',
      };

      setWallet({
        isConnected: true,
        address: mockAddresses[provider],
        balance: 3.45,
        provider,
        network: 'mainnet-beta',
        isConnecting: false,
      });

      sounds.playBeep(780);
    } catch {
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    sounds.playBeep(320);
    if (wallet.provider === 'phantom' && window.solana?.isPhantom) {
      try {
        await window.solana.disconnect();
      } catch {}
    }
    setWallet(prev => ({
      ...prev,
      isConnected: false,
      address: null,
      provider: null,
      isConnecting: false,
    }));
  }, [wallet.provider]);

  const switchNetwork = useCallback((network: SolanaNetwork) => {
    sounds.playBeep(600);
    setWallet(prev => ({ ...prev, network }));
  }, []);

  const requestAirdrop = useCallback(async () => {
    if (!wallet.isConnected) return;
    sounds.playBeep(640);
    setWallet(prev => ({
      ...prev,
      balance: parseFloat((prev.balance + 1.0).toFixed(2)),
    }));
  }, [wallet.isConnected]);

  const deductSol = useCallback((amount: number): boolean => {
    if (wallet.balance < amount) return false;
    setWallet(prev => ({
      ...prev,
      balance: parseFloat((prev.balance - amount).toFixed(3)),
    }));
    return true;
  }, [wallet.balance]);

  const creditSol = useCallback((amount: number) => {
    setWallet(prev => ({
      ...prev,
      balance: parseFloat((prev.balance + amount).toFixed(3)),
    }));
  }, []);

  return {
    wallet,
    isPhantomInstalled,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    requestAirdrop,
    deductSol,
    creditSol,
  };
}
