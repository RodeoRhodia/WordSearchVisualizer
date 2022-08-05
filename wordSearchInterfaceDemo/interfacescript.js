document.addEventListener('DOMContentLoaded', () => {
    enableBuildBoardButton();
    
    function enableBuildBoardButton() {
        let buildBoardBtn = document.getElementById('buildboardbtn');

        buildBoardBtn.addEventListener('click', () => {
            buildBoardBtn.style.display = "none";
        });
    }


    // document.addEventListener('click', (event) => {
    //     // console.log(event.key);

    //     let item = document.getElementById('item1');
    //     item.style.display = "none";
        
        
    // });
});