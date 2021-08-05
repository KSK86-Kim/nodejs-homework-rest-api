router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const removedContact = await removeContact(id)
  if (!removedContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    return
  }

  res.json({
    message: 'success',
    status: 200,
    data: ` ${removedContact}`,
  })
})



const removeContact = async (contactId) => {
  try {
    const response = await fs.readFile(contacts)
    const result = JSON.parse(response)
    const exist = result.find(({ id }) => id.toString() === contactId)
    if (exist) {
      console.log('asd')
      const newContactsList = result.filter(
        ({ id }) => id.toString() !== contactId
      )

      fs.writeFile(contacts, JSON.stringify(newContactsList), (error) => {
        if (error) throw error
      })

      return `contact with id ${contactId} removed `
    }
  } catch (error) {
    console.error(error)
  }
}