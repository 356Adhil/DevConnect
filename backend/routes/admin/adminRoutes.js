const adminSign = require("../../controllers/admin/adminSign");
const checkJwtToken = require('../../middleware/verification');

const router = require("express").Router();

router.post("/admin", adminSign.adminPostSign);

router.get("/admin/getusers", adminSign.adminGetUsers);

router.get("/admin/blockuser/:id", adminSign.blockUser);

router.get("/admin/getEvents", adminSign.adminGetEvents);

router.get("/admin/approveEvent/:id", adminSign.approveEvent);

router.post("/admin/community", adminSign.postCommunity);

router.get("/admin/getCommunity", adminSign.getCommunity);

router.get("/admin/showCommunity/:id", adminSign.showCommunity);

router.get("/admin/getArticles",adminSign.getArticles)

router.get("/admin/approveArticle/:id", adminSign.approveArticle);

module.exports = router;
