const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

const analyticsRoutes = require('./routes/analytics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const keys = require('./config/keys')
const upload = require('./middleware/upload')

const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app