document.addEventListener('DOMContentLoaded', () => {
    var BOARD = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]];
    const WORD = 'erv';
    const ROWS = BOARD.length;
    const COLS = BOARD[0].length;
    const TOTAL_SQUARES = ROWS * COLS;

    // speed of algorithm visualizer will be set by user
    var SECONDS = 0.5;

    // indicates weather the word was found in the board, false by default
    let result = false;

    // fixed directions for up down left right
    const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // function to allow blocks of code to execute synchronously
    function sleep() {
        return new Promise((resolve) => {
        setTimeout(resolve, SECONDS * 1000);  
        });
    }

    function calculateNthSquare(r, c) {
        return (r * (ROWS)) + (c + 1);
    }

    function createSquares() {
        const gameBoard = document.getElementById('board');
        gameBoard.style.setProperty('grid-template-columns', `repeat(${COLS}, 1fr)`);

        // itreate through user input data, board array while also constructing squares in game board
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let square = document.createElement('div');
                square.classList.add('square');
                let nthSquare = calculateNthSquare(r, c);
                square.setAttribute('id', `square-${nthSquare}`);
                square.textContent = BOARD[r][c];
                gameBoard.appendChild(square);                

            }
        }
    }

    let markSquareAsProcessed = (r, c) => {
        let nthSquare = calculateNthSquare(r, c);
        let square = document.getElementById(`square-${nthSquare}`);
        square.style.backgroundColor = 'orange';
        square.style.color = 'white';
    }

    let markSquareAsVisitedInCurrentPath = (r, c) => {
        let nthSquare = calculateNthSquare(r, c);
        let square = document.getElementById(`square-${nthSquare}`);
        square.style.backgroundColor = 'salmon';
        square.style.color = 'white';
    }

    let unmarkSquareAsVisitedInCurrentPath = (r, c) => {
        let nthSquare = calculateNthSquare(r, c);
        let square = document.getElementById(`square-${nthSquare}`);
        let letter = BOARD[r][c];
        if (letter == letter.toUpperCase()) {
            square.style.backgroundColor = 'orange';
            square.style.color = 'white';
        } else {
            square.style.backgroundColor = 'white';
            square.style.color = 'black';
        }
    }

    /**
     * The process board does the general logic of word search. It will perform a search at every 
     * cell in the board. If the first letter of word is found, it will perform a depth first search 
     * in the surrounding area.
     * 
     * @returns the result after processing board. returns true if word found in board otherwise false.
     */
    async function processBoard() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                // process the individual grid, mark it as orange
                await sleep();
                let nthSquare = calculateNthSquare(r, c);
                console.log(`${r} ${c} : ${BOARD[r][c]} nth:${nthSquare}`);
                markSquareAsProcessed(r, c);
                BOARD[r][c] = BOARD[r][c].toUpperCase();

                // perform a search if cell matches first letter in word
                if (WORD[0] == BOARD[r][c].toLowerCase() ) {
                    await sleep();
                    // waiting for the result to be found
                    result = await dfs(r, c, 0);

                    if (result) {
                        return result;
                    }
                }
            }
        }

        return result;
    }

    /**
     * Perform a recursive depth first search at every single cell. It will only continue if is
     * neighbors has the next letter of the words and it will continue the search in 
     * one path (either vertically or horizontally).
     * @param {number} r - the current row that is being visited
     * @param {number} c - the current column that is being visited
     * @param {number} index - the current letter being visited by index
     * @returns true if the word has been found in board, otherwise false
     */
    async function dfs(r, c, index) {
        /**
         * return true - if the index reaches the end of the word, every letter has been found in the board
         * 
         * return false - if the row or column is out of bounds or current cell is already in current dfs 
         * path or the current cell does not match with the current word's letter.
         */        
        if (index == WORD.length) {
            return true;
        } else if (r < 0 || r >= ROWS || c < 0 || c >= COLS || 
            BOARD[r][c] == "*" ||
            BOARD[r][c].toLowerCase() != WORD[index]) { 
                return false;
        }

        /* capture current cell character that matches corresponding letter in word */
        const letter = BOARD[r][c];
        // mark the content in the cell as visited with a star symbol
        BOARD[r][c] = "*";

        // prints current state of the board
        // LATER IMPLEMENT THIS AS 'marking as salmon pink', it is in the current dfs visited path
        await sleep();
        markSquareAsVisitedInCurrentPath(r, c)

        // increment index to move on to next letter in word
        index += 1;

        /**
         * perform dfs up, down, left, and right to see if remaining portion of word can be found in
         * respective direction
         */
        for (let [dr, dc] of DIRECTIONS) {
            /**
             * before every recursion call, invoking the sleep function allows the dfs to be delayed
             * so it can be visualized in the front-end
             */
            await sleep();

            let answer = await dfs(r + dr, c + dc, index);

            if (answer) {
                result = true;
            }
        }

        /**
         * mark the current cell as unvisited for backtracking, for cases where other cells may use it 
         * in later dfs paths
         */
        BOARD[r][c] = letter;

        // display the backtracking of algorithm
        await sleep();
        unmarkSquareAsVisitedInCurrentPath(r, c);

        return result;
    }

    /**
     * Perform a search on the board which includes a delayed display of the result.
     */
    async function searchBoard() {
        result = await processBoard(); 
        await sleep();
        console.log(result);    
    }

    // Playing the demo
    createSquares();
    searchBoard();
});