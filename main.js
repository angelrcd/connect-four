import { Board } from "/scripts/Board.js";
import { Player } from "/scripts/Player.js";
import drawBoard from "/scripts/drawBoard.js";
import { updateScoreDisplay, updateTurnIndicator, swapTurnVictoryIndicator } from "/scripts/displayController.js";

drawBoard();

const cells = document.querySelectorAll(".cell");
const restartGameButton = document.querySelector("#restart-btn");
const newGameButton = document.querySelector("#menu-new");
const nextRoundButton = document.querySelector("#next-round-btn");

let board = new Board();
const player1 = new Player(1);
const player2 = new Player(2);
let currentTurn = player1;
let isBoardClickable = true;

updateScoreDisplay(player1, player2);
updateTurnIndicator(currentTurn);

newGameButton.addEventListener("click", () => {
  player1._score = 0;
  player2._score = 0;
  const menuModal = document.querySelector("#menu-modal")
  
  if (!isBoardClickable) {
    swapTurnVictoryIndicator();
  }
  
  updateScoreDisplay(player1, player2)
  restartGame();
  redrawBoard();
  menuModal.close();
})

cells.forEach(cell => {
  cell.addEventListener("click", ()=>{
    if (!isBoardClickable) return;

  // Inserts token in selected column
  const columnClicked = cell.getAttribute("data-col");
  const tokenInserted = board.insertToken(+columnClicked, currentTurn);
  
  // Check win condition
  const isVictory = board.checkAllDirections(tokenInserted);
  if(isVictory){
    const winner = isVictory[0]._player;
    winner.upScore();
    updateScoreDisplay(player1, player2);
    swapTurnVictoryIndicator(winner);

    isVictory.forEach(victoryCell => {
      const cellElem = getCellElementFromCell(victoryCell);
      cellElem.classList.add("victory");
    })

    isBoardClickable = !isBoardClickable;
  }

  // Draws token on screen
  const cellElem = getCellElementFromCell(tokenInserted);
  cellElem.setAttribute("data-player", currentTurn._name);

  // Show next player turn on screen
  changeTurn();
  updateTurnIndicator(currentTurn);
  })
})

restartGameButton.addEventListener("click", ()=> {
  if (!isBoardClickable){
    restartGame();
    swapTurnVictoryIndicator();
  } else {
    restartGame();
  }
})
nextRoundButton.addEventListener("click", ()=> {
  restartGame();
  swapTurnVictoryIndicator();
})

function changeTurn(){
  if(currentTurn === player1){
    currentTurn = player2;
  } else {
    currentTurn = player1;
  }
}

function getCellElementFromCell(cell){
  const cellIndex = cell.row * 7 + cell.col;
  return cells[cellIndex];
}

function restartGame(){
  board = new Board();
  redrawBoard();

  isBoardClickable = true;
}

function redrawBoard(){
  cells.forEach(cell => {
    cell.classList.remove("victory");
    cell.removeAttribute("data-player");
  })
}