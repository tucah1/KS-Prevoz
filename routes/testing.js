const express = require('express')
const router = express.Router()
const drive = require('../config/driveStorage')
const { uploadFile, downloadFile } = require('../util/driveHandler')

router.get('/', async (req, res) => {
	try {
		let id = await uploadFile(
			'7f0d6a32-c03b-4beb-b9ea-fd75a1d92940',
			'text/csv'
		)
		return res.send(id)
	} catch (error) {
		return res.status(500).json(error)
	}
})

router.get('/test2/:fileId', async (req, res) => {
	try {
		downloadFile(req.params.fileId, res)
	} catch (error) {
		return res.status(500).json(error)
	}
})

module.exports = router
