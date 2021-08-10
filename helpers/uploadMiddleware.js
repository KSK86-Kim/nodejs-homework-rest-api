const multer = require('multer')
const { tempDir } = require('./path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: 123123123123,
})
const upload = multer({
  storage,
})

const text = () => {
}
module.exports = upload
