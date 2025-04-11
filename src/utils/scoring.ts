export interface GameState {
  points1: number;
  points2: number;
  games1: number;
  games2: number;
  sets1: number;
  sets2: number;
  isDeuce: boolean;
  isAdvantage: boolean;
  advantagePlayer: number | null;
  isGameOver: boolean;
}

const POINTS = [0, 15, 30, 40];

export function handlePoint(scoringPlayer: number, gameState: GameState): void {
  if (gameState.isGameOver) return;

  const currentPoints = scoringPlayer === 1 ? gameState.points1 : gameState.points2;
  const otherPoints = scoringPlayer === 1 ? gameState.points2 : gameState.points1;

  if (gameState.isDeuce) {
    handleDeucePoint(scoringPlayer, gameState);
  } else if (currentPoints === 40 && otherPoints < 40) {
    handleGameWin(scoringPlayer, gameState);
  } else {
    // Increment points
    if (scoringPlayer === 1) {
      gameState.points1 = POINTS[POINTS.indexOf(currentPoints) + 1];
    } else {
      gameState.points2 = POINTS[POINTS.indexOf(currentPoints) + 1];
    }

    // Check for deuce
    if (gameState.points1 === 40 && gameState.points2 === 40) {
      gameState.isDeuce = true;
    }
  }
}

function handleDeucePoint(scoringPlayer: number, gameState: GameState): void {
  if (!gameState.isAdvantage) {
    // First point after deuce gives advantage
    gameState.isAdvantage = true;
    gameState.advantagePlayer = scoringPlayer;
  } else if (gameState.advantagePlayer === scoringPlayer) {
    // Advantage player scores - win game
    handleGameWin(scoringPlayer, gameState);
  } else {
    // Other player scores - back to deuce
    gameState.isAdvantage = false;
    gameState.advantagePlayer = null;
  }
}

function handleGameWin(scoringPlayer: number, gameState: GameState): void {
  // Reset points and deuce state
  gameState.points1 = 0;
  gameState.points2 = 0;
  gameState.isDeuce = false;
  gameState.isAdvantage = false;
  gameState.advantagePlayer = null;

  // Increment games
  if (scoringPlayer === 1) {
    gameState.games1++;
  } else {
    gameState.games2++;
  }

  // Check for set win
  if (gameState.games1 >= 6 && gameState.games1 - gameState.games2 >= 2) {
    handleSetWin(1, gameState);
  } else if (gameState.games2 >= 6 && gameState.games2 - gameState.games1 >= 2) {
    handleSetWin(2, gameState);
  } else if (gameState.games1 === 6 && gameState.games2 <= 4) {
    handleSetWin(1, gameState);
  } else if (gameState.games2 === 6 && gameState.games1 <= 4) {
    handleSetWin(2, gameState);
  }
}

function handleSetWin(winningPlayer: number, gameState: GameState): void {
  // Reset games
  gameState.games1 = 0;
  gameState.games2 = 0;

  // Increment sets
  if (winningPlayer === 1) {
    gameState.sets1++;
  } else {
    gameState.sets2++;
  }

  // Check for match win
  if (gameState.sets1 >= 6) {  // Player 1 wins with 6 sets
    gameState.isGameOver = true;
  } else if (gameState.sets2 >= 6) {  // Player 2 wins with 6 sets
    gameState.isGameOver = true;
  } else if (gameState.sets1 >= 2 && gameState.sets1 - gameState.sets2 >= 2) {  // Player 1 wins by 2 sets
    gameState.isGameOver = true;
  } else if (gameState.sets2 >= 2 && gameState.sets2 - gameState.sets1 >= 2) {  // Player 2 wins by 2 sets
    gameState.isGameOver = true;
  }
} 