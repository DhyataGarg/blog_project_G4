const { register, login, isAuthenticate, reset, loginMiddleware } = require("./controllers");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginMiddleware, login);
authRouter.post("/reset", loginMiddleware, reset);

module.exports = authRouter;