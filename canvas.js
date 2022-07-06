const ROWS = 5;
const COLS = 3;


window.addEventListener('load', function() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const lastRowPosition = 50 + (200 * (ROWS - 1));
    const lastColPosition = 50 + (200 * (COLS - 1));
    for (let c =  50; c <= lastColPosition; c += 200) {
        for (let r = 50; r <= lastRowPosition; r += 200) {
            ctx.beginPath();
            ctx.rect(r, c, 200, 200);
            ctx.stroke();
        }
    }
});