const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  role: String,
  password: String,
  salt: String,
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationCode: Number,
  resetLink: String,
});

userSchema.pre("save", async function (next) {
  if (this.isActivated && this.isModified("password")) {
    this.salt = bcrypt.genSaltSync();
    this.password = await bcrypt.hash(this.password, this.salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
