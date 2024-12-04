// Import necessary modules or mock data
const { crushThree, crushFour, crushFive, slideBlock, generateBlock } = require('./game'); // Update path if needed

// Mock DOM elements and environment
beforeEach(() => {
    // Set up a mock DOM if functions interact with the DOM
    global.document = {
        createElement: jest.fn(() => ({
            addEventListener: jest.fn(),
            setAttribute: jest.fn(),
            appendChild: jest.fn(),
            id: "",
            src: "",
        })),
        getElementById: jest.fn(() => ({
            innerText: "",
        })),
    };
});

describe("Game Logic Tests", () => {
    test("crushThree should detect and crush matches of three", () => {
        const mockBoard = [
            [{ src: "Blue.jpg" }, { src: "Blue.jpg" }, { src: "Blue.jpg" }],
            [{ src: "Green.jpg" }, { src: "Pink.jpg" }, { src: "Orange.jpg" }],
            [{ src: "Red.jpg" }, { src: "Purple.jpg" }, { src: "Green.jpg" }],
        ];

        // Apply crushThree logic
        crushThree(mockBoard);

        // Validate if blocks were crushed and replaced with blank
        expect(mockBoard[0][0].src).toBe("blank.jpg");
        expect(mockBoard[0][1].src).toBe("blank.jpg");
        expect(mockBoard[0][2].src).toBe("blank.jpg");
    });

    test("crushFour should detect and crush matches of four", () => {
        const mockBoard = [
            [{ src: "Blue.jpg" }, { src: "Blue.jpg" }, { src: "Blue.jpg" }, { src: "Blue.jpg" }],
            [{ src: "Green.jpg" }, { src: "Pink.jpg" }, { src: "Orange.jpg" }, { src: "Red.jpg" }],
            [{ src: "Purple.jpg" }, { src: "Green.jpg" }, { src: "Pink.jpg" }, { src: "Blue.jpg" }],
        ];

        crushFour(mockBoard);

        expect(mockBoard[0][0].src).toBe("blank.jpg");
        expect(mockBoard[0][1].src).toBe("blank.jpg");
        expect(mockBoard[0][2].src).toBe("blank.jpg");
        expect(mockBoard[0][3].src).toBe("blank.jpg");
    });

    test("crushFive should detect and crush matches of five", () => {
        const mockBoard = [
            [{ src: "Blue.jpg" }, { src: "Blue.jpg" }, { src: "Blue.jpg" }, { src: "Blue.jpg" }, { src: "Blue.jpg" }],
            [{ src: "Green.jpg" }, { src: "Pink.jpg" }, { src: "Orange.jpg" }, { src: "Red.jpg" }, { src: "Purple.jpg" }],
            [{ src: "Purple.jpg" }, { src: "Green.jpg" }, { src: "Pink.jpg" }, { src: "Blue.jpg" }, { src: "Orange.jpg" }],
        ];

        crushFive(mockBoard);

        expect(mockBoard[0][0].src).toBe("blank.jpg");
        expect(mockBoard[0][1].src).toBe("blank.jpg");
        expect(mockBoard[0][2].src).toBe("blank.jpg");
        expect(mockBoard[0][3].src).toBe("blank.jpg");
        expect(mockBoard[0][4].src).toBe("blank.jpg");
    });

    test("slideBlock should fill empty spaces correctly", () => {
        const mockBoard = [
            [{ src: "Blue.jpg" }, { src: "blank.jpg" }],
            [{ src: "Red.jpg" }, { src: "Green.jpg" }],
        ];

        slideBlock(mockBoard);

        expect(mockBoard[1][1].src).toBe("Green.jpg");
        expect(mockBoard[1][0].src).toBe("Blue.jpg");
    });

    test("generateBlock should fill blank spaces with random blocks", () => {
        const mockBoard = [
            [{ src: "blank.jpg" }, { src: "Green.jpg" }],
            [{ src: "Red.jpg" }, { src: "blank.jpg" }],
        ];

        generateBlock(mockBoard);

        mockBoard.forEach(row => {
            row.forEach(block => {
                expect(block.src).not.toBe("blank.jpg");
            });
        });
    });
});
