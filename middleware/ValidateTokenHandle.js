const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv').config();

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    if ((req.headers.authorization || req.headers.Authorization) && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user=decoded.user;
            next();
        } catch (error) {
            res.sendStatus(401);
        }
    }
    if (!token) {
        res.sendStatus(401);
    }
});

module.exports = validateToken;