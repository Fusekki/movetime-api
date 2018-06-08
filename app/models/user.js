var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema ({
      email: String,
      firstName: String,
      lastName: String,
      zipcode: String,
      theaters: String[]
    })

module.exports = mongoose.model('User', UserSchema);

