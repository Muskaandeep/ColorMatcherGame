# ColorMatcherGame

An Engaging Game to match color patterns within a time limit.

### Section 1: Project Description

**Project Description**  
The Color Matcher Game is a memory and speed-based game where players match color patterns within a grid of tiles. The game's simple mechanics and visually engaging design make it suitable for players seeking a quick, stimulating experience. It aims to enhance memory, speed, and color recognition skills. Designed to be accessible on both desktop and mobile platforms, the game offers a user-friendly interface and challenging mechanics.

### Section 2: Overview

**Objective**  
The primary goal of the Color Matcher Game is to provide a fun, accessible, and visually stimulating experience where players match color patterns within a limited time frame. This gameplay helps enhance color recognition and reflexes in an engaging way.

**Problem/Functionality**  
In a fast-paced world, people often prefer quick, accessible gaming experiences. This game addresses that demand by providing easy-to-understand mechanics, a straightforward interface, and quick sessions that challenge color recognition and reflexes.

**Scope**

- **Included Features:**
  - **Grid of Colorful Tiles:** Players interact with a grid filled with colored tiles, matching them to a pattern.
  - **Timed Mode:** Players must complete matches within a time limit, creating urgency.
  - **Increasing Difficulty:** Levels become more complex, adding colors and larger grids.
  - **Scoring System:** Rewards players for speed and accuracy.

- **Excluded Features:**
  - Multiplayer or online gameplay.
  - Advanced graphics and animations beyond a clean, minimalist design.

### Section 3: System Architecture

The game consists of three main components:

| Component        | Description                                                                                       |
|------------------|---------------------------------------------------------------------------------------------------|
| User Interface   | Built with HTML and CSS to provide a visually appealing and responsive game layout.               |
| Game Logic       | JavaScript with Phaser.js to manage game state, score tracking, timer functionality, and difficulty progression. |
| Data Management  | Local storage for saving and retrieving high scores and player statistics.                        |

### Section 4: Data Dictionary

| Data Entity | Description                                | Type    |
|-------------|--------------------------------------------|---------|
| Tile        | Represents each colored tile in the grid   | Object  |
| Pattern     | The specific color pattern to be matched   | Array   |
| Score       | The current score of the player            | Integer |
| TimeLeft    | Countdown timer for the current level      | Integer |
| Difficulty  | Level of difficulty (affects grid size)    | Enum    |
| PowerUp     | Available power-ups like Extra Time, Hint  | Enum    |

### Section 5: Data Design

- **Grid Data Structure:** The game grid is represented as a two-dimensional array of Tile objects, each containing properties such as color and position.
- **Pattern Matching Array:** The Pattern array holds the sequence of colors that players must replicate. This array is dynamically generated based on difficulty.
- **Score Calculation:** The score is updated based on the speed and accuracy of each pattern match. The score and time are stored temporarily during gameplay and persisted in local storage if it is a high score.

### Section 6: User Interface Design

The UI is designed to be simple and visually engaging, with clear sections for:

- **Game Grid:** Displays colorful tiles in a dynamic grid layout.
- **Timer Display:** Shows the countdown timer for each level.
- **Score Display:** Tracks and shows the player's current score.
- **Power-Ups and Controls:** Allows players to access power-ups like "Extra Time" and "Hint," as well as game control buttons like "Restart" and "Pause."
