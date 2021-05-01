const express = require('express')
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator')
const uuid = require('uuid')

const authMiddleware = require('../middleware/auth')
const adminAuthMiddleware = require('../middleware/adminAuth')
const router = express.Router()

const getConnection = require('../config/database')

// @route GET api/notifications/getNotifications
// @desc Fetches all notifications in database
// @access Private
router.get(
	'/getNotifications',
	[authMiddleware, adminAuthMiddleware],
	async (req, res) => {
		try {
			const connection = await getConnection()
			let result = await connection.query('SELECT * FROM notification ORDER BY date_of_creation DESC')
			connection.release()
			return res.status(200).json(result[0])
		} catch (error) {
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

// @route POST api/notifications/sendNotification
// @desc Send notification to registered users
// @access Private
router.post(
	'/sendNotification',
	[
		authMiddleware,
		adminAuthMiddleware,
		body('subject').exists(),
		body('body').exists(),
	],
	async (req, res) => {
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

		try {
			let connection = await getConnection()
			let result = await connection.query(
				'SELECT email FROM app_user WHERE app_user_access = 1'
			)
			connection.release()

			let emailList = result[0].map((x) => x['email'])

			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: process.env.USER, // generated ethereal user
					pass: process.env.PASSWORD, // generated ethereal password
				},
				tls: {
					rejectUnauthorized: false,
				},
			})

			// send mail with defined transport object
			await transporter.sendMail({
				from: '"KSPrevoz" <tech.ksprevoz@gmail.com>', // sender address
				to: emailList, // list of receivers
				subject: req.body.subject, // Subject line
				text: req.body.body, // plain text body
				//html: "", we can maybe add it later
			})

			let newNotification = {
				notification_id: uuid.v4(),
				subject: req.body.subject,
				body: req.body.body,
			}
			connection = await getConnection()
			await connection.query(
				'INSERT INTO notification SET ?',
				newNotification
			)
			connection.release()

			return res
				.status(200)
				.json({ message: 'Notification sent successfully!' })
		} catch (error) {
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

module.exports = router
