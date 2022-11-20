function restartGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>'
  gameOverElement.style.display = 'none';

  let gameBoardInedex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;

      const gameBoardItemElement = gameBoardElement.children[gameBoardInedex]
      gameBoardItemElement.textContent = '';
      gameBoardItemElement.classList.remove('disabled');
      gameBoardItemElement.classList.remove('disabled-click');
      gameBoardInedex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" && players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  restartGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  console.log(event.target.tagName);
  if (event.target.tagName !== "LI" || gameIsOver) {
    // handle when user click between the gab
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select the empty field!");
    return;
  }

  console.log(selectedField);

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled-click");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkForGameOver();
  console.log(winnerId);

  // check if somebody win/draw the game
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Checking the colume
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal: Top left to bottom right
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][0] > 0 &&
      gameData[0][0] === gameData[1][1] &&
      gameData[1][1] === gameData[2][2]
    ) {
      return gameData[0][0];
    }
  }

  // Diagonal: Bottom left to top right
  for (let i = 0; i < 3; i++) {
    if (
      gameData[2][0] > 0 &&
      gameData[2][0] === gameData[1][1] &&
      gameData[1][1] === gameData[0][2]
    ) {
      return gameData[2][0];
    }
  }

  console.log('currentRound ' + currentRound)
  if (currentRound === 9) {
    return -1; // draw no one win
  }

  return 0; // no winner
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    // somebody win the game (WIN)
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    // nobody win the game (DRAW)
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
