const asyncHandler = require('express-async-handler')
const Job = require('../models/jobModel')


const getJobs = asyncHandler(async (req,res) => {
    const jobs = await Job.find()
    res.status(200).json(jobs)
})

const createJob = asyncHandler(async (req,res) => {
    if (!req.body.title | !req.body.location |!req.body.description) {
        res.status(400)
        throw new Error('Missing title, location or description field')
    }
    const job = await Job.create({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        salary: req.body.salary,
        requirements: req.body.requirements,
        
    })

    res.status(200).json(job)
})
const updateJob = asyncHandler(async (req,res) => {
    const job = await Job.findById(req.params.id)

    if (!job)
        res.status(400).json({ message: `Job ${req.params.id} not found` })

    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
    } catch {
        res.status(400).json({ message: "bad request, improper types for field" })
    }
   

    res.status(200).json(updatedJob)
})
const deleteJob = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.id)

    if (!job)
        res.status(400).json({ message: `Job ${req.params.id} not found` })

    await job.remove()

    res.status(200).json({ message: `Deleted job ${req.params.id}` })
})

module.exports = {
 getJobs, createJob, updateJob, deleteJob
}