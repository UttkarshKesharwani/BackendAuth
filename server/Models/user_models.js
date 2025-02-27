const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");

const userSchema = ({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    required:true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});







const User = mongoose.model('User',userSchema)
module.exports = User; 