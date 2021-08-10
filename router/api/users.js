const express = require('express')
const router = express.Router()
const { users: ctrl } = require('../../controller')
const { validateSign } = require('../../services/validationUser.js')
const auth = require('../../services/auth')

router.post('/signup', validateSign, ctrl.register)
router.post('/signin', validateSign, ctrl.login)
router.post('/logout', auth, ctrl.logout)
router.get('/current', auth, ctrl.currentUser)

module.exports = router
