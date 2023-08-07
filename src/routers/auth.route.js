const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const checkToken = require("../middlewares/auth");

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.delete("/logout", checkToken.isSignedIn, authController.logout);

module.exports = authRouter;