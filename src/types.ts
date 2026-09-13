export type ScreenType = 'home' | 'arena' | 'wallet' | 'leaderboard' | 'invite';

export type WalletProvider = 'phantom' | 'solflare' | 'backpack';

export type SolanaNetwork = 'mainnet-beta' | 'devnet';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number; // in SOL
  provider: WalletProvider | null;
  network: SolanaNetwork;
  isConnecting: boolean;
}

export type BettingMode = 'free' | 'staked';

export interface BettingState {
  wager: number; // in SOL
  status: 'idle' | 'staked' | 'active' | 'extracting' | 'cashed_out' | 'lost';
  currentMultiplier: number;
  entryBioMass: number;
  programId: string;
  extractionTimeRemaining: number;
  txSignature: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  callsign: string;
  species: string;
  bioMass: number;
  takedowns: number;
  solBounty: number;
  winLossRatio: string;
  status: 'APEX PREDATOR' | 'BURROWING' | 'EXTRACTING' | 'ACTIVE';
  isPlayer?: boolean;
}

export interface CombatLogEvent {
  id: string;
  killer: string;
  victim: string;
  method: string;
  bioMassReaped: number;
  timeAgo: string;
}

export interface CreatureSpecies {
  id: string;
  name: string;
  tag: string;
  speciesNumber: string;
  category: string;
  description: string;
  statLabel: string;
  statValue: string;
  color: string;
  ringColor: string;
}

export interface ReferralTier {
  tier: number;
  title: string;
  requiredInvites: number;
  rewardText: string;
  unlocked: boolean;
}
