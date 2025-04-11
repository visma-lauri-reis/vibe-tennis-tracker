import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getGameHistory, GameHistoryItem } from '../utils/storage';
import { Card } from '../components/Card';
import { theme } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

interface PlayerStats {
  name: string;
  matchesPlayed: number;
  matchesWon: number;
  setsWon: number;
  winRate: string;
}

export default function StatsScreen() {
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    loadGameHistory();
  }, []);

  const loadGameHistory = async () => {
    setIsLoading(true);
    try {
      const history = await getGameHistory();
      setGameHistory(history);
      calculatePlayerStats(history);
    } catch (error) {
      console.error('Error loading game history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePlayerStats = (history: GameHistoryItem[]) => {
    const statsMap = new Map<string, PlayerStats>();

    history.forEach(game => {
      // Process player 1
      updatePlayerStats(statsMap, game.player1Name, game.winner === game.player1Name);
      
      // Process player 2
      updatePlayerStats(statsMap, game.player2Name, game.winner === game.player2Name);
    });

    setPlayerStats(Array.from(statsMap.values()));
  };

  const updatePlayerStats = (statsMap: Map<string, PlayerStats>, playerName: string, isWinner: boolean) => {
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

    // Calculate win rate
    const winRate = (existingStats.matchesWon / existingStats.matchesPlayed) * 100;
    existingStats.winRate = `${winRate.toFixed(1)}%`;

    statsMap.set(playerName, existingStats);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // The AuthContext will handle updating the isLoggedIn state
              // and the App.tsx will automatically show the login screen
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Player Statistics</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
        
        {isLoading ? (
          <Text style={styles.loadingText}>Loading statistics...</Text>
        ) : playerStats.length > 0 ? (
          playerStats.map((player, index) => (
            <View key={index} style={styles.playerStatsContainer}>
              <Text style={styles.playerName}>{player.name}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{player.matchesPlayed}</Text>
                  <Text style={styles.statLabel}>Matches</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{player.matchesWon}</Text>
                  <Text style={styles.statLabel}>Wins</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{player.winRate}</Text>
                  <Text style={styles.statLabel}>Win Rate</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No game history available</Text>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  card: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  logoutButton: {
    padding: 8,
  },
  playerStatsContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  loadingText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginVertical: 20,
  },
  noDataText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginVertical: 20,
  },
}); 