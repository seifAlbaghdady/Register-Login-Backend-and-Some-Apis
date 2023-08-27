const express = require('express');
const router = express.Router();

const {register,login,current} = require('../controllers/userControllers');
const validateToken=require('../middleware/ValidateTokenHandle');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { PrismaClient } = require('@prisma/client');
// const e = require('express');
// const prisma = new PrismaClient();
// const dotenv = require('dotenv').config();


router.post('/register', register );

router.post('/login', login);

router.get('/current',validateToken,current);

module.exports = router;