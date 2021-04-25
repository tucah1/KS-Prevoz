const express = require('express')
const uuid = require('uuid')
const { body, validationResult } = require('express-validator')

const getConnection = require('../config/database')
const authMiddleware = require('../middleware/auth')
const adminAuthMiddleware = require('../middleware/adminAuth')
const uploadScheduleMiddleware = require('../middleware/scheduleUpload')
const { genNewLineId } = require('../middleware/genId')
const { deleteFile } = require('../util/fileHandling')

const router = express.Router()

// @route       POST api/line/add-line
// @desc        Add new line into database
// @access      Private - Admin
router.post(
	'/add-line',
	[
		authMiddleware,
		adminAuthMiddleware,
		genNewLineId,
		uploadScheduleMiddleware,
		body('from_point').exists(),
		body('to_point').exists(),
	],
	async (req, res) => {
		// Checking for validation errors
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array().map((x) => {
					let { msg, ...new_x } = x
					new_x['message'] = msg
					new_x['code'] = 422
					return new_x
				}),
			})
		}

		if (req.file === undefined) {
			return res.status(400).json({
				errors: [{ status: 400, message: 'Please uplaod a file!' }],
			})
		}

		try {
			const insertObject = {
				line_id: req.newLineId,
				from_point: req.body.from_point,
				to_point: req.body.to_point,
				schedule_file: `${req.newLineId}.csv`,
			}
			const connection = await getConnection()
			let result = await connection.query(
				'SELECT from_point, to_point FROM line WHERE from_point = ? AND to_point = ?',
				[req.body.from_point, req.body.to_point]
			)
			if (result[0].length > 0) {
				deleteFile(req.newLineId)
				return res.status(400).json({
					errors: [{ status: 400, message: 'Line already exists!' }],
				})
			}
			await connection.query('INSERT INTO line SET ?', [insertObject])
			connection.release()
			return res.json({ message: 'Line added successfully!' })
		} catch (error) {
			console.log(error)
			deleteFile(req.newLineId)
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

module.exports = router
