var BOARD = [['T', 'S'], ['A', 'B']];
var WORD = "BATS";
var ROWS = BOARD.length;
var COLS = BOARD[0].length;
var SECONDS = 1;

let sleep = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, SECONDS * 1000);  
    });
}

let processBoard = async () => {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            await sleep();
            console.log(BOARD[r][c]);

            if (BOARD[r][c] == WORD[0]) {
                await sleep();
                console.log(`is ${BOARD[r][c]} equal to "B"? ${BOARD[r][c] == WORD[0]}`);
            }

        }
    }
}

processBoard();