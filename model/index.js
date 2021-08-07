const Contact = require('../utils/schemas/contact')

const listContacts = async () => {
  const response = await Contact.find({})
  return response
}

const getContactById = async id => {
  const response = await Contact.findById(id)
  return response
}

const removeContact = async id => {
  const response = Contact.findByIdAndRemove(id)
  return response
}

const addContact = async data => {
  const response = Contact.create(data)
  return response
}

const updateContact = async (id, body) => {
  const responce = Contact.findByIdAndUpdate(id, body, { new: true })
  return responce
}

const updateStatusContact = async (id, body) => {
  const responce = Contact.findByIdAndUpdate(id, body, { new: true })
  return responce
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
