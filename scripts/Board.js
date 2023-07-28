export class Board {
    constructor(){
        this._board = new Array(42).fill().map(cell => new Cell());
    }

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
                return;
            }
        }

        throw new Error("Column full")
    }
}

class Cell {
    constructor(){
        this._player = null;
        this._hasBeenChecked = false;
    }

    isEmpty(){
        return this._player === null;
    }

    setPlayer(playerObject){
        this._player = playerObject;
    }

    check(){
        this._hasBeenChecked = true;
    }

    uncheck(){
        this._hasBeenChecked = false;
    }
}