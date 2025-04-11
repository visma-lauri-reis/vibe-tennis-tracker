# Tennis Score Tracker

A mobile application for tracking tennis matches, keeping score, and maintaining player statistics.

## Features

- **Match Scoring**: Track points, games, and sets in real-time
- **Player Management**: Create and manage player profiles
- **Match History**: View past matches and their outcomes
- **Statistics**: Track player performance with detailed statistics
- **User Authentication**: Secure login system for personal data

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- React Native development environment set up

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tennis-score-tracker.git
cd tennis-score-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run the app:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

### Testing

The project uses Jest and React Native Testing Library for unit and integration testing.

1. Run all tests:
```bash
npm test
```

2. Run tests in watch mode (tests will re-run when files change):
```bash
npm test -- --watch
```

3. Run tests for a specific file:
```bash
npm test path/to/test/file.test.ts
```

Test files are located in `__tests__` directories next to the files they test. For example:
```
src/
├── utils/
│   ├── scoring.ts
│   └── __tests__/
│       └── scoring.test.ts
```

The test suite includes:
- Unit tests for scoring logic
- Game state management tests
- Point, game, and set winning conditions
- Deuce and advantage scenarios

## Usage

1. **Login**: Create an account or sign in to access your profile
2. **New Game**: Start a new match by selecting two players
3. **Score Tracking**: 
   - Track points (0, 15, 30, 40, Ad)
   - Track games (first to 6 with 2-game lead)
   - Track sets (best of 3)
4. **History**: View past matches and their outcomes
5. **Statistics**: See player performance metrics including:
   - Matches played
   - Matches won
   - Sets won
   - Win rate

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tennis scoring rules based on official ITF regulations
- UI/UX inspired by modern tennis scoring apps 