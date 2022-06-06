const express = require('express')
const controller = require('../controllers/analytics.js')

const router = express.Router()

router.get('/overview', controller.overview)
router.post('/analytics', controller.analytics)

module.exports = router