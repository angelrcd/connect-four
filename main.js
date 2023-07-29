import { Board } from "./scripts/Board.js";
import { Player } from "./scripts/Player.js";

const board = new Board();
const player1 = new Player(1);
const player2 = new Player(2);

console.log(board.insertToken(4, player1))
console.log(board.insertToken(4, player1))

console.log(board._board);