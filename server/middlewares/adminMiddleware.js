export const adminAuthMiddleware = (req, res, next) => {
  const { session: { isAdmin }, url } = req
  if (url === '/admin/auth') return next();
  if(isAdmin) {
    next();
  } else {
    res.redirect('/admin/auth')
  }
}