const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username:{
      type:String,
      unique:true,
      required: true
  },
  email:{
      type:String,
      unique:true,
      required:true
  },
  password:{
      type:String,
      required:true
  }
})

userSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
      return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const userModel = mongoose.model('User',userSchema)

module.exports = userModel