const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API ROUTES ---
app.use('/api', apiRoutes);
// You can keep your /api/execute route for the code runner if you want

// --- SOCKET.IO INTEGRATION ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's address
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle joining a chat room
  socket.on('joinRoom', async (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
    
    // Send previous messages to the user
    try {
        const previousMessages = await Message.find({ chatRoom: room }).sort({ timestamp: 1 });
        socket.emit('previousMessages', previousMessages);
    } catch (err) {
        console.error('Error fetching previous messages:', err);
    }
  });

  // Handle new messages
  socket.on('sendMessage', async (data) => {
    const { room, user, text } = data;
    const newMessage = new Message({
      chatRoom: room,
      user: user,
      text: text,
    });
    try {
        await newMessage.save();
        // Broadcast the new message to everyone in the room
        io.to(room).emit('receiveMessage', newMessage);
    } catch (err) {
        console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});