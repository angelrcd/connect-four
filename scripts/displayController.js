const playerOneScore = document.querySelector("#player-one-score");
const playerTwoScore = document.querySelector("#player-two-score");
const turnIndicator = document.querySelector("#turn-indicator");
const winnerIndicator = document.querySelector("#winner-indicator");


export function updateScoreDisplay(playerOne, playerTwo){
  playerOneScore.textContent = playerOne.score;
  playerTwoScore.textContent = playerTwo.score;
}

export function updateTurnIndicator(currentPlayer){
  const playerIdElem = turnIndicator.querySelector("#current-player-id")
  turnIndicator.setAttribute("data-player", currentPlayer._name);
  playerIdElem.textContent = currentPlayer._name;
}

export function swapTurnVictoryIndicator(victoriousPlayer){
  if(victoriousPlayer){
    const winnerElem = winnerIndicator.querySelector("p");
    winnerElem.textContent = `Player ${victoriousPlayer._name}`
  }
  turnIndicator.classList.toggle("hidden");
  winnerIndicator.classList.toggle("hidden");
}