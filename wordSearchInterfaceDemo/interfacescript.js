document.addEventListener('DOMContentLoaded', () => {
    let ROWS = null;
    let COLS = null;
    let WORD = null;

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

        dimensionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const totalRows = rowInputBox.value;
            const totalCols = colInputBox.value;


            if (totalRows >= 1 && totalRows <= 7 && totalCols >= 1 && totalCols <= 7) {
                rowInputBox.classList.remove('error');
                colInputBox.classList.remove('error');

                console.log('Valid Rows and Columns');
                ROWS = totalRows;
                COLS = totalCols;

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
                <input type="submit" id="submitdimensionsbtn" class="button" value="Search for Word">`;
        formcontainer.appendChild(wordForm);
        
        wordForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const inputWord = wordForm.querySelector('input[type="text"]').value;
            WORD = inputWord;
            formcontainer.removeChild(wordForm);

            console.log(`ROWS: ${ROWS}`);
            console.log(`COLS: ${COLS}`);
            console.log(`WORD: ${WORD}`);
        });
    }
});