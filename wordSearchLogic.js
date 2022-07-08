/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
    const ROWS = board.length;
    const COLS = board[0].length;
    
    function dfs(r, c, index) {
        if (index == word.length) {
            return true;
        } else if (r < 0 || c < 0 || 
            r >= ROWS || c >= COLS || 
            board[r][c] != word[index] || 
            board[r][c] == "*") {
            return false;
        }

        const letter = board[r][c];
        board[r][c] = "*";

        index += 1;

        result = (dfs(r - 1, c, index) || dfs(r + 1, c, index) ||
                    dfs(r, c - 1, index) || dfs(r, c + 1, index));

        board[r][c] = letter;
        return result;
    }

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (word[0] == board[r][c]) {
                if (dfs(r, c, 0)) {
                    return true;
                }
            }
        }
    }

    return false;
};