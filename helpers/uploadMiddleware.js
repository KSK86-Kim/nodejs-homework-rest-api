const multer = require('multer')
const { tempDir } = require('./staticPath')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1048576,
  },
})

const uploadMiddleware = multer({
  storage: storage,

//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.includes('image')) {
//       cb(null, true)
//       return
//     }
//     cb(null, false)
//   },
})

module.exports = uploadMiddleware
