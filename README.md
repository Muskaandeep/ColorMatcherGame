# Color Matcher Game 🎮

## Project Description 📄

### 1.1 Project Name: 
**Color Matcher Game** 🎨

### 1.2 Description: 
The Color Matcher Game is a web-based puzzle game where players match colorful blocks in a grid. The game features different difficulty levels, a leaderboard, and the option to save top scores in the local storage. The goal is to match blocks by swapping adjacent tiles and crushing three or more matching blocks to score points. The game ends when the player runs out of turns, and their score is saved to the leaderboard. 🏆

### 1.3 Revision History 🔄:

| **Date**       | **Comment**  | **Author** |
|----------------|-------------|------------|
| 2024-12-04     | Initial draft | Muskaan   |

---

## Section 2: Overview 🌍

### 2.1 Purpose:
This module focuses on the core gameplay and leaderboard functionality. The intended audience is players who enjoy casual puzzle games. The module provides interaction with the game board, the logic for matching and crushing blocks, and saving player scores. 💡

### 2.2 Scope:
This module includes the implementation of the game board, drag-and-drop mechanics for matching blocks, a scoring system, difficulty adjustment, a leaderboard, and game reset functionality. It will interact with local storage for saving scores. 🔄

### 2.3 Requirements:

#### 2.3.1 Functional Requirements:

- **R1:** The system shall allow users to start a new game. 🆕
- **R2:** The system shall allow users to select difficulty (Easy, Medium, Hard). 🎮
- **R3:** The system shall allow users to view the leaderboard. 🏅
- **R4:** The system shall allow users to reset the leaderboard. 🔄
- **R5:** The system shall allow users to drag and drop blocks to match adjacent tiles. 🧩
- **R6:** The system shall update the score and turns remaining after each valid move. 📊

#### 2.3.2 Non-Functional Requirements:

- **Performance:** The system shall handle up to 50 concurrent players without noticeable performance degradation. ⚡
- **Reliability:** The system shall have a 99.9% uptime, with proper error handling for unexpected behaviors. 🛠️
- **Usability:** The game interface shall be intuitive and accessible for new players. 🤗

#### 2.3.3 Technical Requirements:

- **Hardware:** The game shall run on browsers with modern web standards. 🌐
- **Software:** The game shall be developed using HTML5, CSS, and JavaScript. 💻
- **Storage:** Player scores shall be stored locally using the browser's localStorage API. 🗃️

#### 2.3.4 Security Requirements:

- **Data Encryption:** All sensitive data (player names and scores) shall be stored securely using localStorage encryption methods if necessary. 🔐
- **Authentication:** No authentication is required, as the game is casual and does not store personal data on the server. 👤

#### 2.3.5 Estimates:

| **Description**                  | **Hrs. Est.** |
|-----------------------------------|---------------|
| Implement game board logic        | 8             |
| Develop drag-and-drop mechanics   | 6             |
| Leaderboard functionality         | 4             |
| Implement difficulty levels       | 3             |
| User interface design             | 5             |
| **Total**                         | 26            |

#### 2.3.6 Traceability Matrix:

| **SRS Requirement** | **SDD Module**           |
|---------------------|--------------------------|
| R1                  | 5.1.1 (Game Start)       |
| R2                  | 5.1.2 (Difficulty Levels)|
| R3                  | 5.1.3 (Leaderboard)      |

---

## Section 3: System Architecture 🏗️

### 3.1 Overview:
The system is designed using a client-side JavaScript model. The primary components are the game board, drag-and-drop logic, score management, and leaderboard functionality. The game data is stored temporarily in the browser using localStorage. 🌐

### 3.2 Architectural Diagrams:

- **Component Diagram:** Illustrates the separation of the game logic (game board, drag-and-drop handling) and leaderboard handling. 🧩
- **Sequence Diagram:** Shows the flow of events when a user interacts with the game (e.g., starting the game, making moves, crushing blocks). 🔄
- **Data Flow Diagram:** Represents how the game data (blocks, score, turns) is processed and updated during the game. 📈

---

## Section 4: Data Dictionary 🗂️

| **Field**    | **Notes**                               | **Type**   |
|--------------|-----------------------------------------|------------|
| ID           | Unique Identifier for each block       | DECIMAL    |
| NAME         | The type of block (e.g., "Blue")       | VARCHAR    |
| VALUE        | The value (score) output after crushing | INT        |

---

## Section 5: Data Design 💾

### 5.1 Persistent/Static Data:

- **Dataset:** LocalStorage stores player names and scores.

**Entities:**
- **Player:**
  - **Attributes:** Name, Score
  - **Relationships:** Many-to-One with Scores

---

## Section 6: User Interface Design 🎨

### 6.1 Overview:
The user interface consists of:
- **Start Menu:** Options for starting a new game or viewing the leaderboard.
- **Game Board:** Displays a 9x9 grid of colorful blocks.
- **Score and Turn Display:** Tracks the current score and remaining turns.
- **End Game:** Prompts the player for their name and saves the score.

### 6.2 User Interface Navigation Flow:

Main Menu → Start New Game → Game Board → End Game → Leaderboard → Main Menu

### 6.3 Use Cases:

- **Start Game:** Clicking the start button initializes the game board and sets up difficulty. 🔘
- **Match Blocks:** Players drag and drop blocks to match adjacent tiles. 🧩

---

## Section 7: Testing 🧪

### 7.1 Test Plan Creation:

- **Objective:** Ensure the game functions correctly, including block matching, score updating, and leaderboard saving. ✅
- **Scope:** Focus on functionality, usability, and data persistence (localStorage). 🔄
- **Resources:** QA personnel, testing tools like Jest or Mocha. 🛠️
- **Schedule:** Testing will take place after development of key features (Game Logic, Leaderboard). 🗓️
- **Test Cases:** Define tests for block matching, leaderboard sorting, and game end scenarios. 📋

---

## Section 8: Monitoring 📊

Monitoring will focus on performance metrics (load times, game interaction speed), error tracking, and user metrics (active users, session lengths). 🔍

---

## Section 9: Other Interfaces 🔌

There are no external interfaces; all interactions are client-side.

---

## Section 10: Extra Design Features / Outstanding Issues 🚀

None at this time.

---

## Section 11: References 📚

- HTML5 Game Design
- JavaScript LocalStorage

---

## Section 12: Glossary 📖

- **LocalStorage:** A web storage API that allows saving data in the browser. 💾
- **Leaderboard:** A display of the top players’ scores stored in localStorage. 🏆

---


