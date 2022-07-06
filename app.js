const BOARD = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
const ROWS = BOARD.length;
const COLS = BOARD[0].length;

const flattenedBoard = Array.prototype.concat.apply([], BOARD);


const container = document.getElementById('container');

function makeRows(rows, cols) {


  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (let nthTile = 0; nthTile < (rows * cols); nthTile++) {
    let tile = document.createElement("div");
    tile.innerText = flattenedBoard[nthTile];

    container.appendChild(tile).className = "grid-item";
  };
};

// iterate through each tile
function visitTiles(listOfTiles) {
  let i = 0;                 

  function myLoop() {         
    setTimeout(function() {   
      listOfTiles[i].classList.add('grid-item-visited');

      i++;
      if (i < listOfTiles.length) {          
        myLoop();             
      }                       
    }, 500);
  }

  myLoop();
}

makeRows(ROWS, COLS);

const tileList = Array.from(document.querySelector('#container').children);
visitTiles(tileList);