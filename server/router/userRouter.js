const express = require('express')
const Router = express.Router()

// Import All Comtroller 
const { userController } = require('../controller')

// Import jwtverify
const { tokenVerify } = require('../middleware/verifyToken')

Router.post('/register', userController.register)
Router.post('/login', userController.login)
Router.post('/keep-login',tokenVerify, userController.keepLogin)
Router.patch('/activation/:uid', userController.activation)
Router.patch('/reset-password/:uid', userController.resetPassword)
Router.post('/forgot-password', userController.forgotPassword)

module.exports = Router