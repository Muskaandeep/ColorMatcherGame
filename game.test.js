// Import the necessary game functions (make sure to adjust the path as needed)
import { crushFour, crushFive, generateBlock, score } from './game'; // Assuming the functions are in 'game.js'

describe('Game Functions', () => {
  let board;

  beforeEach(() => {
    // Create a mock board (mocking image src and empty spots)
    board = [];
    for (let r = 0; r < 5; r++) {
      const row = [];
      for (let c = 0; c < 5; c++) {
        row.push({ src: './images/blank.jpg' }); // Default to blank
      }
      board.push(row);
    }
  });

  test('crushFour should detect and crush horizontal 4-match', () => {
    // Set up a horizontal match for testing (4 consecutive blocks with the same image)
    board[0][0].src = './images/block1.jpg';
    board[0][1].src = './images/block1.jpg';
    board[0][2].src = './images/block1.jpg';
    board[0][3].src = './images/block1.jpg';

    // Call the crushFour function
    crushFour(board); // Assuming crushFour is passed the board as an argument

    // Check that the blocks have been "crushed" (replaced with blank)
    expect(board[0][0].src).toBe('./images/blank.jpg');
    expect(board[0][1].src).toBe('./images/blank.jpg');
    expect(board[0][2].src).toBe('./images/blank.jpg');
    expect(board[0][3].src).toBe('./images/blank.jpg');
    
    // Check that score has increased (assuming score is a global or exported variable)
    expect(score).toBe(4);
  });

  test('crushFive should detect and crush vertical 5-match', () => {
    // Set up a vertical match for testing (5 consecutive blocks with the same image)
    board[0][0].src = './images/block1.jpg';
    board[1][0].src = './images/block1.jpg';
    board[2][0].src = './images/block1.jpg';
    board[3][0].src = './images/block1.jpg';
    board[4][0].src = './images/block1.jpg';

    // Call the crushFive function
    crushFive(board); // Assuming crushFive is passed the board as an argument

    // Check that the blocks have been "crushed" (replaced with blank)
    expect(board[0][0].src).toBe('./images/blank.jpg');
    expect(board[1][0].src).toBe('./images/blank.jpg');
    expect(board[2][0].src).toBe('./images/blank.jpg');
    expect(board[3][0].src).toBe('./images/blank.jpg');
    expect(board[4][0].src).toBe('./images/blank.jpg');
    
    // Check that score has increased (assuming score is a global or exported variable)
    expect(score).toBe(5);
  });

  test('generateBlock should generate new blocks in blank spaces', () => {
    // Simulate the scenario where some blocks are blank
    board[0][0].src = './images/blank.jpg';
    board[1][1].src = './images/blank.jpg';

    // Simulate generating a new block (mock the behavior of generateBlock)
    const originalBlock = board[0][0].src;
    
    generateBlock(board); // Assuming generateBlock replaces a blank with a new block

    // Ensure that a blank spot is replaced with a new block
    expect(board[0][0].src).not.toBe(originalBlock);
    expect(board[1][1].src).not.toBe(originalBlock);
  });
});
