const adminSign = require('../../controllers/admin/adminSign');

const router = require('express').Router();

router.post('/admin',adminSign.adminPostSign);

router.get('/admin/getusers',adminSign.adminGetUsers)

router.get("/admin/blockuser/:id",adminSign.blockUser)

module.exports=router