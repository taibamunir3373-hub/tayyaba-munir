const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      { type: String, required: true },
  age:        { type: Number },
  gender:     { type: String, enum: ['Male', 'Female', 'Other'] },
  address:    { type: String },
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
  allergies:  { type: String },
  medHistory: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);