// from Stack Overflow
module.exports = function (req, res, next) {
  console.log('checking if user is authenticated!!')
  if (req.isAuthenticated()) {
    console.log('authentication was successful!')
    return next();
  }
  // if the user is not authenticated then redirect him to the login page
  console.log('authentication was not successful...')
  res.redirect('/');


}


