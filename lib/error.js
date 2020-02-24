// ------------------------------
// Error Utils
// ------------------------------

class ApiError extends Error {
  constructor (statusCode, errors) {
    super()
    this.statusCode = statusCode
    this.errors = errors
  }
}

module.exports = {
  ApiError,
}
