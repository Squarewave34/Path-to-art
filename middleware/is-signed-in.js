const isSignedIn = (req, res, send) => {
  if(req.session.user) return next()
  res.redirect("/auth/sign-in")
}

module.exports = isSignedIn