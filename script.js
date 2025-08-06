document.addEventListener('DOMContentLoaded', () => {
  let gameBoard = new Array(9).fill("");
  const gameContainer = document.querySelector('#game-container');
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('game-status');
  const resetBtn = document.getElementById('reset-button');
  let currentPlayer = 'X';
  let gameOver = false; 

  gameContainer.addEventListener('click', handleCellClick);
  resetBtn.addEventListener('click', resetGame);

  function handleCellClick(event) {
    if (gameOver) return;
    const clicked = event.target;

    if (!clicked.classList.contains('cell')) return;

    const index = Array.from(cells).indexOf(clicked);
    if (gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer;
    clicked.innerText = currentPlayer;

    const winner = checkWinner(gameBoard);
    if (winner) {
      statusDisplay.innerText = `Player ${winner} Wins!`;
      gameOver = true;
      return;
    }

    if (isDraw(gameBoard)) {
      statusDisplay.innerText = "It's a Draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
  }

  function resetGame() {
    currentPlayer = 'X';
    gameBoard = new Array(9).fill("");
    gameOver = false;
    cells.forEach(cell => {
      cell.innerText = "";
      cell.style.pointerEvents = 'auto';
    });
    gameContainer.style.pointerEvents = 'auto';
    statusDisplay.innerText = "New Game!";
  }

  function checkWinner(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function isDraw(board) {
    for (let cell of board) {
      if (cell === "") {
        return false;
      }
    }
    return true;
  }
});
