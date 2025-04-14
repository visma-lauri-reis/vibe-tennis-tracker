# Tennis Score Tracker

[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Latest-blue.svg)](https://reactnative.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A mobile application for tracking tennis matches, keeping score, and maintaining player statistics. Built with React Native, this app provides a seamless experience for tennis players to manage their matches and track their progress.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Match Scoring**: Track points, games, and sets in real-time
- **Player Management**: Create and manage player profiles
- **Match History**: View past matches and their outcomes
- **Statistics**: Track player performance with detailed statistics

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### For Windows:
1. Install [Node.js](https://nodejs.org/) (LTS version)
2. Install [Git](https://git-scm.com/download/win)
3. Install [Android Studio](https://developer.android.com/studio)
4. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android device

### For macOS:
1. Install [Node.js](https://nodejs.org/) (LTS version)
2. Install [Git](https://git-scm.com/download/mac)
3. Install [Android Studio](https://developer.android.com/studio) (for Android development)
4. Install [Xcode](https://developer.apple.com/xcode/) (for iOS development)
5. Install [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) on your iOS device

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/visma-lauri-reis/tennis-score-tracker.git
```

2. Navigate to the project directory
```bash
cd tennis-score-tracker
```

3. Install dependencies
```bash
npm install
```

4. Install Expo CLI globally
```bash
npm install -g expo-cli
```

## 📱 Running the App

### Option 1: Using Expo Go on your physical device (Easiest)

1. Start the development server
```bash
npm start
```

2. On your phone:
   - Open the Expo Go app
   - Scan the QR code that appears in your terminal
   - The app will load on your device

3. **Network Requirements**:
   - Your phone and computer must be on the same network
   - If you're not on the same network, you can:
     - Connect your phone to your computer's hotspot
     - Or connect your computer to your phone's hotspot
   - If you're having connection issues, try turning off your phone's mobile data

### Option 2: Using Android Virtual Device (AVD)

1. Open Android Studio
2. Go to **Tools** > **Device Manager**
3. Click on **Create Device**
4. Select a phone definition (e.g., Pixel 4)
5. Select a system image (recommended: API 33 or newer)
6. Complete the AVD creation
7. Start the AVD from the Device Manager
8. With the development server running in your terminal, press `a` to run on Android

### Troubleshooting

If you encounter any issues:

1. Make sure all prerequisites are installed correctly
2. Try restarting the development server:
   ```bash
   npm start -- --reset-cache
   ```
3. Check that your device and computer are on the same network
4. For Android Studio issues, try:
   - File > Invalidate Caches / Restart
   - Update Android Studio to the latest version

## 💻 Usage

1. **New Game**: Start a new match by selecting two players
2. **Score Tracking**: 
   - Track points (0, 15, 30, 40, Ad)
   - Track games (first to 6 with 2-game lead)
   - Track sets (best of 3)
3. **History**: View past matches and their outcomes
4. **Statistics**: See player performance metrics including:
   - Matches played
   - Matches won
   - Sets won
   - Win rate

## 🧪 Testing

The project uses Jest and React Native Testing Library for unit and integration testing.

### Running Tests

1. Run all tests:
```bash
npm test
```

2. Run tests in watch mode:
```bash
npm test -- --watch
```

3. Run tests for a specific file:
```bash
npm test path/to/test/file.test.ts
```

### Test Structure

Test files are located in `__tests__` directories next to the files they test:
```
src/
├── utils/
│   ├── scoring.ts
│   └── __tests__/
│       └── scoring.test.ts
```

### Test Coverage

The test suite includes:
- Unit tests for scoring logic
- Game state management tests
- Point, game, and set winning conditions
- Deuce and advantage scenarios

### Continuous Integration

Tests are automatically run on GitHub Actions for:
- Every push to the master branch
- Every pull request targeting the master branch

The CI pipeline:
- Uses Node.js 22
- Installs dependencies with `npm ci`
- Runs the test suite with `npm test`

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Structure

```
tennis-score-tracker/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── utils/           # Utility functions
│   ├── navigation/      # Navigation configuration
│   └── types/           # TypeScript type definitions
├── App.tsx              # Main application component
└── package.json         # Project dependencies
```

## Technologies Used

- React Native
- TypeScript
- React Navigation
- AsyncStorage for local data persistence

## Acknowledgments

- Tennis scoring rules based on official ITF regulations
- UI/UX inspired by modern tennis scoring apps 