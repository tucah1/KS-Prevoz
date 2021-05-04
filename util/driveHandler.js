const drive = require('../config/driveStorage')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

const genIds = (numOfIds) => {
	return new Promise((resolve, reject) => {
		try {
			let ids = drive.files.generateIds({
				count: numOfIds,
				space: 'drive',
			})
			resolve(ids)
		} catch (error) {
			reject(error)
		}
	})
}

exports.uploadFile = (file_id, file_mimetype) => {
	return new Promise(async (resolve, reject) => {
		try {
			let id = (await genIds(1)).data.ids[0]
			const fileMetadata = {
				name: `${id}.csv`,
				id,
				parents: ['12XfSxOfuM71Or8LA5TIgHxvC3R9q_43u'],
			}
			const media = {
				mimeType: file_mimetype,
				body: fs.createReadStream(
					path.join(process.env.SCHEDULE_STORAGE, `${file_id}.csv`)
				),
			}
			drive.files.create(
				{
					resource: fileMetadata,
					media: media,
					fields: 'id',
				},
				(err, file) => {
					if (err) throw err
				}
			)
			resolve(id)
		} catch (error) {
			reject(error)
		}
	})
}

exports.downloadFile = (fileId, response) => {
	drive.files
		.get(
			{
				fileId,
				alt: 'media',
			},
			{
				responseType: 'stream',
			}
		)
		.then((res) => {
			res.data
				.on('error', (err) => {
					throw err
				})
				.pipe(response)
		})
}

exports.readFile = (fileId) => {
	return new Promise((resolve, reject) => {
		try {
			let obj = {
				weekday1: [],
				weekday2: [],
				saturday1: [],
				saturday2: [],
				sunday1: [],
				sunday2: [],
			}
			drive.files.get({
				fileId,
				alt: 'media'
			}, {
				responseType: 'stream'
			}).then((res) => {
				res.data.on('error', (err) => {
					throw err
				}).pipe(csv()).on('data', (data) => {
					Object.entries(data).forEach(([key, value]) => {
						if (value !== "") {
							obj[key].push(value)
						}
					})
				}).on('end', () => {
					resolve(obj)
				})
			})
		} catch (error) {
			reject(error)
		}
	})
}

exports.deleteDriveFile = (fileId) => {
	return new Promise((resolve, reject) => {
		try {
			drive.files.delete({ fileId })
			resolve()
		} catch (error) {
			reject(error)
		}
	})
}
