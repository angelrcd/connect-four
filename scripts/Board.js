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

    checkHorizontally(cell){
        const row = cell.row;
        const horizontalLine = [];

        for (let col = 0; col < 7; col++){
            horizontalLine.push(this.getCell(col, row));
        }

        return hasContinuousFourValues(horizontalLine);
    }

    checkVertically(cell){
        const col = cell.col;
        const verticalLine = [];

        for (let row = 0; row < 6; row++){
            verticalLine.push(this.getCell(col, row));
        }

        return hasContinuousFourValues(verticalLine);
    }

    checkBottomLeftToTopRightDiagonal(cell){
        let initialCell = cell;
        const diagonalLine = [];

        // Get the cell at the start of this diagonal
        const dinstanceToLeftBorder = cell.col - 0;
        const dinstanceToBottomBorder = 5 - cell.row;
        if (dinstanceToBottomBorder < dinstanceToLeftBorder){
            initialCell = this.getCell(cell.col - dinstanceToBottomBorder, cell.row + dinstanceToBottomBorder);
        } else {
            initialCell = this.getCell(cell.col - dinstanceToLeftBorder, cell.row + dinstanceToLeftBorder);
        }

        diagonalLine.push(initialCell);
        while(diagonalLine.at(-1).col !== 6 && diagonalLine.at(-1).row !== 0){
            const nextCol = diagonalLine.at(-1).col + 1;
            const nextRow = diagonalLine.at(-1).row - 1;
            const nextCell = this.getCell(nextCol, nextRow);
            diagonalLine.push(nextCell);
        }

        return hasContinuousFourValues(diagonalLine);
    }

    checkTopLeftToBottomRightDiagonal(cell){
        let initialCell = cell;
        const diagonalLine = [];

        // Get the cell at the start of this diagonal
        const dinstanceToLeftBorder = cell.col - 0;
        const dinstanceToTopBorder = cell.row - 0;
        if (dinstanceToTopBorder < dinstanceToLeftBorder){
            initialCell = this.getCell(cell.col - dinstanceToTopBorder, cell.row - dinstanceToTopBorder);
        } else {
            initialCell = this.getCell(cell.col - dinstanceToLeftBorder, cell.row - dinstanceToLeftBorder);
        }

        diagonalLine.push(initialCell);
        while(diagonalLine.at(-1).col !== 6 && diagonalLine.at(-1).row !== 5){
            const nextCol = diagonalLine.at(-1).col + 1;
            const nextRow = diagonalLine.at(-1).row + 1;
            const nextCell = this.getCell(nextCol, nextRow);
            diagonalLine.push(nextCell);
        }

        return hasContinuousFourValues(diagonalLine);
    }

    checkAllDirections(cell){
        const horizontalCheck = this.checkHorizontally(cell);
        const verticalCheck = this.checkVertically(cell);
        const diagonalCheck1 = this.checkBottomLeftToTopRightDiagonal(cell);
        const diagonalCheck2 = this.checkTopLeftToBottomRightDiagonal(cell);

        return horizontalCheck || verticalCheck || diagonalCheck1 || diagonalCheck2;
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

function hasContinuousFourValues(cellArr) {
    const targetLength = 4; // The length of the continuous sequence you want to check for
    const length = cellArr.length;
  
    // If the array is smaller than the target sequence, return false
    if (length < targetLength) {
      return false;
    }
  
    for (let i = 0; i <= length - targetLength; i++) {
      // Extract a subarray of four consecutive elements starting from index i
      const subArray = cellArr.slice(i, i + targetLength);
  
      // Check if all elements in the subarray are the same
      const allEqual = subArray.every(cell => {
        return (cell._player && cell._player === subArray[0]._player)
    });
  
      if (allEqual) {
        return true;
      }
    }
  
    return false; // No continuous sequence of four equal values found
  }