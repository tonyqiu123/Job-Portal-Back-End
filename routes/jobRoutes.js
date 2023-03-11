const express = require('express')
const router = express.Router()
const { adminAuth } = require('../middleware/adminAuthMiddleware')
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController')

router.get('/', getJobs)

router.post('/',adminAuth, createJob)

router.put('/:id',adminAuth, updateJob)

router.delete('/:id',adminAuth, deleteJob)

module.exports = router 