const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const {
  getAllPatients, getAddPatient, postAddPatient,
  getEditPatient, postEditPatient, deletePatient
} = require('../controllers/patientController');

router.get('/',        isAuth, getAllPatients);
router.get('/add',     isAuth, getAddPatient);
router.post('/add',    isAuth, postAddPatient);
router.get('/edit/:id',  isAuth, getEditPatient);
router.post('/edit/:id', isAuth, postEditPatient);
router.post('/delete/:id', isAuth, deletePatient);

module.exports = router;