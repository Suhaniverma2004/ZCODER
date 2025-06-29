const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  solvedCount: { type: Number, default: 0 },
  title: { type: String, default: 'Aspiring Developer' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
});
module.exports = mongoose.model('User', UserSchema);