import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../utils/theme';
import { RootStackParamList } from '../../App';

type NewGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function NewGameScreen() {
  const navigation = useNavigation<NewGameScreenNavigationProp>();
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartGame = () => {
    if (!player1Name.trim() || !player2Name.trim()) {
      Alert.alert('Error', 'Please enter names for both players');
      return;
    }

    if (player1Name.trim() === player2Name.trim()) {
      Alert.alert('Error', 'Player names must be different');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate('Game', {
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim(),
      });
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Card variant="elevated" style={styles.card}>
        <Text style={styles.title}>New Game</Text>
        <Text style={styles.subtitle}>Enter player names to start a new match</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Player 1 Name"
              value={player1Name}
              onChangeText={setPlayer1Name}
              autoCapitalize="words"
            />
          </View>
          
          <View style={styles.vsContainer}>
            <View style={styles.vsLine} />
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.vsLine} />
          </View>
          
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Player 2 Name"
              value={player2Name}
              onChangeText={setPlayer2Name}
              autoCapitalize="words"
            />
          </View>
        </View>
        
        <Button
          title="Start Game"
          onPress={handleStartGame}
          variant="primary"
          icon="play-circle-outline"
          iconPosition="right"
          loading={isSubmitting}
          fullWidth
        />
      </Card>
      
      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Ionicons name="information-circle-outline" size={24} color={theme.colors.info} />
          <Text style={styles.infoTitle}>Game Rules</Text>
        </View>
        <Text style={styles.infoText}>
          • Best of 3 sets{'\n'}
          • First to 6 games with a 2-game lead{'\n'}
          • Points: 0, 15, 30, 40, Ad{'\n'}
          • Deuce at 40-40{'\n'}
          • Win by 2 points after deuce
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
  },
  inputIcon: {
    padding: theme.spacing.md,
  },
  input: {
    flex: 1,
    padding: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  vsText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  startButton: {
    marginTop: theme.spacing.md,
  },
  infoCard: {
    marginBottom: theme.spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  infoTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
}); 