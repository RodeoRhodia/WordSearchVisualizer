var BOARD = [['T', 'S'], ['A', 'B']];
var WORD = "BATS";
var ROWS = BOARD.length;
var COLS = BOARD[0].length;
var SECONDS = 0.5;

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

let sleep = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, SECONDS * 1000);  
    });
}

let dfs = async (r, c, index) => {
    if (index == WORD.length) {
        return true;
    } else if (r < 0 || r >= ROWS || c < 0 || c >= COLS || 
        BOARD[r][c] == "*" ||
        BOARD[r][c] != WORD[index]) {
            return false;
    }

    const letter = BOARD[r][c];
    BOARD[r][c] = "*";

    console.log(BOARD[0]);
    console.log(BOARD[1]);
    console.log(" ");

    index += 1;

    let result = false;

    for (let [dr, dc] of DIRECTIONS) {
        await sleep();
        let answer = await dfs(r + dr, c + dc, index);

        if (answer) {
            await sleep();
            result = true
        }
    }

    BOARD[r][c] = letter;

    console.log(BOARD[0]);
    console.log(BOARD[1]);
    console.log(" ");
    return result;
}

let processBoard = async () => {
    let result = false;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            await sleep();
            console.log(BOARD[r][c]);

            if (WORD[0] == BOARD[r][c]) {
                // if (dfs(r, c, 0)) {
                //     result = true;
                // }

                let answer = await dfs(r, c, 0);
                
                if (answer) {
                    result = true;
                }
            }
        }
    }
    return result;
}

let searchBoard = async () => {
    let answer = await processBoard(); 
    console.log(answer);    
}

searchBoard();
