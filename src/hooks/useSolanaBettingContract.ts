import { useState, useCallback, useEffect, useRef } from 'react';
import { BettingState } from '../types';
import { sounds } from '../audio';

export const SOLANA_PROGRAM_ID = 'NRKYsUiL9bE7X3tQvW5mZ1kP99SOL';
export const PROTOCOL_TREASURY_PUBKEY = 'NRKYvAuLt99xSubTerraPool99999999999';

export function useSolanaBettingContract(
  onDeductSol?: (amount: number) => boolean,
  onCreditSol?: (amount: number) => void
) {
  const [bettingState, setBettingState] = useState<BettingState>({
    wager: 0.5,
    status: 'idle',
    currentMultiplier: 1.0,
    entryBioMass: 0,
    programId: SOLANA_PROGRAM_ID,
    extractionTimeRemaining: 8.4,
    txSignature: null,
  });

  const extractionTimerRef = useRef<number | null>(null);

  const setWager = useCallback((amount: number) => {
    sounds.playBeep(480);
    setBettingState(prev => ({
      ...prev,
      wager: amount,
    }));
  }, []);

  // Stake SOL into Non-Custodial Escrow Contract
  const stakeSol = useCallback(async (customAmount?: number): Promise<boolean> => {
    const amountToStake = customAmount || bettingState.wager;

    if (onDeductSol && !onDeductSol(amountToStake)) {
      sounds.playBeep(240);
      return false; // Insufficient balance
    }

    sounds.playBeep(720);

    // Simulate Anchor RPC transaction serialization & dispatch
    const mockTxSig = '5x' + Math.random().toString(36).substring(2, 15) + 'NRKYsol';

    setBettingState(prev => ({
      ...prev,
      wager: amountToStake,
      status: 'staked',
      currentMultiplier: 1.0,
      txSignature: mockTxSig,
      extractionTimeRemaining: 8.4,
    }));

    return true;
  }, [bettingState.wager, onDeductSol]);

  // Activate burrowing match
  const startMatch = useCallback((initialBioMass: number = 0) => {
    setBettingState(prev => ({
      ...prev,
      status: 'active',
      entryBioMass: initialBioMass,
      currentMultiplier: 1.0,
    }));
  }, []);

  // Update dynamic multiplier as player harvests bio-mass in arena
  const updateBioMassAndMultiplier = useCallback((currentScore: number) => {
    setBettingState(prev => {
      if (prev.status !== 'active' && prev.status !== 'extracting') return prev;
      // Multiplier scales from 1.0x up to 10.0x based on bio-mass score
      const calculatedMult = 1.0 + Math.min(9.0, currentScore / 1200);
      return {
        ...prev,
        currentMultiplier: parseFloat(calculatedMult.toFixed(2)),
      };
    });
  }, []);

  // Initiate extraction countdown (8.4 seconds hold)
  const initiateExtraction = useCallback(() => {
    sounds.playBeep(880);
    setBettingState(prev => ({
      ...prev,
      status: 'extracting',
      extractionTimeRemaining: 8.4,
    }));
  }, []);

  // Timer loop for extraction
  useEffect(() => {
    if (bettingState.status === 'extracting') {
      extractionTimerRef.current = window.setInterval(() => {
        setBettingState(prev => {
          if (prev.status !== 'extracting') return prev;
          const nextTime = Math.max(0, prev.extractionTimeRemaining - 0.1);
          if (nextTime <= 0) {
            // Extraction completed successfully!
            const payout = prev.wager * prev.currentMultiplier;
            if (onCreditSol) onCreditSol(payout);
            sounds.playOrbChime(400);
            return {
              ...prev,
              status: 'cashed_out',
              extractionTimeRemaining: 0,
            };
          }
          return {
            ...prev,
            extractionTimeRemaining: parseFloat(nextTime.toFixed(1)),
          };
        });
      }, 100);
    } else {
      if (extractionTimerRef.current) {
        clearInterval(extractionTimerRef.current);
      }
    }

    return () => {
      if (extractionTimerRef.current) {
        clearInterval(extractionTimerRef.current);
      }
    };
  }, [bettingState.status, onCreditSol]);

  // Player died / failed to extract
  const forfeitStake = useCallback(() => {
    sounds.playShatter();
    setBettingState(prev => ({
      ...prev,
      status: 'lost',
    }));
  }, []);

  // Reset to idle
  const resetBet = useCallback(() => {
    sounds.playBeep(440);
    setBettingState(prev => ({
      ...prev,
      status: 'idle',
      currentMultiplier: 1.0,
      extractionTimeRemaining: 8.4,
      txSignature: null,
    }));
  }, []);

  return {
    bettingState,
    setWager,
    stakeSol,
    startMatch,
    updateBioMassAndMultiplier,
    initiateExtraction,
    forfeitStake,
    resetBet,
  };
}
