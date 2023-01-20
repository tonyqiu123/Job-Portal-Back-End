const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const jobSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number },
    requirements: { type: [String], default: [] },
    date: { type: String,  default: () => moment().format("MMM DD YYYY") },
    remote: { type: Boolean, default: false },
    shortlisted: {type: Boolean, default: false},
    applied: {type: Boolean, default: false }
  });

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;