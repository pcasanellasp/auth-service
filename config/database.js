// ------------------------------
// Database Config
// ------------------------------

const mongoose = require('mongoose')

exports.initialize = function () {
  // Connect to DB.
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}
