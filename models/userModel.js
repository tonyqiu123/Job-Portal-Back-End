const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    profileURL: { type: String, default: "https://cdn.discordapp.com/attachments/715319623637270638/1067034270369054822/2048px-Default_pfp.png" },
    password: { type: String, required: true },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    links: { type: [String], default: [] },
    attachments: { type: [String], default: [] },
    experiences: { type: [String], default: [] },
    projects: { type: [String], default: [] },
    education: { type: [String], default: [] },
    information: { type: [String], default: [] },
    dateCreated: { type: String,  default: () => moment().format("MMM DD YYYY") },
    appliedJobs: { type: [String], default: [] },
    shortlistedJobs: {type: [String] , default: []}
  });

const User = mongoose.model('User', userSchema);
module.exports = User;