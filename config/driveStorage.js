const googleapis = require('googleapis')

const scopes = ['https://www.googleapis.com/auth/drive']

const credentials = require('../credentials.json')

const auth = new googleapis.google.auth.JWT(
	credentials.client_email,
	null,
	credentials.private_key,
	scopes
)

const drive = googleapis.google.drive({ version: 'v3', auth })

module.exports = drive
