var blocks = ["Blue", "Orange", "Green", "Pink", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var turns = 30; // Default turns
var currTile;
var otherTile;
var difficulty = "Medium"; // Default difficulty

// Event listener for page load
window.onload = function () {
    showStartMenu();
};

function showStartMenu() {
    const mainMenu = document.createElement("div");
    mainMenu.id = "mainMenu";

    const title = document.createElement("h1");
    title.innerText = "Block Match Game";

    const startButton = document.createElement("button");
    startButton.innerText = "Start New Game";
    startButton.onclick = startGameMenu;

    const settingsButton = document.createElement("button");
    settingsButton.innerText = "Settings";
    settingsButton.onclick = showSettings;

    mainMenu.appendChild(title);
    mainMenu.appendChild(startButton);
    mainMenu.appendChild(settingsButton);
    document.body.appendChild(mainMenu);
}

function startGameMenu() {
    // Clear menu and initialize game
    document.body.innerHTML = `
        <h1>Score: <span id="score">0</span></h1>
        <h1>Turns: <span id="turns">${turns}</span></h1>
        <h2>Difficulty: <span id="difficulty">${difficulty}</span></h2>
        <div id="board"></div>
        <button id="endGameButton">End Game</button>
    `;

    document.getElementById("endGameButton").onclick = endGame; // Button to end the game

    startGame();

    // Game loop: Check and handle matches every 1/10th of a second
    window.setInterval(function () {
        crushBlock();
        slideBlock();
        generateBlock();
    }, 100);
}

function showSettings() {
    document.body.innerHTML = "";

    const settingsMenu = document.createElement("div");
    settingsMenu.id = "settingsMenu";

    const settingsTitle = document.createElement("h1");
    settingsTitle.innerText = "Settings";

    const difficultyLabel = document.createElement("h2");
    difficultyLabel.innerText = "Select Difficulty:";

    const difficultyOptions = ["Easy", "Medium", "Hard"];
    difficultyOptions.forEach((level) => {
        const button = document.createElement("button");
        button.innerText = level;
        button.onclick = function () {
            difficulty = level;
            setDifficulty(level);
        };
        settingsMenu.appendChild(button);
    });

    const backButton = document.createElement("button");
    backButton.innerText = "Back to Menu";
    backButton.onclick = function () {
        document.body.innerHTML = "";
        showStartMenu();
    };

    settingsMenu.appendChild(settingsTitle);
    settingsMenu.appendChild(difficultyLabel);
    settingsMenu.appendChild(backButton);
    document.body.appendChild(settingsMenu);
}

function setDifficulty(level) {
    // Show selected difficulty level
    const difficultySpan = document.getElementById("difficulty");
    difficultySpan.innerText = level;

    // Keep the number of rows and columns the same for all difficulties
    if (level === "Easy") {
        turns = 40; // More turns for easy difficulty
    } else if (level === "Medium") {
        turns = 30; // Default turns for medium difficulty
    } else if (level === "Hard") {
        turns = 20; // Fewer turns for hard difficulty
    }
}

function randomBlock() {
    return blocks[Math.floor(Math.random() * blocks.length)];
}

function startGame() {
    board = [];  // Reset board before starting a new game

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
            currTile.src = currImg;
            otherTile.src = otherImg;
        } else {
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
    // Horizontal 4-match
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
            }
        }
    }

    // Vertical 4-match
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
            }
        }
    }
}

function crushFive() {
    // Horizontal 5-match
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
                score += 30;
            }
        }
    }

    // Vertical 5-match
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
                score += 30;
            }
        }
    }
}

function slideBlock() {
    // Make blocks fall and fill empty spaces
    for (let c = 0; c < columns; c++) {
        let emptySpace = -1;
        for (let r = rows - 1; r >= 0; r--) {
            let block = board[r][c];
            if (block.src.includes("blank")) {
                if (emptySpace === -1) {
                    emptySpace = r;
                }
            } else if (emptySpace !== -1) {
                let emptyBlock = board[emptySpace][c];
                emptyBlock.src = block.src;
                block.src = "./images/blank.jpg";
                emptySpace--;
            }
        }
    }
}

function generateBlock() {
    for (let c = 0; c < columns; c++) {
        for (let r = rows - 1; r >= 0; r--) {
            let block = board[r][c];
            if (block.src.includes("blank")) {
                block.src = "./images/" + randomBlock() + ".jpg";
            }
        }
    }
}

function endGame() {
    alert("Game Over! Final Score: " + score);
    document.body.innerHTML = "";
    showStartMenu();
}
