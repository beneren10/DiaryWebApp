const { Router } = require('express');

const userController = require('../controllers/user');
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/reset-password-request",userController.reset_request)
userRouter.get("/reset-password-verify", userController.reset_verify)
userRouter.post("/reset-password-reset", userController.reset_password)

module.exports = userRouter;