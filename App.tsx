import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
  MainTabs: undefined;
  Game: {
    player1Name: string;
    player2Name: string;
  };
};

export type MainTabParamList = {
  NewGame: undefined;
  History: undefined;
  Stats: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'NewGame') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="NewGame" component={NewGameScreen} options={{ title: 'New Game' }} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}

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
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Game" component={GameScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
