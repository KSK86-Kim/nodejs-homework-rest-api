const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../model')

const get = async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json({
      message: 'success',
      status: 200,
      data: {
        result
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId

    const result = await getContactById(id)
    res.json({
      message: 'success',
      status: 200,
      data: {
        result,
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}
const create = async (req, res, next) => {
  try {
    const { name, email, phone, favorite = false } = req.query
    const result = await addContact({ name, email, phone, favorite })

    res.json({
      message: 'success',
      status: 201,
      data: {
        result,
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const result = await removeContact(id)
    res.json({
      message: 'success',
      status: 204,
      data: { result }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const { name, email, phone, favorite } = req.query
    const result = await updateContact(id, { name, email, phone, favorite })
    res.json({
      message: 'success',
      status: 200,
      data: {
        result
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const updateStatus = async(req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.query
  try {
    const result = await updateStatusContact(contactId, { favorite })
    if (Object.keys(req.query).length !== 0) {
      res.json({
        message: 'success',
        status: 200,
        data: {
          result
        }
      })
    } else {
      res.json({
        message: 'missing field favorite',
        status: 400,
      })
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
}
