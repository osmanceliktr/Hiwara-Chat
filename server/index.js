const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
app.get("/", (req, res) => {
    res.send("Chat API çalışıyor!");
  });
  
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    
    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data); // Broadcast the message to all connected clients
    });
    }
);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
}   
);