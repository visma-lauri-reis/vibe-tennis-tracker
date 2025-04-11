import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../utils/theme';
import { saveGameToHistory, getGameHistory, GameHistoryItem } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

export default function GameScreen() {
  const route = useRoute<GameScreenRouteProp>();
  const navigation = useNavigation<GameScreenNavigationProp>();
  const { player1Name, player2Name } = route.params;

  // Game state
  const [points1, setPoints1] = useState(0);
  const [points2, setPoints2] = useState(0);
  const [games1, setGames1] = useState(0);
  const [games2, setGames2] = useState(0);
  const [sets1, setSets1] = useState(0);
  const [sets2, setSets2] = useState(0);
  const [isDeuce, setIsDeuce] = useState(false);
  const [isAdvantage, setIsAdvantage] = useState(false);
  const [advantagePlayer, setAdvantagePlayer] = useState<1 | 2 | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);

  useEffect(() => {
    loadGameHistory();
  }, []);

  const loadGameHistory = async () => {
    const history = await getGameHistory();
    setGameHistory(history);
  };

  const resetPoints = () => {
    setPoints1(0);
    setPoints2(0);
    setIsDeuce(false);
    setIsAdvantage(false);
    setAdvantagePlayer(null);
  };

  const handlePoint = (player: 1 | 2) => {
    if (isGameOver) return;

    if (isDeuce) {
      if (isAdvantage) {
        if (advantagePlayer === player) {
          // Win game
          if (player === 1) {
            setGames1(games1 + 1);
          } else {
            setGames2(games2 + 1);
          }
          resetPoints();
          checkSetWinner();
        } else {
          // Back to deuce
          setIsAdvantage(false);
          setAdvantagePlayer(null);
        }
      } else {
        // Set advantage
        setIsAdvantage(true);
        setAdvantagePlayer(player);
      }
      return;
    }

    // Handle regular scoring
    if (player === 1) {
      if (points1 === 30) {
        if (points2 === 40) {
          // Other player has 40, this point makes it deuce
          setPoints1(40);
          setIsDeuce(true);
        } else {
          // Normal progression to 40
          setPoints1(40);
        }
      } else if (points1 === 40) {
        // Already at 40, win the game
        setGames1(games1 + 1);
        resetPoints();
        checkSetWinner();
      } else {
        // Normal progression (0->15->30)
        const newPoints = points1 + 15;
        setPoints1(newPoints);
        if (newPoints === 40 && points2 === 40) {
          setIsDeuce(true);
        }
      }
    } else {
      if (points2 === 30) {
        if (points1 === 40) {
          // Other player has 40, this point makes it deuce
          setPoints2(40);
          setIsDeuce(true);
        } else {
          // Normal progression to 40
          setPoints2(40);
        }
      } else if (points2 === 40) {
        // Already at 40, win the game
        setGames2(games2 + 1);
        resetPoints();
        checkSetWinner();
      } else {
        // Normal progression (0->15->30)
        const newPoints = points2 + 15;
        setPoints2(newPoints);
        if (newPoints === 40 && points1 === 40) {
          setIsDeuce(true);
        }
      }
    }
  };

  const checkGameWinner = () => {
    // Win by reaching 6 points
    if (games1 >= 5 && games1 >= games2 + 2) {
      setSets1(sets1 + 1);
      handleSetWon(1);
      resetGames();
      return;
    }
    if (games2 >= 5 && games2 >= games1 + 2) {
      setSets2(sets2 + 1);
      handleSetWon(2);
      resetGames();
      return;
    }

    // Win by reaching 6 points
    if (games1 === 6) {
      setSets1(sets1 + 1);
      handleSetWon(1);
      resetGames();
      return;
    }
    if (games2 === 6) {
      setSets2(sets2 + 1);
      handleSetWon(2);
      resetGames();
      return;
    }
  };

  const handleSetWon = (winner: 1 | 2) => {
    // Check if the match is over after this set
    if ((winner === 1 && sets1 + 1 === 2) || (winner === 2 && sets2 + 1 === 2)) {
      // Only save to history when the game is complete
      const gameHistory: GameHistoryItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        player1Name,
        player2Name,
        winner: winner === 1 ? player1Name : player2Name,
        score: `${sets1 + (winner === 1 ? 1 : 0)}-${sets2 + (winner === 2 ? 1 : 0)}`,
        setNumber: sets1 + sets2 + 1,
      };
      saveGameToHistory(gameHistory);
      
      setIsGameOver(true);
      Alert.alert(
        'Game Over!',
        `${winner === 1 ? player1Name : player2Name} wins the match!`,
        [
          {
            text: 'New Game',
            onPress: () => navigation.navigate('MainTabs'),
          },
        ]
      );
    }
  };

  const resetGames = () => {
    setGames1(0);
    setGames2(0);
  };

  const checkSetWinner = () => {
    // Check if a player has won the current set
    checkGameWinner();
  };

  const formatPoints = (points: number) => {
    if (points === 0) return '0';
    if (points === 15) return '15';
    if (points === 30) return '30';
    if (points === 40) return '40';
    return '0';
  };

  const getPointDisplay = (player: 1 | 2) => {
    if (isDeuce) {
      if (isAdvantage) {
        return advantagePlayer === player ? 'Ad' : '40';
      }
      return 'Deuce';
    }
    return player === 1 ? formatPoints(points1) : formatPoints(points2);
  };

  return (
    <ScrollView style={styles.container}>
      <Card variant="elevated" style={styles.scoreCard}>
        <View style={styles.playerContainer}>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{player1Name}</Text>
            <Text style={styles.setScore}>{sets1}</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{player2Name}</Text>
            <Text style={styles.setScore}>{sets2}</Text>
          </View>
        </View>

        <View style={styles.gameScoreContainer}>
          <Text style={styles.gameScore}>{games1}</Text>
          <Text style={styles.gameScoreLabel}>Games</Text>
          <Text style={styles.gameScore}>{games2}</Text>
        </View>

        <View style={styles.pointsContainer}>
          <View style={styles.pointSection}>
            <Text style={styles.pointLabel}>Points</Text>
            <Text style={styles.pointValue}>{getPointDisplay(1)}</Text>
            <Button
              title="Point"
              onPress={() => handlePoint(1)}
              variant="primary"
              icon="add-circle-outline"
              disabled={isGameOver}
              fullWidth
            />
          </View>

          <View style={styles.pointSection}>
            <Text style={styles.pointLabel}>Points</Text>
            <Text style={styles.pointValue}>{getPointDisplay(2)}</Text>
            <Button
              title="Point"
              onPress={() => handlePoint(2)}
              variant="secondary"
              icon="add-circle-outline"
              disabled={isGameOver}
              fullWidth
            />
          </View>
        </View>
      </Card>

      <Card style={styles.controlsCard}>
        <Text style={styles.controlsTitle}>Game Controls</Text>
        <View style={styles.controlsRow}>
          <View style={styles.controlButton}>
            <Button
              title="Reset Points"
              onPress={resetPoints}
              variant="outline"
              icon="refresh-outline"
              size="small"
              fullWidth
            />
          </View>
          <View style={styles.controlButton}>
            <Button
              title="New Game"
              onPress={() => navigation.navigate('MainTabs')}
              variant="outline"
              icon="add-outline"
              size="small"
              fullWidth
            />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  scoreCard: {
    marginBottom: theme.spacing.lg,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  playerInfo: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  setScore: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  gameScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  gameScore: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  gameScoreLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointSection: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  pointLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  pointValue: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  controlsCard: {
    marginBottom: theme.spacing.lg,
  },
  controlsTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
}); 