const userRouting = require('express').Router();
const {register,login} =require('../controller/userController')

userRouting.post('/register',register);
userRouting.post('/login',login);


module.exports = userRouting;