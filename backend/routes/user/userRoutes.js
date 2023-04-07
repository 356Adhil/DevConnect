const router = require("express").Router();
const upload = require("../../config/cloudinaryConfig");
const userController = require("../../controllers/user/userController");
const checkJwtToken = require('../../middleware/verification');
const checkBlocked = require('../../middleware/blockedVerify');

router.post("/signup", userController.postSignup);

router.post("/login", userController.postLogin);

router.get("/getProfile", checkJwtToken, userController.getProfile);

router.post("/editprofile", checkJwtToken, checkBlocked, userController.postEditProfile);

router.post("/articles", checkJwtToken, checkBlocked, upload, userController.postArticle);

router.get("/articles", userController.getArticle);

router.post("/events", checkJwtToken, checkBlocked, upload, userController.postEvent);

router.get("/events", userController.getEvent);

router.get("/userEvents/:id", userController.getUserEvents);

router.get("/community",userController.getCommunity)

router.post(`/joinCommunity/:id`,checkJwtToken, checkBlocked, userController.joinCommunity)

module.exports = { router };
