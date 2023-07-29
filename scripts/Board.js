export class Board {
    constructor(){
        this._board = new Array(42).fill().map(cell => new Cell());
        for (let row = 0; row < 6; row++){
            for (let col = 0; col < 7; col++){
                this._board[col + (row * 7)] = new Cell(col, row)
            }
        }
    }

    getCell(col, row){
        return this._board[col + (row * 7)];
    }

    // Return the cell where token was inserted
    insertToken(columnNumber, playerObject){
        if(columnNumber < 0 || columnNumber > 6){
            throw new RangeError("Column number out of range");
        }

        for(let row = 5; row >= 0; row--){
            const cell = this._board[columnNumber + (7 * row)]

            if (!cell.isEmpty()){
                continue;
            } else {
                cell.setPlayer(playerObject);
                return cell;
            }
        }

        throw new Error("Column full")
    }

    
}

class Cell {
    constructor(col, row){
        this.col = col;
        this.row = row;
        this._player = null;
    }

    isEmpty(){
        return this._player === null;
    }

    setPlayer(playerObject){
        this._player = playerObject;
    }
}