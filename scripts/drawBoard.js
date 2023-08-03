const boardElement = document.querySelector("#board");


export default function drawBoard(){
  for (let row = 0; row < 6; row++){
    for (let col = 0; col < 7; col++){
      const newCell = document.createElement("div");
      newCell.classList.add("cell");
      newCell.setAttribute("data-col", col);
      newCell.setAttribute("data-row", row);
      boardElement.appendChild(newCell);
    }
  }
}