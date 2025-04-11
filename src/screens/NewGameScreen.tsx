import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../../App';

type NewGameScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'NewGame'>,
  NativeStackScreenProps<RootStackParamList>
>;

const NewGameScreen: React.FC<NewGameScreenProps> = ({ navigation }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      navigation.navigate('Game', {
        player1Name,
        player2Name,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Game</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Player 1 Name"
          value={player1Name}
          onChangeText={setPlayer1Name}
        />
        <TextInput
          style={styles.input}
          placeholder="Player 2 Name"
          value={player2Name}
          onChangeText={setPlayer2Name}
        />
        <TouchableOpacity
          style={[styles.button, (!player1Name.trim() || !player2Name.trim()) && styles.buttonDisabled]}
          onPress={handleStartGame}
          disabled={!player1Name.trim() || !player2Name.trim()}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewGameScreen; 