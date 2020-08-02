const canvas = document.getElementById('chessboard');
const ctx = canvas.getContext('2d');
canvas.addEventListener('mousedown', onDown, false);

ctx.scale(100, 100);

function onDown(event){
    cx = event.pageX;
    cy = event.pageY;

    var boardIndexX = Math.floor(cx / 100);
    var boardIndexY = Math.floor(cy / 100);
    console.log(boardIndexX, boardIndexY);


    if (board[boardIndexY][boardIndexX][1] != undefined){
        console.log(ctx.fillStyle);
        if (ctx.fillStyle == "#ffffff") {
            ctx.fillStyle = "red";
        } else {
            if ((boardIndexY + boardIndexX) % 2 == 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "gray";
            }
        }
        ctx.fillRect(boardIndexX, boardIndexY, 1, 1);
        img = document.getElementById(board[boardIndexY][boardIndexX][1]);
        ctx.drawImage(img, boardIndexX, boardIndexY, 1, 1);

        if (board[boardIndexY][boardIndexX][2] == 1) {
            var positions = findRookMovesButBetter(board, boardIndexX, boardIndexY);
            console.log(positions);
            ctx.fillStyle = "lightblue";
            for (i = 0; i < positions.length; i++) {
                ctx.fillRect(positions[i][0], positions[i][1], 1, 1);
            }
        } else if (board[boardIndexY][boardIndexX][2] == 3) {
            var positions = findBishopMoves(board, boardIndexX, boardIndexY);
            console.log(positions);
            ctx.fillStyle = "blue";
            for (i = 0; i < positions.length; i++) {
                ctx.fillRect(positions[i][0], positions[i][1], 1, 1);
            }
        }

    }
}


const board = [
    [[0], [1, "black_knight1", 2], [0], [1, "black_queen", 4], [0, "black_king", 5], [1, "black_bishop2", 3], [0, "black_knight2", 2], [1, "black_rook2", 1]],
    [[1, "black_pawn1", 0], [0, "black_pawn2", 0], [1, "black_pawn3", 0], [0, "black_pawn4", 0], [1, "black_pawn5", 0], [0, "black_pawn6", 0], [1, "black_pawn7", 0], [0, "black_pawn8", 0]],
    [[0], [1], [0], [1], [0], [1], [0], [1]],
    [[1], [0], [1], [0], [1], [0], [1], [0]],
    [[0], [1, "black_rook1", 1], [0], [1, "black_bishop1", 3], [0], [1], [0], [1]],
    [[1], [0], [1], [0], [1], [0], [1], [0]],
    [[0, "white_pawn1"], [1, "white_pawn2"], [0, "white_pawn3"], [1, "white_pawn4"], [0, "white_pawn5"], [1, "white_pawn6"], [0, "white_pawn7"], [1, "white_pawn8"]],
    [[1, "white_rook1"], [0, "white_knight1"], [1, "white_bishop1"], [0, "white_queen"], [1, "white_king"], [0, "white_bishop2"], [1, "white_knight2"], [0, "white_rook2"]],
]

function drawBoard(board){
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value[0] == 0){
                ctx.fillStyle = "white";
                ctx.fillRect(x, y, 1, 1);
                if (board[y][x][1] != undefined){
                    img = document.getElementById(board[y][x][1]);
                    ctx.drawImage(img, x, y, 1, 1);
                }
            } else if (value[0] === 1){
                ctx.fillStyle = "gray";
                ctx.fillRect(x, y, 1, 1);
                if (board[y][x][1] != undefined){
                    img = document.getElementById(board[y][x][1]);
                    ctx.drawImage(img, x, y, 1, 1);
                }
            }
        })
    })
}

function findRookMoves(board, x, y){ // ex: board[y][x]
    var rookMoves = [];
    for (i = 0; i < 8; i++){
        if (board[y][i][1] == undefined){
            rookMoves.push([i, y]);
        }
        if (board[i][x][1] == undefined) {
            rookMoves.push([x, i]);
        }
    }
    return rookMoves;
}

function findRookMovesButBetter(board, x,y){
    // use x and y and check positive and negative
    var rookMoves = [];

    for (i = x + 1; i < 8; i++) {
       if (board[y][i][1] == undefined) {
           rookMoves.push([i, y]);
       } else {
           break;
       }
    }
    for (i = x - 1; i >= 0; i--) {
       if (board[y][i][1] == undefined) {
           rookMoves.push([i, y]);
       } else {
           break;
       }
    }
    for (i = y + 1; i < 8; i++) {
        if (board[i][x][1] == undefined) {
            rookMoves.push([x, i]);
        } else {
            break;
        }
    }
    for (i = y - 1; i >= 0; i--) {
        if (board[i][x][1] == undefined) {
            rookMoves.push([x, i]);
        } else {
            break;
        }
    }
    return rookMoves; // epic this works lol so cool
}

function findBishopMoves(board, x, y){
    var bishopMoves = [];
    var tmpX = x + 1;
    var tmpY = y + 1;

    while (tmpX < 8 && tmpY < 8) {
        if (board[tmpY][tmpX][1] == undefined) {
            bishopMoves.push([tmpX, tmpY])
            tmpX++;
            tmpY++;
        } else {
            break;
        }

    }

    var tmpX = x - 1;
    var tmpY = y - 1;

    while (tmpX > 0 && tmpY > 0) {
        if (board[tmpY][tmpX][1] == undefined) {
            bishopMoves.push([tmpX, tmpY])
            tmpX--;
            tmpY--;
        } else {
            break;
        }
    }

    var tmpX = x + 1;
    var tmpY = y - 1;

    while (tmpX < 8 && tmpY > 0) {
        if (board[tmpY][tmpX][1] == undefined) {
            bishopMoves.push([tmpX, tmpY])
            tmpX++;
            tmpY--;
        } else {
            break;
        }

    }

    var tmpX = x - 1;
    var tmpY = y + 1;

    while (tmpX > 0 && tmpY < 8) {
        if (board[tmpY][tmpX][1] == undefined) {
            bishopMoves.push([tmpX, tmpY])
            tmpX--;
            tmpY++;
        } else {
            break;
        }
    }

    return bishopMoves;
}

function findKnightMoves(board, x, y) {
    // x + 2 y + 1
    // x + 2 y - 1
    // x - 2 y + 1
    // x - 2 y - 1
    // y + 2 x + 1
    // y + 2 x - 1
    // y - 2 x + 1
    // y - 2 x - 1
    // check all of these?
}

function findKingMoves(board, x, y) {

}

function findQueenMoves(board, x, y) {

}

function findPawnMoves(board, x, y) {
    // check if pawn is on starting square? put 3rd parameter on board? bool
    // ^for starting jumpthing
    // en passant no fucking clue
    // taking just check for piece on x + 1 || x - 1 y + 1  / y - 1 depending on the side
}

function checkCheckmate(board, x, y) {
    // dont rly know for this one
}

function main(board) {
    drawBoard(board);
}

main(board);
