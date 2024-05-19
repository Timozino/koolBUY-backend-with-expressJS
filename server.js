const express = require('express')
const app = express()
require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { dbConnect } = require('./utils/db')


app.use(cors({
    origin : ['http://localhost:3000'],
    credentials : true
}))

// Handle preflight requests
app.options('*', cors());


app.use(bodyParser.json())

app.use(cookieParser())

app.use('/api',require('./routes/authRoutes'))

app.get('/', (req, res)=>res.send('my Backend'))
const port = process.env.PORT
dbConnect()

app.listen(port, ()=> console.log(`Server is running on port ${port}`))