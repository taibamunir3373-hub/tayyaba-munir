const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.get('/', isAuth, async (req, res) => {
  const patientCount = await Patient.countDocuments();
  const doctorCount = await Doctor.countDocuments();
  const appointmentCount = await Appointment.countDocuments();
  const pendingCount = await Appointment.countDocuments({ status: 'pending' });
  const confirmedCount = await Appointment.countDocuments({ status: 'confirmed' });
  const cancelledCount = await Appointment.countDocuments({ status: 'cancelled' });
  const recentAppointments = await Appointment.find()
    .populate('patient', 'name')
    .populate('doctor', 'name specialization')
    .sort({ createdAt: -1 })
    .limit(5);
  res.render('index', {
    title: 'Dashboard',
    patientCount, doctorCount, appointmentCount,
    pendingCount, confirmedCount, cancelledCount,
    recentAppointments
  });
});

// Profile route
router.get('/profile', isAuth, async (req, res) => {
  const user = await User.findById(req.session.user.id);
  res.render('profile', { user });
});

// Profile update route
router.post('/profile', isAuth, async (req, res) => {
  try {
    const { name } = req.body;
    await User.findByIdAndUpdate(req.session.user.id, { name });
    req.session.user.name = name;
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/profile');
  } catch (err) {
    req.flash('error', 'Error updating profile');
    res.redirect('/profile');
  }
});

module.exports = router;