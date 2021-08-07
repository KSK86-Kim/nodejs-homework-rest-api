const mongoose = require('mongoose')
const { Schema, model } = mongoose
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'set name for contact']
  },
  email: {
    type: String,
    required: [true, 'set email for contact']
  },
  phone: {
    type: String,
    required: [true, 'set phone for contact']
  },
  favorite: {
    type: Boolean,
    default: false
  }
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

module.exports = Contact
