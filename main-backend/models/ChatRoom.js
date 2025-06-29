const mongoose = require('mongoose');
const ChatRoomSchema = new mongoose.Schema({
  problemId: { type: String, required: true, unique: true }, 
});
module.exports = mongoose.model('ChatRoom', ChatRoomSchema);