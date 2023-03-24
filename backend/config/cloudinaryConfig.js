const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: 'dryuwxaf6',
  api_key: 683424611214174,
  api_secret: 'nEppa5gn66QyzHp4Wtp4izq-raE',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'DevConnect',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = { upload };
