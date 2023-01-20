const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

// FEATURES:
// allow companies to create job listings
//  allow users to browse job listings and sort them.
// job listenings include job title, location, salary, description, and requirements
// allow users to sort jobs by information eg requirements
// allow users to click on a job listing and apply with their resume, cover letter, plus other documents
// allow users to apply with a profile that alllows them to apply to jobs quickly
// make users login and register, provide user authentication using json web tokens
// create admin panel
// 