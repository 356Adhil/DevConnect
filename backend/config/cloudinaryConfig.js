const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'DevConnect',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const fileFilter = (req, file, cb) => {
  if(!['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
    return cb(new Error('file is not an image'));
  }
  return cb(null, true);
}

const upload = multer({ storage, fileFilter });

module.exports = (req, res, next) => {
  upload.single('image')(req, res, (err)=> {
    if(err) {
      console.log(err)     
      return res.send({err: "Selected file is not an image"})
    }
    return next()
  })
}