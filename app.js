// Input Data
const CHAR_BOARD = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
const ROWS = CHAR_BOARD.length;
const COLS = CHAR_BOARD[0].length;
const WORD = "ABCCED";

const flattenedBoard = Array.prototype.concat.apply([], CHAR_BOARD);
const container = document.getElementById('container');

function makeTileBoard(rows, cols) {
  let tileBoard = new Array();

  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);


  for (let r = 0; r < rows; r++) {
    let tileBoardRow = new Array();

    for (let c = 0; c < cols; c++) {
      let tileElement = document.createElement("div");
      tileElement.innerText = CHAR_BOARD[r][c];
      
      container.appendChild(tileElement).className = "grid-item";
      let tileObject = {
        tileChar: CHAR_BOARD[r][c],
        tileElem: tileElement,
        isVisited: false,
        isInPath: false,
        removeFromPath: function() {
          tileObject.isInPath = false;
        },
        addToPath: function() {
          tileObject.isInPath = true;
        },
        visit: function() {
          tileObject.isVisited = true;
        }
      }
      tileBoardRow.push(tileObject);
    }
    tileBoard.push(tileBoardRow);
  }

  return tileBoard;
}

// iterate through each tile
function visitTiles(listOfTiles) {
  let delayPerTileVisit = 500;

  for (let r = 0; r < ROWS; r++) {
    /* Process ROWS with delay */
    (function (row) {
      setTimeout(function () {
        for (let c = 0; c < COLS; c++) {
          /* Process COLS with delay */
          (function (col) {
            setTimeout(
              // Processings the exact row col Tile
              function () {
                const currTile = listOfTiles[r][c];

                if (currTile.tileChar == WORD[0]) {
                  currTile.addToPath();
                  currTile.tileElem.className = 'grid-item-inPath';
                } else {
                  currTile.visit();
                  currTile.tileElem.className = 'grid-item-visited';
                }
              }, c * delayPerTileVisit);
          })(c);
        }
      }, r * COLS * delayPerTileVisit);
    })(r);
  }

  console.log(listOfTiles[0][0].isVisited);
  console.log(listOfTiles[0][0].isInPath);
  console.log(listOfTiles[0][1].isVisited);
  console.log(listOfTiles[0][1].isInPath);
}

let tileBoard = makeTileBoard(ROWS, COLS);

visitTiles(tileBoard);

// console.log(tileBoard);

// tileBoard[0][0].classList.remove('grid-item-inPath');
// tileBoard[0][1].tileElem.classList.add('grid-item-visited');
// tileBoard[0][1].tileElem.classList.remove('grid-item-visited');
// console.log(tileBoard[0][0].tileElem.classList.replace('grid-item', 'grid-item-inPath'));
// console.log(tileBoard[0][1].tileChar);