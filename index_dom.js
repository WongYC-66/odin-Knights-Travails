// const MAX_ROW = 7
// const MAX_COL = 7
// const MIN_ROW = 0
// const MIN_COL = 0

// class Board {
//     constructor(root = null) {
//         this.board = [...Array(8)].map(x => Array(8).fill(' '))
//     }
// }

// class Knight {
//     constructor(x, y, parent = null) {
//         this.x = x
//         this.y = y
//         this.parent = parent
//     }
// }

// BFS
function knightMovesDOM(start, end) {
    let newNode = new Knight(start[0], start[1])
    let queue = [newNode]
    let solution
    while (queue.length > 0) {
        let parent = queue.shift() // if use queue.pop(), is DFS
        let grandPa = parent.parent
        if (parent.x === end[0] && parent.y === end[1]) {
            solution = parent // found then out
            break;
        }
        // add 8 possible moves
        let possibleMovesOfParent = []
        let move1 = new Knight(parent.x - 2, parent.y - 1, parent)
        let move2 = new Knight(parent.x - 1, parent.y - 2, parent)
        let move3 = new Knight(parent.x + 1, parent.y - 2, parent)
        let move4 = new Knight(parent.x + 2, parent.y - 1, parent)
        let move5 = new Knight(parent.x + 2, parent.y + 1, parent)
        let move6 = new Knight(parent.x + 1, parent.y + 2, parent)
        let move7 = new Knight(parent.x - 1, parent.y + 2, parent)
        let move8 = new Knight(parent.x - 2, parent.y + 1, parent)
        possibleMovesOfParent.push(move1, move2, move3, move4, move5, move6, move7, move8)
        possibleMovesOfParent = possibleMovesOfParent.filter(node => {
            if (node.x < MIN_COL || node.x > MAX_COL) return false // out of boundary, no need
            if (node.y < MIN_ROW || node.y > MAX_ROW) return false // out of boundary, no need
            if (grandPa && node.x === grandPa.x && node.y === grandPa.y) return false // cannot revert to grandPa. 
            let [rowIdx, colIdx] = coordConversion([node.x, node.y])
            return true
        })
        possibleMovesOfParent.forEach(node => {
            let [rowIdx, colIdx] = coordConversion([node.x, node.y])
        })
        queue = [...queue, ...possibleMovesOfParent]
    }
    console.log('solution found')
    let solutionArr = []
    let tmp = solution
    solutionArr.unshift([tmp.x, tmp.y])
    while (tmp.parent) {
        tmp = tmp.parent
        solutionArr.unshift([tmp.x, tmp.y])
    }
    //draw to chess board
    let finishedBoard = new Board()
    solutionArr.forEach(coord => {
        let [rowIdx, colIdx] = coordConversion(coord)
        finishedBoard.board[rowIdx][colIdx] = 'x'
    })
    console.log('----------------------------------------------------')
    console.log(`knightMoves([${start}], [${end}])`)
    console.log(`You made it in ${solutionArr.length - 1} moves! Here's your path:`)
    solutionArr.forEach(coord => console.log(`[${coord[0]}, ${coord[1]}]`))
    console.table(finishedBoard.board)
    console.log(solution)
    console.log('----------------------------------------------------')

    // DOM version
    let str = ''
    str += '----------------------------------------------'
    str += '</br>'
    str += `knightMoves([${start}], [${end}])`
    str += '</br>'
    str += `You made it in ${solutionArr.length - 1} moves! Here's your path:`
    str += '</br>'
    solutionArr.forEach(coord => str += `[${coord[0]}, ${coord[1]}]  </br>`)

    let display = document.querySelector('.display')
    display.innerHTML = str

    // draw board
    let boardDisplay = document.createElement('div')
    boardDisplay.classList.add('board')
    display.append(boardDisplay)
    finishedBoard.board.forEach(row => {
        row.forEach(cell => {
            const el = document.createElement('div')
            el.textContent = cell
            boardDisplay.append(el)
        })
    })


}

function coordConversion(coord) {
    return [MAX_ROW - coord[1], coord[0]] // tested
}

// DOM version, UI/input/draw board
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#run').addEventListener('click', () => {
        let start = document.querySelector('#startLoc').value.split(',').map(x => Number(x))
        let end = document.querySelector('#endLoc').value.split(',').map(x => Number(x))
        console.log(start, end)
        knightMovesDOM(start, end)
    })
})