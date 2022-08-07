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
    
    // speed of algorithm visualizer will be set by user
    var SECONDS = 0.1;

    // indicates weather the word was found in the board, false by default
    let FOUND = false;

    // fixed directions for up down left right
    const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    enableBuildBoardButton();

    let formcontainer = document.querySelector('.formcontainer');
    let title = document.getElementById('title');

    function enableBuildBoardButton() {
        let buildBoardBtn = document.getElementById('buildboardbtn');
        buildBoardBtn.addEventListener('click', () => {
            formcontainer.removeChild(buildBoardBtn);
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

                console.log('Valid Rows and Columns');
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

            console.log(`ROWS: ${ROWS}`);
            console.log(`COLS: ${COLS}`);
            console.log(`WORD: ${WORD}`);

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
                square.textContent = BOARD[r][c];
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
                console.log(`(${hoverAtRow}, ${hoverAtCol}) - ${keyValuePressed} - nthSquare ${nthSquare}`);
                
                let square = document.getElementById(`square-${nthSquare}`);
                BOARD[hoverAtRow][hoverAtCol] = keyValuePressed.toLowerCase();
                square.textContent = BOARD[hoverAtRow][hoverAtCol];   
                
                if (numberOfValidLetters == TOTAL_SQUARES) {
                    console.log('total squares exceeded');
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
                console.log(`(${hoverAtRow}, ${hoverAtCol}) - ${keyValuePressed}`);
                
                if (numberOfValidLetters == 0) {
                    console.log('no squares filled');
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
    }
});