var blocks = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function() {
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushBlock();
        slideBlock();
        generateBlock();
    }, 100);
}

function randomBlock() {
    return blocks[Math.floor(Math.random() * blocks.length)]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomBlock() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on a block, initialize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on block, moving mouse to drag the block
            tile.addEventListener("dragenter", dragEnter); //dragging block onto another block
            tile.addEventListener("dragleave", dragLeave); //leave block over another block
            tile.addEventListener("drop", dragDrop); //dropping a block over another block
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap blocks

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushBlock() {
    //crushFive();
    //crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let block1 = board[r][c];
            let block2 = board[r][c+1];
            let block3 = board[r][c+2];
            if (block1.src == block2.src && block2.src == block3.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let block1 = board[r][c];
            let block2 = board[r+1][c];
            let block3 = board[r+2][c];
            if (block1.src == block2.src && block2.src == block3.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let block1 = board[r][c];
            let block2 = board[r][c+1];
            let block3 = board[r][c+2];
            if (block1.src == block2.src && block2.src == block3.src && !block1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let block1 = board[r][c];
            let block2 = board[r+1][c];
            let block3 = board[r+2][c];
            if (block1.src == block2.src && block2.src == block3.src && !block1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideBlock() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.jpg";
        }
    }
}

function generateBlock() {
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomBlock() + ".jpg";
        }
    }
}
