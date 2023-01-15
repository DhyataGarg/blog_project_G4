const { User } = require("./models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, username, password } = req.body;
    if (!username || !password) {
        return res.json({ status: "Error", msg: "Username and password must be provided!" })
    }

    // validate username

    var isUserExist = await User.findOne({ username: username });
    if (isUserExist) {
        return res.json({
            status: "Error",
            msg: "User already exists"
        })
    }

    var newUser = await User.create(req.body);
    newUser.encry_passwrod = undefined;
    newUser.salt = undefined;

    return res.json({
        status: "User Registered successfully",
        user: newUser
    });
}

const login = async (request, response) => {
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

    if (!user.isAuthenticatd(password)) {
        return response.json({
            status: "Error",
            msg: "You entered wrong password.",
        });
    }

    var token = jwt.sign({ _id: user._id }, SECREAT_KEY);

    return response.json({ status: "Done", user, token });
};

const isAuthenticate = async (request, response, next) => {
    var token = request.headers.authorization;
    if (!token) {
        return response.json({ status: "Un-Authenticated" });
    }
    var user;
    try {
        user = jwt.verify(token, SECREAT_KEY);
    } catch {
        return response.json({ status: "Un-Authenticated" });
    }

    user = await User.findById(user._id);

    next();
    // return response.json({ status: "Done", user });
};


const reset = async (request, response, next) => {
    return response.json({ status: "Done" });

}
module.exports = { register, login, isAuthenticate, reset };