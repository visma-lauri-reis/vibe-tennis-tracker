import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type GameScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC<GameScreenProps> = ({ route, navigation }) => {
  const { player1Name, player2Name } = route.params;
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [games1, setGames1] = useState(0);
  const [games2, setGames2] = useState(0);
  const [sets1, setSets1] = useState(0);
  const [sets2, setSets2] = useState(0);
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [isMatchComplete, setIsMatchComplete] = useState(false);

  const handlePoint = (player: 1 | 2) => {
    if (isMatchComplete) return;

    if (player === 1) {
      setScore1(prev => {
        const newScore = prev + 1;
        if (newScore >= 4 && newScore - score2 >= 2) {
          handleGame(1);
          return 0;
        }
        return newScore;
      });
    } else {
      setScore2(prev => {
        const newScore = prev + 1;
        if (newScore >= 4 && newScore - score1 >= 2) {
          handleGame(2);
          return 0;
        }
        return newScore;
      });
    }
  };

  const handleGame = (winner: 1 | 2) => {
    if (winner === 1) {
      setGames1(prev => {
        const newGames = prev + 1;
        if (newGames >= 6 && newGames - games2 >= 2) {
          handleSet(1);
          return 0;
        }
        return newGames;
      });
    } else {
      setGames2(prev => {
        const newGames = prev + 1;
        if (newGames >= 6 && newGames - games1 >= 2) {
          handleSet(2);
          return 0;
        }
        return newGames;
      });
    }
    setScore1(0);
    setScore2(0);
  };

  const handleSet = (winner: 1 | 2) => {
    if (winner === 1) {
      setSets1(prev => {
        const newSets = prev + 1;
        if (newSets >= 2) {
          handleMatchComplete(1);
          return newSets;
        }
        return newSets;
      });
    } else {
      setSets2(prev => {
        const newSets = prev + 1;
        if (newSets >= 2) {
          handleMatchComplete(2);
          return newSets;
        }
        return newSets;
      });
    }
    setGames1(0);
    setGames2(0);
    setGameHistory(prev => [...prev, `Set ${winner === 1 ? sets1 + 1 : sets2 + 1} won by ${winner === 1 ? player1Name : player2Name}`]);
  };

  const handleMatchComplete = (winner: 1 | 2) => {
    setIsMatchComplete(true);
    const winnerName = winner === 1 ? player1Name : player2Name;
    Alert.alert(
      'Match Complete!',
      `${winnerName} wins the match!`,
      [
        {
          text: 'New Game',
          onPress: () => navigation.navigate('MainTabs', { screen: 'NewGame' }),
        },
        {
          text: 'View History',
          onPress: () => navigation.navigate('MainTabs', { screen: 'History' }),
        },
      ]
    );
  };

  const getScoreDisplay = (score: number) => {
    switch (score) {
      case 0: return '0';
      case 1: return '15';
      case 2: return '30';
      case 3: return '40';
      default: return 'Ad';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>vs {player2Name}</Text>
      </View>

      <View style={styles.scoreBoard}>
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>{player1Name}</Text>
          <Text style={styles.score}>{getScoreDisplay(score1)}</Text>
          <Text style={styles.games}>{games1}</Text>
          <Text style={styles.sets}>{sets1}</Text>
        </View>
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>{player2Name}</Text>
          <Text style={styles.score}>{getScoreDisplay(score2)}</Text>
          <Text style={styles.games}>{games2}</Text>
          <Text style={styles.sets}>{sets2}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isMatchComplete && styles.buttonDisabled]}
          onPress={() => handlePoint(1)}
          disabled={isMatchComplete}
        >
          <Text style={styles.buttonText}>Point for {player1Name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isMatchComplete && styles.buttonDisabled]}
          onPress={() => handlePoint(2)}
          disabled={isMatchComplete}
        >
          <Text style={styles.buttonText}>Point for {player2Name}</Text>
        </TouchableOpacity>
      </View>

      {gameHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Set History</Text>
          {gameHistory.map((entry, index) => (
            <Text key={index} style={styles.historyEntry}>{entry}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  playerSection: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  games: {
    fontSize: 20,
    marginTop: 10,
  },
  sets: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historyEntry: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default GameScreen; 