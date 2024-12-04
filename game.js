var blocks = ["Blue", "Orange", "Green", "Pink", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var turns = 30; // Default turns
var currTile;
var otherTile;
var difficulty = "Medium"; // Default difficulty
var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || []; // Initialize leaderboard from localStorage


// Event listener for page load
window.onload = function () {
    showStartMenu();
};


// Show leaderboard
function showLeaderboard() {
    document.body.innerHTML = `<h1>Leaderboard</h1>`;
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboard";

    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Display top 10 scores
    const leaderboardList = document.createElement("ol");
    leaderboard.forEach((entry, index) => {
        if (index < 10) { // Show top 10 only
            const listItem = document.createElement("li");
            listItem.innerText = `${entry.name}: ${entry.score}`;
            leaderboardList.appendChild(listItem);
        }
    });

    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset Leaderboard";
    resetButton.onclick = resetLeaderboard;

    const backButton = document.createElement("button");
    backButton.innerText = "Back to Main Menu";
    backButton.onclick = showStartMenu;

    leaderboardContainer.appendChild(leaderboardList);
    leaderboardContainer.appendChild(resetButton);
    leaderboardContainer.appendChild(backButton);
    document.body.appendChild(leaderboardContainer);
}

// Reset leaderboard
function resetLeaderboard() {
    leaderboard = [];
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    alert("Leaderboard reset!");
    showLeaderboard();
}

// Update leaderboard
function updateLeaderboard(name, score) {
    leaderboard.push({ name, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// End game function: Prompt for name and show leaderboard
function endGame() {
    const playerName = prompt("Game Over! Enter your name:");
    if (playerName) {
        updateLeaderboard(playerName, score);
    }

    // Show leaderboard after saving the score
    showLeaderboard();
}

function showStartMenu() {
    const mainMenu = document.createElement("div");
    mainMenu.id = "mainMenu";

    const title = document.createElement("h1");
    title.innerText = "Block Match Game";

    const startButton = document.createElement("button");
    startButton.innerText = "Start New Game";
    startButton.onclick = startGameMenu;

    const leaderboardButton = document.createElement("button");
    leaderboardButton.innerText = "View Leaderboard";
    leaderboardButton.onclick = showLeaderboard;


    mainMenu.appendChild(title);
    mainMenu.appendChild(startButton);
    mainMenu.appendChild(leaderboardButton);


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
                score += 3;
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
                score += 3;
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
                score += 10;
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
                score += 10;
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
                score += 20;
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
                score += 20;
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
// Leaderboard: Initialize empty or load from local storage
var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Function to display the leaderboard
function showLeaderboard() {
    document.body.innerHTML = `<h1>Leaderboard</h1>`;
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboard";

    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Display top 10 scores
    const leaderboardList = document.createElement("ol");
    leaderboard.forEach((entry, index) => {
        if (index < 10) { // Show top 10 only
            const listItem = document.createElement("li");
            listItem.innerText = `${entry.name}: ${entry.score}`;
            leaderboardList.appendChild(listItem);
        }
    });

    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset Leaderboard";
    resetButton.onclick = resetLeaderboard;

    const backButton = document.createElement("button");
    backButton.innerText = "Back to Main Menu";
    backButton.onclick = showStartMenu;

    leaderboardContainer.appendChild(leaderboardList);
    leaderboardContainer.appendChild(resetButton);
    leaderboardContainer.appendChild(backButton);
    document.body.appendChild(leaderboardContainer);
}

// Function to reset the leaderboard
function resetLeaderboard() {
    leaderboard = [];
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    alert("Leaderboard reset!");
    showLeaderboard();
}

// Function to update leaderboard
function updateLeaderboard(name, score) {
    leaderboard.push({ name, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Modified endGame to include leaderboard functionality
function endGame() {
    const playerName = prompt("Game Over! Enter your name:");
    if (playerName) {
        updateLeaderboard(playerName, score);
    }

    // Show leaderboard after saving the score
    showLeaderboard();
}

// Include a "View Leaderboard" button in the main menu
function showStartMenu() {
    const mainMenu = document.createElement("div");
    mainMenu.id = "mainMenu";

    const title = document.createElement("h1");
    title.innerText = "Block Match Game";

    const startButton = document.createElement("button");
    startButton.innerText = "Start New Game";
    startButton.onclick = startGameMenu;

    const leaderboardButton = document.createElement("button");
    leaderboardButton.innerText = "View Leaderboard";
    leaderboardButton.onclick = showLeaderboard;

    mainMenu.appendChild(title);
    mainMenu.appendChild(startButton);
    mainMenu.appendChild(leaderboardButton);

    document.body.appendChild(mainMenu);
}
