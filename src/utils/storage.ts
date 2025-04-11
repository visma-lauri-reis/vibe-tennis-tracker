import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameHistoryItem {
  id: string;
  player1: string;
  player2: string;
  date: string;
  score: string;
  sets: {
    player1: number;
    player2: number;
  };
}

const HISTORY_KEY = '@tennis_score_tracker:history';

export const saveGameToHistory = async (game: Omit<GameHistoryItem, 'id' | 'date'>) => {
  try {
    const existingHistory = await getGameHistory();
    const newGame: GameHistoryItem = {
      ...game,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify([newGame, ...existingHistory])
    );
    
    return true;
  } catch (error) {
    console.error('Error saving game to history:', error);
    return false;
  }
};

export const getGameHistory = async (): Promise<GameHistoryItem[]> => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting game history:', error);
    return [];
  }
}; 