const util = require('util')
const path = require('path')
const multer = require('multer')
const maxSize = 1024 * 1024 * 10 // 10MB is max size of the file

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.SCHEDULE_STORAGE)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        let newFileName = ''
        if (ext === '.csv') {
            newFileName = `${req.newLineId}${ext}`
        } else {
            const message = `${file.originalname} is invalid. Please submit files in correct format (.csv)!`
            return cb(message, null)
        }
        cb(null, newFileName)
    },
})

let uploadSchedule = multer({
    storage,
    limits: { fileSize: maxSize },
}).single('file')

let uploadScheduleMiddleware = util.promisify(uploadSchedule)
module.exports = uploadScheduleMiddleware