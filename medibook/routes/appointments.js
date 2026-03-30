const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const {
  getAllAppointments, getAddAppointment, postAddAppointment,
  getEditAppointment, postEditAppointment, deleteAppointment,
  printAppointment
} = require('../controllers/appointmentController');

router.get('/',          isAuth, getAllAppointments);
router.get('/add',       isAuth, getAddAppointment);
router.post('/add',      isAuth, postAddAppointment);
router.get('/edit/:id',  isAuth, getEditAppointment);
router.post('/edit/:id', isAuth, postEditAppointment);
router.post('/delete/:id', isAuth, deleteAppointment);
router.get('/print/:id', isAuth, printAppointment);

module.exports = router;