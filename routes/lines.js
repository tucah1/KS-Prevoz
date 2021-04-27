const express = require('express')
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const { body, validationResult } = require('express-validator')

const getConnection = require('../config/database')
const authMiddleware = require('../middleware/auth')
const adminAuthMiddleware = require('../middleware/adminAuth')
const uploadScheduleMiddleware = require('../middleware/scheduleUpload')
const { genNewLineId } = require('../middleware/genId')
const { deleteFile } = require('../util/fileHandling')
const {
	uploadFile,
	downloadFile,
	deleteDriveFile,
} = require('../util/driveHandler')

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
		body('transport_type').exists(),
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

			let id = await uploadFile(req.newLineId, 'text/csv')
			deleteFile(req.newLineId)

			const insertObject = {
				line_id: req.newLineId,
				from_point: req.body.from_point,
				to_point: req.body.to_point,
				transport_type: req.body.transport_type,
				schedule_file: id,
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

// @route       POST api/line/edit-line
// @desc        Edit existing line info
// @access      Private - Admin
router.post(
	'/edit-line',
	[
		authMiddleware,
		adminAuthMiddleware,
		genNewLineId,
		uploadScheduleMiddleware,
		body('line_id').exists(),
		body('from_point').exists(),
		body('to_point').exists(),
		body('transport_type').exists(),
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

		let newData = {
			from_point: req.body.from_point,
			to_point: req.body.to_point,
			transport_type: req.body.transport_type,
		}
		try {
			const connection = await getConnection()

			if (req.file !== undefined) {
				let id = await uploadFile(req.newLineId, 'text/csv')
				let result = await connection.query(
					'SELECT schedule_file FROM line WHERE line_id = ?',
					[req.body.line_id]
				)
				await deleteDriveFile(result[0][0].schedule_file)
				deleteFile(req.newLineId)
				newData.schedule_file = id
			}

			await connection.query('UPDATE line SET ? WHERE line_id = ?', [
				newData,
				req.body.line_id,
			])
			connection.release()
			return res.json({ message: 'Line successfully updated!' })
		} catch (error) {
			console.log(error)
			deleteFile(req.newLineId)
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

// @route       DELETE api/line/delete-line/:line_id
// @desc        Delete existing line
// @access      Private - Admin
router.delete(
	'/delete-line/:line_id',
	[authMiddleware, adminAuthMiddleware],
	async (req, res) => {
		const { line_id } = req.params
		try {
			const connection = await getConnection()
			let result = await connection.query(
				'SELECT schedule_file FROM line WHERE line_id = ?',
				[line_id]
			)
			await connection.query('DELETE FROM line WHERE line_id = ?', [
				line_id,
			])
			connection.release()

			await deleteDriveFile(result[0][0].schedule_file)

			return res.json({ message: 'Line deleted successfully!' })
		} catch (error) {
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

// @route       GET api/line/lines/:page_no/:item_limit
// @desc        Get list of all lines
// @access      Private
router.get(
	'/lines/:page_no/:item_limit',
	[authMiddleware, adminAuthMiddleware],
	async (req, res) => {
		try {
			let { page_no, item_limit } = req.params
			page_no = parseInt(page_no)
			item_limit = parseInt(item_limit)

			const connection = await getConnection()
			let countRes = await connection.query(
				'SELECT COUNT(line_id) AS count FROM line'
			)
			let numberOfPages = Math.ceil(countRes[0][0].count / item_limit)
			let result = await connection.query(
				'SELECT line_id, from_point, to_point, transport_type FROM line ORDER BY from_point LIMIT ?,?',
				[(page_no - 1) * item_limit, item_limit]
			)
			connection.release()
			return res.json(result[0])
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

// @route       GET api/line/schedule/:line_id
// @desc        Get schedule for single line
// @access      Public
router.get('/schedule/:line_id', async (req, res) => {
	try {
		const connection = await getConnection()
		let result = await connection.query(
			'SELECT schedule_file FROM line WHERE line_id = ?',
			[req.params.line_id]
		)
		connection.release()
		const { schedule_file } = result[0][0]

		downloadFile(schedule_file, res)
	} catch (error) {
		console.log(error)
		return res
			.status(500)
			.json({ errors: [{ code: 500, message: 'Server error' }] })
	}
})

module.exports = router
