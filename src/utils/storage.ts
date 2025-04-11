import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameHistoryItem {
  id: string;
  date: string;
  player1Name: string;
  player2Name: string;
  winner: string;
  score: string;
  setNumber: number;
}

const GAME_HISTORY_KEY = 'game_history';

export const saveGameToHistory = async (game: GameHistoryItem): Promise<void> => {
  try {
    const existingHistory = await getGameHistory();
    const updatedHistory = [...existingHistory, game];
    await AsyncStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving game to history:', error);
  }
};

export const getGameHistory = async (): Promise<GameHistoryItem[]> => {
  try {
    const history = await AsyncStorage.getItem(GAME_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting game history:', error);
    return [];
  }
};

export const clearGameHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(GAME_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing game history:', error);
  }
}; 