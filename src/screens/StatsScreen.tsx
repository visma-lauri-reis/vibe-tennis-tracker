import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../../App';

type StatsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Stats'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Temporary mock data
const mockStats = {
  totalGames: 15,
  wins: 10,
  losses: 5,
  winRate: '66.7%',
  averageSets: 2.3,
  longestMatch: '2 hours 15 minutes',
  favoriteOpponent: 'Alice',
  mostPlayedCourt: 'Court 3',
};

export default function StatsScreen({ navigation }: StatsScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockStats.totalGames}</Text>
          <Text style={styles.statLabel}>Total Games</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockStats.wins}</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockStats.losses}</Text>
          <Text style={styles.statLabel}>Losses</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockStats.winRate}</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Average Sets per Match</Text>
          <Text style={styles.detailValue}>{mockStats.averageSets}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Longest Match</Text>
          <Text style={styles.detailValue}>{mockStats.longestMatch}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Favorite Opponent</Text>
          <Text style={styles.detailValue}>{mockStats.favoriteOpponent}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Most Played Court</Text>
          <Text style={styles.detailValue}>{mockStats.mostPlayedCourt}</Text>
        </View>
      </View>
    </ScrollView>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
}); 