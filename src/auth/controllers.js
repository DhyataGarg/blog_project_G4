const { User } = require("./models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!username || !password) {
        return res.json({ status: "Error", msg: "Username, email and password must be provided!" })
    }

    // validate username

    var isUserExist = await User.findOne({ $or: [{ username: username }, { name: name }, { email: email }] });
    if (isUserExist) {
        return res.json({
            status: "Error",
            msg: "User already exists"
        })
    }

    var newUser = await User.create(req.body);
    newUser.ency_password = undefined;
    newUser.salt = undefined;

    return res.json({
        status: "User Registered successfully",
        user: newUser
    });
}

const loginMiddleware = async (req, res, next) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return response.json({
            status: "Error",
            msg: "Username and password required",
        });
    }

    var user = await User.findOne({ username: username });
    if (!user) {
        return response.json({
            status: "Error",
            msg: "Username not found",
        });
    }

    if (!user.isAuthenticated(password)) {
        return response.json({
            status: "Error",
            msg: "You entered wrong password.",
        });
    }

    var token = jwt.sign({ _id: user._id }, user.salt);
    req.body.token = token;
    req.body.user = user;
    user.ency_password = undefined;
    user.salt = undefined;
    next();
}

const login = async (request, response) => {
    return response.json({ status: "Done", data: request.body });
};

const isAuthenticate = async (request, response, next) => {
    var token = request.headers.authorization;
    if (!token) {
        return response.json({ status: "Un-Authenticated" });
    }
    var user;
    try {
        user = jwt.verify(token, user.salt);
    } catch {
        return response.json({ status: "Un-Authenticated" });
    }

    user = await User.findById(user._id);

    next();
    // return response.json({ status: "Done", user });
};


const reset = async (request, response, next) => {
    const { username, new_password } = request.body;

    var user = await User.findOne({ username: username });
    if (!user) {
        return response.json({
            status: "Error",
            msg: "Username not found",
        });
    }

    user.password = new_password;
    user.save();

    return response.json({ status: "Done", user });

}

module.exports = { register, loginMiddleware, login, isAuthenticate, reset };