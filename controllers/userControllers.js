const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient();
const dotenv = require('dotenv').config();

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const emailused = await prisma.user.findUnique({where:{email:email}});
    if(!emailused){
        const HashPassword = await bcrypt.hash(password, 10);
        try {
            await prisma.user.create({
                data: {
                    username,
                    email,
                    password:HashPassword
            }})
        } catch (error) {
            console.log(error);
        }
        res.sendStatus(200);
    }else{
        res.status(400).json({error:"Email already in use"});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({error:"Please enter all fields"});
    }
    const user = await prisma.user.findUnique({where:{email:email}});
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            const token = jwt.sign({id:user.id,username:user.username,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
            res.json({token});
        }
        else{
            res.status(400).json({error:"Incorrect Password"});
        }
    }
    else{
        res.status(400).json({error:"Not Registered"});
    }
}

const current = async (req, res) => {
    res.send('Hello World!');
}

module.exports = {register,login,current}