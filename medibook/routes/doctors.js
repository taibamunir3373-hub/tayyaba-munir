const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const {
  getAllDoctors, getAddDoctor, postAddDoctor,
  getEditDoctor, postEditDoctor, deleteDoctor
} = require('../controllers/doctorController');

router.get('/',        isAuth, getAllDoctors);
router.get('/add',     isAuth, getAddDoctor);
router.post('/add',    isAuth, postAddDoctor);
router.get('/edit/:id',  isAuth, getEditDoctor);
router.post('/edit/:id', isAuth, postEditDoctor);
router.post('/delete/:id', isAuth, deleteDoctor);

module.exports = router;