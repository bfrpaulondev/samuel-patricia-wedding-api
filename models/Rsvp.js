// models/Rsvp.js
const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema(
  {
    fullName: {
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
    phone: {
      type: String,
      trim: true,
    },
    willAttend: {
      type: Boolean,
      required: true,
    },
    guests: {
      type: Number,
      default: 1,
      min: 0,
    },
    dietaryRestrictions: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Rsvp', RsvpSchema);
