const Jobs = require("../models/Jobs")
const User = require("../models/User")

exports.create_A_JOb = async (req, res, next) => {
    const _user = req.user
    try {
        const { title, description, attachements, tags, payment_plan, amount_to_pay, payment_period, category } = req.body
        const new_job = new Jobs({
            title,
            description,
            attachements,
            tags,
            createdBy: _user._id,
            payment_plan,
            amount_to_pay,
            payment_period,
            category
        })

        new_job.save().then(async (job) => {
            await User.findByIdAndUpdate({ _id: _user._id }, { $push: { jobs: job._id } })
            global.io.sockets.emit('job', job)
            return res.status(200).json({ message: 'Job posted successfully' })
        }).catch(err => {
            next(err)
        })

        // res.json(new_job)

    } catch (error) {
        next(error)
    }
}

exports.explore_ALL_JObs = async (req, res, next) => {
    try {
        const _jobs = await Jobs.find({})
        return res.status(200).json({jobs: _jobs})
    } catch (error) {
        next(error)
    }
}

exports.editA_JOb = async (req, res, next) => {
    console.log('edit a job')
}