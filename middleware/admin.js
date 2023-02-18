export default (req, res, next) => {
  if (req.user.role !== true) {
    res.status(403).json({ success: false, message: '沒有權限' })
  } else {
    next()
  }
}
