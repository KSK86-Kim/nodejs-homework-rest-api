const path = require('path')

const tempDir = path.join(process.cwd(), 'temp')
const avatarDir = path.join(process.cwd(), 'public', 'avatars')

module.exports = {
  tempDir,
  avatarDir,
}
