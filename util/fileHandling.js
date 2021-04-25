const util = require('util')
const path = require('path')
const fs = require('fs')
const fsp = require('fs').promises

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

exports.renameFile = (oldFileName, newFileName) => {
	return new Promise(async (resolve, rejects) => {
		try {
			await fsp.rename(
				path.join(process.env.SCHEDULE_STORAGE, `${oldFileName}.csv`),
				path.join(process.env.SCHEDULE_STORAGE, `${newFileName}.csv`)
			)
			resolve()
		} catch (error) {
			rejects(error)
		}
	})
}
