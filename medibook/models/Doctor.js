const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  specialization: { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  phone:          { type: String },
  availableDays:  [{ type: String }],
  fee:            { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);