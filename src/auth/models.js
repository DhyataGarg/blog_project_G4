const mongoose = require('mongoose');
const uuid = require('uuid'); // for salting
const CryptoJS = require('crypto-js'); // to encrypt and decrypt passwords

const userSchema = new mongoose.Schema(
    {
        userame: {
            type: String,
            trim: true,
            unique: true,
        },
        name: String,
        email: String,
        ency_password: String,
        salt: String,
    },
    { timestamps: true }
)

userSchema.virtual("password").set(function (password) {
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(password);
});

userSchema.methods = {
    isAuthenticated: function (plainPassword) {
        return this.encry_passwrod === this.securePassword(plainPassword);
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        var ciphertext = CryptoJS.SHA256.encrypt(plainPassword, this.salt).toString();
        return ciphertext;
    },
};


// Use this name for ref in another schema
//
const User = mongoose.model('User', userSchema);
module.exports = { User };