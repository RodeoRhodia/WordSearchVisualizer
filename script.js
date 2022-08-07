document.addEventListener('DOMContentLoaded', () => {
    //----------------------------------------------------------------------//
    //
    // Initialize
    //
    //----------------------------------------------------------------------//
    let BOARD = null;
    let ROWS = null;
    let COLS = null;
    let WORD = null;
    let TOTAL_SQUARES = null;
    
    let removedfooter = false;
    
    // speed of algorithm visualizer will be set by user
    var SECONDS = 0.1;

    // indicates weather the word was found in the board, false by default
    let FOUND = false;

    // fixed directions for up down left right
    const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // Elements that are often edited in the interface
    let formcontainer = document.querySelector('.formcontainer');
    let title = document.getElementById('title');
    let playDemoBtn = document.getElementById('playdemobtn');
    let buildBoardBtn = document.getElementById('buildboardbtn');

    enableBuildBoardButton();
    enablePlayDemoButton();

    function clearInitialButtons() {
        let buttoncontainer = document.getElementById('buttoncontainer');
        formcontainer.removeChild(buttoncontainer);
    }

    function enablePlayDemoButton() {
        playDemoBtn.addEventListener('click', () => {
            clearInitialButtons();

            BOARD = [
                ['r', 'h', 'o', 'e', 'g', 'a', 's'],
                ['l', 'a', 's', 'v', 'e', 'j', 'o'],
                ['a', 'v', 'e', 'r', 'g', 'e', 'l'],
                ['n', 'e', 'g', 'e', 't', 'a', 'b'],
                ['d', 't', 'w', 'n', 'a', 'c', 'h'],
                ['l', 'd', 'i', 'm', 'g', 'e', 'v'],
                ['w', 's', 'p', 'e', 'u', 'd', 'z']
            ];
            WORD = 'vegan';
            ROWS = BOARD.length;
            COLS = BOARD[0].length;
            TOTAL_SQUARES = ROWS * COLS;

            const gameDiv = document.createElement('div');

            gameDiv.innerHTML = 
                `<div id="board-container">
                    <div id="board">
                    </div>
                </div>`;

            gameDiv.setAttribute('id', 'game');
            
            let parentContainer = formcontainer.parentElement;
            parentContainer.appendChild(gameDiv);

            formcontainer.parentElement.removeChild(formcontainer);

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
            title.textContent = `Searching for "${WORD.toUpperCase()}"`;
            waitForResult();
        });


    }
    function enableBuildBoardButton() {
        buildBoardBtn.addEventListener('click', () => {
            clearInitialButtons();

            title.textContent = 'Enter dimension lengths between 1-7';

            // display build board form
            const dimensionForm = document.createElement('form');
            dimensionForm.id = 'setdimensions';
            dimensionForm.innerHTML =         
                `<div class="formcontainer">
                    <div class="formitem">
                        <input class="dimension" type="number" id="rowlength" name="rowlength" oninput="this.value=this.value.slice(0,this.maxLength)" maxLength="1" placeholder="rows" required="true">
                    </div>
                    <div class="formitem" id="betweenrowscols">x</div>
                    <div class="formitem">
                        <input class="dimension" type="number" id="columnlength" name="collength" oninput="this.value=this.value.slice(0,this.maxLength)" maxLength="1" placeholder="cols" required="true">
                    </div>
                </div>   
                    <input type="submit" id="submitdimensionsbtn" class="button" value="Set Dimensions">`;
            formcontainer.appendChild(dimensionForm);
            processDimensions(dimensionForm);
        });
    }

    function processDimensions(dimensionForm) {
        const rowInputBox = document.getElementById('rowlength');
        const colInputBox = document.getElementById('columnlength');

        function initializeBoard(totalRows, totalCols) {
            BOARD = new Array(totalRows);


            TOTAL_SQUARES = totalRows * totalCols;

            for (let r = 0; r < BOARD.length; r++) {
                BOARD[r] = new Array(totalCols);

                for (let c = 0; c < BOARD[r].length; c++) {
                    BOARD[r][c] = null;
                }
            }
        }

        dimensionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const totalRows = Number(rowInputBox.value);
            const totalCols = Number(colInputBox.value);


            if (totalRows >= 1 && totalRows <= 7 && totalCols >= 1 && totalCols <= 7) {
                rowInputBox.classList.remove('error');
                colInputBox.classList.remove('error');

                // console.log('Valid Rows and Columns');
                ROWS = totalRows;
                COLS = totalCols;
                initializeBoard(totalRows, totalCols);

                formcontainer.removeChild(dimensionForm);
                processWordForm();
            }

            if (totalRows < 1 || totalRows > 7) {
                rowInputBox.classList.add('error');
            } else {
                rowInputBox.classList.remove('error');
            }

            if (totalCols < 1 || totalCols > 7) {
                colInputBox.classList.add('error');
            } else {
                colInputBox.classList.remove('error');
            }
            
        });        
    }

    function processWordForm() {
        title.textContent = 'Enter a Word:'

        const wordForm = document.createElement('form');
        wordForm.innerHTML =
            `<div class="formcontainer">
                <div class="formitem">
                    <input type="text" id="wordfield" name="worwordfieldd" maxLength="20" pattern="^[a-zA-Z]+$" placeholder="Word to Search" required="true">
                </div>
            </div>   
                <input type="submit" id="submitdimensionsbtn" class="button" value="Set as word to search">`;
        formcontainer.appendChild(wordForm);
        
        wordForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const inputWord = wordForm.querySelector('input[type="text"]').value;
            WORD = inputWord.toLowerCase();
            formcontainer.removeChild(wordForm);

            // console.log(`ROWS: ${ROWS}`);
            // console.log(`COLS: ${COLS}`);
            // console.log(`WORD: ${WORD}`);

            const gameDiv = document.createElement('div');

            gameDiv.innerHTML = 
                `<div id="board-container">
                    <div id="board">
                    </div>
                </div>`;

            gameDiv.setAttribute('id', 'game');
            
            let parentContainer = formcontainer.parentElement;
            parentContainer.removeChild(formcontainer);
            parentContainer.appendChild(gameDiv);

            createSquares();
        });
    }

    // function to allow blocks of code to execute synchronously
    function sleep() {
        return new Promise((resolve) => {
        setTimeout(resolve, SECONDS * 1000);  
        });
    }

    function calculateNthSquare(r, c) {
        if (r == 0) {
            return c + 1;
        } else if (r > 0) {
            return (COLS * (r)) + (c + 1);
        }
    }

    function createSquares() {
        if (!removedfooter) {
            let footer = document.getElementById('footer');
            footer.parentElement.removeChild(footer);
            removedfooter = true;
        }

        title.textContent = 'Enter letters in board, hit backspace to undo:';
        document.getElementById('navbar').style.marginBottom = "50px";

        const gameBoard = document.getElementById('board');
        gameBoard.style.setProperty('grid-template-columns', `repeat(${COLS}, 1fr)`);

        // itreate through user input data, board array while also constructing squares in game board
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let square = document.createElement('div');
                square.classList.add('square');
                let nthSquare = calculateNthSquare(r, c);
                square.setAttribute('id', `square-${nthSquare}`);
                gameBoard.appendChild(square);                
            }
        }

        let container = document.getElementById('container');
        container.innerHTML += 
            '<input type="submit" id="startsearchbtn" class="buttonbuilding" value="Building...">';
        let startSearchBtn = document.getElementById('startsearchbtn');

        let numberOfValidLetters = 0;
        let hoverAtRow = -1;
        let hoverAtCol = -1;
        function processKeyboardInput(event) {
            let letterRegex = /^[a-zA-Z]+$/;
            let keyValuePressed = event.key;

            let isKeyPressLetter = (keyValuePressed.length == 1 && keyValuePressed.match(letterRegex));
            let isKeypressBackspace = (event.key == 'Backspace');

            // Response when a letter is pressed
            if (isKeyPressLetter && numberOfValidLetters < TOTAL_SQUARES) {
                hoverAtCol++;
                if (hoverAtCol >= COLS) {
                    hoverAtCol = 0;
                    hoverAtRow++;
                } else if (hoverAtRow == -1) {
                    hoverAtRow++;
                }

                numberOfValidLetters++;
                let nthSquare = calculateNthSquare(hoverAtRow, hoverAtCol);
                // console.log(`(${hoverAtRow}, ${hoverAtCol}) - ${keyValuePressed} - nthSquare ${nthSquare}`);
                
                let square = document.getElementById(`square-${nthSquare}`);
                BOARD[hoverAtRow][hoverAtCol] = keyValuePressed.toLowerCase();
                square.textContent = BOARD[hoverAtRow][hoverAtCol];   
                
                if (numberOfValidLetters == TOTAL_SQUARES) {
                    // console.log('total squares exceeded');
                    startSearchBtn.classList.remove('buttonbuilding');
                    startSearchBtn.classList.add('button');
                    startSearchBtn.setAttribute('value', 'Start Search');

                    startSearchBtn.addEventListener('click', startSearch);
                }
            }

            // Response when backspace is pressed
            if (isKeypressBackspace && numberOfValidLetters > 0) {
                let nthSquare = calculateNthSquare(hoverAtRow, hoverAtCol);
                let square = document.getElementById(`square-${nthSquare}`);

                BOARD[hoverAtRow][hoverAtCol] = null;
                square.textContent = ' ';

                hoverAtCol--;
                if (hoverAtCol < 0 && hoverAtRow > 0) {
                    hoverAtCol = COLS - 1;
                    hoverAtRow--;
                }

                numberOfValidLetters--;
                // console.log(`(${hoverAtRow}, ${hoverAtCol}) - ${keyValuePressed}`);
                
                if (numberOfValidLetters == 0) {
                    // console.log('no squares filled');
                }

                if (numberOfValidLetters == (TOTAL_SQUARES - 1)) {
                    startSearchBtn.classList.remove('button');
                    startSearchBtn.classList.add('buttonbuilding');
                    startSearchBtn.setAttribute('value', 'Building...');

                    startSearchBtn.removeEventListener('click', startSearch);
                }
            }
        }

        document.addEventListener('keyup', processKeyboardInput);
    }

    function startSearch(event) {
        document.getElementById('title').textContent = `Searching for "${WORD.toUpperCase()}"`;
        let startSearchBtn = document.getElementById('startsearchbtn');
        let container = document.getElementById('container');
        container.removeChild(startSearchBtn);

        waitForResult();
    }

    let markSquareAsProcessed = (r, c) => {
        let nthSquare = calculateNthSquare(r, c);
        let square = document.getElementById(`square-${nthSquare}`);
        
        square.style.transition = 'initial';

        square.style.backgroundColor = 'orange';
        square.style.color = 'white';
    }

    let markSquareAsVisitedInCurrentPath = (r, c) => {
        let nthSquare = calculateNthSquare(r, c);
        let square = document.getElementById(`square-${nthSquare}`);

        square.style.transition = 'ease-in 0.5s';

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
                // console.log(`${r} ${c} : ${BOARD[r][c]} nth:${nthSquare}`);
                markSquareAsProcessed(r, c);
                BOARD[r][c] = BOARD[r][c].toUpperCase();

                // perform a search if cell matches first letter in word
                if (WORD[0] == BOARD[r][c].toLowerCase() ) {
                    await sleep();
                    // waiting for the result to be found
                    FOUND = await dfs(r, c, 0);

                    if (FOUND) {
                        return FOUND;
                    }
                }
            }
        }

        return FOUND;
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

        // only mark as visited if it has not been found
        if (!FOUND) {
            await sleep();
            markSquareAsVisitedInCurrentPath(r, c)
        }


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
                FOUND = true;
            }
        }

        /**
         * mark the current cell as unvisited for backtracking, for cases where other cells may use it 
         * in later dfs paths
         */
        BOARD[r][c] = letter;

        // // only display the backtracking if it has not been found
        if (!FOUND) {
            await sleep();
            unmarkSquareAsVisitedInCurrentPath(r, c);
        }

        return FOUND;
    }

    /**
     * Perform a search on the board which includes a delayed display of the result.
     */
    async function waitForResult() {
        if (!removedfooter) {
            let footer = document.getElementById('footer');
            footer.parentElement.removeChild(footer);
            removedfooter = true;
        }

        FOUND = await processBoard(); 
        await sleep();
        
        if (FOUND) {
            document.getElementById('title').textContent = 'Found Word !!!!';
        } else {
            document.getElementById('title').textContent = 'Word not found :((';
        }

        let container = document.getElementById('container');
        container.innerHTML += 
            '<input type="button" id="startoverbtn" class="button" value="Start Over" onClick="location.href=location.href">';
    }
});
