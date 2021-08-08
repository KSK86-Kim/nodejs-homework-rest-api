const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controller')
const auth = require('../../services/auth')
const { validateContact } = require('../../services/validationContact.js')

router.get('/', auth, ctrl.get)

router.get('/:contactId', auth, ctrl.getById)

router.post('/', auth, validateContact, ctrl.create)

router.delete('/:contactId', auth, ctrl.remove)

router.put('/:contactId', auth, validateContact, ctrl.update)

router.patch('/:contactId/favorite', auth, validateContact, ctrl.updateStatus)

module.exports = router
