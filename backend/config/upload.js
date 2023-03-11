const { cloudinary, storage } = require('./cloudinaryConfig');
const multer = require('multer');
const upload = multer({ storage });

module.exports = upload;
