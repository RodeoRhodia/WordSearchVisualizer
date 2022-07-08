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
          tileObject.tileElem.className = 'grid-item-visited';
        },
        addToPath: function() {
          tileObject.isInPath = true;
          tileObject.tileElem.className = 'grid-item-inPath';
        },
        visit: function() {
          tileObject.isVisited = true;
          tileObject.tileElem.classList.add('grid-item-visited');
        }
      }
      tileBoardRow.push(tileObject);
    }
    tileBoard.push(tileBoardRow);
  }

  return tileBoard;
}

// iterate through each tile
function visitTiles(board) {
  let delayPerTileVisit = 500;
  let result = false;

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
                const currTile = board[row][col];
                currTile.visit();
                dfs(row, col, 0, board);

                // delayedDFS(row, col, 0, listOfTiles);
              }, c * delayPerTileVisit);
          })(c);
        }
      }, r * COLS * delayPerTileVisit);
    })(r);


  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dfs(row, col, index, board) {
  if (index == WORD.length) {
    return true;
  } else if (row < 0 || col < 0 || 
    row >= ROWS || col >= COLS ||
    board[row][col].tileChar != WORD[index] ||
    board[row][col].isInPath) {
      return false;
  }

  const currTile = board[row][col];
  console.log(currTile.tileChar);

  currTile.addToPath();

  index += 1;

  // result = (
  //   dfs(row - 1, col, index, board) || dfs(row + 1, col, index, board) ||
  //   dfs(row, col - 1, index, board) || dfs(row, col, index + 1, board));
  
  currTile.removeFromPath();
  

  // return result;


  
  // let index = 0;

  // function dfs() {
  //   setTimeout(function() {
  //     console.log("THE CODE");

  //     index += 1;

  //     if (index < WORD.length) {
  //       dfs();
  //     }
  //   }, delayPerTileVisit);
  // }

  // dfs();
}

let tileBoard = makeTileBoard(ROWS, COLS);
visitTiles(tileBoard);

// console.log(tileBoard);

// tileBoard[0][0].classList.remove('grid-item-inPath');
// tileBoard[0][1].tileElem.classList.add('grid-item-visited');
// tileBoard[0][1].tileElem.classList.remove('grid-item-visited');
// console.log(tileBoard[0][0].tileElem.classList.replace('grid-item', 'grid-item-inPath'));
// console.log(tileBoard[0][1].tileChar);