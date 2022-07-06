const ROWS = 5;
const COLS = 3;

const container = document.getElementById("container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (let nthTile = 0; nthTile < (rows * cols); nthTile++) {
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65 + nthTile);
    // String.fromCharCode(65 + c + 1)
    container.appendChild(cell).className = "grid-item";
  };
};

makeRows(ROWS, COLS);