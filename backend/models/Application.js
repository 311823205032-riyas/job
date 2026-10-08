const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please enter a valid email address',
      },
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    applicationDate: {
      type: Date,
      required: [true, 'Application date is required'],
    },
    status: {
      type: String,
      required: [true, 'Application status is required'],
      enum: ['Applied', 'Interview', 'Selected', 'Rejected'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
