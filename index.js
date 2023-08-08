const MAX_ROW = 7
const MAX_COL = 7
const MIN_ROW = 0
const MIN_COL = 0

class Board {
    constructor(root = null) {
        this.board = [...Array(8)].map(x => Array(8).fill(' '))
    }
}

class Knight {
    constructor(x, y, parent = null) {
        this.x = x
        this.y = y
        this.parent = parent
    }
}

// BFS
function knightMoves(start, end) {
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
            // if (board.board[rowIdx][colIdx] === 'x') return false // repeated, no need // maybe for DFS?
            return true
        })
        possibleMovesOfParent.forEach(node => {
            let [rowIdx, colIdx] = coordConversion([node.x, node.y])
            // board.board[rowIdx][colIdx] = 'x' // marking, maybe for DFS ?
        })
        queue = [...queue, ...possibleMovesOfParent]
        // console.log(queue)
        // console.log(board)
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
}

function coordConversion(coord) {
    return [MAX_ROW - coord[1], coord[0]] // tested
}

// knightMoves([0, 0], [1, 2])
// knightMoves([0, 0], [3, 3])
// knightMoves([3, 3], [0, 0])
// knightMoves([3, 3], [4, 3])