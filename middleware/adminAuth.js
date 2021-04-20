const getConnection = require('../config/database')

module.exports = async function (req, res, next) {
	try {
		const connection = await getConnection()
		let result = await connection.query(
			'SELECT app_user_access FROM app_user WHERE app_user_id = ?',
			[req.user.id]
		)
		let { user_access } = result[0][0]
		connection.release()

		if (user_access === 2) {
			next()
		} else {
			return res.status(400).json({
				errors: [{ code: 400, message: 'Authorization failed! You need admin privileges to access this route!' }],
			})
		}
	} catch (error) {
		return res.status(400).json({
			errors: [
				{
					code: 400,
					message: 'Server error!',
				},
			],
		})
	}
}