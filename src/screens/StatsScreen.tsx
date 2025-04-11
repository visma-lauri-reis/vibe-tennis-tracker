import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../../App';
import { getGameHistory, GameHistoryItem } from '../utils/storage';

type StatsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Stats'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface PlayerStats {
  name: string;
  matchesPlayed: number;
  matchesWon: number;
  setsWon: number;
  winRate: string;
}

export default function StatsScreen({ navigation }: StatsScreenProps) {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const history = await getGameHistory();
    const statsMap = new Map<string, PlayerStats>();

    history.forEach(game => {
      // Process player 1
      updatePlayerStats(statsMap, game.player1, game.sets.player1, game.sets.player1 > game.sets.player2);
      // Process player 2
      updatePlayerStats(statsMap, game.player2, game.sets.player2, game.sets.player2 > game.sets.player1);
    });

    setPlayerStats(Array.from(statsMap.values()));
  };

  const updatePlayerStats = (
    statsMap: Map<string, PlayerStats>,
    playerName: string,
    setsWon: number,
    isWinner: boolean
  ) => {
    const existingStats = statsMap.get(playerName) || {
      name: playerName,
      matchesPlayed: 0,
      matchesWon: 0,
      setsWon: 0,
      winRate: '0%'
    };

    existingStats.matchesPlayed += 1;
    if (isWinner) {
      existingStats.matchesWon += 1;
    }
    existingStats.setsWon += setsWon;
    existingStats.winRate = `${((existingStats.matchesWon / existingStats.matchesPlayed) * 100).toFixed(1)}%`;

    statsMap.set(playerName, existingStats);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Player Statistics</Text>
      {playerStats.length > 0 ? (
        playerStats.map((stats, index) => (
          <View key={index} style={styles.statsCard}>
            <Text style={styles.playerName}>{stats.name}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statLabel}>Matches Played:</Text>
              <Text style={styles.statValue}>{stats.matchesPlayed}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statLabel}>Matches Won:</Text>
              <Text style={styles.statValue}>{stats.matchesWon}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statLabel}>Sets Won:</Text>
              <Text style={styles.statValue}>{stats.setsWon}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statLabel}>Win Rate:</Text>
              <Text style={styles.statValue}>{stats.winRate}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No games played yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
}); 