const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

// Model Imports
const ChatRoom = require('./models/Chatroom');
const Message = require('./models/Message');
const User = require('./models/User');

// --- THIS IS THE CRITICAL PART ---
// We must import BOTH route files.
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth'); // For login/signup

// --- SECTION 2: APP CONFIGURATION & MIDDLEWARE ---
const app = express();
// cors() must be used BEFORE the routes are defined.
app.use(cors());
app.use(express.json());

// --- SECTION 3: DATABASE CONNECTION ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB Atlas!');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  }
};
connectDB();

// --- SECTION 4: API ROUTE SETUP ---
// This tells Express how to handle incoming URLs.
app.use('/api', apiRoutes); // URLs starting with /api go to api.js
app.use('/api/auth', authRoutes); // URLs starting with /api/auth go to auth.js

// --- SECTION 5: SOCKET.IO INTEGRATION ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', async ({ problemId }) => {
    try {
      socket.join(problemId);
      console.log(`User ${socket.id} joined room: ${problemId}`);

      let chatRoom = await ChatRoom.findOne({ problemId: problemId });
      if (!chatRoom) {
        chatRoom = new ChatRoom({ problemId: problemId });
        await chatRoom.save();
      }
      
      const messages = await Message.find({ chatRoom: chatRoom._id }).sort({ createdAt: 'asc' });
      socket.emit('previousMessages', messages);
    } catch (error) {
      console.error('Error in joinRoom event:', error);
    }
  });

  // --- THIS IS THE CRITICAL, CORRECTED LISTENER ---
  socket.on('sendMessage', async ({ room, user, text }) => {
    try {
      const chatRoom = await ChatRoom.findOne({ problemId: room });
      if (chatRoom) {
        // We save the user's name directly as a string for simplicity
        const message = new Message({
          text,
          user, // The user's name string from the frontend
          chatRoom: chatRoom._id,
        });
        await message.save();
        
        // Construct the object to send back to all clients
        const messageToSend = {
            _id: message._id,
            text: message.text,
            user: message.user,
            timestamp: message.createdAt
        };

        // Broadcast with the correct event name 'receiveMessage'
        io.to(room).emit('receiveMessage', messageToSend);
      }
    } catch (error) {
      console.error('Error in sendMessage event:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Main API & Chat server is running on port ${PORT}`);
});