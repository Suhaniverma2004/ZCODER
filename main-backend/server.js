// zcoder-main-backend/server.js

// --- SECTION 1: IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

// Model Imports
const ChatRoom = require('./models/ChatRoom');
const Message = require('./models/Message');
const User = require('./models/User');

// --- THIS IS THE CRITICAL FIX: Route Imports ---
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth'); // <-- 1. This line was missing.
const userRoutes = require('./routes/users');
const bookmarkRoutes = require('./routes/bookmarks');

// --- SECTION 2: APP CONFIGURATION & MIDDLEWARE ---
const app = express();
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
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes); // <-- 2. This line was missing.
app.use('/api/users', userRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
// --- SECTION 5: SOCKET.IO INTEGRATION & CHAT LOGIC ---
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

  socket.on('sendMessage', async ({ room, user, text }) => {
    try {
      const chatRoom = await ChatRoom.findOne({ problemId: room });
      if (chatRoom) {
        const message = new Message({ text, user, chatRoom: chatRoom._id });
        await message.save();
        const messageToSend = {
          _id: message._id, text: message.text, user: message.user, timestamp: message.createdAt
        };
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

// --- SECTION 6: START THE SERVER ---
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Main API & Chat server is running on port ${PORT}`);
});