const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Message', MessageSchema);