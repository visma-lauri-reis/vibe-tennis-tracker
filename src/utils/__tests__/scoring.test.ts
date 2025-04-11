import { GameState, handlePoint } from '../scoring';

describe('Tennis Scoring Logic', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = {
      points1: 0,
      points2: 0,
      games1: 0,
      games2: 0,
      sets1: 0,
      sets2: 0,
      isDeuce: false,
      isAdvantage: false,
      advantagePlayer: null,
      isGameOver: false
    };
  });

  describe('Basic Point Scoring', () => {
    test('should increment points correctly', () => {
      handlePoint(1, gameState);
      expect(gameState.points1).toBe(15);
      expect(gameState.points2).toBe(0);

      handlePoint(1, gameState);
      expect(gameState.points1).toBe(30);
      expect(gameState.points2).toBe(0);

      handlePoint(1, gameState);
      expect(gameState.points1).toBe(40);
      expect(gameState.points2).toBe(0);
    });

    test('should handle alternating points', () => {
      handlePoint(1, gameState);
      handlePoint(2, gameState);
      handlePoint(1, gameState);
      handlePoint(2, gameState);

      expect(gameState.points1).toBe(30);
      expect(gameState.points2).toBe(30);
    });
  });

  describe('Deuce and Advantage', () => {
    test('should enter deuce at 40-40', () => {
      // Player 1 reaches 40
      handlePoint(1, gameState);
      handlePoint(1, gameState);
      handlePoint(1, gameState);

      // Player 2 reaches 40
      handlePoint(2, gameState);
      handlePoint(2, gameState);
      handlePoint(2, gameState);

      expect(gameState.isDeuce).toBe(true);
    });

    test('should handle advantage scoring', () => {
      // Reach deuce
      for (let i = 0; i < 3; i++) {
        handlePoint(1, gameState);
        handlePoint(2, gameState);
      }

      // Player 1 gets advantage
      handlePoint(1, gameState);
      expect(gameState.isAdvantage).toBe(true);
      expect(gameState.advantagePlayer).toBe(1);

      // Player 2 wins point back to deuce
      handlePoint(2, gameState);
      expect(gameState.isAdvantage).toBe(false);
      expect(gameState.advantagePlayer).toBe(null);
    });
  });

  describe('Game Winning', () => {
    test('should win game at 40-0', () => {
      // Player 1 wins game
      handlePoint(1, gameState);
      handlePoint(1, gameState);
      handlePoint(1, gameState);
      handlePoint(1, gameState);

      expect(gameState.games1).toBe(1);
      expect(gameState.points1).toBe(0);
      expect(gameState.points2).toBe(0);
    });

    test('should win game after advantage', () => {
      // Reach deuce
      for (let i = 0; i < 3; i++) {
        handlePoint(1, gameState);
        handlePoint(2, gameState);
      }

      // Player 1 wins game
      handlePoint(1, gameState);
      handlePoint(1, gameState);

      expect(gameState.games1).toBe(1);
      expect(gameState.isDeuce).toBe(false);
      expect(gameState.isAdvantage).toBe(false);
    });
  });

  describe('Set Winning', () => {
    test('should win set at 6-0', () => {
      // Player 1 wins 6 games
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          handlePoint(1, gameState);
        }
      }

      expect(gameState.sets1).toBe(1);
      expect(gameState.games1).toBe(0);
      expect(gameState.games2).toBe(0);
    });

    test('should win set at 6-4', () => {
      // Player 1 wins 5 games
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          handlePoint(1, gameState);
        }
      }

      // Player 2 wins 4 games
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          handlePoint(2, gameState);
        }
      }

      // Player 1 wins final game
      for (let j = 0; j < 4; j++) {
        handlePoint(1, gameState);
      }

      expect(gameState.sets1).toBe(1);
      expect(gameState.games1).toBe(0);
      expect(gameState.games2).toBe(0);
    });
  });

  describe('Match Winning', () => {
    test('should win match at 2-0', () => {
      // Player 1 wins first set
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          handlePoint(1, gameState);
        }
      }

      // Player 1 wins second set
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          handlePoint(1, gameState);
        }
      }

      expect(gameState.isGameOver).toBe(true);
      expect(gameState.sets1).toBe(2);
      expect(gameState.sets2).toBe(0);
    });
  });
}); 