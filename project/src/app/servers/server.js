const express = require('express');
const app = express();
const port = 100; // Choose a port for your server

// Define a route that responds to GET requests
app.get('/', (req, res) => {
    const { spawn } = require('child_process');
    spawn('python', [scriptPath].concat(args));
});

// Start the server
app.listen(port, () => {

});
