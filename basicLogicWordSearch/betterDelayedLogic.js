const board = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]

// board.forEach((row) => {
//     currRow = ""
//     row.forEach((element) => {
//         currRow += `${element} `
//     })
//     console.log(currRow)
// })

// for (let r = 0; r < board.length; r++) {
//     row = ""
//     for (let c = 0; c < board[0].length; c++) {
//         row += `${board[r][c]} `
//     }
//     console.log(row)
// }

function taski(i) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000 * i)
    })
}

function taskj(i, j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(board[i][j])
            resolve()
        }, 1000 * j)
    })
}

async function doWork() {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            await taski(r)
            await taskj(r, c)
            console.log("delay")
        }
    }
}

doWork()
