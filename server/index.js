const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const {
	getCompliment,
	getFortune,
	getAllFortunes,
	saveFortune,
	moveFortune,
	tieFortune
} = require('./controller')

app.get('/api/compliment', getCompliment)
app.get('/api/fortune/:type', getFortune)
app.get('/api/fortunes', getAllFortunes)
app.post('/api/fortune/savefortune', saveFortune)
app.put('/api/fortune/', moveFortune)
app.delete('/api/fortune/', tieFortune)

app.listen(4000, () => console.log('Server running on 4000'))
