const isAuth = (req, res, next) => {
  if (req.session.user) return next();
  req.flash('error', 'Please login first');
  res.redirect('/auth/login');
};

module.exports = { isAuth };