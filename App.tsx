import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import NewGameScreen from './src/screens/NewGameScreen';
import GameScreen from './src/screens/GameScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import StatsScreen from './src/screens/StatsScreen';

// Define navigation types
export type RootStackParamList = {
  Login: {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
  NewGame: undefined;
  Game: {
    player1Name: string;
    player2Name: string;
  };
  History: undefined;
  Stats: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            initialParams={{ setIsLoggedIn }}
          />
        ) : (
          <>
            <Stack.Screen name="NewGame" component={NewGameScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
