const mongoose = require('mongoose');
const ProblemSchema = new mongoose.Schema({
  problemId: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
});
module.exports = mongoose.model('Problem', ProblemSchema);