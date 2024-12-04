const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like images, CSS, JS) from 'public' folder
app.use(express.static('public'));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let leaderboard = [];

// Handle client connections via Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for game moves
    socket.on('gameMove', (moveData) => {
        console.log('Game move received:', moveData);
        // Broadcast the move to other players
        socket.broadcast.emit('gameMove', moveData);
    });

    // Handle game over and leaderboard update
    socket.on('gameOver', (data) => {
        // Update leaderboard with new score
        leaderboard.push(data);
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Keep only top 10 scores
        if (leaderboard.length > 10) leaderboard = leaderboard.slice(0, 10);

        console.log("Updated leaderboard:", leaderboard);

        // Send the updated leaderboard to all clients
        io.emit('leaderboardUpdate', leaderboard);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
