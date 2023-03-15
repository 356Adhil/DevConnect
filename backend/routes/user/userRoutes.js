const router = require('express').Router();
const userController = require('../../controllers/user/userController')
const { verify } = require("../../middleware/verification");


router.post('/signup', userController.postSignup);

router.post('/login',userController.postLogin)

router.get("/getProfile",verify,userController.getProfile)

router.post('/editprofile',verify,userController.postEditProfile)
module.exports = { router };