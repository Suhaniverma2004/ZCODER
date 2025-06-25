// zcoder-main-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import the standard Node.js http module
const { Server } = require("socket.io"); // Import the Server class from the socket.io library
require('dotenv').config();

// --- Import Mongoose Models ---
// These are necessary to interact with the database for chat functionality
const ChatRoom = require('./models/ChatRoom');
const Message = require('./models/Message');
const User = require('./models/User'); 

// --- Initialize Express App ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
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

// --- API Routes ---
// This handles all your REST API calls (e.g., /api/users, /api/problems)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const server = http.createServer(app);

// 2. Create a new Socket.IO server instance and attach it to the HTTP server.
//    Configure CORS to allow your React app's origin.
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // The address of your React frontend
    methods: ['GET', 'POST'],
  },
});

// 3. Set up the main event listener for when a new client connects.
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // --- Logic for when a user joins a specific chat room ---
  socket.on('joinRoom', async ({ problemId }) => {
    try {
      socket.join(problemId); // Subscribe the client's socket to the room
      console.log(`User ${socket.id} joined room: ${problemId}`);

      let chatRoom = await ChatRoom.findOne({ problemId: problemId });
      if (!chatRoom) {
        chatRoom = new ChatRoom({ problemId: problemId });
        await chatRoom.save();
      }
      
      // Find all messages for that room, populate the user's name, and sort by time
      const messages = await Message.find({ chatRoom: chatRoom._id })
        .populate('user', 'name')
        .sort({ createdAt: 'asc' });
      
      // Send the entire message history only to the client that just joined
      socket.emit('loadMessages', messages);
    } catch (error) {
      console.error('Error in joinRoom event:', error);
    }
  });

  // --- Logic for when a user sends a new message ---
  socket.on('sendMessage', async ({ problemId, userId, text }) => {
    try {
      const chatRoom = await ChatRoom.findOne({ problemId: problemId });
      if (chatRoom) {
        const message = new Message({ text, user: userId, chatRoom: chatRoom._id });
        await message.save();
        
        // Retrieve the message again to populate the user's name
        const populatedMessage = await Message.findById(message._id).populate('user', 'name');
        
        // Broadcast the new, complete message to ALL clients in the room
        io.to(problemId).emit('newMessage', populatedMessage);
      }
    } catch (error) {
      console.error('Error in sendMessage event:', error);
    }
  });

  // --- Logic for when a user disconnects ---
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// --- Start the Server ---
const PORT = process.env.PORT || 5001;
// CRITICAL: Use `server.listen` here, not `app.listen`.
server.listen(PORT, () => {
  console.log(`Main API & Chat server is running on port ${PORT}`);
});