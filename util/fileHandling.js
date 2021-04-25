const util = require('util')
const path = require('path')
const fs = require('fs')

exports.deleteFile = async (fileName) => {
	await fs.readdir(process.env.SCHEDULE_STORAGE, (err, files) => {
		listFiles = []
		files.forEach((x) => listFiles.push(x))
		listFiles.forEach((x) => {
			if (path.parse(x).name === fileName) {
				fs.unlink(path.join(process.env.SCHEDULE_STORAGE, x), (err) => {
					if (err) throw err
				})
			}
		})
	})
}
