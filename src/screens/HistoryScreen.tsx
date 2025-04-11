import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getGameHistory, GameHistoryItem, clearGameHistory } from '../utils/storage';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { theme } from '../utils/theme';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [history, setHistory] = useState<GameHistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const gameHistory = await getGameHistory();
    setHistory(gameHistory);
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all game history? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearGameHistory();
            setHistory([]);
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderGameItem = ({ item }: { item: GameHistoryItem }) => (
    <Card style={styles.gameCard}>
      <View style={styles.gameHeader}>
        <Text style={styles.gameDate}>{formatDate(item.date)}</Text>
      </View>
      
      <View style={styles.playerRow}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.player1Name}</Text>
          <Text style={styles.scoreText}>{item.score.split('-')[0]}</Text>
        </View>
        <Text style={styles.vsText}>vs</Text>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.player2Name}</Text>
          <Text style={styles.scoreText}>{item.score.split('-')[1]}</Text>
        </View>
      </View>
      
      <View style={styles.winnerContainer}>
        <Ionicons name="trophy" size={16} color={theme.colors.secondary} />
        <Text style={styles.winnerText}>Winner: {item.winner}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Game History</Text>
        {history.length > 0 && (
          <Button
            title="Clear History"
            onPress={handleClearHistory}
            variant="outline"
            icon="trash-outline"
            size="small"
          />
        )}
      </View>
      
      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderGameItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>No games played yet</Text>
          <Button
            title="Start a New Game"
            onPress={() => navigation.navigate('NewGame' as never)}
            variant="primary"
            icon="add-circle-outline"
            iconPosition="right"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  gameCard: {
    marginBottom: theme.spacing.md,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  gameDate: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  setBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  setBadgeText: {
    color: 'white',
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 'bold',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  playerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  playerName: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  scoreText: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  vsText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.md,
  },
  winnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  winnerText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.lg,
    textAlign: 'center',
  },
}); 