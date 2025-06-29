const mongoose = require('mongoose');
const BookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
});
module.exports = mongoose.model('Bookmark', BookmarkSchema);