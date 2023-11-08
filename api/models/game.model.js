const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  mechanics: [String],
  minPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  playTime: {
    type: Number,
    required: true
  },
  ageRange: {
    type: String,
    required: true
  },
  publicationYear: {
    type: Number
  },
  acquisitionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['available', 'reserved'],
    default: 'available'
  },
  condition: {
    type: String,
    enum: ['new', 'good', 'fair', 'poor'],
    required: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
    description: {
        type: String,
        trim: true
    },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

