// models/Rsvp.js
const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    message: {
      type: String,
      trim: true,
    },
    dietary: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Rsvp', RsvpSchema);
