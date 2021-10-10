const express = require('express')
const { create_A_JOb, explore_ALL_JObs, editA_JOb } = require('../controllers/jobController')
const { requireSignIn } = require('../middleware')
const Jobs = require('../models/Jobs')
const User = require('../models/User')
const router = express.Router()

//create a job
//post request
// .api/v1/job/create
router.post('/create', requireSignIn, create_A_JOb)

// get all jobs 
//get request
// /api/v1/job/all
router.get('/all', explore_ALL_JObs)

// edit a job
router.patch('/edit/:id', editA_JOb)

//get user jobs
router.get('/user/:id', async (req, res, next) => {
    const { id } = req.params //id represents the user to gert the jobs for
    try {
        const jobs = await Jobs.find({ createdBy: id })
        const all_jobs = []
        for (var i = 0; i < jobs.length; i++) {
            const user = await User.findOne({ _id: jobs[i].createdBy })
            all_jobs.push({
                displayName: user.displayName,
                email: user.email,
                amount_to_pay: jobs[i].amount_to_pay,
                description: jobs[i].description,
                status: jobs[i].status,
                title: jobs[i].title,
                _id: jobs[i]._id,
                user_id: jobs[i].createdBy
            })
        }

        return res.status(200).json({ jobs: all_jobs })
    } catch (error) {
        next(error)
    }
})

//get sinlge job
// get request
// /api/v1/job/single/:id
router.get('/single/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const _job = await Jobs.findOne({ _id: id })
        const job_user = await User.findOne({ _id: _job.createdBy })
        const response = {
            title: _job.title,
            email: job_user.email,
            amount: _job.amount_to_pay,
            category: _job.category,
            title: _job.title,
            period: _job.payment_period,
            phone_number: job_user.phoneNumber,
            createdAt: _job.createdAt,
            name: job_user.displayName,
            details: _job.description,
            id: _job._id,
            createdBy: _job.createdBy
        }
        return res.status(200).json({ job: response })
    } catch (error) {
        next(error)
    }
})

module.exports = router