const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req, res) => {
  const search = req.query.search || '';
  const doctors = await Doctor.find({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { specialization: { $regex: search, $options: 'i' } }
    ]
  });
  res.render('doctors/index', { doctors, search });
};

exports.getAddDoctor = (req, res) => {
  res.render('doctors/form', { doctor: null });
};

exports.postAddDoctor = async (req, res) => {
  try {
    await Doctor.create(req.body);
    req.flash('success', 'Doctor added successfully');
    res.redirect('/doctors');
  } catch (err) {
    req.flash('error', 'Error adding doctor');
    res.redirect('/doctors/add');
  }
};

exports.getEditDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('doctors/form', { doctor });
};

exports.postEditDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Doctor updated successfully');
    res.redirect('/doctors');
  } catch (err) {
    req.flash('error', 'Error updating doctor');
    res.redirect('/doctors');
  }
};

exports.deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  req.flash('success', 'Doctor deleted');
  res.redirect('/doctors');
};