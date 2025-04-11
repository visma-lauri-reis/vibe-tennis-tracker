import AsyncStorage from '@react-native-async-storage/async-storage';

// Test account credentials
const TEST_USERNAME = 'test';
const TEST_PASSWORD = 'password123';

// Storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const USERNAME_KEY = 'username';

/**
 * Authenticates a user with the provided credentials
 * @param username The username to authenticate
 * @param password The password to authenticate
 * @returns A promise that resolves to true if authentication is successful, false otherwise
 */
export const login = async (username: string, password: string): Promise<boolean> => {
  // For demo purposes, we'll use a hardcoded test account
  if (username === TEST_USERNAME && password === TEST_PASSWORD) {
    // Generate a simple token (in a real app, this would be a JWT from a server)
    const token = `test-token-${Date.now()}`;
    
    // Store the token and username
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(USERNAME_KEY, username);
    
    return true;
  }
  
  return false;
};

/**
 * Checks if a user is currently logged in
 * @returns A promise that resolves to true if a user is logged in, false otherwise
 */
export const isLoggedIn = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
};

/**
 * Logs out the current user
 * @returns A promise that resolves when the logout is complete
 */
export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  await AsyncStorage.removeItem(USERNAME_KEY);
};

/**
 * Gets the username of the currently logged in user
 * @returns A promise that resolves to the username, or null if not logged in
 */
export const getCurrentUser = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(USERNAME_KEY);
}; 