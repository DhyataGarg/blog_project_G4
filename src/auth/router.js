const { register, login, reset } = require("./controllers");

const express = require("express");
const authRouter = express.Router();

authRouter.post("./register", register);
authRouter.post("./login", login);
authRouter.post("./reset", reset);

module.exports = authRouter;