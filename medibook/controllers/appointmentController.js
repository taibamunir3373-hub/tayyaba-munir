const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

exports.getAllAppointments = async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const appointments = await Appointment.find(filter)
    .populate('patient', 'name')
    .populate('doctor', 'name specialization');
  res.render('appointments/index', { appointments, status: req.query.status || '' });
};

exports.getAddAppointment = async (req, res) => {
  const patients = await Patient.find();
  const doctors = await Doctor.find();
  res.render('appointments/form', { appointment: null, patients, doctors });
};

exports.postAddAppointment = async (req, res) => {
  try {
    await Appointment.create(req.body);
    req.flash('success', 'Appointment booked successfully');
    res.redirect('/appointments');
  } catch (err) {
    req.flash('error', 'Error booking appointment');
    res.redirect('/appointments/add');
  }
};

exports.getEditAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  const patients = await Patient.find();
  const doctors = await Doctor.find();
  res.render('appointments/form', { appointment, patients, doctors });
};

exports.postEditAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Appointment updated successfully');
    res.redirect('/appointments');
  } catch (err) {
    req.flash('error', 'Error updating appointment');
    res.redirect('/appointments');
  }
};

exports.deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  req.flash('success', 'Appointment cancelled');
  res.redirect('/appointments');
};exports.printAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient')
    .populate('doctor');
  res.render('appointments/print', { appointment });
};