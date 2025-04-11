import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../../App';

type HistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'History'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Temporary mock data
const mockHistory = [
  { id: '1', player1: 'John', player2: 'Alice', date: '2024-03-20', score: '6-4, 7-5' },
  { id: '2', player1: 'Bob', player2: 'Charlie', date: '2024-03-19', score: '6-2, 6-3' },
  { id: '3', player1: 'David', player2: 'Eve', date: '2024-03-18', score: '6-7, 6-4, 6-3' },
];

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const renderItem = ({ item }: { item: typeof mockHistory[0] }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.players}>{item.player1} vs {item.player2}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game History</Text>
      <FlatList
        data={mockHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  players: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  score: {
    fontSize: 16,
    color: '#007AFF',
  },
}); 