const mongoose =require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  userName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
      type: String,
      required: true,
      minlength: 8,
      match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be alphanumeric and at least 8 characters long.']
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports= User;