const express = require("express");
const router = require('express').Router();
const { Router } = require("express");
const userSignup = require('../../controllers/user/userSignup')

router.post('/signup', userSignup.postSignup);

router.post('/login',userSignup.postLogin)

module.exports = { router };