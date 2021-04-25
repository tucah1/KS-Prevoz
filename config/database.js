const mysql = require('mysql2/promise')

const pool = mysql.createPool({
	host: 'eu-cdbr-west-01.cleardb.com',
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: 'heroku_419bfc056cc4207',
	waitForConnections: false,
	connectionLimit: 10, // Only during developemnt, needs to go down
	connectTimeout: 10000,
	typeCast: (field, useDefaultTypeCasting) => {
		if (field.type === 'BIT' && field.length === 1) {
			let bytes = field.buffer()
			return bytes[0] === 1
		}

		return useDefaultTypeCasting()
	},
})

const getConnection = async function (callback) {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = await pool.getConnection()
			resolve(connection)
		} catch (error) {
			console.log(`Couldn't get connection to MySQL server!\n\n${error}`)
			reject({ error: "Couldn't get connection to MySQL server!" })
		}
	})
}

module.exports = getConnection