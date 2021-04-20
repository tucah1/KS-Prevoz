const express = require('express')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const getConnection = require('../config/database')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// @route       GET api/auth
// @desc        Authorize user and get user info
// @access      Private
router.get('/', authMiddleware, async (req, res) => {
	try {
		const connection = await getConnection()
		let result = await connection.query(
			'SELECT * FROM app_user WHERE app_user_id = ?',
			req.user.id
		)
		connection.release()
		let { password, ...responseObj } = result[0][0]
		return res.status(200).json(responseObj)
	} catch (error) {
		console.log(error)
		return res
			.status(500)
			.json({ errors: [{ code: 500, message: 'Server error' }] })
	}
})

// @route       POST api/auth/register
// @desc        Register new user
// @access      Public
router.post(
	'/register',
	[
		body('first_name').isLength({ min: 2 }),
		body('last_name').isLength({ min: 2 }),
		body('email').isEmail(),
		body('password').isLength({ min: 8, max: 64 }),
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

		try {
			const { first_name, last_name, email, password } = req.body

			const connection = await getConnection()
			let result = await connection.query(
				'SELECT * FROM app_user WHERE email = ?',
				[email]
			)
			if (result[0].length > 0) {
				return res.status(422).json({
					errors: [
						{
							code: 422,
							message: 'User already exists!',
						},
					],
				})
			}

			let userData = {
				app_user_id: uuid.v4(),
				first_name,
				last_name,
				email,
				password: '',
				app_user_access: 1,
				register_option: 0,
			}

			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)

			userData.password = hash

			await connection.query('INSERT INTO app_user SET ?', userData)
			connection.release()

			jwtPayload = {
				user: {
					id: userData.app_user_id,
				},
			}

			jwt.sign(
				jwtPayload,
				process.env.JWT_SECRET,
				{ expiresIn: '3h' },
				(err, token) => {
					if (err) throw err
					return res.status(201).json({ token })
				}
			)
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

// @route       POST api/auth/login
// @desc        Login a user
// @access      Public
router.post(
	'/login',
	[body('email').exists(), body('password').exists()],
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
			const { email, password } = req.body

			const connection = await getConnection()
			let result = await connection.query(
				'SELECT app_user_id, password, register_option FROM app_user WHERE email = ?',
				[email]
			)

			if (result[0].length == 0) {
				return res.status(400).json({
					errors: [{ code: 400, message: 'Authorization failed!' }],
				})
			}

			if (result[0][0].register_option != 0) {
				return res.status(400).json({
					errors: [
						{
							code: 400,
							message: 'Incorrect register option!',
						},
					],
				})
			}

			const isMatch = await bcrypt.compare(
				password,
				result[0][0].password
			)
			if (!isMatch) {
				return res.status(400).json({
					errors: [{ code: 400, message: 'Authorization failed!' }],
				})
			}

			jwtPayload = {
				user: {
					id: result[0][0].app_user_id,
				},
			}
			jwt.sign(
				jwtPayload,
				process.env.JWT_SECRET,
				{ expiresIn: '3h' },
				(err, token) => {
					if (err) throw err
					return res.status(201).json({ token })
				}
			)

			connection.release()
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

// @route       GET api/auth/google/callback
// @desc        Authenticate and authorize user via google account
// @access      Public
router.post('/google/callback', async (req, res) => {
	const googleToken = req.body.googleToken

	try {
		const ticket = await client.verifyIdToken({
			idToken: googleToken,
			audience: process.env.CLIENT_ID,
		})
		let payload = ticket.getPayload()
		const userid = payload['sub']

		const { given_name, family_name, email, email_verified } = payload

		const connection = await getConnection()

		const result = await connection.query(
			'SELECT * FROM app_user WHERE app_user_id = ?',
			[userid]
		)
		connection.release()

		if (result[0].length > 0) {
			const payloadX = {
				user: {
					id: userid,
				},
			}

			jwt.sign(payloadX, process.env.JWT_SECRET, (err, token) => {
				if (err) throw err
				return res.status(200).json({ token })
			})
		} else {
			let data = {
				app_user_id: userid,
				first_name: given_name,
				last_name: family_name,
				email: email,
				password: uuid.v4(),
				app_user_access: 1,
				register_option: 1,
			}

			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(data.password, salt)
			data.password = hash

			const connection = await getConnection()

			const result = await connection.query(
				'INSERT INTO app_user SET ?',
				data
			)
			connection.release()

			const payload = {
				user: {
					id: userid,
				},
			}

			jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
				if (err) throw err
				return res.status(200).json({ token })
			})
		}
	} catch (error) {
		return res.status(500).json({
			errors: [{ code: 500, message: 'Authentication failed!' }],
		})
	}
})

// @route       PUT api/auth/edit-profile
// @desc        Edit user profile information
// @access      Private
router.post(
	'/edit-profile',
	[
		body('first_name').exists(),
		body('last_name').exists(),
		body('notifications').exists(),
		body('email').isEmail(),
		authMiddleware,
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
			const connection = await getConnection()
			let newInfo = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				notifications: req.body.notifications,
			}

			if (req.body.password) {
				if (req.body.password.length < 8) {
					return res.status(400).json({
						errors: [
							{
								code: 400,
								message: 'New password invalid!',
							},
						],
					})
				}
				let salt = await bcrypt.genSalt()
				let hash = await bcrypt.hash(req.body.password, salt)
				newInfo.password = hash
				newInfo.register_option = 0
			}
			await connection.query(
				'UPDATE app_user SET ? WHERE app_user_id = ?',
				[newInfo, req.user.id]
			)
			connection.release()
			return res.json({
				message: 'Profile details updated successfully!',
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ errors: [{ code: 500, message: 'Server error' }] })
		}
	}
)

module.exports = router
