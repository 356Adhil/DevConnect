const adminSign = require('../../controllers/admin/adminSign');

const router = require('express').Router();

router.post('/admin',adminSign.adminPostSign);

module.exports=router