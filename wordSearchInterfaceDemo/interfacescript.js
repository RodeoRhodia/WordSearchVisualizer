document.addEventListener('DOMContentLoaded', () => {
    enableBuildBoardButton();
    
    function enableBuildBoardButton() {
        let buildBoardBtn = document.getElementById('buildboardbtn');
        let title = document.getElementById('title');
        let formcontainer = document.querySelector('.formcontainer');

        buildBoardBtn.addEventListener('click', () => {
            formcontainer.removeChild(buildBoardBtn);
            title.textContent = 'Enter Dimensions';

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
        dimensionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const totalRows = dimensionForm.querySelector('input[id="rowlength"]').value;
            const totalCols = dimensionForm.querySelector('input[id="columnlength"]').value;

            console.log(totalRows);
            console.log(totalCols);

        });
    }
});