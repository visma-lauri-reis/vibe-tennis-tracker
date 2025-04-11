import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getGameHistory, GameHistoryItem } from '../utils/storage';
import { Card } from '../components/Card';
import { theme } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

interface PlayerStats {
  name: string;
  matchesPlayed: number;
  matchesWon: number;
  setsWon: number;
  winRate: string;
}

export default function StatsScreen() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const history = await getGameHistory();
    const statsMap = new Map<string, PlayerStats>();

    history.forEach(game => {
      // Process player 1
      updatePlayerStats(
        statsMap, 
        game.player1Name, 
        game.winner === game.player1Name ? 1 : 0,
        game.winner === game.player1Name
      );
      
      // Process player 2
      updatePlayerStats(
        statsMap, 
        game.player2Name, 
        game.winner === game.player2Name ? 1 : 0,
        game.winner === game.player2Name
      );
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
          <Card key={index} variant="elevated" style={styles.statsCard}>
            <View style={styles.playerHeader}>
              <Ionicons name="person-circle-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.playerName}>{stats.name}</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.matchesPlayed}</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.matchesWon}</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.setsWon}</Text>
                <Text style={styles.statLabel}>Sets</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.winRate}</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${parseFloat(stats.winRate)}%` }
                  ]} 
                />
              </View>
            </View>
          </Card>
        ))
      ) : (
        <Card style={styles.emptyCard}>
          <Ionicons name="stats-chart-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>No games played yet</Text>
          <Text style={styles.emptySubtext}>Play some games to see your statistics</Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  statsCard: {
    marginBottom: theme.spacing.md,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  playerName: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statValue: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  progressContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}); 