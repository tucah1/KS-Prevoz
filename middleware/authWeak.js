require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    // Get token from header
	const token = req.header('x-auth-token')

	// Check if there is no token in header
	// if (!token) {
	// 	return res.status(401).json({
	// 		errors: [{ code: 401, message: 'No token, authorization failed!' }],
	// 	})
	// }

    // Verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decoded.user
		next()
	} catch (error) {
		next()
	}
}