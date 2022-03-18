exports.errorHandler = (err, req, res, next) => {
  let code = err.code || 500
  let message = err.name || 'Internal server error'
  return res.status(code).json({
    message
  })
}