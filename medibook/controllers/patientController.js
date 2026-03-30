const Patient = require('../models/Patient');
// Get all patients with search functionality
exports.getAllPatients = async (req, res) => {
  const search = req.query.search || '';
  const patients = await Patient.find({
    name: { $regex: search, $options: 'i' }
  });
  res.render('patients/index', { patients, search });
};

exports.getAddPatient = (req, res) => {
  res.render('patients/form', { patient: null });
};

exports.postAddPatient = async (req, res) => {
  try {
    await Patient.create(req.body);
    req.flash('success', 'Patient added successfully');
    res.redirect('/patients');
  } catch (err) {
    req.flash('error', 'Error adding patient');
    res.redirect('/patients/add');
  }
};

exports.getEditPatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render('patients/form', { patient });
};

exports.postEditPatient = async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Patient updated successfully');
    res.redirect('/patients');
  } catch (err) {
    req.flash('error', 'Error updating patient');
    res.redirect('/patients');
  }
};

exports.deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  req.flash('success', 'Patient deleted');
  res.redirect('/patients');
};