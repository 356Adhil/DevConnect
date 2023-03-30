const router = require('express').Router();
const upload  = require('../../config/cloudinaryConfig');
const userController = require('../../controllers/user/userController')
const { verify } = require("../../middleware/verification");

router.post('/signup', userController.postSignup);   

router.post('/login',userController.postLogin)

router.get("/getProfile",verify,userController.getProfile)    

router.post('/editprofile',verify,userController.postEditProfile)

router.post('/articles',verify,upload,userController.postArticle)

router.get('/articles',userController.getArticle)    

router.post('/events',verify,userController.postEvent)

router.get('/events',userController.getEvent)

module.exports = { router };
