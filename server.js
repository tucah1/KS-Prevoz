require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.WEBPORT || 8080

app.use(express.json({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
	res.send('KS Prevoz Server')
})

app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
	console.log('Server started on port ' + PORT.toString(10) + '...')
})