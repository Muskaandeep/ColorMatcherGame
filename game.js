var blocks = ["Blue", "Orange", "Green", "Pink", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var turns = 30; // Set initial turns

var currTile;
var otherTile;

window.onload = function() {
    startGame();

    // Game loop: Check and handle matches every 1/10th of a second
    window.setInterval(function() {
        crushBlock();
        slideBlock();
        generateBlock();
    }, 100);

    // Display initial turn count
    document.getElementById("turns").innerText = turns;
};

function randomBlock() {
    return blocks[Math.floor(Math.random() * blocks.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomBlock() + ".jpg";

            // Drag functionality
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            // Revert move
            currTile.src = currImg;
            otherTile.src = otherImg;
        } else {
            // Decrease turns if valid move
            turns--;
            document.getElementById("turns").innerText = turns;
            if (turns <= 0) {
                endGame();
            }
        }
    }
}

function crushBlock() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let block1 = board[r][c];
            let block2 = board[r][c + 1];
            let block3 = board[r][c + 2];
            if (block1.src == block2.src && block2.src == block3.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                score += 10;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let block1 = board[r][c];
            let block2 = board[r + 1][c];
            let block3 = board[r + 2][c];
            if (block1.src == block2.src && block2.src == block3.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                score += 10;
            }
        }
    }
}

function crushFour() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let block1 = board[r][c];
            let block2 = board[r][c + 1];
            let block3 = board[r][c + 2];
            let block4 = board[r][c + 3];
            if (block1.src == block2.src && block2.src == block3.src && block3.src == block4.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                block4.src = "./images/blank.jpg";
                score += 20;
                turns++; // Extra turn for a four-match
                document.getElementById("turns").innerText = turns;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let block1 = board[r][c];
            let block2 = board[r + 1][c];
            let block3 = board[r + 2][c];
            let block4 = board[r + 3][c];
            if (block1.src == block2.src && block2.src == block3.src && block3.src == block4.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                block4.src = "./images/blank.jpg";
                score += 20;
                turns++; // Extra turn for a four-match
                document.getElementById("turns").innerText = turns;
            }
        }
    }
}

function crushFive() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 4; c++) {
            let block1 = board[r][c];
            let block2 = board[r][c + 1];
            let block3 = board[r][c + 2];
            let block4 = board[r][c + 3];
            let block5 = board[r][c + 4];
            if (block1.src == block2.src && block2.src == block3.src && block3.src == block4.src && block4.src == block5.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                block4.src = "./images/blank.jpg";
                block5.src = "./images/blank.jpg";
                score += 25;
                turns++; // Extra turn for a five-match
                document.getElementById("turns").innerText = turns;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 4; r++) {
            let block1 = board[r][c];
            let block2 = board[r + 1][c];
            let block3 = board[r + 2][c];
            let block4 = board[r + 3][c];
            let block5 = board[r + 4][c];
            if (block1.src == block2.src && block2.src == block3.src && block3.src == block4.src && block4.src == block5.src && !block1.src.includes("blank")) {
                block1.src = "./images/blank.jpg";
                block2.src = "./images/blank.jpg";
                block3.src = "./images/blank.jpg";
                block4.src = "./images/blank.jpg";
                block5.src = "./images/blank.jpg";
                score += 25;
                turns++; // Extra turn for a five-match
                document.getElementById("turns").innerText = turns;
            }
        }
    }
}

function checkValid() {
    return true; // Simplified for this example; Add match checking here if necessary
}

function slideBlock() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind--;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.jpg";
        }
    }
}

function generateBlock() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (board[r][c].src.includes("blank")) {
                board[r][c].src = "./images/" + randomBlock() + ".jpg";
            }
        }
    }
}

function endGame() {
    alert("Game Over! Your score is: " + score);
    location.reload();
}
