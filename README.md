# Color Matcher Game

## Section 1 - Project Description

### 1.1 Project
**Color Matcher Game**

### 1.2 Description
The Color Matcher Game is a visually engaging and fast-paced game where players must match color patterns within a grid of colorful tiles. The game tests and enhances the player's memory, reflexes, and color recognition abilities. It is designed to be simple yet challenging, with increasing difficulty levels, a countdown timer, and power-ups like extra time and hints. The game is built using HTML, CSS, JavaScript, and Phaser.js.

### 1.3 Revision History
| Date       | Comment          | Author |
|------------|------------------|--------|
| 2024-11-13 | Initial README setup | Muskaan|

---

## Section 2 - Overview

### 2.1 Purpose
The Color Matcher Game aims to provide a fun, fast-paced experience where players match color patterns within a set time. It serves to enhance memory, speed, and color recognition skills while offering a simple, accessible gameplay experience. The game is targeted at casual gamers looking for a quick and challenging game.

### 2.2 Scope
This module includes the grid-based tile matching game, featuring:
- A grid filled with colorful tiles.
- A time limit for each level.
- Increasing difficulty with larger grids and additional colors.
- A scoring system based on speed and accuracy.
- Power-ups to assist players (Extra Time, Hint).

### 2.3 Requirements

#### 2.3.1 Functional Requirements
- **R1:** The game shall display a grid of tiles with different colors.
- **R2:** The player shall match the tiles to a given color pattern within a time limit.
- **R3:** The game shall allow the player to earn points based on accuracy and speed.
- **R4:** The game shall support power-ups such as Extra Time and Hint.

#### 2.3.2 Non-Functional Requirements
- **Performance:** The game shall be responsive and run on both desktop and mobile devices.
- **Reliability:** The game shall have a high uptime and handle user interactions without crashing.

#### 2.3.3 Technical Requirements
- **Hardware:** The game shall run on any device with at least a 1 GHz processor and 2 GB of RAM.
- **Software:** The game shall be built using HTML, CSS, JavaScript, and Phaser.js for game logic.

#### 2.3.4 Security Requirements
- **Authentication:** No login is required for this game as it is for casual play.
- **Data Encryption:** The game shall not store sensitive data; however, any data saved, such as high scores, will be encrypted.

#### 2.3.5 Estimates
| Description                | Hrs. Est. |
|----------------------------|-----------|
| Design and Implementation   | 40 hrs    |
| Testing and Bug Fixing      | 15 hrs    |
| **Total**                   | **55 hrs** |

#### 2.3.6 Traceability Matrix
| SRS Requirement | SDD Module               |
|-----------------|--------------------------|
| **R1**          | 5.1.1 (Grid and Tile Design) |
| **R2**          | 5.1.2 (Pattern Matching)  |

---

## Section 3 - System Architecture

### 3.1 Overview
The system is composed of three main components:
- **User Interface:** HTML and CSS for layout and style.
- **Game Logic:** JavaScript and Phaser.js to handle game mechanics, scoring, and difficulty progression.
- **Data Management:** Uses local storage to store high scores and player statistics.

### 3.2 Architectural Diagrams

#### Component Diagram

| Component       | Description                                    |
|-----------------|------------------------------------------------|
| **User Interface** | Displays the game grid, score, timer, and controls. |
| **Game Logic** | Controls the gameplay, scoring, and progression. |
| **Data Management** | Stores high scores locally.                |

---

## Section 4 - Data Dictionary

| Data Entity   | Description                                      | Type    |
|---------------|--------------------------------------------------|---------|
| **Tile**      | Represents each colored tile in the grid        | Object  |
| **Pattern**   | The specific color pattern to be matched        | Array   |
| **Score**     | The current score of the player                  | Integer |
| **TimeLeft**  | Countdown timer for the current level            | Integer |
| **Difficulty**| Level of difficulty (affects grid size)          | Enum    |
| **PowerUp**   | Available power-ups like Extra Time, Hint        | Enum    |

---

## Section 5 - Data Design

### 5.1 Persistent/Static Data
- **High Scores:** Stored locally using the browser's localStorage.
- **Pattern Data:** A dynamically generated array of color patterns based on the current level.

#### 5.1.1 Dataset

| User         | Attributes: UserID (PK), Username, HighScore  |
|--------------|-----------------------------------------------|
| **Relationships** | One-to-Many with Scores                   |

---

## Section 6 - User Interface Design

### 6.1 User Interface Design Overview
The UI is clean, simple, and intuitive:
- **Game Grid:** A 4x4 grid for easy mode, expanding to 6x6 for hard mode.
- **Timer Display:** Countdown timer shows the time remaining for each level.
- **Score Display:** Displays the current score of the player.
- **Power-Ups:** Icons for Extra Time and Hint, allowing the player to use power-ups.

### 6.2 User Interface Navigation Flow
1. **Start Screen → Choose Difficulty → Start Game**
2. **Game Screen → Match Colors → Game Over → View High Scores**

### 6.3 Use Cases / User Function Description
- **Match Pattern:** Player matches the color pattern shown by clicking on tiles.
- **Use Power-Up:** Player clicks on the power-up button to get an extra hint or extra time.

---

## Section 7 - Testing

### 7.1 Test Plan Creation
- **Objective:** Ensure all game functionality works, including pattern matching, timer, scoring, and power-ups.
- **Scope:** Test all major features like grid rendering, timer countdown, and high score saving.

#### Test Environment

| Test Case    | Input        | Expected Output            | Actual Output |
|--------------|--------------|----------------------------|---------------|
| **Grid Test**| 4x4 Grid     | 16 tiles on screen         | Pass          |
| **Timer Test**| 30 seconds   | Countdown timer            | Pass          |

---

## Section 8 - Monitoring

### Key Metrics to Monitor
- **Performance Metrics:** Track game loading times, tile rendering speed.
- **Error Metrics:** Log any JavaScript errors or UI glitches.
- **Availability Metrics:** Ensure that the game runs without downtime.

---

## Section 9 - Other Interfaces

### 9.1 External Interface
- **LocalStorage:** Used for saving high scores and player data.

---

## Section 10 - Extra Design Features / Outstanding Issues

### Future Feature
- Multiplayer mode can be added in the future.

### Outstanding Issue
- Ensure that the game handles high scores when the player uses different browsers.

---

## Section 11 – References
- [Phaser.js Documentation](https://phaser.io/)
- [HTML5 Game Development](https://www.html5gamedevs.com/)

---

## Section 12 – Glossary

- **Tile:** A square on the game grid that can hold a color.
- **Pattern:** The color combination that the player needs to match.
