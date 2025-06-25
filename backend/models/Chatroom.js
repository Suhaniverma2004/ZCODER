const mongoose = require('mongoose');
const ChatroomSchema = new mongoose.Schema({
  // We'll use the problem's unique ID string for easy lookup
  problemId: { type: String, required: true, unique: true }, 
});
module.exports = mongoose.model('Chatroom', ChatroomSchema);