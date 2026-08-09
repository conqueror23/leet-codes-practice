function validTicTacToe(board: string[]): boolean {
  let xCount = 0;
  let oCount = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell === "X") xCount++;
      if (cell === "O") oCount++;
    }
  }

  const xWins = hasWon(board, "X");
  const oWins = hasWon(board, "O");

  // Rule 1: X always moves first, so X count must be equal to O
  // or exactly one more than O.
  if (!(xCount === oCount || xCount === oCount + 1)) {
    return false;
  }

  // Rule 2: Both players cannot win at the same time.
  if (xWins && oWins) {
    return false;
  }

  // Rule 3: If X wins, X must have played the last move.
  if (xWins && xCount !== oCount + 1) {
    return false;
  }

  // Rule 4: If O wins, O must have played the last move.
  if (oWins && xCount !== oCount) {
    return false;
  }

  return true;
}

function hasWon(board: string[], player: string): boolean {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === player &&
      board[row][1] === player &&
      board[row][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === player &&
      board[1][col] === player &&
      board[2][col] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }

  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
}

export { }
