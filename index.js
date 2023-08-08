const MAX_X = 7
const MAX_Y = 7
const MIN_X = 0
const MIN_Y = 0

const Game = function () {
    this.board = []
    for (let y = MAX_Y; y >= 0; y--) {
        let row = []
        for (let x = 0; x <= MAX_X; x++) {
            let newNode = new Node(x, y)
            row.push(newNode)
        }
        this.board.push(row)
    }
}

const Knight = function (root = null) {
    // let newNode = new Node(0, 0)
    this.path = []
    this.root = root

}

const Node = function (x = null, y = null, next = [], visited = false, distance = 0) {
    this.x = x
    this.y = y
    this.next = next
    this.visited = visited
    this.distance = distance
    // this.moves = moves
    // this.count = count
}


function createMoves(game) {
    // board , each location is a node, pointing to other node. graph relationship
    let count = 0
    game.board.forEach((row, i) => {
        row.forEach((node, j) => {
            count++
            // Find out all possible move, a knight can have 8 next moves (at max)
            if (node.x - 2 >= MIN_X && node.y - 1 >= MIN_Y) node.next.push([node.x - 2, node.y - 1])
            if (node.x - 1 >= MIN_X && node.y - 2 >= MIN_Y) node.next.push([node.x - 1, node.y - 2])
            if (node.x + 1 <= MAX_X && node.y - 2 >= MIN_Y) node.next.push([node.x + 1, node.y - 2])
            if (node.x + 2 <= MAX_X && node.y - 1 >= MIN_Y) node.next.push([node.x + 2, node.y - 1])
            if (node.x - 2 >= MIN_X && node.y + 1 <= MAX_Y) node.next.push([node.x - 2, node.y + 1])
            if (node.x - 1 >= MIN_X && node.y + 2 <= MAX_Y) node.next.push([node.x - 1, node.y + 2])
            if (node.x + 1 <= MAX_X && node.y + 2 <= MAX_Y) node.next.push([node.x + 1, node.y + 2])
            if (node.x + 2 <= MAX_X && node.y + 1 <= MAX_Y) node.next.push([node.x + 2, node.y + 1])
            //
            // console.log(node.next)
            node.next = node.next.map(item => {
                let boardCoord = convertToBoardCoord(item)
                // console.log(boardCoord)
                let otherNode = game.board[boardCoord[0]][boardCoord[1]]
                return otherNode
            })
            // console.log(count)
        })
    })

}

// try with BFS
function knightMoves(start, end, game) {
    // console.table({start, end})
    start = convertToBoardCoord(start)
    end = convertToBoardCoord(end)
    let startNode = game.board[start[0]][start[1]]
    let endNode = game.board[end[0]][end[1]]
    let solution = bfs(startNode, endNode)
    console.log(solution)

}

// https://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/
function bfs(x, y) {
    let newKnight = new Knight(x)
    let visited = new Set()
    console.log(newKnight)
    let queue = [x]
    let currentNode = newKnight.root
    let parent = newKnight.root
    while(queue.length > 0){
        console.log(queue)
        currentNode = queue.shift()
        if(visited.has(currentNode)) continue
        currentNode.distance = parent.distance + 1
        if(currentNode === y){
            return currentNode.distance
        } else {
            visited.add(currentNode)
            currentNode.next.forEach(x => queue.push(x))
        }
        parent = currentNode
    }
    console.log('out of whileloop')
}


function convertToBoardCoord(arr) {
    //helper function
    let boardCoord = [MAX_Y - arr[1], arr[0]] // row-7,col-0
    return boardCoord
}



// test
let newGame = new Game()
// let newKnight = new Knight()
createMoves(newGame)

// console.log(newGame.board)
// console.log(newKnight)


// console.log(knightMoves([0, 0], [1, 2], newGame))
console.log(knightMoves([0, 0], [3, 3], newGame))