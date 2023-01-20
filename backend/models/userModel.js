const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },
    date: { type: String,  default: () => moment().format("MMM DD YYYY") },
    appliedJobs: { type: [String] },
    shortlistedJos: {type: [String]}
  });

const User = mongoose.model('User', userSchema);
module.exports = User;