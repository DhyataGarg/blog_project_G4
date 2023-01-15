const server = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./src/auth/router");

// ToDo: Database Connection
mongoose.connect("mongodb://localhost:27017/blog");
mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED!");
});

mongoose.connection.on("error", () => {
    console.log("SOMETHING WENT WRONG!");
});

const app = server();
app.use(cors());
app.use(bodyParser.json());

app.use("./auth", authRouter);

app.listen(4000, () => {
    console.log("Sever Started on port 4000");
});
