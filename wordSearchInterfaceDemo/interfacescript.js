document.addEventListener('DOMContentLoaded', () => {
    enableBuildBoardButton();
    let formcontainer = document.querySelector('.formcontainer');
    let title = document.getElementById('title');

    function enableBuildBoardButton() {
        let buildBoardBtn = document.getElementById('buildboardbtn');
        buildBoardBtn.addEventListener('click', () => {
            formcontainer.removeChild(buildBoardBtn);
            title.textContent = 'Enter Positive Non-Zero Dimensions';

            // display build board form
            const dimensionForm = document.createElement('form');
            dimensionForm.id = 'setdimensions';
            dimensionForm.innerHTML = `        
                <div class="formcontainer">
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


            if (totalRows != 0 && totalCols != 0) {
                console.log('Valid Rows and Columns');

                formcontainer.removeChild(dimensionForm);
            }

            if (totalRows == 0) {
                rowInputBox.classList.add('error');
            } else {
                rowInputBox.classList.remove('error');
            }

            if (totalCols == 0) {
                colInputBox.classList.add('error');
            } else {
                colInputBox.classList.remove('error');
            }

        });
    }

    function processWord() {
        title.textContent = 'Enter a word'
    }
});