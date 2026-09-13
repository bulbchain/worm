import { useState, useCallback, useEffect } from 'react';
import { LeaderboardEntry, CombatLogEvent } from '../types';

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    callsign: 'GRAVE_ROOT',
    species: 'TITAN CENTIPEDE',
    bioMass: 18450,
    takedowns: 22,
    solBounty: 3.85,
    winLossRatio: '18W / 2L (90%)',
    status: 'APEX PREDATOR',
  },
  {
    rank: 2,
    callsign: 'NEON_SLUGGER',
    species: 'RAD-SLUG',
    bioMass: 14210,
    takedowns: 16,
    solBounty: 2.40,
    winLossRatio: '14W / 4L (77%)',
    status: 'BURROWING',
  },
  {
    rank: 3,
    callsign: 'SUB_VIPER',
    species: 'VIPER-WORM',
    bioMass: 11830,
    takedowns: 13,
    solBounty: 1.75,
    winLossRatio: '11W / 3L (78%)',
    status: 'EXTRACTING',
  },
  {
    rank: 4,
    callsign: 'PHOSPHOR_99',
    species: 'PHOSPHOR BEETLE',
    bioMass: 8920,
    takedowns: 9,
    solBounty: 0.90,
    winLossRatio: '9W / 5L (64%)',
    status: 'ACTIVE',
  },
  {
    rank: 5,
    callsign: 'NARKY_PRIME',
    species: 'CYBER-WORM',
    bioMass: 6465,
    takedowns: 7,
    solBounty: 0.65,
    winLossRatio: '7W / 1L (87%)',
    status: 'BURROWING',
    isPlayer: true,
  },
  {
    rank: 6,
    callsign: 'CHITIN_LORD',
    species: 'TITAN CENTIPEDE',
    bioMass: 5820,
    takedowns: 6,
    solBounty: 0.50,
    winLossRatio: '6W / 3L (66%)',
    status: 'ACTIVE',
  },
  {
    rank: 7,
    callsign: 'VOID_CRAWLER',
    species: 'RAD-SLUG',
    bioMass: 4910,
    takedowns: 5,
    solBounty: 0.35,
    winLossRatio: '5W / 4L (55%)',
    status: 'ACTIVE',
  },
  {
    rank: 8,
    callsign: 'SPORE_VIPER',
    species: 'VIPER-WORM',
    bioMass: 4200,
    takedowns: 4,
    solBounty: 0.25,
    winLossRatio: '4W / 2L (66%)',
    status: 'BURROWING',
  },
];

const INITIAL_COMBAT_LOGS: CombatLogEvent[] = [
  {
    id: 'log-1',
    killer: 'GRAVE_ROOT',
    victim: 'NITRO_ANT',
    method: 'venom trail cutoff',
    bioMassReaped: 520,
    timeAgo: '3s AGO',
  },
  {
    id: 'log-2',
    killer: 'NEON_SLUGGER',
    victim: 'SHADOW_BURROWER',
    method: 'radioactive slime dissolver',
    bioMassReaped: 740,
    timeAgo: '12s AGO',
  },
  {
    id: 'log-3',
    killer: 'SUB_VIPER',
    victim: 'CHITIN_LORD',
    method: 'stealth root dive ambush',
    bioMassReaped: 1250,
    timeAgo: '26s AGO',
  },
  {
    id: 'log-4',
    killer: 'NARKY_PRIME',
    victim: 'PHOSPHOR_BEETLE',
    method: 'segmented spiral trap',
    bioMassReaped: 420,
    timeAgo: '45s AGO',
  },
];

export function useLeaderboardData(playerCallsign: string = 'NARKY_PRIME') {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [combatLogs, setCombatLogs] = useState<CombatLogEvent[]>(INITIAL_COMBAT_LOGS);
  const [activeSpecimensCount, setActiveSpecimensCount] = useState<number>(2840);
  const [totalBiosphereMass, setTotalBiosphereMass] = useState<number>(1492800);

  // Update player stats in real-time
  const updatePlayerScore = useCallback((score: number, kills: number, wonSol: number = 0) => {
    setLeaderboard(prev => {
      const updated = prev.map(entry => {
        if (entry.isPlayer || entry.callsign === playerCallsign) {
          return {
            ...entry,
            callsign: playerCallsign,
            bioMass: Math.max(entry.bioMass, score),
            takedowns: Math.max(entry.takedowns, kills),
            solBounty: parseFloat((entry.solBounty + wonSol).toFixed(2)),
          };
        }
        return entry;
      });

      // Re-sort based on bio-mass
      return updated.sort((a, b) => b.bioMass - a.bioMass).map((item, idx) => ({
        ...item,
        rank: idx + 1,
      }));
    });
  }, [playerCallsign]);

  // Periodic simulated ambient combat activity in the soil arena
  useEffect(() => {
    const interval = setInterval(() => {
      const bots = ['GRAVE_ROOT', 'NEON_SLUGGER', 'SUB_VIPER', 'PHOSPHOR_99', 'CHITIN_LORD', 'VOID_CRAWLER'];
      const victims = ['RAD_ANT', 'MUD_SLUG', 'NIGHTCRAWLER', 'SPORE_LARVA', 'HEX_BEETLE'];
      const methods = ['toxic wake slice', 'mandible crush', 'photon burst ambush', 'chitin breach'];

      const randomKiller = bots[Math.floor(Math.random() * bots.length)];
      const randomVictim = victims[Math.floor(Math.random() * victims.length)];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];
      const reaped = Math.floor(Math.random() * 600 + 200);

      const newLog: CombatLogEvent = {
        id: 'log-' + Date.now(),
        killer: randomKiller,
        victim: randomVictim,
        method: randomMethod,
        bioMassReaped: reaped,
        timeAgo: 'JUST NOW',
      };

      setCombatLogs(prev => [newLog, ...prev.slice(0, 5)]);
      setActiveSpecimensCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setTotalBiosphereMass(prev => prev + reaped);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return {
    leaderboard,
    combatLogs,
    activeSpecimensCount,
    totalBiosphereMass,
    updatePlayerScore,
  };
}
