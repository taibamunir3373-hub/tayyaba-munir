const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const patientRouter = require('./routes/patients');
const doctorRouter = require('./routes/doctors');
const appointmentRouter = require('./routes/appointments');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/patients', patientRouter);
app.use('/doctors', doctorRouter);
app.use('/appointments', appointmentRouter);

app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MediBook running on http://localhost:${PORT}`);
});

module.exports = app;